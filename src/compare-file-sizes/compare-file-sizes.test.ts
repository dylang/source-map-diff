import { compareFileSizes } from './compare-file-sizes';

describe('compare-file-sizes', () => {
    test('compareFileSizes', () => {
        const current = {
            same: 1000,
            bigger: 2000,
            smaller: 500,
            added: 1750
        };
        const previous = {
            same: 1000,
            bigger: 1500,
            smaller: 750,
            removed: 3000
        };
        const result = compareFileSizes(current, previous);
        expect(result).toEqual([
            {
                added: true,
                changeInSize: 1750,
                currentSize: 1750,
                isDecreased: false,
                isIncreased: true,
                isSame: false,
                filename: 'added',
                path: ['added'],
                previousSize: 0,
                removed: false
            },
            {
                added: false,
                changeInSize: 500,
                currentSize: 2000,
                isDecreased: false,
                isIncreased: true,
                isSame: false,
                filename: 'bigger',
                path: ['bigger'],
                previousSize: 1500,
                removed: false
            },
            {
                added: false,
                changeInSize: -3000,
                currentSize: 0,
                isDecreased: true,
                isIncreased: false,
                isSame: false,
                filename: 'removed',
                path: ['removed'],
                previousSize: 3000,
                removed: true
            },
            {
                added: false,
                changeInSize: -250,
                currentSize: 500,
                isDecreased: true,
                isIncreased: false,
                isSame: false,
                filename: 'smaller',
                path: ['smaller'],
                previousSize: 750,
                removed: false
            }
        ]);
    });
});
