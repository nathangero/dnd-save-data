<template>
  <div>
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
              <!-- <li>Profile</li>
              <li>Settings</li> -->
              <li @click="logOut">Log Out</li>
              
              <p>Version: {{ APP_VERSION }}</p>
            </ul>
          </div>
        </div>
      </template>
    </transition>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import APP_VERSION from "@/enums/app-version"

export default {
  name: "SideMenu",
  data() {
    return {
      store: useStore(),
      showMenu: false,
      APP_VERSION: APP_VERSION
    }
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu
    },
    logOut() {
      this.store.commit('signOut')
    },
  }
}
</script>

<style>
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
</style>