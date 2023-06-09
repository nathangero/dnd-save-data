<template>
  <div class="body">
    <template v-if="getDictionarySize(store.getters.getUserCharacters) > 0">
      <div id="users-characters">
        <div class="list-container-characters">
          <ul class="list-characters">
            <li v-for="(item, key) in store.getters.getUserCharacters" :key="key">
              <div @click="toggleModalViewCharacter(key)">
                <div style="display: flex; flex-direction: row; justify-content: space-between;">
                  <label class="item-name">{{ item[CHARACTER_KEYS.NAME] }}</label>
                  <label class="item-amount">Level: {{ item[CHARACTER_KEYS.LEVEL] }}</label>
                </div>
                
                <label class="item-description">{{ item[CHARACTER_KEYS.CLASS] }}</label>
                <label class="item-description">{{ item[CHARACTER_KEYS.RACE] }}</label>
                <label class="item-description">Current HP: {{ item[CHARACTER_KEYS.HP][HP_KEYS.CURRENT] }}</label>
                <!-- <label class="item-description">Campaign: {{ item[CHARACTER_KEYS.CAMPAIGNS] }}</label> -->
              </div>
            </li>
          </ul>
        </div>
      </div>
    </template>

    <!-- View a character -->    
    <div id="view-character">
      <transition name="slide-up" mode="out-in">
        <template v-if="showModalViewCharacter">
          <div class="modal-page-overlay">
            <div class="modal-page scrollable">
              <button class="button-close" @click="toggleModalViewCharacter">Close</button>

              <h1 style="padding-top: 10px">{{ characterToView[CHARACTER_KEYS.NAME] }}</h1>
              <label class="item-description">Level: {{ characterToView[CHARACTER_KEYS.LEVEL] }}</label>
              <label class="item-description">{{ characterToView[CHARACTER_KEYS.CLASS] }}</label>
              <label class="item-description">{{ characterToView[CHARACTER_KEYS.BACKGROUND] }}</label>
              <label class="item-description">{{ characterToView[CHARACTER_KEYS.RACE] }}</label>
              <label class="item-description">{{ characterToView[CHARACTER_KEYS.ALIGNMENT] }}</label>
                
              <br><br>
              <h3>Base Stats</h3>
              <label class="item-description">Armor Class: {{ characterToView[CHARACTER_KEYS.ARMOR] }}</label>
              <label class="item-description">Initiative: {{ characterToView[CHARACTER_KEYS.INITIATIVE] }}</label>
              <label class="item-description">Speed: {{ characterToView[CHARACTER_KEYS.SPEED] }}</label>
              <label class="item-description">Current HP: {{ characterToView[CHARACTER_KEYS.HP][HP_KEYS.CURRENT] }}/{{ characterToView[CHARACTER_KEYS.HP][HP_KEYS.MAX] }}</label>

              <label class="item-description">{{ characterToView[CHARACTER_KEYS.STATS] }}</label>

              <h3>Saving Throws</h3>
              <label class="item-description">{{ characterToView[CHARACTER_KEYS.SAVING_THROWS] }}</label>
              
              <h3>Skills</h3>
              <label class="item-description">{{ characterToView[CHARACTER_KEYS.SKILLS] }}</label>

              
              <h3>Features & Traits</h3>
              <label class="item-description">{{ characterToView[CHARACTER_KEYS.FEATURES] }}</label>

              
              <h3>Equipment</h3>
              <label class="item-description">{{ characterToView[CHARACTER_KEYS.EQUIPMENT] }}</label>

              
              <h3>Languages</h3>
              <label class="item-description">{{ characterToView[CHARACTER_KEYS.LANGUAGES] }}</label>


              <h3>Spell Casting</h3>
              <label class="item-description">{{ characterToView[CHARACTER_KEYS.SPELLS] }}</label>


            </div>
          </div>
        </template>
      </transition>
    </div>
      
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { CHARACTER_KEYS } from '@/enums/dbKeys/character-keys.js'
import { HP_KEYS } from '@/enums/dbKeys/hp-keys.js'
import store from '@/store'

export default {
  data() {
    return {
      store: useStore(),
      showModalViewCharacter: false,
      usersCharacters: store.getters.getUserCharacters,
      CHARACTER_KEYS: CHARACTER_KEYS,
      HP_KEYS: HP_KEYS
    }
  },
  methods: {
    getDictionarySize(dict) {
      if (dict) {
        const count = Object.keys(dict).length;
        return count
      } else {
        return 0
      }
    },
    toggleModalViewCharacter(charId) {
      this.showModalViewCharacter = !this.showModalViewCharacter
      this.characterToView = this.usersCharacters[charId]
    }
  },
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

h3 {
  text-decoration: underline;
}
</style>