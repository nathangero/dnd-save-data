export default class Charcter {
    
    constructor(
        alignment = '',
        armor = '',
        background = '',
        charClass = '',
        deathSaves = {},
        equipment = {},
        featuresTraits = {},
        gold = '',
        hp = {},
        initiative = 1,
        languages = {},
        level = 1,
        name = '',
        skills = {},
        stats = {},
        savingThrows = {},
        race = '',
    ) {
        this.alignment = alignment
        this.armor = armor
        this.background = background
        this.charClass = charClass
        this.deathSaves = deathSaves
        this.equipment = equipment
        this.featuresTraits = featuresTraits
        this.gold = gold
        this.hp = hp
        this.initiative = initiative
        this.languages = languages
        this.level = level
        this.name = name
        this.skills = skills
        this.stats = stats
        this.savingThrows = savingThrows
        this.race = race
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