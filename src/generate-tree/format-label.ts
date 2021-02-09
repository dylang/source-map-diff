import chalk from 'chalk';
import { Data } from '../compare-file-sizes';
import { OutputFormat } from './generate-tree';

export const formatLabel = (
    filename: string,
    { isIncreased, changeInSize, added, removed }: Pick<Data, 'isIncreased' | 'changeInSize' | 'added' | 'removed'>,
    outputFormat: OutputFormat
) => {
    if (changeInSize === 0) {
        return `${filename}`;
    }

    const changeInSizeString = `${isIncreased ? '+' : ''}${changeInSize.toLocaleString()} bytes`;
    const addedOrRemoved = added ? 'New' : removed ? 'Removed' : '';

    if (outputFormat === 'html') {
        const classNames = [isIncreased ? 'increased' : 'decreased', added ? 'added' : '', removed ? 'removed' : '']
            .join(' ')
            .trim();
        return `
            <span class="${classNames}">
                <span class="filename">${filename}</span>
                &nbsp;
                <span class="sizeChange">${changeInSizeString}</span>
                &nbsp;
                <span class="addedOrRemoved">${addedOrRemoved}</span>
            </span>
        `
            .split('\n')
            .map((str) => str.trim())
            .join('');
    }

    const color = isIncreased ? chalk.red : chalk.green;
    return `${color(filename)} ${changeInSizeString} ${color.bold(addedOrRemoved)}`;
};
