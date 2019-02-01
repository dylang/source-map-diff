import { fromFileSystem } from './from-file-system';
import { fromWebSite } from './from-web-site';
import { parseSourceMap } from './parse-source-map';

export const loadSourceMap = async (filename: string) => {
    const sourcemap = filename.startsWith('http') ? await fromWebSite(filename) : fromFileSystem(filename);
    return parseSourceMap(sourcemap);
};
