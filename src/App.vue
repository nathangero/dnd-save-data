<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <h1 class="title">DND Save Data</h1>
    <LoginScreen />
  </div>
  
</template>

<script>
import LoginScreen from './components/LoginScreen.vue'

export default {
  name: 'App',
  components: {
    LoginScreen
  },
  mounted() {
    
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
