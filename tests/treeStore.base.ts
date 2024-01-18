import { TreeStore, TTreeItem } from "../src";
import { cloneDeep } from "lodash";


describe('TreeStore', () => {
    type TTreeItemPayload = { type?: string | null, }
    type TTestTreeItem = TTreeItem<TTreeItemPayload>
    type TTestTree = TreeStore<TTreeItemPayload>

    let fakeItems: TTestTreeItem[]
    let treeStore: TTestTree

    beforeEach(() => {
        fakeItems = cloneDeep([
            { id: 1, parent: 'root' },
            { id: 2, parent: 1, type: 'test' },
            { id: 3, parent: 1, type: 'test' },

            { id: 4, parent: 2, type: 'test' },
            { id: 5, parent: 2, type: 'test' },
            { id: 6, parent: 2, type: 'test' },

            { id: 7, parent: 4, type: null },
            { id: 8, parent: 4, type: null }
        ]) as TTestTreeItem[]
        treeStore = new TreeStore(fakeItems)
    })

    test('getAll()', () => {
        const res = treeStore.getAll()
        expect(res).toMatchObject(fakeItems)
    })

    test('getItem(7)', () => {
        const expected = { "id":7, "parent":4, "type":null}
        const res = treeStore.getItem(7)
        expect(res).toMatchObject(expected)
    })

    test('getChildren(4)', () => {
        const expected = [
            {"id":7,"parent":4,"type":null},
            {"id":8,"parent":4,"type":null}
        ]
        const res = treeStore.getChildren(4)
        expect(res).toMatchObject(expected)
    })

    test('getChildren(5)', () => {
        const expected: TTreeItem<TTreeItemPayload>[] = []
        const res = treeStore.getChildren(5)
        expect(res).toMatchObject(expected)
    })

    test('getChildren(2)', () => {
        const expected = [
            {"id":4,"parent":2,"type":"test"},
            {"id":5,"parent":2,"type":"test"},
            {"id":6,"parent":2,"type":"test"}
        ]
        const res = treeStore.getChildren(2)
        expect(res).toMatchObject(expected)
    })

    test('getAllChildren(2)', () => {
        const expected = [
            {"id":4,"parent":2,"type":"test"},
            {"id":5,"parent":2,"type":"test"},
            {"id":6,"parent":2,"type":"test"},
            {"id":7,"parent":4,"type":null},
            {"id":8,"parent":4,"type":null}
        ]
        const res = treeStore.getAllChildren(2)
        expect(res).toMatchObject(expected)
    })

    test('getAllParents(7)', () => {
        const expected = [
            {"id":4,"parent":2,"type":"test"},
            {"id":2,"parent":1,"type":"test"},
            {"id":1,"parent":"root"}
        ]
        const res = treeStore.getAllParents(7)
        expect(res).toMatchObject(expected)
    })
})