<template>
  <div class="body" ref="bodyRef">
    <div class="hamburger-menu" ref="menuRef" @click="toggleMenu">
      <div class="hamburger-line"></div>
      <div class="hamburger-line"></div>
      <div class="hamburger-line"></div>
    </div>

    <transition name="slide-right" mode="out-in">
      <template v-if="showMenu">
        <div class="side-menu-overlay">
          <div class="side-menu">
            <h1 class="menu-close" @click="toggleMenu">X</h1>

            <ul class="list-side-menu">
              <li>Profile</li>
              <li>Settings</li>
              <li @click="logOut">Log Out</li>
            </ul>
          </div>
        </div>
      </template>
    </transition>
    

    <div class="content" ref="contentRef">
      <h1>{{ getUserInfo.name }}'s characters</h1>
      <div class="top-buttons">
        <button class="button-open-modal" @click="toggleModal">Create Character</button>
      </div>

      <transition name="slide-up" mode="out-in">
        <template v-if="showModal">
          <div class="modal-page-overlay">
            <div class="modal-page scrollable">
              <button class="button-close" @click="toggleModal">Close</button>

              <h2>New Character</h2>
              
              <div class="input-container">
                <input class="character-description" type="text" v-model="characterName" placeholder="Name" required>
                <input class="character-description" type="text" v-model="alignment" placeholder="Alignment" required>
                <input class="character-description" type="text" v-model="background" placeholder="Background" required>
                <input class="character-description" type="text" v-model="charClass" placeholder="Class" required>
                <input class="character-description" type="text" v-model="race" placeholder="Race" required>
              </div>
              
              <br>
              <h3>Base Stats</h3>
              <div id="base-stats">
                <div style="margin-bottom: 10px">
                  <label for="stats-level" class="label-stats">Starting level:</label>
                  <input type="number" id="stats-level" v-model="level" class="input-stats" inputmode="numeric" required>
                </div>

                <div style="display: flex; justify-content: center;">
                  <div>
                    <label for="stats-hp" class="label-stats">Hit Points (HP):</label>
                    <input type="number" id="stats-hp" v-model="hp.max" class="input-stats" inputmode="numeric" required>
                  </div>

                  <div>
                    <label for="stats-hit-die" style="margin-left: 10px;">Hit Die: </label>
                    <input type="number" id="stats-hit-die" v-model="hp.dieAmount" class="input-stats" inputmode="numeric" required>
                  </div>
                </div>

                <div>
                  <label for="stats-hit-die-type">Hit Die Type: </label>
                  <select class="hit-die-picker" v-model="hp.die">
                    <option v-for="die in hitDieTypes" :key="die" :value="die">{{ die }}</option>
                  </select>
                </div>

                <div>
                  <label for="stats-armor-class">Armor Class: </label>
                  <input type="number" id="stats-armor-class" v-model="armorClass" class="input-stats" inputmode="numeric" required>
                </div>

                <div>
                  <label for="stats-initiative">Initiative: </label>
                  <input type="number" id="stats-hit-die" v-model="initiative" class="input-stats" inputmode="numeric" required>
                </div>

                <div style="margin-bottom: 10px;">
                  <label for="stats-speed">Speed: </label>
                  <input type="number" id="stats-speed" v-model="speed" class="input-stats" inputmode="numeric" required>
                </div>

                <div class="flex-container-stat">
                  <div class="container-stat">
                    <label for="stats-str" class="label-stats">Strength:</label>
                    <input type="number" id="stats-str" style="margin-left: 31px;" v-model="stats.statsStr" class="input-stats" inputmode="numeric" required>
                  </div>

                  <div class="container-stat-bonus">
                    <label for="stats-str-bonus" style="margin-left: 10px;">Bonus: </label>
                    <input type="number" id="stats-str-bonus" v-model="stats.statsStrBonus" class="input-stats" inputmode="numeric" required>
                  </div>
                </div>

                <div class="flex-container-stat">
                  <div class="container-stat">
                    <label for="stats-dex" class="label-stats">Dexterity: </label>
                    <input type="number" id="stats-dex" style="margin-left: 29px;" v-model="stats.statsDex" class="input-stats" inputmode="numeric" required>
                  </div>

                  <div class="container-stat-bonus">
                    <label for="stats-dex-bonus" style="margin-left: 10px;">Bonus: </label>
                    <input type="number" id="stats-dex-bonus" v-model="stats.statsDexBonus" class="input-stats" inputmode="numeric" required>
                  </div>
                </div>

                <div class="flex-container-stat">
                  <div class="container-stat">
                    <label for="stats-con" class="label-stats">Consitution: </label>
                    <input type="number" id="stats-con" style="margin-left: 12px;" v-model="stats.statsCon" class="input-stats" inputmode="numeric" required>
                  </div>
                  
                  <div class="container-stat-bonus">
                    <label for="stats-con-bonus" style="margin-left: 10px;">Bonus: </label>
                    <input type="number" id="stats-con-bonus" v-model="stats.statsConBonus" class="input-stats" inputmode="numeric" required>
                  </div>
                </div>

                <div class="flex-container-stat">
                  <div class="container-stat">
                    <label for="stats-int" class="label-stats">Intelligence: </label>
                    <input type="number" id="stats-int" style="margin-left: 12px;" v-model="stats.statsInt" class="input-stats" inputmode="numeric" required>
                  </div>
                  
                  <div class="container-stat-bonus">
                    <label for="stats-int-bonus" style="margin-left: 10px;">Bonus: </label>
                    <input type="number" id="stats-int-bonus" v-model="stats.statsIntBonus" class="input-stats" inputmode="numeric" required>
                  </div>
                </div>

                <div class="flex-container-stat">
                  <div class="container-stat">
                    <label for="stats-wis" class="label-stats">Wisdom: </label>
                    <input type="number" id="stats-wis" style="margin-left: 36px;" v-model="stats.statsWis" class="input-stats" inputmode="numeric" required>
                  </div>
                  
                  <div class="container-stat-bonus">
                    <label for="stats-wis-bonus" style="margin-left: 10px;">Bonus: </label>
                    <input type="number" id="stats-wis-bonus" v-model="stats.statsWisBonus" class="input-stats" inputmode="numeric" required>
                  </div>
                </div>

                <div class="flex-container-stat">
                  <div class="container-stat">
                    <label for="stats-cha" class="label-stats">Charisma: </label>
                    <input type="number" id="stats-cha" style="margin-left: 25px;" v-model="stats.statsCha" class="input-stats" inputmode="numeric" required>
                  </div>
                  
                  <div class="container-stat-bonus">
                    <label for="stats-cha-bonus" style="margin-left: 10px;">Bonus: </label>
                    <input type="number" id="stats-cha-bonus" v-model="stats.statsChaBonus" class="input-stats" inputmode="numeric" required>
                  </div>
                </div>
              </div>
              
              <br>
              <h3>Saving Throws</h3>
              <div id="saving-throws">
                <div>
                  <label for="saving-str" class="label-stats">Strength:</label>
                  <input type="number" id="saving-str" style="margin-left: 31px;" v-model="savingThrows.savingStr" class="input-stats" inputmode="numeric" required>
                </div>
                
                <div>
                  <label for="saving-dex" class="label-stats">Dexterity: </label>
                  <input type="number" id="saving-dex" style="margin-left: 29px;" v-model="savingThrows.savingDex" class="input-stats" inputmode="numeric" required>
                </div>

                <div>
                  <label for="saving-con" class="label-stats">Consitution: </label>
                  <input type="number" id="saving-con" style="margin-left: 12px;" v-model="savingThrows.savingCon" class="input-stats" inputmode="numeric" required>
                </div>
                
                <div>
                  <label for="saving-int" class="label-stats">Intelligence: </label>
                  <input type="number" id="saving-int" style="margin-left: 12px;" v-model="savingThrows.savingInt" class="input-stats" inputmode="numeric" required>
                </div>
                
                <div>
                  <label for="saving-wis" class="label-stats">Wisdom: </label>
                  <input type="number" id="saving-wis" style="margin-left: 36px;" v-model="savingThrows.savingWis" class="input-stats" inputmode="numeric" required>
                </div>
                
                <div>
                  <label for="saving-cha" class="label-stats">Charisma: </label>
                  <input type="number" id="saving-cha" style="margin-left: 27px;" v-model="savingThrows.savingCha" class="input-stats" inputmode="numeric" required>
                </div>
              </div>

              <br>
              <h3>Skills</h3>
              <div class="skills">
                <div>
                  <label for="skills-acrobatics" class="label-stats">Acrobatics:</label>
                  <input type="number" id="skills-acrobatics" style="margin-left: 31px;" v-model="skills.skillsAcrobatics" class="input-stats" inputmode="numeric" required>
                </div>

                <div>
                  <label for="skills-animal-handling" class="label-stats">Animal Hanlding:</label>
                  <input type="number" id="skills-animal-handling" v-model="skills.skillsAnimalHandling" class="input-stats" inputmode="numeric" required>
                </div>

                <div>
                  <label for="skills-arcana" class="label-stats">Arcana:</label>
                  <input type="number" id="skills-arcana" v-model="skills.skillsArcana" class="input-stats" inputmode="numeric" required>
                </div>

                <div>
                  <label for="skills-athletics" class="label-stats">Athletics:</label>
                  <input type="number" id="skills-athletics" v-model="skills.skillsAthletics" class="input-stats" inputmode="numeric" required>
                </div>

                <div>
                  <label for="skills-deception" class="label-stats">Deception:</label>
                  <input type="number" id="skills-deception" v-model="skills.skillsDeception" class="input-stats" inputmode="numeric" required>
                </div>

                <div>
                  <label for="skills-history" class="label-stats">History:</label>
                  <input type="number" id="skills-history" v-model="skills.skillsHistory" class="input-stats" inputmode="numeric" required>
                </div>

                <div>
                  <label for="skills-insight" class="label-stats">Insight:</label>
                  <input type="number" id="skills-insight" v-model="skills.skillsInsight" class="input-stats" inputmode="numeric" required>
                </div>
                
                <div>
                  <label for="skills-intimidation" class="label-stats">Intimidation:</label>
                  <input type="number" id="skills-intimidation" v-model="skills.skillsIntimidation" class="input-stats" inputmode="numeric" required>
                </div>

                <div>
                  <label for="skills-investigation" class="label-stats">Investigation:</label>
                  <input type="number" id="skills-investigation" v-model="skills.skillsInvestigation" class="input-stats" inputmode="numeric" required>
                </div>

                <div>
                  <label for="skills-medicine" class="label-stats">Medicine:</label>
                  <input type="number" id="skills-medicine" v-model="skills.skillsMedicine" class="input-stats" inputmode="numeric" required>
                </div>

                <div>
                  <label for="skills-nature" class="label-stats">Nature:</label>
                  <input type="number" id="skills-nature" v-model="skills.skillsNature" class="input-stats" inputmode="numeric" required>
                </div>
                
                <div>
                  <label for="skills-perception" class="label-stats">Perception:</label>
                  <input type="number" id="skills-perception" v-model="skills.skillsPerception" class="input-stats" inputmode="numeric" required>
                </div>

                <div>
                  <label for="skills-performance" class="label-stats">Performance:</label>
                  <input type="number" id="skills-performance" v-model="skills.skillsPerformance" class="input-stats" inputmode="numeric" required>
                </div>

                <div>
                  <label for="skills-persuasion" class="label-stats">Persuasion:</label>
                  <input type="number" id="skills-persuasion" v-model="skills.skillsPersuasion" class="input-stats" inputmode="numeric" required>
                </div>

                <div>
                  <label for="skills-religion" class="label-stats">Religion:</label>
                  <input type="number" id="skills-religion" v-model="skills.skillsReligion" class="input-stats" inputmode="numeric" required>
                </div>

                <div>
                  <label for="skills-sleight-of-hand" class="label-stats">Slight of Hand:</label>
                  <input type="number" id="skills-sleight-of-hand" v-model="skills.skillsSleightOfHand" class="input-stats" inputmode="numeric" required>
                </div>

                <div>
                  <label for="skills-stealth" class="label-stats">Stealth:</label>
                  <input type="number" id="skills-stealth" v-model="skills.skillsStealth" class="input-stats" inputmode="numeric" required>
                </div>

                <div>
                  <label for="skills-survival" class="label-stats">Survival:</label>
                  <input type="number" id="skills-survival" v-model="skills.skillsSurvival" class="input-stats" inputmode="numeric" required>
                </div>
                
              </div>

              <br>
              <h3>Features & Traits</h3>
              <div id="features-and-traits">
                <!-- be able to make a list and add new feats -->
              </div>

              <br>
              <h3>Equipment</h3>
              <div id="equipment">
                <div>
                  <label for="equipment-gold" class="label-stats">Starting Gold:</label>
                  <input type="number" id="equipment-gold" v-model="gold" class="input-stats" inputmode="numeric" required>
                </div>

                <div class="equipment-container" v-for="(item, key) in equipment" :key="key">
                  <div class="equipment-title">
                    <label class="equipment-name">{{ key }}</label>
                    <label class="equipment-amount">x{{ getEquipmentAmount(key) }}</label>
                  </div>
                  <label class="equipment-description">{{ getEquipmentDescription(key) }}</label>
                  <br>
                  <button @click="onPressDeleteEquipment(key)">Delete</button>
                </div>
                <div class="equipment-container">
                  <input class="equipment-input" style="width=70%;" type="text" v-model="equipmentTempName" placeholder="Item name"> 
                  <input class="equipment-input" style="width=10%;" type="number" v-model="equipmentTempAmount" placeholder="Item amount">
                  <textarea class="equipment-textarea" v-model="equipmentTempDescription" rows="4" placeholder="Description"></textarea>
                  <br>
                  <button @click="onPressAddEquipment" style="margin-top: 10px;">Add</button>
                </div>
              </div>
              
              <br>
              <h3>Languages</h3>
              <div id="languages">
                <div class="language-container" v-for="(item, key) in languages" :key="key">
                  <div class="language-title">
                    <label class="language-name">{{ key }}: </label>
                    <label class="language-Proficiency">{{ getLanguageProficiencyString(item) }}</label>
                  </div>
                  <br>
                  <button @click="onPressDeleteLanguage(key)">Delete</button>
                </div>
                <div class="language-container">
                  <input class="language-input" type="text" v-model="languagesTempName" placeholder="Language name"> 
                  <div>
                    <label style="margin-right: 15px;" for="language-proficiency-picker">Proficiency: </label>
                    <select class="language-proficiency-picker" v-model="languagesTempProficiency">
                      <option v-for="prof in languageproficiencies" :key="prof" :value="prof">{{ prof }}</option>
                    </select>
                  </div>
                  <br>
                  <button @click="onPressAddLanguage" style="margin-top: 10px;">Add</button>
                </div>
              </div>
              
              <br>
              <h3>Proficiencies</h3>
              <div id="proficiencies">
                
              </div>


              <button class="button-create-character" @click="createCharacter">Create Character</button>

            </div>
          </div>
        </template>
      </transition>
    </div>

    <!-- Bottom Navigation Bar -->
    <nav class="bottom-navigation" v-if="!showModal">
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
</template>

<script>
import { useStore } from 'vuex'
import { createNewCharacter } from '@/functions/rtdb'
import Character from '@/models/character'
import ROUTER_NAMES from '@/enums/router-names'
import COOKIE_NAMES from '@/enums/cookie-names'
import DIE_TYPE from '@/enums/die-type'
import EQUIPMENT_KEYS from '@/enums/equipment-keys'
import LANGUAGE_PROFICIENCY from '@/enums/language-proficiency'
import Cookies from 'js-cookie'

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
    name: ROUTER_NAMES.CHARACTERS.charAt(0).toUpperCase() + ROUTER_NAMES.CHARACTERS.slice(1),
    data() {
        return {
          store: useStore(),
          showModal: false,
          showMenu: false,
          hitDieTypes: [DIE_TYPE.D4, DIE_TYPE.D6, DIE_TYPE.D8, DIE_TYPE.D10, DIE_TYPE.D12, DIE_TYPE.D20],
          languageproficiencies: [LANGUAGE_PROFICIENCY[0], LANGUAGE_PROFICIENCY[1], LANGUAGE_PROFICIENCY[2]],
          characterName: '',
          alignment: '',
          background: '',
          charClass: '',
          deathSaves: {"successes": 0, "failures": 0},
          race: '',
          level: '',
          armorClass: '',
          initiative: '',
          speed: '',
          hp: {
            "current": '',
            "die": '',
            "dieAmount": '',
            "max": '',
            "temp": 0
          },
          hitDieType: '', // d10
          hitDieAmount: '', // 3
          equipment: {},
          equipmentTempName: '',
          equipmentTempAmount: '',
          equipmentTempDescription: '',
          featuresTraits: {},
          gold: '', // TODO
          languages: {},
          languagesTempName: '',
          languagesTempProficiency: '',
          stats: {
            statsStr: '',
            statsStrBonus: '',
            statsDex: '',
            statsDexBonus: '',
            statsCon: '',
            statsConBonus: '',
            statsInt: '',
            statsIntBonus: '',
            statsWis: '',
            statsWisBonus: '',
            statsCha: '',
            statsChaBonus: '',
          },
          savingThrows: {
            savingStr: '',
            savingDex: '',
            savingCon: '',
            savingInt: '',
            savingWis: '',
            savingCha: '',
          },
          skills: {
            skillsAcrobatics: '',
            skillsAnimalHandling: '',
            skillsArcana: '',
            skillsAthletics: '',
            skillsDeception: '',
            skillsHistory: '',
            skillsInsight: '',
            skillsIntimidation: '',
            skillsInvestigation: '',
            skillsMedicine: '',
            skillsNature: '',
            skillsPerception: '',
            skillsPerformance: '',
            skillsPersuasion: '',
            skillsReligion: '',
            skillsSleightOfHand: '',
            skillsStealth: '',
            skillsSurvival: '',
          },
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
      ROUTER_NAMES() {
        return {
          Campaigns: ROUTER_NAMES.CAMPAIGNS,
          Characters: ROUTER_NAMES.CHARACTERS,
          Sessions: ROUTER_NAMES.SESSIONS
        };
      }
    },
    watch: {
      'hp.max': function(newValue) {
        this.hp.current = newValue
      }
    },
    methods: {
      onPressAddEquipment() {
        if (this.equipmentTempName == '') {
          alert("Please enter an equipment name")
          return
        }

        if (this.equipmentTempAmount == '') {
          alert("Please enter an equipment amount")
          return
        }

        if (this.equipmentTempDescription == '') {
          alert("Please enter an equipment description")
          return
        }

        const newItem = {
          amount: this.equipmentTempAmount,
          description: this.equipmentTempDescription
        }

        this.equipment[this.equipmentTempName] = newItem
        
        this.equipmentTempName = ''
        this.equipmentTempAmount = ''
        this.equipmentTempDescription = ''
      },
      onPressAddLanguage() {
        if (this.languagesTempName == '') {
          alert("Please enter a language")
          return
        }

        if (this.languagesTempProficiency == '') {
          alert("Please select a language proficiency")
          return
        }

        var proficiency;
        switch (this.languagesTempProficiency) { // Change the string to an int
          case LANGUAGE_PROFICIENCY[0]:
            proficiency = LANGUAGE_PROFICIENCY.WRITTEN
            break

          case LANGUAGE_PROFICIENCY[1]:
            proficiency = LANGUAGE_PROFICIENCY.SPOKEN
            break
            
          case LANGUAGE_PROFICIENCY[2]:
            proficiency = LANGUAGE_PROFICIENCY.WRITTEN_SPOKEN
            break
            
          default:
            proficiency = LANGUAGE_PROFICIENCY.WRITTEN_SPOKEN
        }
        this.languages[this.languagesTempName] = proficiency
        
        this.languagesTempName = ''
        this.languagesTempProficiency = ''
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
      checkIfAllValid() {
        console.info("@checkIfAllValid")
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

        return true
      },
      checkIfStatsValid() {
        console.info("@checkIfStatsValid")
        if (this.stats.statsStr == '' || this.stats.statsDex == '' || this.stats.statsCon == '' || this.stats.statsInt == '' || this.stats.statsWis == '' || this.stats.statsCha == '' ||
            this.stats.statsStrBonus == '' || this.stats.statsDexBonus == '' || this.stats.statsConBonus == '' || this.stats.statsIntBonus == '' || this.stats.statsWisBonus == '' || this.stats.statsChaBonus == '') {
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
        if (this.savingThrows.savingStr == '' || this.savingThrows.savingDex == '' || this.savingThrows.savingCon == '' || this.savingThrows.savingInt == '' || this.savingThrows.savingWis == '' || this.savingThrows.savingCha == '') {
          return false
        }
        
        if (this.savingThrows.savingStr > MAX_VALUES.SAVING_THROWS && this.savingThrows.savingDex > MAX_VALUES.SAVING_THROWS && this.savingThrows.savingCon > MAX_VALUES.SAVING_THROWS && this.savingThrows.savingInt > MAX_VALUES.SAVING_THROWS && this.savingThrows.savingWis > MAX_VALUES.SAVING_THROWS && this.savingThrows.savingCha > MAX_VALUES.SAVING_THROWS) {
          return false
        }

        return true
      },
      checkIfSkillsValid() {
        if (this.skills.skillsAcrobatics == '' || this.skills.skillsAnimalHandling == '' || this.skills.skillsArcana == '' || this.skills.skillsAthletics == '' || 
            this.skills.skillsDeception == '' || this.skills.skillsHistory == '' || this.skills.skillsInsight == '' || this.skills.skillsIntimidation == '' || 
            this.skills.skillsInvestigation == '' || this.skills.skillsMedicine == '' || this.skills.skillsNature == '' || this.skills.skillsPerception == '' || 
            this.skills.skillsPerformance == '' || this.skills.skillsPersuasion == '' || this.skills.skillsReligion == '' || this.skills.skillsSleightOfHand == '' || 
            this.skills.skillsStealth == '' || this.skills.skillsSurvival == '') {
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
              this.toggleModal()
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              alert("An error occurred creating your character. Please try again")
            }
          }))
        }
      },
      createCharacterDictionary() {
        var newCharacter = new Character(
          this.alignment,
          this.armorClass,
          this.background,
          this.charClass,
          this.deathSaves,
          this.equipment,
          this.featuresTraits,
          this.gold,
          this.hp,
          this.initiative,
          this.languages,
          this.level,
          this.characterName,
          this.skills,
          this.stats,
          this.savingThrows,
          this.race
        )

        return newCharacter
      },
      getEquipmentAmount(key) {
        const item = this.equipment[key]
        return item[EQUIPMENT_KEYS.AMOUNT]
      },
      getEquipmentDescription(key) {
        const item = this.equipment[key]
        return item[EQUIPMENT_KEYS.DESCRIPTION]
      },
      getLanguageProficiencyString(proficiency) {
        return LANGUAGE_PROFICIENCY[proficiency]
      },
      navigateTo(routeName) {
        this.$router.push({ name: routeName })
      },
      toggleModal() {
        this.showModal = !this.showModal
      },
      toggleMenu() {
        this.showMenu = !this.showMenu
        if (this.showMenu) {
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

.slide-right-enter-active {
transition: transform 0.3s;
}

.slide-right-leave-active {
  transition: transform 0.4s;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter-to,
.slide-right-leave {
  transform: translateX(0);
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


.side-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 70%;
  height: 100%;
  background-color: white;
}

.side-menu {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.side-menu h1 {
  padding: 20px 12%;
  margin-bottom: 30px;
  
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
}

.flex-container-stat {
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
}

.hit-die-picker {
  margin: 15px 20px;
  width: 70px;
}

/* SKILLS STYLE */

.skills {
  display: flex;
  flex-direction: column;
}


/* EQUIPMENT STYLE */

.equipment-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.equipment-input {
  margin-left: 5px; /* Adjust the spacing between the label and input */
  border: none; /* Remove the default border */
  border-bottom: 1px solid black; /* Add a bottom border */
  outline: none;
  padding-left: 0;
  padding-bottom: 5px;
  margin-bottom: 10px;
}

.equipment-textarea {
  width: 80%;
  text-align: left;
}


.equipment-style {
  display: flex;
  flex-direction: row;
}

.equipment-name {
  font-weight: bold;
  font-size: larger;
  margin-right: 20px;
}

.equipment-amount {
  font-size: large;
}

.equipment-description {
  width: 80%;
  font-size: large;
  text-align: left;
}


/* LANGUAGE STYLE */

.language-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.language-input {
  width: 50%;
  border: none; /* Remove the default border */
  border-bottom: 1px solid black; /* Add a bottom border */
  outline: none;
  padding-left: 0;
  padding-bottom: 5px;
  margin-bottom: 10px;
}

.language-name {
  font-weight: bold;
  font-size: larger;
  margin-right: 10px;
}

.language-proficiency {
  font-size: large;
}

.button-create-character {
  font-size: x-large;
  margin-top: 10%;
  margin-bottom: 10%;
}
</style>