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
                <input type="text" v-model="characterName" placeholder="Name" required>
                <input type="text" v-model="alignment" placeholder="Alignment" required>
                <input type="text" v-model="background" placeholder="Background" required>
                <input type="text" v-model="charClass" placeholder="Class" required>
                <input type="text" v-model="race" placeholder="Race" required>
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
                    <input type="number" id="stats-hp" v-model="hp" class="input-stats" inputmode="numeric" required>
                  </div>

                  <div>
                    <label for="stats-hit-die" style="margin-left: 10px;">Hit Die: </label>
                    <input type="number" id="stats-hit-die" v-model="hitDieAmount" class="input-stats" inputmode="numeric" required>
                  </div>
                </div>

                <div>
                  <label for="stats-hit-die-type">Hit Die Type: </label>
                  <select class="hit-die-picker" v-model="hitDieType">
                    <option v-for="die in hitDieTypes" :key="die" :value="die">{{ die }}</option>
                  </select>
                </div>

                <div class="flex-container-stat">
                  <div class="container-stat">
                    <label for="stats-str" class="label-stats">Strength:</label>
                    <input type="number" id="stats-str" style="margin-left: 31px;" v-model="statsStr" class="input-stats" inputmode="numeric" required>
                  </div>

                  <div class="container-stat-bonus">
                    <label for="stats-str-bonus" style="margin-left: 10px;">Bonus: </label>
                    <input type="number" id="stats-str-bonus" v-model="statsStrBonus" class="input-stats" inputmode="numeric" required>
                  </div>
                </div>

                <div class="flex-container-stat">
                  <div class="container-stat">
                    <label for="stats-dex" class="label-stats">Dexterity: </label>
                    <input type="number" id="stats-dex" style="margin-left: 29px;" v-model="statsDex" class="input-stats" inputmode="numeric" required>
                  </div>

                  <div class="container-stat-bonus">
                    <label for="stats-dex-bonus" style="margin-left: 10px;">Bonus: </label>
                    <input type="number" id="stats-dex-bonus" v-model="statsDexBonus" class="input-stats" inputmode="numeric" required>
                  </div>
                </div>

                <div class="flex-container-stat">
                  <div class="container-stat">
                    <label for="stats-con" class="label-stats">Consitution: </label>
                    <input type="number" id="stats-con" style="margin-left: 12px;" v-model="statsCon" class="input-stats" inputmode="numeric" required>
                  </div>
                  
                  <div class="container-stat-bonus">
                    <label for="stats-con-bonus" style="margin-left: 10px;">Bonus: </label>
                    <input type="number" id="stats-con-bonus" v-model="statsConBonus" class="input-stats" inputmode="numeric" required>
                  </div>
                </div>

                <div class="flex-container-stat">
                  <div class="container-stat">
                    <label for="stats-int" class="label-stats">Intelligence: </label>
                    <input type="number" id="stats-int" style="margin-left: 12px;" v-model="statsInt" class="input-stats" inputmode="numeric" required>
                  </div>
                  
                  <div class="container-stat-bonus">
                    <label for="stats-int-bonus" style="margin-left: 10px;">Bonus: </label>
                    <input type="number" id="stats-int-bonus" v-model="statsIntBonus" class="input-stats" inputmode="numeric" required>
                  </div>
                </div>

                <div class="flex-container-stat">
                  <div class="container-stat">
                    <label for="stats-wis" class="label-stats">Wisdom: </label>
                    <input type="number" id="stats-wis" style="margin-left: 36px;" v-model="statsWis" class="input-stats" inputmode="numeric" required>
                  </div>
                  
                  <div class="container-stat-bonus">
                    <label for="stats-wis-bonus" style="margin-left: 10px;">Bonus: </label>
                    <input type="number" id="stats-wis-bonus" v-model="statsWisBonus" class="input-stats" inputmode="numeric" required>
                  </div>
                </div>

                <div class="flex-container-stat">
                  <div class="container-stat">
                    <label for="stats-cha" class="label-stats">Charisma: </label>
                    <input type="number" id="stats-cha" style="margin-left: 25px;" v-model="statsCha" class="input-stats" inputmode="numeric" required>
                  </div>
                  
                  <div class="container-stat-bonus">
                    <label for="stats-cha-bonus" style="margin-left: 10px;">Bonus: </label>
                    <input type="number" id="stats-cha-bonus" v-model="statsChaBonus" class="input-stats" inputmode="numeric" required>
                  </div>
                </div>
              </div>
              
              <br>
              <h3>Saving Throws</h3>
              <div id="saving-throws">
                <div>
                  <label for="saving-str" class="label-stats">Strength:</label>
                  <input type="number" id="saving-str" style="margin-left: 31px;" v-model="savingStr" class="input-stats" inputmode="numeric" required>
                </div>
                
                <div>
                  <label for="saving-dex" class="label-stats">Dexterity: </label>
                  <input type="number" id="saving-dex" style="margin-left: 29px;" v-model="savingDex" class="input-stats" inputmode="numeric" required>
                </div>

                <div>
                  <label for="saving-con" class="label-stats">Consitution: </label>
                  <input type="number" id="saving-con" style="margin-left: 12px;" v-model="savingCon" class="input-stats" inputmode="numeric" required>
                </div>
                
                <div>
                  <label for="saving-int" class="label-stats">Intelligence: </label>
                  <input type="number" id="saving-int" style="margin-left: 12px;" v-model="savingInt" class="input-stats" inputmode="numeric" required>
                </div>
                
                <div>
                  <label for="saving-wis" class="label-stats">Wisdom: </label>
                  <input type="number" id="saving-wis" style="margin-left: 36px;" v-model="savingWis" class="input-stats" inputmode="numeric" required>
                </div>
                
                <div>
                  <label for="saving-cha" class="label-stats">Charisma: </label>
                  <input type="number" id="saving-cha" style="margin-left: 27px;" v-model="savingCha" class="input-stats" inputmode="numeric" required>
                </div>
              </div>

              <br>
              <h3>Skills</h3>
              <div class="skills">
                <div>
                  <label for="skills-acrobatics" class="label-stats">Acrobatics:</label>
                  <input type="number" id="skills-acrobatics" style="margin-left: 31px;" v-model="skillsAcrobatics" class="input-stats" inputmode="numeric" required>
                </div>

                <div>
                  <label for="skills-animal-handling" class="label-stats">Animal Hanlding:</label>
                  <input type="number" id="skills-animal-handling" v-model="skillsAnimalHandling" class="input-stats" inputmode="numeric" required>
                </div>

                <div>
                  <label for="skills-arcana" class="label-stats">Arcana:</label>
                  <input type="number" id="skills-arcana" v-model="skillsArcana" class="input-stats" inputmode="numeric" required>
                </div>

                <div>
                  <label for="skills-athletics" class="label-stats">Athletics:</label>
                  <input type="number" id="skills-athletics" v-model="skillsAthletics" class="input-stats" inputmode="numeric" required>
                </div>

                <div>
                  <label for="skills-deception" class="label-stats">Deception:</label>
                  <input type="number" id="skills-deception" v-model="skillsDeception" class="input-stats" inputmode="numeric" required>
                </div>

                <div>
                  <label for="skills-history" class="label-stats">History:</label>
                  <input type="number" id="skills-history" v-model="skillsHistory" class="input-stats" inputmode="numeric" required>
                </div>

                <div>
                  <label for="skills-insight" class="label-stats">Insight:</label>
                  <input type="number" id="skills-insight" v-model="skillsInsight" class="input-stats" inputmode="numeric" required>
                </div>
                
                <div>
                  <label for="skills-intimidation" class="label-stats">Intimidation:</label>
                  <input type="number" id="skills-intimidation" v-model="skillsIntimidation" class="input-stats" inputmode="numeric" required>
                </div>

                <div>
                  <label for="skills-investigation" class="label-stats">Investigation:</label>
                  <input type="number" id="skills-investigation" v-model="skillsInvestigation" class="input-stats" inputmode="numeric" required>
                </div>

                <div>
                  <label for="skills-medicine" class="label-stats">Medicine:</label>
                  <input type="number" id="skills-medicine" v-model="skillsMedicine" class="input-stats" inputmode="numeric" required>
                </div>

                <div>
                  <label for="skills-nature" class="label-stats">Nature:</label>
                  <input type="number" id="skills-nature" v-model="skillsNature" class="input-stats" inputmode="numeric" required>
                </div>
                
                <div>
                  <label for="skills-perception" class="label-stats">Perception:</label>
                  <input type="number" id="skills-perception" v-model="skillsPerception" class="input-stats" inputmode="numeric" required>
                </div>

                <div>
                  <label for="skills-performance" class="label-stats">Performance:</label>
                  <input type="number" id="skills-performance" v-model="skillsPerformance" class="input-stats" inputmode="numeric" required>
                </div>

                <div>
                  <label for="skills-persuasion" class="label-stats">Persuasion:</label>
                  <input type="number" id="skills-persuasion" v-model="skillsPersuasion" class="input-stats" inputmode="numeric" required>
                </div>

                <div>
                  <label for="skills-religion" class="label-stats">Religion:</label>
                  <input type="number" id="skills-religion" v-model="skillsReligion" class="input-stats" inputmode="numeric" required>
                </div>

                <div>
                  <label for="skills-sleight-of-hand" class="label-stats">Slight of Hand:</label>
                  <input type="number" id="skills-sleight-of-hand" v-model="skillsSleightOfHand" class="input-stats" inputmode="numeric" required>
                </div>

                <div>
                  <label for="skills-stealth" class="label-stats">Stealth:</label>
                  <input type="number" id="skills-stealth" v-model="skillsStealth" class="input-stats" inputmode="numeric" required>
                </div>

                <div>
                  <label for="skills-survival" class="label-stats">Survival:</label>
                  <input type="number" id="skills-survival" v-model="skillsSurvival" class="input-stats" inputmode="numeric" required>
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
                <!-- be able to make a list and add new equipments -->
              </div>
              
              <br>
              <h3>Languages</h3>
              <div id="languages">
                
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
import { ROUTER_NAMES } from '@/enums/router-names'
import { COOKIE_NAMES } from '@/enums/cookie-names'
import { DIE_TYPE } from '@/enums/die-type'
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
          characterName: '',
          alignment: '',
          background: '',
          charClass: '',
          race: '',
          level: '',
          armorClass: '',
          initiative: '',
          speed: '',
          hp: '',
          hitDieType: '', // 1d10
          hitDieAmount: '', // 3
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
          savingStr: '',
          savingDex: '',
          savingCon: '',
          savingInt: '',
          savingWis: '',
          savingCha: '',
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
    methods: {
      checkIfAllValid() {
        console.info("@checkIfAllValid")
        if (this.level < MIN_VALUES.LEVEL || this.level > MAX_VALUES.LEVEL) { 
          alert(`Starting level must be between ${MIN_VALUES.LEVEL} - ${MAX_VALUES.LEVEL}`)
          return false
        }
        
        if (this.hp < MIN_VALUES.HP || this.hp.MAX_VALUES) {
          alert(`Starting HP must be between ${MIN_VALUES.HP} - ${MAX_VALUES.HP}`)
          return false
        } 
        
        if (this.hitDieAmount < MIN_VALUES.HIT_DIE || this.hitDieAmount > MAX_VALUES.HIT_DIE) {
          alert(`Starting Hit Die amount must be between ${MIN_VALUES.HIT_DIE} - ${MAX_VALUES.HIT_DIE}`)
          return false
        }

        if (this.hitDieType == '') {
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
        if (this.statsStr == '' || this.statsDex == '' || this.statsCon == '' || this.statsInt == '' || this.statsWis == '' || this.statsCha == '' ||
            this.statsStrBonus == '' || this.statsDexBonus == '' || this.statsConBonus == '' || this.statsIntBonus == '' || this.statsWisBonus == '' || this.statsChaBonus == '') {
              return false
        }

        if (this.statsStr > MAX_VALUES.STATS && this.statsDex > MAX_VALUES.STATS && this.statsCon > MAX_VALUES.STATS && this.statsInt > MAX_VALUES.STATS && this.statsWis > MAX_VALUES.STATS && this.statsCha > MAX_VALUES.STATS &&
            this.statsStrBonus > MAX_VALUES.STATS_BONUS && this.statsDexBonus > MAX_VALUES.STATS_BONUS && this.statsConBonus > MAX_VALUES.STATS_BONUS && this.statsIntBonus > MAX_VALUES.STATS_BONUS && this.statsWisBonus > MAX_VALUES.STATS_BONUS && this.statsChaBonus > MAX_VALUES.STATS_BONUS) {
          return false

        }
        
        return true

      },
      checkIfThrowsValid() {
        console.info("@checkIfThrowsValid")
        if (this.savingStr == '' || this.savingDex == '' || this.savingCon == '' || this.savingInt == '' || this.savingWis == '' || this.savingCha == '') {
          return false
        }
        
        if (this.savingStr > MAX_VALUES.SAVING_THROWS && this.savingDex > MAX_VALUES.SAVING_THROWS && this.savingCon > MAX_VALUES.SAVING_THROWS && this.savingInt > MAX_VALUES.SAVING_THROWS && this.savingWis > MAX_VALUES.SAVING_THROWS && this.savingCha > MAX_VALUES.SAVING_THROWS) {
          return false
        }

        return true
      },
      checkIfSkillsValid() {
        if (this.skillsAcrobatics == '' || this.skillsAnimalHandling == '' || this.skillsArcana == '' || this.skillsAthletics == '' || 
            this.skillsDeception == '' || this.skillsHistory == '' || this.skillsInsight == '' || this.skillsIntimidation == '' || 
            this.skillsInvestigation == '' || this.skillsMedicine == '' || this.skillsNature == '' || this.skillsPerception == '' || 
            this.skillsPerformance == '' || this.skillsPersuasion == '' || this.skillsReligion == '' || this.skillsSleightOfHand == '' || 
            this.skillsStealth == '' || this.skillsSurvival == '') {
          return false
        }

        if (this.skillsAcrobatics > MAX_VALUES.SKILLS || this.skillsAnimalHandling > MAX_VALUES.SKILLS || this.skillsArcana > MAX_VALUES.SKILLS || this.skillsAthletics > MAX_VALUES.SKILLS || 
            this.skillsDeception > MAX_VALUES.SKILLS || this.skillsHistory > MAX_VALUES.SKILLS || this.skillsInsight > MAX_VALUES.SKILLS || this.skillsIntimidation > MAX_VALUES.SKILLS || 
            this.skillsInvestigation > MAX_VALUES.SKILLS || this.skillsMedicine > MAX_VALUES.SKILLS || this.skillsNature > MAX_VALUES.SKILLS || this.skillsPerception > MAX_VALUES.SKILLS || 
            this.skillsPerformance > MAX_VALUES.SKILLS || this.skillsPersuasion > MAX_VALUES.SKILLS || this.skillsReligion > MAX_VALUES.SKILLS || this.skillsSleightOfHand > MAX_VALUES.SKILLS || 
            this.skillsStealth > MAX_VALUES.SKILLS || this.skillsSurvival > MAX_VALUES.SKILLS) {
          return false
        }

        return true
      },
      createCharacter() {
        console.info("@createCharacter")
        if (this.checkIfAllValid()) {
          alert("New Character created!")
          this.toggleModal()
          window.scrollTo({ top: 0, behavior: 'smooth' });

        }
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

.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 300px; /* Adjust the height as needed */
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

/* .container-stat {
  text-align: left;
  padding-left: 7%;
}

.container-stat-bonus {
  text-align: right;
  padding-right: 7%;
  margin-left: auto;
} */

.container-saving-throws {
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* align-items: center; */
  /* text-align: center; */
}


.skills {
  display: flex;
  flex-direction: column;
}

.button-create-character {
  font-size: x-large;
  margin-top: 10%;
  margin-bottom: 10%;
}
</style>