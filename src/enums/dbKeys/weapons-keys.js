const WEAPON_KEYS = {
    AMOUNT: "amount",
    ATTACK_DAMAGE_MOD: "attackDamageMod",
    CATEGORY: "category",
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
    [WEAPON_KEYS.ATTACK_DAMAGE_MOD]: "Atk/Dmg Mod",
    [WEAPON_KEYS.CATEGORY]: "Category",
    [WEAPON_KEYS.DESCRIPTION]: "Description",
    [WEAPON_KEYS.DIE]: "Die type",
    [WEAPON_KEYS.PROFICIENT]: "Proficient",
    [WEAPON_KEYS.PROPERTIES]: "Properties"
}

export { WEAPON_KEYS, WEAPON_CATEGORY, WEAPON_PROPERTY, WEAPON_NAMES }