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
                    <label class="item-name">{{ item[CHARACTER_KEYS.NAME] }}</label>
                    <label class="item-amount" style="white-space: nowrap;">Level: {{ item[CHARACTER_KEYS.LEVEL] }}</label>
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
                <button class="button-close" @click="toggleModalNewCharacter">Close</button>

                <h2>New Character</h2>
                
                <div id="character-background">
                  <div class="input-container">
                    <input class="character-description" type="text" v-model="characterName" placeholder="Name" required>
                    <input class="character-description" type="text" v-model="characterBackground" placeholder="Background" required>
                    <input class="character-description" type="text" v-model="characterRace" placeholder="Race" required>

                    <div class="container-inputs">
                      <ul class="list-inputs">
                      <li>
                        <label for="character-alignment" class="stat-label">Alignment:</label>
                        <select class="picker" v-model="characterAlignment">
                          <option v-for="alignment in ALIGNMENT_TYPES" :key="alignment">{{ alignment }}</option>
                        </select>
                      </li>

                      <li style="margin-top: 20px;">
                        <label for="character-class" class="stat-label">Class:</label>
                        <select class="picker" v-model="characterClass">
                          <option v-for="name in CLASS_NAMES" :key="name" :value="name">{{ name }}</option>
                        </select>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <br>
              <div id="character-info">
                <div class="h3-bar">
                  <h3 @click="toggleCollapseForStat(characterinfo)">Character Info</h3>
                  <font-awesome-icon icon="chevron-up" v-if="!isShowingCharacterInfo" class="collapse-chevron"/>
                  <font-awesome-icon icon="chevron-down" v-if="isShowingCharacterInfo" class="collapse-chevron"/>
                </div>

                <collapse-transition dimension="height">
                  <div v-if="isShowingCharacterInfo">
                    <div class="container-inputs">
                      <ul class="list-inputs">
                        <li>
                          <label for="stats-level" class="stat-label">Starting level:</label>
                          <input type="number" id="stats-level" v-model="level" class="input-stats" inputmode="numeric" required>
                        </li>

                        <li>
                          <label for="stats-armor-class" class="stat-label">Armor Class: </label>
                          <input type="number" id="stats-armor-class" v-model="characterArmor" class="input-stats" inputmode="numeric" required>
                        </li>

                        <li style="margin-top: 10px; margin-bottom: 10px;">
                          <label for="stats-initiative" class="stat-label">Initiative: </label>
                          <label class="stat-label">{{ getStatBonusSign(initiative) }}</label>
                        </li>
                        
                        <li>
                          <label for="stats-speed" class="stat-label">Speed: </label>
                          <input type="number" id="stats-speed" v-model="characterSpeed" class="input-stats" inputmode="numeric" required>
                        </li>

                        <li>
                          <label for="stats-hp" class="stat-label">Hit Points (HP):</label>
                          <input type="number" id="stats-hp" v-model="hp[HP_KEYS.MAX]" class="input-stats" inputmode="numeric" required>
                        </li>

                        <li style="margin-top: 10px;">
                          <label class="stat-label">Hit Die Type: </label>
                          <select class="picker" v-model="hp[HP_KEYS.DIE]">
                            <option v-for="die in DIE_TYPE" :key="die" :value="die">{{ die }}</option>
                          </select>
                        </li>

                        <li>
                          <label for="stats-hit-die" class="stat-label"># of Hit Die: </label>
                          <input type="number" id="stats-hit-die" v-model="hp[HP_KEYS.DIE_AMOUNT_MAX]" class="input-stats" inputmode="numeric" required>
                        </li>

                        <li>
                          <label for="stats-proficiency-bonus" class="stat-label">Proficiency Bonus: </label>
                          <input type="number" id="stats-proficiency-bonus" v-model="proficiencyBonus" class="input-stats" inputmode="numeric" required>
                        </li>

                        <li style="margin-top: 10px;">
                          <label class="stat-label">Passive Perception: </label>
                          <label class="stat-value">{{ getStatBonusSign(passivePerception) }}</label>
                        </li>

                      </ul>
                    </div>
                  </div>
                </collapse-transition>
              </div>
              

              <br>
              <div id="base-stats">
                <div class="h3-bar">
                  <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.STATS)">Base Stats</h3>
                  <font-awesome-icon icon="chevron-up" v-if="!isShowingBaseStats" class="collapse-chevron"/>
                  <font-awesome-icon icon="chevron-down" v-if="isShowingBaseStats" class="collapse-chevron"/>
                </div>

                <collapse-transition dimension="height">
                  <div v-if="isShowingBaseStats">
                    <div class="container-inputs">
                      <ul class="list-inputs" style="margin-right: 20px;">
                        <li v-for="(stat, key) in STAT_KEYS" :key="key">
                          <label for="stats-label" class="stat-label">{{ STAT_NAMES[stat] }}:</label>
                          <div style="margin-left: 10px;">
                            <input type="number" id="stats-label" v-model="stats[stat][STAT_VALUES_KEYS.VALUE]" class="input-stats" inputmode="numeric" required>
                            <label class="stat-label" style="margin-left: 20px;">Mod: {{ getStatBonusSign(stats[stat][STAT_VALUES_KEYS.MOD]) }}</label>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </collapse-transition>
              </div>
              
              <br>
              <div id="saving-throws">
                <div class="h3-bar">
                  <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.SAVING_THROWS)">Saving Throws</h3>
                  <font-awesome-icon icon="chevron-up" v-if="!isShowingSavingThrows" class="collapse-chevron"/>
                  <font-awesome-icon icon="chevron-down" v-if="isShowingSavingThrows" class="collapse-chevron"/>
                </div>

                <collapse-transition dimension="height">
                  <div v-if="isShowingSavingThrows">
                    <ul class="stat-list">
                      <li v-for="(stat, key) in STAT_KEYS" :key="key">
                        <div class="stat-group">
                          <input type="checkbox" class="checkbox" v-model="savingThrows[stat][STAT_VALUES_KEYS.PROFICIENT]">
                          <label class="stat-label">{{ STAT_NAMES[stat] }}:</label>

                          <label class="stat-value" v-if="savingThrows[stat][STAT_VALUES_KEYS.PROFICIENT]">
                            {{ getStatBonusSign(savingThrows[stat][STAT_VALUES_KEYS.MOD] + proficiencyBonus) }}
                          </label>
                          <label class="stat-value" v-if="!savingThrows[stat][STAT_VALUES_KEYS.PROFICIENT]">
                            {{ getStatBonusSign(savingThrows[stat][STAT_VALUES_KEYS.MOD]) }}
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </collapse-transition>

              </div>

              <br>
              <div id="skills">
                <div class="h3-bar">
                  <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.SKILLS)">Skills</h3>
                  <font-awesome-icon icon="chevron-up" v-if="!isShowingSkills" class="collapse-chevron"/>
                  <font-awesome-icon icon="chevron-down" v-if="isShowingSkills" class="collapse-chevron"/>
                </div>

                <collapse-transition dimension="height">
                  <div v-if="isShowingSkills">
                    <ul class="stat-list">
                      <li v-for="(skill, key) in SKILL_KEYS" :key="key">
                        <div class="stat-group">
                          <input type="checkbox" class="checkbox" v-model="skills[skill][STAT_VALUES_KEYS.PROFICIENT]">
                          <label class="stat-label">{{ SKILL_NAMES[skill] }}:</label>

                          <label class="stat-value" v-if="skills[skill][STAT_VALUES_KEYS.PROFICIENT]">
                            {{ getStatBonusSign(skills[skill][STAT_VALUES_KEYS.MOD] + proficiencyBonus) }}
                          </label>
                          <label class="stat-value" v-if="!skills[skill][STAT_VALUES_KEYS.PROFICIENT]">
                            {{ getStatBonusSign(skills[skill][STAT_VALUES_KEYS.MOD]) }}
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </collapse-transition>
                
              </div>

              <br>
              <div id="features-and-traits">
                <div class="h3-bar">
                  <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.FEATURES)">Features</h3>
                  <font-awesome-icon icon="chevron-up" v-if="!isShowingFeatures" class="collapse-chevron"/>
                  <font-awesome-icon icon="chevron-down" v-if="isShowingFeatures" class="collapse-chevron"/>
                </div>

                <collapse-transition dimension="height">
                  <div v-if="isShowingFeatures">
                    <template v-if="getDictionarySize(featuresTraits) > 0">
                      <div>
                        <ul class="list">
                          <li v-for="(item, key) in featuresTraits" :key="key">
                            <div>
                              <label class="item-name">{{ key }}</label>
                              <label class="item-amount">x{{ item[FEATURES_KEYS.USES] }}</label>
                            </div>
                            <label class="item-type">Type: {{ item[FEATURES_KEYS.TYPE] }}</label>
                            <label class="item-description">{{ item[FEATURES_KEYS.DESCRIPTION] }}</label>
                            <br>
                            <button @click="onPressDeleteFeatures(key)">Delete</button>
                          </li>
                        </ul>
                      </div>
                    </template>

                    <div>
                      <input class="item-input" type="text" v-model="featuresTempName" placeholder="Feature/Trait name"> 
                      <div class="container-inputs">
                        <ul class="list-inputs">
                          <li>
                            <label>Type:</label>
                            <select class="picker" v-model="featuresTempType">
                              <option v-for="feat in FEATURES_TYPES" :key="feat" :value="feat">{{ feat }}</option>
                            </select>
                          </li>

                          <li>
                            <label style="margin-right: 10px;" for="features-input"> # of Uses:</label>
                            <input class="input-stats" style="width=70%;" type="number" v-model="featuresTempUses"> 
                          </li>
                        </ul>
                      </div>
                      
                      <br>
                      <textarea v-model="featuresTempDescription" rows="4" placeholder="Description"></textarea>
                      <br>
                      <button @click="onPressAddFeatures" style="margin-top: 10px;">Add</button>
                    </div>
                  </div>
                </collapse-transition>

              </div>

              <br>
              <div id="equipment">
                <div class="h3-bar">
                  <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.EQUIPMENT)">Equipment</h3>
                  <font-awesome-icon icon="chevron-up" v-if="!isShowingEquipment" class="collapse-chevron"/>
                  <font-awesome-icon icon="chevron-down" v-if="isShowingEquipment" class="collapse-chevron"/>
                </div>

                <collapse-transition dimension="height">
                  <div v-if="isShowingEquipment">
                    <div style="margin-bottom: 10px;">
                      <label for="equipment-gold" class="stat-label">Starting Gold:</label>
                      <input type="number" id="equipment-gold" v-model="gold" class="input-stats" inputmode="numeric" required>
                    </div>

                    <template v-if="getDictionarySize(equipment) > 0">
                      <div class="list-container">
                        <ul class="list">
                          <li v-for="(item, key) in equipment" :key="key">
                            <div>
                              <label class="item-name">{{ key }}</label>
                              <label class="item-amount">x{{ item[EQUIPMENT_KEYS.AMOUNT] }}</label>
                            </div>
                            <label class="item-description">{{ item[EQUIPMENT_KEYS.DESCRIPTION] }}</label>
                            <br>
                            <button @click="onPressDeleteEquipment(key)">Delete</button>
                          </li>
                        </ul>
                      </div>
                    </template>
                    
                    <div class="equipment-container">
                      <input class="item-input" style="width=70%;" type="text" v-model="equipmentTempName" placeholder="Item name"> 
                      <div>
                        <label style="margin-right: 10px;" for="equipment-input">Amount:</label>
                        <input class="input-stats" style="width=70%;" type="number" v-model="equipmentTempAmount"> 
                      </div>
                      <br>
                      <textarea v-model="equipmentTempDescription" rows="4" placeholder="Description"></textarea>
                      <br>
                      <button @click="onPressAddEquipment" style="margin-top: 10px;">Add</button>
                    </div>
                  </div>
                </collapse-transition>
                
              </div>
              
              <br>
              <div id="languages">
                <div class="h3-bar">
                  <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.LANGUAGES)">Languages</h3>
                  <font-awesome-icon icon="chevron-up" v-if="!isShowingLanguages" class="collapse-chevron"/>
                  <font-awesome-icon icon="chevron-down" v-if="isShowingLanguages" class="collapse-chevron"/>
                </div>

                <collapse-transition dimension="height">
                  <div v-if="isShowingLanguages">
                    <template v-if="getDictionarySize(languages) > 0">
                      <div class="list-container">
                        <ul class="list">
                          <li v-for="(item, key) in languages" :key="key">
                            <label class="item-name">{{ key }}</label>
                            <label class="item-description">{{ item }}</label>
                            <br>
                            <button @click="onPressDeleteLanguage(key)">Delete</button>
                          </li>
                        </ul>
                      </div>
                    </template>

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
                  </div>
                </collapse-transition>
                
              </div>
              
              <br>
              <div id="proficiencies">
                <div class="h3-bar">
                  <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.PROFICIENCIES)">Proficiencies</h3>
                  <font-awesome-icon icon="chevron-up" v-if="!isShowingProficiencies" class="collapse-chevron"/>
                  <font-awesome-icon icon="chevron-down" v-if="isShowingProficiencies" class="collapse-chevron"/>
                </div>

                <collapse-transition dimension="height">
                  <div v-if="isShowingProficiencies">
                    <template v-if="getDictionarySize(proficiencies) > 0">
                      <div class="list-container">
                        <ul class="list">
                          <li v-for="(item, key) in proficiencies" :key="key">
                            <label class="item-name">{{ key }}</label>
                            <label class="item-description">{{ item }}</label>
                            <br>
                            <button @click="onPressDeleteProficiency(key)">Delete</button>
                          </li>
                        </ul>
                      </div>
                    </template>

                    <div class="proficiency-container">
                      <input class="item-input" style="margin-bottom: 20px;" v-model="proficiencyTempName" placeholder="New proficiency name"> 
                      <br>
                      <textarea v-model="proficiencyTempDescription" rows="4" placeholder="Description"></textarea>
                      <br>
                      <button @click="onPressAddProficiency" style="margin-top: 10px;">Add</button>
                    </div>
                  </div>
                </collapse-transition>
              </div>

              <br>
              <div id="spells">
                <div class="h3-bar">
                  <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.SPELLS)">Spell Casting</h3>
                  <font-awesome-icon icon="chevron-up" v-if="!isShowingSpells" class="collapse-chevron"/>
                  <font-awesome-icon icon="chevron-down" v-if="isShowingSpells" class="collapse-chevron"/>
                </div>

                <collapse-transition dimension="height">
                  <div v-if="isShowingSpells">
                    <div class="container-inputs">
                      <ul class="list-inputs">
                        <li style="margin-top: 10px;">
                          <label for="spells-attack-bonus" class="stat-label">Casting Ability:</label>
                          <select class="picker" v-model="spellCastingStat">
                            <option v-for="stat in STAT_NAMES" :key="stat" :value="stat">{{ stat }}</option>
                          </select>
                        </li>

                        <li style="margin-top: 5px;">
                          <label class="stat-label">Spell Saving DC: </label>
                          <label class="stat-label">{{ getStatBonusSign(spellSavingDc) }}</label>
                        </li>
                      </ul>
                    </div>

                    <template v-if="getDictionarySize(spells) > 0">
                      <div class="list-container">
                        <ul class="list">
                          <li v-for="(item, level) in spells" :key="level">
                            <template v-if="getDictionarySize(spells[level]) > 0">
                              <label class="item-name">{{ getSpellLevelName(level) }}:</label>
                              <ul class="list">
                                <li v-for="(spell, spellName) in spells[level]" :key="spellName">
                                  <label class="item-name">{{ spellName }}</label>
                                  <br>
                                  <label class="item-description">Casting Time: {{ spell[[SPELLCASTING_KEYS.CASTING_TIME]] }}</label>
                                  <label class="item-description">Duration: {{ spell[[SPELLCASTING_KEYS.DURATION]] }} seconds</label>
                                  <label class="item-description">Range: {{ spell[[SPELLCASTING_KEYS.RANGE]] }} ft</label>
                                  <label class="item-description">{{ spell[[SPELLCASTING_KEYS.DESCRIPTION]] }}</label>
                                  
                                  <br>
                                  <button @click="onPressDeleteSpell(level, spellName)">Delete</button>
                                </li>
                              </ul>
                            </template>
                          </li>
                        </ul>
                      </div>
                    </template>

                    <input class="item-input" v-model="spellTempName" placeholder="Spell name"> 

                    <div class="container-inputs">
                      <ul class="list-inputs">
                        <li style="margin-top: 10px;">
                          <label for="spells-level" class="stat-label">Level:</label>
                          <select class="picker" v-model="spellTempLevel">
                            <option v-for="levels in SPELLCASTING_NAMES" :key="levels" :value="levels">{{ levels }}</option>
                          </select>
                        </li>

                        <li>
                          <label for="spells-casting-time" class="stat-label">Casting Time (# of actions):</label>
                          <input type="number" id="spells-casting-time" v-model="spellTempCastingTime" class="input-stats" inputmode="numeric" required>
                        </li>
                        
                        <li>
                          <label for="spells-casting-duration" class="stat-label">Duration (in seconds):</label>
                          <input type="number" id="spells-casting-duration" style="width: 100px;" v-model="spellTempDuration" class="input-stats" inputmode="numeric" required>
                        </li>
                        
                        <li>
                          <label for="spells-range" class="stat-label">Range (in feet):</label>
                          <input type="number" id="spells-range" v-model="spellTempRange" class="input-stats" inputmode="numeric" required>
                        </li>
                      </ul>
                    </div>

                    <textarea v-model="spellTempDescription" rows="4" placeholder="Description"></textarea>
                    <br>
                    <button @click="onPressAddSpell" style="margin-top: 10px;">Add</button>
                  </div>
                </collapse-transition>
                
              </div>
              <button class="button-create-character" @click="createCharacter">Create Character</button>

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
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue';
import CharacterPage from '@/components/CharacterPage.vue'
import SideMenu from '@/components/SideMenu.vue'
import { createNewCharacter } from '@/functions/rtdb'
import Character from '@/models/character'
import Cookies from 'js-cookie'
import ROUTER_NAMES from '@/enums/router-names'
import COOKIE_NAMES from '@/enums/cookie-names'
import { DIE_TYPE } from '@/enums/die-type'
import { EQUIPMENT_KEYS } from '@/enums/dbKeys/equipment-keys.js'
import { FEATURES_KEYS } from '@/enums/dbKeys/features-keys.js'
import { LANGUAGE_PROFICIENCY } from '@/enums/language-proficiency'
import { FEATURES_TYPES } from '@/enums/features-types'
import { ALIGNMENT_TYPES } from '@/enums/alignment-types'
import { CLASS_NAMES } from '@/enums/dbKeys/class-keys.js'
import { CHARACTER_KEYS } from '@/enums/dbKeys/character-keys.js'
import { HP_KEYS } from '@/enums/dbKeys/hp-keys.js'
import { DEATH_SAVES_KEYS } from '@/enums/dbKeys/deathSaves-keys.js'
import { SKILL_KEYS, SKILL_NAMES } from '@/enums/dbKeys/skill-keys.js'
import { STAT_KEYS, STAT_VALUES_KEYS, STAT_NAMES } from '@/enums/dbKeys/stat-keys.js'
import { SPELLCASTING_KEYS, SPELLCASTING_NAMES } from '@/enums/dbKeys/spellcasting_keys'
import { WEAPON_KEYS, WEAPON_CATEGORY, WEAPON_PROPERTY, WEAPON_NAMES } from '@/enums/dbKeys/weapons-keys' 

// TODO: Will be replaced by Firebase Remote Config
const MAX_VALUES = {
  LEVEL: 20,
  HP: 600,
  HIT_DIE: 10,
  STATS: 20,
  STATS_BONUS: 5,
  SAVING_THROWS: 5,
  SKILLS: 15,
}

const MIN_VALUES = {
  LEVEL: 1,
  HP: 10,
  HIT_DIE: 1,
}

export default {
  components: {
    SideMenu,
    CharacterPage,
    CollapseTransition
  },
  data() {
    return {
      store: useStore(),
      isModalNewCharacterOpen: false,
      isModalViewCharacterOpen: false,
      isShowingCharacterInfo: true,
      isShowingBaseStats: true,
      isShowingSavingThrows: true,
      isShowingSkills: true,
      isShowingFeatures: true,
      isShowingWeapons: true,
      isShowingEquipment: true,
      isShowingTreasure: true,
      isShowingLanguages: true,
      isShowingProficiencies: true,
      isShowingSpells: true,
      isMenuOpen: false,
      isNavBarOpen: true, // show by default
      characterToView: new Character(),
      characterToViewId: '',
      usersCharacters: {},
      ROUTER_NAMES: ROUTER_NAMES,
      ALIGNMENT_TYPES: ALIGNMENT_TYPES,
      CHARACTER_KEYS: CHARACTER_KEYS,
      CLASS_NAMES: CLASS_NAMES,
      DEATH_SAVES_KEYS: DEATH_SAVES_KEYS,
      DIE_TYPE: DIE_TYPE,
      EQUIPMENT_KEYS: EQUIPMENT_KEYS,
      FEATURES_KEYS: FEATURES_KEYS,
      FEATURES_TYPES: FEATURES_TYPES,
      HP_KEYS: HP_KEYS,
      LANGUAGE_PROFICIENCY: LANGUAGE_PROFICIENCY,
      MAX_VALUES: MAX_VALUES,
      STAT_KEYS: STAT_KEYS,
      STAT_VALUES_KEYS: STAT_VALUES_KEYS,
      STAT_NAMES: STAT_NAMES,
      SKILL_KEYS: SKILL_KEYS,
      SKILL_NAMES: SKILL_NAMES,
      SPELLCASTING_KEYS: SPELLCASTING_KEYS,
      SPELLCASTING_NAMES: SPELLCASTING_NAMES,
      WEAPON_KEYS: WEAPON_KEYS,
      WEAPON_CATEGORY: WEAPON_CATEGORY,
      WEAPON_PROPERTY: WEAPON_PROPERTY,
      WEAPON_NAMES: WEAPON_NAMES,
      WEAPON_MODS: ['', STAT_KEYS.STRENGTH, STAT_KEYS.DEXTERITY, STAT_KEYS.CONSTITUTION, STAT_KEYS.INTELLIGENCE, STAT_KEYS.WISDOM, STAT_KEYS.CHARISMA],
      characterName: '',
      characterAlignment: '',
      characterBackground: '',
      characterClass: '',
      deathSaves: {
        [DEATH_SAVES_KEYS.SUCCESSES]: 0, 
        [DEATH_SAVES_KEYS.FAILURES]: 0
      },
      characterRace: '',
      level: '',
      characterArmor: '',
      initiative: '0',
      characterSpeed: '',
      proficiencyBonus: '',
      passivePerception: '0',
      hp: {
        [HP_KEYS.CURRENT]: '',
        [HP_KEYS.DIE]: '',
        [HP_KEYS.DIE_AMOUNT_MAX]: '',
        [HP_KEYS.DIE_AMOUNT_CURR]: '',
        [HP_KEYS.MAX]: '',
        [HP_KEYS.TEMP]: 0
      },
      hitDieType: '', // d10
      hitDieAmount: '', // 3
      equipment: {},
      equipmentTempName: '',
      equipmentTempAmount: '',
      equipmentTempDescription: '',
      featuresTraits: {},
      featuresTempName: '',
      featuresTempDescription: '',
      featuresTempType: '', // Racial, Class, Other
      featuresTempUseable: true,
      featuresTempUses: '',
      gold: '', // TODO
      languages: {},
      languagesTempName: '',
      languagesTempProficiency: '',
      proficiencies: {},
      proficiencyTempName: '',
      proficiencyTempDescription: '',
      spellCastingStat: '', // e.g. intelligence
      spellSavingDc: '',
      spellTempName: '',
      spellTempCastingTime: '',
      spellTempDescription: '',
      spellTempDuration: '', // in seconds
      spellTempRange: '', // in feet
      spellTempLevel: '',
      stats: {
        [STAT_KEYS.STRENGTH]: { [STAT_VALUES_KEYS.MOD]: 0, [STAT_VALUES_KEYS.VALUE]: ''},
        [STAT_KEYS.DEXTERITY]: { [STAT_VALUES_KEYS.MOD]: 0, [STAT_VALUES_KEYS.VALUE]: ''},
        [STAT_KEYS.CONSTITUTION]: { [STAT_VALUES_KEYS.MOD]: 0, [STAT_VALUES_KEYS.VALUE]: ''},
        [STAT_KEYS.INTELLIGENCE]: { [STAT_VALUES_KEYS.MOD]: 0, [STAT_VALUES_KEYS.VALUE]: ''},
        [STAT_KEYS.WISDOM]: { [STAT_VALUES_KEYS.MOD]: 0, [STAT_VALUES_KEYS.VALUE]: ''},
        [STAT_KEYS.CHARISMA]: { [STAT_VALUES_KEYS.MOD]: 0, [STAT_VALUES_KEYS.VALUE]: ''},
      },
      savingThrows: {
        [STAT_KEYS.STRENGTH]: { [STAT_VALUES_KEYS.MOD]: 0, [STAT_VALUES_KEYS.PROFICIENT]: false},
        [STAT_KEYS.DEXTERITY]: { [STAT_VALUES_KEYS.MOD]: 0, [STAT_VALUES_KEYS.PROFICIENT]: false},
        [STAT_KEYS.CONSTITUTION]: { [STAT_VALUES_KEYS.MOD]: 0, [STAT_VALUES_KEYS.PROFICIENT]: false},
        [STAT_KEYS.INTELLIGENCE]: { [STAT_VALUES_KEYS.MOD]: 0, [STAT_VALUES_KEYS.PROFICIENT]: false},
        [STAT_KEYS.WISDOM]: { [STAT_VALUES_KEYS.MOD]: 0, [STAT_VALUES_KEYS.PROFICIENT]: false},
        [STAT_KEYS.CHARISMA]: { [STAT_VALUES_KEYS.MOD]: 0, [STAT_VALUES_KEYS.PROFICIENT]: false},
      },
      skills: {
        [SKILL_KEYS.ACROBATICS]: { [STAT_VALUES_KEYS.MOD]: 0, [STAT_VALUES_KEYS.PROFICIENT]: false},
        [SKILL_KEYS.ANIMAL_HANDLING]: { [STAT_VALUES_KEYS.MOD]: 0, [STAT_VALUES_KEYS.PROFICIENT]: false},
        [SKILL_KEYS.ARCANA]: { [STAT_VALUES_KEYS.MOD]: 0, [STAT_VALUES_KEYS.PROFICIENT]: false},
        [SKILL_KEYS.ATHLETICS]: { [STAT_VALUES_KEYS.MOD]: 0, [STAT_VALUES_KEYS.PROFICIENT]: false},
        [SKILL_KEYS.DECEPTION]: { [STAT_VALUES_KEYS.MOD]: 0, [STAT_VALUES_KEYS.PROFICIENT]: false},
        [SKILL_KEYS.HISTORY]: { [STAT_VALUES_KEYS.MOD]: 0, [STAT_VALUES_KEYS.PROFICIENT]: false},
        [SKILL_KEYS.INSIGHT]: { [STAT_VALUES_KEYS.MOD]: 0, [STAT_VALUES_KEYS.PROFICIENT]: false},
        [SKILL_KEYS.INTIMIDATION]: { [STAT_VALUES_KEYS.MOD]: 0, [STAT_VALUES_KEYS.PROFICIENT]: false},
        [SKILL_KEYS.INVESTIGATION]: { [STAT_VALUES_KEYS.MOD]: 0, [STAT_VALUES_KEYS.PROFICIENT]: false},
        [SKILL_KEYS.MEDICINE]: { [STAT_VALUES_KEYS.MOD]: 0, [STAT_VALUES_KEYS.PROFICIENT]: false},
        [SKILL_KEYS.NATURE]: { [STAT_VALUES_KEYS.MOD]: 0, [STAT_VALUES_KEYS.PROFICIENT]: false},
        [SKILL_KEYS.PERCEPTION]: { [STAT_VALUES_KEYS.MOD]: 0, [STAT_VALUES_KEYS.PROFICIENT]: false},
        [SKILL_KEYS.PERFORMANCE]: { [STAT_VALUES_KEYS.MOD]: 0, [STAT_VALUES_KEYS.PROFICIENT]: false},
        [SKILL_KEYS.PERSUASION]: { [STAT_VALUES_KEYS.MOD]: 0, [STAT_VALUES_KEYS.PROFICIENT]: false},
        [SKILL_KEYS.RELIGION]: { [STAT_VALUES_KEYS.MOD]: 0, [STAT_VALUES_KEYS.PROFICIENT]: false},
        [SKILL_KEYS.SLEIGHT_OF_HAND]: { [STAT_VALUES_KEYS.MOD]: 0, [STAT_VALUES_KEYS.PROFICIENT]: false},
        [SKILL_KEYS.STEALTH]: { [STAT_VALUES_KEYS.MOD]: 0, [STAT_VALUES_KEYS.PROFICIENT]: false},
        [SKILL_KEYS.SURVIVAL]: { [STAT_VALUES_KEYS.MOD]: 0, [STAT_VALUES_KEYS.PROFICIENT]: false},
      },
      spells: {},
      weapons: {},
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
  watch: {
    'hp.max': function(newValue) {
      this.hp[HP_KEYS.CURRENT] = newValue
    },
    'hp.dieAmountMax': function(newValue) {
      this.hp[HP_KEYS.DIE_AMOUNT_CURR] = newValue
    },
    'stats.str.value': function(newValue) {
      const statMod = Math.floor(this.calculateBaseStatBonus(newValue))

      this.stats[STAT_KEYS.STRENGTH][STAT_VALUES_KEYS.MOD] = statMod
      this.savingThrows[STAT_KEYS.STRENGTH][STAT_VALUES_KEYS.MOD] = statMod
      this.skills[SKILL_KEYS.ATHLETICS][STAT_VALUES_KEYS.MOD] = statMod
    },
    'stats.dex.value': function(newValue) {
      const statMod = Math.floor(this.calculateBaseStatBonus(newValue))

      this.stats[STAT_KEYS.DEXTERITY][STAT_VALUES_KEYS.MOD] = statMod
      this.savingThrows[STAT_KEYS.DEXTERITY][STAT_VALUES_KEYS.MOD] = statMod
      this.skills[SKILL_KEYS.ACROBATICS][STAT_VALUES_KEYS.MOD] = statMod
      this.skills[SKILL_KEYS.SLEIGHT_OF_HAND][STAT_VALUES_KEYS.MOD] = statMod
      this.skills[SKILL_KEYS.STEALTH][STAT_VALUES_KEYS.MOD] = statMod
      this.initiative = statMod
    },
    'stats.con.value': function(newValue) {
      const statMod = Math.floor(this.calculateBaseStatBonus(newValue))

      this.stats[STAT_KEYS.CONSTITUTION][STAT_VALUES_KEYS.MOD] = statMod
      this.savingThrows[STAT_KEYS.CONSTITUTION][STAT_VALUES_KEYS.MOD] = statMod
    },
    'stats.int.value': function(newValue) {
      const statMod = Math.floor(this.calculateBaseStatBonus(newValue))

      this.stats[STAT_KEYS.INTELLIGENCE][STAT_VALUES_KEYS.MOD] = statMod
      this.savingThrows[STAT_KEYS.INTELLIGENCE][STAT_VALUES_KEYS.MOD] = statMod
      this.skills[SKILL_KEYS.ARCANA][STAT_VALUES_KEYS.MOD] = statMod
      this.skills[SKILL_KEYS.HISTORY][STAT_VALUES_KEYS.MOD] = statMod
      this.skills[SKILL_KEYS.INVESTIGATION][STAT_VALUES_KEYS.MOD] = statMod
      this.skills[SKILL_KEYS.NATURE][STAT_VALUES_KEYS.MOD] = statMod
      this.skills[SKILL_KEYS.RELIGION][STAT_VALUES_KEYS.MOD] = statMod
    },
    'stats.wis.value': function(newValue) {
      const statMod = Math.floor(this.calculateBaseStatBonus(newValue))

      this.stats[STAT_KEYS.WISDOM][STAT_VALUES_KEYS.MOD] = statMod
      this.savingThrows[STAT_KEYS.WISDOM][STAT_VALUES_KEYS.MOD] = statMod
      this.skills[SKILL_KEYS.ANIMAL_HANDLING][STAT_VALUES_KEYS.MOD] = statMod
      this.skills[SKILL_KEYS.INSIGHT][STAT_VALUES_KEYS.MOD] = statMod
      this.skills[SKILL_KEYS.MEDICINE][STAT_VALUES_KEYS.MOD] = statMod
      this.skills[SKILL_KEYS.PERCEPTION][STAT_VALUES_KEYS.MOD] = statMod
      this.skills[SKILL_KEYS.SURVIVAL][STAT_VALUES_KEYS.MOD] = statMod
      this.passivePerception = this.calculatePassivePerception(statMod)
    },
    'stats.cha.value': function(newValue) {
      const statMod = Math.floor(this.calculateBaseStatBonus(newValue))

      this.stats[STAT_KEYS.CHARISMA][STAT_VALUES_KEYS.MOD] = statMod
      this.savingThrows[STAT_KEYS.CHARISMA][STAT_VALUES_KEYS.MOD] = statMod
      this.skills[SKILL_KEYS.DECEPTION][STAT_VALUES_KEYS.MOD] = statMod
      this.skills[SKILL_KEYS.INTIMIDATION][STAT_VALUES_KEYS.MOD] = statMod
      this.skills[SKILL_KEYS.PERFORMANCE][STAT_VALUES_KEYS.MOD] = statMod
      this.skills[SKILL_KEYS.PERSUASION][STAT_VALUES_KEYS.MOD] = statMod
    },
    'spellCastStat': function(newValue) {
      if (newValue === '') {
        this.characterToView[CHARACTER_KEYS.SPELL_SAVE_DC] = 0
      } else {
        const profBonus = this.proficiencyBonus
        const mod = this.stats[newValue][STAT_VALUES_KEYS.MOD]
        this.spellSavingDc = this.calculateSpellSavingDc(profBonus, mod)
      }
      
    },
  },
  methods: {
    resetVariables() {
      this.characterName = ''
      this.characterAlignment = ''
      this.characterBackground = ''
      this.characterClass = ''
      this.deathSaves = {
        [DEATH_SAVES_KEYS.SUCCESSES]: 0, 
        [DEATH_SAVES_KEYS.FAILURES]: 0
      },
      this.characterRace = ''
      this.level = ''
      this.characterArmor = ''
      this.initiative = ''
      this.proficiencyBonus = ''
      this.characterSpeed = ''
      this.hp = {
        [HP_KEYS.CURRENT]: '',
        [HP_KEYS.DIE]: '',
        [HP_KEYS.DIE_AMOUNT_MAX]: '',
        [HP_KEYS.DIE_AMOUNT_CURR]: '',
        [HP_KEYS.MAX]: '',
        [HP_KEYS.TEMP]: 0
      }
      this.hitDieType = '' // d10
      this.hitDieAmount = '' // 3
      this.equipment = {}
      this.equipmentTempName = ''
      this.equipmentTempAmount = ''
      this.equipmentTempDescription = ''
      this.featuresTraits = {}
      this.featuresTempName = ''
      this.featuresTempDescription = ''
      this.featuresTempType = '' // Racial, Class, Other
      this.featuresTempUseable = true
      this.featuresTempUses = ''
      this.gold = '' // TODO
      this.languages = {}
      this.languagesTempName = ''
      this.languagesTempProficiency = ''
      this.proficiencies = {}
      this.proficiencyTempName = ''
      this.proficiencyTempDescription = ''
      this.spellAttackBonus = ''
      this.spellCastingStat = '' // e.g. intelligence
      this.spellSavingDc = ''
      this.spellTempName = ''
      this.spellTempCastingTime = ''
      this.spellTempDescription = ''
      this.spellTempDuration = '' // in seconds
      this.spellTempRange = '' // in feet
      this.spellTempLevel = ''
      this.stats = {
        [STAT_KEYS.STRENGTH]: '',
        [STAT_KEYS.STRENGTH_BONUS]: '',
        [STAT_KEYS.DEXTERITY]: '',
        [STAT_KEYS.DEXTERITY_BONUS]: '',
        [STAT_KEYS.CONSTITUTION]: '',
        [STAT_KEYS.CONSTITUTION_BONUS]: '',
        [STAT_KEYS.INTELLIGENCE]: '',
        [STAT_KEYS.INTELLIGENCE_BONUS]: '',
        [STAT_KEYS.WISDOM]: '',
        [STAT_KEYS.WISDOM_BONUS]: '',
        [STAT_KEYS.CHARISMA]: '',
        [STAT_KEYS.CHARISMA_BONUS]: '',
      }
      this.savingThrows = {
        [STAT_KEYS.STRENGTH]: '',
        [STAT_KEYS.DEXTERITY]: '',
        [STAT_KEYS.CONSTITUTION]: '',
        [STAT_KEYS.INTELLIGENCE]: '',
        [STAT_KEYS.WISDOM]: '',
        [STAT_KEYS.CHARISMA_BONUS]: '',
      }
      this.skills = {
        [SKILL_KEYS.ACROBATICS]: '', // TODO Convert to enum 
        [SKILL_KEYS.ANIMAL_HANDLING]: '',
        [SKILL_KEYS.ARCANA]: '',
        [SKILL_KEYS.ATHLETICS]: '',
        [SKILL_KEYS.DECEPTION]: '',
        [SKILL_KEYS.HISTORY]: '',
        [SKILL_KEYS.INSIGHT]: '',
        [SKILL_KEYS.INTIMIDATION]: '',
        [SKILL_KEYS.INVESTIGATION]: '',
        [SKILL_KEYS.MEDICINE]: '',
        [SKILL_KEYS.NATURE]: '',
        [SKILL_KEYS.PERCEPTION]: '',
        [SKILL_KEYS.PERFORMANCE]: '',
        [SKILL_KEYS.PERSUASION]: '',
        [SKILL_KEYS.RELIGION]: '',
        [SKILL_KEYS.SLEIGHT_OF_HAND]: '',
        [SKILL_KEYS.STEALTH]: '',
        [SKILL_KEYS.SURVIVAL]: '',
      }
      this.spells = {}
    },
    onPressAddFeatures() {
      if (this.featuresTempName === '') {
        alert("Please enter a feature name")
        return
      }

      if (this.featuresTempType === '') {
        alert("Please select a feature type")
        return
      }

      if (this.featuresTempUses === '') {
        alert("Please enter feature uses")
        return
      }

      if (this.featuresTempDescription === '') {
        alert("Please enter a feature description")
        return
      }

      const newFeat = {
        [FEATURES_KEYS.DESCRIPTION]: this.featuresTempDescription,
        [FEATURES_KEYS.TYPE]: this.featuresTempType,
        [FEATURES_KEYS.USES]: this.featuresTempUses
      }
      

      this.featuresTraits[this.featuresTempName] = newFeat

      this.featuresTempName = ''
      this.featuresTempDescription = ''
      this.featuresTempType = ''
      this.featuresTempUses = ''
    },
    onPressAddEquipment() {
      if (this.equipmentTempName === '') {
        alert("Please enter an equipment name")
        return
      }

      if (this.equipmentTempAmount === '') {
        alert("Please enter an equipment amount")
        return
      }

      if (this.equipmentTempDescription === '') {
        alert("Please enter an equipment description")
        return
      }

      const newItem = {
        [EQUIPMENT_KEYS.AMOUNT]: this.equipmentTempAmount,
        [EQUIPMENT_KEYS.DESCRIPTION]: this.equipmentTempDescription
      }

      this.equipment[this.equipmentTempName] = newItem
      
      this.equipmentTempName = ''
      this.equipmentTempAmount = ''
      this.equipmentTempDescription = ''
    },
    onPressAddLanguage() {
      if (this.languagesTempName === '') {
        alert("Please enter a language")
        return
      }

      if (this.languagesTempProficiency === '') {
        alert("Please select a language proficiency")
        return
      }

      this.languages[this.languagesTempName] = this.languagesTempProficiency
      
      this.languagesTempName = ''
      this.languagesTempProficiency = ''
    },
    onPressAddProficiency() {
      if (this.proficiencyTempName == '') {
        alert("Please enter a proficiency name")
        return 
      }

      if (this.proficiencyTempDescription == '') {
        alert("Please enter a proficiency proficiency")
        return
      }

      this.proficiencies[this.proficiencyTempName] = this.proficiencyTempDescription
      
      this.proficiencyTempName = ''
      this.proficiencyTempDescription = ''
    },
    onPressAddSpell() {
      if (this.spellTempName === '') {
        alert("Please enter a Spell Name")
        return
      }

      if (this.spellTempLevel === '') {
        alert("Please enter a Spell Level")
        return
      }

      if (this.spellTempCastingTime === '' || this.spellTempCastingTime <= 0) {
        alert("Please enter a Casting Time")
        return
      }

      if (this.spellTempDuration === '' || this.spellTempDuration <= 0) {
        alert("Please enter a Casting Duration")
        return
      }

      if (this.spellTempRange === '' || this.spellTempRange <= 0) {
        alert("Please enter a Casting Range")
        return
      }

      if (this.spellTempDescription === '') {
        alert("Please enter a Casting Description")
        return
      }


      var levelKey;
      switch (this.spellTempLevel) {
        case SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_1]:
          levelKey = SPELLCASTING_KEYS.LEVEL_1
          break
        case SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_2]:
          levelKey = SPELLCASTING_KEYS.LEVEL_2
          break
        case SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_3]:
          levelKey = SPELLCASTING_KEYS.LEVEL_3
          break
        case SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_4]:
          levelKey = SPELLCASTING_KEYS.LEVEL_4
          break
        case SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_5]:
          levelKey = SPELLCASTING_KEYS.LEVEL_5
          break
        case SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_6]:
          levelKey = SPELLCASTING_KEYS.LEVEL_6
          break
        case SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_7]:
          levelKey = SPELLCASTING_KEYS.LEVEL_7
          break
        case SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_8]:
          levelKey = SPELLCASTING_KEYS.LEVEL_8
          break
        case SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_9]:
          levelKey = SPELLCASTING_KEYS.LEVEL_9
          break
        default:
          levelKey = SPELLCASTING_KEYS.CANTRIPS
      }

      const newSpell = {
        [SPELLCASTING_KEYS.CASTING_TIME]: this.spellTempCastingTime,
        [SPELLCASTING_KEYS.DESCRIPTION]: this.spellTempDescription,
        [SPELLCASTING_KEYS.DURATION]: this.spellTempDuration,
        [SPELLCASTING_KEYS.RANGE]: this.spellTempRange
      }
      
      if (levelKey in this.spells) {
        // If there's a level key already in the dictionary
        this.spells[levelKey][this.spellTempName] = newSpell
        
      } else {
        // If there's a new entry for the level key
        const newEntry = {
          [this.spellTempName]: newSpell
        }

        this.spells[levelKey] = newEntry
      }
      
      this.spellTempName = ''
      this.spellTempLevel = ''
      this.spellTempCastingTime = ''
      this.spellTempDescription = ''
      this.spellTempDuration = ''
      this.spellTempRange = ''
    },
    onPressDeleteFeatures(key) {
      if (key in this.featuresTraits) {
        delete this.featuresTraits[key]
      }
    },
    onPressDeleteEquipment(key) {
      if (key in this.equipment) {
        delete this.equipment[key]
      }
    },
    onPressDeleteLanguage(key) {
      if (key in this.languages) {
        delete this.languages[key]
      }
    },
    onPressDeleteProficiency(key) {
      if (key in this.proficiencies) {
        delete this.proficiencies[key]
      }
    },
    onPressDeleteSpell(key, spellName) {
      if (key in this.spells) {
        const levelDict = this.spells[key]
        if (spellName in levelDict) {
          delete this.spells[key][spellName]

          // If there's nothing left in the level 
          if (this.getDictionarySize(levelDict) == 0) {
            delete this.spells[key]
          }
        }
      }
    },
    checkIfAllValid() {
      console.info("@checkIfAllValid")
      if (this.characterName === '') {
        alert("Please enter a character name")
        return
      }

      if (this.characterAlignment === '') {
        alert("Please enter an alignment")
        return
      }

      if (this.characterBackground === '') {
        alert("Please enter a background")
        return
      }

      if (this.characterRace === '') {
        alert("Please enter a race")
        return
      }

      if (this.level < MIN_VALUES.LEVEL || this.level > MAX_VALUES.LEVEL) { 
        alert(`Starting level must be between ${MIN_VALUES.LEVEL} - ${MAX_VALUES.LEVEL}`)
        return false
      }
      
      if (this.hp.max < MIN_VALUES.HP || this.hp.max.MAX_VALUES) {
        alert(`Starting HP must be between ${MIN_VALUES.HP} - ${MAX_VALUES.HP}`)
        return false
      } 
      
      if (this.hp.dieAmount < MIN_VALUES.HIT_DIE || this.hp.dieAmount > MAX_VALUES.HIT_DIE) {
        alert(`Starting Hit Die amount must be between ${MIN_VALUES.HIT_DIE} - ${MAX_VALUES.HIT_DIE}`)
        return false
      }

      if (this.hp.die == '') {
        alert(`Please pick a Hit Die type`)
        return false
      }
      
      if (!this.checkIfStatsValid()) {
        alert(`Stats cannot be blank or greater than ${MAX_VALUES.STATS} and Bonuses cannot be blank or greater than ${MAX_VALUES.STATS_BONUS}`)
        return false
      }

      if (!this.checkIfThrowsValid()) {
        alert(`Saving Throws cannot be blank or greater than ${MAX_VALUES.SAVING_THROWS}`)
        return false
      }

      if (!this.checkIfSkillsValid()) {
        alert(`Skills cannot be blank or greater than ${MAX_VALUES.SKILLS}`)
        return false
      }

      if (this.spellAttackBonus === '') {
        alert("Please put a spell attack bonus. Even if you don't have spells")
        return
      }

      if (this.spellCastingStat === '') {
        alert("Please select a stat your spell casting will be based off of")
        return
      }

      if (this.spellSavingDc === '') {
        alert("Please enter your spell saving DC")
        return
      }

      return true
    },
    checkIfStatsValid() {
      console.info("@checkIfStatsValid")
      
      if (this.stats.statsStr === '' || this.stats.statsDex === '' || this.stats.statsCon === '' || this.stats.statsInt === '' || this.stats.statsWis === '' || this.stats.statsCha === '' ||
          this.stats.statsStrBonus === '' || this.stats.statsDexBonus === '' || this.stats.statsConBonus === '' || this.stats.statsIntBonus === '' || this.stats.statsWisBonus === '' || this.stats.statsChaBonus === '') {
            return false
      }

      if (this.stats.statsStr > MAX_VALUES.STATS && this.stats.statsDex > MAX_VALUES.STATS && this.stats.statsCon > MAX_VALUES.STATS && this.stats.statsInt > MAX_VALUES.STATS && this.stats.statsWis > MAX_VALUES.STATS && this.stats.statsCha > MAX_VALUES.STATS &&
          this.stats.statsStrBonus > MAX_VALUES.STATS_BONUS && this.stats.statsDexBonus > MAX_VALUES.STATS_BONUS && this.stats.statsConBonus > MAX_VALUES.STATS_BONUS && this.stats.statsIntBonus > MAX_VALUES.STATS_BONUS && this.stats.statsWisBonus > MAX_VALUES.STATS_BONUS && this.stats.statsChaBonus > MAX_VALUES.STATS_BONUS) {
        return false

      }
      
      return true

    },
    checkIfThrowsValid() {
      console.info("@checkIfThrowsValid")
      if (this.savingThrows.savingStr === '' || this.savingThrows.savingDex === '' || this.savingThrows.savingCon === '' || this.savingThrows.savingInt === '' || this.savingThrows.savingWis === '' || this.savingThrows.savingCha === '') {
        return false
      }
      
      if (this.savingThrows.savingStr > MAX_VALUES.SAVING_THROWS && this.savingThrows.savingDex > MAX_VALUES.SAVING_THROWS && this.savingThrows.savingCon > MAX_VALUES.SAVING_THROWS && this.savingThrows.savingInt > MAX_VALUES.SAVING_THROWS && this.savingThrows.savingWis > MAX_VALUES.SAVING_THROWS && this.savingThrows.savingCha > MAX_VALUES.SAVING_THROWS) {
        return false
      }

      return true
    },
    checkIfSkillsValid() {
      if (this.skills.skillsAcrobatics === '' || this.skills.skillsAnimalHandling === '' || this.skills.skillsArcana === '' || this.skills.skillsAthletics === '' || 
          this.skills.skillsDeception === '' || this.skills.skillsHistory === '' || this.skills.skillsInsight === '' || this.skills.skillsIntimidation === '' || 
          this.skills.skillsInvestigation === '' || this.skills.skillsMedicine === '' || this.skills.skillsNature === '' || this.skills.skillsPerception === '' || 
          this.skills.skillsPerformance === '' || this.skills.skillsPersuasion === '' || this.skills.skillsReligion === '' || this.skills.skillsSleightOfHand === '' || 
          this.skills.skillsStealth === '' || this.skills.skillsSurvival === '') {
        return false
      }

      if (this.skills.skillsAcrobatics > MAX_VALUES.SKILLS || this.skills.skillsAnimalHandling > MAX_VALUES.SKILLS || this.skills.skillsArcana > MAX_VALUES.SKILLS || this.skills.skillsAthletics > MAX_VALUES.SKILLS || 
          this.skills.skillsDeception > MAX_VALUES.SKILLS || this.skills.skillsHistory > MAX_VALUES.SKILLS || this.skills.skillsInsight > MAX_VALUES.SKILLS || this.skills.skillsIntimidation > MAX_VALUES.SKILLS || 
          this.skills.skillsInvestigation > MAX_VALUES.SKILLS || this.skills.skillsMedicine > MAX_VALUES.SKILLS || this.skills.skillsNature > MAX_VALUES.SKILLS || this.skills.skillsPerception > MAX_VALUES.SKILLS || 
          this.skills.skillsPerformance > MAX_VALUES.SKILLS || this.skills.skillsPersuasion > MAX_VALUES.SKILLS || this.skills.skillsReligion > MAX_VALUES.SKILLS || this.skills.skillsSleightOfHand > MAX_VALUES.SKILLS || 
          this.skills.skillsStealth > MAX_VALUES.SKILLS || this.skills.skillsSurvival > MAX_VALUES.SKILLS) {
        return false
      }

      return true
    },
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
    createCharacterDictionary() {
      var newCharacter = new Character(
        this.characterAlignment,
        this.characterArmor,
        this.characterBackground,
        this.characterClass,
        this.deathSaves,
        this.equipment,
        this.featuresTraits,
        this.gold,
        this.hp,
        this.initiative,
        this.languages,
        this.level,
        this.characterName,
        this.proficiencies,
        this.proficiencyBonus,
        this.characterRace,
        this.savingThrows,
        this.skills,
        this.characterSpeed,
        this.spellAttackBonus,
        this.spellCastingStat,
        this.spellSavingDc,
        this.spells,
        this.stats,
      )

      return newCharacter
    },
    calculatePassivePerception(mod) {
      return 10 + mod
    },
    calculateBaseStatBonus(stat) {
      return (stat - 10) / 2
    },
    calculateSpellSavingDc(profBonus, mod) {
      return 8 + profBonus + mod
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
    getStatModFromKey(stat) {
      if (stat === '') {
        return 0
      } else {
        return this.characterToView[CHARACTER_KEYS.STATS][stat][STAT_VALUES_KEYS.MOD]
      }
      
    },
    // getStatValue(statRef, statKey, valueKey) {
    //   return this.characterToView[statRef][statKey][valueKey]
    // },
    getStatBonusSign(stat) {
      if (stat < 0) {
        return stat // the negative will already be apart of the number
      } else {
        return "+" + stat
      }
    },
    navigateTo(routeName) {
      this.$router.push({ name: routeName })
    },
    toggleCollapseForStat(statRef) {
      switch (statRef) {
        case CHARACTER_KEYS.STATS:
          this.isShowingBaseStats = !this.isShowingBaseStats
          break

        
        case CHARACTER_KEYS.SAVING_THROWS:
          this.isShowingSavingThrows = !this.isShowingSavingThrows
          break

        
        case CHARACTER_KEYS.SKILLS:
          this.isShowingSkills = !this.isShowingSkills
          break

        
        case CHARACTER_KEYS.FEATURES:
          this.isShowingFeatures = !this.isShowingFeatures
          break

        
        case CHARACTER_KEYS.WEAPONS:
          this.isShowingWeapons = !this.isShowingWeapons
          break

        
        case CHARACTER_KEYS.EQUIPMENT:
          this.isShowingEquipment = !this.isShowingEquipment
          break

        
        case CHARACTER_KEYS.TREASURES:
          this.isShowingTreasure = !this.isShowingTreasure
          break

        
        case CHARACTER_KEYS.LANGUAGES:
          this.isShowingLanguages = !this.isShowingLanguages
          break

        
        case CHARACTER_KEYS.PROFICIENCIES:
          this.isShowingProficiencies = !this.isShowingProficiencies
          break

        
        case CHARACTER_KEYS.SPELLS:
          this.isShowingSpells = !this.isShowingSpells
          break

        
        default:
          this.isShowingCharacterInfo = !this.isShowingCharacterInfo
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
    logOut() {
      this.store.commit('signOut')
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

.hamburger-menu {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 30px;
  height: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  /* z-index: 9999; */
}

.hamburger-line {
  width: 100%;
  height: 3px;
  background-color: #000;
}


.menu-close {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  color: #007aff;
}

.list-side-menu {
  list-style: none;
}

.list-side-menu li {
  /* font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; */
  font-size: xx-large;
  margin-bottom: 10%;
}


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

.button-close {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
}

h2 {
  padding-top: 50px;
}

h3 {
  text-decoration: underline;
}

textarea {
  width: 90%;
  text-align: left;
  border-radius: 10px;
  padding: 5px;
  font-size: large;
}

.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 300px; /* Adjust the height as needed */
}

.character-description {
  border: none; /* Remove the default border */
  border-bottom: 1px solid black; /* Add a bottom border */
  outline: none;
  text-align: left;
  padding-left: 0;
  padding-bottom: 5px;
}

.input-field {
  width: 200px; /* Adjust the width as needed */
  margin-bottom: 10px; /* Adjust the spacing between input fields as needed */
}

.input-stats {
  width: 65px; /* Adjust the width as needed */
  margin-left: 5px; /* Adjust the spacing between the label and input */
  border: none; /* Remove the default border */
  border-bottom: 1px solid black; /* Add a bottom border */
  outline: none;
  text-align: center;
  padding-bottom: 5px;
  font-size: larger;
}

.flex-container-stat {
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
}

.picker {
  margin: 5px;
  font-size: larger;
  padding: 10px;
  background-color: white;
  border: 1px solid black;
  color: black;
  border-radius: 10px;
}

.picker:focus {
  outline: none;
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.checkbox {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  padding: 0;
}


/* LIST - ENTERING INPUT STYLE */

.container-inputs {
  display: flex;
  justify-content: space-evenly;
  margin: 0 auto; /* centers the container */
}

.list-inputs {
  list-style: none;
  padding: 0;
}

.list-inputs li {
  display: flex;
  justify-content: space-between;
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

.item-amount {
  font-size: large;
}

.item-description {
  width: 80%;
  font-size: large;
  text-align: left;
}


/* USER'S CHARACTERS LIST STYLE */

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

/* STAT STYLE */

.stat-list {
  display: flex;
  flex-direction: column;
  list-style-type: none;
  width: 65%;
  margin: 0 auto;
  padding-left: 0;
}

.stat-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.stat-label {
  text-align: left;
  font-size: larger;
}

.stat-value {
  flex-grow: 1;
  text-align: right;
  font-size: larger;
}

.stat-bonus {
  margin-left: 10px; /* Adjust as needed */
  text-align: right;
  font-size: larger;
}

/* WEAPON STYLES */

.weapon-list {
  display: flex;
  flex-direction: column;
  list-style-type: none;
  width: 80%;
  margin: 0 auto;
}


.weapon-group {
  display: flex;
  
  margin-bottom: 10px;
}

.weapon-label {
  text-align: left;
  font-size: larger;
}

.weapon-value {
  flex-grow: 1;
  text-align: right;
  font-size: larger;
}

/* LANGUAGE STYLES */

.language-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  width: 50%
}

.language-label {
  text-align: left;
  font-size: larger;
  font-weight: bold;
}

.language-value {
  flex-grow: 1;
  text-align: right;
  font-size: larger;
}


/* SPELL STYLES */

.spell-list {
  display: flex;
  flex-direction: column;
  list-style-type: none;
  width: 75%;
}

.spell-group {
  display: flex;
  align-items: center;
}

.spell-label {
  text-align: left;
  font-size: larger;
}

.spell-value {
  flex-grow: 1;
  text-align: right;
  font-size: larger;
}

.spell-description {
  font-size: larger;
  width: 100%;
  /* margin-top: 10px; */
}

/* SPELL CASTING STYLE */

.spells-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}


.button-open-modal {
  margin: 0 auto;
  padding: 5px 10px;
  background-color: dimgray;
  border: none;
  color: white;
  border-radius: 10px;
}

.button-create-character {
  font-size: x-large;
  margin-top: 10%;
  margin-bottom: 10%;
}
</style>