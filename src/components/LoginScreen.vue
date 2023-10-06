<template>
  <div>
    <div class="body">
      <header>
        <img class="w-25" src="../assets/icons8-dungeons-and-dragons-480-light.png" alt="Dungeon's and Dragon's logo by Icons 8">
        <h1>D&D Save Data</h1>
      </header>

      <main>

      </main>
    </div>

    <footer class="nav fixed-bottom d-flex justify-content-center p-3">
      <a target="_blank" href="https://icons8.com/icon/104704/dungeons-and-dragons">Dungeons and Dragons</a>
      <span class="mx-2"> icon by </span>
      <a target="_blank" href="https://icons8.com">Icons8</a>
    </footer>
    
    <!-- Loading Spinner -->
    <div v-show="isLoggingIn">
      <loading-spinner :loadingText="LOADING_TEXT.LOGGING_IN"></loading-spinner>
    </div>
  </div>
</template>
  
<script>
import LoadingSpinner from './LoadingSpinner.vue'
import ROUTER_PATHS from '@/enums/router-paths'
import APP_VERSION from "@/enums/app-version"
import { auth } from "@/firebase.js"
import { useStore } from 'vuex'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"
import { writeUserInDb } from "@/functions/rtdb.js"
import { LOADING_TEXT } from "@/enums/loading-text"

export default {
  name: 'LoginScreen',
  components: {
    LoadingSpinner,
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
      isLoggingIn: false,
      APP_VERSION: APP_VERSION,
      LOADING_TEXT: LOADING_TEXT,
    }
  },
  mounted() {
    // console.info('@LoginScreen')
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
              return
            }

            setTimeout(() => {
              this.isLoggingIn = false
              this.$router.push(ROUTER_PATHS.CHARACTERS)
            }, 1500)
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

<style scoped>

  h1 {
    font-size: 2.5em;
  }

  footer {
    background-color: var(--light-gray);
  }

  
</style>
