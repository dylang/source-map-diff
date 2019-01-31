import {combinePathsIntoTree, SortBy} from './combine-paths-into-tree';

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
    const results = combinePathsIntoTree([
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
    ], SortBy.name);
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
                name: 'c1'
              },
              {
                children: [],
                data: {
                    changeInSize: 2,
                  name: 'a/b/c2',
                  path: ['c2'],
                    ...data
                },
                name: 'c2'
              }
            ],
            data: undefined,
            name: 'b'
          }
        ],
        data: undefined,
        name: 'a'
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
                name: 'a'
              }
            ],
            data: undefined,
            name: 'b'
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
                name: 'a2'
              }
            ],
            data: undefined,
            name: 'b2'
          }
        ],
        data: undefined,
        name: 'c'
      }
    ]);
  });
});
