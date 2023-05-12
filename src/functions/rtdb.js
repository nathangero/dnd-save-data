/**
 * This file will contain all the functions that read/write the database
 */
import { ref, set, get, child } from "firebase/database"
import { db } from "@/firebase.js"
import User from "@/models/user"
// import { error } from "jquery"

export async function writeUserInDb(user, name) {
    const uid = user.uid
    const email = user.email

    const dbRef = 'users/' + uid
    const values = {
        name: name,
        email: email,
    }
    set(ref(db, dbRef), values)
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
