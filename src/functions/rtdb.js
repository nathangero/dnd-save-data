/**
 * This file will contain all the functions that read/write the database
 */
import { ref, set, get, child, push, remove, update } from "firebase/database"
import { db } from "@/firebase.js"
import User from "@/models/user"
import DB_PATHS from "@/enums/db-paths"
import { CHARACTER_KEYS } from "@/enums/dbKeys/character-keys"


// READ/WRITE USER
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


export async function getUserInDb(uid) {
    const dbRef = 'users/' + uid

    return new Promise((resolve, reject) => {
        get(child(ref(db), dbRef)).then((snapshot) => {
            if (snapshot.exists()) {
                var data = snapshot.val()
                data["id"] = snapshot.key
                const user = User.fromSnapshot(data)
                
                // console.info('user:', user)
                
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


// CREATE, DELETE, READ CHARACTER

export async function createNewCharacter(userId, characterInfo) {
    var dbRef = DB_PATHS.USERS + userId + '/' + DB_PATHS.CHARACTERS
    return new Promise((resolve, reject) => {
        const newKey = push(ref(db, dbRef)).key
        dbRef += newKey
        set(ref(db, dbRef), characterInfo).then(() => {
            // console.info(`created a new character for user: ${userId}`)

            createCharacterBackup(userId, newKey, characterInfo)
            resolve(true, newKey)
        })
        .catch ((error => {
            console.error(error)
            reject(false, '')
        }))
    })
}


export async function createCharacterBackup(userId, charId, characterInfo) {
    var dbRef = DB_PATHS.USERS + userId + '/' + DB_PATHS.CHAR_PAST_DATA + charId + '/'
    return new Promise((resolve, reject) => {
        const newKey = characterInfo[CHARACTER_KEYS.TIME_CREATED]
        dbRef += newKey
        set(ref(db, dbRef), characterInfo).then(() => {
            // console.info(`created a new character for user: ${userId}`)
            resolve(true, newKey)
        })
        .catch ((error => {
            console.error(error)
            reject(false, '')
        }))
    })
}


export async function getCharacterBackups(userId, charId) {
    var dbRef = DB_PATHS.USERS + userId + '/' + DB_PATHS.CHAR_PAST_DATA + charId

    return new Promise((resolve, reject) => {
        get(child(ref(db), dbRef), {
            orderByKey: true,
            limitToLast: 5
        }).then((snapshot) => {
            if (snapshot.exists()) {
                var backups = snapshot.val()
                resolve(backups)
            } else {
                console.info(`No backups found for character: ${charId}`)
                resolve(null)
            }
        }).catch((error) => {
            console.error(error)
            reject(error)
        })
    })
}


export async function deleteCharacterBackup(userId, charId, timestamp) {
    var dbRef = DB_PATHS.USERS + userId + '/' + DB_PATHS.CHAR_PAST_DATA + charId + '/' + timestamp
    return new Promise((resolve, reject) => {
        remove(ref(db, dbRef)).then(() => {
            resolve(true)
        })
        .catch ((error => {
            console.error(error)
            reject(false)
        }))
    })
}


export async function deleteCharacter(userId, charId) {
    var dbRef = DB_PATHS.USERS + userId + '/' + DB_PATHS.CHARACTERS + charId
    return new Promise((resolve, reject) => {
        remove(ref(db, dbRef)).then(() => {
            resolve(true)
        })
        .catch ((error => {
            console.error(error)
            reject(false)
        }))
    })
}


export async function getAllCharacters(userId) {
    var dbRef = DB_PATHS.USERS + userId + '/' + DB_PATHS.CHARACTERS
    return new Promise((resolve, reject) => {
        get(child(ref(db), dbRef)).then((snapshot) => {
            console.info('snapshot:', JSON.stringify(snapshot))
            resolve(true)
        })
        .catch ((error => {
            console.error(error)
            reject(false)
        }))
    })
}


// ADD, DELETE CHARACTER STAT

/**
 * Adds a stat under the user's character's id.
 * E.G. dbRef = "/users/userId/characters/charId/statRef/keyToDelete"
 *      If user is adding a language, it could be like this "/users/userId/characters/charId/languages/"
 * @param {String} userId User's uid
 * @param {String} charId User's Character uid
 * @param {String} statRef Stat name where the deletion will occur
 * @param {Dict} itemToAdd Dictionary containing the info to be added
 * @returns 
 */
export async function addCharacterStatByKey(userId, charId, statRef, itemToAdd) {
    var dbRef = DB_PATHS.USERS + userId + '/' + DB_PATHS.CHARACTERS + charId + '/' + statRef + '/' 
    return new Promise((resolve, reject) => {
        update(ref(db, dbRef), itemToAdd).then(() => {
            // console.info(`created a new character for user: ${userId}`)
            resolve(true)
        })
        .catch ((error => {
            console.error(error)
            reject(false)
        }))
    })
}

/**
 * Updates a character info value under the user's character's id.
 * E.G. dbRef = "/users/userId/characters/charId/" where the value for armor will be changed
 * @param {String} userId User's uid
 * @param {String} charId User's Character uid
 * @param {Dict} itemToAdd Dictionary containing the info to be updated
 * @returns 
 */
export async function updateCharacterInfoByKey(userId, charId, itemToAdd) {
    // console.info('itemToAdd:', itemToAdd)
    var dbRef = DB_PATHS.USERS + userId + '/' + DB_PATHS.CHARACTERS + charId
    return new Promise((resolve, reject) => {
        update(ref(db, dbRef), itemToAdd).then(() => {
            // console.info(`created a new character for user: ${userId}`)
            resolve(true)
        })
        .catch ((error => {
            console.error(error)
            reject(false)
        }))
    })
}

/**
 * Deletes a stat under the user's character's id.
 * E.G. dbRef = "/users/userId/characters/charId/statRef/keyToDelete"
 *      If user is deleting a language, it could be like this "/users/userId/characters/charId/languages/languageName"
 * @param {String} userId User's uid
 * @param {String} charId User's Character uid
 * @param {String} statRef Stat name where the deletion will occur
 * @param {String} keyToDelete Name in the stat list that will be deleted
 * @returns 
 */
export async function deleteCharacterStatByKey(userId, charId, statRef, keyToDelete) {
    var dbRef = DB_PATHS.USERS + userId + '/' + DB_PATHS.CHARACTERS + charId + '/' + statRef + '/' + keyToDelete 
    return new Promise((resolve, reject) => {
        remove(ref(db, dbRef)).then(() => {
            resolve(true)
        })
        .catch ((error => {
            console.error(error)
            reject(false)
        }))
    })
}
