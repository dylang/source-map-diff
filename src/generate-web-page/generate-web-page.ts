import {combinePathsIntoTree, SortBy} from '../generate-tree/combine-paths-into-tree';

export const generateWebPage = async (current: Files) => {
    const c = Object.entries(current).map(([name, currentSize]) => ({
        added: false,
        changeInSize: 0,
        currentSize,
        isDecreased: true,
        isIncreased: false,
        isSame: false,
        name,
        path:  name.split('/'),
        previousSize: 0,
        removed: false,
    } as Data));

        const arrayOfNodes = combinePathsIntoTree(c, SortBy.size);
        const data = {
            id: 'root',
            size: arrayOfNodes.reduce((acc, {size}) => acc + size, 0),
            children: arrayOfNodes
        };


    console.log(JSON.stringify(data));
};
