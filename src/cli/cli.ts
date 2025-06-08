import path from 'path';
import { loadJsonFileSync } from 'load-json-file';
import yargsParser from 'yargs-parser';
import { sourceMapDiff, sourceMapDiffAsHtml, sourceMapDiffForConsole } from '../source-map-diff.js';

export const cli = async () => {
    const { previousSrc, currentSrc, format, version } = yargsParser(process.argv);

    if (version) {
        const { version } = loadJsonFileSync<{ version: string }>(path.join(__dirname, '../../package.json'));
        console.log(version);
        return;
    }

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
              ? JSON.stringify(
                      await sourceMapDiff({ previousSrc, currentSrc }),
                      (key, value: unknown) => (key === 'path' ? undefined : value),
                      2
                  )
              : await sourceMapDiffForConsole({ previousSrc, currentSrc });

    console.log(results);
};
