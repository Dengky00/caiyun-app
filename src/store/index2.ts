import recordListModel from "@/models/recordListModel";
import tagListModel from "@/models/tagListModel";

const store = {
    //record store
    recordList: recordListModel.fetch(),
    createRecord: (record: RecordItem) => recordListModel.create(record),
    //tag store
    tagList: tagListModel.fetch(),
    findTag(id: string) { return this.tagList.filter(t => t.id === id)[0] },
    createTag: () => {
        const name = window.prompt("请输出标签名:");
        if (name) {
            const message = tagListModel.create(name);
            if (message === "duplicated") {
                window.alert("标签名重复!");
            } else if (message === "success") {
                window.alert("添加成功!");
            }
        }
    },
    updateTag: (id: string, name: string) => tagListModel.update(id, name),
    removeTag: (tag: Tag) => tagListModel.remove(tag.id),
}
export default store;