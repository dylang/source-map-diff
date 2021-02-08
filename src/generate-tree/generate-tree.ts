import treeView from 'text-treeview';
import { Data } from '../compare-file-sizes';
import { combinePathsIntoTree } from './combine-paths-into-tree';
import { addComparisonsToBranches } from './add-comparisons-to-branches';
import { formatLabel } from './format-label';

export interface Tree {
    name: string;
    id?: string;
    size: number;
    data: Data | undefined;
    children: Tree[];
}

export type OutputFormat = 'html' | 'console';

// Generates an HTML tree from an array of dependencies.
export const generateTree = (data: Data[], outputFormat: OutputFormat): string => {
    const dependencyTree = addComparisonsToBranches(combinePathsIntoTree(data, 'name'));

    const treeString = treeView(dependencyTree, {
        showRootLines: true,
        format: (indents, treeNode, { name, data }) => {
            if (!data) {
                throw new Error(`${name} is missing data...`);
            }

            return [
                outputFormat === 'html' ? '<div class="diff-line"><span class="diff-branch">' : '',
                ...indents,
                treeNode,
                outputFormat === 'html' ? '</span>' : '',
                formatLabel(name, data, outputFormat),
                outputFormat === 'html' ? '</div>' : '',
                '\n'
            ].join('');
        }
    });

    return outputFormat === 'html' ? `<div class="source-map-diff">\n${treeString}\n</div>` : treeString;
};
