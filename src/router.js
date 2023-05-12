import { createRouter, createWebHistory } from 'vue-router'
import { ROUTER_PAGES } from '@/enum/router-pages.js'

import LoginScreen from './components/LoginScreen.vue'
import DashBoard from './components/DashBoard.vue'

const routes = [
  {
    path: ROUTER_PAGES.LOGIN,
    name: '',
    component: LoginScreen
  },
  {
    path: ROUTER_PAGES.DASHBOARD,
    name: 'dashboard',
    component: DashBoard
  },
  // {
  //   path: '',
  //   name: '',
  //   component: 
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
