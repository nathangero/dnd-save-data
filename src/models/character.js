import { STAT_KEYS } from "@/enums/dbKeys/stat-keys"
import Stat from "./stat"
import SavingThrows from "./saving-throws"
import Skill from "./skill"
import { SKILL_KEYS } from "@/enums/dbKeys/skill-keys"
import Hp from "./hp"
import { HP_KEYS } from "@/enums/dbKeys/hp-keys"

export default class Character {
    
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
    inspiration = 0,
    treasures = {},
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
    this.inspiration = inspiration
    this.treasures = treasures
  }

  static convertCharacterToObj(character) {
    let hp = new Hp(
      character.hp[HP_KEYS.CURRENT],
      character.hp[HP_KEYS.DIE],
      character.hp[HP_KEYS.DIE_AMOUNT_CURR],
      character.hp[HP_KEYS.DIE_AMOUNT_MAX],
      character.hp[HP_KEYS.MAX],
      character.hp[HP_KEYS.TEMP],

    )
    
    let stats = {
        [STAT_KEYS.STRENGTH]: new Stat(character.stats[STAT_KEYS.STRENGTH].value),
        [STAT_KEYS.DEXTERITY]: new Stat(character.stats[STAT_KEYS.DEXTERITY].value),
        [STAT_KEYS.CONSTITUTION]: new Stat(character.stats[STAT_KEYS.CONSTITUTION].value),
        [STAT_KEYS.INTELLIGENCE]: new Stat(character.stats[STAT_KEYS.INTELLIGENCE].value),
        [STAT_KEYS.WISDOM]: new Stat(character.stats[STAT_KEYS.WISDOM].value),
        [STAT_KEYS.CHARISMA]: new Stat(character.stats[STAT_KEYS.CHARISMA].value),
      }
    let savingThrows = {
        [STAT_KEYS.STRENGTH]: new SavingThrows(character.savingThrows[STAT_KEYS.STRENGTH].proficient),
        [STAT_KEYS.DEXTERITY]: new SavingThrows(character.savingThrows[STAT_KEYS.DEXTERITY].proficient),
        [STAT_KEYS.CONSTITUTION]: new SavingThrows(character.savingThrows[STAT_KEYS.CONSTITUTION].proficient),
        [STAT_KEYS.INTELLIGENCE]: new SavingThrows(character.savingThrows[STAT_KEYS.INTELLIGENCE].proficient),
        [STAT_KEYS.WISDOM]: new SavingThrows(character.savingThrows[STAT_KEYS.WISDOM].proficient),
        [STAT_KEYS.CHARISMA]: new SavingThrows(character.savingThrows[STAT_KEYS.CHARISMA].proficient),
    }

    let skills = {
        [SKILL_KEYS.ACROBATICS]: new Skill(character.skills[SKILL_KEYS.ACROBATICS].proficient),
        [SKILL_KEYS.ANIMAL_HANDLING]: new Skill(character.skills[SKILL_KEYS.ANIMAL_HANDLING].proficient),
        [SKILL_KEYS.ARCANA]: new Skill(character.skills[SKILL_KEYS.ARCANA].proficient),
        [SKILL_KEYS.ATHLETICS]: new Skill(character.skills[SKILL_KEYS.ATHLETICS].proficient),
        [SKILL_KEYS.DECEPTION]: new Skill(character.skills[SKILL_KEYS.DECEPTION].proficient),
        [SKILL_KEYS.HISTORY]: new Skill(character.skills[SKILL_KEYS.HISTORY].proficient),
        [SKILL_KEYS.INSIGHT]: new Skill(character.skills[SKILL_KEYS.INSIGHT].proficient),
        [SKILL_KEYS.INTIMIDATION]: new Skill(character.skills[SKILL_KEYS.INTIMIDATION].proficient),
        [SKILL_KEYS.INVESTIGATION]: new Skill(character.skills[SKILL_KEYS.INVESTIGATION].proficient),
        [SKILL_KEYS.MEDICINE]: new Skill(character.skills[SKILL_KEYS.MEDICINE].proficient),
        [SKILL_KEYS.NATURE]: new Skill(character.skills[SKILL_KEYS.NATURE].proficient),
        [SKILL_KEYS.PERCEPTION]: new Skill(character.skills[SKILL_KEYS.PERCEPTION].proficient),
        [SKILL_KEYS.PERFORMANCE]: new Skill(character.skills[SKILL_KEYS.PERFORMANCE].proficient),
        [SKILL_KEYS.PERSUASION]: new Skill(character.skills[SKILL_KEYS.PERSUASION].proficient),
        [SKILL_KEYS.RELIGION]: new Skill(character.skills[SKILL_KEYS.RELIGION].proficient),
        [SKILL_KEYS.SLEIGHT_OF_HAND]: new Skill(character.skills[SKILL_KEYS.SLEIGHT_OF_HAND].proficient),
        [SKILL_KEYS.STEALTH]: new Skill(character.skills[SKILL_KEYS.STEALTH].proficient),
        [SKILL_KEYS.SURVIVAL]: new Skill(character.skills[SKILL_KEYS.SURVIVAL].proficient),
    }

    let charObj = new Character(
      character.alignment,
      character.armor,
      character.background,
      character.class,
      character.deathSaves,
      character.equipment,
      character.featuresTraits,
      character.gold,
      hp,
      character.languages,
      character.level,
      character.name,
      character.proficiencies,
      character.race,
      savingThrows,
      skills,
      character.speed,
      character.spellCastStat,
      character.spells,
      character.spellSlots,
      stats,
      character.weapons,
      character.timeCreated,
      character.inspiration,
      character.treasures
    )

    return charObj
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

    const newCharacter =  new Character(
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