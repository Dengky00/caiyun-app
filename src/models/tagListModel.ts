const localStorageKeyName = 'tagList'

type TagListModel = {
    data: Tag[]
    fetch: () => Tag[]
    save: () => void
    create: (name: string) => 'success' | 'duplicated'//success表示成功,duplicated表示name重复
    update: (id: string, name: string) => 'success' | 'not find' | 'duplicated'
    remove: (id: string) => boolean
}
const tagListModel: TagListModel = {
    data: [],
    fetch() {//读取
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]")
        return this.data
    },
    save() {//保存
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    },
    create(name: string) {
        const names = this.data.map(item => item.name)
        if (names.indexOf(name) >= 0) {
            return 'duplicated'
        }
        this.data.push({ id: name, name: name })
        this.save()
        return 'success'
    },
    update(id: string, name: string) {
        const idList = this.data.map(item => item.id)
        if (idList.indexOf(id) >= 0) {
            const names = this.data.map(item => item.name)
            if (names.indexOf(name) >= 0) {
                return 'duplicated'
            } else {
                const tag = this.data.filter(item => item.id === id)[0]
                tag.name = name
                this.save()
                return 'success'
            }
        } else {
            return 'not find'
        }
    },
    remove(id: string) {
        let index = -1
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                index = i
                break
            }
        }
        this.data.splice(index, 1)
        this.save()
        return true
    }
}
export default tagListModel;