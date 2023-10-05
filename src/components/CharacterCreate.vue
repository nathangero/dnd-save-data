<template>
  <div class="body">
    <transition name="slide-up" mode="out-in">
      <div>
        <header>
          <nav>
            <button class="nav-bar-button" @click="openJumpToMenu">Jump to</button>
            <template v-if="isShowingJumpToMenu">
              <div class="jump-to-menu" :class="{ 'show-menu': isShowingJumpToMenu }">
                <ul>
                  <li @click="scrollToSection('character-background')">
                    <p>{{ CHARACTER_SECTIONS.CHARACTER_BACKGROUND }}</p>
                  </li>

                  <li @click="scrollToSection('character-info')">
                    <p>{{ CHARACTER_SECTIONS.CHARACTER_INFO }}</p>
                  </li>

                  <li @click="scrollToSection('ability-scores')">
                    <p>{{ CHARACTER_SECTIONS.ABILITY_SCORES }}</p>
                  </li>

                  <li @click="scrollToSection('saving-throws')">
                    <p>{{ CHARACTER_SECTIONS.SAVING_THROWS }}</p>
                  </li>

                  <li @click="scrollToSection('skills')">
                    <p>{{ CHARACTER_SECTIONS.SKILLS }}</p>
                  </li>

                  <li @click="scrollToSection('features-traits')">
                    <p>{{ CHARACTER_SECTIONS.FEATURES_TRAITS }}</p>
                  </li>

                  <li @click="scrollToSection('weapons')">
                    <p>{{ CHARACTER_SECTIONS.WEAPONS }}</p>
                  </li>

                  <li @click="scrollToSection('equipment')">
                    <p>{{ CHARACTER_SECTIONS.EQUIPMENT }}</p>
                  </li>

                  <li @click="scrollToSection('treasure')">
                    <p>{{ CHARACTER_SECTIONS.TREASURES }}</p>
                  </li>

                  <li @click="scrollToSection('languages')">
                    <p>{{ CHARACTER_SECTIONS.LANGUAGES }}</p>
                  </li>

                  <li @click="scrollToSection('proficiencies')">
                    <p>{{ CHARACTER_SECTIONS.PROFICIENCIES }}</p>
                  </li>

                  <li @click="scrollToSection('spell-slots')">
                    <p>{{ CHARACTER_SECTIONS.SPELL_SLOTS }}</p>
                  </li>

                  <li @click="scrollToSection('spell-casting')">
                    <p>{{ CHARACTER_SECTIONS.SPELL_CASTING }}</p>
                  </li>

                  <li @click="scrollToSection('create-character')">
                    <p>Create Character</p>
                  </li>
                </ul>
              </div>
            </template>
            <button class="nav-bar-button" @click="closeModal">Close</button>
          </nav>

          <section id="character-background">
            <h1>New Character</h1>
          </section>
        </header>

        <main>
          <br>
          <section class="new-character">
            <ul>
              <li>
                <input class="name" type="text" v-model="newCharacter.name" placeholder="Name" required>
              </li>
              
              <li>
                <input class="name" type="text" v-model="newCharacter.background" placeholder="Background" required>
              </li>
              
              <li>
                <input class="name" type="text" v-model="newCharacter.race" placeholder="Race" required>
              </li>
              
              <li>
                <label for="character-alignment" style="margin-right: 10px;">Alignment:</label>
                <select class="picker" v-model="newCharacter.alignment">
                  <option v-for="alignment in ALIGNMENT_TYPES" :key="alignment">{{ alignment }}</option>
                </select>
              </li>
              
              <li>
                <label for="character-class">Class:</label>
                <select class="picker" v-model="newCharacter.class">
                  <option v-for="name in CLASS_NAMES" :key="name" :value="name">{{ name }}</option>
                </select>
              </li>
            </ul>
          </section>
          <hr>

          <br>
          <section id="character-info">
            <header>
              <div class="spacer">
                <button class="button-edit" v-if="!isEditingCharInfo" @click="toggleEditForSection(CHARACTER_SECTIONS.CHARACTER_INFO)">Edit</button>
                <button class="button-edit" v-if="isEditingCharInfo" @click="toggleEditForSection(CHARACTER_SECTIONS.CHARACTER_INFO)">Finish</button>
              </div>

              <div class="section-title">
                <h2 @click="toggleCollapseForSection(CHARACTER_SECTIONS.CHARACTER_INFO)">{{ CHARACTER_SECTIONS.CHARACTER_INFO }}</h2>
                <font-awesome-icon icon="chevron-up" class="collapse-chevron" v-if="!isShowingCharacterInfo"/>
                <font-awesome-icon icon="chevron-down" class="collapse-chevron" v-if="isShowingCharacterInfo"/>
              </div>

              <div class="spacer">
                <button class="button-edit" v-if="!isEditingCharInfo" @click="toggleEditForSection(CHARACTER_SECTIONS.CHARACTER_INFO)">Edit</button>
                <button class="button-edit" v-if="isEditingCharInfo" @click="toggleEditForSection(CHARACTER_SECTIONS.CHARACTER_INFO)">Finish</button>
              </div>
            </header>

            <collapse-transition dimension="height">
              <div v-if="isShowingCharacterInfo">
                <ul>
                  <li>
                    <label for="stats-level">Starting level:</label>
                    <div class="spacer"></div>
                    <input type="number" id="stats-level" v-model="newCharacter.level" inputmode="numeric" required>
                  </li>

                  <li>
                    <label for="stats-armor-class">Armor Class: </label>
                    <div class="spacer"></div>
                    <input type="number" id="stats-armor-class" v-model="newCharacter.armor" inputmode="numeric" required>
                  </li>

                  <li>
                    <label for="stats-initiative">Initiative: </label>
                    <div class="spacer"></div>
                    <label>{{ getStatBonusSign(newCharacter.scores[STAT_KEYS.DEXTERITY].calculateMod()) }}</label>
                  </li>

                  <li>
                    <label for="stats-speed">Speed (ft): </label>
                    <div class="spacer"></div>
                    <input type="number" id="stats-speed" v-model="newCharacter.speed" inputmode="numeric" required>
                  </li>

                  <li>
                    <label for="stats-hp">Hit Points (HP):</label>
                    <div class="spacer"></div>
                    <input type="number" id="stats-hp" v-model="newCharacter.hp[HP_KEYS.MAX]" inputmode="numeric" required>
                  </li>

                  <li>
                    <label>Hit Die Type: </label>
                    <div class="spacer"></div>
                    <select class="picker" v-model="newCharacter.hp[HP_KEYS.DIE]">
                      <option v-for="die in DIE_TYPE" :key="die" :value="die">{{ die }}</option>
                    </select>
                  </li>

                  <li>
                    <label for="stats-hit-die"># of Hit Die: </label>
                    <div class="spacer"></div>
                    <input type="number" id="stats-hit-die" v-model="newCharacter.hp[HP_KEYS.DIE_AMOUNT_MAX]"  inputmode="numeric" required>
                  </li>

                  <li>
                    <label for="stats-proficiency-bonus">Proficiency Bonus: </label>
                    <div class="spacer"></div>
                    <label>{{ getStatBonusSign(getProficiencyBonus()) }}</label>
                  </li>

                  <li>
                    <label>Passive Perception: </label>
                    <div class="spacer"></div>
                    <label>{{ calculatePassivePerception() }}</label>
                  </li>

                  <li>
                    <label for="spells-attack-bonus">Casting Ability:</label>
                    <select v-model="newCharacter.spellCastStat">
                      <option v-for="stat in STAT_KEYS" :key="stat" :value="stat">{{ STAT_NAMES[stat] }}</option>
                    </select>
                  </li>

                  <li>
                    <label>Spell Saving DC: </label>
                    <label>{{ calculateSpellSavingDc(newCharacter.scores[newCharacter.spellCastStat]) }}</label>
                  </li>

                  <li>
                    <label for="stats-proficiency-bonus">Inspriation: </label>
                    <input type="number" id="stats-inspiration" v-model="newCharacter.inspiration" inputmode="numeric" required>
                  </li>
                </ul>
              </div>
            </collapse-transition>
          </section>
          <hr>

          <br>
          <section id="ability-scores">
            <header>
              <div class="spacer">
                <button class="button-edit" v-if="!isEditingAbilityScores" @click="toggleEditForSection(CHARACTER_SECTIONS.ABILITY_SCORES)">Edit</button>
                <button class="button-edit" v-if="isEditingAbilityScores" @click="toggleEditForSection(CHARACTER_SECTIONS.ABILITY_SCORES)">Finish</button>
              </div>

              <div class="section-title">
                <h2 @click="toggleCollapseForSection(CHARACTER_SECTIONS.ABILITY_SCORES)">{{ CHARACTER_SECTIONS.ABILITY_SCORES }}</h2>
                <font-awesome-icon icon="chevron-up" class="collapse-chevron" v-if="!isShowingAbilityScores"/>
                <font-awesome-icon icon="chevron-down" class="collapse-chevron" v-if="isShowingAbilityScores"/>
              </div>

              <div class="spacer">
                <button class="button-edit" v-if="!isEditingAbilityScores" @click="toggleEditForSection(CHARACTER_SECTIONS.ABILITY_SCORES)">Edit</button>
                <button class="button-edit" v-if="isEditingAbilityScores" @click="toggleEditForSection(CHARACTER_SECTIONS.ABILITY_SCORES)">Finish</button>
              </div>
            </header>

            <collapse-transition dimension="height">
              <div v-if="isShowingAbilityScores">
                <ul>
                  <li v-for="(score, key) in STAT_KEYS" :key="key">
                    <label for="score">{{ STAT_NAMES[score] }}:</label>
                    <div>
                      <input type="number" id="score" v-model="newCharacter.scores[score].value" inputmode="numeric" required>
                      <label class="mod">Mod: <strong>{{ getStatBonusSign(newCharacter.scores[score].calculateMod()) }}</strong></label>
                    </div>
                  </li>
                </ul>
              </div>
            </collapse-transition>
          </section>
          <hr>

          <br>
          <section id="saving-throws">
            <header>
              <div class="spacer">
                <button class="button-edit" v-if="!isEditingSavingThrows" @click="toggleEditForSection(CHARACTER_SECTIONS.SAVING_THROWS)">Edit</button>
                <button class="button-edit" v-if="isEditingSavingThrows" @click="toggleEditForSection(CHARACTER_SECTIONS.SAVING_THROWS)">Finish</button>
              </div>

              <div class="section-title">
                <h2 @click="toggleCollapseForSection(CHARACTER_SECTIONS.SAVING_THROWS)">{{ CHARACTER_SECTIONS.SAVING_THROWS }}</h2>
                <font-awesome-icon icon="chevron-up" class="collapse-chevron" v-if="!isShowingSavingThrows"/>
                <font-awesome-icon icon="chevron-down" class="collapse-chevron" v-if="isShowingSavingThrows"/>
              </div>

              <div class="spacer">
                <button class="button-edit" v-if="!isEditingSavingThrows" @click="toggleEditForSection(CHARACTER_SECTIONS.SAVING_THROWS)">Edit</button>
                <button class="button-edit" v-if="isEditingSavingThrows" @click="toggleEditForSection(CHARACTER_SECTIONS.SAVING_THROWS)">Finish</button>
              </div>
            </header>

            <collapse-transition dimension="height">
              <div v-if="isShowingSavingThrows">
                <ul>
                  <li v-for="(stat, key) in STAT_KEYS" :key="key">
                    <div>
                      <input type="checkbox" class="checkbox" v-model="newCharacter.savingThrows[stat].proficient">
                      <label>{{ STAT_NAMES[stat] }}:</label>
                    </div>

                    <label v-if="newCharacter.savingThrows[stat].proficient">
                      <strong>{{ getStatBonusSign(newCharacter.scores[stat].calculateMod() + getProficiencyBonus()) }}</strong>
                    </label>
                    <label v-if="!newCharacter.savingThrows[stat].proficient">
                      <strong>{{ getStatBonusSign(newCharacter.scores[stat].calculateMod()) }}</strong>
                    </label>
                  </li>
                </ul>
              </div>
            </collapse-transition>
          </section>
          <hr>

          <br>
          <section id="skills">
            <header>
              <div class="spacer">
                <button class="button-edit" v-if="!isEditingSkills" @click="toggleEditForSection(CHARACTER_SECTIONS.SKILLS)">Edit</button>
                <button class="button-edit" v-if="isEditingSkills" @click="toggleEditForSection(CHARACTER_SECTIONS.SKILLS)">Finish</button>
              </div>

              <div class="section-title">
                <h2 @click="toggleCollapseForSection(CHARACTER_SECTIONS.SKILLS)">{{ CHARACTER_SECTIONS.SKILLS }}</h2>
                <font-awesome-icon icon="chevron-up" class="collapse-chevron" v-if="!isShowingSkills"/>
                <font-awesome-icon icon="chevron-down" class="collapse-chevron" v-if="isShowingSkills"/>
              </div>

              <div class="spacer">
                <button class="button-edit" v-if="!isEditingSkills" @click="toggleEditForSection(CHARACTER_SECTIONS.SKILLS)">Edit</button>
                <button class="button-edit" v-if="isEditingSkills" @click="toggleEditForSection(CHARACTER_SECTIONS.SKILLS)">Finish</button>
              </div>
            </header>

            <collapse-transition dimension="height">
              <div v-if="isShowingSkills">
                <ul>
                  <li v-for="(skill, key) in SKILL_KEYS" :key="key">
                      <div>
                        <input type="checkbox" class="checkbox" v-model="newCharacter.skills[skill].proficient">
                        <label>{{ SKILL_NAMES[skill] }}:</label>
                        <label class="skill-score">&nbsp;{{ SKILL_NAME_SCORES[skill] }}</label>
                      </div>

                      <label class="mod" v-if="newCharacter.skills[skill].proficient">
                        <strong>{{ getStatBonusSign(newCharacter.scores[SKILL_MODS[skill]].calculateMod() + getProficiencyBonus()) }}</strong>
                      </label>
                      <label class="mod" v-if="!newCharacter.skills[skill].proficient">
                        <strong>{{ getStatBonusSign(newCharacter.scores[SKILL_MODS[skill]].calculateMod()) }}</strong>
                      </label>
                  </li>
                </ul>
              </div>
            </collapse-transition>
            
          </section>
          <hr>

          <br>
          <section id="features-traits">
            <header>
              <div class="spacer">
                <button class="button-edit" v-if="!isEditingFeaturesTraits" @click="toggleEditForSection(CHARACTER_SECTIONS.FEATURES_TRAITS)">Edit</button>
                <button class="button-edit" v-if="isEditingFeaturesTraits" @click="toggleEditForSection(CHARACTER_SECTIONS.FEATURES_TRAITS)">Finish</button>
              </div>

              <div class="section-title">
                <h2 @click="toggleCollapseForSection(CHARACTER_SECTIONS.FEATURES_TRAITS)">{{ CHARACTER_SECTIONS.FEATURES_TRAITS }}</h2>
                <font-awesome-icon icon="chevron-up" class="collapse-chevron" v-if="!isShowingFeatures"/>
                <font-awesome-icon icon="chevron-down" class="collapse-chevron" v-if="isShowingFeatures"/>
              </div>

              <div>
                <button class="button-edit" v-if="!isEditingFeaturesTraits" @click="toggleEditForSection(CHARACTER_SECTIONS.FEATURES_TRAITS)">Edit</button>
                <button class="button-edit" v-if="isEditingFeaturesTraits" @click="toggleEditForSection(CHARACTER_SECTIONS.FEATURES_TRAITS)">Finish</button>
              </div>
            </header>

            <collapse-transition dimension="height">
              <div v-if="isShowingFeatures">
                <template v-if="isEditingFeaturesTraits">
                  <div class="editing">
                    <ul>
                      <li>
                        <input class="name" type="text" v-model="featuresTempName" placeholder="New feature/trait name"> 
                      </li>
                      <li>
                        <label>Type:</label>
                        <select v-model="featuresTempType">
                          <option v-for="feat in FEATURES_TYPES" :key="feat" :value="feat">{{ feat }}</option>
                        </select>
                      </li>

                      <li>
                        <label>Action Type:</label>
                        <select v-model="featuresTempAction">
                          <option v-for="action in ACTION_TYPES" :key="action" :value="action">{{ action }}</option>
                        </select>
                      </li>

                      <li>
                        <label for="features-input"> # of Uses:</label>
                        <input ßtype="number" inputmode="numeric" v-model="featuresTempUses"> 
                      </li>
                    </ul>
                    
                    <br>
                    <textarea class="description" v-model="featuresTempDescription" rows="6" placeholder="Description"></textarea>

                    <br>
                    <button class="button-add" @click="onPressAddFeatures">Add</button>

                    <hr>
                  </div>
                </template>

                <template v-if="getDictionarySize(newCharacter.featuresTraits) > 0">
                  <div class="viewing" v-if="!isEditingFeaturesTraits">
                    <ul v-for="(item, key) in newCharacter.featuresTraits" :key="key">
                      <li>
                        <label class="name-and-count"><strong>{{ key }}</strong>&emsp;x{{ item[FEATURES_KEYS.USES] }}</label>
                        <p>Type: {{ item[FEATURES_KEYS.TYPE] }}</p>
                        <p>Action Type: {{ item[FEATURES_KEYS.ACTION] }}</p>
                        <p class="description">{{ item[FEATURES_KEYS.DESCRIPTION] }}</p>
                      </li>

                      <hr class="list-divider">
                    </ul>
                  </div>

                  <div class="editing" v-if="isEditingFeaturesTraits">
                    <ul v-for="(item, key) in newCharacter.featuresTraits" :key="key">
                      <li>
                        <label><strong>{{ key }}</strong></label>
                      </li>

                      <li>
                        <label>Type:</label>
                        <select v-model="item[FEATURES_KEYS.TYPE]">
                          <option v-for="feat in FEATURES_TYPES" :key="feat" :value="feat">{{ feat }}</option>
                        </select>
                      </li>

                      <li>
                        <label>Action Type:</label>
                        <select v-model="item[FEATURES_KEYS.ACTION]">
                          <option v-for="action in ACTION_TYPES" :key="action" :value="action">{{ action }}</option>
                        </select>
                      </li>

                      <li>
                        <label> # of Uses:</label>
                        <input type="number" inputmode="numeric" v-model="item[FEATURES_KEYS.USES]"> 
                      </li>

                      <br>
                      <textarea  v-model="item[FEATURES_KEYS.DESCRIPTION]" rows="6" placeholder="Description"></textarea>

                      <li class="container-update-delete">
                        <button class="button-delete" @click="onPressDeleteStat(key, CHARACTER_KEYS.FEATURES)">Delete</button>
                      </li>
                      
                      <li>
                        <hr class="list-divider">
                      </li>
                    </ul>
                  </div>
                </template>
              </div>
            </collapse-transition>
            
          </section>
          <hr>

          <br>
          <section id="weapons">
            <header>
              <div class="spacer">
                <button class="button-edit" v-if="!isEditingWeapons" @click="toggleEditForSection(CHARACTER_SECTIONS.WEAPONS)">Edit</button>
                <button class="button-edit" v-if="isEditingWeapons" @click="toggleEditForSection(CHARACTER_SECTIONS.WEAPONS)">Finish</button>
              </div>

              <div class="section-title">
                <h2 @click="toggleCollapseForSection(CHARACTER_SECTIONS.WEAPONS)">{{ CHARACTER_SECTIONS.WEAPONS }}</h2>
                <font-awesome-icon icon="chevron-up" class="collapse-chevron" v-if="!isShowingWeapons"/>
                <font-awesome-icon icon="chevron-down" class="collapse-chevron" v-if="isShowingWeapons"/>
              </div>

              <div>
                <button class="button-edit" v-if="!isEditingWeapons" @click="toggleEditForSection(CHARACTER_SECTIONS.WEAPONS)">Edit</button>
                <button class="button-edit" v-if="isEditingWeapons" @click="toggleEditForSection(CHARACTER_SECTIONS.WEAPONS)">Finish</button>
              </div>
            </header>

            <collapse-transition dimension="height">
              <div v-if="isShowingWeapons">
                <template v-if="isEditingWeapons">
                  <div class="editing">
                    <ul>
                      <li>
                        <input class="name" type="text" v-model="weaponTempName" placeholder="New weapon/spell name"> 
                      </li>

                      <li>
                        <label for="equipment-input">Amount:</label>
                        <input type="number" inputmode="numeric" v-model="weaponTempAmount"> 
                      </li>

                      <li>
                        <label for="equipment-input">{{ WEAPON_NAMES[WEAPON_KEYS.ATTACK_DAMAGE_STAT] }}:</label>
                        <select v-model="weaponsTempAttackModifier">
                          <option v-for="mod in WEAPON_MODS" :key="mod" :value="mod">{{ STAT_NAMES[mod] }}</option>
                        </select>
                      </li>
                      
                      <li>
                        <label for="equipment-input">Die Type:</label>
                        <select v-model="weaponTempDieType">
                          <option v-for="die in DIE_TYPE" :key="die" :value="die">{{ die }}</option>
                        </select>
                      </li>

                      <li>
                        <label for="equipment-input">Category:</label>
                        <select v-model="weaponTempCategory">
                          <option v-for="category in WEAPON_CATEGORY" :key="category" :value="category">{{ category }}</option>
                        </select>
                      </li>

                      <li>
                        <label for="equipment-input">Proficient:</label>
                        <input type="checkbox" class="checkbox" v-model="weaponTempIsProficient">
                      </li>
                    </ul>

                    <br>
                    <textarea v-model="weaponTempDescription" rows="6" placeholder="Description"></textarea>
                    <br>
                    <button class="button-add" @click="onPressAddWeapon">Add</button>
                    
                    <hr>
                  </div>
                </template>

                <template v-if="getDictionarySize(newCharacter.weapons) > 0">
                  <div class="viewing" v-if="!isEditingWeapons">
                    <ul v-for="(item, key) in newCharacter.weapons" :key="key">
                      <li>
                        <label class="name-and-count"><strong>{{ key }}</strong>&emsp;x{{ item[WEAPON_KEYS.AMOUNT] }}</label>

                        <div>
                          <label>{{ WEAPON_NAMES[WEAPON_KEYS.ATTACK_DAMAGE_STAT] }}:</label>

                          <label v-if="!item[WEAPON_KEYS.PROFICIENT]">
                            {{ getStatBonusSign(getStatModFromKey(item[WEAPON_KEYS.ATTACK_DAMAGE_STAT])) }} ({{ STAT_NAMES[item[WEAPON_KEYS.ATTACK_DAMAGE_STAT]] }})
                          </label>
                          <label v-if="item[WEAPON_KEYS.PROFICIENT]">
                            {{ getStatBonusSign(getStatModFromKey(item[WEAPON_KEYS.ATTACK_DAMAGE_STAT]) + getProficiencyBonus()) }} ({{ STAT_NAMES[item[WEAPON_KEYS.ATTACK_DAMAGE_STAT]] }})
                          </label>
                        </div>

                        <div>
                          <label>{{ WEAPON_NAMES.DAMAGE_MOD }}:</label>
                          <label>
                            {{ getStatBonusSign(getStatModFromKey(item[WEAPON_KEYS.ATTACK_DAMAGE_STAT])) }} ({{ STAT_NAMES[item[WEAPON_KEYS.ATTACK_DAMAGE_STAT]] }})
                          </label>
                        </div>

                        <div>
                          <label>{{ WEAPON_NAMES[WEAPON_KEYS.DIE] }}:</label>
                          <label>{{ item[WEAPON_KEYS.DIE] }}</label>
                        </div>

                        <div>
                          <label>{{ WEAPON_NAMES[WEAPON_KEYS.CATEGORY] }}:</label>
                          <label>{{ item[WEAPON_KEYS.CATEGORY] }}</label>
                        </div>

                        <div>
                          <label>{{ WEAPON_NAMES[WEAPON_KEYS.PROFICIENT] }}:</label>
                          <input type="checkbox" class="checkbox" v-model="item[WEAPON_KEYS.PROFICIENT]" :disabled="!isEditingWeapons">
                        </div>

                        <p class="description">{{ item[WEAPON_KEYS.DESCRIPTION] }}</p>
                      </li>

                      <hr class="list-divider">
                    </ul>
                  </div>

                  <div class="editing" v-if="isEditingWeapons">
                    <ul v-for="(item, key) in newCharacter.weapons" :key="key">
                      <li>
                        <label><strong>{{ key }}</strong></label>
                      </li>

                      <li>
                        <label for="equipment-input">{{ WEAPON_NAMES[WEAPON_KEYS.AMOUNT] }}:</label>
                        <input type="number" inputmode="numeric" v-model="item[WEAPON_KEYS.AMOUNT]"> 
                      </li>
                        
                      <li>
                        <label for="equipment-input">{{ WEAPON_NAMES[WEAPON_KEYS.ATTACK_DAMAGE_STAT] }}:</label>
                        <select v-model="item[WEAPON_KEYS.ATTACK_DAMAGE_STAT]">
                          <option v-for="mod in WEAPON_MODS" :key="mod" :value="mod">{{ STAT_NAMES[mod] }}</option>
                        </select>
                      </li>
                      
                      <li>
                        <label for="equipment-input">{{ WEAPON_NAMES[WEAPON_KEYS.DIE] }}:</label>
                        <select v-model="item[WEAPON_KEYS.DIE]">
                          <option v-for="die in DIE_TYPE" :key="die" :value="die">{{ die }}</option>
                        </select>
                      </li>

                      <li>
                        <label for="equipment-input">{{ WEAPON_NAMES[WEAPON_KEYS.CATEGORY] }}:</label>
                        <select v-model="item[WEAPON_KEYS.CATEGORY]">
                          <option v-for="category in WEAPON_CATEGORY" :key="category" :value="category">{{ category }}</option>
                        </select>
                      </li>

                      <li>
                        <label for="equipment-input">{{ WEAPON_NAMES[WEAPON_KEYS.PROFICIENT] }}:</label>
                        <input type="checkbox" class="checkbox" v-model="item[WEAPON_KEYS.PROFICIENT]">
                      </li>

                      <br>
                      <textarea v-model="item[WEAPON_KEYS.DESCRIPTION]" rows="6" placeholder="Description"></textarea>

                      <li class="container-update-delete">
                        <button class="button-delete" @click="onPressDeleteStat(key, CHARACTER_KEYS.WEAPONS)">Delete</button>
                      </li>
                      
                      <li>
                        <hr class="list-divider">
                      </li>
                    </ul>
                  </div>
                </template>
              </div>
            </collapse-transition>
          </section>
          <hr>

          <br>
          <section id="equipment">
            <header>
              <div class="spacer">
                <button class="button-edit" v-if="!isEditingEquipment" @click="toggleEditForSection(CHARACTER_SECTIONS.EQUIPMENT)">Edit</button>
                <button class="button-edit" v-if="isEditingEquipment" @click="toggleEditForSection(CHARACTER_SECTIONS.EQUIPMENT)">Finish</button>
              </div>

              <div class="section-title">
                <h2 @click="toggleCollapseForSection(CHARACTER_SECTIONS.EQUIPMENT)">{{ CHARACTER_SECTIONS.EQUIPMENT }}</h2>
                <font-awesome-icon icon="chevron-up" class="collapse-chevron" v-if="!isShowingEquipment"/>
                <font-awesome-icon icon="chevron-down" class="collapse-chevron" v-if="isShowingEquipment"/>
              </div>

              <div>
                <button class="button-edit" v-if="!isEditingEquipment" @click="toggleEditForSection(CHARACTER_SECTIONS.EQUIPMENT)">Edit</button>
                <button class="button-edit" v-if="isEditingEquipment" @click="toggleEditForSection(CHARACTER_SECTIONS.EQUIPMENT)">Finish</button>
              </div>
            </header>

            <collapse-transition dimension="height">
              <div v-if="isShowingEquipment">
                <template v-if="isEditingEquipment">
                  <div class="editing">
                    <ul>
                      <li>
                        <input class="name" type="text" v-model="equipmentTempName" placeholder="New item name"> 
                      </li>

                      <li>
                        <label for="equipment-input">Amount:</label>
                        <input v-model="equipmentTempAmount" type="number" inputmode="numeric"> 
                      </li>
                    </ul>

                  <br>
                  <textarea v-model="equipmentTempDescription" rows="6" placeholder="Description"></textarea>

                  <br>
                  <button class="button-add" @click="onPressAddEquipment">Add</button>

                  <hr>
                  </div>
                </template>

                <div id="gold">
                  <div class="viewing" v-if="!isEditingEquipment">
                  <ul>
                    <li><label class="name-and-count"><strong>Gold</strong>&emsp;x{{ newCharacter.gold }}</label></li>
                  </ul>
                </div>

                <div class="editing-languages" v-if="isEditingEquipment">
                  <ul>
                    <li class="inline">
                      <label>Gold:</label>
                      <input type="number" v-model="newCharacter.gold" inputmode="numeric" required>
                    </li>
                  </ul>
                </div>
                </div>
                  
                <template v-if="getDictionarySize(newCharacter.equipment) > 0">
                  <div class="viewing" v-if="!isEditingEquipment">
                    <ul v-for="(item, key) in newCharacter.equipment" :key="key">
                      <li>
                        <label class="name-and-count"><strong>{{ key }}</strong>&emsp;x{{ item[EQUIPMENT_KEYS.AMOUNT] }}</label>
                        <p class="description">{{ item[EQUIPMENT_KEYS.DESCRIPTION] }}</p>
                      </li>

                      <hr class="list-divider">
                    </ul>
                  </div>
                  
                  <div class="editing" v-if="isEditingEquipment">
                    <ul v-for="(item, key) in newCharacter.equipment" :key="key">
                      <li>
                        <label><strong>{{ key }}</strong></label>
                      </li>

                      <li>
                        <label>Amount:</label>
                        <input v-model="item[EQUIPMENT_KEYS.AMOUNT]" type="number" inputmode="numeric"> 
                      </li>

                      <br>
                      <textarea v-model="item[EQUIPMENT_KEYS.DESCRIPTION]" rows="6" placeholder="Description"></textarea>

                      <li class="container-update-delete">
                        <button class="button-delete" @click="onPressDeleteStat(key, CHARACTER_KEYS.EQUIPMENT)">Delete</button>
                      </li>
                      
                      <li>
                        <hr class="list-divider">
                      </li>
                    </ul>

                  </div>
                </template>
              </div>
            </collapse-transition>
          </section>
          <hr>

          <br>
          <section id="treasure">
            <header>
              <div class="spacer">
                <button class="button-edit" v-if="!isEditingTreasure" @click="toggleEditForSection(CHARACTER_SECTIONS.TREASURES)">Edit</button>
                <button class="button-edit" v-if="isEditingTreasure" @click="toggleEditForSection(CHARACTER_SECTIONS.TREASURES)">Finish</button>
              </div>

              <div class="section-title">
                <h2 @click="toggleCollapseForSection(CHARACTER_SECTIONS.TREASURES)">{{ CHARACTER_SECTIONS.TREASURES }}</h2>
                <font-awesome-icon icon="chevron-up" class="collapse-chevron" v-if="!isShowingTreasure"/>
                <font-awesome-icon icon="chevron-down" class="collapse-chevron" v-if="isShowingTreasure"/>
              </div>

              <div>
                <button class="button-edit" v-if="!isEditingTreasure" @click="toggleEditForSection(CHARACTER_SECTIONS.TREASURES)">Edit</button>
                <button class="button-edit" v-if="isEditingTreasure" @click="toggleEditForSection(CHARACTER_SECTIONS.TREASURES)">Finish</button>
              </div>
            </header>

            <collapse-transition dimension="height">
              <div v-if="isShowingTreasure">
                <template v-if="isEditingTreasure">
                  <div class="editing">
                    <ul>
                      <li>
                        <input class="name" type="text" v-model="treasureTempName" placeholder="New treasure name"> 
                      </li>

                      <li>
                        <label>Amount:</label>
                        <input type="number" inputmode="numeric" v-model="treasureTempAmount"> 
                      </li>
                    </ul>

                    <br>
                    <textarea v-model="treasureTempDescription" rows="6" placeholder="Description"></textarea>

                    <br>
                    <button class="button-add" @click="onPressAddTreasure">Add</button>

                    <hr>
                  </div>
                </template>

                <template v-if="getDictionarySize(newCharacter.treasures) > 0">
                  <div class="viewing" v-if="!isEditingTreasure">
                    <ul  v-for="(item, key) in newCharacter.treasures" :key="key">
                      <li>
                        <label class="name-and-count"><strong>{{ key }}</strong>&emsp;x{{ item[EQUIPMENT_KEYS.AMOUNT] }}</label>
                        <p class="description">{{ item[EQUIPMENT_KEYS.DESCRIPTION] }}</p>
                      </li>

                      <hr class="list-divider">
                    </ul>
                  </div>

                  <div class="editing" v-if="isEditingTreasure">
                    <ul  v-for="(item, key) in newCharacter.treasures" :key="key">
                      <li>
                        <label><strong>{{ key }}</strong></label>
                      </li>

                      <li>
                        <label>Amount:</label>
                        <input type="number" inputmode="numeric" v-model="item[EQUIPMENT_KEYS.AMOUNT]"> 
                      </li>

                      <br>
                      <textarea v-model="item[EQUIPMENT_KEYS.DESCRIPTION]" rows="6" placeholder="Description"></textarea>

                      <li class="container-update-delete">
                        <button class="button-delete" @click="onPressDeleteStat(key, CHARACTER_KEYS.TREASURES)">Delete</button>
                      </li>

                      <li>
                        <hr class="list-divider">
                      </li>
                    </ul>
                  </div>
                </template>
              </div>
            </collapse-transition>

          </section>
          <hr>

          <br>
          <section id="languages">
            <header>
              <div class="spacer">
                <button class="button-edit" v-if="!isEditingLanguages" @click="toggleEditForSection(CHARACTER_SECTIONS.LANGUAGES)">Edit</button>
                <button class="button-edit" v-if="isEditingLanguages" @click="toggleEditForSection(CHARACTER_SECTIONS.LANGUAGES)">Finish</button>
              </div>

              <div class="section-title">
                <h2 @click="toggleCollapseForSection(CHARACTER_SECTIONS.LANGUAGES)">{{ CHARACTER_SECTIONS.LANGUAGES }}</h2>
                <font-awesome-icon icon="chevron-up" class="collapse-chevron" v-if="!isShowingLanguages"/>
                <font-awesome-icon icon="chevron-down" class="collapse-chevron" v-if="isShowingLanguages"/>
              </div>

              <div>
                <button class="button-edit" v-if="!isEditingLanguages" @click="toggleEditForSection(CHARACTER_SECTIONS.LANGUAGES)">Edit</button>
                <button class="button-edit" v-if="isEditingLanguages" @click="toggleEditForSection(CHARACTER_SECTIONS.LANGUAGES)">Finish</button>
              </div>
            </header>

            <div id="collapse">
              <collapse-transition dimension="height">
                <div v-if="isShowingLanguages">
                  <template v-if="isEditingLanguages">
                    <div class="editing">
                      <ul>
                        <li>
                          <input class="name" type="text" v-model="languagesTempName" placeholder="New language name"> 
                        </li>

                        <li>
                          <label>Proficiency: </label>
                          <select v-model="languagesTempProficiency">
                            <option v-for="prof in LANGUAGE_PROFICIENCY" :key="prof" :value="prof">{{ prof }}</option>
                          </select>
                        </li>
                      </ul>
                        
                      <br>
                      <button class="button-add" @click="onPressAddLanguage">Add</button>

                      <hr>
                    </div>
                  </template>

                  <template v-if="getDictionarySize(newCharacter.languages) > 0">
                    <div class="viewing" v-if="!isEditingLanguages">
                      <ul v-for="(item, key) in newCharacter.languages" :key="key">
                        <li class="inline">
                          <label><strong>{{ key }}</strong>:</label>
                          <p>{{ item }}</p>
                        </li>
                      </ul>
                    </div>

                    <div class="editing-languages" v-if="isEditingLanguages">
                      <ul v-for="(item, key) in newCharacter.languages" :key="key">
                        <li class="inline">
                          <label><strong>{{ key }}</strong>:</label>
                          <select v-model="newCharacter.languages[key]">
                            <option v-for="prof in LANGUAGE_PROFICIENCY" :key="prof" :value="prof">{{ prof }}</option>
                          </select>
                        </li>

                        <li class="container-update-delete">
                          <button class="button-delete" @click="onPressDeleteStat(key, CHARACTER_KEYS.LANGUAGES)">Delete</button>
                        </li>

                        <li>
                          <hr class="list-divider">
                        </li>
                      </ul>
                    </div>
                  </template>
                </div>
              </collapse-transition>
            </div>

            
          </section> 
          <hr>

          <br>
          <section id="proficiencies">
            <header>
              <div class="spacer">
                <button class="button-edit" v-if="!isEditingProficiencies" @click="toggleEditForSection(CHARACTER_SECTIONS.PROFICIENCIES)">Edit</button>
                <button class="button-edit" v-if="isEditingProficiencies" @click="toggleEditForSection(CHARACTER_SECTIONS.PROFICIENCIES)">Finish</button>
              </div>

              <div class="section-title">
                <h2 @click="toggleCollapseForSection(CHARACTER_SECTIONS.PROFICIENCIES)">{{ CHARACTER_SECTIONS.PROFICIENCIES }}</h2>
                <font-awesome-icon icon="chevron-up" class="collapse-chevron" v-if="!isShowingProficiencies"/>
                <font-awesome-icon icon="chevron-down" class="collapse-chevron" v-if="isShowingProficiencies"/>
              </div>

              <div>
                <button class="button-edit" v-if="!isEditingProficiencies" @click="toggleEditForSection(CHARACTER_SECTIONS.PROFICIENCIES)">Edit</button>
                <button class="button-edit" v-if="isEditingProficiencies" @click="toggleEditForSection(CHARACTER_SECTIONS.PROFICIENCIES)">Finish</button>
              </div>
            </header>

            <collapse-transition dimension="height">
              <div v-if="isShowingProficiencies">
                <template v-if="isEditingProficiencies">
                  <div class="editing">
                    <ul>
                      <li>
                        <input class="name" v-model="proficiencyTempName" placeholder="New proficiency name"> 
                      </li>
                    </ul>
                    
                    <br>
                    <textarea v-model="proficiencyTempDescription" rows="6" placeholder="Description"></textarea>
                    
                    <br>
                    <button class="button-add" @click="onPressAddProficiency">Add</button>

                    <hr>
                  </div>
                </template>

                <template v-if="getDictionarySize(newCharacter.proficiencies) > 0">
                  <div class="viewing" v-if="!isEditingProficiencies">
                    <ul v-for="(item, key) in newCharacter.proficiencies" :key="key">
                      <li>
                        <label class="name-and-count"><strong>{{ key }}</strong></label>
                        <p class="description">{{ item }}</p>
                      </li>
                    </ul>
                  </div>

                  <div class="editing" v-if="isEditingProficiencies">
                    <ul v-for="(item, key) in newCharacter.proficiencies" :key="key">
                      <li>
                        <label><strong>{{ key }}</strong></label>
                      </li>

                      <br>
                      <textarea v-model="newCharacter.proficiencies[key]" rows="6" placeholder="Description"></textarea>

                      <li class="container-update-delete">
                        <button class="button-delete" @click="onPressDeleteStat(key, CHARACTER_KEYS.PROFICIENCIES)">Delete</button>
                      </li>

                      <li>
                        <hr class="list-divider">
                      </li>
                    </ul>
                  </div>
                </template>
              </div>
            </collapse-transition>
            
          </section>
          <hr>

          <br>
          <section id="spell-slots">
            <header>
              <div class="spacer">
                <button class="button-edit" v-if="!isEditingSpellSlots" @click="toggleEditForSection(CHARACTER_SECTIONS.SPELL_SLOTS)">Edit</button>
                <button class="button-edit" v-if="isEditingSpellSlots" @click="toggleEditForSection(CHARACTER_SECTIONS.SPELL_SLOTS)">Finish</button>
              </div>

              <div class="section-title">
                <h2 @click="toggleCollapseForSection(CHARACTER_SECTIONS.SPELL_SLOTS)">{{ CHARACTER_SECTIONS.SPELL_SLOTS }}</h2>
                <font-awesome-icon icon="chevron-up" class="collapse-chevron" v-if="!isShowingSpellSlots"/>
                <font-awesome-icon icon="chevron-down" class="collapse-chevron" v-if="isShowingSpellSlots"/>
              </div>

              <div>
                <button class="button-edit" v-if="!isEditingSpellSlots" @click="toggleEditForSection(CHARACTER_SECTIONS.SPELL_SLOTS)">Edit</button>
                <button class="button-edit" v-if="isEditingSpellSlots" @click="toggleEditForSection(CHARACTER_SECTIONS.SPELL_SLOTS)">Finish</button>
              </div>
            </header>

            <collapse-transition dimension="height">
              <div v-if="isShowingSpellSlots">
                <template v-if="isEditingSpellSlots">
                  <div class="editing">
                    <ul>
                      <li>
                        <p>Level:</p>
                        <select v-model="spellSlotTempLevel">
                          <option v-for="level in SPELL_CASTING_LEVELS" :key="level" :value="level">{{ SPELL_SLOT_NAMES_PICKER[level] }}</option>
                        </select>
                      </li>

                      <li>
                        <label># of slots:</label>
                        <select v-model="spellSlotTempSlots">
                          <option v-for="level in SPELL_CASTING_LEVELS" :key="level" :value="SPELL_SLOT_NAMES_PICKER[level]">{{ SPELL_SLOT_NAMES_PICKER[level] }}</option>
                        </select>
                      </li>
                    </ul>

                    <br>
                    <button class="button-add" @click="onPressAddSpellSlot">Add</button>

                    <hr>
                  </div>
                </template>

                <template v-if="getDictionarySize(newCharacter.spellSlots) > 0">
                  <div class="viewing" v-if="!isEditingSpellSlots">
                    <ul v-for="(item, key) in newCharacter.spellSlots" :key="key">
                      <li class="inline">
                        <label><strong>{{ SPELL_CASTING_NAMES[key] }}</strong>:</label>
                        <label>{{ item[SPELL_SLOT_KEYS.MAX] }} slot(s)</label>
                      </li>
                    </ul>
                  </div>

                  <div class="editing" v-if="isEditingSpellSlots">
                    <ul v-for="(item, key) in newCharacter.spellSlots" :key="key">
                      <li>
                        <label><strong>{{ SPELL_CASTING_NAMES[key] }}</strong></label>
                      </li>

                      <li>
                        <label># of slots:</label>
                        <select v-model="item[SPELL_SLOT_KEYS.MAX]">
                          <option v-for="level in SPELL_CASTING_LEVELS" :key="level" :value="SPELL_SLOT_NAMES_PICKER[level]">{{ SPELL_SLOT_NAMES_PICKER[level] }}</option>
                        </select>
                      </li>

                      <li class="container-update-delete">
                        <button class="button-delete" @click="onPressDeleteStat(key, CHARACTER_KEYS.SPELL_SLOTS)">Delete</button>
                      </li>

                      <li>
                        <hr class="list-divider">
                      </li>
                    </ul>
                  </div>
                </template>
              </div>
            </collapse-transition>
          </section>
          <hr>

          <br>
          <section id="spell-casting">
            <header>
              <div class="spacer">
                <button class="button-edit" v-if="!isEditingSpellCasting" @click="toggleEditForSection(CHARACTER_SECTIONS.SPELL_CASTING)">Edit</button>
                <button class="button-edit" v-if="isEditingSpellCasting" @click="toggleEditForSection(CHARACTER_SECTIONS.SPELL_CASTING)">Finish</button>
              </div>

              <div class="section-title">
                <h2 @click="toggleCollapseForSection(CHARACTER_SECTIONS.SPELL_CASTING)">{{ CHARACTER_SECTIONS.SPELL_CASTING }}</h2>
                <font-awesome-icon icon="chevron-up" class="collapse-chevron" v-if="!isShowingSpells"/>
                <font-awesome-icon icon="chevron-down" class="collapse-chevron" v-if="isShowingSpells"/>
              </div>

              <div>
                <button class="button-edit" v-if="!isEditingSpellCasting" @click="toggleEditForSection(CHARACTER_SECTIONS.SPELL_CASTING)">Edit</button>
                <button class="button-edit" v-if="isEditingSpellCasting" @click="toggleEditForSection(CHARACTER_SECTIONS.SPELL_CASTING)">Finish</button>
              </div>
            </header>

            <collapse-transition dimension="height">
              <div v-if="isShowingSpells">
                <template v-if="isEditingSpellCasting">
                  <div class="editing">
                    <ul>
                      <li>
                        <input class="name" type="text" v-model="spellTempName" placeholder="New spell name"> 
                      </li>

                      <li>
                        <label for="spells-level">Level:</label>
                        <select v-model="spellTempLevel">
                          <option v-for="levels in SPELL_CASTING_LEVELS" :key="levels" :value="levels">{{ SPELL_CASTING_NAMES_PICKER[levels] }}</option>
                        </select>
                      </li>
                        
                      <li>
                        <label for="spells-casting-time">Cast Time (# of actions):</label>
                        <input type="number" id="spells-casting-time" v-model="spellTempCastingTime" inputmode="numeric" required>
                      </li>

                      <li>
                        <label>Duration:</label>

                        <div>
                          <input type="number" v-model="spellTempDuration" inputmode="numeric" required :class="{ 'disabled-button': spellTempDurationType == [SPELL_CASTING_DURATION_TYPES.INSTANT]}">
                          
                          <select v-model="spellTempDurationType">
                            <option v-for="dType in SPELL_CASTING_DURATION_TYPES" :key="dType" :value="dType">{{ dType }}</option>
                          </select>
                        </div>
                      </li>

                      <li>
                        <label for="spells-range">Range (in feet):</label>
                        <input type="number" id="spells-range" v-model="spellTempRange" inputmode="numeric" required>
                      </li>

                      <br>
                      <textarea v-model="spellTempDescription" rows="6" placeholder="Description"></textarea>
                    </ul>

                    <br>
                    <button class="button-add" @click="onPressAddSpell">Add</button>

                    <hr>
                  </div>
                </template>

                <template v-if="getDictionarySize(newCharacter.spells) > 0">
                  <div class="viewing-spells" v-if="!isEditingSpellCasting">
                    <ul v-for="(levelDict, level) in newCharacter.spells" :key="level">
                      <template v-if="getDictionarySize(levelDict) > 0">
                        <li class="spell-level">
                          <label><strong>{{ SPELL_CASTING_NAMES[level] }}</strong></label>
                        </li>

                        <ul v-for="(spell, spellName) in levelDict" :key="spellName">
                          <li class="spell-name">
                            <label><strong>{{ spellName }}</strong></label>
                          </li>

                          <li>
                            <label>Cast Time:</label>
                            <label>{{ spell[[SPELL_CASTING_KEYS.CASTING_TIME]] }} action(s)</label>
                          </li>

                          <li>
                            <label>Duration:</label>
                            <label>{{ spell[[SPELL_CASTING_KEYS.DURATION]] }} {{ spell[[SPELL_CASTING_KEYS.DURATION_TYPE]] }}</label>
                          </li>

                          <li>
                            <label>Range:</label>
                            <label>{{ spell[[SPELL_CASTING_KEYS.RANGE]] }} ft</label>
                          </li>

                          <li>
                            <p class="description">{{ spell[[SPELL_CASTING_KEYS.DESCRIPTION]] }}</p>
                          </li>
                        </ul>
                      </template>
                      
                      <!-- Show the divider after every spell level -->
                      <li>
                        <hr class="list-divider">
                      </li>
                    </ul>
                  </div>
                  
                  <div class="editing-spells" v-if="isEditingSpellCasting">
                    <ul v-for="(levelDict, level) in newCharacter.spells" :key="level">
                      <template v-if="getDictionarySize(levelDict) > 0">
                        <li class="spell-level">
                          <label><strong>{{ SPELL_CASTING_NAMES[level] }}</strong></label>
                        </li>

                        <ul v-for="(spell, spellName) in levelDict" :key="spellName">
                          <li class="spell-name">
                            <label><strong>{{ spellName }}</strong></label>
                          </li>

                          <li>
                            <label for="spells-casting-time">Cast Time (# of actions):</label>
                            <input type="number" id="spells-casting-time" v-model="spell[SPELL_CASTING_KEYS.CASTING_TIME]" inputmode="numeric" required>
                          </li>

                          <li>
                            <label>Duration:</label>
                            
                            <div>
                              <input type="number" id="spells-casting-duration" v-model="spell[SPELL_CASTING_KEYS.DURATION]" inputmode="numeric" required :class="{ 'disabled-button': spellTempDurationType == [SPELL_CASTING_DURATION_TYPES.INSTANT]}">

                              <select v-model="spell[SPELL_CASTING_KEYS.DURATION_TYPE]">
                                <option v-for="dType in SPELL_CASTING_DURATION_TYPES" :key="dType" :value="dType">{{ dType }}</option>
                              </select>
                            </div>
                          </li>
                          
                          <li>
                            <label for="spells-range">Range (in feet):</label>
                            <input type="number" id="spells-range" v-model="spell[SPELL_CASTING_KEYS.RANGE]" inputmode="numeric" required>
                          </li>
                              
                          <br>
                          <textarea v-model="spell[SPELL_CASTING_KEYS.DESCRIPTION]" rows="6" placeholder="Description"></textarea>

                          <li class="container-update-delete">
                            <button class="button-delete" @click="onPressDeleteSpell(level, spellName, CHARACTER_KEYS.SPELLS)">Delete</button>
                          </li>
                        </ul>
                      </template>
                      
                      <!-- Show the divider after every spell level -->
                      <li>
                        <hr class="list-divider">
                      </li>
                    </ul>
                  </div>
                </template>
              </div>
            </collapse-transition>
          </section>
        </main>
      </div>
    </transition>

    <br>
    <button id="create-character" class="button-create-character" @click="createCharacter" :class="{ 'disabled-button': !canCreateCharacter() }">Create Character</button>

  </div>
</template>

<script>
import { useStore } from 'vuex'
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue';
import Character from '@/models/character'
import { CHARACTER_SECTIONS } from "@/enums/character-sections"
import { DIE_TYPE } from '@/enums/die-type'
import { EQUIPMENT_KEYS } from '@/enums/dbKeys/equipment-keys.js'
import { FEATURES_KEYS } from '@/enums/dbKeys/features-keys.js'
import { LANGUAGE_PROFICIENCY } from '@/enums/language-proficiency'
import { ACTION_TYPES }  from '@/enums/action-types'
import { FEATURES_TYPES } from '@/enums/features-types'
import { ALIGNMENT_TYPES } from '@/enums/alignment-types'
import { CLASS_NAMES } from '@/enums/dbKeys/class-keys.js'
import { CHARACTER_KEYS } from '@/enums/dbKeys/character-keys.js'
import { HP_KEYS } from '@/enums/dbKeys/hp-keys.js'
import { DEATH_SAVES_KEYS } from '@/enums/dbKeys/death-saves-keys.js'
import { SKILL_KEYS, SKILL_NAMES, SKILL_NAME_SCORES, SKILL_MODS } from '@/enums/dbKeys/skill-keys.js'
import { STAT_KEYS, STAT_VALUES_KEYS, STAT_NAMES } from '@/enums/dbKeys/stat-keys.js'
import { SPELL_CASTING_KEYS, SPELL_CASTING_LEVELS, SPELL_CASTING_NAMES, SPELL_CASTING_NAMES_PICKER, SPELL_SLOT_NAMES_PICKER, SPELL_CASTING_DURATION_TYPES } from '@/enums/dbKeys/spell-casting-keys'
import { SPELL_SLOT_KEYS } from '@/enums/dbKeys/spell-slot-keys'
import { WEAPON_KEYS, WEAPON_CATEGORY, WEAPON_PROPERTY, WEAPON_NAMES } from '@/enums/dbKeys/weapons-keys' 

// TODO: Will be replaced by Firebase Remote Config
const MAX_VALUES = {
  LEVEL: 20,
  SCORES: 20,
}


export default {
  components: {
    CollapseTransition
  },
  data() {
    return {
      store: useStore(),
      isEditingFeaturesTraits: true,
      isEditingWeapons: true,
      isEditingEquipment: true,
      isEditingTreasure: true,
      isEditingLanguages: true,
      isEditingProficiencies: true,
      isEditingSpellCasting: true,
      isEditingSpellSlots: true,
      isShowingCharacterInfo: true,
      isShowingAbilityScores: true,
      isShowingSavingThrows: true,
      isShowingSkills: true,
      isShowingFeatures: true,
      isShowingWeapons: true,
      isShowingEquipment: true,
      isShowingTreasure: true,
      isShowingLanguages: true,
      isShowingProficiencies: true,
      isShowingSpells: true,
      isShowingSpellSlots: true,
      isShowingJumpToMenu: false,
      usersCharacters: {},
      CHARACTER_SECTIONS: CHARACTER_SECTIONS,
      ACTION_TYPES: ACTION_TYPES,
      ALIGNMENT_TYPES: ALIGNMENT_TYPES,
      CHARACTER_KEYS: CHARACTER_KEYS,
      CLASS_NAMES: CLASS_NAMES,
      DEATH_SAVES_KEYS: DEATH_SAVES_KEYS,
      DIE_TYPE: DIE_TYPE,
      EQUIPMENT_KEYS: EQUIPMENT_KEYS,
      FEATURES_KEYS: FEATURES_KEYS,
      FEATURES_TYPES: FEATURES_TYPES,
      HP_KEYS: HP_KEYS,
      LANGUAGE_PROFICIENCY: LANGUAGE_PROFICIENCY,
      MAX_VALUES: MAX_VALUES,
      STAT_KEYS: STAT_KEYS,
      STAT_VALUES_KEYS: STAT_VALUES_KEYS,
      STAT_NAMES: STAT_NAMES,
      SKILL_KEYS: SKILL_KEYS,
      SKILL_NAMES: SKILL_NAMES,
      SKILL_MODS: SKILL_MODS,
      SPELL_CASTING_KEYS: SPELL_CASTING_KEYS,
      SPELL_CASTING_LEVELS: SPELL_CASTING_LEVELS,
      SPELL_CASTING_NAMES: SPELL_CASTING_NAMES,
      SPELL_CASTING_NAMES_PICKER: SPELL_CASTING_NAMES_PICKER,
      SKILL_NAME_SCORES: SKILL_NAME_SCORES,
      SPELL_SLOT_KEYS: SPELL_SLOT_KEYS,
      SPELL_SLOT_NAMES_PICKER: SPELL_SLOT_NAMES_PICKER,
      SPELL_CASTING_DURATION_TYPES: SPELL_CASTING_DURATION_TYPES,
      WEAPON_KEYS: WEAPON_KEYS,
      WEAPON_CATEGORY: WEAPON_CATEGORY,
      WEAPON_PROPERTY: WEAPON_PROPERTY,
      WEAPON_NAMES: WEAPON_NAMES,
      WEAPON_MODS: ['', STAT_KEYS.STRENGTH, STAT_KEYS.DEXTERITY, STAT_KEYS.CONSTITUTION, STAT_KEYS.INTELLIGENCE, STAT_KEYS.WISDOM, STAT_KEYS.CHARISMA],
      newCharacter: new Character(),
      equipmentTempName: '',
      equipmentTempAmount: '',
      equipmentTempDescription: '',
      featuresTempName: '',
      featuresTempDescription: '',
      featuresTempType: '', // Racial, Class, Other
      featuresTempAction: '', // Action, Bonus, Reaction, None
      featuresTempUseable: true,
      featuresTempUses: '',
      languagesTempName: '',
      languagesTempProficiency: '',
      proficiencyTempName: '',
      proficiencyTempDescription: '',
      spellTempName: '',
      spellTempCastingTime: '',
      spellTempDescription: '',
      spellTempDuration: '',
      spellTempDurationType: '', // instant, seconds, minutes, hours
      spellTempRange: '', // in feet
      spellTempLevel: '',
      spellSlotTempLevel: '',
      spellSlotTempSlots: '',
      treasureTempName: '',
      treasureTempAmount: '',
      treasureTempDescription: '',
      weaponTempName: '',
      weaponTempCategory: '', // e.g. finesse
      weaponTempAmount: '',
      weaponsTempAttackModifier: '', // e.g. dex
      weaponTempDieType: '', // e.g. d8
      weaponTempIsProficient: false,
      weaponTempProperties: '', // e.g. finesse, light
      weaponTempDescription: '',
    }
  },
  mounted() {

  },
  watch: {
    'newCharacter.hp.max': function(newValue) {
      this.newCharacter.hp[HP_KEYS.CURRENT] = newValue
    },
    'newCharacter.hp.dieAmountMax': function(newValue) {
      this.newCharacter.hp[HP_KEYS.DIE_AMOUNT_CURR] = newValue
    },
    'spellTempDurationType': function(newValue) {
      if (newValue === SPELL_CASTING_DURATION_TYPES.INSTANT) {
        this.spellTempDuration = 0
      } else {
        if (this.spellTempDuration === 0) {
          this.spellTempDuration = ''
        }
      }
    },
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    openJumpToMenu() {
      this.isShowingJumpToMenu = !this.isShowingJumpToMenu
    },
    scrollToSection(sectionId) {
      this.isShowingJumpToMenu = false; // Close the jump-to menu after clicking a link
      const sectionElement = document.getElementById(sectionId);
      if (sectionElement) {
        const sectionTop = sectionElement.getBoundingClientRect().top;
        const adjustedScrollTop = sectionTop + window.scrollY - 80;
        window.scrollTo({ top: adjustedScrollTop, behavior: 'smooth' });
      }
    },
    onPressAddFeatures() {
      if (this.featuresTempName === '') {
        alert("Please enter a feature name")
        return
      }

      if (this.featuresTempType === '') {
        alert("Please select a feature type")
        return
      }

      if (this.featuresTempUses === '') {
        alert("Please enter feature uses")
        return
      }

      const newFeat = {
        [FEATURES_KEYS.ACTION]: this.featuresTempAction,
        [FEATURES_KEYS.DESCRIPTION]: this.featuresTempDescription,
        [FEATURES_KEYS.TYPE]: this.featuresTempType,
        [FEATURES_KEYS.USES]: parseInt(this.featuresTempUses)
      }
      

      this.newCharacter.featuresTraits[this.featuresTempName] = newFeat

      this.featuresTempName = ''
      this.featuresTempAction = ''
      this.featuresTempDescription = ''
      this.featuresTempType = ''
      this.featuresTempUses = ''
    },
    onPressAddWeapon() {
      if (this.weaponTempName === '') {
        alert("Please enter a weapon name")
        return
      }

      if (this.weaponTempAmount === '') {
        alert("Please enter a weapon amount")
        return
      }

      if (this.weaponTempDieType === '') {
        alert("Please enter a weapon die")
        return
      }

      if (this.weaponTempCategory === '') {
        alert("Please enter a weapon category")
        return
      }

      if (this.weaponTempIsProficient == '') {
        this.weaponTempIsProficient = false
      }

      const newItem = {
        [WEAPON_KEYS.AMOUNT]: parseInt(this.weaponTempAmount),
        [WEAPON_KEYS.ATTACK_DAMAGE_STAT]: this.weaponsTempAttackModifier,
        [WEAPON_KEYS.CATEGORY]: this.weaponTempCategory,
        [WEAPON_KEYS.DESCRIPTION]: this.weaponTempDescription,
        [WEAPON_KEYS.DIE]: this.weaponTempDieType,
        [WEAPON_KEYS.PROFICIENT]: this.weaponTempIsProficient,
      }      

      this.newCharacter.weapons[this.weaponTempName] = newItem
      
      this.weaponTempName = ''
      this.weaponTempAmount = ''
      this.weaponsTempAttackModifier = ''
      this.weaponTempCategory = ''
      this.weaponsTempDamageModifier = ''
      this.weaponTempDescription = ''
      this.weaponTempDieType = ''
      this.weaponTempIsProficient = ''
      this.weaponTempProperties = ''
    },
    onPressAddEquipment() {
      if (this.equipmentTempName === '') {
        alert("Please enter an equipment name")
        return
      }

      if (this.equipmentTempAmount === '') {
        alert("Please enter an equipment amount")
        return
      }

      const newItem = {
        [EQUIPMENT_KEYS.AMOUNT]: parseInt(this.equipmentTempAmount),
        [EQUIPMENT_KEYS.DESCRIPTION]: this.equipmentTempDescription
      }

      this.newCharacter.equipment[this.equipmentTempName] = newItem
      
      this.equipmentTempName = ''
      this.equipmentTempAmount = ''
      this.equipmentTempDescription = ''
    },
    onPressAddTreasure() {
      if (this.treasureTempName === '') {
        alert("Please enter an treasure name")
        return
      }

      if (this.treasureTempAmount === '') {
        alert("Please enter an treasure amount")
        return
      }

      const newItem = {
        [EQUIPMENT_KEYS.AMOUNT]: parseInt(this.treasureTempAmount),
        [EQUIPMENT_KEYS.DESCRIPTION]: this.treasureTempDescription
      }

      this.newCharacter.treasures[this.treasureTempName] = newItem
      
      this.treasureTempName = ''
      this.treasureTempAmount = ''
      this.treasureTempDescription = ''
    },
    onPressAddLanguage() {
      if (this.languagesTempName === '') {
        alert("Please enter a language")
        return
      }

      if (this.languagesTempProficiency === '') {
        alert("Please select a language proficiency")
        return
      }

      this.newCharacter.languages[this.languagesTempName] = this.languagesTempProficiency
      
      this.languagesTempName = ''
      this.languagesTempProficiency = ''
    },
    onPressAddProficiency() {
      if (this.proficiencyTempName == '') {
        alert("Please enter a proficiency name")
        return 
      }

      if (this.proficiencyTempDescription === '') {
        alert("Please enter a proficiency description")
        return
      }

      this.newCharacter.proficiencies[this.proficiencyTempName] = this.proficiencyTempDescription
      
      this.proficiencyTempName = ''
      this.proficiencyTempDescription = ''
    },
    onPressAddSpellSlot() {
      if (this.spellSlotTempLevel === '') {
        alert("Selected a spell level")
        return
      }

      if (this.spellSlotTempSlots === '') {
        alert("Enter slot amount")
        return
      }

      const slot = {
        [SPELL_SLOT_KEYS.CURRENT]: parseInt(this.spellSlotTempSlots),
        [SPELL_SLOT_KEYS.MAX]: parseInt(this.spellSlotTempSlots),
      }
      
      this.newCharacter.spellSlots[this.spellSlotTempLevel] = slot
      
      this.spellSlotTempLevel = ''
      this.spellSlotTempSlots = ''
    },
    onPressAddSpell() {
      if (this.spellTempName === '') {
        alert("Please enter a Spell Name")
        return
      }

      if (this.spellTempLevel === '') {
        alert("Please enter a Spell Level")
        return
      }

      if (this.spellTempCastingTime === '' || this.spellTempCastingTime <= 0) {
        alert("Please enter a Casting Time")
        return
      }

      if (this.spellTempDuration === '' || this.spellTempDuration < 0) {
        alert("Please enter a Casting Duration")
        return
      }

      if (this.spellTempDurationType === '') {
        alert("Please enter a Casting Duration Type")
        return
      }

      if (this.spellTempRange === '' || this.spellTempRange <= 0) {
        alert("Please enter a Casting Range")
        return
      }


      const newSpell = {
        [SPELL_CASTING_KEYS.CASTING_TIME]: parseInt(this.spellTempCastingTime),
        [SPELL_CASTING_KEYS.DESCRIPTION]: this.spellTempDescription,
        [SPELL_CASTING_KEYS.DURATION]: parseInt(this.spellTempDuration),
        [SPELL_CASTING_KEYS.DURATION_TYPE]: this.spellTempDurationType,
        [SPELL_CASTING_KEYS.RANGE]: parseInt(this.spellTempRange)
      }
      
      if (this.spellTempLevel in this.newCharacter.spells) {
        // If there's a level key already in the dictionary
        this.newCharacter.spells[this.spellTempLevel][this.spellTempName] = newSpell
        
      } else {
        // If there's a new entry for the level key
        const newEntry = {
          [this.spellTempName]: newSpell
        }

        this.newCharacter.spells[this.spellTempLevel] = newEntry
      }
      
      this.spellTempName = ''
      this.spellTempLevel = ''
      this.spellTempCastingTime = ''
      this.spellTempDescription = ''
      this.spellTempDuration = ''
      this.spellTempDurationType = ''
      this.spellTempRange = ''
    },
    onPressDeleteStat(key, statRef) {
      if (key in this.newCharacter[statRef]) {
        delete this.newCharacter[statRef][key]
      }
    },
    onPressDeleteSpell(level, spellName) {
      if (level in this.newCharacter.spells) {
        const levelDict = this.newCharacter.spells[level]
        if (spellName in levelDict) {
          delete this.newCharacter.spells[level][spellName]

          // If there's nothing left in the level 
          if (this.getDictionarySize(levelDict) == 0) {
            delete this.newCharacter.spells[level]
          }
        }
      }
    },
    canCreateCharacter() {
      return this.isValidCharacterInfo() && this.isValidAbilityScores()
    },
    isValidCharacterInfo() {
      if (this.newCharacter.name == '') {
        return false
      }

      if (this.newCharacter.background == '') {
        return false
      }

      if (this.newCharacter.race == '') {
        return false
      }

      if (this.newCharacter.alignment == '') {
        return false
      }

      if (this.newCharacter.class == '') {
        return false
      }

      if (this.newCharacter.armor == '') {
        return false
      }

      if (this.newCharacter.speed == '') {
        return false
      }

      if (this.newCharacter.hp[HP_KEYS.MAX] == '') {
        return false
      }

      if (this.newCharacter.hp[HP_KEYS.DIE] == '') {
        return false
      }

      if (this.newCharacter.hp[HP_KEYS.DIE_AMOUNT_MAX] == '') {
        return false
      }
      
      if (this.newCharacter.spellCastStat == '') {
        return false
      }

      return true
    },
    isValidAbilityScores() {
      if (this.newCharacter.scores[STAT_KEYS.STRENGTH].value > MAX_VALUES.SCORES) {
        return false
      }

      if (this.newCharacter.scores[STAT_KEYS.DEXTERITY].value > MAX_VALUES.SCORES) {
        return false
      }

      if (this.newCharacter.scores[STAT_KEYS.CONSTITUTION].value > MAX_VALUES.SCORES) {
        return false
      }

      if (this.newCharacter.scores[STAT_KEYS.INTELLIGENCE].value > MAX_VALUES.SCORES) {
        return false
      }

      if (this.newCharacter.scores[STAT_KEYS.WISDOM].value > MAX_VALUES.SCORES) {
        return false
      }

      if (this.newCharacter.scores[STAT_KEYS.CHARISMA].value > MAX_VALUES.SCORES) {
        return false
      }

      return true
    },
    createCharacter() {
      if (this.canCreateCharacter()) {
        this.store.dispatch("addCharacterToDb", this.newCharacter).then((success => {
          if (success) {
            alert(`Created new character, ${this.newCharacter.name}!`)
            this.$emit('close'); // Tell parent to close this modal
          } else {
            alert("An error occurred creating your character. Please try again")
          }
        }))
      }
    },
    calculatePassivePerception() {
      const result = 10 + this.newCharacter.scores[STAT_KEYS.WISDOM].calculateMod()
      return result
    },
    calculateBaseStatBonus(stat) {
      return (stat - 10) / 2
    },
    calculateSpellSavingDc(abilityScore) {
      let profBonus = this.getProficiencyBonus()

      if (abilityScore === undefined) {
        return 8 + profBonus
      }
      
      return 8 + profBonus + abilityScore.calculateMod()
    },
    getDictionarySize(dict) {
      if (dict) {
        const count = Object.keys(dict).length;
        return count
      } else {
        return 0
      }
    },
    getStatModFromKey(stat) {
      if (stat === '') {
        return 0
      } else {
        return this.newCharacter.scores[stat].calculateMod()
      }
      
    },
    getStatBonusSign(stat) {
      if (stat < 0) {
        return stat // the negative will already be apart of the number
      } else {
        return "+" + stat
      }
    },
    getProficiencyBonus() {
      let charLevel = this.newCharacter.level
      if (charLevel <= 4) {
        return 2
      } else if (charLevel <= 8) {
        return 3
      } else if (charLevel <= 12) {
        return 4
      } else if (charLevel <= 16) {
        return 5
      } else {
        return 6
      }
    },
    toggleCollapseForSection(section) {
      switch (section) {
        case CHARACTER_SECTIONS.CHARACTER_INFO:
          this.isShowingCharacterInfo = !this.isShowingCharacterInfo
          break

        case CHARACTER_SECTIONS.ABILITY_SCORES:
          this.isShowingAbilityScores = !this.isShowingAbilityScores
          break

        
        case CHARACTER_SECTIONS.SAVING_THROWS:
          this.isShowingSavingThrows = !this.isShowingSavingThrows
          break

        
        case CHARACTER_SECTIONS.SKILLS:
          this.isShowingSkills = !this.isShowingSkills
          break

        
        case CHARACTER_SECTIONS.FEATURES_TRAITS:
          this.isShowingFeatures = !this.isShowingFeatures
          break

        
        case CHARACTER_SECTIONS.WEAPONS:
          this.isShowingWeapons = !this.isShowingWeapons
          break

        
        case CHARACTER_SECTIONS.EQUIPMENT:
          this.isShowingEquipment = !this.isShowingEquipment
          break

        
        case CHARACTER_SECTIONS.TREASURES:
          this.isShowingTreasure = !this.isShowingTreasure
          break

        
        case CHARACTER_SECTIONS.LANGUAGES:
          this.isShowingLanguages = !this.isShowingLanguages
          break

        
        case CHARACTER_SECTIONS.PROFICIENCIES:
          this.isShowingProficiencies = !this.isShowingProficiencies
          break

        
        case CHARACTER_SECTIONS.SPELL_CASTING:
          this.isShowingSpells = !this.isShowingSpells
          break

        case CHARACTER_SECTIONS.SPELL_SLOTS:
          this.isShowingSpellSlots = !this.isShowingSpellSlots
          break          
      }
    },
    toggleEditForSection(section) {
      switch (section) {
        case CHARACTER_SECTIONS.CHARACTER_INFO:
          this.isEditingCharInfo = !this.isEditingCharInfo
          break

        case CHARACTER_SECTIONS.ABILITY_SCORES:
          this.isEditingAbilityScores = !this.isEditingAbilityScores
          break

        case CHARACTER_SECTIONS.SAVING_THROWS:
          this.isEditingSavingThrows = !this.isEditingSavingThrows
          break

        case CHARACTER_SECTIONS.SKILLS:
          this.isEditingSkills = !this.isEditingSkills
          break
        
        case CHARACTER_SECTIONS.FEATURES_TRAITS:
          this.isEditingFeaturesTraits = !this.isEditingFeaturesTraits
          break
        
        case CHARACTER_SECTIONS.WEAPONS:
          this.isEditingWeapons = !this.isEditingWeapons
          break

        case CHARACTER_SECTIONS.EQUIPMENT:
          this.isEditingEquipment = !this.isEditingEquipment
          break
        
        case CHARACTER_SECTIONS.TREASURES:
          this.isEditingTreasure = !this.isEditingTreasure
          break

        case CHARACTER_SECTIONS.LANGUAGES:
          this.isEditingLanguages = !this.isEditingLanguages
          break

        case CHARACTER_SECTIONS.PROFICIENCIES:
          this.isEditingProficiencies = !this.isEditingProficiencies
          break

        case CHARACTER_SECTIONS.SPELL_CASTING:
          this.isEditingSpellCasting = !this.isEditingSpellCasting
          break

        case CHARACTER_SECTIONS.SPELL_SLOTS:
          this.isEditingSpellSlots = !this.isEditingSpellSlots
          break
      }
    },
  }
}
</script>

<style scoped>

  h1 {
    font-size: 2.5em;
  }

  p {
    display: inherit;
    align-items: center;
    font-size: var(--stat-font-size);
  }

  ul {
    list-style: none;
  }

  /* Navigation Bar */
  nav {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: var(--light-gray);
    display: flex;
    justify-content: space-between;
    z-index: 9999; /* Ensure this is always on top */
  }

  nav button:disabled {
    opacity: 0.3;
  }

  nav .nav-bar-button {
    font-size: 20px;
    color: var(--white);
    margin: 10px;
    padding: 10px;
    border: none;
    border-radius: var(--border-radius);
    background-color: var(--dimgray);
  }

  nav .jump-to-menu {
    position: absolute;
    top: 100%; /* Position the menu below the button */
    background-color: var(--white);
    border-bottom: 3px solid dimgray; /* Add a border to the bottom */
    border-right: 3px solid dimgray; /* Add a border to the right */
    border-radius: var(--border-radius);
    max-height: 340px; /* Adjust the height as needed */
    overflow-y: auto;
  }

  nav .jump-to-menu ul {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 0;
    padding: 0;
    font-weight: bold;
    font-size: var(--stat-font-size);
  }

  nav .jump-to-menu li {
    border-bottom: 1px solid var(--gray); /* Add a border below each link */
    width: 100%;
    margin: 0;
    padding: 8px 16px;
  }

  nav .jump-to-menu p {
    margin: 0;
  }

  nav .jump-to-menu li:last-child {
    border-bottom: none; /* Remove the border on the last link */
  }


  /* Sections */
  section header {
    display: flex;
    justify-content: space-around;
  }

  section header .spacer {
    visibility: hidden;
  }

  section header .collapse-chevron {
    margin: 5px;
  }

  section .section-title {
    display: flex;
  }

  section ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 0;
  }

  section li {
    display: inherit;
    justify-content: space-between;
    width: 85%;
    margin: 5px 0;
    text-wrap: warp;
  }

  section li label {
    font-size: var(--stat-font-size);
  }

  section li input {
    width: 65px; /* Adjust the width as needed */
    margin-left: 5px; /* Adjust the spacing between the label and input */
    border: none; /* Remove the default border */
    border-bottom: 1px solid black; /* Add a bottom border */
    outline: none;
    text-align: center;
    padding-bottom: 5px;
    font-size: var(--stat-font-size);
  }

  section li select {
    font-size: var(--select-font-size);
    padding: 10px;
    /* background-color: white; */
    border: 1px solid black;
    color: black;
    border-radius: var(--border-radius);
  }

  section li .checkbox {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    padding: 0;
  }
  section li .mod {
    margin-left: 10px;
  }

  section li .skill-score {
    font-style: italic;
    font-size: var(--select-font-size);
  }

  section .viewing,
  section .editing {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  section .viewing p {
    font-size: var(--stat-font-size);
    margin: 5px 0;
  }

  .new-character .name,
  .editing .name {
    width: var(--width-close-to-mobile-screen);
    border: none; /* Remove the default border */
    border-bottom: 1px solid black; /* Add a bottom border */
    outline: none;
    text-align: center;
    margin: 10px auto;
    font-size: var(--stat-font-size);
  }

  .viewing ul li {
    display: inherit;
    flex-direction: column;
    padding: 0;
    width: var(--width-close-to-mobile-screen);
  }

  .viewing ul li div {
    display: flex;
    justify-content: space-between;
    text-align: left;
    margin: 5px 0;
  }

  .viewing .description {
    white-space: pre-wrap;
    text-align: left;
  }

  .viewing .inline {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .viewing p {
    align-items: center;
  }

  .viewing-spells .description {
    text-align: left;
    white-space: pre-wrap;
  }

  .editing ul li {
    display: flex;
    align-items: center;
    padding: 0;
    width: var(--width-close-to-mobile-screen);
  }

  .editing ul li:first-child label {
    margin: 0 auto;
  }

  .editing strong {
    margin-bottom: 10px;
    text-decoration: underline;
  }

  .editing textarea,
  .editing-spells textarea {
    width: var(--width-close-to-mobile-screen);
    padding: 10px;
    margin: 0 auto;
    /* font-family: var(--font-family-sans-serif); */
    font-size: var(--select-font-size);
    border-radius: var(--border-radius);
  }

  .editing button {
    font-size: 20px;
    color: var(--white);
    margin: 10px;
    padding: 10px;
    border: none;
    border-radius: var(--border-radius);
  }

  .editing .container-update-delete {
    display: flex;
    justify-content: space-evenly;
    margin: 10px auto;
  }

  .editing .languages strong {
    text-decoration: none;
  }

  .viewing-spells ul,
  .editing-spells ul,
  .editing-languages ul {
    width: 100%;
  }

  .viewing-spells li,
  .editing-spells li,
  .editing-languages li {
    display: flex;
    justify-content: space-between;
  }

  .editing-spells li label,
  .editing-languages li label {
    display: flex;
    align-items: center;
  }

  .viewing-spells .spell-level,
  .editing-spells .spell-level {
    text-decoration: underline;
    justify-content: center;
  }

  .editing-spells .container-update-delete,
  .editing-languages .container-update-delete {
    display: flex;
    justify-content: space-evenly;
    margin: 10px auto;
  }

  .button-edit {
    color: var(--white);
    padding: 5px 10px;
    margin-top: -5px;
    border: none;
    border-radius: var(--border-radius);
    background-color: var(--dimgray);
  }

  .container-update {
    display: flex;
    justify-content: center;
  }

  .container-update-delete {
    display: flex;
    justify-content: space-evenly;
  }

  .container-update button,
  .container-update-delete button {
    color: var(--white);
    padding: 5px 10px;
    margin-top: 10px;
    border: none;
    border-radius: var(--border-radius);
    font-size: var(--stat-font-size);
  }

  .button-delete {
    background-color: var(--red);
  }

  .button-add,
  .button-update,
  .button-backup {
    background-color: var(--blue);
  }

  .button-create-character {
    color: var(--white);
    padding: 5px 10px;
    margin-top: 10px;
    margin-bottom: 50px;
    border: none;
    border-radius: var(--border-radius);
    font-size: 2em;
    background-color: var(--blue);
  }

  .name-and-count {
    text-align: left;
    margin-right: 10px;
    word-wrap: normal;
  }

  .list-divider {
    width: var(--width-close-to-mobile-screen);
    margin: 5px auto;
    margin-top: -5px;
  }

  .disabled-button {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  #character-background {
    margin-top: 80px;
  }

  #character-background p {
    font-size: var(--stat-font-size);
    margin: 0;
  }

  #features-traits .viewing {
    text-align: start;
    width: 100%;
    margin: 0 auto;
    text-wrap: warp;
  }

  @media (prefers-color-scheme: dark) {
    nav {
      background-color: rgb(49, 49, 49);
    }

    nav .jump-to-menu {
      background-color: var(--black);
      border-radius: 0 0 var(--border-radius) 0;
    }

    section li input {
      background-color: var(--black);
      color: var(--white);
      border: none;
      border-bottom: 1px solid var(--white);
    }

    section li select {
      font-size: var(--select-font-size);
      padding: 10px;
      background-color: var(--black);
      border: 1px solid var(--white);
      color: var(--white);
      border-radius: var(--border-radius);
    }

    .new-character .name,
    .editing .name {
      width: var(--width-close-to-mobile-screen);
      border: none; /* Remove the default border */
      border-bottom: 1px solid var(--white); /* Add a bottom border */
      color: var(--white);
      outline: none;
      text-align: center;
      margin: 10px auto;
      font-size: var(--stat-font-size);
    }


    .editing textarea,
    .editing-spells textarea {
      width: var(--width-close-to-mobile-screen);
      padding: 10px;
      margin: 0 auto;
      font-size: var(--select-font-size);
      border-color: var(--white);
      border-radius: var(--border-radius);
      background-color: var(--black);
      color: var(--white);
    }

    .body {
      background-color: black;
      color: white;
    }
  }
</style>