import { createStore } from 'vuex'
import User from './models/user'
import { auth } from '@/firebase'
import * as rtdbFunctions from './functions/rtdb'
import Cookies from 'js-cookie';
import COOKIE_NAMES from '@/enums/cookie-names'

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
        const itemToAdd = {
          [key]: value
        }
        
        const userId = this.state.user.id
        rtdbFunctions.addCharacterStatByKey(userId, charId, statRef, itemToAdd)
        resolve(true)
      })
    },
    addCharacterSpell(state, payload) {
      const { charId, levelKey, spellName, newSpell, newEntry, statRef } = payload
      // console.info('payload:', payload)

      return new Promise((resolve, reject) => {
        if (levelKey === undefined || levelKey === '' || spellName === undefined || spellName === '' || newEntry === undefined || newEntry === '') {
          console.info('something is undefined')
          reject(false)
          return
        }

        if (levelKey in this.state.user.characters[charId][statRef]) {
          // If there's a level key already in the dictionary. Prevents overwritting the whole level of spells
          this.state.user.characters[charId][statRef][levelKey][spellName] = newSpell
        } else {
          // If there's a new entry for the level key. 
          this.state.user.characters[charId][statRef][levelKey] = newEntry
        }  
        
        const itemToAdd = {
          [spellName]: newSpell
        }

        const spellRef = statRef + '/' + levelKey
        
        const userId = this.state.user.id
        rtdbFunctions.addCharacterStatByKey(userId, charId, spellRef, itemToAdd)
        resolve(true)
      })      
    },
    updateCharacterInfo(state, payload) {
      const { charId, info} = payload      

      return new Promise((resolve, reject) => {
        const userId = this.state.user.id
        rtdbFunctions.updateCharacterInfoByKey(userId, charId, info).then((success) => {
          if (success) {
            resolve(true)
          } else {
            reject(false)
          }
        })
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
    updateCharacterSpell(state, payload) {
      const { charId, levelKey, spellName, updatedSpell, statRef } = payload
      // console.info('payload:', payload)

      return new Promise((resolve, reject) => {
        if (levelKey === undefined || levelKey === '' || spellName === undefined || spellName === '' || updatedSpell === undefined || updatedSpell === '') {
          console.info('something is undefined')
          reject(false)
          return
        }

        this.state.user.characters[charId][statRef][levelKey][spellName] = updatedSpell
        
        const itemToAdd = {
          [spellName]: updatedSpell
        }

        const spellRef = statRef + '/' + levelKey
        
        const userId = this.state.user.id
        rtdbFunctions.addCharacterStatByKey(userId, charId, spellRef, itemToAdd)
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
    deleteCharacterSpell(state, payload) {
      const { charId, levelKey, spellName, statRef } = payload
      console.info('payload:', payload)

      return new Promise((resolve, reject) => {
        if (levelKey === undefined || levelKey === '' || spellName === undefined || spellName === '') {
          console.info('something is undefined')
          reject(false)
          return
        }

        delete this.state.user.characters[charId][statRef][levelKey][spellName]

        const spellRef = statRef + '/' + levelKey
        
        const userId = this.state.user.id
        rtdbFunctions.deleteCharacterStatByKey(userId, charId, spellRef, spellName)
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