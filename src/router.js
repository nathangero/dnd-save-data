import { createRouter, createWebHistory } from 'vue-router'

import LoginScreen from './components/LoginScreen.vue'
// import About from './views/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: '',
    component: LoginScreen
  },
//   {
//     path: '/dashboard',
//     name: 'dashboard',
//     component: Dashboard
//   }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
