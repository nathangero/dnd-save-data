<template>
  <div>
    <h1>DND Save Data</h1>
    <div class="center-container">
      <div class="login-screen-container">
        <div class="form">
          <input type="email" id="email" v-model="emailLogin" placeholder="Email" required>
          <br>
          <input type="password" id="password" v-model="passwordLogin" placeholder="Password" required>
          <br>
          <button class="login-button" @click="login">Login</button>
          <div v-if="error" class="error">{{ error }}</div>
        </div>

        <p class="sign-up-text">New user? Please make a new account <a href="#" class="signup-link" @click.prevent="showSignupPopup">here</a>.</p>

        <!-- Popup container -->
        <transition name="fade" appear>
          <div class="overlay" v-if="showSignup">
            <div class="popup">
              <div class="form">
                <h2>Sign up</h2>
                <input type="text" id="name" v-model="name" placeholder="Name" required>
                <br>
                <input type="email" id="email" v-model="emailSignup" placeholder="Email" required>
                <br>
                <input type="password" id="password" v-model="passwordSignup" placeholder="Password" required>
                <br>
                <input type="password" id="passwordConfirm" v-model="passwordConfirm" placeholder="Confirm Password" required>
                <br>
                <p>Password must be at least 6 characters</p>
                <div class="signup-buttons">
                  <button @click="hideSignupPopup">Cancel</button>
                  <button class="sign-up-button" @click="signup">Sign Up</button>
                </div>
                <div v-if="error" class="error">{{ error }}</div>
              </div>
              
            </div>
          </div>
        </transition>

      </div>
    </div>
  </div>
</template>
  
<script>
// import firebase from 'firebase/compat/app'
import { auth } from "@/firebase.js"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword  } from "firebase/auth";
import 'firebase/auth'
import { useStore } from 'vuex';

export default {
  name: 'LoginScreen',
  components: {
    
  },
  data() {
    return {
      store: useStore(),
      name: '',
      emailLogin: '',
      passwordLogin: '',
      emailSignup: '',
      passwordSignup: '',
      passwordConfirm: '',
      error: null,
      showSignup: false
    }
  },
  setup() {
    
  },
  methods: {
    async login() {
      try {
        await signInWithEmailAndPassword(auth, this.emailLogin, this.passwordLogin)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user.email != '') {
            // Redirect the user to the dashboard after successful login
            this.store.commit('setUser', user)
            this.store.commit('setIsLoggedIn', true)
            this.$router.push('/dashboard')
          } else {
            alert("Invalid email/password")
          }
        })
        .catch((error) => {
          // Handle errors
          const errorCode = error.code;
          const errorMessage = error.message;
          console.info("error:" + errorCode + errorMessage)
          alert(errorCode)
        })
        
      } catch (error) {
        this.error = error.message
      }
    },
    async signup() {
      await createUserWithEmailAndPassword(auth, this.emailSignup, this.passwordSignup)
      .then((userCredential) => {
        // Signed up successfully
        const user = userCredential.user;
        console.info('user: ' + JSON.stringify(user))

        this.store.commit('setUser', user)
        this.store.commit('setIsLoggedIn', true)
        this.$router.push('/dashboard')
      })
      .catch((error) => {
        // Handle errors
        const errorCode = error.code;
        const errorMessage = error.message;
        console.info("error:" + errorCode + errorMessage)
        alert(errorCode)
      }).finally(() => {
        this.hideSignupPopup()
      });
    },
    showSignupPopup() {
      // Set the showSignup data property to true to display the popup
      this.showSignup = true
      this.name = ''
      this.emailSignup = ''
      this.passwordSignup = ''
      this.passwordConfirm = ''
    },
    hideSignupPopup() {
      // Set the showSignup data property to false to hide the popup
      this.showSignup = false
      this.name = ''
      this.emailSignup = ''
      this.passwordSignup = ''
      this.passwordConfirm = ''
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

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form label,
.form input,
.form button {
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
