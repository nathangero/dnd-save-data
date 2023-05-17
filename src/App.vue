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
  computed: {
    ...mapState(['isLoggedIn'])
  },
  created() {
    
    document.title = "DND Save Data";
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.title {
  margin: 1.5em 0;
}

</style>
