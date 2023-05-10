import { createStore } from 'vuex'
import firebase from 'firebase/compat/app';

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
        signupUser({ commit }, payload) {
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
              .then(response => {
                const newUser = {
                  id: response.user.uid,
                  email: response.user.email,
                  
                };
                commit('setUser', newUser);
                commit('setIsLoggedIn', true);
              })
              .catch(error => {
                console.log(error);
              });
          },
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