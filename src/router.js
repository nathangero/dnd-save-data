import { createRouter, createWebHistory } from 'vue-router'

import LoginScreen from './components/LoginScreen.vue'
import DashBoard from './components/DashBoard.vue'
import { ROUTER_PATHS } from './enums/router-paths'
import { ROUTER_NAMES } from './enums/router-names'

const routes = [
  {
    path: ROUTER_PATHS.LOGIN,
    name: ROUTER_NAMES.LOGIN,
    component: LoginScreen
  },
  {
    path: ROUTER_PATHS.DASHBOARD,
    name: ROUTER_NAMES.DASHBOARD,
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
