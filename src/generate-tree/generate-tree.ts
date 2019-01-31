import chalk from 'chalk';
import treeview from 'text-treeview';
import {combinePathsIntoTree, SortBy} from './combine-paths-into-tree';
import {addComparisonsToBranches} from './add-comparisons-to-branches';

// Generates an HTML tree from an array of dependencies.
export const generateTree = (data: Data[], options: Partial<GenerateTreeOptions>) => {
    const {asColor, asHtml} = options;
    const dependencyTree = addComparisonsToBranches(combinePathsIntoTree(data, SortBy.name));

    return treeview(dependencyTree, {
        showRootLines: true,
        format: (indents: string[], treeNode: string, node: Tree) => {
            const {isIncreased= false, changeInSize= 0, added= false, removed= false} = node.data || {};
            const changeInSizeString = data
                ? `${isIncreased ? '+' : ''}${changeInSize.toLocaleString()} bytes`
                : '';

            const formatLabelHtml = (label: string) => {
                return `<span class="${isIncreased ? 'increased' : 'decreased'} ${added ? 'added' : ''}">${label} <span class="change">${changeInSizeString}</span></span>`;
            };

            const formatLabelColor = (label: string) => {
                const color = isIncreased ? chalk.green : chalk.red;
                const addedOrRemoved = added ? '(new)' : removed ? '(removed)' : '';
                const relativeSize = color('x'.repeat(Math.abs(changeInSize) / 100));

                return `${color(label)} ${changeInSizeString} ${relativeSize} ${addedOrRemoved}`;
            };

            return [
                indents.join(''),
                treeNode,
                ` [${node.size}] `,
                changeInSize === 0 ? node.name : '',
                asHtml && changeInSize !== 0 ? formatLabelHtml(node.name) : '',
                asColor && changeInSize !== 0 ? formatLabelColor(node.name) : '',
                '\n'
            ].join('');
        }
    });
};
