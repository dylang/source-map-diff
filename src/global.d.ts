declare module 'source-map-explorer';
declare module 'text-treeview';
declare module 'common-path-prefix';

interface SourceMapDiffInput {
    currentSrc: string;
    previousSrc: string;
    generateAnsiTree?: boolean;
    generateHtmlTree?: boolean;
    generateWebPage?: boolean;
}

interface SourceAndMap {
    src: string | Buffer;
    map?: null | Buffer;
}

interface GenerateTreeOptions {
    asHtml: boolean;
    asColor: boolean;
}

interface Files {
    [filename: string]: number;
}

interface Data {
    name: string;
    path: string[];
    added: boolean;
    removed: boolean;
    isIncreased: boolean;
    isDecreased: boolean;
    isSame: boolean;
    currentSize: number;
    previousSize: number;
    changeInSize: number;
}

interface Tree {
    name: string;
    id?: string;
    size: number;
    data: Data | undefined;
    children: Tree[];
}
