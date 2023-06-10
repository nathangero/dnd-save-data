import { createRouter, createWebHistory } from 'vue-router'

import LoginScreen from './components/LoginScreen.vue'
import DashBoard from './components/DashBoard.vue'
import Campaigns from './components/CampaignsList.vue'
import Characters from './components/CharactersList.vue'
import Sessions from './components/SessionsList.vue'
import ROUTER_PATHS from './enums/router-paths'
import ROUTER_NAMES from './enums/router-names'

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
  {
    path: ROUTER_PATHS.CAMPAIGNS,
    name: ROUTER_NAMES.CAMPAIGNS,
    component: Campaigns
  },
  {
    path: ROUTER_PATHS.CHARACTERS,
    name: ROUTER_NAMES.CHARACTERS,
    component: Characters
  },
  {
    path: ROUTER_PATHS.SESSIONS,
    name: ROUTER_NAMES.SESSIONS,
    component: Sessions
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
