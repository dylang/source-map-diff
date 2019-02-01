import chalk from 'chalk';
import { formatLabel } from './format-label';

describe('format-label', () => {
    test('console', async () => {
        chalk.level = 0;
        const result = formatLabel(
            'mock-name',
            {
                isIncreased: true,
                changeInSize: 10,
                added: true,
                removed: false
            },
            'console'
        );
        expect(result).toEqual('mock-name +10 bytes New');
    });

    test('html', async () => {
        chalk.level = 0;
        const result = formatLabel(
            'mock-name',
            {
                isIncreased: false,
                changeInSize: 1000,
                added: false,
                removed: true
            },
            'html'
        );
        expect(result).toEqual(
            '<span class="decreased  removed"><span class="filename">mock-name</span>&nbsp;<span class="sizeChange">1,000 bytes</span>&nbsp;<span class="addedOrRemoved">Removed</span></span>'
        );
    });
});
