<template>
  <div class="body" ref="bodyRef">
    <side-menu @click="toggleMenu"></side-menu>

    <div class="content" ref="contentRef">
      <h1>{{ getUserInfo.name }}'s characters</h1>
      <div class="top-buttons">
        <button class="button-open-modal" @click="toggleModalNewCharacter">Create Character</button>
      </div>

      <hr v-if="!isMenuOpen">
      <hr v-if="isMenuOpen" style="visibility: hidden ;" >
      
      <!-- Character summary -->
      <template v-if="getDictionarySize(store.getters.getUserCharacters) > 0">
        <div id="users-characters-summary">
          <div class="list-container-characters">
            <ul class="list-characters">
              <li v-for="(item, key) in store.getters.getUserCharacters" :key="key">
                <div @click="toggleModalViewCharacter(key)">
                  <div style="display: flex; flex-direction: row; justify-content: space-between;">
                    <label class="summary-name">{{ item[CHARACTER_KEYS.NAME] }}</label>
                    <label class="summary-amount" style="white-space: nowrap;">Level: {{ item[CHARACTER_KEYS.LEVEL] }}</label>
                  </div>
                  
                  <label class="summary-description">{{ item[CHARACTER_KEYS.CLASS] }}</label>
                  <label class="summary-description">{{ item[CHARACTER_KEYS.RACE] }}</label>
                  <label class="summary-description">Current HP: {{ item[CHARACTER_KEYS.HP][HP_KEYS.CURRENT] }}</label>
                  <!-- <label class="summary-description">Campaign: {{ item[CHARACTER_KEYS.CAMPAIGNS] }}</label> -->
                </div>
              </li>
            </ul>
          </div>
        </div>
      </template>


      <transition name="slide-up" mode="out-in">
        <template v-if="isModalViewCharacterOpen">
          <div class="modal-page-overlay">
            <div class="modal-page scrollable">
              <character-page v-if="isModalViewCharacterOpen" :characterToViewId="characterToViewId" @close="toggleModalViewCharacter"></character-page>
            </div>
          </div>
          
        </template>
      </transition>

      

      <!-- Create a new character -->
      <div id="create-character">
        <transition name="slide-up" mode="out-in">
          <template v-if="isModalNewCharacterOpen">
            <div class="modal-page-overlay">
              <div class="modal-page scrollable">
                <character-create v-if="isModalNewCharacterOpen" @close="toggleModalNewCharacter"></character-create>
              </div>
            </div>
            
          </template>
        </transition>
      </div>
    </div>

    <!-- Bottom Navigation Bar -->
    <nav class="bottom-navigation" v-if="isNavBarOpen">
      <ul>
        <li @click="navigateTo([ROUTER_NAMES.CAMPAIGNS])" :class="{ active: currentRoute === ROUTER_NAMES.CAMPAIGNS }">
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
import CharacterPage from '@/components/CharacterPage.vue'
import SideMenu from '@/components/SideMenu.vue'
import { createNewCharacter } from '@/functions/rtdb'
import Character from '@/models/character'
import Cookies from 'js-cookie'
import ROUTER_NAMES from '@/enums/router-names'
import COOKIE_NAMES from '@/enums/cookie-names'
import { CHARACTER_KEYS } from '@/enums/dbKeys/character-keys.js'
import { HP_KEYS } from '@/enums/dbKeys/hp-keys.js'


export default {
  components: {
    CharacterCreate,
    CharacterPage,
    SideMenu,
  },
  data() {
    return {
      store: useStore(),
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
    createCharacter() {
      console.info("@createCharacter")
      if (this.checkIfAllValid()) {
        const newCharacter = this.createCharacterDictionary()
        console.info('character:', newCharacter)
        // alert("New Character created!")
        createNewCharacter(this.store.getters.getUser.id, newCharacter).then((success => {
          if (success) {
            alert("New Character created!")
            this.resetVariables()
            this.toggleModalNewCharacter()
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            alert("An error occurred creating your character. Please try again")
          }
        }))
      }
    },
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
    toggleModalNewCharacter() {
      this.isModalNewCharacterOpen = !this.isModalNewCharacterOpen
      this.isNavBarOpen = !this.isNavBarOpen
    },
    toggleModalViewCharacter(charId) {
      this.isModalViewCharacterOpen = !this.isModalViewCharacterOpen
      this.isNavBarOpen = !this.isNavBarOpen

      if (this.isModalViewCharacterOpen) {
        this.characterToView = this.store.getters.getUserCharacters[charId]
        this.characterToViewId = charId
      } else {
        this.characterToView = new Character()
        this.characterToViewId = ''
      }
      
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
      this.isNavBarOpen = !this.isNavBarOpen
      if (this.isMenuOpen) {
        this.$refs.contentRef.style.backgroundColor = 'gray';
        // this.$refs.bodyRef.style.height = 100%
        
      } else {
        this.$refs.contentRef.style.backgroundColor = ''
      }
    },
  }
}
</script>

<style>
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
  margin: 0%;
  height: 110dvh;
}

.content {
  height: 100%;
}

/* CHARACTER SUMMARY STYLE */

.list-container-characters {
  display: flex;
  justify-content: center;
  width: 90%;
  margin: 0 auto; /* centers the container */
}

.list-characters li {
  width: 90%;
  list-style: none;
  border: 2px solid black;
  border-radius: 10px; /* Rounded corners */
  text-align: left;
  margin-bottom: 10px;
  padding: 5px;
}

.summary-name {
  font-weight: bold;
  font-size: larger;
  margin-right: 20px;
}

.summary-amount{
  font-size: larger;
}

.summary-description {
  width: 80%;
  font-size: larger;
  text-align: left;
}


/* MODAL STYLING */

.modal-page.scrollable {
  overflow-y: scroll;
  height: 100dvh;
}

.modal-page-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-page {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: white;
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