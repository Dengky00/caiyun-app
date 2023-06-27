import clone from '@/lib/clone';
import createId from '@/lib/createId';
import router from '@/router';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as Tag[],
    currentTag: {} as Tag,
  },
  mutations: {
    //记账操作
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || "[]") as RecordItem[]
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    createRecord(state, record: RecordItem) {
      const recordId = createId('record')
      if (recordId) {
        const recordClone = clone(record);
        recordClone.id = recordId.toString();
        recordClone.createdAt = new Date();
        state.recordList.push(recordClone);
        store.commit('saveRecords')
      }
    },
    //标签操作
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || "[]")
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    createTag(state) {
      const name = window.prompt("请输出标签名:");
      const names = state.tagList.map(item => item.name)
      if (name) {
        if (names.indexOf(name) >= 0) {
          window.alert("标签名重复!");
        } else {
          const tagId = createId('tag')
          if (tagId) {
            const id = tagId.toString()
            state.tagList.push({ id, name: name })
            store.commit('saveTags')
            window.alert("添加成功!")
          }
        }
      }
    },
    findTag(state, id: string) { state.currentTag = state.tagList.filter(t => t.id === id)[0] },
    updateTag(state, payload: { id: string, name: string }) {
      const { id, name } = payload
      const names = state.tagList.map(item => item.name)
      if (names.indexOf(name) < 0 && name !== '') {
        const tag = state.tagList.filter(item => item.id === id)[0]
        tag.name = name
        store.commit('saveTags')
      }
    },
    removeTag(state, id: string) {
      let index = -1
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i
          break
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1)
        store.commit('saveTags')
        router.replace("/labels")
      } else {
        window.alert('删除失败!')
      }
    },
  }
})

export default store