import { createStore } from 'vuex'
// import firebase from 'firebase/compat/app';

const store = createStore({
    state: {
        user: null,
        isLoggedIn: false,
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setIsLoggedIn(state, loggedIn) {
            state.isLoggedIn = loggedIn
        }
    },
    actions: {
        
    },
    getters: {
        // This is where you define functions to retrieve state variables in a modified form
        getUser(state) {
            return state.user
        },
        isLoggedIn(state) {
          return state.isLoggedIn;
        },
        
    }
})

export default store