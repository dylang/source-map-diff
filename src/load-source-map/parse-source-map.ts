import explore from 'source-map-explorer';
import commonPathPrefix from 'common-path-prefix';

export const parseSourceMap = ({src, map}: SourceAndMap) => {
    const {files} = explore(src, map, {
        replace: {
            '^[^:]*:///': '/', // Remove webpack://
            ' .*': '' // Remove webpack hashes
        }
    });

    const {'<unmapped>': unmapped, ...everythingElse} = files;

    const commonPrefix = commonPathPrefix(Object.keys(everythingElse).filter((pathValue: string) => !pathValue.startsWith('webpack')));

    const paths = Object.entries(everythingElse)
        .sort((a, b) => a[0] > b[0] ? -1 : 1)
        .map(([filepath, size]) => ({
            [filepath
                .replace(commonPrefix, '')
                .replace(/~/g, '/')
                .replace(/\.\./g, '/')
                .replace(/\/+/g, '/')
                .replace(/\.(.*)\?.*/, '.$1')
                .replace(/^\//g, '')]: size
        }));

    return Object.assign({'<unmapped>': unmapped}, ...paths, {});
};
