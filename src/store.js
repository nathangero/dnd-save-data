import { createStore } from 'vuex'
import User from './models/user'
import { auth } from '@/firebase'
import * as rtdbFunctions from './functions/rtdb'
import Cookies from 'js-cookie';
import COOKIE_NAMES from '@/enums/cookie-names'
import { CHARACTER_KEYS } from './enums/dbKeys/character-keys';

const store = createStore({
  state: {
    user: new User(),
    charBackups: {},
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
          console.info(`adding to ${statRef}`)
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
      // console.info('payload:', payload)
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
    updateCharacterBaseStats(state, payload) {
      // console.info('payload:', payload)
      const { charId, stats, savingThrows, skills, initiative, passivePerception} = payload      

      return new Promise((resolve, reject) => {
        if (stats === undefined || stats === '' || savingThrows === undefined || savingThrows === '' || skills === undefined || skills === '') {
          console.info('something is undefined')
          reject(false)
          return
        }

        this.state.user.characters[charId][CHARACTER_KEYS.STATS] = stats // Update all the stats
        this.state.user.characters[charId][CHARACTER_KEYS.SAVING_THROWS] = savingThrows // Update all the saving Throws
        this.state.user.characters[charId][CHARACTER_KEYS.SKILLS] = skills // Update all the skills
        this.state.user.characters[charId][CHARACTER_KEYS.INITIATIVE] = initiative
        this.state.user.characters[charId][CHARACTER_KEYS.PASSIVE_PERCEPTION] = passivePerception

        const misc = {
          [CHARACTER_KEYS.INITIATIVE]: initiative,
          [CHARACTER_KEYS.PASSIVE_PERCEPTION]: passivePerception
        }
        
        // Update all the stats with numbers since they're all connected from base stats
        const userId = this.state.user.id
        rtdbFunctions.addCharacterStatByKey(userId, charId, CHARACTER_KEYS.STATS, stats)
        rtdbFunctions.addCharacterStatByKey(userId, charId, CHARACTER_KEYS.SAVING_THROWS, savingThrows)
        rtdbFunctions.addCharacterStatByKey(userId, charId, CHARACTER_KEYS.SKILLS, skills)
        rtdbFunctions.updateCharacterInfoByKey(userId, charId, misc)
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
    addCharacterToDb(state, newCharacter) {
      const userId = this.state.user.id
      return new Promise((resolve, reject) => {
        rtdbFunctions.createNewCharacter(userId, newCharacter).then((success, newCharId) => {
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
    } 
  }
})

export default store