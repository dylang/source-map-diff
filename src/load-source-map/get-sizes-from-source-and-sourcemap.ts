interface SourceMapCharacterCount {
    [filename: string]: number;
}

interface SourceMap {
    version: number;
    sources: string[];
    sourcesContent?: string[];
    mappings: string;
    names?: string[];
    file?: string;
    sourceRoot?: string;
}

// Pre-compute the Base64 VLQ decode table for performance
const BASE64_VLQ_LOOKUP: number[] = new Array(128).fill(-1);
// A-Z: 0-25
for (let i = 65; i <= 90; i++) BASE64_VLQ_LOOKUP[i] = i - 65;
// a-z: 26-51
for (let i = 97; i <= 122; i++) BASE64_VLQ_LOOKUP[i] = i - 97 + 26;
// 0-9: 52-61
for (let i = 48; i <= 57; i++) BASE64_VLQ_LOOKUP[i] = i - 48 + 52;
// +: 62
BASE64_VLQ_LOOKUP[43] = 62;
// /: 63
BASE64_VLQ_LOOKUP[47] = 63;

// Regular expression for filename cleanup, compiled once
const REPLACE_FILENAME_REGEX = /^[^:]*:\/+/g;
const REPLACE_DOTDOT_REGEX = /^(\.\.\/)+/g;

function getSizesFromSourceAndSourcemap({
    src,
    map
}: { src: Buffer | string; map: Buffer | string }): SourceMapCharacterCount {
    // Parse source map if it's a string
    const parsedSourceMap: SourceMap =
        typeof map === 'string' || Buffer.isBuffer(map) ? JSON.parse(map.toString()) : map;
    const compiledCode = typeof src === 'string' ? src : src.toString();

    // Initialize character counts for each source file
    const characterCounts: Record<string, number> = {};
    for (let i = 0; i < parsedSourceMap.sources.length; i++) {
        characterCounts[parsedSourceMap.sources[i]!] = 0;
    }

    // Pre-calculate line positions for faster lookups
    const linePositions = getLinePositions(compiledCode);

    // Parse VLQ (Variable Length Quantity) mappings
    const mappings = parsedSourceMap.mappings;
    const lines = mappings.split(';');

    let generatedLine = 0;
    let generatedColumn = 0;
    let sourceIndex = 0;

    // Track the last mapped position for each source
    const lastMappedPositions: Record<number, { line: number; column: number }> = {};

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        const line = lines[lineIndex] || '';
        generatedColumn = 0;

        if (line.length === 0) {
            generatedLine++;
            continue;
        }

        const segments = line.split(',');

        for (let i = 0; i < segments.length; i++) {
            const segment = segments[i]!;
            if (segment.length === 0) continue;

            const decoded = decodeVLQFast(segment);
            if (decoded.length < 4) continue; // Need at least 4 values for a complete mapping

            generatedColumn += decoded[0]!;
            sourceIndex += decoded[1]!;

            // Track this mapping
            const currentPos = { line: generatedLine, column: generatedColumn };
            const lastPos = lastMappedPositions[sourceIndex];

            if (lastPos) {
                // Calculate characters between last position and current position
                const chars = calculateCharactersBetweenPositionsFast(compiledCode, linePositions, lastPos, currentPos);

                const sourceName = parsedSourceMap.sources[sourceIndex];
                if (sourceName) {
                    characterCounts[sourceName] = (characterCounts[sourceName] || 0) + chars;
                }
            }

            lastMappedPositions[sourceIndex] = currentPos;
        }

        generatedLine++;
    }

    // Convert to expected output format
    const result: SourceMapCharacterCount = {};
    const entries = Object.entries(characterCounts);
    entries.sort(([a], [b]) => (a > b ? 1 : a < b ? -1 : 0));

    for (const [filename, count] of entries) {
        result[filename.replace(REPLACE_FILENAME_REGEX, '').replace(REPLACE_DOTDOT_REGEX, '/')] = count;
    }

    return result;
}

// Faster VLQ decoder that avoids unnecessary operations
function decodeVLQFast(str: string): number[] {
    const result: number[] = [];
    let i = 0;

    while (i < str.length) {
        let shift = 0;
        let value = 0;
        let continuation: number;

        do {
            const c = str.charCodeAt(i++);
            const digit = BASE64_VLQ_LOOKUP[c];
            if (digit === -1 || digit === undefined) {
                throw new Error(`Invalid base64 VLQ character: ${String.fromCharCode(c)}`);
            }

            continuation = digit & 32;
            value += (digit & 31) << shift;
            shift += 5;
        } while (continuation);

        // Sign bit
        result.push((value & 1) === 1 ? -(value >> 1) : value >> 1);
    }

    return result;
}

// Pre-calculate line positions for faster position lookup
function getLinePositions(text: string): number[] {
    const positions: number[] = [0];
    let pos = 0;

    for (let i = 0; i < text.length; i++) {
        if (text[i] === '\n') {
            pos = i + 1;
            positions.push(pos);
        }
    }

    return positions;
}

// Optimized version that uses pre-calculated line positions
function calculateCharactersBetweenPositionsFast(
    code: string,
    linePositions: number[],
    start: { line: number; column: number },
    end: { line: number; column: number }
): number {
    // Same line - simple calculation
    if (start.line === end.line) {
        return Math.max(0, end.column - start.column);
    }

    // Different lines
    let totalChars = 0;
    const startLineLength = (linePositions[start.line + 1] || code.length) - linePositions[start.line]! - 1;

    // Characters from start position to end of start line
    totalChars += Math.max(0, startLineLength - start.column);

    // Complete lines in between
    for (let i = start.line + 1; i < end.line && i < linePositions.length; i++) {
        const lineLength = (linePositions[i + 1] || code.length) - linePositions[i]!;
        totalChars += lineLength;
    }

    // Characters from start of end line to end position
    if (end.line < linePositions.length) {
        totalChars += Math.max(0, end.column);
    }

    return totalChars;
}

export { getSizesFromSourceAndSourcemap, type SourceMapCharacterCount };
