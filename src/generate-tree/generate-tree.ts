import treeView from 'text-treeview';
import { type Data } from '../compare-file-sizes/index.js';
import { addComparisonsToBranches } from './add-comparisons-to-branches.js';
import { combinePathsIntoTree } from './combine-paths-into-tree.js';
import { formatLabel } from './format-label.js';

export type OutputFormat = 'html' | 'console';

// Generates an HTML tree from an array of dependencies.
export const generateTree = (data: Data[], outputFormat: OutputFormat): string => {
    const dependencyTree = addComparisonsToBranches(combinePathsIntoTree(data, 'name'));

    const treeString = treeView<Data>(dependencyTree, {
        showRootLines: true,
        format: (indents, treeNode, { name, data }) => {
            if (!data) {
                throw new Error(`${name} is missing data...`);
            }

            return [
                outputFormat === 'html' ? '<div class="diff-line"><span class="diff-branch">' : '',
                indents.join('').replace(/\s/g, outputFormat === 'html' ? '&nbsp;' : ' '),
                treeNode,
                outputFormat === 'html' ? '</span>' : '',
                formatLabel(name, data, outputFormat),
                outputFormat === 'html' ? '</div>' : '',
                '\n'
            ].join('');
        }
    });

    return outputFormat === 'html'
        ? `<div class="source-map-diff ${treeString ? 'has-changes' : 'no-changes'}">\n${treeString}</div>`
        : treeString;
};
