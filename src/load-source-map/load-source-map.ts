import { existsSync } from 'fs';
import { fromFileSystem } from './from-file-system';
import { fromWebSite } from './from-web-site';
import { parseSourceMap } from './parse-source-map';

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
        const fileSizes = await parseSourceMap(sourcemap);
        return fileSizes;
    } catch (err) {
        console.warn('source-map-diff', filename, err.message);
        return {};
    }
};
