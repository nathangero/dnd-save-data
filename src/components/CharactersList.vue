<template>
  <div>
    <transition name="slide-up" mode="out-in">
      <div v-if="isShowingCharacterList">
        <side-menu @click="toggleMenu"></side-menu>
        
        <h1>{{ getUserInfo.name }}'s characters</h1>
        <button @click="toggleModalForCreateCharacter">Create Character</button>

        <hr v-if="!isMenuOpen">
        <hr v-if="isMenuOpen" style="visibility: hidden ;" >
        
        <!-- Character summary -->
        <template v-if="getDictionarySize(store.getters.getUserCharacters) > 0">
          <character-summary :list-of-characters="store.getters.getUserCharacters" @openModal="toggleModalForViewCharacter"></character-summary>
        </template>

        <nav>
          <ul class="nav justify-content-between fixed-bottom text-capitalize fs-5 custom-navbar">
            <li class="nav-item" @click="navigateTo(ROUTER_NAMES.CAMPAIGNS)">
              <a class="nav-link text-dark text-lg-center p-3">{{ ROUTER_NAMES.CAMPAIGNS }}</a>
            </li>
            
            <li class="nav-item" @click="navigateTo(ROUTER_NAMES.CHARACTERS)">
              <a class="nav-link text-dark p-3">{{ ROUTER_NAMES.CHARACTERS }}</a>
            </li>

            <li class="nav-item" @click="navigateTo(ROUTER_NAMES.SESSIONS)">
              <a class="nav-link text-dark p-3">{{ ROUTER_NAMES.SESSIONS }}</a>
            </li>
          </ul>
        </nav>
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
  }
}
</script>

<style scoped>
@import '../styles/reset.css';
@import "../styles/colors.css";
/* @import '../styles/character-summary.css'; */
/* @import '../styles/popup.css'; */
/* @import '../styles/transitions.css'; */

button {
  color: var(--white);
  padding: 5px 10px;
  margin-top: 10px;
  border: none;
  border-radius: var(--border-radius);
  font-size: var(--stat-font-size);
  background-color: var(--dimgray);
}

.custom-navbar {
  background-color: var(--light-gray);
}

</style>