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
    proficiencies = {},
    proficiencyBonus = '',
    race = '',
    savingThrows = {},
    skills = {},
    speed = '',
    spellCastStat = '',
    spellSaveDc = '',
    spells = {},
    stats = {},
    weapons = {},
    timeRegistered = '',
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
    this.initiative = initiative
    this.languages = languages
    this.level = level
    this.name = name
    this.proficiencies = proficiencies
    this.proficiencyBonus = proficiencyBonus
    this.race = race
    this.savingThrows = savingThrows
    this.skills = skills
    this.speed = speed
    this.spellCastStat = spellCastStat
    this.spellSaveDc = spellSaveDc
    this.spells = spells
    this.stats = stats
    this.weapons = weapons

    this.timeRegistered = timeRegistered
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
      initiative,
      languages,
      level,
      name,
      proficiencies,
      proficiencyBonus,
      race,
      savingThrows,
      skills,
      speed,
      spellCastStat,
      spellSaveDc,
      spells,
      stats,
      weapons,
      timeRegistered,
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
      initiative,
      languages,
      level,
      name,
      proficiencies,
      proficiencyBonus,
      race,
      savingThrows,
      skills,
      speed,
      spellCastStat,
      spellSaveDc,
      spells,
      stats,
      weapons,
      timeRegistered,
    )
    
    return newCharacter
  }

}