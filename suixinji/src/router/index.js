import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import HomeContent from '../components/HomeContent'
import Detail from '../views/Detail'
import Accounting from '../views/Accounting'
import Statistics from '../views/Statistics'
import Tags from '../components/Tags'

Vue.use(VueRouter)

const routes = [
  // 嵌套路由
  {
    path: '/',
    redirect: '/home',
    // name: 'home',
    component: Home,
    children: [
      {
        path: 'home',
        component: HomeContent
      },
      {
        path: 'detail',
        component: Detail
      },
      {
        path: 'accounting',
        component: Accounting
      },
      {
        path: 'statistics',
        component: Statistics
      },
      {
        path: 'tags',
        component: Tags
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
