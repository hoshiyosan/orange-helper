import Vue from 'vue'
import VueRouter from 'vue-router'
import Projects from '@/views/Projects'
import ProjectDetail from '@/views/ProjectDetail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/project/:projectCode',
    name: 'ProjectDetail',
    component: ProjectDetail
  },
  {
    path: '*',
    redirect: '/projects'
  }
]

const router = new VueRouter({
  routes
})

export default router
