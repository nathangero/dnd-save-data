<template>
  <div class="body">
    <h1>{{ getUserInfo.name }}'s characters</h1>
    <div class="top-buttons">
      <button class="button-create" @click="toggleModal">Create Character</button>
    </div>

    <transition name="slide-up" mode="out-in">
      <template v-if="showModal">
        <div class="modal-page-overlay">
          <div class="modal-page">
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
              
            </div>

            <br>
            <h3>Skills</h3>
            <div id="skills">
              <!-- be able to make a list and add new skills -->
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

          </div>
        </div>
      </template>
    </transition>

    <!-- Bottom Navigation Bar -->
    <nav class="bottom-navigation">
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
import Cookies from 'js-cookie'

export default {
    name: ROUTER_NAMES.CHARACTERS.charAt(0).toUpperCase() + ROUTER_NAMES.CHARACTERS.slice(1),
    data() {
        return {
          store: useStore(),
          showModal: false,
          alignment: '',
          background: '',
          characterName: '',
          charClass: '',
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
          race: '',

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
      navigateTo(routeName) {
        this.$router.push({ name: routeName })
      },
      toggleModal() {
        this.showModal = !this.showModal
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
  width: 80px; /* Adjust the width as needed */
  margin-left: 10px; /* Adjust the spacing between the label and input */
  border: none; /* Remove the default border */
  border-bottom: 1px solid black; /* Add a bottom border */
  outline: none;
  text-align: left;
  padding-bottom: 5px;
}

.flex-container-stat {
  display: flex;
  flex-direction: row;
}

.container-stat {
  text-align: left;
  padding-left: 7%;
}

.container-stat-bonus {
  text-align: right;
  padding-right: 7%;
  margin-left: auto;
}
</style>