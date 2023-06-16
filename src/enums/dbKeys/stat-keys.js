const STAT_KEYS = {
    STRENGTH: "str",
    DEXTERITY: "dex",
    CONSTITUTION: "con",
    INTELLIGENCE: "int",
    WISDOM: "wis",
    CHARISMA: "cha"
}

const STAT_VALUES_KEYS = {
    MOD: "mod",
    PROFICIENT: "proficient",
    VALUE: "value",
}

const STAT_NAMES = {
    '': 'None',
    [STAT_KEYS.STRENGTH]: "Strength",
    [STAT_KEYS.DEXTERITY]: "Dexterity",
    [STAT_KEYS.CONSTITUTION]: "Constitution",
    [STAT_KEYS.INTELLIGENCE]: "Intelligence",
    [STAT_KEYS.WISDOM]: "Wisdom",
    [STAT_KEYS.CHARISMA]: "Charisma"
}

export { STAT_KEYS, STAT_VALUES_KEYS, STAT_NAMES }