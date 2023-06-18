import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import MoneyView from '@/views/MoneyView.vue'
import LabelsView from '@/views/LabelsView.vue'
import StatisticsView from '@/views/StatisticsView.vue'
import EditLabel from '@/views/EditLabel.vue'
import NotFound from '@/views/NotFound.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path:'/',
    redirect:'/money'
  },
  {
    path:'/money',
    component:MoneyView,
  },
  {
    path:'/labels',
    component:LabelsView,
  },
  {
    path:'/statistics',
    component:StatisticsView,
  },
  {
    path:'/labels/edit/:id',
    component:EditLabel,
  },
  {
    path:'*',
    component:NotFound,
  },
]

const router = new VueRouter({
  routes
})

export default router
