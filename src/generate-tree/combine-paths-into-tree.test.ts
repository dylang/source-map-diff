import { combinePathsIntoTree } from './combine-paths-into-tree';

describe('combine-paths-into-tree', () => {
    test('combinePathsIntoTree', () => {
        const data = {
            added: true,
            removed: true,
            isIncreased: true,
            isDecreased: true,
            isSame: true,
            previousSize: 1,
            currentSize: 1
        };
        const results = combinePathsIntoTree(
            [
                {
                    name: 'a/b/c1',
                    path: ['a', 'b', 'c1'],
                    changeInSize: 1,
                    ...data
                },
                {
                    name: 'a/b/c2',
                    path: ['a', 'b', 'c2'],
                    changeInSize: 2,
                    ...data
                },
                {
                    name: 'c/b/a',
                    path: ['c', 'b', 'a'],
                    changeInSize: 3,
                    ...data
                },
                {
                    name: 'c/b2/a2',
                    path: ['c', 'b2', 'a2'],
                    changeInSize: 4,
                    ...data
                }
            ],
            'name'
        );
        expect(results).toEqual([
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
        ]);
    });
});
