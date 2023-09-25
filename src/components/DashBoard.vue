<template>
  <div class="body">
    <side-menu @click="toggleMenu"></side-menu>
    
    <div class="content" ref="contentRef">
      <h1>Dashboard</h1>
      <p style="font-size: larger;">Hello {{ getUserInfo.name }}</p>

      <!-- Bottom Navigation Bar -->
      <nav class="bottom-navigation" v-if="isNavBarOpen">
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
  </div>
</template>

<script>
import { useStore } from 'vuex'
import SideMenu from '@/components/SideMenu.vue'
import COOKIE_NAMES from '@/enums/cookie-names'
import ROUTER_NAMES from '@/enums/router-names'
import Cookies from 'js-cookie'

export default {
  name: 'DashBoard',
  components: {
    SideMenu,
  },
  data() {
    return {
      store: useStore(),
      isNavBarOpen: true, // show by default
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
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
      this.isNavBarOpen = !this.isNavBarOpen
      if (this.isMenuOpen) {
        this.$refs.contentRef.style.backgroundColor = 'gray';        
      } else {
        this.$refs.contentRef.style.backgroundColor = ''
      }
    },
    navigateTo(routeName) {
      this.$router.push({ name: routeName })
    }
  }
}
</script>

<style scoped>

.content {
  height: 100dvh
}

.bottom-navigation {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #f1f1f1;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px 0;
}

.bottom-navigation ul {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  margin: 20;
}

.bottom-navigation li {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 15px;
  color: #777;
  cursor: pointer;
  margin-right: 40px;
}

.bottom-navigation li:last-child {
  margin-right: 0; /* Remove margin from the last element */
}

.bottom-navigation li i {
  margin-bottom: 10px;
}

.bottom-navigation li.active {
  color: #333;
}
</style>