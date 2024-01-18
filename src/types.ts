export type ID = number | string

export type TTreeItem<T> = {
    id: ID
    parent: ID
} & (T extends object ? T : {})

export interface ITree<T> {
    getAll(): TTreeItem<T>[]

    getItem(id: ID): TTreeItem<T> | undefined

    getChildren(parentId: ID): TTreeItem<T>[]

    getAllChildren(parentId: ID): TTreeItem<T>[]

    getAllParents(itemId: ID): TTreeItem<T>[]
}
