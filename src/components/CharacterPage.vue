<template>
  <div class="body">
    <!-- Character Page -->
    <transition name="slide-up" mode="out-in">
      <div v-if="!isShowingBackup">
        <header :class="{ 'disabled-page': isPopupOpen() }">
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

                  <li @click="scrollToSection('save-delete-buttons')">
                    <p>Backup Character</p>
                  </li>
                </ul>
              </div>
            </template>
            <button class="nav-bar-button" @click="closeModal">Close</button>
          </nav>

          <section id="character-background">
            <h1>{{ characterToView.name }}</h1>
            <p>{{ characterToView.class }}</p>
            <p>{{ characterToView.background }}</p>
            <p>{{ characterToView.race }}</p>
            <p>{{ characterToView.alignment }}</p>
          </section>
        </header>

        <main v-if="characterToView.name !== ''" :class="{ 'disabled-page': isPopupOpen() }">
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

              <div>
                <button class="button-edit" v-if="!isEditingCharInfo" @click="toggleEditForSection(CHARACTER_SECTIONS.CHARACTER_INFO)">Edit</button>
                <button class="button-edit" v-if="isEditingCharInfo" @click="toggleEditForSection(CHARACTER_SECTIONS.CHARACTER_INFO)">Finish</button>
              </div>
            </header>

            <collapse-transition dimension="height">
              <div v-if="isShowingCharacterInfo"> 
                <div v-if="!isEditingCharInfo">
                  <ul>
                    <li>
                      <label>Level:</label>
                      <label><strong>{{ characterToView.level }}</strong></label>
                    </li>

                    <li>
                      <label>Armor Class: </label>
                      <label><strong>{{ characterToView.armor }}</strong></label>
                    </li>
                    
                    <li>
                      <label>Initiative: </label>
                      <label><strong>{{ getStatBonusSign(characterToView.scores[STAT_KEYS.DEXTERITY].calculateMod()) }}</strong></label>
                    </li>
                    
                    <li>
                      <label>Speed (ft): </label>
                      <label><strong>{{ characterToView.speed }}</strong></label>
                    </li>
                    
                    <li>
                      <label>Current HP: </label>
                      <label>{{ characterToView.hp[HP_KEYS.CURRENT] }}/<strong>{{ characterToView.hp[HP_KEYS.MAX] }}</strong></label>
                    </li>
                    
                    <li>
                      <label>Temp HP: </label>
                      <label><strong>{{ characterToView.hp[HP_KEYS.TEMP] }}</strong></label>
                    </li>
                    
                    <li>
                      <label>Hit die: </label>
                      <label><strong>{{ characterToView.hp[HP_KEYS.DIE] }}</strong></label>
                    </li>
                    
                    <li>
                      <label>Hit die count: </label>
                      <label>{{ characterToView.hp[HP_KEYS.DIE_AMOUNT_CURR] }}/<strong>{{ characterToView.hp[HP_KEYS.DIE_AMOUNT_MAX] }}</strong></label>
                    </li>
                    
                    <li>
                      <label>Death save successes: </label>
                      <label>{{ characterToView.deathSaves.successes }}/<strong>3</strong></label>
                    </li>
                    
                    <li>
                      <label>Death save failures: </label>
                      <label>{{ characterToView.deathSaves.failures }}/<strong>3</strong></label>
                    </li>
                    
                    <li>
                      <label>Proficiency Bonus: </label>
                      <label><strong>{{ getStatBonusSign(getProficiencyBonus()) }}</strong></label>
                    </li>
                    
                    <li>
                      <label>Passive Perception: </label>
                      <label><strong>{{ calculatePassivePerception() }}</strong></label>
                    </li>
                    
                    <li>
                      <label>Spell Casting Stat: </label>
                      <label><strong>{{ STAT_NAMES[characterToView.spellCastStat] }}</strong></label>
                    </li>
                    
                    <li>
                      <label>Spell Saving DC: </label>
                      <label><strong>{{ calculateSpellSavingDc(characterToView.scores[characterToView.spellCastStat].calculateMod()) }}</strong></label>
                    </li>
                    
                    <li>
                      <label>Inspiration: </label>
                      <label><strong>{{ characterToView.inspiration }}</strong></label>
                    </li>
                  </ul>
                </div>

                <div v-if="isEditingCharInfo">
                  <ul>
                    <li>
                      <label for="stats-level">Level:</label>
                      <input type="number" v-model="characterToView.level" inputmode="numeric" required>
                    </li>

                    <li>
                      <label for="stats-armor-class">Armor Class: </label>
                      <input type="number" id="stats-armor-class" v-model="characterToView.armor" inputmode="numeric" required>
                    </li>

                    <li>
                      <label for="stats-initiative">Initiative: </label>
                      <label>{{ getStatBonusSign(characterToView.scores[STAT_KEYS.DEXTERITY].calculateMod()) }}</label>
                    </li>
                    
                    <li>
                      <label for="stats-speed">Speed (ft): </label>
                      <input type="number" id="stats-speed" v-model="characterToView.speed" inputmode="numeric" required>
                    </li>

                    <li>
                      <label for="stats-hp">Hit Points - Current:</label>
                      <input type="number" id="stats-hp" v-model="characterToView.hp[HP_KEYS.CURRENT]" inputmode="numeric" required>
                    </li>

                    <li>
                      <label for="stats-hp">Hit Points - Max:</label>
                      <input type="number" id="stats-hp" v-model="characterToView.hp[HP_KEYS.MAX]" inputmode="numeric" required>
                    </li>

                    <li>
                      <label for="stats-hp">Hit Points - Temp:</label>
                      <input type="number" id="stats-hp" v-model="characterToView.hp[HP_KEYS.TEMP]" inputmode="numeric" required>
                    </li>

                    <li>
                      <label>Hit Die Type: </label>
                      <select v-model="characterToView.hp[HP_KEYS.DIE]">
                        <option v-for="die in DIE_TYPE" :key="die" :value="die">{{ die }}</option>
                      </select>
                    </li>

                    <li>
                      <label for="stats-hit-die">Current # of Hit Die: </label>
                      <input type="number" id="stats-hit-die" v-model="characterToView.hp[HP_KEYS.DIE_AMOUNT_CURR]" inputmode="numeric" required>
                    </li>

                    <li>
                      <label for="stats-hit-die">Max # of Hit Die: </label>
                      <input type="number" id="stats-hit-die" v-model="characterToView.hp[HP_KEYS.DIE_AMOUNT_MAX]" inputmode="numeric" required>
                    </li>

                    <li>
                      <label>Death save successes:</label>
                      <!-- Group together so justify-content: space-between; works easily -->
                      <div>
                        <select v-model="characterToView.deathSaves.successes">
                          <option v-for="count in DEATH_SAVES_COUNTS" :key="count" :value="count">{{ count }}</option>
                        </select>
                        <label> / 3</label>
                      </div>
                    </li>

                    <li>
                      <label>Death save failures:</label>
                      <div>
                        <select v-model="characterToView.deathSaves.failures">
                          <option v-for="count in DEATH_SAVES_COUNTS" :key="count" :value="count">{{ count }}</option>
                        </select>
                        <label> / 3</label>
                      </div>
                    </li>

                    <li>
                      <label for="stats-proficiency-bonus">Proficiency Bonus: </label>
                      <label>{{ getStatBonusSign(getProficiencyBonus()) }}</label>
                    </li>

                    <li>
                      <label for="stats-proficiency-bonus">Passive Perception: </label>
                      <label>{{ getStatBonusSign(calculatePassivePerception()) }}</label>
                    </li>

                    <li>
                      <label for="spells-attack-bonus">Casting Ability:</label>
                      <select v-model="characterToView.spellCastStat">
                        <option v-for="stat in STAT_KEYS" :key="stat" :value="stat">{{ STAT_NAMES[stat] }}</option>
                      </select>
                    </li>
                  
                    <li>
                      <label>Spell Saving DC: </label>
                      <label>{{ calculateSpellSavingDc(characterToView.scores[characterToView.spellCastStat].calculateMod()) }}</label>
                    </li>

                    <li>
                      <label for="stats-proficiency-bonus">Inspriation: </label>
                      <input type="number" id="stats-inspiration" v-model="characterToView.inspiration" inputmode="numeric" required>
                    </li>

                    <li class="container-update">
                      <br>
                      <button class="button-update" @click="onPressUpdateCharacterInfo()">Update</button>
                    </li>
                  </ul>
                </div>
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

              <div>
                <button class="button-edit" v-if="!isEditingAbilityScores" @click="toggleEditForSection(CHARACTER_SECTIONS.ABILITY_SCORES)">Edit</button>
                <button class="button-edit" v-if="isEditingAbilityScores" @click="toggleEditForSection(CHARACTER_SECTIONS.ABILITY_SCORES)">Finish</button>
              </div>
            </header>
            
            <collapse-transition dimension="height">
              <div v-if="isShowingAbilityScores">
                <div v-if="!isEditingAbilityScores">
                  <ul>
                    <li v-for="(score, key) in STAT_KEYS" :key="key">
                      <label>{{ STAT_NAMES[score] }}:</label>
                      <div>
                        <label><strong>{{ characterToView.scores[score].value }}</strong></label>
                        <label class="mod"><strong>{{ getStatBonusSign(characterToView.scores[score].calculateMod()) }}</strong></label>
                      </div>
                    </li>
                  </ul>
                </div>

                <div v-if="isEditingAbilityScores" >
                  <ul>
                    <li v-for="(score, key) in STAT_KEYS" :key="key">
                      <label for="score">{{ STAT_NAMES[score] }}:</label>
                      <div>
                        <input type="number" id="score" v-model="characterToView.scores[score].value" inputmode="numeric" required>
                        <label class="mod">Mod: <strong>{{ getStatBonusSign(characterToView.scores[score].calculateMod()) }}</strong></label>
                      </div>
                    </li>
                  </ul>

                  <div class="container-update">
                    <br>
                    <button class="button-update" @click="onPressUpdateAbilityScores()">Update</button>
                  </div>
                </div>
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

              <div>
                <button class="button-edit" v-if="!isEditingSavingThrows" @click="toggleEditForSection(CHARACTER_SECTIONS.SAVING_THROWS)">Edit</button>
                <button class="button-edit" v-if="isEditingSavingThrows" @click="toggleEditForSection(CHARACTER_SECTIONS.SAVING_THROWS)">Finish</button>
              </div>
            </header>

            <collapse-transition dimension="height">
              <div v-if="isShowingSavingThrows">
                <ul>
                  <li v-for="(stat, key) in STAT_KEYS" :key="key">
                    <div>
                      <input type="checkbox" class="checkbox" v-model="characterToView.savingThrows[stat].proficient" :disabled="!isEditingSavingThrows">
                      <label>{{ STAT_NAMES[stat] }}:</label>
                    </div>

                    <label v-if="characterToView.savingThrows[stat].proficient">
                      <strong>{{ getStatBonusSign(characterToView.scores[stat].calculateMod() + getProficiencyBonus()) }}</strong>
                    </label>
                    <label v-if="!characterToView.savingThrows[stat].proficient">
                      <strong>{{ getStatBonusSign(characterToView.scores[stat].calculateMod()) }}</strong>
                    </label>
                  </li>

                  <li class="container-update" v-if="isEditingSavingThrows">
                    <br>
                    <button class="button-update" @click="onPressUpdateSavingThrows()">Update</button>
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

              <div>
                <button class="button-edit" v-if="!isEditingSkills" @click="toggleEditForSection(CHARACTER_SECTIONS.SKILLS)">Edit</button>
                <button class="button-edit" v-if="isEditingSkills" @click="toggleEditForSection(CHARACTER_SECTIONS.SKILLS)">Finish</button>
              </div>
            </header>

            <collapse-transition dimension="height">
              <div v-if="isShowingSkills">
                <ul>
                  <li v-for="(skill, key) in SKILL_KEYS" :key="key">
                      <div>
                        <input type="checkbox" class="checkbox" v-model="characterToView.skills[skill].proficient" :disabled="!isEditingSkills">
                        <label>{{ SKILL_NAMES[skill] }}:</label>
                        <label class="skill-score">&nbsp;{{ SKILL_NAME_SCORES[skill] }}</label>
                      </div>

                      <label class="mod" v-if="characterToView.skills[skill].proficient">
                        <strong>{{ getStatBonusSign(characterToView.scores[SKILL_MODS[skill]].calculateMod() + getProficiencyBonus()) }}</strong>
                      </label>
                      <label class="mod" v-if="!characterToView.skills[skill].proficient">
                        <strong>{{ getStatBonusSign(characterToView.scores[SKILL_MODS[skill]].calculateMod()) }}</strong>
                      </label>
                  </li>

                  <li class="container-update" v-if="isEditingSkills">
                    <br>
                    <button class="button-update" @click="onPressUpdateSkills()">Update</button>
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
                <!-- Add new -->
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

                <template v-if="getDictionarySize(characterToView.featuresTraits) > 0">
                  <div class="viewing" v-if="!isEditingFeaturesTraits">
                    <ul v-for="(item, key) in characterToView.featuresTraits" :key="key">
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
                    <ul v-for="(item, key) in characterToView.featuresTraits" :key="key">
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
                        <button class="button-update" @click="onPressUpdateStat(key, item, CHARACTER_KEYS.FEATURES)">Update</button>
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
                <!-- Add new -->
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

                <template v-if="getDictionarySize(characterToView.weapons) > 0">
                  <div class="viewing" v-if="!isEditingWeapons">
                    <ul v-for="(item, key) in characterToView.weapons" :key="key">
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
                    <ul v-for="(item, key) in characterToView.weapons" :key="key">
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
                        <button class="button-update" @click="onPressUpdateStat(key, item, CHARACTER_KEYS.WEAPONS)">Update</button>
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
                <!-- Add new -->
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
                      <li><label class="name-and-count"><strong>Gold</strong>&emsp;x{{ characterToView.gold }}</label></li>
                    </ul>
                  </div>

                  <div class="editing-languages" v-if="isEditingEquipment">
                    <ul>
                      <li>
                        <label>Gold:</label>
                        <div>
                          <input type="number" v-model="characterToView.gold" inputmode="numeric" required>
                          <button class="button-update" @click="onPressUpdateGold()">Update</button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <template v-if="getDictionarySize(characterToView.equipment) > 0">
                  <div class="viewing" v-if="!isEditingEquipment">
                    <ul v-for="(item, key) in characterToView.equipment" :key="key">
                      <li>
                        <label class="name-and-count"><strong>{{ key }}</strong>&emsp;x{{ item[EQUIPMENT_KEYS.AMOUNT] }}</label>
                        <p class="description">{{ item[EQUIPMENT_KEYS.DESCRIPTION] }}</p>
                      </li>

                      <hr class="list-divider">
                    </ul>
                  </div>
                  
                  <div class="editing" v-if="isEditingEquipment">
                    <ul v-for="(item, key) in characterToView.equipment" :key="key">
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
                        <button class="button-update" @click="onPressUpdateStat(key, item, CHARACTER_KEYS.EQUIPMENT)">Update</button>
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
                <!-- Add new -->
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

                <template v-if="getDictionarySize(characterToView.treasures) > 0">
                  <div class="viewing" v-if="!isEditingTreasure">
                    <ul  v-for="(item, key) in characterToView.treasures" :key="key">
                      <li>
                        <label class="name-and-count"><strong>{{ key }}</strong>&emsp;x{{ item[EQUIPMENT_KEYS.AMOUNT] }}</label>
                        <p class="description">{{ item[EQUIPMENT_KEYS.DESCRIPTION] }}</p>
                      </li>

                      <hr class="list-divider">
                    </ul>
                  </div>

                  <div class="editing" v-if="isEditingTreasure">
                    <ul  v-for="(item, key) in characterToView.treasures" :key="key">
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
                        <button class="button-update" @click="onPressUpdateStat(key, item, CHARACTER_KEYS.TREASURES)">Update</button>
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
                  <!-- Add new -->
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

                  <template v-if="getDictionarySize(characterToView.languages) > 0">
                    <div class="viewing" v-if="!isEditingLanguages">
                      <ul v-for="(item, key) in characterToView.languages" :key="key">
                        <li class="inline">
                          <label><strong>{{ key }}</strong>:</label>
                          <p>{{ item }}</p>
                        </li>
                      </ul>
                    </div>

                    <div class="editing-languages" v-if="isEditingLanguages">
                      <ul v-for="(item, key) in characterToView.languages" :key="key">
                        <li class="inline">
                          <label><strong>{{ key }}</strong>:</label>
                          <select v-model="characterToView.languages[key]">
                            <option v-for="prof in LANGUAGE_PROFICIENCY" :key="prof" :value="prof">{{ prof }}</option>
                          </select>
                        </li>

                        <li class="container-update-delete">
                          <button class="button-delete" @click="onPressDeleteStat(key, CHARACTER_KEYS.LANGUAGES)">Delete</button>
                          <button class="button-update" @click="onPressUpdateStat(key, item, CHARACTER_KEYS.LANGUAGES)">Update</button>
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
                <!-- Add new -->
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

                <template v-if="getDictionarySize(characterToView.proficiencies) > 0">
                  <div class="viewing" v-if="!isEditingProficiencies">
                    <ul v-for="(item, key) in characterToView.proficiencies" :key="key">
                      <li>
                        <label class="name-and-count"><strong>{{ key }}</strong></label>
                        <p class="description">{{ item }}</p>
                      </li>
                    </ul>
                  </div>

                  <div class="editing" v-if="isEditingProficiencies">
                    <ul v-for="(item, key) in characterToView.proficiencies" :key="key">
                      <li>
                        <label><strong>{{ key }}</strong></label>
                      </li>

                      <br>
                      <textarea v-model="characterToView.proficiencies[key]" rows="6" placeholder="Description"></textarea>

                      <li class="container-update-delete">
                        <button class="button-delete" @click="onPressDeleteStat(key, CHARACTER_KEYS.PROFICIENCIES)">Delete</button>
                        <button class="button-update" @click="onPressUpdateStat(key, item, CHARACTER_KEYS.PROFICIENCIES)">Update</button>
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
                <!-- Add new -->
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
                          <option v-for="level in SPELL_CASTING_LEVELS" :key="level" :value="level">{{ SPELL_SLOT_NAMES_PICKER[level] }}</option>
                        </select>
                      </li>
                    </ul>

                    <br>
                    <button class="button-add" @click="onPressAddSpellSlot">Add</button>

                    <hr>
                  </div>
                </template>

                <template v-if="getDictionarySize(characterToView.spellSlots) > 0">
                  <div class="viewing" v-if="!isEditingSpellSlots">
                    <ul v-for="(item, key) in characterToView.spellSlots" :key="key">
                      <li class="inline">
                        <label><strong>{{ SPELL_CASTING_NAMES[key] }}</strong>:</label>
                        <label>{{ item[SPELL_SLOT_KEYS.MAX] }} slots</label>
                      </li>
                    </ul>
                  </div>

                  <div class="editing" v-if="isEditingSpellSlots">
                    <ul v-for="(item, key) in characterToView.spellSlots" :key="key">
                      <li>
                        <label><strong>{{ SPELL_CASTING_NAMES[key] }}</strong></label>
                      </li>

                      <li>
                        <label>Available # of slots:</label>
                        <select v-model="item[SPELL_SLOT_KEYS.CURRENT]">
                          <option v-for="level in SPELL_CASTING_LEVELS" :key="level" :value="level">{{ SPELL_SLOT_NAMES_PICKER[level] }}</option>
                        </select>
                      </li>

                      <li class="container-update-delete">
                        <button class="button-delete" @click="onPressDeleteStat(key, CHARACTER_KEYS.SPELL_SLOTS)">Delete</button>
                        <button class="button-update" @click="onPressUpdateStat(key, item, CHARACTER_KEYS.SPELL_SLOTS)">Update</button>
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
                <!-- Add new -->
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

                <template v-if="getDictionarySize(characterToView.spells) > 0">
                  <div class="viewing-spells" v-if="!isEditingSpellCasting">
                    <ul v-for="(levelDict, level) in characterToView.spells" :key="level">
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
                    <ul v-for="(levelDict, level) in characterToView.spells" :key="level">
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
                            <button class="button-update" @click="onPressUpdateSpell(level, spellName, spell, CHARACTER_KEYS.SPELLS)">Update</button>
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
          <hr>

          <section id="save-delete-buttons" :class="{ 'disabled-page': isPopupOpen() }">
            <ul class="container-backup-delete">
              <li>
                <button class="button-view-backups" @click="getCharacterBackups">View Backups</button>
                <button class="button-backup" @click="toggleSaveCharacterPopup">Backup Character</button>
              </li>

              <li>
                <button class="button-delete" @click="toggleDeleteCharacterPopup">Delete Character</button>
              </li>
            </ul>
          </section>
        </main>

        <!-- Save Character Data Popup -->
        <div class="popup-overlay" v-if="isSaveCharacterPopupOpen">
          <transition name="fade" appear>
            <div class="popup-character-action" v-if="isSaveCharacterPopupOpen">
              <h1>Create backup for <br><strong>{{ characterToView.name }}</strong>?</h1>
              <div class="popup-buttons">
                <button class="button-cancel" @click="toggleSaveCharacterPopup">Cancel</button>
                <button class="button-backup" @click="onPressSaveBackup">Save</button>
              </div>
            </div>
          </transition>
        </div>

        <!-- Delete Character Popup -->
        <div class="popup-overlay" v-if="isDeleteCharacterPopupOpen">
          <transition name="fade" appear>
              <div class="popup-character-action">
                <h1>Delete <strong>{{ characterToView.name }}</strong>?</h1>
                <p>This action can't be undone</p>
                <div class="popup-buttons">
                  <button class="button-cancel" @click="toggleDeleteCharacterPopup">Cancel</button>
                  <button class="button-delete" @click="onPressDeleteCharacter">Delete</button>
                </div>
              </div>
          </transition>
        </div>

        <!-- Character Backups Popup -->
        <div class="popup-overlay" v-if="isCharacterBackupsPopupOpen">
          <transition name="fade" appear>
            <div class="popup-character-action">
              <h1>Select a backup to view</h1>
              <p class="spell-description">(Showing most recent {{ CONST_NUMS.BACKUP_LIMIT }} backups)</p>

                <ul v-for="(backup, timestamp) in store.getters.getCharacterBackups[this.characterToViewId]" :key="timestamp" @click="selectBackup(timestamp, backup)">
                  <li :class="{ 'selected': selectedBackupTimestamp === timestamp }">
                    <p>{{ convertTimestampToString(timestamp) }}</p>
                    <hr>
                    <character-summary :character="backup" :characterBackupId="characterToViewId" @openModal="toggleModalViewCharacter"></character-summary>
                  </li>
                </ul>

              <div class="popup-buttons">
                <button class="button-cancel" @click="toggleCharacterBackupPopup">Cancel</button>
                <button class="button-backup" @click="toggleViewBackup" :class="{ 'disabled-button': selectedBackupTimestamp === '' }" >View Backup</button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition>
    
    <!-- Backup Page -->
    <transition name="slide-up" mode="in-out">
      <template v-if="isShowingBackup">
        <character-backup 
          :backups="store.getters.getCharacterBackups[this.characterToViewId]"
          :time-of-backup="selectedBackupTimestamp"
          @close="closeViewBackup"
        ></character-backup>
      </template>
    </transition>
  
    <!-- Loading Spinner -->
    <div v-show="isShowingLoader">
      <loading-spinner :loadingText="LOADING_TEXT.GETING_BACKUPS"></loading-spinner>
    </div>
  </div>
</template>

<script>
// import store from '@/store'
import { useStore } from 'vuex'
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue';
import LoadingSpinner from './LoadingSpinner.vue';
import CharacterSummary from './CharacterSummary.vue';
import CharacterBackup from './CharacterBackup.vue';
import Character from '@/models/character'
import { CHARACTER_SECTIONS } from "@/enums/character-sections"
import { ACTION_TYPES }  from '@/enums/action-types'
import { CONST_NUMS } from "@/enums/constant-numbers"
import { DIE_TYPE } from '@/enums/die-type'
import { EQUIPMENT_KEYS } from '@/enums/dbKeys/equipment-keys.js'
import { FEATURES_KEYS } from '@/enums/dbKeys/features-keys.js'
import { LANGUAGE_PROFICIENCY } from '@/enums/language-proficiency'
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
import { LOADING_TEXT } from '@/enums/loading-text';

const TIMEOUT_LOADER = 500
// const TIMEOUT_TRANSITION = 200

const MAX_VALUES = {
  DEATH_SAVES: 3,
  HP: 600,
  HIT_DIE: 10,
  LEVEL: 20,
  SCORES: 20,
  STATS_BONUS: 5,
  SAVING_THROWS: 5,
  SKILLS: 15,
}

export default {
  components: {
    CollapseTransition,
    LoadingSpinner,
    CharacterSummary,
    CharacterBackup
  },
  props: {
    characterToViewId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      store: useStore(),
      isModalViewCharacterOpen: false,
      isSaveCharacterPopupOpen: false,
      isDeleteCharacterPopupOpen: false,
      isCharacterBackupsPopupOpen: false,
      isEditingCharInfo: false,
      isEditingAbilityScores: false,
      isEditingSavingThrows: false,
      isEditingSkills: false,
      isEditingFeaturesTraits: false,
      isEditingWeapons: false,
      isEditingEquipment: false,
      isEditingTreasure: false,
      isEditingLanguages: false,
      isEditingProficiencies: false,
      isEditingSpellCasting: false,
      isEditingSpellSlots: false,
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
      isShowingLoader: false,
      isShowingBackup: false,
      isShowingJumpToMenu: false,
      CHARACTER_SECTIONS: CHARACTER_SECTIONS,
      ACTION_TYPES: ACTION_TYPES,
      CONST_NUMS: CONST_NUMS,
      LOADING_TEXT: LOADING_TEXT,
      ALIGNMENT_TYPES: ALIGNMENT_TYPES,
      CHARACTER_KEYS: CHARACTER_KEYS,
      CLASS_NAMES: CLASS_NAMES,
      DEATH_SAVES_KEYS: DEATH_SAVES_KEYS,
      DEATH_SAVES_COUNTS: [0, 1, 2, 3],
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
      SKILL_NAME_SCORES: SKILL_NAME_SCORES,
      SKILL_KEYS: SKILL_KEYS,
      SKILL_NAMES: SKILL_NAMES,
      SKILL_MODS: SKILL_MODS,
      SPELL_CASTING_KEYS: SPELL_CASTING_KEYS,
      SPELL_CASTING_LEVELS: SPELL_CASTING_LEVELS,
      SPELL_CASTING_NAMES: SPELL_CASTING_NAMES,
      SPELL_CASTING_NAMES_PICKER: SPELL_CASTING_NAMES_PICKER,
      SPELL_SLOT_KEYS: SPELL_SLOT_KEYS,
      SPELL_SLOT_NAMES_PICKER: SPELL_SLOT_NAMES_PICKER,
      SPELL_CASTING_DURATION_TYPES: SPELL_CASTING_DURATION_TYPES,
      WEAPON_KEYS: WEAPON_KEYS,
      WEAPON_CATEGORY: WEAPON_CATEGORY,
      WEAPON_PROPERTY: WEAPON_PROPERTY,
      WEAPON_NAMES: WEAPON_NAMES,
      WEAPON_MODS: ['', STAT_KEYS.STRENGTH, STAT_KEYS.DEXTERITY, STAT_KEYS.CONSTITUTION, STAT_KEYS.INTELLIGENCE, STAT_KEYS.WISDOM, STAT_KEYS.CHARISMA],
      characterToView: new Character(),
      selectedBackupTimestamp: '',
      selectedBackupCharacter: new Character(),
      level: '',
      characterArmor: '',
      characterSpeed: '',
      hitDieType: '', // d10
      hitDieAmount: '', // 3
      equipmentTempName: '',
      equipmentTempAmount: '',
      equipmentTempDescription: '',
      featuresTempName: '',
      featuresTempDescription: '',
      featuresTempType: '', // Racial, Class, Other
      featuresTempAction: '', // Action, Bonus, Reaction
      featuresTempUseable: true,
      featuresTempUses: '',
      gold: '',
      languagesTempName: '',
      languagesTempProficiency: '',
      proficiencyTempName: '',
      proficiencyTempDescription: '',
      spellAttackBonus: '',
      spellCastingStat: '', // e.g. intelligence
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
      weaponTempIsProficient: '', // e.g. d8
      weaponTempProperties: '', // e.g. finesse, light
      weaponTempDescription: '',
    }
  },
  mounted() {
    window.scrollTo(0,0);
    this.characterToView = Character.convertCharacterToObj(this.store.getters.getUserCharacters[this.characterToViewId])
    // console.info('this.characterToView:', this.characterToView)
  },
  watch: {
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
    onPressSaveBackup() {
      const payload = {
        charId: this.characterToViewId, 
        characterInfo: this.characterToView
      }
      this.store.dispatch("addBackupToDb", payload).then((success) => {
        if (success) {
          alert(`Saved data for ${this.characterToView.name}`)
        } else {
          alert(`ERROR saving data for ${this.characterToView.name}. Please try again.`)
        }
        this.closeModal()
      })
    },
    onPressDeleteCharacter() {
      this.store.dispatch("deleteCharacterFromDb", this.characterToViewId).then((success) => {
        if (success) {
          alert(`Deleted ${this.characterToView.name} data and the backups`)
          this.closeModal()
        } else {
          alert(`ERROR deleting "${this.characterToView.name}" occurred. Please try again.`)
        }
      })
      
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
        [FEATURES_KEYS.DESCRIPTION]: this.featuresTempDescription,
        [FEATURES_KEYS.TYPE]: this.featuresTempType,
        [FEATURES_KEYS.USES]: this.featuresTempUses
      }
      
      const payload = {
        charId: this.characterToViewId,
        key: this.featuresTempName,
        value: newFeat,
        statRef: CHARACTER_KEYS.FEATURES
      }

      this.store.dispatch("addCharacterStat", payload)

      this.featuresTempName = ''
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
        [WEAPON_KEYS.AMOUNT]: this.weaponTempAmount,
        [WEAPON_KEYS.ATTACK_DAMAGE_STAT]: this.weaponsTempAttackModifier,
        [WEAPON_KEYS.CATEGORY]: this.weaponTempCategory,
        [WEAPON_KEYS.DESCRIPTION]: this.weaponTempDescription,
        [WEAPON_KEYS.DIE]: this.weaponTempDieType,
        [WEAPON_KEYS.PROFICIENT]: this.weaponTempIsProficient,
      }

      const payload = {
        charId: this.characterToViewId,
        key: this.weaponTempName,
        value: newItem,
        statRef: CHARACTER_KEYS.WEAPONS
      }

      this.store.dispatch("addCharacterStat", payload)
      
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
        [EQUIPMENT_KEYS.AMOUNT]: this.equipmentTempAmount,
        [EQUIPMENT_KEYS.DESCRIPTION]: this.equipmentTempDescription
      }

      const payload = {
        charId: this.characterToViewId,
        key: this.equipmentTempName,
        value: newItem,
        statRef: CHARACTER_KEYS.EQUIPMENT
      }

      this.store.dispatch("addCharacterStat", payload)
      
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
        [EQUIPMENT_KEYS.AMOUNT]: this.treasureTempAmount,
        [EQUIPMENT_KEYS.DESCRIPTION]: this.treasureTempDescription
      }

      const payload = {
        charId: this.characterToViewId,
        key: this.treasureTempName,
        value: newItem,
        statRef: CHARACTER_KEYS.TREASURES
      }

      this.store.dispatch("addCharacterStat", payload)
      
      this.treasureTempName = ''
      this.treasureTempAmount = ''
      this.treasureTempDescription = ''
    },
    onPressAddLanguage() {
      // Make a check just in case 
      if (!this.isEditingLanguages) {
        alert("You should've have been able to see the add button...")
        return
      }

      if (this.languagesTempName === '') {
        alert("Please enter a language")
        return
      }

      if (this.languagesTempProficiency === '') {
        alert("Please select a language proficiency")
        return
      }

      const payload = {
        charId: this.characterToViewId,
        key: this.languagesTempName,
        value: this.languagesTempProficiency,
        statRef: CHARACTER_KEYS.LANGUAGES
      }
      
      this.store.dispatch("addCharacterStat", payload)

      this.languagesTempName = ''
      this.languagesTempProficiency == ''
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

      const payload = {
        charId: this.characterToViewId,
        key: this.proficiencyTempName,
        value: this.proficiencyTempDescription,
        statRef: CHARACTER_KEYS.PROFICIENCIES
      }
      
      this.store.dispatch("addCharacterStat", payload)
      
      this.proficiencyTempName = ''
      this.proficiencyTempDescription = ''
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
        [SPELL_CASTING_KEYS.CASTING_TIME]: this.spellTempCastingTime,
        [SPELL_CASTING_KEYS.DESCRIPTION]: this.spellTempDescription,
        [SPELL_CASTING_KEYS.DURATION]: this.spellTempDuration,
        [SPELL_CASTING_KEYS.DURATION_TYPE]: this.spellTempDurationType,
        [SPELL_CASTING_KEYS.RANGE]: this.spellTempRange
      }
      
      const newEntry = {
        [this.spellTempName]: newSpell
      }

      const payload = {
        charId: this.characterToViewId,
        levelKey: this.spellTempLevel,
        spellName: this.spellTempName,
        newSpell: newSpell,
        newEntry: newEntry,
        statRef: CHARACTER_KEYS.SPELLS
      }
      
      this.store.dispatch("addCharacterSpell", payload)
      
      this.spellTempName = ''
      this.spellTempLevel = ''
      this.spellTempCastingTime = ''
      this.spellTempDescription = ''
      this.spellTempDuration = ''
      this.spellTempDurationType = ''
      this.spellTempRange = ''
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
        [SPELL_SLOT_KEYS.CURRENT]: this.spellSlotTempSlots,
        [SPELL_SLOT_KEYS.MAX]: this.spellSlotTempSlots,
      }

      const payload = {
        charId: this.characterToViewId,
        key: this.spellSlotTempLevel,
        value: slot,
        statRef: CHARACTER_KEYS.SPELL_SLOTS
      }
      
      this.store.dispatch("addCharacterStat", payload)
      
      this.spellSlotTempLevel = ''
      this.spellSlotTempSlots = ''
    },
    onPressUpdateCharacterInfo() {
      const info = {
        [CHARACTER_KEYS.LEVEL]: this.characterToView.level,
        [CHARACTER_KEYS.ARMOR]: this.characterToView.armor,
        [CHARACTER_KEYS.SPEED]: this.characterToView.speed,
        [CHARACTER_KEYS.HP]: this.characterToView.hp,
        [CHARACTER_KEYS.DEATH_SAVES]: this.characterToView.deathSaves,
        [CHARACTER_KEYS.SPELL_CAST_STAT]: this.characterToView.spellCastStat,
        [CHARACTER_KEYS.INSPIRATION]: this.characterToView.inspiration,
      }

      const payload = {
        charId: this.characterToViewId,
        info: info
      }

      this.store.dispatch("updateCharacterInfo", payload).then((success) => {
        if (success) {
          alert(`updated character info`)
        } else {
          alert(`couldn't update character info for some reason`)
        }

        this.toggleEditForSection("character info")
      })
      .catch((error) => {
        console.error(error)
        alert(`An error occured updating character info`)
      })
    },
    onPressUpdateAbilityScores() {
      const scores = {
        [STAT_KEYS.STRENGTH]: this.characterToView.scores[STAT_KEYS.STRENGTH],
        [STAT_KEYS.DEXTERITY]: this.characterToView.scores[STAT_KEYS.DEXTERITY],
        [STAT_KEYS.CONSTITUTION]: this.characterToView.scores[STAT_KEYS.CONSTITUTION],
        [STAT_KEYS.INTELLIGENCE]: this.characterToView.scores[STAT_KEYS.INTELLIGENCE],
        [STAT_KEYS.WISDOM]: this.characterToView.scores[STAT_KEYS.WISDOM],
        [STAT_KEYS.CHARISMA]: this.characterToView.scores[STAT_KEYS.CHARISMA],
      }

      const payload = {
        charId: this.characterToViewId,
        scores: scores,
      }

      this.store.dispatch("updateCharacterAbilityScores", payload).then((success) => {
        if (success) {
          alert(`updated ability scores, initiative, passive perception, and saving DC`)
        } else {
          alert(`couldn't update ability scores for some reason`)
        }

        this.toggleEditForSection(CHARACTER_KEYS.SCORES)
      })
      .catch((error) => {
        console.error(error)
        alert(`An error occured updating ability scores`)
      })
    },
    onPressUpdateSavingThrows() {
      const savingThrows = {
        [STAT_KEYS.STRENGTH]: this.characterToView.savingThrows[STAT_KEYS.STRENGTH],
        [STAT_KEYS.DEXTERITY]: this.characterToView.savingThrows[STAT_KEYS.DEXTERITY],
        [STAT_KEYS.CONSTITUTION]: this.characterToView.savingThrows[STAT_KEYS.CONSTITUTION],
        [STAT_KEYS.INTELLIGENCE]: this.characterToView.savingThrows[STAT_KEYS.INTELLIGENCE],
        [STAT_KEYS.WISDOM]: this.characterToView.savingThrows[STAT_KEYS.WISDOM],
        [STAT_KEYS.CHARISMA]: this.characterToView.savingThrows[STAT_KEYS.CHARISMA],
      }

      const info = {
        [CHARACTER_KEYS.SAVING_THROWS]: savingThrows
      }

      const payload = {
        charId: this.characterToViewId,
        info: info,
      }

      this.store.dispatch("updateCharacterInfo", payload).then((success) => {
        if (success) {
          alert(`updated saving throws`)
        } else {
          alert(`couldn't update saving throws info for some reason`)
        }

        this.toggleEditForSection(CHARACTER_KEYS.SAVING_THROWS)
      })
      .catch((error) => {
        console.error(error)
        alert(`An error occured updating saving throws`)
      })
    },
    onPressUpdateSkills() {
      const skills = {
        [SKILL_KEYS.ACROBATICS]: this.characterToView.skills[SKILL_KEYS.ACROBATICS],
        [SKILL_KEYS.ANIMAL_HANDLING]: this.characterToView.skills[SKILL_KEYS.ANIMAL_HANDLING],
        [SKILL_KEYS.ARCANA]: this.characterToView.skills[SKILL_KEYS.ARCANA],
        [SKILL_KEYS.ATHLETICS]: this.characterToView.skills[SKILL_KEYS.ATHLETICS],
        [SKILL_KEYS.DECEPTION]: this.characterToView.skills[SKILL_KEYS.DECEPTION],
        [SKILL_KEYS.HISTORY]: this.characterToView.skills[SKILL_KEYS.HISTORY],
        [SKILL_KEYS.INSIGHT]: this.characterToView.skills[SKILL_KEYS.INSIGHT],
        [SKILL_KEYS.INTIMIDATION]: this.characterToView.skills[SKILL_KEYS.INTIMIDATION],
        [SKILL_KEYS.INVESTIGATION]: this.characterToView.skills[SKILL_KEYS.INVESTIGATION],
        [SKILL_KEYS.MEDICINE]: this.characterToView.skills[SKILL_KEYS.MEDICINE],
        [SKILL_KEYS.NATURE]: this.characterToView.skills[SKILL_KEYS.NATURE],
        [SKILL_KEYS.PERCEPTION]: this.characterToView.skills[SKILL_KEYS.PERCEPTION],
        [SKILL_KEYS.PERFORMANCE]: this.characterToView.skills[SKILL_KEYS.PERFORMANCE],
        [SKILL_KEYS.PERSUASION]: this.characterToView.skills[SKILL_KEYS.PERSUASION],
        [SKILL_KEYS.RELIGION]: this.characterToView.skills[SKILL_KEYS.RELIGION],
        [SKILL_KEYS.SLEIGHT_OF_HAND]: this.characterToView.skills[SKILL_KEYS.SLEIGHT_OF_HAND],
        [SKILL_KEYS.STEALTH]: this.characterToView.skills[SKILL_KEYS.STEALTH],
        [SKILL_KEYS.SURVIVAL]: this.characterToView.skills[SKILL_KEYS.SURVIVAL],
      }

      const info = {
        [CHARACTER_KEYS.SKILLS]: skills
      }

      const payload = {
        charId: this.characterToViewId,
        info: info,
      }

      this.store.dispatch("updateCharacterInfo", payload).then((success) => {
        if (success) {
          alert(`updated skills`)
        } else {
          alert(`couldn't update skills info for some reason`)
        }

        this.toggleEditForSection(CHARACTER_KEYS.SKILLS).then((success) => {
          if (success) {
            alert(`Updated skills`)
          } else {
            alert(`Couldn't update skills`)
          }
        })
        .catch((error) => {
          console.error(error)
          alert(`An error occured updating skills`)
        })
      })
    },
    onPressUpdateStat(key, value, statRef) {
      const payload = {
        charId: this.characterToViewId,
        key: key,
        value: value,
        statRef: statRef
      }

      this.store.dispatch("updateCharacterStat", payload).then((success) => {
        if (success) {
          alert(`Updated info for: ${key}`)
        } else {
          alert(`Couldn't update info for ${key}`)
        }
      })
      .catch((error) => {
        console.error(error)
        alert(`An error occured updating for ${key}`)
      })
    },
    onPressUpdateGold() {
      const info = {
        [CHARACTER_KEYS.GOLD]: this.characterToView.gold
      }

      const payload = {
        charId: this.characterToViewId,
        info: info
      }

      this.store.dispatch("updateCharacterInfo", payload).then((success) => {
        if (success) {
          alert(`updated gold amount`)
        } else {
          alert(`couldn't update gold amount for some reason`)
        }

        this.toggleEditForSection(CHARACTER_KEYS.SAVING_THROWS)
      })
      .catch((error) => {
        console.error(error)
        alert(`An error occured updating saving throws`)
      })
    },
    onPressUpdateSpell(levelKey, spellName, updatedSpell, statRef) {
      const payload = {
        charId: this.characterToViewId,
        levelKey: levelKey,
        spellName: spellName,
        updatedSpell: updatedSpell,
        statRef: statRef
      }

      this.store.dispatch("updateCharacterSpell", payload).then((success) => {
        if (success) {
          alert(`updated spell: ${spellName}`)
        } else {
          alert(`couldn't update ${spellName} for some reason`)
        }
      })
      .catch((error) => {
        console.error(error)
        alert(`An error occured updating for ${spellName}`)
      })
    },
    onPressDeleteStat(key, statRef) {
      if (key in this.characterToView[statRef]) {
        delete this.characterToView[statRef][key]

        const payload = {
          charId: this.characterToViewId, 
          key: key,
          statRef: statRef
        }
        this.store.dispatch("deleteCharacterStat", payload)
      }
    },
    onPressDeleteSpell(levelKey, spellName, statRef) {
      if (spellName in this.characterToView.spells[levelKey]) {
        delete this.characterToView.spells[levelKey][spellName]
        
        const payload = {
          charId: this.characterToViewId, 
          levelKey: levelKey,
          spellName: spellName,
          statRef: statRef
        }

        this.store.dispatch("deleteCharacterSpell", payload).then((success) => {
          if (success) {
            alert(`deleted spell: ${spellName}`)
          } else {
            alert(`couldn't delete ${spellName} for some reason`)
          }
        })
      }
    },
    calculatePassivePerception() {
      const result = 10 + this.characterToView.scores[STAT_KEYS.WISDOM].calculateMod()
      return result
    },
    calculateSpellSavingDc(mod) {
      return 8 + this.getProficiencyBonus() + mod
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
        return this.characterToView.scores[stat].calculateMod()
      }
      
    },
    getStatValue(statRef, statKey, valueKey) {
      return this.characterToView[statRef][statKey][valueKey]
    },
    getStatBonusSign(stat) {
      if (stat < 0) {
        return stat // the negative will already be apart of the number
      } else {
        return "+" + stat
      }
    },
    getProficiencyBonus() {
      if (this.characterToView.level <= 4) {
        return 2
      } else if (this.characterToView.level <= 8) {
        return 3
      } else if (this.characterToView.level <= 12) {
        return 4
      } else if (this.characterToView.level <= 16) {
        return 5
      } else {
        return 6
      }
    },
    getCharacterBackups() {
      this.isShowingLoader = true
      this.store.dispatch("dbGetCharacterBackups", this.characterToViewId).then((success) => {
        if (success) {
          // console.log("loading backup:")
          setTimeout(() => {
            this.isShowingLoader = false
            this.toggleCharacterBackupPopup()
          }, TIMEOUT_LOADER)
        } else {
          alert("Didn't get any backups")
          this.isShowingLoader = false
        }

      })
      .catch((error) => {
        this.isShowingLoader = false
        console.error(error)
        alert("Couldn't get character backups for some reason")
      })
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
    toggleSaveCharacterPopup() {
      this.isSaveCharacterPopupOpen = !this.isSaveCharacterPopupOpen
    },
    toggleDeleteCharacterPopup() {
      this.isDeleteCharacterPopupOpen = !this.isDeleteCharacterPopupOpen
    },
    toggleCharacterBackupPopup() {
      this.isCharacterBackupsPopupOpen = !this.isCharacterBackupsPopupOpen

      // Don't carry over the previously selected backup
      if (this.isCharacterBackupsPopupOpen) {
        this.selectedBackupTimestamp = ''
      }
    },
    toggleCharacterBackupModal() {
      this.isShowingBackup = !this.isShowingBackup
    },
    toggleViewBackup() {
      if (this.selectedBackupTimestamp === '') {
        alert("Please select a backup to view")
        return
      }

      window.scrollTo(0,0);
      this.toggleCharacterBackupPopup()
      this.toggleCharacterBackupModal()
    },
    closeViewBackup(characterBackup) {
      // console.info('@closeViewBackup')

      if (characterBackup) {
        // console.info('overwrote with backup:', characterBackup)
        this.characterToView = characterBackup
      }


      this.toggleCharacterBackupModal()
      window.scrollTo(0,0);
      this.selectedBackupTimestamp = ''
      this.selectedBackupCharacter = new Character()
    },
    selectBackup(timestamp, backup) {
      // console.info('timestamp:', timestamp, "type?", typeof timestamp)
      this.selectedBackupTimestamp = timestamp
      this.selectedBackupCharacter = backup
    },
    isPopupOpen() {
      return this.isSaveCharacterPopupOpen || this.isDeleteCharacterPopupOpen || this.isCharacterBackupsPopupOpen
    },
    convertTimestampToString(timestamp) {
      const date = new Date(Math.floor(timestamp))

      // Define the options for formatting the date
      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true, // Make a user setting?
      };
      
      // Format the date using the options
      const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
      return formattedDate
    },
  },
}
</script>

<style scoped>
  @import '../styles/reset.css';
  @import "../styles/colors.css";
  @import "../styles/global-constants.css";
  /* @import '../styles/character-info-scores.css'; */
  @import '../styles/popup.css';
  /* @import '../styles/transitions.css'; */


  h1 {
    font-size: 2.5em;
  }

  p {
    display: inherit;
    align-items: center;
    font-size: var(--stat-font-size);
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
    background-color: white;
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

  .editing .name {
    width: var(--width-close-to-mobile-screen);
    border: none; /* Remove the default border */
    border-bottom: 1px solid black; /* Add a bottom border */
    outline: none;
    text-align: center;
    margin: 15px auto;
    font-size: var(--stat-font-size);
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
  .container-update-delete button,
  .editing-languages button {
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

  .button-cancel {
    background-color: var(--dimgray);
  }

  .button-view-backups {
    background-color: var(--dimgray);
  }

  .container-backup-delete {
    display: flex;
    flex-direction: column;
  }

  .container-backup-delete button,
  .popup-buttons button {
    color: var(--white);
    padding: 5px 10px;
    margin: 10px;
    border: none;
    border-radius: var(--border-radius);
    font-size: var(--stat-font-size);
    width: 70%;
  }

  .container-backup-delete li {
    display: flex;
    flex-direction: column; /* Change to row for bigger screens */
    align-items: center;
  }

  .container-backup-delete li:last-child {
    margin-bottom: 50px; /* Have extra space at bottom */
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

  .popup-overlay h1 {
    font-size: 2.1em;
  }

  .popup-character-action {
    display: flex;
    flex-direction: column;
    background-color: var(--white);
    border-radius: var(--border-radius);
    padding: 20px;
    width: var(--width-popup);
  }

  .popup-character-action ul {
    display: flex;
    flex-direction: column-reverse;
    width: 100%;
    padding: 10px;
  }

  .popup-character-action ul li {
    border: 2px solid var(--black);
    border-radius: var(--border-radius);
    padding: 10px;
  }

  .popup-character-action p {
    justify-content: center;
  }

  .popup-buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  .disabled-button {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  .disabled-page {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none; 
    visibility: hidden;
  }

  .selected {
    background-color: var(--yellow);
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
</style>