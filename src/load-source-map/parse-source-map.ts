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
        replaceMap: {
            '^[^:]*:///': '/' // Remove webpack://
        }
    });

    const { '[no source]': noSourceMap, ...everythingElse } = files;

    const commonPrefix = commonPathPrefix(
        Object.keys(everythingElse).filter(
            (pathValue: string) =>
                !pathValue.startsWith('webpack') && !pathValue.startsWith('[') && !pathValue.includes(' ')
        )
    );

    const paths: [string, number][] = Object.entries(everythingElse)
        .sort((a, b) => (a[0] > b[0] ? -1 : 1))
        .map(([filepath, { size }]) => [
            filepath
                .replace(commonPrefix, '')
                .replace(/~/g, '/')
                .replace(/\.\./g, '/')
                .replace(/\/+/g, '/')
                .replace(/\.(.*)\?.*/, '.$1')
                .replace(/^\//g, ''),
            size
        ]);

    return {
        ...Object.fromEntries<number>(paths),
        '[comments & bundler helper functions]': noSourceMap?.size
    };
};
