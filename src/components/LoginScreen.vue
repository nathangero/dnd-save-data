<template>
  <div>
    <div class="center-container">
      <div class="login-screen-container">
        <form @submit.prevent="login">
          <input type="email" id="email" v-model="email" placeholder="Email" required>
          <br>
          <input type="password" id="password" v-model="password" placeholder="Password" required>
          <br>
          <button class="login-button" type="submit">Login</button>
          <div v-if="error" class="error">{{ error }}</div>
        </form>

        <p class="sign-up-text">New user? Please make a new account <a href="#" class="signup-link" @click.prevent="showSignupPopup">here</a>.</p>

        <!-- Popup container -->
        <transition name="fade" appear>
          <div class="overlay" v-if="showSignup">
            <div class="popup">
              <form>
                <h2>Sign up</h2>
                <br>
                <input type="email" id="email" v-model="email" placeholder="Email" required>
                <br>
                <input type="password" id="password" v-model="password" placeholder="Password" required>
                <br>
                <input type="password" id="confirmPassword" v-model="confirmPassword" placeholder="Confirm Password" required>
                <br>
                <div class="signup-buttons">
                  <button @click="hideSignupPopup" type="reset">Cancel</button>
                  <button class="sign-up-button" type="submit">Sign Up</button>
                </div>
                <div v-if="error" class="error">{{ error }}</div>
              </form>
              
            </div>
          </div>
        </transition>

      </div>
    </div>
  </div>
</template>
  
<script>
import firebase from 'firebase/compat/app'
import 'firebase/auth'
import store from '@/store'

export default {
  name: 'LoginScreen',
  components: {
    
  },
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
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
    },
    async signup() {
        await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          // Signed up successfully
          const user = userCredential.user;
          store.setUser(user)
        })
        .catch((error) => {
          // Handle errors
          const errorCode = error.code;
          const errorMessage = error.message;
          alert("error:" + errorCode + errorMessage)
        });
    },
    showSignupPopup() {
      // Set the showSignup data property to true to display the popup
      this.showSignup = true
    },
    hideSignupPopup() {
      // Set the showSignup data property to false to hide the popup
      this.showSignup = false
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


.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}


/* add styles for popup and overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  max-width: 500px;
}

.popup.active {
  opacity: 1;
}


.signup-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.cancel-button {
  background-color: gray;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.signup-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.signup-buttons button {
  margin-right: 10px;
  margin-left: 10px;
}
</style>
