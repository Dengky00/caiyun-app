import clone from '@/lib/clone';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
  },
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || "[]") as RecordItem[]
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    createRecord(state, record: RecordItem) {
      store.commit('fetchRecords')
      const recordClone = clone(record);
      recordClone.createdAt = new Date();
      state.recordList.push(recordClone);
      store.commit('saveRecords')
    },
  }
})

export default store