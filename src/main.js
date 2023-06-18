import { createApp } from 'vue'
import App from './App.vue'
import store from './store';
import router from './router';
import { auth } from './firebase'
import Cookies from 'js-cookie';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import ROUTER_NAMES from './enums/router-names';
import COOKIE_NAMES from './enums/cookie-names';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

let app;
library.add(faChevronDown, faChevronUp)

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
      .component('font-awesome-icon', FontAwesomeIcon)
      .mount('#app')
  }

  if (!isAuthenticated && router.currentRoute.value.name !== ROUTER_NAMES.LOGIN) {
    // Redirect to the login page if the user is not authenticated
    // alert("You've been logged out")
    router.push({ name: ROUTER_NAMES.LOGIN })
  } else if (isAuthenticated && router.currentRoute.value.name !== ROUTER_NAMES.LOGIN) {
    try {
      const user = JSON.parse(Cookies.get(COOKIE_NAMES.USER))
      if (user.id !== '') {
        // alert('cookie says your id is still saved')
        router.push({ name: ROUTER_NAMES.DASHBOARD }); // If user is already authenticated then go to dashboard
        const uid = auth.currentUser.uid
        store.dispatch('getUserInfo', uid)
      }
    } catch (error) {
      if (auth.currentUser.uid !== '') {
        // alert('no id in cookie but from firebase auth')
        router.push({ name: ROUTER_NAMES.DASHBOARD }); // If user is already authenticated then go to dashboard
        const uid = auth.currentUser.uid
        store.dispatch('getUserInfo', uid)

      } else {
        alert(`error with authentication: ${error}`)
      }
    }
  }
});