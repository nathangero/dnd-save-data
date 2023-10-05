import { STAT_KEYS } from "@/enums/dbKeys/stat-keys"
import Stat from "./stat"
import SavingThrows from "./saving-throws"
import Skill from "./skill"
import { SKILL_KEYS } from "@/enums/dbKeys/skill-keys"
import Hp from "./hp"
import { HP_KEYS } from "@/enums/dbKeys/hp-keys"
import { DEATH_SAVES_KEYS } from "@/enums/dbKeys/death-saves-keys"

export default class Character {
    
  constructor(
    alignment = '',
    armor = '',
    background = '',
    charClass = '',
    deathSaves = {
      [DEATH_SAVES_KEYS.SUCCESSES]: 0, 
      [DEATH_SAVES_KEYS.FAILURES]: 0
    },
    equipment = {},
    featuresTraits = {},
    gold = '',
    hp = {
      [HP_KEYS.CURRENT]: '',
      [HP_KEYS.DIE]: '',
      [HP_KEYS.DIE_AMOUNT_MAX]: '',
      [HP_KEYS.DIE_AMOUNT_CURR]: '',
      [HP_KEYS.MAX]: '',
      [HP_KEYS.TEMP]: '',
    },
    languages = {},
    level = '',
    name = '',
    proficiencies = {},
    race = '',
    savingThrows = {
      [STAT_KEYS.STRENGTH]: new SavingThrows(),
      [STAT_KEYS.DEXTERITY]: new SavingThrows(),
      [STAT_KEYS.CONSTITUTION]: new SavingThrows(),
      [STAT_KEYS.INTELLIGENCE]: new SavingThrows(),
      [STAT_KEYS.WISDOM]: new SavingThrows(),
      [STAT_KEYS.CHARISMA]: new SavingThrows(),
    },
    skills = {
      [SKILL_KEYS.ACROBATICS]: new Skill(),
      [SKILL_KEYS.ANIMAL_HANDLING]: new Skill(),
      [SKILL_KEYS.ARCANA]: new Skill(),
      [SKILL_KEYS.ATHLETICS]: new Skill(),
      [SKILL_KEYS.DECEPTION]: new Skill(),
      [SKILL_KEYS.HISTORY]: new Skill(),
      [SKILL_KEYS.INSIGHT]: new Skill(),
      [SKILL_KEYS.INTIMIDATION]: new Skill(),
      [SKILL_KEYS.INVESTIGATION]: new Skill(),
      [SKILL_KEYS.MEDICINE]: new Skill(),
      [SKILL_KEYS.NATURE]: new Skill(),
      [SKILL_KEYS.PERCEPTION]: new Skill(),
      [SKILL_KEYS.PERFORMANCE]: new Skill(),
      [SKILL_KEYS.PERSUASION]: new Skill(),
      [SKILL_KEYS.RELIGION]: new Skill(),
      [SKILL_KEYS.SLEIGHT_OF_HAND]: new Skill(),
      [SKILL_KEYS.STEALTH]: new Skill(),
      [SKILL_KEYS.SURVIVAL]: new Skill(),
    },
    speed = '',
    spellCastStat = '',
    spells = {},
    spellSlots = {},
    scores = {
      [STAT_KEYS.STRENGTH]: new Stat(),
      [STAT_KEYS.DEXTERITY]: new Stat(),
      [STAT_KEYS.CONSTITUTION]: new Stat(),
      [STAT_KEYS.INTELLIGENCE]: new Stat(),
      [STAT_KEYS.WISDOM]: new Stat(),
      [STAT_KEYS.CHARISMA]: new Stat(),
    },
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
    this.scores = scores
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
    
    let scores = {
        [STAT_KEYS.STRENGTH]: new Stat(character.scores[STAT_KEYS.STRENGTH].value),
        [STAT_KEYS.DEXTERITY]: new Stat(character.scores[STAT_KEYS.DEXTERITY].value),
        [STAT_KEYS.CONSTITUTION]: new Stat(character.scores[STAT_KEYS.CONSTITUTION].value),
        [STAT_KEYS.INTELLIGENCE]: new Stat(character.scores[STAT_KEYS.INTELLIGENCE].value),
        [STAT_KEYS.WISDOM]: new Stat(character.scores[STAT_KEYS.WISDOM].value),
        [STAT_KEYS.CHARISMA]: new Stat(character.scores[STAT_KEYS.CHARISMA].value),
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
      scores,
      character.weapons,
      character.timeCreated,
      character.inspiration,
      character.treasures
    )

    return charObj
}

}