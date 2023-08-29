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
    languages = {},
    level = 1,
    name = '',
    proficiencies = {},
    race = '',
    savingThrows = {},
    skills = {},
    speed = '',
    spellCastStat = '',
    spells = {},
    spellSlots = {},
    stats = {},
    weapons = {},
    timeCreated = '',
  ) {
    this.alignment = alignment
    this.armor = armor
    this.background = background
    this.class = charClass
    this.deathSaves = deathSaves
    this.equipment = equipment
    this.featuresTraits = featuresTraits
    this.gold = gold
    this.hp = hp
    this.languages = languages
    this.level = level
    this.name = name
    this.proficiencies = proficiencies
    this.race = race
    this.savingThrows = savingThrows
    this.skills = skills
    this.speed = speed
    this.spellCastStat = spellCastStat
    this.spells = spells
    this.spellSlots = spellSlots
    this.stats = stats
    this.weapons = weapons

    this.timeCreated = timeCreated
  }


  static fromSnapshot(snapshot) {
    const {
      alignment,
      armor,
      background,
      charClass,
      deathSaves,
      equipment,
      featuresTraits,
      gold,
      hp,
      languages,
      level,
      name,
      proficiencies,
      race,
      savingThrows,
      skills,
      speed,
      spellCastStat,
      spells,
      spellSlots,
      stats,
      weapons,
      timeCreated,
    } = snapshot

    const newCharacter =  new Charcter(
      alignment,
      armor,
      background,
      charClass,
      deathSaves,
      equipment,
      featuresTraits,
      gold,
      hp,
      languages,
      level,
      name,
      proficiencies,
      race,
      savingThrows,
      skills,
      speed,
      spellCastStat,
      spells,
      spellSlots,
      stats,
      weapons,
      timeCreated,
    )
    
    return newCharacter
  }

}