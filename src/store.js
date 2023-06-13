import { createStore } from 'vuex'
import User from './models/user'
import { auth } from '@/firebase'
import * as rtdbFunctions from './functions/rtdb'
import Cookies from 'js-cookie';
import COOKIE_NAMES from '@/enums/cookie-names'
// import { CHARACTER_KEYS } from '@/enums/dbKeys/character-keys.js'

const store = createStore({
  state: {
    user: new User(),
    isLoggedIn: false,
  },
  mutations: {
    addCharacter(charId, characterInfo) {
      this.usersCharacters[charId] = characterInfo
    },
    deleteCharacter(state, charId) {
      console.info('@deleteCharacter')
      delete state.user.characters[charId]
      console.info('state.user.characters:', state.user.characters)
    },
    signOut(state) {
      state.user = new User()
      state.isLoggedIn = false

      Cookies.remove(COOKIE_NAMES.USER)
      auth.signOut()
    },
      setUser(state, user) {
      state.user = user
      const limitedUser = User.getUserForCookie(user)
      Cookies.set(COOKIE_NAMES.USER, JSON.stringify(limitedUser), { secure: true })
      // console.info('set the user')
    },
    setIsLoggedIn(state, loggedIn) {
      state.isLoggedIn = loggedIn
      // console.info('set logged in as: ' + loggedIn)
    }
  },
  actions: {
    addCharacterStat(state, payload) {
      const { charId, key, value, statRef } = payload

      return new Promise((resolve, reject) => {
        if (key === undefined || key === '' || value === undefined || value === '') {
          console.info('something is undefined')
          reject(false)
          return
        }

        this.state.user.characters[charId][statRef][key] = value
        const lang = {
          [key]: value
        }
        
        const userId = this.state.user.id
        rtdbFunctions.addCharacterStatByKey(userId, charId, statRef, lang)
        resolve(true)
      })
    },
    updateCharacterStat(state, payload) {
      console.info('payload:', payload)
      const { charId, key, value, statRef } = payload

      return new Promise((resolve, reject) => {
        if (key === undefined || key === '' || value === undefined || value === '') {
          console.info('something is undefined')
          reject(false)
          return
        }

        this.state.user.characters[charId][statRef][key] = value
        const lang = {
          [key]: value
        }
        
        const userId = this.state.user.id
        rtdbFunctions.addCharacterStatByKey(userId, charId, statRef, lang)
        resolve(true)
      })
    },
    deleteCharacterStat(state, payload) {
      const { charId, key, statRef } = payload

      return new Promise((resolve, reject) => {
        if (key === undefined || key === '') {
          console.info('something is undefined')
          reject(false)
          return
        }

        delete this.state.user.characters[charId][statRef][key]

        const userId = this.state.user.id
          rtdbFunctions.deleteCharacterStatByKey(userId, charId, statRef, key)
          resolve(true)
      })
    },
    deleteCharacterFromDb(state, charId) {
      const userId = this.state.user.id
      return new Promise((resolve, reject) => {
        rtdbFunctions.deleteCharacter(userId, charId).then((success) => {
          if (success) {
            this.commit('deleteCharacter', charId)
            resolve(true)
          }
        })
        .catch ((error) => {
          reject(error)
        })
      })
    },
    dbGetUsersCharacters() {
      rtdbFunctions.readAllCharacters(this.state.user.id).then((characters) => {
        console.info('characters:', characters)
      })
    },
    getUserInfo(state, uid) {
      // console.info('getUserInfo: ' + uid)
      return new Promise((resolve, reject) => {
        rtdbFunctions.readUserInDb(uid).then((user) => {
          this.commit('setUser', user)
          this.commit('setIsLoggedIn', true)

          resolve(true)
        })
        .catch ((error) => {
          this.commit('setUser', JSON.parse(Cookies.get(COOKIE_NAMES.USER))) // Get backup if any
          reject(error)
        })
      })
    },
  },
  getters: {
  // This is where you define functions to retrieve state variables in a modified form
    getUser(state) {
      return state.user
    },
    isLoggedIn(state) {
      return state.isLoggedIn
    },
    getUserCharacters(state) {
      return state.user.characters
    },
  }
})

export default store