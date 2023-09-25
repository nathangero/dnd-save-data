<template>
  <div class="body" ref="bodyRef">
    <transition name="slide-up" mode="out-in">
      <div class="content" ref="contentRef" v-if="isShowingCharacterList">
        <side-menu @click="toggleMenu"></side-menu>
        
        <h1>{{ getUserInfo.name }}'s characters</h1>
        <div class="top-buttons">
          <button class="button-open-modal" @click="toggleModalForCreateCharacter">Create Character</button>
        </div>

        <hr v-if="!isMenuOpen">
        <hr v-if="isMenuOpen" style="visibility: hidden ;" >
        
        <!-- Character summary -->
        <template v-if="getDictionarySize(store.getters.getUserCharacters) > 0">
          <character-summary :list-of-characters="store.getters.getUserCharacters" @openModal="toggleModalForViewCharacter"></character-summary>
        </template>
      </div>
    </transition>

    <!-- View a character -->
    <transition name="slide-up" mode="out-in">
      <template v-if="isModalViewCharacterOpen">
        <character-page v-if="isModalViewCharacterOpen" :characterToViewId="characterToViewId" @close="toggleModalForViewCharacter"></character-page>          
      </template>
    </transition>

    <!-- Create a new character -->
    <transition name="slide-up" mode="out-in">
      <template v-if="isModalNewCharacterOpen">
        <character-create v-if="isModalNewCharacterOpen" @close="toggleModalForCreateCharacter" @created-character="toggleModalForCreateCharacter"></character-create>
      </template>
    </transition>

    <!-- Bottom Navigation Bar -->
    <nav class="bottom-navigation" v-if="isNavBarOpen">
      <ul>
        <li @click="navigateTo(ROUTER_NAMES.CAMPAIGNS)" :class="{ active: currentRoute === ROUTER_NAMES.CAMPAIGNS }">
          <i class="fas fa-campaigns"></i>
          {{ ROUTER_NAMES.CAMPAIGNS.charAt(0).toUpperCase() + ROUTER_NAMES.CAMPAIGNS.slice(1) }}
        </li>
        <li @click="navigateTo(ROUTER_NAMES.CHARACTERS)" :class="{ active: currentRoute === ROUTER_NAMES.CHARACTERS }">
          <i class="fas fa-characters"></i>
          {{ ROUTER_NAMES.CHARACTERS.charAt(0).toUpperCase() + ROUTER_NAMES.CHARACTERS.slice(1) }}
        </li><li @click="navigateTo(ROUTER_NAMES.SESSIONS)" :class="{ active: currentRoute === ROUTER_NAMES.SESSIONS }">
          <i class="fas fa-sessions"></i>
          {{ ROUTER_NAMES.SESSIONS.charAt(0).toUpperCase() + ROUTER_NAMES.SESSIONS.slice(1) }}
        </li>
      </ul>
    </nav>
    
  </div>
</template>

<script>
import { useStore } from 'vuex'
import CharacterCreate from './CharacterCreate.vue';
import CharacterSummary from './CharacterSummary.vue';
import CharacterPage from '@/components/CharacterPage.vue'
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
    CharacterCreate,
    CharacterSummary,
    CharacterPage,
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
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
      this.isNavBarOpen = !this.isNavBarOpen
      if (this.isMenuOpen) {
        this.$refs.contentRef.style.backgroundColor = 'gray';        
      } else {
        this.$refs.contentRef.style.backgroundColor = ''
      }
    },
  }
}
</script>

<style scoped>
@import '../styles/reset.css';
/* @import '../styles/character-summary.css'; */
/* @import '../styles/popup.css'; */
@import '../styles/transitions.css';

</style>