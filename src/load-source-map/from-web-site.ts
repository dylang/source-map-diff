import {URL} from 'url';
import * as path from 'path';
import * as got from 'got';

const tryMap = async (srcUrl: string, currentSrc: string) => {
    const sourcemapNameGuess = `${srcUrl}.map`;
    const url = new URL(srcUrl);
    const dirname = path.dirname(url.pathname);
    const [, sourcemapFilename] = currentSrc.split('# sourceMappingURL=');
    const relativeSourcemapName = `${url.origin}/${dirname.replace(/^\//, '')}/${sourcemapFilename}`;
    const absoluteSourcemapName = `${url.origin}/${sourcemapFilename}`;

    try {
        const {body: map} = await got.get(sourcemapNameGuess);
        return map;
    } catch (err1) {
        if (!sourcemapFilename) {
            throw new Error(`Source Map not found. Tried ${sourcemapNameGuess} and didn't find "# sourceMappingURL=" in ${srcUrl}.`);
        }
        try {
            const {body: map} = await got.get(relativeSourcemapName);
            return map;
        } catch (err2) {
            try {
                const {body: map} = await got.get(absoluteSourcemapName);
                return map;
            } catch (err3) {
                throw new Error(`
                    Source Map not found.
                        Tried
                            * ${sourcemapNameGuess}
                            * ${relativeSourcemapName}
                            * ${absoluteSourcemapName}
                    ${err1}
                    ${err2}
                    ${err3}
                    `);
            }
        }
    }
};

export const fromWebSite = async (srcUrl: string) => {
    const {body: currentSrc} = await got.get(srcUrl);
    const currentMap = await tryMap(srcUrl, currentSrc);

    return {
        src: Buffer.from(currentSrc, 'utf-8'),
        map: Buffer.from(currentMap, 'utf-8')
    };
};
