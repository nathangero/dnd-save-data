<template>
  <div class="body">
    <div id="character-info">
      <button class="button-close" @click="closeModal('')">Close</button>
      <p class="character-name">{{ characterToView[CHARACTER_KEYS.NAME] }}</p>

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
      
        
      <br>
      <div id="character-info">
        <div class="edit-buttons">
          <button class="button-edit-spacer">Edit</button>
          <h3>Character Info</h3>
          <button class="button-edit">Edit</button>
        </div>
        <ul class="stat-list">
          <li>
            <div class="stat-group">
              <label class="stat-label">Level:</label>
              <label class="stat-value">{{ characterToView[CHARACTER_KEYS.LEVEL] }}</label>
            </div>
          </li>

          <li>
            <div class="stat-group">
              <label class="stat-label">Armor Class: </label>
              <label class="stat-value">{{ characterToView[CHARACTER_KEYS.ARMOR] }}</label>
            </div>
          </li>
          
          <li>
            <div class="stat-group">
              <label class="stat-label">Initiative: </label>
              <label class="stat-value">{{ characterToView[CHARACTER_KEYS.INITIATIVE] }}</label>
            </div>
          </li>
          
          <li>
            <div class="stat-group">
              <label class="stat-label">Speed: </label>
              <label class="stat-value">{{ characterToView[CHARACTER_KEYS.SPEED] }}</label>
            </div>
          </li>
          
          <li>
            <div class="stat-group">
              <label class="stat-label" style="margin-right: 20px;">Current HP: </label>
              <label class="stat-value">{{ characterToView[CHARACTER_KEYS.HP][HP_KEYS.CURRENT] }}/{{ characterToView[CHARACTER_KEYS.HP][HP_KEYS.MAX] }}</label>
            </div>
          </li>
        </ul>
      </div>

      <br>
      <div id="base-stats">
        <div class="edit-buttons">
          <button class="button-edit-spacer">Edit</button>
          <h3>Base Stats</h3>
          <button class="button-edit">Edit</button>
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
      </div>

      <br>
      <div id="saving-throws">
        <div class="edit-buttons">
          <button class="button-edit-spacer">Edit</button>
          <h3>Saving Throws</h3>
          <button class="button-edit">Edit</button>
        </div>
        <ul class="stat-list">
          <li>
            <div class="stat-group">
              <label class="stat-label">Strength: </label>
              <label class="stat-value">{{ getStatBonus(characterToView[CHARACTER_KEYS.SAVING_THROWS][BASE_STAT_KEYS.STRENGTH]) }}</label>
            </div>
          </li>
          
          <li>
            <div class="stat-group">
              <label class="stat-label">Dexterity: </label>
              <label class="stat-value">{{ getStatBonus(characterToView[CHARACTER_KEYS.SAVING_THROWS][BASE_STAT_KEYS.DEXTERITY]) }}</label>
            </div>
          </li>
            
          <li>
            <div class="stat-group">
              <label class="stat-label">Consitution: </label>
              <label class="stat-value">{{ getStatBonus(characterToView[CHARACTER_KEYS.SAVING_THROWS][BASE_STAT_KEYS.CONSTITUTION]) }}</label>
            </div>
          </li>

          <li>
            <div class="stat-group">
              <label class="stat-label">Intelligence: </label>
              <label class="stat-value">{{ getStatBonus(characterToView[CHARACTER_KEYS.SAVING_THROWS][BASE_STAT_KEYS.INTELLIGENCE]) }}</label>
            </div>
          </li>

          <li>
            <div class="stat-group">
              <label class="stat-label">Wisdom: </label>
              <label class="stat-value">{{ getStatBonus(characterToView[CHARACTER_KEYS.SAVING_THROWS][BASE_STAT_KEYS.WISDOM]) }}</label>
            </div>
          </li>

          <li>
            <div class="stat-group">
              <label class="stat-label">Charisma: </label>
              <label class="stat-value">{{ getStatBonus(characterToView[CHARACTER_KEYS.SAVING_THROWS][BASE_STAT_KEYS.CHARISMA]) }}</label>
            </div>
          </li>
        </ul>
      </div>
      
      <br>
      <div id="skills">
        <div class="edit-buttons">
          <button class="button-edit-spacer">Edit</button>
          <h3>Skills</h3>
          <button class="button-edit">Edit</button>
        </div>
        <ul class="stat-list">
          <li v-for="(skill, key) in SKILL_KEYS" :key="key">
            <div class="stat-group">
              <label class="stat-label">{{ SKILL_NAMES[skill] }}:</label>
              <label class="stat-value">{{ getStatBonus(characterToView[CHARACTER_KEYS.SKILLS][skill]) }}</label>
            </div>
          </li>
        </ul>
      </div>

      <br>
      <div id="features-traits">
        <div class="edit-buttons">
          <button class="button-edit-spacer">Edit</button>
          <h3>Features & Traits</h3>
          <button class="button-edit">Edit</button>
        </div>
        <template v-if="getDictionarySize(characterToView[CHARACTER_KEYS.FEATURES]) > 0">
          <div class="list-container-character">
            <ul class="list">
              <li v-for="(item, key) in characterToView[CHARACTER_KEYS.FEATURES]" :key="key">
                <div>
                  <label class="item-name">{{ key }}</label>
                  <label class="item-amount">x{{ item[FEATURES_KEYS.USES] }}</label>
                </div>
                <label class="item-type">Type: {{ item[FEATURES_KEYS.TYPE] }}</label>
                <label class="item-description">{{ item[FEATURES_KEYS.DESCRIPTION] }}</label>
              </li>
            </ul>
          </div>
        </template>
      </div>

      <br>
      <div id="equipment">
        <div class="edit-buttons">
          <button class="button-edit-spacer">Edit</button>
          <h3>Equipment</h3>
          <button class="button-edit">Edit</button>
        </div>
        <template v-if="getDictionarySize(characterToView[CHARACTER_KEYS.EQUIPMENT]) > 0">
          <div class="list-container-character">
            <ul class="list">
              <li v-for="(item, key) in characterToView[CHARACTER_KEYS.EQUIPMENT]" :key="key">
                <div>
                  <label class="item-name">{{ key }}</label>
                  <label class="item-amount">x{{ item[EQUIPMENT_KEYS.AMOUNT] }}</label>
                </div>
                <label class="item-description">{{ item[EQUIPMENT_KEYS.DESCRIPTION] }}</label>
              </li>
            </ul>
          </div>
        </template>
      </div>
      
      
      <br>
      <div id="languages">
        <div class="edit-buttons">
          <button class="button-edit-spacer">Edit</button>
          <h3>Languages</h3>
          <button class="button-edit" @click="toggleEditLanguages">Edit</button>
        </div>
        <template v-if="getDictionarySize(characterToView[CHARACTER_KEYS.LANGUAGES]) > 0">
          <div class="list-container-character">
            <ul class="list">
              <li v-for="(item, key) in characterToView[CHARACTER_KEYS.LANGUAGES]" :key="key">
                <div style="display: flex; flex-direction: row;">
                  <label class="item-name">{{ key }}:</label>
                  <label class="item-description">{{ item }}</label>
                </div>
                <div v-if="isEditingLanguages">
                  <br>
                  <button @click="onPressDeleteLanguage(key)">Delete</button>
                </div>
              </li>
            </ul>
          </div>
        </template>

        <template v-if="isEditingLanguages">
          <div class="language-container">
            <input class="item-input" type="text" v-model="languagesTempName" placeholder="Language name"> 
            <div style="margin-top: 10px;">
              <label>Proficiency: </label>
              <select class="picker" v-model="languagesTempProficiency">
                <option v-for="prof in LANGUAGE_PROFICIENCY" :key="prof" :value="prof">{{ prof }}</option>
              </select>
            </div>
            <br>
            <button @click="onPressAddLanguage" style="margin-top: 10px;">Add</button>
          </div>
        </template>
      </div>      


      <br>
      <div id="proficiences">
        <div class="edit-buttons">
          <button class="button-edit-spacer">Edit</button>
          <h3>Proficiencies</h3>
          <button class="button-edit">Edit</button>
        </div>
        <template v-if="getDictionarySize(characterToView[CHARACTER_KEYS.PROFICIENCIES]) > 0">
          <div class="list-container-character">
            <ul class="list">
              <li v-for="(item, key) in characterToView[CHARACTER_KEYS.PROFICIENCIES]" :key="key">
                <label class="item-name">{{ key }}</label>
                <label class="item-description">{{ item }}</label>
              </li>
            </ul>
          </div>
        </template>
      </div>

      <br>
      <div id="spell-casting">
        <div class="edit-buttons">
          <button class="button-edit-spacer">Edit</button>
          <h3>Spell Casting</h3>
          <button class="button-edit">Edit</button>
        </div>
        <template v-if="getDictionarySize(characterToView[CHARACTER_KEYS.SPELLS]) > 0">
          <div class="list-container-character">
            <ul class="list">
              <li v-for="(item, level) in characterToView[CHARACTER_KEYS.SPELLS]" :key="level">
                <template v-if="getDictionarySize(characterToView[CHARACTER_KEYS.SPELLS][level]) > 0">
                  <label class="item-name">{{ getSpellLevelName(level) }}:</label>
                  <ul class="list">
                    <li v-for="(spell, spellName) in characterToView[CHARACTER_KEYS.SPELLS][level]" :key="spellName">
                      <label class="item-name">{{ spellName }}</label>
                      <br>
                      <label class="item-description">Casting Time: {{ spell[[SPELLCASTING_KEYS.CASTING_TIME]] }}</label>
                      <label class="item-description">Duration: {{ spell[[SPELLCASTING_KEYS.DURATION]] }} seconds</label>
                      <label class="item-description">Range: {{ spell[[SPELLCASTING_KEYS.RANGE]] }} ft</label>
                      <label class="item-description">{{ spell[[SPELLCASTING_KEYS.DESCRIPTION]] }}</label>
                    </li>
                  </ul>
                </template>
              </li>
            </ul>
          </div>
        </template>
      </div>
      
      <br>
      <button class="button-delete" @click="toggleDeletePopup">Delete Character</button>
    </div>

    <!-- Delete Character Popup -->
    <div id="delete-character">
      <transition name="fade" appear>
        <div class="overlay" v-if="isDeletePopupOpen">
          <div class="popup">
            <div class="form">
              <h1>Delete {{ characterToView[CHARACTER_KEYS.NAME] }}?</h1>
              <p>This action can't be undone</p>
              <div class="delete-buttons">
                <button style="margin-right: 20px;" @click="toggleDeletePopup">Cancel</button>
                <button @click="deleteCharacter">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
// import store from '@/store'
import { useStore } from 'vuex'
import Character from '@/models/character'
import { DIE_TYPE } from '@/enums/die-type'
import { EQUIPMENT_KEYS } from '@/enums/dbKeys/equipment-keys.js'
import { FEATURES_KEYS } from '@/enums/dbKeys/features-keys.js'
import { LANGUAGE_PROFICIENCY } from '@/enums/language-proficiency'
import { FEATURES_TYPES } from '@/enums/features-types'
import { ALIGNMENT_TYPES } from '@/enums/alignment-types'
import { CLASS_NAMES } from '@/enums/dbKeys/class-keys.js'
import { CHARACTER_KEYS } from '@/enums/dbKeys/character-keys.js'
import { BASE_STAT_KEYS } from '@/enums/dbKeys/baseStat-keys.js'
import { HP_KEYS } from '@/enums/dbKeys/hp-keys.js'
import { DEATH_SAVES_KEYS } from '@/enums/dbKeys/deathSaves-keys.js'
import { SKILL_KEYS, SKILL_NAMES } from '@/enums/dbKeys/skill-keys.js'
import { STAT_NAMES } from '@/enums/dbKeys/stat-keys.js'
import { SPELLCASTING_KEYS, SPELLCASTING_NAMES } from '@/enums/dbKeys/spellcasting_keys'

export default {
  props: {
    characterToViewId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      store: useStore(),
      isModalViewCharacterOpen: false,
      isDeletePopupOpen: false,
      isEditingCharInfo: false,
      isEditingBaseStats: false,
      isEditingSavingThrows: false,
      isEditingSkills: false,
      isEditingFeaturesTraits: false,
      isEditingEquipment: false,
      isEditingLanguages: false,
      isEditingProficiencies: false,
      isEditingSpellCasting: false,
      ALIGNMENT_TYPES: ALIGNMENT_TYPES,
      BASE_STAT_KEYS: BASE_STAT_KEYS,
      CHARACTER_KEYS: CHARACTER_KEYS,
      CLASS_NAMES: CLASS_NAMES,
      DEATH_SAVES_KEYS: DEATH_SAVES_KEYS,
      DIE_TYPE: DIE_TYPE,
      EQUIPMENT_KEYS: EQUIPMENT_KEYS,
      FEATURES_KEYS: FEATURES_KEYS,
      FEATURES_TYPES: FEATURES_TYPES,
      HP_KEYS: HP_KEYS,
      LANGUAGE_PROFICIENCY: LANGUAGE_PROFICIENCY,
      STAT_NAMES: STAT_NAMES,
      SKILL_KEYS: SKILL_KEYS,
      SKILL_NAMES: SKILL_NAMES,
      SPELLCASTING_KEYS: SPELLCASTING_KEYS,
      SPELLCASTING_NAMES: SPELLCASTING_NAMES,
      characterToView: new Character(),
      languagesTempName: '',
      languagesTempProficiency: '',
    }
  },
  mounted() {
    this.characterToView = this.store.getters.getUserCharacters[this.characterToViewId]
    console.info('this.characterToView:', this.characterToView)
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    deleteCharacter() {
      this.store.dispatch("deleteCharacterFromDb", this.characterToViewId).then((success) => {
        console.info('@CharacterPage: deleteCharacter() post store')
        if (success) {
          this.closeModal()
        } else {
          alert(`ERROR deleting "${this.characterToView[CHARACTER_KEYS.NAME]}" occurred. Please try again.`)
        }
      })
      
    },
    getDictionarySize(dict) {
      if (dict) {
        const count = Object.keys(dict).length;
        return count
      } else {
        return 0
      }
    },
    getSpellLevelName(level) {
      var output = "Level "
      switch (level) {
        case SPELLCASTING_KEYS.LEVEL_1:
          output += SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_1]
          break
        case SPELLCASTING_KEYS.LEVEL_2:
          output += SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_2]
          break
        case SPELLCASTING_KEYS.LEVEL_3:
          output += SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_3]
          break
        case SPELLCASTING_KEYS.LEVEL_4:
          output += SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_4]
          break
        case SPELLCASTING_KEYS.LEVEL_5:
          output += SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_5]
          break
        case SPELLCASTING_KEYS.LEVEL_6:
          output += SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_6]
          break
        case SPELLCASTING_KEYS.LEVEL_7:
          output += SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_7]
          break
        case SPELLCASTING_KEYS.LEVEL_8:
          output += SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_8]
          break
        case SPELLCASTING_KEYS.LEVEL_9:
          output += SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_9]
          break
        default:
          output = SPELLCASTING_NAMES[SPELLCASTING_KEYS.CANTRIPS]
          break
      }

      return output
    },
    getStatBonus(stat) {
      if (stat < 0) {
        return stat // the negative will already be apart of the number
      } else {
        return "+" + stat
      }
    },
    onPressAddLanguage() {
      // Make a check just in case 
      if (!this.isEditingLanguages) {
        alert("You should've have been able to see the add button...")
        return
      }

      if (this.languagesTempName === '') {
        alert("Please enter a language")
        return
      }

      if (this.languagesTempProficiency === '') {
        alert("Please select a language proficiency")
        return
      }

      console.info('trying to add:', this.languagesTempName, ':', this.languagesTempProficiency)
      const langPayLoad = {
        charId: this.characterToViewId,
        key: this.languagesTempName,
        value: this.languagesTempProficiency
      }
      // this.characterToView[CHARACTER_KEYS.LANGUAGES][this.languagesTempName] = this.languagesTempProficiency
      this.store.dispatch("addCharacterLanguage", langPayLoad)
      // .then((success) => {
      //   console.info('added lang?', success)
      //   this.languagesTempName = ''
      //   this.languagesTempProficiency = ''
      // }).catch((error) => {
      //   console.error(error)
      //   this.languagesTempName = ''
      //   this.languagesTempProficiency = ''
      // })
      
      
    },
    onPressDeleteFeatures(featId) {
      if (featId in this.characterToView[CHARACTER_KEYS.FEATURES]) {
        delete this.characterToView[CHARACTER_KEYS.FEATURES][featId]
      }
    },
    onPressDeleteEquipment(equipmentId) {
      if (equipmentId in this.characterToView[CHARACTER_KEYS.EQUIPMENT]) {
        delete this.characterToView[CHARACTER_KEYS.EQUIPMENT][equipmentId]
      }
    },
    onPressDeleteLanguage(langId) {
      if (langId in this.characterToView[CHARACTER_KEYS.LANGUAGES]) {
        delete this.characterToView[CHARACTER_KEYS.LANGUAGES][langId]
        this.store.dispatch("deleteCharacterLanguage", this.characterToViewId, langId)
      }
    },
    onPressDeleteProficiency(profId) {
      if (profId in this.characterToView[CHARACTER_KEYS.PROFICIENCIES]) {
        delete this.characterToView[CHARACTER_KEYS.PROFICIENCIES][profId]
      }
    },
    onPressDeleteSpell(levelKey, spellName) {
      if (levelKey in this.characterToView[CHARACTER_KEYS.SPELLS]) {
        const levelDict = this.characterToView[CHARACTER_KEYS.SPELLS][levelKey]
        if (spellName in levelDict) {
          delete this.characterToView[CHARACTER_KEYS.SPELLS][levelKey][spellName]

          // If there's nothing left in the level 
          if (this.getDictionarySize(levelDict) == 0) {
            delete this.characterToView[CHARACTER_KEYS.SPELLS][levelKey]
          }
        }
      }
    },
    toggleEditLanguages() {
      this.isEditingLanguages = !this.isEditingLanguages
    },
    toggleDeletePopup() {
      this.isDeletePopupOpen = !this.isDeletePopupOpen
    },
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

h3 {
  text-decoration: underline;
}

.character-name {
  margin-top: 50px;
  font-size: 2.5em;
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
  align-items: left;
}

/* LIST - ADDED ITEMS STYLE */

.list-container-character {
  display: flex;
  justify-content: center;
  /* width: 90%; */
  margin: 0 auto;
}

/* .list-rows {
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  list-style: circle;
} */

/* .item-input {
  width: 80%;
  margin-left: 5px;
  padding-left: 0;
  padding-bottom: 5px;
}

.list-container-character {
  display: flex;
  justify-content: center;
  width: 90%;
  margin: 0 auto;
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
} */


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

.popup {
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  max-width: 500px;
}

.popup.active {
  opacity: 1;
}


/* BUTTON STYLES */

.button-close {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
}

.delete-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.button-delete {
  margin-bottom: 30px;
}

.edit-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.edit-buttons h3 {
  margin: 0 auto;
}

.button-edit {
  margin-left: auto;
  margin-right: 10px;
  padding: 5px 10px;
}

.button-edit-spacer {
  margin-right: auto;
  margin-left: 10px;
  padding: 5px 10px;
  visibility: hidden;
}
</style>