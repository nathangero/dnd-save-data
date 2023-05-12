// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyD1lc6g0OpXZYHy43nBkiASe5GuuajXWSo",
  authDomain: "dnd-save-data.firebaseapp.com",
  databaseURL: "https://dnd-save-data-default-rtdb.firebaseio.com",
  projectId: "dnd-save-data",
  storageBucket: "dnd-save-data.appspot.com",
  messagingSenderId: "316522076002",
  appId: "1:316522076002:web:1f24fcc705ca6167a13e3b",
  measurementId: "G-KZPQFE72WE"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
const db = getDatabase(app)
const auth = getAuth(app)

export { app, db, auth }