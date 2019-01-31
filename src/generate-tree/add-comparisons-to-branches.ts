export const addComparisonsToBranches = (tree: Tree[]) => {
    /*
        Traverse until we hit data
        Return data
        Set node's data based on combination of all returned data
     */
    return tree.map(node => {
        if (!node.data) {
            // Must be a branch
            const children = addComparisonsToBranches(node.children);
            const currentSize = children.reduce((acc, {data}) => acc + (data ? data.currentSize : 0), 0);
            const previousSize = children.reduce((acc, {data}) => acc + (data ? data.previousSize : 0), 0);
            node.data = {
                added: children.every(({data}) => !data || data.added),
                changeInSize: children.reduce((acc, {data}) => acc + (data
                    ? data.changeInSize
                    : 0) , 0),
                currentSize,
                previousSize,
                isDecreased: currentSize < previousSize,
                isIncreased: currentSize > previousSize,
                isSame: currentSize === previousSize,
                name: '',
                path: [],

                removed: children.every(({data}) => !data || data.removed)
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
                ...singleChild,
                id: `${node.id}/${singleChild.id}`,
                name: `${node.name}/${singleChild.name}`
            };
        }

        return node;
    });
};
