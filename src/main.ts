import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Layout from '@/components/Layout.vue'
import Icon from '@/components/Icon.vue'
import tagListModel from '@/models/tagListModel'
import recordListModel from '@/models/recordListModel'

Vue.config.productionTip = false

//引入全局组件
Vue.component('Layout', Layout)
Vue.component('Icon', Icon)

//record store
window.recordList = recordListModel.fetch()
window.createRecord = (record: RecordItem) => recordListModel.create(record)
//tag store
window.tagList = tagListModel.fetch()
window.findTag = (id: string) => window.tagList.filter(t => t.id === id)[0]
window.createTag = () => {
  const name = window.prompt("请输出标签名:");
  if (name) {
    const message = tagListModel.create(name);
    if (message === "duplicated") {
      window.alert("标签名重复!");
    } else if (message === "success") {
      window.alert("添加成功!");
    }
  }
}
window.updateTag = (id: string, name: string) => tagListModel.update(id, name)
window.removeTag = (tag: Tag) => tagListModel.remove(tag.id)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
