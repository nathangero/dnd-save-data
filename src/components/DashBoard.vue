<template>
  <div>
    <h1>Dashboard</h1>
    <p>Hello {{ getUserInfo.name }}</p>
    <button @click="signOut">Sign Out</button>
  </div>
</template>

<script>
// import { ROUTER_PATHS } from '@/enums/router-paths'
import { useStore } from 'vuex'
import Cookies from 'js-cookie'
import { COOKIE_NAMES } from '@/enums/cookie-names'

export default {
    name: 'DashBoard',
    data() {
        return {
            store: useStore()
        }
    },
    watch: {
      
    },
    mounted() {
      if (this.store.getters.getUser.id === '') {
        this.store.commit('setUser', JSON.parse(Cookies.get(COOKIE_NAMES.USER))) // Get backup if any
      }
    },
    computed: {
      getUserInfo() {
        const user = this.store.getters.getUser
        
        return user
      }
    },
    methods: {
      signOut() {
        this.store.commit('signOut')
      }
    }
}
</script>

<style>

</style>