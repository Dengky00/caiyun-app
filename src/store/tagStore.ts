import createId from "@/lib/createId";
const localStorageKeyName = 'tagList'
const tagStore = {
    tagList: [] as Tag[],
    findTag(id: string) { return this.tagList.filter(t => t.id === id)[0] },
    fetchTags() {
        this.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]")
        return this.tagList
    },
    saveTags() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
    },
    createTag() {
        const name = window.prompt("请输出标签名:");
        const names = this.tagList.map(item => item.name)
        if (name) {
            if (names.indexOf(name) >= 0) {
                window.alert("标签名重复!");
            } else {
                const id = createId().toString()
                this.tagList.push({ id, name: name })
                this.saveTags()
                window.alert("添加成功!")
            }
        }
    },
    updateTag(id: string, name: string) {
        const names = this.tagList.map(item => item.name)
        if (names.indexOf(name) < 0 && name !== '') {
            const tag = this.tagList.filter(item => item.id === id)[0]
            tag.name = name
            this.saveTags()
        }
    },
    removeTag(id: string) {
        let index = -1
        for (let i = 0; i < this.tagList.length; i++) {
            if (this.tagList[i].id === id) {
                index = i
                break
            }
        }
        this.tagList.splice(index, 1)
        this.saveTags()
        return true
    },
}
tagStore.fetchTags()
export default tagStore