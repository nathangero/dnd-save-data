<template>
  <div class="main vh-100">
    <side-menu @click="toggleMenu"></side-menu>
    <h1>{{ getUserInfo.name }}'s campaigns</h1>
    <hr>

    <nav-bar :activeTab="ROUTER_NAMES.CAMPAIGNS"></nav-bar>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import NavBar from './NavBar.vue';
import SideMenu from '@/components/SideMenu.vue'
import Character from '@/models/character'
import Cookies from 'js-cookie'
import ROUTER_NAMES from '@/enums/router-names'
import COOKIE_NAMES from '@/enums/cookie-names'
import { CHARACTER_KEYS } from '@/enums/dbKeys/character-keys.js'
import { HP_KEYS } from '@/enums/dbKeys/hp-keys.js'

// const TIMEOUT_LOADER = 500
const TIMEOUT_TRANSITION = 200

export default {
  components: {
    NavBar,
    SideMenu,
  },
  data() {
    return {
      store: useStore(),
      isShowingCharacterList: true,
      isShowingModal: false,
      isModalNewCharacterOpen: false,
      isModalViewCharacterOpen: false,
      isMenuOpen: false,
      isNavBarOpen: true, // show by default
      characterToView: new Character(),
      characterToViewId: '',
      usersCharacters: {},
      ROUTER_NAMES: ROUTER_NAMES,
      CHARACTER_KEYS: CHARACTER_KEYS,
      HP_KEYS: HP_KEYS,
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
  },
  methods: {
    navigateTo(routeName) {
      this.$router.push({ name: routeName })
    },
    getDictionarySize(dict) {
      if (dict) {
        const count = Object.keys(dict).length;
        return count
      } else {
        return 0
      }
    },
    isModalOpen() {
      return this.isModalNewCharacterOpen || this.isModalViewCharacterOpen
    },
    toggleCharacterList() {
      this.isShowingCharacterList = !this.isShowingCharacterList
    },
    toggleModalCreateCharacter() {
      this.isModalNewCharacterOpen = !this.isModalNewCharacterOpen
    },
    toggleModalViewCharacter() {
      this.isModalViewCharacterOpen = !this.isModalViewCharacterOpen
    },
    toggleModalForViewCharacter(charId) {
      // console.info('charId:', charId)
      this.isShowingModal = !this.isShowingModal
      
      if (this.isShowingModal) {
        this.characterToView = this.store.getters.getUserCharacters[charId]
        this.characterToViewId = charId
        // console.info('this.characterToViewId:', this.characterToViewId)

        this.toggleCharacterList()
        setTimeout(() => {
          this.toggleModalViewCharacter()
          this.isNavBarOpen = !this.isNavBarOpen
        }, TIMEOUT_TRANSITION);
      } else {
        this.characterToView = new Character()
        this.characterToViewId = ''

        this.toggleModalViewCharacter()
        setTimeout(() => {
          this.toggleCharacterList()
          this.isNavBarOpen = !this.isNavBarOpen
        }, TIMEOUT_TRANSITION);
      }
    },
    toggleModalForCreateCharacter() {
      this.isShowingModal = !this.isShowingModal
      
      if (this.isShowingModal) {
        this.toggleCharacterList()
        setTimeout(() => {
          this.toggleModalCreateCharacter()
          this.isNavBarOpen = !this.isNavBarOpen
        }, TIMEOUT_TRANSITION);
      } else {
        this.toggleModalCreateCharacter()
        setTimeout(() => {
          this.toggleCharacterList()
          this.isNavBarOpen = !this.isNavBarOpen
        }, TIMEOUT_TRANSITION);
      }
    },
  }
}
</script>

<style scoped>


@media (prefers-color-scheme: dark) {

  .main {
    background-color: black;
    color: white;
  }
}

</style>