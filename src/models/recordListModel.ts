const localStorageKeyName = 'tagList'
const tagListModel = {
    fetch() {//读取
        return JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]") as RecordItem[]
    },
    save(data: RecordItem[]) {//保存
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
    },
    clone(data: RecordItem) {
        return JSON.parse(JSON.stringify(data)) as RecordItem
    },
}
export default tagListModel;