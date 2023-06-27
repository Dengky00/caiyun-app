let tagId: number = parseInt(window.localStorage.getItem('_tagIdMax') || '0') || 0
let recordId: number = parseInt(window.localStorage.getItem('_recordIdMax') || '0') || 0
function createId(type: string) {
    if (type === 'tag') {
        tagId++
        window.localStorage.setItem('_tagIdMax', tagId.toString())
        return tagId
    } else if (type === 'record') {
        recordId++
        window.localStorage.setItem('_recordIdMax', recordId.toString())
        return recordId
    }
}
export default createId