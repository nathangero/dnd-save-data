<template>
  <div class="body" ref="bodyRef">
    <transition name="slide-up" mode="out-in">
      <div class="content" ref="contentRef" v-if="isShowingCharacterList">
        <side-menu @click="toggleMenu"></side-menu>
        
        <h1>{{ getUserInfo.name }}'s characters</h1>
        <div class="top-buttons">
          <button class="button-open-modal" @click="toggleModalNewCharacter">Create Character</button>
        </div>

        <hr v-if="!isMenuOpen">
        <hr v-if="isMenuOpen" style="visibility: hidden ;" >
        
        <!-- Character summary -->
        <template v-if="getDictionarySize(store.getters.getUserCharacters) > 0">
          <character-summary :list-of-characters="store.getters.getUserCharacters" @openModal="toggleModalViewCharacter"></character-summary>
        </template>
      </div>
    </transition>

    <!-- View a character -->
    <transition name="slide-up" mode="out-in">
      <template v-if="isModalViewCharacterOpen">
        <character-page v-if="isModalViewCharacterOpen" :characterToViewId="characterToViewId" @close="toggleModalViewCharacter"></character-page>          
      </template>
    </transition>

    <!-- Create a new character -->
    <transition name="slide-up" mode="out-in">
      <template v-if="isModalNewCharacterOpen">
        <character-create v-if="isModalNewCharacterOpen" @close="toggleModalNewCharacter" @created-character="toggleModalNewCharacter"></character-create>
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
    showCharacterList() {
      // Allow transition to play out before showing character list
      setTimeout(() => {
          this.isShowingCharacterList = !this.isShowingCharacterList
        }, 200);
    },
    toggleModalNewCharacter() {
      this.isModalNewCharacterOpen = !this.isModalNewCharacterOpen
      this.isNavBarOpen = !this.isNavBarOpen
    },
    toggleModalViewCharacter(charId) {
      this.isModalViewCharacterOpen = !this.isModalViewCharacterOpen
      this.isNavBarOpen = !this.isNavBarOpen

      if (this.isModalViewCharacterOpen) {
        this.isShowingCharacterList = !this.isShowingCharacterList
        this.characterToView = this.store.getters.getUserCharacters[charId]
        this.characterToViewId = charId
      } else {
        this.characterToView = new Character()
        this.characterToViewId = ''

        this.showCharacterList()
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
@import '../syles/character-summary.css';
@import '../syles/popup.css';

.slide-up-enter-active {
  transition: transform 0.3s;
}

.slide-up-leave-active {
  transition: transform 0.4s;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}

.slide-up-enter-to,
.slide-up-leave {
  transform: translateY(0);
}

.body {
  height: 100dvh;
}

.content {
  height: 100%;
}

/* BUTTON STYLES */

.button-open-modal {
  margin: 0 auto;
  padding: 5px 10px;
  background-color: dimgray;
  border: none;
  color: white;
  border-radius: 10px;
  font-size: larger;
}

.button-create-character {
  padding: 10px;
  background-color: #42B6E8;
  border: none;
  color: white;
  border-radius: 10px;
  font-size: x-large;
  margin-top: 10%;
  margin-bottom: 10%;
}
</style>