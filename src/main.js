import { createApp } from 'vue'
import App from './App.vue'
import store from './store';
import router from './router';
import { auth } from './firebase'
import Cookies from 'js-cookie';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import { ROUTER_NAMES } from './enums/router-names';
import { COOKIE_NAMES } from './enums/cookie-names';

// const app = createApp(App)
// app.use(store)
// app.use(router)

// app.mount('#app')

let app;

// Listen to the Firebase Auth state changes

auth.onAuthStateChanged(() => {
  // Check if the user is authenticated
  const isAuthenticated = auth.currentUser !== null;
//   console.info('is user authenticated? ' + isAuthenticated)

  if (!app) {
    // Create the app only if it hasn't been created yet
    app = createApp(App)
      .use(store)
      .use(router)
      .mount('#app')
  }

  if (!isAuthenticated && router.currentRoute.value.name !== ROUTER_NAMES.LOGIN) {
    // Redirect to the login page if the user is not authenticated
    router.push({ name: ROUTER_NAMES.LOGIN })
  } else {
    router.push({ name: ROUTER_NAMES.DASHBOARD }); // If user is already authenticated then go to dashboard
    try {
      const user = JSON.parse(Cookies.get(COOKIE_NAMES.USER))
      if (user.id !== '') {
        const uid = auth.currentUser.uid
        store.dispatch('getUserInfo', uid)
      }
    } catch (error) {
      console.info('signed out')
    }
  }
});