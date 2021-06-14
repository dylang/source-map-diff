import { generateTree } from './generate-tree';

jest.mock('./format-label', () => ({
    formatLabel: (filename: string) => filename
}));

describe('generate-tree', () => {
    test('console', () => {
        const result = generateTree(
            [
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
            ],
            'console'
        );
        expect(result).toEqual(`├─ added
├─ bigger
├─ removed
└─ smaller
`);
    });

    test('html', () => {
        const result = generateTree(
            [
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
            ],
            'html'
        );
        expect(result).toMatchInlineSnapshot(`
            "<div class=\\"source-map-diff has-changes\\">
            <div class=\\"diff-line\\"><span class=\\"diff-branch\\">├─ </span>added</div>
            <div class=\\"diff-line\\"><span class=\\"diff-branch\\">├─ </span>bigger</div>
            <div class=\\"diff-line\\"><span class=\\"diff-branch\\">├─ </span>removed</div>
            <div class=\\"diff-line\\"><span class=\\"diff-branch\\">└─ </span>smaller</div>
            </div>"
        `);
    });

    test('html no changes', () => {
        const result = generateTree([], 'html');
        expect(result).toMatchInlineSnapshot(`
            "<div class=\\"source-map-diff no-changes\\">
            </div>"
        `);
    });
});
