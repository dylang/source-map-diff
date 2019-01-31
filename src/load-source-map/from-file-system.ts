import * as fs from 'fs';

export const fromFileSystem = (srcFilename: string, mapFilename = `${srcFilename}.map`) => {
    const currentSrcBuffer = fs.readFileSync(srcFilename);
    const currentMapBuffer = fs.readFileSync(mapFilename);
    return {
        src: currentSrcBuffer,
        map: currentMapBuffer
    };
};
