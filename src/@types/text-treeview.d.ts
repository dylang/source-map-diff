declare module 'text-treeview' {
    export interface Data {
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

    export interface Tree {
        name: string;
        id?: string;
        size: number;
        data: Data | undefined;
        children: Tree[];
    }

    export interface TextTreeViewOptions {
        showRootLines: boolean;
        format(indents: string[], treeNode: string, node: Tree): string;
    }

    export default function textTreeView(data: Tree[], options: Partial<TextTreeViewOptions>): string;
}
