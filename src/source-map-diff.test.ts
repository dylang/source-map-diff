import {sourceMapDiff} from './source-map-diff';

jest.mock('./load-source-map', () => ({
    loadSourceMap: (name: string) => ({src: name, map: `${name}.map`})
}));
jest.mock('./parse-source-map', () => ({
    parseSourceMap: (src: string, map: string) => ({
        src: src.length * 1000,
        [map]: map.length * 1000
    })
}));

describe('source-map-diff', () => {
    test('sourceMapDiff', async () => {
        const {diff} = await sourceMapDiff({currentSrc: 'current.js', previousSrc: 'previous.js'});
        expect(diff).toEqual([
            {
                added: false,
                changeInSize: -1000,
                currentSize: 10000,
                isDecreased: true,
                isIncreased: false,
                isSame: false,
                name: 'src',
                path:  ['src'],
                previousSize: 11000,
                removed: false,
            },
            {
                added: true,
                changeInSize: 14000,
                currentSize: 14000,
                isDecreased: false,
                isIncreased: true,
                isSame: false,
                name: 'current.js.map',
                path: ['current.js.map'],
                previousSize: 0,
                removed: false
            },
            {
                added: false,
                changeInSize: -15000,
                currentSize: 0,
                isDecreased: true,
                isIncreased: false,
                isSame: false,
                name: 'previous.js.map',
                path: ['previous.js.map'],
                previousSize: 15000,
                removed: true
            }
        ]);
    });
});
