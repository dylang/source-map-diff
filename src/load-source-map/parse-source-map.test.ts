import {parseSourceMap} from './parse-source-map';

jest.mock('source-map-explorer', () => () => ({
    files: {
        '<unmapped>': 123,
        '/a/b/c/file1': 1,
        '/a/b/c/file2': 2,
        '/a/b/c/dir1/a/b/c/d/deep1': 3,
        '/a/b/c/file3': 4,
        '/a/b/c/file4.ext?querystring': 5,
    }
}));

describe('parse-source-map', () => {
    test('parseSourceMap', async () => {
        const results = parseSourceMap({ src: 'mock.js' });
        expect(results).toEqual({
            '<unmapped>': 123,
            'dir1/a/b/c/d/deep1': 3,
            file1: 1,
            file2: 2,
            file3: 4,
            'file4.ext': 5
        });
    });
});
