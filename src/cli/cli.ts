import yargsParser from 'yargs-parser';
import { sourceMapDiff, sourceMapDiffAsHtml, sourceMapDiffForConsole } from '../source-map-diff';

export const cli = async () => {
    const { previousSrc, currentSrc, format } = yargsParser(process.argv);

    if (!previousSrc && !currentSrc) {
        console.log(`
            --currentSrc <filename or url>    Filename or URL to the Javascript that references a sourcemap.
            --previousSrc <filename or url>   Filename or URL to the Javascript that references a sourcemap.
            --format html                     html, json, or console. Default is console.
        `);
        return;
    }

    const results =
        format === 'html'
            ? await sourceMapDiffAsHtml({ previousSrc, currentSrc })
            : format === 'json'
            ? JSON.stringify(await sourceMapDiff({ previousSrc, currentSrc }), null, 2)
            : await sourceMapDiffForConsole({ previousSrc, currentSrc });

    console.log(results);
};
