<template>
  <div>
    <h1>DND Save Data</h1>
    <div class="center-container">
      <div class="login-screen-container">
        <div class="form">
          <input type="email" id="email" v-model="emailLogin" placeholder="Email">
          <br>
          <input type="password" id="password" v-model="passwordLogin" placeholder="Password">
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
                <input type="text" id="name" v-model="name" placeholder="Name">
                <br>
                <input type="email" id="email" v-model="emailSignup" placeholder="Email">
                <br>
                <input type="password" id="password" v-model="passwordSignup" placeholder="Password">
                <br>
                <input type="password" id="passwordConfirm" v-model="passwordConfirm" placeholder="Confirm Password">
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
import { ROUTER_PATHS } from '@/enums/router-paths'
import { auth } from "@/firebase.js"
import { useStore } from 'vuex'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword  } from "firebase/auth"
import 'firebase/auth'
import { writeUserInDb } from "@/functions/rtdb.js"

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
  mounted() {
    console.info('@LoginScreen')
  },
  watch: {
    '$store.state.isLoggedIn'(newValue, oldValue) {
      // Wait till the user is logged in before going to the dashboard
      if (newValue && !oldValue) {
        this.$router.push(ROUTER_PATHS.DASHBOARD)
      }
    }
  },
  methods: {
    async login() {
      try {
        await signInWithEmailAndPassword(auth, this.emailLogin, this.passwordLogin)
        .then((userCredential) => {
          const firebaseUser = userCredential.user
          console.info('signed in')
          this.store.dispatch('getUserInfo', firebaseUser.uid).then((success) => {
            if (!success) {
              alert("Invalid email/password")
            }
          }).catch(() => {
            alert("User doesn't exist")
          })
          
        })
        .catch((error) => {
          // Handle errors
          const errorCode = error.code
          const errorMessage = error.message
          console.info("error:" + errorCode + errorMessage)
          alert(errorCode)
        })
        
      } catch (error) {
        this.error = error.message
      }
    },
    async signup() {
      if (this.isInfoValid()) {
        await createUserWithEmailAndPassword(auth, this.emailSignup, this.passwordSignup)
        .then((userCredential) => {
          // Signed up successfully
          const user = userCredential.user

          writeUserInDb(user.uid, this.name, this.emailSignup).then(() => {
            this.store.dispatch('getUserInfo', user.uid)
          })
          
        })
        .catch((error) => {
          // Handle errors
          let errorCode = error.code
          console.info("error: " + error.code + " " + error.message)
          
          if (error.code == "auth/invalid-email") {
            errorCode = "Invalid Email"
          } else if (error.code == "auth/missing-email") {
            errorCode = "Fill out your email"
          }
          alert(errorCode)

        }).finally(() => {
          if (this.name !== '' && this.emailSignup !== '' && this.passwordSignup !== '' && this.passwordConfirm !== '') {
            this.hideSignupPopup()
          }
          
        })
      }
    },
    isInfoValid() {
      if (this.name === '') {
        alert("Fill in your name")
        return false
      } else if (this.emailSignup === '') {
        alert("Fill out your email")
        return false
      } else if (this.passwordSignup.length < 6) {
        alert("Password must be at least 6 characters")
        return false
      } else if (this.passwordSignup !== this.passwordConfirm) {
        alert("Passwords do not match")
        return false
      }

      return true
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
