import { Tree } from 'text-treeview';
import { Data } from '../compare-file-sizes';

export type SortBy = 'name' | 'size';

export const reduceChain = (trees: Tree<Data>[], data: Data, sortBy: SortBy) => {
    if (data.path.length === 0) {
        return trees;
    }

    const [directoryName, ...rest] = data.path;

    const item = trees.find(({ name }) => name === directoryName) || {
        name: directoryName,
        id: directoryName,
        size: 0,
        data: rest.length === 0 ? data : undefined,
        children: []
    };

    item.children = reduceChain(
        item.children,
        {
            ...data,
            path: rest
        },
        sortBy
    );

    item.size = item.children.length
        ? item.children.reduce((acc: number, { size }: { size: number }) => acc + size, 0)
        : data.currentSize;

    return [...trees.filter(({ name }) => name !== item.name), item].sort((a, b) => {
        if (a.children.length > 0 && b.children.length > 0) {
            return sortBy === 'size' ? b.size - a.size : a.name < b.name ? -1 : 1;
        }

        if (a.children.length === 0 && b.children.length === 0) {
            return sortBy === 'size' ? b.size - a.size : a.name < b.name ? -1 : 1;
        }

        return a.children.length > 0 ? -1 : 1;
    });
};

export const combinePathsIntoTree = (arrayOfPaths: Data[], sortBy: SortBy) =>
    arrayOfPaths.reduce<Tree<Data>[]>((acc: Tree<Data>[], data: Data) => reduceChain(acc, data, sortBy), []);
