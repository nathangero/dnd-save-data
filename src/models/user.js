export default class User {
    constructor(id = '', name = '', email = '', characters) {
        this.id = id
        this.name = name
        this.email = email
        this.characters = characters
    }


    static fromSnapshot(snapshot) {
        const { id, name, email, characters } = snapshot
        const newUser =  new User(id, name, email, characters)
        
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