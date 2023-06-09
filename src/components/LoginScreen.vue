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

        <div style="display: flex; flex-direction: column; text-align: center;">
          <p class="sign-up-text">New user? Please make a new account <a href="#" class="signup-link" @click.prevent="showSignupPopup">here</a>.</p>
          <p class="password-reset-text">Forgot your password? Reset <a href="#" class="signup-link" @click.prevent="showResetPasswordPopup">here</a>.</p>
        </div>

        <!-- Sign Up Popup -->
        <transition name="fade" appear>
          <div class="overlay" v-if="showSignup">
            <div class="popup">
              <div class="form">
                <h1>Sign up</h1>
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

        <!-- Reset Email Popup -->
        <transition name="fade" appear>
          <div class="overlay" v-if="showResetPassword">
            <div class="popup">
              <div class="form">
                <h1>Password Reset</h1>
                <input type="email" id="email" v-model="emailReset" placeholder="Email">
                <br>
                <div class="signup-buttons">
                  <button @click="hideResetPasswordPopup">Cancel</button>
                  <button class="sign-up-button" @click="resetPassword">Reset</button>
                </div>
                <div v-if="error" class="error">{{ error }}</div>
              </div>
              
            </div>
          </div>
        </transition>

        <!-- Loading Spinner -->
        <div class="v-spinner" v-show="isLoggingIn">
          <div class="spinner-background">
            <div class="v-clip" v-bind:style="spinnerStyle">
            </div>
            <p class="logging-in-text">Logging In</p>
          </div>
        </div>
        
        <footer class="footer">
          <a target="_blank" href="https://icons8.com/icon/104704/dungeons-and-dragons">Dungeons and Dragons</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
        </footer>
      </div>
    </div>
  </div>
</template>
  
<script>
import ROUTER_PATHS from '@/enums/router-paths'
import { auth } from "@/firebase.js"
import { useStore } from 'vuex'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"
// import { PulseLoader } from 'vue-spinner/dist/vue-spinner.min.js'
import { writeUserInDb } from "@/functions/rtdb.js"

export default {
  name: 'LoginScreen',
  components: {
    // PulseLoader: PulseLoader
  },
  data() {
    return {
      store: useStore(),
      name: '',
      emailLogin: '',
      passwordLogin: '',
      emailSignup: '',
      emailReset: '',
      passwordSignup: '',
      passwordConfirm: '',
      error: null,
      showSignup: false,
      showResetPassword: false,
      isLoggingIn: false
    }
  },
  mounted() {
    // console.info('@LoginScreen')
  },
  watch: {
    '$store.state.isLoggedIn'(newValue, oldValue) {
      // Wait till the user is logged in before going to the dashboard
      if (newValue && !oldValue) {
        // When at login, give time to load the user profile before switching to the dashboard
        setTimeout(() => {
          this.isLoggingIn = false
          this.$router.push(ROUTER_PATHS.DASHBOARD)
        }, 1500)
        
      }
    }
  },
  methods: {
    async resetPassword() {
      if (this.emailReset !== '') {
        await sendPasswordResetEmail(auth, this.emailReset).then(() => {
          alert('Password reset email sent. Please check your email')
          this.hideResetPasswordPopup()
        })
        .catch((error) => {
          console.error(error)
          alert("Email doesn't exist")
          this.hideResetPasswordPopup()
        });
      } else {
        alert("Fill in an email")
      }
      
    },
    async login() {
      try {
        this.isLoggingIn = true
        await signInWithEmailAndPassword(auth, this.emailLogin, this.passwordLogin)
        .then((userCredential) => {
          const firebaseUser = userCredential.user
          // console.info('signed in')
          this.store.dispatch('getUserInfo', firebaseUser.uid).then((success) => {
            if (!success) {
              alert("Invalid email/password")
            }
          }).catch(() => {
            this.isLoggingIn = false
            alert("User doesn't exist")
          })
          
        })
        .catch((error) => {
          this.isLoggingIn = false
          // Handle errors
          const errorCode = error.code
          const errorMessage = error.message
          console.info("error:" + errorCode + errorMessage)
          alert(errorCode)
        })
        
      } catch (error) {
        this.isLoggingIn = false
        this.error = error.message
      }
    },
    async signup() {
      if (this.isInfoValid()) {
        this.isLoggingIn = true
        await createUserWithEmailAndPassword(auth, this.emailSignup, this.passwordSignup)
        .then((userCredential) => {
          // Signed up successfully
          const user = userCredential.user

          writeUserInDb(user.uid, this.name, this.emailSignup).then(() => {
            this.store.dispatch('getUserInfo', user.uid)
          })
          
        })
        .catch((error) => {
          this.isLoggingIn = false
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
          this.isLoggingIn = false
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
    showResetPasswordPopup() {
      this.showResetPassword = true
      this.emailReset = ''
    },
    hideSignupPopup() {
      // Set the showSignup data property to false to hide the popup
      this.showSignup = false
      this.name = ''
      this.emailSignup = ''
      this.passwordSignup = ''
      this.passwordConfirm = ''
    },
    hideResetPasswordPopup() {
      this.showResetPassword = false
      this.emailReset = ''
    }
  }, // height: 100px; width: 100px; border-width: 5px; border-style: solid; border-color: rgb(93, 197, 150) rgb(93, 197, 150) transparent; border-radius: 100%; background: transparent;
  computed: {
    spinnerStyle () {
      return {
        height: '100px',
        width: '100px',
        borderWidth: '5px',
        borderStyle: 'solid',
        borderColor: '#5dc596' + ' ' + '#5dc596' + ' transparent',
        borderRadius: '100%',
        background: 'transparent'
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

.fade-enter-from,
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

.spinner-background {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 200px;
  height: 200px;
  background-color: #fff;
  border-radius: 10px;
}

.v-spinner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  color: black;
}

.v-spinner .v-clip {
  -webkit-animation: v-clipDelay 1.25s 0s infinite linear;
  animation: v-clipDelay 1.25s 0s infinite linear;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  display: inline-block;
  height: 100px;
  width: 100px;
  border: 5px solid #5dc596;
  border-radius: 50%;
  background-color: #fff;
  position: relative;
}

.logging-in-text {
  color: black;
  margin-top: 20px;
}

@-webkit-keyframes v-clipDelay
{
  100%
  {
    -webkit-transform: rotate(360deg) scale(1);
            transform: rotate(360deg) scale(1);
  }
}

@keyframes v-clipDelay
{
  100%
  {
    -webkit-transform: rotate(360deg) scale(1);
            transform: rotate(360deg) scale(1);
  }
}


.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #f5f5f5;
  text-align: center;
  padding: 10px;
}

</style>
