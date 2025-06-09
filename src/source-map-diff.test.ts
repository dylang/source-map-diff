import { describe, expect, test, vi } from 'vitest';
import { sourceMapDiff, sourceMapDiffAsHtml, sourceMapDiffForConsole } from './source-map-diff.js';

vi.mock('./generate-tree', () => ({ generateTree: (diff: unknown) => diff }));
vi.mock('./load-source-map', () => ({
    loadSourceMap: (name: string) =>
        name === 'current.js'
            ? { 'src/bigger': 10000, 'src/smaller': 200, 'src/same': 500 }
            : { 'src/bigger': 100, 'src/smaller': 2000, 'src/same': 500 }
}));

describe('source-map-diff', () => {
    test('sourceMapDiff', async () => {
        const diff = await sourceMapDiff({ currentSrc: 'current.js', previousSrc: 'previous.js' });
        expect(diff).toEqual([
            {
                added: false,
                changeInSize: 9900,
                currentSize: 10000,
                isDecreased: false,
                isIncreased: true,
                isSame: false,
                filename: 'src/bigger',
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
                filename: 'src/smaller',
                path: ['src', 'smaller'],
                previousSize: 2000,
                removed: false
            }
        ]);
    });

    test('sourceMapDiffAsHtml', async () => {
        const diff = await sourceMapDiffAsHtml({ currentSrc: 'current.js', previousSrc: 'previous.js' });
        expect(diff).toEqual([
            {
                added: false,
                changeInSize: 9900,
                currentSize: 10000,
                isDecreased: false,
                isIncreased: true,
                isSame: false,
                filename: 'src/bigger',
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
                filename: 'src/smaller',
                path: ['src', 'smaller'],
                previousSize: 2000,
                removed: false
            }
        ]);
    });

    test('sourceMapDiffForConsole', async () => {
        const diff = await sourceMapDiffForConsole({ currentSrc: 'current.js', previousSrc: 'previous.js' });
        expect(diff).toEqual([
            {
                added: false,
                changeInSize: 9900,
                currentSize: 10000,
                isDecreased: false,
                isIncreased: true,
                isSame: false,
                filename: 'src/bigger',
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
                filename: 'src/smaller',
                path: ['src', 'smaller'],
                previousSize: 2000,
                removed: false
            }
        ]);
    });
});
