<template>
  <div>
    <nav>
      <ul class="nav justify-content-between fixed-bottom text-capitalize fs-5 custom-navbar">
        <li class="nav-item" :class="{ 'custom-active': activeTab === ROUTER_NAMES.CAMPAIGNS }" @click="navigateTo(ROUTER_NAMES.CAMPAIGNS)">
          <a class="nav-link p-3">{{ ROUTER_NAMES.CAMPAIGNS }}</a>
        </li>
        
        <li class="nav-item" :class="{ 'custom-active': activeTab === ROUTER_NAMES.CHARACTERS }" @click="navigateTo(ROUTER_NAMES.CHARACTERS)">
          <a class="nav-link p-3">{{ ROUTER_NAMES.CHARACTERS }}</a>
        </li>

        <li class="nav-item" :class="{ 'custom-active': activeTab === ROUTER_NAMES.SESSIONS }" @click="navigateTo(ROUTER_NAMES.SESSIONS)">
          <a class="nav-link p-3">{{ ROUTER_NAMES.SESSIONS }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import ROUTER_NAMES from '@/enums/router-names'

export default {
  props: {
    activeTab: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      darkModeMediaQuery: window.matchMedia('(prefers-color-scheme: dark)'),
      isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
      ROUTER_NAMES: ROUTER_NAMES,
    }
  },
  mounted: function() {
    this.handleThemeChange()
  },
  methods: {
    handleThemeChange() {
      this.isDarkMode = this.darkModeMediaQuery.matches;

      // Watch for changes
      this.darkModeMediaQuery.addEventListener("change", () => {
        // console.log("@NavBar theme changed")
      })
    },
    navigateTo(routeName) {
      this.$router.push({ name: routeName })
    },
  }
}
</script>

<style scoped>

.custom-navbar {
  background-color: var(--nav-bg-light);
}


.custom-navbar a {
  color: var(--nav-bg-dark);
  cursor: pointer;
}

.custom-active {
  background-color: var(--nav-active-bg-light);
}

/* Really small screens like iPhone SE */
@media only screen and (min-width: 375px) and (min-height: 667px) {
  .custom-navbar li {
    width: 120px;
  }
}

@media (prefers-color-scheme: dark) {
  html {
    background-color: var(--nav-bg-dark);
    min-height: 100%;
  }

  .custom-navbar {
    background-color: var(--nav-bg-dark);
  }

  .custom-navbar a {
    color: var(--nav-bg-light);
    cursor: pointer;
  }

  .custom-active {
    background-color: var(--nav-active-bg-dark);
  }
}

</style>