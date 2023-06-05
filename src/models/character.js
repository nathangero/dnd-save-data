export default class Charcter {
    
    constructor(
        alignment = '',
        background = '',
        charClass = '',
        deathSaves = {},
        equipment = {},
        featuresTraits = {},
        hp = {},
        initiative = 1,
        languages = {},
        level = 1,
        name = '',
        stats = {},
        savingThrows = {},
        race = '',
    ) {
        
    }


    // static fromSnapshot(snapshot) {
    //     const { id, name, email } = snapshot
    //     const newUser =  new User(id, name, email)
        
    //     return newUser
    // }

    // getName() {
    //     return this.name
    // }

    // static getUserForCookie(user) {
    //     return {
    //         id: user.id,
    //         name: user.name,
    //         // characters: user.characters,
    //         // sessions: user.sessions
    //     }
    // }
}