export default class User {
    constructor(id = '', name = '', email = '') {
        this.id = id
        this.name = name
        this.email = email
    }


    static fromSnapshot(snapshot) {
        const { id, name, email } = snapshot
        const newUser =  new User(id, name, email)
        
        return newUser
    }

    getName() {
        return this.name
    }

    static getUserForCookie(user) {
        return {
            id: user.id,
            name: user.name,
            // characters: user.characters,
            // sessions: user.sessions
        }
    }
}