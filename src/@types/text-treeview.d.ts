declare module 'text-treeview' {
    export interface Tree<Data> {
        name: string;
        id?: string;
        size: number;
        data: Data | undefined;
        children: Tree<Data>[];
    }

    export interface TextTreeViewOptions<Data> {
        showRootLines: boolean;
        format(indents: string[], treeNode: string, node: Tree<Data>): string;
    }

    export default function textTreeView<Data>(data: Tree<Data>[], options: Partial<TextTreeViewOptions<Data>>): string;
}
