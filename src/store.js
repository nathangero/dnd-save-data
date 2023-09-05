import { createStore } from 'vuex'
import User from './models/user'
import { auth } from '@/firebase'
import * as rtdbFunctions from './functions/rtdb'
import Cookies from 'js-cookie';
import COOKIE_NAMES from '@/enums/cookie-names'
import { CHARACTER_KEYS } from './enums/dbKeys/character-keys';
import DEBUG_CHARACTER_BACKUPS from '@/debug/debugCharacterBackups';

const store = createStore({
  state: {
    user: new User(),
    charBackups: {},
    debugBackups: DEBUG_CHARACTER_BACKUPS
  },
  mutations: {
    addCharacterLocally(state, payload) {
      // console.info('@addCharacter')
      const { charId, characterToAdd } = payload
      
      if (state.user.characters) {
        // If dictionary already exists, just add to it
        state.user.characters[charId] = characterToAdd
      } else {
        // If dicitonary doesn't exist, create it
        const newCharacter = {
          [charId]: characterToAdd
        }
        state.user.characters = newCharacter
      }
    },
    deleteCharacterLocally(state, charId) {
      delete state.user.characters[charId]
    },
    addCharacterBackupLocally(state, payload) {
      const { charId, timestamp, backup } = payload
      if (state.charBackups[charId]) {
        // If dictionary already exists, just add to it
        state.charBackups[charId][timestamp] = backup
      } else {
        // If dicitonary doesn't exist, create it
        const newCharacter = {
          [charId]: {
            [timestamp]: backup
          }
        }
        state.charBackups = newCharacter
      }
    },
    deleteCharacterBackupLocally(state, payload) {
      const { charId, timestamp } = payload
      delete state.user.charBackups[charId][timestamp]
    },
    signOut(state) {
      state.user = new User()

      Cookies.remove(COOKIE_NAMES.USER)
      auth.signOut()
    },
    setUser(state, user) {
      state.user = user
      const limitedUser = User.getUserForCookie(user)

      const days = 7; // TODO: Make controlled by Remote Config
      const secondsInDay = 24 * 60 * 60;
      const expirationSeconds = days * secondsInDay;
      Cookies.set(COOKIE_NAMES.USER, JSON.stringify(limitedUser), { expires: expirationSeconds, secure: true })
      // console.info('set the user')
    },
    setCharBackups(state, backups) {
      state.charBackups = backups // Always overwrite the backups for a character
      // console.info('state.charBackups:', state.charBackups)
    }
  },
  actions: {
    addCharacterStat(state, payload) {
      // console.info('@addCharacterStat')
      
      const { charId, key, value, statRef } = payload

      return new Promise((resolve, reject) => {
        if (key === undefined || key === '' || value === undefined || value === '') {
          console.info('something is undefined')
          reject(false)
          return
        }
        
        const itemToAdd = {
          [key]: value
        }

        if (this.state.user.characters[charId][statRef]) {
          // console.info(`adding to ${statRef}`)
          // Add to dict
          this.state.user.characters[charId][statRef][key] = value
        } else {
          // console.info(`creating ${statRef}`)
          // Make the dict
          this.state.user.characters[charId][statRef] = itemToAdd
        }
        
        const userId = this.state.user.id
        rtdbFunctions.addCharacterStatByKey(userId, charId, statRef, itemToAdd).then((success) => {
          if (success) {
            // console.info('success')
            resolve(true)
          } else {
            // console.info('failure')
            reject(false)
          }
        })
        .catch((error) => {
          console.error(error)
          reject(false)
        })
      })
    },
    addCharacterSpell(state, payload) {
      const { charId, levelKey, spellName, newSpell, newEntry, statRef } = payload
      console.info('payload:', payload)

      return new Promise((resolve, reject) => {
        if (levelKey === undefined || levelKey === '' || spellName === undefined || spellName === '' || newEntry === undefined || newEntry === '') {
          console.info('something is undefined')
          reject(false)
          return
        }

        if (!(statRef in this.state.user.characters[charId])) { // check if spells exist for character
          let levelDict = { [levelKey]: newEntry}
          this.state.user.characters[charId][statRef] = levelDict
          
        } else {
          if (levelKey in this.state.user.characters[charId][statRef]) {
            // If there's a level key already in the dictionary. Prevents overwritting the whole level of spells
            this.state.user.characters[charId][statRef][levelKey][spellName] = newSpell
          } else {
            // If there's a new entry for the level key. 
            this.state.user.characters[charId][statRef][levelKey] = newEntry
          }   
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
      // console.info('@updateCharacterInfo')
      
      const { charId, info } = payload    

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
    updateCharacterAbilityScores(state, payload) {
      // console.info('payload:', payload)
      const { charId, scores, } = payload      

      return new Promise((resolve, reject) => {
        if (scores === undefined || scores === '') {
          console.info('something is undefined')
          reject(false)
          return
        }

        this.state.user.characters[charId][CHARACTER_KEYS.SCORES] = scores // Update all the scores
        
        // Update all the scores with numbers since they're all connected from ability scores
        const userId = this.state.user.id
        rtdbFunctions.addCharacterStatByKey(userId, charId, CHARACTER_KEYS.SCORES, scores)
        resolve(true)
      })
      
    },
    updateCharacterStat(state, payload) {
      // console.info('payload:', payload)
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
      // console.info('payload:', payload)

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
    addCharacterToDb(state, newCharacter) {
      const userId = this.state.user.id
      return new Promise((resolve, reject) => {
        rtdbFunctions.createNewCharacter(userId, newCharacter).then((payload) => {
          const { success, newCharId } = payload
          if (success && newCharId !== '') {
            const payload = {
              charId: newCharId,
              characterToAdd: newCharacter
            }
            this.commit('addCharacterLocally', payload)
            resolve(true)
          }
        })
        .catch ((error) => {
          reject(error)
        })
      })
    },
    addBackupToDb(state, payload) {
      const { charId, characterInfo } = payload
      const userId = this.state.user.id
      const timestamp = new Date().getTime()
      return new Promise((resolve, reject) => {
        rtdbFunctions.createCharacterBackup(userId, charId, characterInfo, timestamp).then((success) => {
          if (success) {
            resolve(true)
          }
        })
        .catch ((error) => {
          reject(error)
        })
      })
    },
    deleteBackupFromDb(state, payload) {
      const { charId, timestamp } = payload

      const userId = this.state.user.id
      return new Promise((resolve, reject) => {
        rtdbFunctions.deleteCharacterBackup(userId, charId, timestamp).then((success) => {
          if (success) {
            resolve(true)
          } else {
            reject(false)
          }
        })
        .catch((error) => {
          console.error(error)
          reject(false)
        })
      })
    },
    overwriteCharacterFromBackup(state, payload) {
      const { charId, characterBackup } = payload

      const userId = this.state.user.id
      return new Promise((resolve, reject) => {
        rtdbFunctions.overwriteCharacterFromBackup(userId, charId, characterBackup).then((success) => {
          if (success) {
            this.state.user.characters[charId] = characterBackup // Overwrite locally
            resolve(true, characterBackup)
          } else {
            reject(false)
          }
        })
        .catch((error) => {
          console.error(error)
          reject(false)
        })
      })
    },
    deleteCharacterFromDb(state, charId) {
      const userId = this.state.user.id
      return new Promise((resolve, reject) => {
        rtdbFunctions.deleteCharacter(userId, charId).then((success) => {
          if (success) {
            this.commit('deleteCharacterLocally', charId)
            resolve(true)
          }
        })
        .catch ((error) => {
          reject(error)
        })
      })
    },
    dbGetCharacterBackups(state, charId) {
      const userId = this.state.user.id
      
      return new Promise((resolve, reject) => {
        rtdbFunctions.getCharacterBackups(userId, charId).then((backups) => {
          // console.info('backups:', backups)
          if (backups) {
            const payload = {
              [charId]: backups
            }
            this.commit('setCharBackups', payload)
            resolve(true)
          } else {
            reject(false)
          }
        })
        .catch((error) => {
          reject(error)
        })
      })
    },
    dbGetUsersCharacters() {
      rtdbFunctions.getAllCharacters(this.state.user.id).then((characters) => {
        console.info('characters:', characters)
      })
    },
    getUserInfo(state, uid) {
      // console.info('getUserInfo: ' + uid)
      return new Promise((resolve, reject) => {
        rtdbFunctions.getUserInDb(uid).then((user) => {
          this.commit('setUser', user)

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
    getUserCharacters(state) {
      return state.user.characters
    },
    getCharacterBackups(state) {
      return state.charBackups
    },
    debugGetBackups(state) {
      return state.debugBackups
    }
  }
})

export default store