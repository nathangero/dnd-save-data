<template>
  <div>
    <h1>Dashboard</h1>
    <p>Hello {{ getUserInfo.name }}</p>
    <button @click="signOut">Sign Out</button>
  </div>
</template>

<script>
import { ROUTER_PAGES } from '@/enum/router-pages.js'
import { useStore } from 'vuex'
import { auth } from '@/firebase'

export default {
    name: 'DashBoard',
    data() {
        return {
            store: useStore()
        }
    },
    created() {
        
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
        auth.signOut()
        this.$router.push(ROUTER_PAGES.LOGIN)
      }
    }
}
</script>

<style>

</style>