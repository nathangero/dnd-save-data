<template>
  <div>
    <h1>{{ getUserInfo.name }}'s campaigns</h1>



    <!-- Bottom Navigation Bar -->
    <nav class="bottom-navigation">
      <ul>
        <li @click="navigateTo(ROUTER_NAMES.Campaigns)" :class="{ active: currentRoute === ROUTER_NAMES.Campaigns }">
          <i class="fas fa-campaigns"></i>
          {{ ROUTER_NAMES.Campaigns.charAt(0).toUpperCase() + ROUTER_NAMES.Campaigns.slice(1) }}
        </li>
        <li @click="navigateTo(ROUTER_NAMES.Characters)" :class="{ active: currentRoute === ROUTER_NAMES.Characters }">
          <i class="fas fa-characters"></i>
          {{ ROUTER_NAMES.Characters.charAt(0).toUpperCase() + ROUTER_NAMES.Characters.slice(1) }}
        </li><li @click="navigateTo(ROUTER_NAMES.Sessions)" :class="{ active: currentRoute === ROUTER_NAMES.Sessions }">
          <i class="fas fa-sessions"></i>
          {{ ROUTER_NAMES.Sessions.charAt(0).toUpperCase() + ROUTER_NAMES.Sessions.slice(1) }}
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ROUTER_NAMES } from '@/enums/router-names'
import { COOKIE_NAMES } from '@/enums/cookie-names'
import Cookies from 'js-cookie'

export default {
    name: ROUTER_NAMES.CAMPAIGNS.charAt(0).toUpperCase() + ROUTER_NAMES.CAMPAIGNS.slice(1),
    data() {
        return {
            store: useStore(),
        }
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
      },
      ROUTER_NAMES() {
        return {
          Campaigns: ROUTER_NAMES.CAMPAIGNS,
          Characters: ROUTER_NAMES.CHARACTERS,
          Sessions: ROUTER_NAMES.SESSIONS
        };
      }
    },
    methods: {
      navigateTo(routeName) {
        this.$router.push({ name: routeName })
      }
    }
}
</script>

<style>

</style>