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

              <ul class="stat-list">
                <li>
                  <label class="item-label">{{ characterToView[CHARACTER_KEYS.CLASS] }}</label>
                </li>

                <li>
                  <label class="item-label">{{ characterToView[CHARACTER_KEYS.BACKGROUND] }}</label>
                </li>

                <li>
                  <label class="item-label">{{ characterToView[CHARACTER_KEYS.RACE] }}</label>
                </li>

                <li>
                  <label class="item-label">{{ characterToView[CHARACTER_KEYS.ALIGNMENT] }}</label>
                </li>
              </ul>
              
                
              <br><br>
              <h3>Base Stats</h3>
              <div class="container-inputs">
                <ul class="list-inputs">
                  <li>
                    <label class="stat-label">Level:</label>
                    <label class="stat-value">{{ characterToView[CHARACTER_KEYS.LEVEL] }}</label>
                  </li>

                  <li>
                    <label class="stat-label">Armor Class: </label>
                    <label class="stat-value">{{ characterToView[CHARACTER_KEYS.ARMOR] }}</label>
                  </li>
                  
                  <li>
                    <label class="stat-label">Initiative: </label>
                    <label class="stat-value">{{ characterToView[CHARACTER_KEYS.INITIATIVE] }}</label>
                  </li>
                  
                  <li>
                    <label class="stat-label">Speed: </label>
                    <label class="stat-value">{{ characterToView[CHARACTER_KEYS.SPEED] }}</label>
                  </li>
                  
                  <li>
                    <label class="stat-label" style="margin-right: 20px;">Current HP: </label>
                    <label class="stat-value">{{ characterToView[CHARACTER_KEYS.HP][HP_KEYS.CURRENT] }}/{{ characterToView[CHARACTER_KEYS.HP][HP_KEYS.MAX] }}</label>
                  </li>
                </ul>
              </div>

              <ul class="stat-list">
                <li>
                  <div class="stat-group">
                    <label class="stat-label">Strength: </label>
                    <label class="stat-value">{{ characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.STRENGTH] }}</label>
                    <label class="stat-bonus">{{ getStatBonus(characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.STRENGTH_BONUS]) }}</label>
                  </div>
                </li>
                
                <li>
                  <div class="stat-group">
                    <label class="stat-label">Dexterity: </label>
                    <label class="stat-value">{{ characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.DEXTERITY] }}</label>
                    <label class="stat-bonus">{{ getStatBonus(characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.DEXTERITY_BONUS]) }}</label>
                  </div>
                </li>
                  
                <li>
                  <div class="stat-group">
                    <label class="stat-label">Consitution: </label>
                    <label class="stat-value">{{ characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.CONSTITUTION] }}</label>
                    <label class="stat-bonus">{{ getStatBonus(characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.CONSTITUTION_BONUS]) }}</label>
                  </div>
                </li>

                <li>
                  <div class="stat-group">
                    <label class="stat-label">Intelligence: </label>
                    <label class="stat-value">{{ characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.INTELLIGENCE] }}</label>
                    <label class="stat-bonus">{{ getStatBonus(characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.INTELLIGENCE_BONUS]) }}</label>
                  </div>
                </li>

                <li>
                  <div class="stat-group">
                    <label class="stat-label">Wisdom: </label>
                    <label class="stat-value">{{ characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.WISDOM] }}</label>
                    <label class="stat-bonus">{{ getStatBonus(characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.WISDOM_BONUS]) }}</label>
                  </div>
                </li>

                <li>
                  <div class="stat-group">
                    <label class="stat-label">Charisma: </label>
                    <label class="stat-value">{{ characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.CHARISMA] }}</label>
                    <label class="stat-bonus">{{ getStatBonus(characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.CHARISMA_BONUS]) }}</label>
                  </div>
                </li>
              </ul>

              <br>
              <h3>Saving Throws</h3>
              <label class="item-description">{{ characterToView[CHARACTER_KEYS.SAVING_THROWS] }}</label>
              
              <br>
              <h3>Skills</h3>
              <label class="item-description">{{ characterToView[CHARACTER_KEYS.SKILLS] }}</label>

              <br>
              <h3>Features & Traits</h3>
              <label class="item-description">{{ characterToView[CHARACTER_KEYS.FEATURES] }}</label>

              <br>
              <h3>Equipment</h3>
              <label class="item-description">{{ characterToView[CHARACTER_KEYS.EQUIPMENT] }}</label>

              <br>
              <h3>Languages</h3>
              <label class="item-description">{{ characterToView[CHARACTER_KEYS.LANGUAGES] }}</label>

              <br>
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
import { BASE_STAT_KEYS } from '@/enums/dbKeys/baseStat-keys.js'
import { CHARACTER_KEYS } from '@/enums/dbKeys/character-keys.js'
import { HP_KEYS } from '@/enums/dbKeys/hp-keys.js'
import store from '@/store'

export default {
  data() {
    return {
      store: useStore(),
      showModalViewCharacter: false,
      usersCharacters: store.getters.getUserCharacters,
      BASE_STAT_KEYS: BASE_STAT_KEYS,
      CHARACTER_KEYS: CHARACTER_KEYS,
      HP_KEYS: HP_KEYS,
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
    getStatBonus(stat) {
      if (stat < 0) {
        return stat // the negative will already be apart of the number
      } else {
        return "+" + stat
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


/* LIST - ENTERING INPUT STYLE */

.container-inputs {
  display: flex;
  justify-content: space-evenly;
  margin: 0 auto;
}

.list-inputs {
  list-style: none;
}

.list-inputs li {
  display: flex;
  align-items: center;
}

/* LIST - ADDED ITEMS STYLE */

.item-input {
  width: 80%;
  margin-left: 5px; /* Adjust the spacing between the label and input */
  border: none; /* Remove the default border */
  border-bottom: 1px solid black; /* Add a bottom border */
  outline: none;
  padding-left: 0;
  padding-bottom: 5px;
}

.list-container {
  display: flex;
  justify-content: center;
  width: 90%;
  margin: 0 auto; /* centers the container */
  border: 1px solid black;
  border-radius: 10px; /* Rounded corners */
}

.list li {
  text-align: left;
  margin-bottom: 10px;
}

.item-name {
  font-weight: bold;
  font-size: larger;
  margin-right: 20px;
}

.item-label {
  font-size: large;
}

.item-amount {
  font-size: large;
}

.item-description {
  width: 80%;
  font-size: large;
  text-align: left;
}


/* STAT STYLE */

.stat-list {
  display: flex;
  flex-direction: column;
  list-style-type: none;
  width: 50%;
  margin: 0 auto;
  padding-left: 0;
}

.stat-group {
  display: flex;
  align-items: center;
}

.stat-label {
  text-align: left;
  font-size: large;
}

.stat-value {
  flex-grow: 1;
  text-align: right;
  font-size: large;
}

.stat-bonus {
  margin-left: 10px; /* Adjust as needed */
  text-align: right;
  font-size: large;
}
</style>