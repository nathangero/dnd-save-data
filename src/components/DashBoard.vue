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
        try {
          const userCookie = Cookies.get(COOKIE_NAMES.USER)
          if (userCookie != undefined) {
            const userJson = JSON.parse(userCookie)
            // console.info('userCookie: ' + JSON.stringify(userJson))
            this.store.commit('setUser', userJson)
          }
          
        } catch (error) {
          console.info(error)
        }
        
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