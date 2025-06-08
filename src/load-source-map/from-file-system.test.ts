import { describe, expect, test, vi } from 'vitest';
import { fromFileSystem } from './from-file-system.js';

vi.mock('fs', () => ({
    readFileSync: (filename: string): string => filename
}));

describe('from-file-system', () => {
    test('fromFileSystem', () => {
        const results = fromFileSystem('mock.js');
        expect(results).toEqual({
            src: 'mock.js',
            map: 'mock.js.map'
        });
    });
});
