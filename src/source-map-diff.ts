import {getComparison} from './get-comparison';
import {loadSourceMap} from './load-source-map';
import {generateTree} from './generate-tree';

export const sourceMapDiff = async ({currentSrc, previousSrc, generateAnsiTree = false, generateHtmlTree = false}: SourceMapDiffInput) => {
    const [current, previous] = await Promise.all([
        loadSourceMap(currentSrc),
        loadSourceMap(previousSrc)
    ]);

    const diff = getComparison(current, previous);

    return {
        diff,
        html: generateHtmlTree ? generateTree(diff, {asHtml: true}) : undefined,
        ansi: generateAnsiTree ? generateTree(diff, {asColor: true}) : undefined
    };
};
