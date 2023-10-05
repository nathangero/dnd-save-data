<template>
  <div>
    <button class="btn d-flex justify-content-start" data-bs-toggle="offcanvas" href="#offcanvas" role="button" aria-controls="offcanvas">
      <div class="hamburger-menu m-3">
        <div class="hamburger-line"></div>
        <div class="hamburger-line"></div>
        <div class="hamburger-line"></div>
      </div>
    </button>

    <div class="offcanvas offcanvas-start w-75" tabindex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
      <div class="offcanvas-header">
        <h1 class="offcanvas-title" id="offcanvasLabel"><strong>{{ getUserInfo().name }}</strong></h1>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body text-start">
          <h2 class="" @click="logOut">Log Out</h2>

          <br><br>
          <p class="m-0">-------------------</p>
          <p>Version: {{ APP_VERSION }}</p>
      </div>
    </div>
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
    getUserInfo() {
      const user = this.store.getters.getUser
      
      return user
    },
  }
}
</script>

<style scoped>

.hamburger-menu {
  margin: 20px 20px;
  width: 30px;
  height: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}

.hamburger-line {
  width: 100%;
  height: 3px;
  background-color: var(--black);
}

@media (prefers-color-scheme: dark) {

  #offcanvas {
    background-color: var(--black);
    color: var(--white);
    border-right: 1px solid var(--dimgray);
  }

  #offcanvas button {
    background-color: var(--white);
    opacity: 0.8;
  }

  .hamburger-line {
    background-color: var(--white);
  }
}
</style>