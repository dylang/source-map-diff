import { existsSync } from 'fs';
import { fromFileSystem } from './from-file-system.js';
import { fromWebSite } from './from-web-site.js';
import { getSizesFromSourceAndSourcemap } from './get-sizes-from-source-and-sourcemap.js';

export const loadSourceMap = async (filename?: string) => {
    if (!filename || filename.includes('undefined')) {
        return {};
    }

    const isRemote = filename.startsWith('http');

    // File doesn't exist.
    if (!isRemote && !existsSync(filename)) {
        return {};
    }

    try {
        const sourcemap = isRemote ? await fromWebSite(filename) : fromFileSystem(filename);
        // Make sure we catch errors for parseSourceMap.
        const fileSizes = getSizesFromSourceAndSourcemap(sourcemap);
        return fileSizes;
    } catch (err) {
        console.warn('source-map-diff', filename, err);
        return {};
    }
};
