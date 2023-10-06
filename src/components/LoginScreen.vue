<template>
  <div>
    <div class="body vh-100" v-if="!isPopupOpen()">
      <header :class="{ 'disabled-page': isPopupOpen() }">
        <img class="img-fluid site-logo" src="../assets/icons8-dungeons-and-dragons-480.png" alt="Dungeon's and Dragon's logo by Icons 8">
        <h1>D&D Save Data</h1>
      </header>

      <br>
      
      <main :class="{ 'disabled-page': isPopupOpen() }">
        <form class="d-flex flex-column align-items-center">
          <input id="email" class="form-control fs-4 border-0 border-bottom  mb-3" type="email" v-model="emailLogin" placeholder="Email">
          <input id="password" class="form-control fs-4 border-0 border-bottom mb-3" type="password" v-model="passwordLogin" placeholder="Password">
          <button id="button-login" class="btn fs-1" @click.prevent="login">Login</button>
          <div v-if="error" class="error">{{ error }}</div>
        </form>

        <br>
        <div>
          <p class="fs-3">New user? Signup <a href="#" class="signup-link" @click.prevent="togglePopupSignup">here</a></p>
          <p class="fs-5">Forgot your password? Reset <a href="#" class="signup-link" @click.prevent="togglePopupResetPassword">here</a></p>
          <p>Version: {{ APP_VERSION }}</p>
        </div>
      </main>
    </div>


    <!-- Reset Email Popup -->
    <div class="d-flex flex-column justify-content-center align-items-center vh-100 vw-100 form-container" v-if="isOpenPopupResetPassword">
      <transition name="fade" appear>
        <div class="p-3 custom-form">
          <h1>Password Reset</h1>
          <form>
            <input id="email" class="form-control w-100 fs-3 border-0 border-bottom mb-3 mx-auto" type="email" v-model="emailReset" placeholder="Email">

            <button class="btn btn-secondary fs-3 mx-3" @click.prevent="togglePopupResetPassword">Cancel</button>
            <button class="btn btn-danger fs-3 mx-3" @click.prevent="resetPassword">Reset</button>
            <div v-if="error" class="error">{{ error }}</div>
          </form>
        </div>
      </transition>
    </div>

    <!-- Signup Popup -->
    <div class="d-flex flex-column justify-content-center align-items-center vh-100 vw-100 form-container" v-if="isOpenPopupSignup">
      <transition name="fade" appear>
        <div class="p-3 custom-form">
          <h1>Sign Up</h1>
          <form>
            <input class="form-control w-100 fs-4 border-0 border-bottom mb-3 mx-auto" type="text" v-model="name" placeholder="Name">
            <input class="form-control w-100 fs-4 border-0 border-bottom mb-3 mx-auto" type="email" v-model="emailSignup" placeholder="Email">
            <input class="form-control w-100 fs-4 border-0 border-bottom mb-3 mx-auto" type="password" v-model="passwordSignup" placeholder="Password">
            <input class="form-control w-100 fs-4 border-0 border-bottom mb-3 mx-auto" type="password" v-model="passwordConfirm" placeholder="Confirm Password">
            <p class="fs-5 mb-4">You need minimum 8 characters, a lowercase letter, an uppercase letter, number, and special character</p>

            <button class="btn btn-secondary fs-3 mx-3" @click.stop="togglePopupSignup">Cancel</button>
            <button id="button-signup" class="btn btn-info fs-3 mx-3 " @click.prevent="signup">Sign Up</button>
            <div v-if="error" class="error">{{ error }}</div>
          </form>
        </div>
      </transition>
    </div>
    
    <!-- Loading Spinner -->
    <div v-show="isLoggingIn">
      <loading-spinner :loadingText="loadingText"></loading-spinner>
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
      isOpenPopupSignup: false,
      isOpenPopupResetPassword: false,
      isLoggingIn: false,
      loadingText: "",
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
          this.togglePopupResetPassword()
        })
        .catch((error) => {
          console.error(error)
          alert("Email doesn't exist")
          this.togglePopupResetPassword()
        });
      } else {
        alert("Fill in an email")
      }
      
    },
    async login() {
      try {
        this.loadingText = LOADING_TEXT.LOGGING_IN
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

            window.scrollTo(0,0); // Scroll to top just in case
            setTimeout(() => {
              this.$router.push(ROUTER_PATHS.CHARACTERS)
            }, 1200)
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
      if (!this.isInfoValid()) {
        throw this.error
      }
      
      try {
        this.loadingText = LOADING_TEXT.SIGNING_UP
        this.isLoggingIn = true

        await createUserWithEmailAndPassword(auth, this.emailSignup, this.passwordSignup)
        .then((userCredential) => {
          // Signed up successfully
          const user = userCredential.user

          window.scrollTo(0,0); // Scroll to top just in case
          writeUserInDb(user.uid, this.name, this.emailSignup).then(() => {
            this.store.dispatch('getUserInfo', user.uid)
            this.$router.push(ROUTER_PATHS.CHARACTERS)
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
        })
      } catch (error) {
        this.isLoggingIn = false
        throw error
      }
    },
    isInfoValid() {
      if (this.name === '') {
        alert("Fill in your name")
        return false
      } else if (this.emailSignup === '') {
        alert("Fill out your email")
        return false
      } else if (this.isValidPassword()) {
        alert("Password must be at least 6 characters")
        return false
      } else if (this.passwordSignup !== this.passwordConfirm) {
        alert("Passwords do not match")
        return false
      }

      return true
    },
    isValidPassword() {
      const passwordReq = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
      return passwordReq.test(this.passwordSignup)
    },
    isPopupOpen() {
      return this.isOpenPopupResetPassword || this.isOpenPopupSignup
    },
    togglePopupSignup() {
      // Set the isOpenPopupSignup data property to true to display the popup
      this.isOpenPopupSignup = !this.isOpenPopupSignup
      this.name = ''
      this.emailSignup = ''
      this.passwordSignup = ''
      this.passwordConfirm = ''
      
      window.scrollTo(0,0)
    },
    togglePopupResetPassword() {
      this.isOpenPopupResetPassword = !this.isOpenPopupResetPassword
      this.emailReset = ''

      window.scrollTo(0,0)
    },
  },
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

  form input {
    width: 75%;
  }

  .site-logo {
    width: 30%;
    height: auto;
  }

  .custom-form {
    /* position: fixed; */
    background-color: var(--white);
    max-width: var(--width-close-to-mobile-screen);
  }

  .disabled-page {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none; 
    visibility: hidden;
  }

  #button-login,
  #button-signup {
    background-color: var(--blue);
    border-radius: var(--border-radius);
    color: var(--white);
  }

  @media screen and (min-width: 600px) {
    .site-logo {
      width: 20%;
      height: auto;
    }

    form input {
      width: 50%;
    }
  }

  @media screen and (min-width: 1025px) {
    .site-logo {
      width: 15%;
      height: auto;
    }
  }

  @media screen and (min-width: 1201px) {
    .site-logo {
      width: 13%;
      height: auto;
    }
  }

  @media (prefers-color-scheme: dark) {
    
    footer {
      background-color: var(--nav-bg-dark);
      color: white;
    }

    footer a {
      color:  var(--a-dark);
    }
    
    .body {
      background-color: var(--black);
      color: var(--white)
    }

    .signup-link {
      color: var(--a-dark);
    }
    .form-container {
      background-color: var(--black);
    }

    .custom-form {
      background-color: var(--black);
    }

    .custom-form p {
      color: var(--white);
    }

    .custom-form h1 {
      color: var(--white);
    }
  }
</style>
