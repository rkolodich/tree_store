import { ID, ITree, TTreeItem } from "./types";

export default class TreeStore<T> implements ITree<T> {
    private itemsById
    private itemsByParentId

    public constructor(
        private items: TTreeItem<T>[]
    ) {
        this.itemsById = new Map<ID, TTreeItem<T>>()
        this.itemsByParentId = new Map<ID, TTreeItem<T>[]>()
        this.groupItems(items)
    }

    public getAll(): TTreeItem<T>[] {
        return this.items
    }

    public getItem(id: ID): TTreeItem<T> | undefined {
        return this.itemsById.get(id)
    }

    public getChildren(parentId: ID): TTreeItem<T>[] {
        return this.itemsByParentId.get(parentId) || []
    }

    public getAllChildren(parentId: ID): TTreeItem<T>[] {
        const children = this.getChildren(parentId)
        if (children.length === 0) {
            return []
        }

        const parentIds = [...new Set(children.map(i => i.id))]
        const addChildren = parentIds.map(i => this.getAllChildren(i)).flat()
        return [...children, ...addChildren]
    }

    public getAllParents(itemId: ID): TTreeItem<T>[] {
        const child = this.itemsById.get(itemId)
        if (!child) {
            return []
        }

        const parent = this.itemsById.get(child.parent)
        if (!parent) {
            return []
        }

        return [parent, ...this.getAllParents(parent.id)]
    }

    private groupItems(items: TTreeItem<T>[]) {
        items.forEach(i => this.groupItem(i))
    }

    private groupItem(item: TTreeItem<T>) {
        this.itemsById.set(item.id, item)

        const itemsByParentId = this.itemsByParentId.get(item.parent)
        if (!itemsByParentId) {
            this.itemsByParentId.set(item.parent, [item])
        }
        else {
            itemsByParentId.push(item)
        }
    }
}