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
          <input type="text" v-model="characterName" placeholder="Character Name">
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
            characterName: '',
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
</style>