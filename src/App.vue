<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <router-view />
  </div>
  
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    
  },
  data() {
    return {
      darkModeMediaQuery: window.matchMedia('(prefers-color-scheme: dark)'),
      isDarkMode: true,
    }
  },
  computed: {
    ...mapState(['isLoggedIn'])
  },
  created() {
    document.title = "DND Save Data";

    this.isDarkMode = this.darkModeMediaQuery.matches;

    // Make the status bar on mobile match the background color
    const metaTag = document.createElement("meta");
    metaTag.name = "theme-color";
    metaTag.content = this.isDarkMode ? "#000000" : "#ffffff"; // Make black or white 
    document.head.children[3]
    document.head.appendChild(metaTag);
  },
  mounted: function() {
    this.darkModeMediaQuery.addEventListener("change", () => {
      this.isDarkMode = this.darkModeMediaQuery.matches;
      // console.log("@App is dark mode?", this.isDarkMode)

      document.querySelector('meta[name="theme-color"]').setAttribute("content", this.isDarkMode ? "#000000" : "#ffffff")
    })
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.title {
  margin: 1.5em 0;
}

</style>
