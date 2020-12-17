import Vue from 'vue'
import VueRouter from 'vue-router'
import Projects from '@/views/Projects'
import Imputations from '@/views/Imputations'

Vue.use(VueRouter)

const routes = [
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/imputations',
    name: 'Imputations',
    component: Imputations
  }
]

const router = new VueRouter({
  routes
})

export default router
