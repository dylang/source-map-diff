import { readFileSync } from 'node:fs';

export const fromFileSystem = (srcFilename: string, mapFilename = `${srcFilename}.map`) => {
    const currentSrcBuffer = readFileSync(srcFilename);
    const currentMapBuffer = readFileSync(mapFilename);
    return {
        src: currentSrcBuffer,
        map: currentMapBuffer
    };
};
