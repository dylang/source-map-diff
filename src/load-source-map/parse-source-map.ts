import path from 'path';
import { explore } from 'source-map-explorer';
import commonPathPrefix from 'common-path-prefix';

interface SourceAndMap {
    src: string | Buffer;
    map?: Buffer;
}

export const parseSourceMap = async ({
    src,
    map
}: SourceAndMap): Promise<{
    [filename: string]: number;
}> => {
    const {
        bundles: [{ files }]
    } = await explore([{ code: src, map }], {
        noBorderChecks: true, // don't throw error for bad sourcemaps
        replaceMap: {
            '^[^:]*:/+': '/' // Remove webpack://
        }
    });

    const commonPrefix = path.dirname(
        commonPathPrefix(Object.keys(files).filter((pathValue: string) => pathValue.includes('node_modules')))
    );

    const paths: [string, number][] = Object.entries(files).map(([filepath, { size }]) => [
        filepath
            .replace(commonPrefix, '')
            .replace(/~/g, '/')
            .replace(/\.\./g, '/')
            .replace(/\/+/g, '/')
            .replace(/\.(.*)\?.*/, '.$1')
            .replace(/^\//g, '')
            .replace(/no source/, 'generated')
            .replace(/.*\.cache.*/, 'cache'),
        size
    ]);

    const sortedPaths = paths.sort(([a], [b]) => (a > b ? -1 : a < b ? 1 : 0));

    return Object.fromEntries<number>(sortedPaths);
};
