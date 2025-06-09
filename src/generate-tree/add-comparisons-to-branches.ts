import { type Tree } from 'text-treeview';
import { type Data } from '../compare-file-sizes';

export const addComparisonsToBranches = (tree: Tree<Data>[]): Tree<Data>[] => {
    /*
        Traverse until we hit data
        Return data
        Set node's data based on a combination of all returned data
     */
    return tree.map((node: Tree<Data>) => {
        if (!node.data) {
            // Must be a branch
            const children: Tree<Data>[] = addComparisonsToBranches(node.children);
            const currentSize: number = children.reduce<number>(
                (acc, { data }: { data?: Data }) => acc + (data ? data.currentSize : 0),
                0
            );
            const previousSize: number = children.reduce<number>(
                (acc, { data }: { data?: Data }) => acc + (data ? data.previousSize : 0),
                0
            );
            node.data = {
                added: children.every(({ data }: { data?: Data }) => !data || data.added),
                changeInSize: children.reduce(
                    (acc: number, { data }: { data?: Data }) => acc + (data ? data.changeInSize : 0),
                    0
                ),
                currentSize,
                previousSize,
                isDecreased: currentSize < previousSize,
                isIncreased: currentSize > previousSize,
                isSame: currentSize === previousSize,
                filename: '',
                path: [],
                removed: children.every(({ data }: { data?: Data }) => !data || data.removed)
            };

            // Show files or just directories
            node.children = children; // .filter(child => child.data && child.data.name === '');
        }

        /*
           merge nodes with just one child
         */
        if (node.children.length === 1) {
            const [singleChild] = node.children;
            return {
                data: undefined,
                size: 0,
                children: [],
                ...singleChild,
                id: `${node.id}/${singleChild!.id}`,
                name: `${node.name}/${singleChild!.name}`
            };
        }

        return node;
    });
};
