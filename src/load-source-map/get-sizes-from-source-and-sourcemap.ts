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

function getSizesFromSourceAndSourcemap({
    src,
    map
}: { src: Buffer | string; map: Buffer | string }): SourceMapCharacterCount {
    // Parse source map if it's a string
    const isBuffer = (data: Buffer | string): data is Buffer => Buffer.isBuffer(data);
    const isString = (data: Buffer | string): data is string => typeof data === 'string';
    const parsedSourceMap: SourceMap = isString(map) || isBuffer(map) ? JSON.parse(map.toString()) : map;
    const compiledCode = src.toString();

    // Initialize character counts for each source file
    const characterCounts: Map<string, number> = new Map();
    // biome-ignore lint/complexity/noForEach: <explanation>
    parsedSourceMap.sources.forEach((source) => {
        characterCounts.set(source, 0);
    });

    // Parse VLQ (Variable Length Quantity) mappings
    const mappings = parsedSourceMap.mappings;
    const lines = mappings.split(';');

    let generatedLine = 0;
    let generatedColumn = 0;
    let sourceIndex = 0;

    // Track the last mapped position for each source
    const lastMappedPositions: Map<number, { line: number; column: number }> = new Map();

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        const line = lines[lineIndex] || '';
        generatedColumn = 0;

        if (line.length === 0) {
            generatedLine++;
            continue;
        }

        const segments = line.split(',');

        for (const segment of segments) {
            if (segment.length === 0) continue;

            const decoded = decodeVLQ(segment);
            if (decoded.length < 4) continue; // Need at least 4 values for a complete mapping

            generatedColumn += decoded[0]!;
            sourceIndex += decoded[1]!;

            // Track this mapping
            const currentPos = { line: generatedLine, column: generatedColumn };
            const lastPos = lastMappedPositions.get(sourceIndex);

            if (lastPos) {
                // Calculate characters between last position and current position
                const chars = calculateCharactersBetweenPositions(compiledCode, lastPos, currentPos);
                const sourceName = parsedSourceMap.sources[sourceIndex];
                if (sourceName) {
                    characterCounts.set(sourceName, (characterCounts.get(sourceName) || 0) + chars);
                }
            }

            lastMappedPositions.set(sourceIndex, currentPos);
        }

        generatedLine++;
    }

    // biome-ignore lint/complexity/useRegexLiterals: <explanation>
    const replaceFilename = new RegExp('^[^:]*:/+', 'g');

    // Convert map to array format
    return Object.fromEntries(
        Array.from(characterCounts.entries())
            .map(
                ([filename, count]) =>
                    [
                        // '^[^:]*:/+': '/' // Remove webpack://
                        filename.replace(replaceFilename, ''),
                        count
                    ] as const
            )
            .sort(([a], [b]) => (a > b ? 1 : a < b ? -1 : 0))
    );
}

function decodeVLQ(str: string): number[] {
    const result: number[] = [];
    let shift = 0;
    let value = 0;

    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        const digit = base64VLQDecode(char);

        value += (digit & 31) << shift;

        if ((digit & 32) === 0) {
            // Sign bit
            result.push((value & 1) === 1 ? -(value >> 1) : value >> 1);
            value = 0;
            shift = 0;
        } else {
            shift += 5;
        }
    }

    return result;
}

function base64VLQDecode(char: number): number {
    if (char >= 65 && char <= 90) return char - 65; // A-Z
    if (char >= 97 && char <= 122) return char - 97 + 26; // a-z
    if (char >= 48 && char <= 57) return char - 48 + 52; // 0-9
    if (char === 43) return 62; // +
    if (char === 47) return 63; // /
    throw new Error(`Invalid base64 VLQ character: ${String.fromCharCode(char)}`);
}

function calculateCharactersBetweenPositions(
    code: string,
    start: { line: number; column: number },
    end: { line: number; column: number }
): number {
    const lines = code.split('\n');

    if (start.line === end.line) {
        // Same line
        return Math.max(0, end.column - start.column);
    }

    let totalChars = 0;

    // Characters from start position to end of start line
    if (start.line < lines.length) {
        totalChars += Math.max(0, lines[start.line]!.length - start.column);
        totalChars += 1; // newline character
    }

    // Complete lines in between
    for (let i = start.line + 1; i < end.line && i < lines.length; i++) {
        totalChars += lines[i]!.length + 1; // +1 for newline
    }

    // Characters from start of end line to end position
    if (end.line < lines.length) {
        totalChars += Math.max(0, end.column);
    }

    return totalChars;
}

export { getSizesFromSourceAndSourcemap, type SourceMapCharacterCount };
