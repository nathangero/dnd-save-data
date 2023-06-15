const WEAPON_KEYS = {
    AMOUNT: "amount",
    ATTACK_MOD: "attackMod",
    CATEGORY: "category",
    DAMAGE_MOD: "damageMod",
    DESCRIPTION: "description",
    DIE: "die",
    PROFICIENT: "proficient",
    PROPERTIES: "properties"
}

const WEAPON_CATEGORY = {
    SIMPLE: "Simple",
    MARTIAL: "Martial",
    SPELL: "Spell",
    OTHER: "Other"
}

const WEAPON_PROPERTY = {
    ACID: "Acid",
    BLUDGEONING: "Bludgeoning",
    COLD: "Cold",
    FIRE: "Fire",
    FORCE: "Force",
    LIGHTNING: "Lightning",
    NECROTIC: "Necrotic",
    PIERCING: "Piercing",
    POISON: "Poison",
    PSYCHIC: "Psychic",
    RADIANT: "Radiant",
    SLASHING: "Slashing",
    THUNDER: "Thunder",
    OTHER: "Other"
}

const WEAPON_NAMES = {
    [WEAPON_KEYS.AMOUNT]: "Amount",
    [WEAPON_KEYS.ATTACK_MOD]: "Attack Mod",
    [WEAPON_KEYS.CATEGORY]: "Category",
    [WEAPON_KEYS.DAMAGE_MOD]: "Damage Mod",
    [WEAPON_KEYS.DESCRIPTION]: "Description",
    [WEAPON_KEYS.DIE]: "Die type",
    [WEAPON_KEYS.PROFICIENT]: "Proficient",
    [WEAPON_KEYS.PROPERTIES]: "Properties"
}

export { WEAPON_KEYS, WEAPON_CATEGORY, WEAPON_PROPERTY, WEAPON_NAMES }