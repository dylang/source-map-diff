#!/usr/bin/env node
import yargsParser from 'yargs-parser';
import { sourceMapDiffAsHtml, sourceMapDiffForConsole } from '../source-map-diff';

export const cli = async () => {
    const { previousSrc, currentSrc, format } = yargsParser(process.argv);

    if (!previousSrc && !currentSrc) {
        console.log(`
            --currentSrc <filename or url>    Filename or URL to the Javascript that references a sourcemap.
            --previousSrc <filename or url>   Filename or URL to the Javascript that references a sourcemap.
            --format html                     Default is console.
        `);
        return;
    }

    if (!previousSrc || typeof previousSrc !== 'string') {
        throw new Error('--previousSrc <filename or url> is required.');
    }

    if (!currentSrc || typeof currentSrc !== 'string') {
        throw new Error('--previousSrc <filename or url> is required.');
    }

    const results =
        format === 'html'
            ? await sourceMapDiffAsHtml({ previousSrc, currentSrc })
            : await sourceMapDiffForConsole({ previousSrc, currentSrc });

    console.log(results);
};
