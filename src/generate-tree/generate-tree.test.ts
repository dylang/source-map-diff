import { generateTree } from './generate-tree';

jest.mock('./format-label', () => ({
    formatLabel: (filename: string) => filename
}));

describe('generate-tree', () => {
    test('generateTree', () => {
        const result = generateTree(
            [
                {
                    added: true,
                    changeInSize: 1750,
                    currentSize: 1750,
                    isDecreased: false,
                    isIncreased: true,
                    isSame: false,
                    name: 'added',
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
                    name: 'bigger',
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
                    name: 'removed',
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
                    name: 'smaller',
                    path: ['smaller'],
                    previousSize: 750,
                    removed: false
                }
            ],
            'console'
        );
        expect(result).toEqual(`├─ added
├─ bigger
├─ removed
└─ smaller
`);
    });
});
