<template>
  <div>
    <div class="center-container">
      <div class="login-screen-container">
        <form @submit.prevent="login">
          <input type="email" id="email" v-model="email" required>
          <br>
          <input type="password" id="password" v-model="password" required>
          <br>
          <button class="login-button" type="submit">Login</button>
          <div v-if="error" class="error">{{ error }}</div>
        </form>

        <p class="sign-up-text">New user? Please make a new account <a href="#" class="signup-link" @click.prevent="showSignupPopup">here</a>.</p>
      </div>
    </div>
    <!-- Add the popup container as a sibling to the center-container -->
    <div class="signup-popup-container" v-if="showSignup">
      <!-- Add the popup content here -->
      
    </div>
  </div>
</template>
  
  <script>
  import firebase from 'firebase/app'
  import 'firebase/auth'
  
  export default {
    name: 'LoginScreen',
    components: {
      
    },
    data() {
      return {
        email: '',
        password: '',
        error: null,
        showSignup: false
      }
    },
    methods: {
      async login() {
        try {
          await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          // Redirect the user to the dashboard after successful login
          this.$router.push('/dashboard')
        } catch (error) {
          this.error = error.message
        }
      }
    }
  }
  </script>
  
  <style>
  .center-container {
    display: flex;
    justify-content: center;
  }

  .login-screen-container {
    text-align: left;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  form label,
  form input,
  form button {
    margin: 0em 0;
  }

    input {
    padding: 10px 20px;
  }

  .login-button {
    display: block;
    margin: 0 auto;
    padding: 10px 20px;
  }

  .sign-up-text {
    margin: 1em 0;
  }
  


  .error {
    color: red;
  }
  </style>
  