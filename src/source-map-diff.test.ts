import { sourceMapDiff } from './source-map-diff';

jest.mock('./load-source-map', () => ({
    loadSourceMap: (name: string) =>
        name === 'current.js'
            ? { 'src/bigger': 10000, 'src/smaller': 200, 'src/same': 500 }
            : { 'src/bigger': 100, 'src/smaller': 2000, 'src/same': 500 }
}));

describe('source-map-diff', () => {
    test('sourceMapDiff', async () => {
        const { diff } = await sourceMapDiff({ currentSrc: 'current.js', previousSrc: 'previous.js' });
        expect(diff).toEqual([
            {
                added: false,
                changeInSize: 9900,
                currentSize: 10000,
                isDecreased: false,
                isIncreased: true,
                isSame: false,
                name: 'src/bigger',
                path: ['src', 'bigger'],
                previousSize: 100,
                removed: false
            },
            {
                added: false,
                changeInSize: -1800,
                currentSize: 200,
                isDecreased: true,
                isIncreased: false,
                isSame: false,
                name: 'src/smaller',
                path: ['src', 'smaller'],
                previousSize: 2000,
                removed: false
            }
        ]);
    });
});
