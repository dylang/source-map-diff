import { addComparisonsToBranches } from './add-comparisons-to-branches';

describe('add-comparisons-to-branches', () => {
    test('addComparisonsToBranches', () => {
        const data = {
            added: true,
            removed: true,
            isIncreased: true,
            isDecreased: true,
            isSame: true,
            previousSize: 1,
            currentSize: 1
        };
        const tree = [
            {
                children: [
                    {
                        children: [
                            {
                                children: [],
                                data: {
                                    changeInSize: 1,
                                    name: 'a/b/c1',
                                    path: ['c1'],
                                    ...data
                                },
                                id: 'c1',
                                name: 'c1',
                                size: 1
                            },
                            {
                                children: [],
                                data: {
                                    changeInSize: 2,
                                    name: 'a/b/c2',
                                    path: ['c2'],
                                    ...data
                                },
                                name: 'c2',
                                id: 'c2',
                                size: 1
                            }
                        ],
                        data: undefined,
                        name: 'b',
                        id: 'b',
                        size: 2
                    }
                ],
                data: undefined,
                name: 'a',
                id: 'a',
                size: 2
            },
            {
                children: [
                    {
                        children: [
                            {
                                children: [],
                                data: {
                                    changeInSize: 3,
                                    name: 'c/b/a',
                                    path: ['a'],
                                    ...data
                                },
                                name: 'a',
                                id: 'a',
                                size: 1
                            }
                        ],
                        data: undefined,
                        name: 'b',
                        id: 'b',
                        size: 1
                    },
                    {
                        children: [
                            {
                                children: [],
                                data: {
                                    changeInSize: 4,
                                    name: 'c/b2/a2',
                                    path: ['a2'],
                                    ...data
                                },
                                name: 'a2',
                                id: 'a2',
                                size: 1
                            }
                        ],
                        data: undefined,
                        name: 'b2',
                        id: 'b2',
                        size: 1
                    }
                ],
                data: undefined,
                name: 'c',
                id: 'c',
                size: 2
            }
        ];
        const result = addComparisonsToBranches(tree);
        expect(result).toEqual([
            {
                children: [
                    {
                        children: [],
                        data: {
                            added: true,
                            changeInSize: 1,
                            currentSize: 1,
                            isDecreased: true,
                            isIncreased: true,
                            isSame: true,
                            name: 'a/b/c1',
                            path: ['c1'],
                            previousSize: 1,
                            removed: true
                        },
                        id: 'c1',
                        name: 'c1',
                        size: 1
                    },
                    {
                        children: [],
                        data: {
                            added: true,
                            changeInSize: 2,
                            currentSize: 1,
                            isDecreased: true,
                            isIncreased: true,
                            isSame: true,
                            name: 'a/b/c2',
                            path: ['c2'],
                            previousSize: 1,
                            removed: true
                        },
                        id: 'c2',
                        name: 'c2',
                        size: 1
                    }
                ],
                data: {
                    added: true,
                    changeInSize: 3,
                    currentSize: 2,
                    isDecreased: false,
                    isIncreased: false,
                    isSame: true,
                    name: '',
                    path: [],
                    previousSize: 2,
                    removed: true
                },
                id: 'a/b',
                name: 'a/b',
                size: 2
            },
            {
                children: [
                    {
                        children: [],
                        data: {
                            added: true,
                            changeInSize: 3,
                            currentSize: 1,
                            isDecreased: true,
                            isIncreased: true,
                            isSame: true,
                            name: 'c/b/a',
                            path: ['a'],
                            previousSize: 1,
                            removed: true
                        },
                        id: 'b/a',
                        name: 'b/a',
                        size: 1
                    },
                    {
                        children: [],
                        data: {
                            added: true,
                            changeInSize: 4,
                            currentSize: 1,
                            isDecreased: true,
                            isIncreased: true,
                            isSame: true,
                            name: 'c/b2/a2',
                            path: ['a2'],
                            previousSize: 1,
                            removed: true
                        },
                        id: 'b2/a2',
                        name: 'b2/a2',
                        size: 1
                    }
                ],
                data: {
                    added: true,
                    changeInSize: 7,
                    currentSize: 2,
                    isDecreased: false,
                    isIncreased: false,
                    isSame: true,
                    name: '',
                    path: [],
                    previousSize: 2,
                    removed: true
                },
                id: 'c',
                name: 'c',
                size: 2
            }
        ]);
    });
});
