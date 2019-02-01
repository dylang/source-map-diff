import { compareFileSizes } from './compare-file-sizes';
import { loadSourceMap } from './load-source-map';
import { generateTree } from './generate-tree';

export interface SourceMapDiffInput {
    currentSrc: string;
    previousSrc: string;
}

export const sourceMapDiff = async ({ currentSrc, previousSrc }: SourceMapDiffInput) => {
    const [current, previous] = await Promise.all([loadSourceMap(currentSrc), loadSourceMap(previousSrc)]);

    return compareFileSizes(current, previous);
};

export const sourceMapDiffAsHtml = async ({ currentSrc, previousSrc }: SourceMapDiffInput) => {
    return generateTree(await sourceMapDiff({ currentSrc, previousSrc }), 'html');
};

export const sourceMapDiffForConsole = async ({ currentSrc, previousSrc }: SourceMapDiffInput) => {
    return generateTree(await sourceMapDiff({ currentSrc, previousSrc }), 'console');
};
