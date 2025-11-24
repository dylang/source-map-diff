import path from 'node:path';
import { URL } from 'node:url';
import got from 'got';

const tryMap = async (srcUrl: string, currentSrc: string) => {
    const sourcemapNameGuess = `${srcUrl}.map`;
    const url = new URL(srcUrl);
    const dirname = path.dirname(url.pathname);
    const [, sourcemapFilename] = currentSrc.split('# sourceMappingURL=');
    const relativeSourcemapName = `${url.origin}/${dirname.replace(/^\//, '')}/${sourcemapFilename}`;
    const absoluteSourcemapName = `${url.origin}/${sourcemapFilename}`;

    try {
        const { body: map, errored } = await got.get(sourcemapNameGuess, { throwHttpErrors: false });
        if (errored) {
            throw new Error(`1. Failed to load ${sourcemapNameGuess}: ${errored.message}`);
        }
        return map;
    } catch (err1) {
        if (!sourcemapFilename) {
            throw new Error(
                `Source Map not found. Tried ${sourcemapNameGuess} and didn't find "# sourceMappingURL=" in ${srcUrl}.`
            );
        }
        try {
            const { body: map, errored } = await got.get(relativeSourcemapName, { throwHttpErrors: false });
            if (errored) {
                throw new Error(`2. Failed to load ${sourcemapNameGuess}: ${errored.message}`);
            }

            return map;
        } catch (err2) {
            try {
                const { body: map, errored } = await got.get(absoluteSourcemapName, {
                    throwHttpErrors: false
                });
                if (errored) {
                    throw new Error(`3. Failed to load ${sourcemapNameGuess}: ${errored.message}`);
                }

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
    const { body: currentSrc, errored, statusCode, statusMessage } = await got.get(srcUrl, { throwHttpErrors: false });
    if (errored) {
        throw new Error(`Failed to load ${errored.message}\n${srcUrl}`);
    }
    if (statusCode !== 200) {
        throw new Error(`Error: ${statusMessage} (${statusCode})\n\n${currentSrc}\n`);
    }
    const currentMap = await tryMap(srcUrl, currentSrc);

    return {
        src: Buffer.from(currentSrc, 'utf-8'),
        map: Buffer.from(currentMap, 'utf-8')
    };
};
