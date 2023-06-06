import { createStore } from 'vuex'
import User from './models/user'
import { auth } from '@/firebase'
import { readUserInDb } from './functions/rtdb'
import Cookies from 'js-cookie';
import COOKIE_NAMES from '@/enums/cookie-names'

const store = createStore({
    state: {
        user: new User(),
        isLoggedIn: false,
    },
    mutations: {
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
        getUserInfo(state, uid) {
            // console.info('getUserInfo: ' + uid)
            return new Promise((resolve, reject) => {
                readUserInDb(uid).then((user) => {
                    this.commit('setUser', user)
                    this.commit('setIsLoggedIn', true)
                    
                    resolve(true)
                })
                .catch ((error) => {
                    this.commit('setUser', JSON.parse(Cookies.get(COOKIE_NAMES.USER))) // Get backup if any
                    reject(error)
                })
            })
        }
    },
    getters: {
        // This is where you define functions to retrieve state variables in a modified form
        getUser(state) {
            return state.user
        },
        isLoggedIn(state) {
          return state.isLoggedIn
        },
        
    }
})

export default store