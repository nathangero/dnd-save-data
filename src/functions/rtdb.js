/**
 * This file will contain all the functions that read/write the database
 */
import { ref, set, get, child, push } from "firebase/database"
import { db } from "@/firebase.js"
import User from "@/models/user"
import DB_PATHS from "@/enums/db-paths"

export async function writeUserInDb(uid, name, email) {
    const dbRef = 'users/' + uid
    const values = {
        name: name,
        email: email,
        timeRegistered: new Date().getTime()
    }

    return new Promise((resolve, reject) => {
        set(ref(db, dbRef), values).then((success) => {
            console.info('wrote new user in db')
            resolve(success)
        })
        .catch ((error) => {
            reject(error)
        })
    })
}


export async function readUserInDb(uid) {
    const dbRef = 'users/' + uid

    return new Promise((resolve, reject) => {
        get(child(ref(db), dbRef)).then((snapshot) => {
            if (snapshot.exists()) {
                var data = snapshot.val()
                data["id"] = snapshot.key
                const user = User.fromSnapshot(data)
                
                resolve(user)
            } else {
                console.info("No user found with uid: \"" + uid + "\"")
                resolve(null)
            }
        }).catch((error) => {
            console.error(error)
            reject(error)
        })
    })
    
}


export async function createNewCharacter(userId, characterInfo) {
    var dbRef = DB_PATHS.USERS + userId + '/' + DB_PATHS.CHARACTERS
    return new Promise((resolve, reject) => {
        const newKey = push(ref(db, dbRef)).key
        dbRef += newKey
        set(ref(db, dbRef), characterInfo).then(() => {
            // console.info(`created a new character for user: ${userId}`)
            resolve(true)
        })
        .catch ((error => {
            console.error(error)
            reject(false)
        }))
    })
}

export async function readAllCharacters(userId) {
    var dbRef = DB_PATHS.USERS + userId + '/' + DB_PATHS.CHARACTERS
    return new Promise((resolve, reject) => {
        get(child(ref(db), dbRef)).then(() => {
            
            resolve(true)
        })
        .catch ((error => {
            console.error(error)
            reject(false)
        }))
    })
}

// export async function readSpecificCharacter(userId, charId) {

// }
