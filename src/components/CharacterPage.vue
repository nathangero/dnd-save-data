<template>
  <div class="body">
    <!-- Character Page -->
    <transition name="slide-up" mode="out-in">
      <div v-if="!isShowingBackup">
        <header>
          <div class="nav-bar">
            <button class="nav-bar-button" @click="openJumpToMenu">Jump to</button>
            <template v-if="isShowingJumpToMenu">
              <div class="jump-to-menu" id="jump-to" :class="{ 'show-menu': isShowingJumpToMenu }">
                <ul class="">
                  <li>
                    <a @click="scrollToSection('character-background')">{{ CHARACTER_SECTIONS.CHARACTER_BACKGROUND }}</a>
                  </li>

                  <li>
                    <a @click="scrollToSection('character-info')">{{ CHARACTER_SECTIONS.CHARACTER_INFO }}</a>
                  </li>

                  <li>
                    <a @click="scrollToSection('ability-scores')">{{ CHARACTER_SECTIONS.ABILITY_SCORES }}</a>
                  </li>

                  <li>
                    <a @click="scrollToSection('saving-throws')">{{ CHARACTER_SECTIONS.SAVING_THROWS }}</a>
                  </li>

                  <li>
                    <a @click="scrollToSection('skills')">{{ CHARACTER_SECTIONS.SKILLS }}</a>
                  </li>

                  <li>
                    <a @click="scrollToSection('features-traits')">{{ CHARACTER_SECTIONS.FEATURES_TRAITS }}</a>
                  </li>

                  <li>
                    <a @click="scrollToSection('weapons')">{{ CHARACTER_SECTIONS.WEAPONS_SPELLS }}</a>
                  </li>

                  <li>
                    <a @click="scrollToSection('equipment')">{{ CHARACTER_SECTIONS.EQUIPMENT }}</a>
                  </li>

                  <li>
                    <a @click="scrollToSection('treasure')">{{ CHARACTER_SECTIONS.TREASURES }}</a>
                  </li>

                  <li>
                    <a @click="scrollToSection('languages')">{{ CHARACTER_SECTIONS.LANGUAGES }}</a>
                  </li>

                  <li>
                    <a @click="scrollToSection('proficiencies')">{{ CHARACTER_SECTIONS.PROFICIENCIES }}</a>
                  </li>

                  <li>
                    <a @click="scrollToSection('spell-slots')">{{ CHARACTER_SECTIONS.SPELL_SLOTS }}</a>
                  </li>

                  <li>
                    <a @click="scrollToSection('spell-casting')">{{ CHARACTER_SECTIONS.SPELL_CASTING }}</a>
                  </li>

                  <li>
                    <a @click="scrollToSection('save-delete-buttons')">Backup Character</a>
                  </li>
                </ul>
              </div>
            </template>
            <button class="nav-bar-button" id="close" @click="closeModal">Close</button>
          </div>

          <section id="character-background">
            <p class="character-name">{{ characterToView.name }}</p>
            <ul class="stat-list">
              <li>
                <label class="character-info">{{ characterToView.class }}</label>
              </li>

              <li>
                <label class="character-info">{{ characterToView.background }}</label>
              </li>

              <li>
                <label class="character-info">{{ characterToView.race }}</label>
              </li>

              <li>
                <label class="character-info">{{ characterToView.alignment }}</label>
              </li>
            </ul>
          </section>
        </header>

        <main v-if="characterToView.name !== ''" :class="{ 'disabled-page': isPopupOpen() }">
          <section id="character-info">
            <div class="edit-buttons">
              <div>
                <button class="button-edit-spacer" v-if="!isEditingCharInfo">Edit</button>
                <button class="button-edit-spacer" v-if="isEditingCharInfo">Finish</button>
              </div>

              <div class="h3-bar">
                <h3 @click="toggleCollapseForStat(characterinfo)">{{ CHARACTER_SECTIONS.CHARACTER_INFO }}</h3>
                <font-awesome-icon icon="chevron-up" v-if="!isShowingCharacterInfo" class="collapse-chevron"/>
                <font-awesome-icon icon="chevron-down" v-if="isShowingCharacterInfo" class="collapse-chevron"/>
              </div>
              
              <div>
                <button class="button-edit" v-if="!isEditingCharInfo" @click="toggleEditForStat(characterinfo)">Edit</button>
                <button class="button-edit" v-if="isEditingCharInfo" @click="toggleEditForStat(characterinfo)">Finish</button>
              </div>
            </div>

            <div id="collapse">
              <collapse-transition dimension="height">
                <div v-if="isShowingCharacterInfo">
                  <div v-if="!isEditingCharInfo">
                    <ul class="stat-list">
                      <li>
                        <div class="stat-group">
                          <label class="stat-label">Level:</label>
                          <label class="stat-value">{{ characterToView.level }}</label>
                        </div>
                      </li>

                      <li>
                        <div class="stat-group">
                          <label class="stat-label">Armor Class: </label>
                          <label class="stat-value">{{ characterToView.armor }}</label>
                        </div>
                      </li>
                      
                      <li>
                        <div class="stat-group">
                          <label class="stat-label">Initiative: </label>
                          <label class="stat-value">{{ getStatBonusSign(characterToView.scores[STAT_KEYS.DEXTERITY].calculateMod()) }}</label>
                        </div>
                      </li>
                      
                      <li>
                        <div class="stat-group">
                          <label class="stat-label">Speed (ft): </label>
                          <label class="stat-value">{{ characterToView.speed }}</label>
                        </div>
                      </li>
                      
                      <li>
                        <div class="stat-group">
                          <label class="stat-label">Current HP: </label>
                          <label class="stat-value">{{ characterToView.hp[HP_KEYS.CURRENT] }}/{{ characterToView.hp[HP_KEYS.MAX] }}</label>
                        </div>
                      </li>
                      
                      <li>
                        <div class="stat-group">
                          <label class="stat-label">Temp HP: </label>
                          <label class="stat-value">{{ characterToView.hp[HP_KEYS.TEMP] }}</label>
                        </div>
                      </li>
                      
                      <li>
                        <div class="stat-group">
                          <label class="stat-label">Hit die: </label>
                          <label class="stat-value">1{{ characterToView.hp[HP_KEYS.DIE] }}</label>
                        </div>
                      </li>
                      
                      <li>
                        <div class="stat-group">
                          <label class="stat-label">Hit die count: </label>
                          <label class="stat-value">{{ characterToView.hp[HP_KEYS.DIE_AMOUNT_CURR] }}/{{ characterToView.hp[HP_KEYS.DIE_AMOUNT_MAX] }}</label>
                        </div>
                      </li>
                      
                      <li>
                        <div class="stat-group">
                          <label class="stat-label">Death saves successes: </label>
                          <label class="stat-value">{{ characterToView.deathSaves.successes }}/3</label>
                        </div>
                      </li>
                      
                      <li>
                        <div class="stat-group">
                          <label class="stat-label">Death saves failures: </label>
                          <label class="stat-value">{{ characterToView.deathSaves.failures }}/3</label>
                        </div>
                      </li>
                      
                      <li>
                        <div class="stat-group">
                          <label class="stat-label">Proficiency Bonus: </label>
                          <label class="stat-value">{{ getStatBonusSign(getProficiencyBonus()) }}</label>
                        </div>
                      </li>
                      
                      <li>
                        <div class="stat-group">
                          <label class="stat-label">Passive Perception: </label>
                          <label class="stat-value">{{ calculatePassivePerception() }}</label>
                        </div>
                      </li>
                      
                      <li>
                        <div class="stat-group">
                          <label class="stat-label">Spell Casting Stat: </label>
                          <label class="stat-value">{{ STAT_NAMES[characterToView.spellCastStat] }}</label>
                        </div>
                      </li>
                      
                      <li>
                        <div class="stat-group">
                          <label class="stat-label">Spell Saving DC: </label>
                          <label class="stat-value">{{ calculateSpellSavingDc(characterToView.scores[characterToView.spellCastStat].calculateMod()) }}</label>
                        </div>
                      </li>
                      
                      <li>
                        <div class="stat-group">
                          <label class="stat-label">Inspiration: </label>
                          <label class="stat-value">{{ characterToView.inspiration }}</label>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div v-if="isEditingCharInfo">
                    <ul class="stat-list">
                      <li>
                        <div class="stat-group">
                          <label for="stats-level" class="stat-label"> Current Level:</label>
                          <div class="spacer"></div>
                          <input type="number" id="stats-level" v-model="characterToView.level" class="input-stats" inputmode="numeric" required>
                        </div>
                      </li>

                      <li>
                        <div class="stat-group">
                          <label for="stats-armor-class" class="stat-label">Armor Class: </label>
                          <div class="spacer"></div>
                          <input type="number" id="stats-armor-class" v-model="characterToView.armor" class="input-stats" inputmode="numeric" required>
                        </div>
                      </li>

                      <li>
                        <div class="stat-group">
                          <label for="stats-initiative" class="stat-label">Initiative: </label>
                          <div class="spacer"></div>
                          <label class="stat-value">{{ getStatBonusSign(characterToView.scores[STAT_KEYS.DEXTERITY].calculateMod()) }}</label>
                        </div>
                      </li>
                      
                      <li>
                        <div class="stat-group">
                          <label for="stats-speed" class="stat-label">Speed (ft): </label>
                          <div class="spacer"></div>
                          <input type="number" id="stats-speed" v-model="characterToView.speed" class="input-stats" inputmode="numeric" required>
                        </div>
                      </li>

                      <li>
                        <div class="stat-group">
                          <label for="stats-hp" class="stat-label">Hit Points - Current:</label>
                          <div class="spacer"></div>
                          <input type="number" id="stats-hp" v-model="characterToView.hp[HP_KEYS.CURRENT]" class="input-stats" inputmode="numeric" required>
                        </div>
                      </li>

                      <li>
                        <div class="stat-group">
                          <label for="stats-hp" class="stat-label">Hit Points - Max:</label>
                          <div class="spacer"></div>
                          <input type="number" id="stats-hp" v-model="characterToView.hp[HP_KEYS.MAX]" class="input-stats" inputmode="numeric" required>
                        </div>
                      </li>

                      <li>
                        <div class="stat-group">
                          <label for="stats-hp" class="stat-label">Hit Points - Temp:</label>
                          <div class="spacer"></div>
                          <input type="number" id="stats-hp" v-model="characterToView.hp[HP_KEYS.TEMP]" class="input-stats" inputmode="numeric" required>
                        </div>
                      </li>

                      <li>
                        <div class="stat-group">
                          <label class="stat-label">Hit Die Type: </label>
                          <div class="spacer"></div>
                          <select class="picker" v-model="characterToView.hp[HP_KEYS.DIE]">
                          <div class="spacer"></div>
                            <option v-for="die in DIE_TYPE" :key="die" :value="die">{{ die }}</option>
                          </select>
                        </div>
                      </li>

                      <li>
                        <div class="stat-group">
                          <label for="stats-hit-die" class="stat-label">Current # of Hit Die: </label>
                          <div class="spacer"></div>
                          <input type="number" id="stats-hit-die" v-model="characterToView.hp[HP_KEYS.DIE_AMOUNT_CURR]" class="input-stats" inputmode="numeric" required>
                        </div>
                      </li>

                      <li>
                        <div class="stat-group">
                          <label for="stats-hit-die" class="stat-label">Max # of Hit Die: </label>
                          <div class="spacer"></div>
                          <input type="number" id="stats-hit-die" v-model="characterToView.hp[HP_KEYS.DIE_AMOUNT_MAX]" class="input-stats" inputmode="numeric" required>
                        </div>
                      </li>

                      <li>
                        <div class="stat-group">
                          <label class="stat-label">Death saves successes: </label>
                          <div class="spacer"></div>
                          <select class="picker" v-model="characterToView.deathSaves.successes">
                          <div class="spacer"></div>
                          <option v-for="count in DEATH_SAVES_COUNTS" :key="count" :value="count">{{ count }}</option>
                          </select>
                          <label class="stat-label">/ 3</label>
                        </div>
                      </li>

                      <li>
                        <div class="stat-group">
                          <label class="stat-label">Death saves failures: </label>
                          <div class="spacer"></div>
                          <select class="picker" v-model="characterToView.deathSaves.failures">
                          <div class="spacer"></div>
                            <option v-for="count in DEATH_SAVES_COUNTS" :key="count" :value="count">{{ count }}</option>
                          </select>
                          <label class="stat-label">/ 3</label>
                        </div>
                      </li>

                      <li>
                        <div class="stat-group">
                          <label for="stats-proficiency-bonus" class="stat-label">Proficiency Bonus: </label>
                          <div class="spacer"></div>
                          <label class="stat-value">{{ getStatBonusSign(getProficiencyBonus()) }}</label>
                        </div>
                      </li>

                      <li>
                        <div class="stat-group">
                          <label for="stats-proficiency-bonus" class="stat-label">Passive Perception: </label>
                          <div class="spacer"></div>
                          <label class="stat-label">{{ getStatBonusSign(calculatePassivePerception()) }}</label>
                        </div>
                      </li>

                      <li>
                        <div class="stat-group">
                          <label for="spells-attack-bonus" class="stat-label">Casting Ability:</label>
                          <div class="spacer"></div>
                          <select class="picker" v-model="characterToView.spellCastStat">
                            <option v-for="stat in STAT_KEYS" :key="stat" :value="stat">{{ STAT_NAMES[stat] }}</option>
                          </select>
                        </div>
                      </li>
                    
                      <li>
                        <div class="stat-group">
                          <label class="stat-label">Spell Saving DC: </label>
                          <div class="spacer"></div>
                          <label class="stat-value">{{ calculateSpellSavingDc(characterToView.scores[characterToView.spellCastStat].calculateMod()) }}</label>
                        </div>
                      </li>

                      <li>
                        <div class="stat-group">
                          <label for="stats-proficiency-bonus" class="stat-label">Inspriation: </label>
                          <div class="spacer"></div>
                          <input type="number" id="stats-inspiration" v-model="characterToView.inspiration" class="input-stats" inputmode="numeric" required>
                        </div>
                      </li>
                    </ul>

                    <div class="buttons-delete-update">
                      <button class="button-update" @click="onPressUpdateCharacterInfo()">Update</button>
                    </div>
                  </div>
                </div>
              </collapse-transition>
            </div>

          </section>

          <br>
          <section id="ability-scores">
            <div class="edit-buttons">
              <div>
                <button class="button-edit-spacer" v-if="!isEditingAbilityScores">Edit</button>
                <button class="button-edit-spacer" v-if="isEditingAbilityScores">Finish</button>
              </div>

              <div class="h3-bar">
                <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.SCORES)">{{ CHARACTER_SECTIONS.ABILITY_SCORES }}</h3>
                <font-awesome-icon icon="chevron-up" v-if="!isShowingAbilityScores" class="collapse-chevron"/>
                <font-awesome-icon icon="chevron-down" v-if="isShowingAbilityScores" class="collapse-chevron"/>
              </div>
              
              <div>
                <button class="button-edit" v-if="!isEditingAbilityScores" @click="toggleEditForStat(CHARACTER_KEYS.SCORES)">Edit</button>
                <button class="button-edit" v-if="isEditingAbilityScores" @click="toggleEditForStat(CHARACTER_KEYS.SCORES)">Finish</button>
              </div>
            </div>
            
            <div id="collapse">
              <collapse-transition dimension="height">
                <div v-if="isShowingAbilityScores">
                  <div v-if="!isEditingAbilityScores">
                    <ul class="stat-list">
                      <li v-for="(stat, key) in STAT_KEYS" :key="key">
                        <div class="stat-group">
                          <label class="stat-label">{{ STAT_NAMES[stat] }}:</label>
                          <label class="stat-value">{{ characterToView.scores[stat].value }}</label>
                          <label class="stat-bonus">{{ getStatBonusSign(characterToView.scores[stat].calculateMod()) }}</label>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <!-- Editing -->
                  <div v-if="isEditingAbilityScores" class="isEditing">
                    <ul class="stat-list">
                      <li v-for="(stat, key) in STAT_KEYS" :key="key">
                        <div class="stat-group">
                          <label for="stats-label" class="stat-label">{{ STAT_NAMES[stat] }}:</label>
                          <div class="spacer"></div>
                          <div>
                            <input type="number" id="stats-label" v-model="characterToView.scores[stat].value" class="input-stats" inputmode="numeric" required>
                            <label class="stat-label">Mod: {{ getStatBonusSign(characterToView.scores[stat].calculateMod()) }}</label>
                          </div>
                        </div>
                      </li>
                    </ul>

                    <div class="buttons-delete-update">
                      <button class="button-update" @click="onPressUpdateAbilityScores()">Update</button>
                    </div>
                  </div>
                </div>
              </collapse-transition>
            </div>
          </section>

          <br>
          <section id="saving-throws">
            <div class="edit-buttons">
              <div>
                <button class="button-edit-spacer" v-if="!isEditingSavingThrows">Edit</button>
                <button class="button-edit-spacer" v-if="isEditingSavingThrows">Finish</button>
              </div>

              <div class="h3-bar">
                <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.SAVING_THROWS)">{{ CHARACTER_SECTIONS.SAVING_THROWS }}</h3>
                <font-awesome-icon icon="chevron-up" v-if="!isShowingSavingThrows" class="collapse-chevron"/>
                <font-awesome-icon icon="chevron-down" v-if="isShowingSavingThrows" class="collapse-chevron"/>
              </div>
              
              <div>
                <button class="button-edit" v-if="!isEditingSavingThrows" @click="toggleEditForStat(CHARACTER_KEYS.SAVING_THROWS)">Edit</button>
                <button class="button-edit" v-if="isEditingSavingThrows" @click="toggleEditForStat(CHARACTER_KEYS.SAVING_THROWS)">Finish</button>
              </div>
            </div>

            <div id="collapse">
              <collapse-transition dimension="height">
                <div v-if="isShowingSavingThrows">
                  <ul class="stat-list">
                    <li v-for="(stat, key) in STAT_KEYS" :key="key">
                      <div class="stat-group">
                        <input type="checkbox" class="checkbox" v-model="characterToView.savingThrows[stat].proficient" :disabled="!isEditingSavingThrows">
                        <label class="stat-label">{{ STAT_NAMES[stat] }}:</label>

                        <label class="stat-value" v-if="characterToView.savingThrows[stat].proficient">
                          {{ getStatBonusSign(characterToView.scores[stat].calculateMod() + getProficiencyBonus()) }}
                        </label>
                        <label class="stat-value" v-if="!characterToView.savingThrows[stat].proficient">
                          {{ getStatBonusSign(characterToView.scores[stat].calculateMod()) }}
                        </label>
                      </div>
                    </li>
                  </ul>

                  <div v-if="isEditingSavingThrows">
                    <div class="buttons-delete-update">
                      <button class="button-update" @click="onPressUpdateSavingThrows()">Update</button>
                    </div>
                  </div>
                </div>
              </collapse-transition>
            </div>
          </section>
          
          <br>
          <section id="skills">
            <div class="edit-buttons">
              <div>
                <button class="button-edit-spacer" v-if="!isEditingSkills">Edit</button>
                <button class="button-edit-spacer" v-if="isEditingSkills">Finish</button>
              </div>

              <div class="h3-bar">
                <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.SKILLS)">{{ CHARACTER_SECTIONS.SKILLS }}</h3>
                <font-awesome-icon icon="chevron-up" v-if="!isShowingSkills" class="collapse-chevron"/>
                <font-awesome-icon icon="chevron-down" v-if="isShowingSkills" class="collapse-chevron"/>
              </div>
              
              <div>
                <button class="button-edit" v-if="!isEditingSkills" @click="toggleEditForStat(CHARACTER_KEYS.SKILLS)">Edit</button>
                <button class="button-edit" v-if="isEditingSkills" @click="toggleEditForStat(CHARACTER_KEYS.SKILLS)">Finish</button>
              </div>
            </div>

            <div id="collapse">
              <collapse-transition dimension="height">
                <div v-if="isShowingSkills">
                  <ul class="stat-list">
                    <li v-for="(skill, key) in SKILL_KEYS" :key="key">
                      <div class="stat-group">
                        <input type="checkbox" class="checkbox" v-model="characterToView.skills[skill].proficient" :disabled="!isEditingSkills">
                        <label class="stat-label">{{ SKILL_NAMES[skill] }}:</label>

                        <label class="stat-value" v-if="characterToView.skills[skill].proficient">
                          {{ getStatBonusSign(characterToView.scores[SKILL_MODS[skill]].calculateMod() + getProficiencyBonus()) }}
                        </label>
                        <label class="stat-value" v-if="!characterToView.skills[skill].proficient">
                          {{ getStatBonusSign(characterToView.scores[SKILL_MODS[skill]].calculateMod()) }}
                        </label>
                      </div>
                    </li>
                  </ul>

                  <div v-if="isEditingSkills">
                    <div class="buttons-delete-update">
                      <button class="button-update" @click="onPressUpdateSkills()">Update</button>
                    </div>
                  </div>
                </div>
              </collapse-transition>
            </div>
            
          </section>

          <br>
          <section id="features-traits">
            <div class="edit-buttons">
              <div>
                <button class="button-edit-spacer" v-if="!isEditingFeaturesTraits">Edit</button>
                <button class="button-edit-spacer" v-if="isEditingFeaturesTraits">Finish</button>
              </div>

              <div class="h3-bar">
                <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.FEATURES)">{{ CHARACTER_SECTIONS.FEATURES_TRAITS }}</h3>
                <font-awesome-icon icon="chevron-up" v-if="!isShowingFeatures" class="collapse-chevron"/>
                <font-awesome-icon icon="chevron-down" v-if="isShowingFeatures" class="collapse-chevron"/>
              </div>
              
              <div>
                <button class="button-edit" v-if="!isEditingFeaturesTraits" @click="toggleEditForStat(CHARACTER_KEYS.FEATURES)">Edit</button>
                <button class="button-edit" v-if="isEditingFeaturesTraits" @click="toggleEditForStat(CHARACTER_KEYS.FEATURES)">Finish</button>
              </div>
            </div>

            <div id="collapse">
              <collapse-transition dimension="height">
                <div v-if="isShowingFeatures">
                  <!-- Add new -->
                  <template v-if="isEditingFeaturesTraits">
                    <div>
                      <input class="item-input" type="text" v-model="featuresTempName" placeholder="New feature/trait name"> 
                      <div class="container-inputs">
                        <ul class="list-inputs">
                          <li>
                            <label class="stat-label">Type:</label>
                            <select class="picker" v-model="featuresTempType">
                              <option v-for="feat in FEATURES_TYPES" :key="feat" :value="feat">{{ feat }}</option>
                            </select>
                          </li>

                          <li>
                            <label class="stat-label">Action Type:</label>
                            <select class="picker" v-model="featuresTempAction">
                              <option v-for="action in ACTION_TYPES" :key="action" :value="action">{{ action }}</option>
                            </select>
                          </li>

                          <li>
                            <label for="features-input" class="stat-label"> # of Uses:</label>
                            <input class="input-stats" ßtype="number" inputmode="numeric" v-model="featuresTempUses"> 
                          </li>
                        </ul>
                      </div>
                      
                      <br>
                      <textarea v-model="featuresTempDescription" rows="4" placeholder="Description"></textarea>
                      <br>
                      <button class="button-add" @click="onPressAddFeatures">Add</button>

                      <ul class="list">
                        <hr class="list-divider">
                      </ul>
                      
                    </div>
                  </template>

                  <template v-if="getDictionarySize(characterToView.featuresTraits) > 0">
                    <div>
                      <ul class="list">
                        <li v-for="(item, key) in characterToView.featuresTraits" :key="key">
                          <div v-if="!isEditingFeaturesTraits">
                            <label class="item-name">{{ key }}</label>
                            <label class="item-amount">x{{ item[FEATURES_KEYS.USES] }}</label>
                            <p class="item-description">Type: {{ item[FEATURES_KEYS.TYPE] }}</p>
                            <p class="item-description">Action Type: {{ item[FEATURES_KEYS.ACTION] }}</p>
                            <p class="item-description">{{ item[FEATURES_KEYS.DESCRIPTION] }}</p>
                          </div>

                          <!-- Edit and Delete -->
                          <div v-if="isEditingFeaturesTraits">
                            <label class="item-name">{{ key }}</label>
                            <div class="container-inputs">
                              <ul class="list-inputs">
                                <li>
                                  <label class="stat-label">Type:</label>
                                  <select class="picker" v-model="item[FEATURES_KEYS.TYPE]">
                                    <option v-for="feat in FEATURES_TYPES" :key="feat" :value="feat">{{ feat }}</option>
                                  </select>
                                </li>

                                <li>
                                  <label class="stat-label">Action Type:</label>
                                  <select class="picker" v-model="item[FEATURES_KEYS.ACTION]">
                                    <option v-for="action in ACTION_TYPES" :key="action" :value="action">{{ action }}</option>
                                  </select>
                                </li>

                                <li>
                                  <label class="stat-label" for="features-input"> # of Uses:</label>
                                  <input class="input-stats" type="number" inputmode="numeric" v-model="item[FEATURES_KEYS.USES]"> 
                                </li>
                              </ul>
                            </div>

                            <div class="container-edit">
                              <textarea v-model="item[FEATURES_KEYS.DESCRIPTION]" rows="4" placeholder="Description"></textarea>
                              <div class="buttons-delete-update">
                                <button class="button-delete" @click="onPressDeleteStat(key, CHARACTER_KEYS.FEATURES)">Delete</button>
                                <button class="button-update" @click="onPressUpdateStat(key, item, CHARACTER_KEYS.FEATURES)">Update</button>
                              </div>
                            </div>
                            
                            <hr class="list-divider">
                          </div>
                        </li>
                      </ul>
                    </div>
                  </template>
                </div>
              </collapse-transition>
            </div>
            
          </section>

          <br>
          <section id="weapons">
            <div class="edit-buttons">
              <div>
                <button class="button-edit-spacer" v-if="!isEditingWeapons">Edit</button>
                <button class="button-edit-spacer" v-if="isEditingWeapons">Finish</button>
              </div>

              <div class="h3-bar">
                <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.WEAPONS)">{{ CHARACTER_SECTIONS.WEAPONS_SPELLS }}</h3>
                <font-awesome-icon icon="chevron-up" v-if="!isShowingWeapons" class="collapse-chevron"/>
                <font-awesome-icon icon="chevron-down" v-if="isShowingWeapons" class="collapse-chevron"/>
              </div>
              
              <div>
                <button class="button-edit" v-if="!isEditingWeapons" @click="toggleEditForStat(CHARACTER_KEYS.WEAPONS)">Edit</button>
                <button class="button-edit" v-if="isEditingWeapons" @click="toggleEditForStat(CHARACTER_KEYS.WEAPONS)">Finish</button>
              </div>
            </div>

            <div id="collapse">
              <collapse-transition dimension="height">
                <div v-if="isShowingWeapons">
                  <!-- Add new -->
                  <template v-if="isEditingWeapons">
                    <div>
                      <input class="item-input" type="text" v-model="weaponTempName" placeholder="New weapon/spell name"> 

                      <div class="container-inputs">
                        <ul class="list-inputs">
                          <li>
                            <label class="stat-label" for="equipment-input">Amount:</label>
                            <input class="input-stats" type="number" inputmode="numeric" v-model="weaponTempAmount"> 
                          </li>

                          <li>
                            <label class="stat-label" for="equipment-input">{{ WEAPON_NAMES[WEAPON_KEYS.ATTACK_DAMAGE_STAT] }}:</label>
                            <select class="picker" v-model="weaponsTempAttackModifier">
                              <option v-for="mod in WEAPON_MODS" :key="mod" :value="mod">{{ STAT_NAMES[mod] }}</option>
                            </select>
                          </li>
                          
                          <li>
                            <label class="stat-label" for="equipment-input">Die Type:</label>
                            <select class="picker" v-model="weaponTempDieType">
                              <option v-for="die in DIE_TYPE" :key="die" :value="die">{{ die }}</option>
                            </select>
                          </li>

                          <li>
                            <label class="stat-label" for="equipment-input">Category:</label>
                            <select class="picker" v-model="weaponTempCategory">
                              <option v-for="category in WEAPON_CATEGORY" :key="category" :value="category">{{ category }}</option>
                            </select>
                          </li>

                          <li>
                            <label class="stat-label" for="equipment-input">Proficient:</label>
                            <input type="checkbox" class="checkbox" v-model="weaponTempIsProficient">
                          </li>
                        </ul>
                      </div>

                      <br>
                      <textarea v-model="weaponTempDescription" rows="4" placeholder="Description"></textarea>
                      <br>
                      <button class="button-add" @click="onPressAddWeapon">Add</button>
                      
                      <ul class="list">
                        <hr class="list-divider">
                      </ul>
                    </div>
                  </template>

                  <template v-if="getDictionarySize(characterToView.weapons) > 0">
                    <div>
                      <ul class="list">
                        <li v-for="(item, key) in characterToView.weapons" :key="key">
                          <div v-if="!isEditingWeapons">
                            <label class="item-name">{{ key }}</label>
                            <label class="item-amount">x{{ item[WEAPON_KEYS.AMOUNT] }}</label>

                            <div class="spell-list">
                              <div class="spell-group">
                                <label class="spell-label">{{ WEAPON_NAMES[WEAPON_KEYS.ATTACK_DAMAGE_STAT] }}:</label>
                                <label class="spell-value" v-if="!item[WEAPON_KEYS.PROFICIENT]">
                                  {{ getStatBonusSign(getStatModFromKey(item[WEAPON_KEYS.ATTACK_DAMAGE_STAT])) }} ({{ STAT_NAMES[item[WEAPON_KEYS.ATTACK_DAMAGE_STAT]] }})
                                </label>
                                <label class="spell-value" v-if="item[WEAPON_KEYS.PROFICIENT]">
                                  {{ getStatBonusSign(getStatModFromKey(item[WEAPON_KEYS.ATTACK_DAMAGE_STAT]) + getProficiencyBonus()) }} ({{ STAT_NAMES[item[WEAPON_KEYS.ATTACK_DAMAGE_STAT]] }})
                                </label>
                              </div>

                              <div class="spell-group">
                                <label class="spell-label">{{ WEAPON_NAMES.DAMAGE_MOD }}:</label>
                                <label class="spell-value">
                                  {{ getStatBonusSign(getStatModFromKey(item[WEAPON_KEYS.ATTACK_DAMAGE_STAT])) }} ({{ STAT_NAMES[item[WEAPON_KEYS.ATTACK_DAMAGE_STAT]] }})
                                </label>
                              </div>

                              <div class="spell-group">
                                <label class="spell-label">{{ WEAPON_NAMES[WEAPON_KEYS.DIE] }}:</label>
                                <label class="spell-value">{{ item[WEAPON_KEYS.DIE] }}</label>
                              </div>

                              <div class="spell-group">
                                <label class="spell-label">{{ WEAPON_NAMES[WEAPON_KEYS.CATEGORY] }}:</label>
                                <label class="spell-value">{{ item[WEAPON_KEYS.CATEGORY] }}</label>
                              </div>

                              <div class="spell-group">
                                <label class="spell-label">{{ WEAPON_NAMES[WEAPON_KEYS.PROFICIENT] }}:</label>
                                <input type="checkbox" class="checkbox" v-model="item[WEAPON_KEYS.PROFICIENT]" :disabled="!isEditingWeapons">
                              </div>
                            </div>
                            
                            <p class="spell-label">{{ item[WEAPON_KEYS.DESCRIPTION] }}</p>
                          </div>

                          <!-- Edit and Delete -->
                          <div v-if="isEditingWeapons">
                            <label class="item-name">{{ key }}:</label>
                            
                            <div class="container-inputs">
                              <ul class="list-inputs">
                                <li>
                                  <label class="stat-label" for="equipment-input">{{ WEAPON_NAMES[WEAPON_KEYS.AMOUNT] }}:</label>
                                  <input class="input-stats" type="number" inputmode="numeric" v-model="item[WEAPON_KEYS.AMOUNT]"> 
                                </li>
                                
                                <li>
                                  <label class="stat-label" for="equipment-input">{{ WEAPON_NAMES[WEAPON_KEYS.ATTACK_DAMAGE_STAT] }}:</label>
                                  <select class="picker" v-model="item[WEAPON_KEYS.ATTACK_DAMAGE_STAT]">
                                    <option v-for="mod in WEAPON_MODS" :key="mod" :value="mod">{{ STAT_NAMES[mod] }}</option>
                                  </select>
                                </li>
                                
                                <li>
                                  <label class="stat-label" for="equipment-input">{{ WEAPON_NAMES[WEAPON_KEYS.DIE] }}:</label>
                                  <select class="picker" v-model="item[WEAPON_KEYS.DIE]">
                                    <option v-for="die in DIE_TYPE" :key="die" :value="die">{{ die }}</option>
                                  </select>
                                </li>

                                <li>
                                  <label class="stat-label" for="equipment-input">{{ WEAPON_NAMES[WEAPON_KEYS.CATEGORY] }}:</label>
                                  <select class="picker" v-model="item[WEAPON_KEYS.CATEGORY]">
                                    <option v-for="category in WEAPON_CATEGORY" :key="category" :value="category">{{ category }}</option>
                                  </select>
                                </li>

                                <li>
                                  <label class="stat-label" for="equipment-input">{{ WEAPON_NAMES[WEAPON_KEYS.PROFICIENT] }}:</label>
                                  <input type="checkbox" class="checkbox" v-model="item[WEAPON_KEYS.PROFICIENT]">
                                </li>

                                <br>
                                <textarea v-model="item[WEAPON_KEYS.DESCRIPTION]" rows="4" placeholder="Description"></textarea>
                              </ul>
                            </div>

                            <div class="buttons-delete-update">
                              <button class="button-delete" @click="onPressDeleteStat(key, CHARACTER_KEYS.WEAPONS)">Delete</button>
                              <button class="button-update" @click="onPressUpdateStat(key, item, CHARACTER_KEYS.WEAPONS)">Update</button>
                            </div>
                            
                            <hr class="list-divider">
                          </div>
                        </li>
                      </ul>
                    </div>
                  </template>
                </div>
              </collapse-transition>
            </div>
          </section>

          <br>
          <section id="equipment">
            <div class="edit-buttons">
              <div>
                <button class="button-edit-spacer" v-if="!isEditingEquipment">Edit</button>
                <button class="button-edit-spacer" v-if="isEditingEquipment">Finish</button>
              </div>

              <div class="h3-bar">
                <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.EQUIPMENT)">{{ CHARACTER_SECTIONS.EQUIPMENT }}</h3>
                <font-awesome-icon icon="chevron-up" v-if="!isShowingEquipment" class="collapse-chevron"/>
                <font-awesome-icon icon="chevron-down" v-if="isShowingEquipment" class="collapse-chevron"/>
              </div>
              
              <div>
                <button class="button-edit" v-if="!isEditingEquipment" @click="toggleEditForStat(CHARACTER_KEYS.EQUIPMENT)">Edit</button>
                <button class="button-edit" v-if="isEditingEquipment" @click="toggleEditForStat(CHARACTER_KEYS.EQUIPMENT)">Finish</button>
              </div>
            </div>

            <div id="collapse">
              <collapse-transition dimension="height">
                <div v-if="isShowingEquipment">
                  <!-- Add new -->
                  <template v-if="isEditingEquipment">
                    <div>
                      <input class="item-input" type="text" v-model="equipmentTempName" placeholder="New item name"> 
                      <div>
                        <label class="stat-label" for="equipment-input">Amount:</label>
                        <input class="input-stats" v-model="equipmentTempAmount" type="number" inputmode="numeric"> 
                      </div>
                      <br>
                      <textarea v-model="equipmentTempDescription" rows="4" placeholder="Description"></textarea>
                      <br>
                      <button class="button-add" @click="onPressAddEquipment">Add</button>

                      <ul class="list">
                        <hr class="list-divider">
                      </ul>
                    </div>
                  </template>

                  <ul class="list">
                    <li>
                      <div v-if="!isEditingEquipment">
                        <label class="item-name">Gold:</label>
                        <label class="item-amount">x{{ characterToView.gold }}</label>
                      </div>
                      <div v-if="isEditingEquipment">
                        <label class="item-name">Gold:</label>
                        <input type="number" id="spells-casting-duration" v-model="characterToView.gold" class="input-stats" inputmode="numeric" required>
                        <button class="button-update" @click="onPressUpdateGold()">Update</button>
                      </div>
                    </li>
                  </ul>
                  <template v-if="getDictionarySize(characterToView.equipment) > 0">
                    <ul class="list">                      
                      <li v-for="(item, key) in characterToView.equipment" :key="key">
                        <div v-if="!isEditingEquipment">
                          <label class="item-name">{{ key }}</label>
                          <label class="item-amount">x{{ item[EQUIPMENT_KEYS.AMOUNT] }}</label>
                          <p class="item-description">{{ item[EQUIPMENT_KEYS.DESCRIPTION] }}</p>
                        </div>

                        <!-- Edit and Delete -->
                        <div v-if="isEditingEquipment">
                          <label class="item-name">{{ key }}:</label>
                          <div class="container-edit">
                            <div>
                              <label class="stat-label" for="equipment-input">Amount:</label>
                              <input class="input-stats" v-model="item[EQUIPMENT_KEYS.AMOUNT]" type="number" inputmode="numeric"> 
                            </div>
                            <textarea v-model="item[EQUIPMENT_KEYS.DESCRIPTION]" rows="4" placeholder="Description"></textarea>
                          </div>

                          <div class="buttons-delete-update">
                            <button class="button-delete" @click="onPressDeleteStat(key, CHARACTER_KEYS.EQUIPMENT)">Delete</button>
                            <button class="button-update" @click="onPressUpdateStat(key, item, CHARACTER_KEYS.EQUIPMENT)">Update</button>
                          </div>
                          
                          <hr class="list-divider">
                        </div>
                      </li>
                    </ul>
                  </template>
                </div>
              </collapse-transition>
            </div>
          </section>

          <br>
          <section id="treasure">
            <div class="edit-buttons">
              <div>
                <button class="button-edit-spacer" v-if="!isEditingTreasure">Edit</button>
                <button class="button-edit-spacer" v-if="isEditingTreasure">Finish</button>
              </div>

              <div class="h3-bar">
                <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.TREASURES)">{{ CHARACTER_SECTIONS.TREASURES }}</h3>
                <font-awesome-icon icon="chevron-up" v-if="!isShowingTreasure" class="collapse-chevron"/>
                <font-awesome-icon icon="chevron-down" v-if="isShowingTreasure" class="collapse-chevron"/>
              </div>
              
              <div>
                <button class="button-edit" v-if="!isEditingTreasure" @click="toggleEditForStat(CHARACTER_KEYS.TREASURES)">Edit</button>
                <button class="button-edit" v-if="isEditingTreasure" @click="toggleEditForStat(CHARACTER_KEYS.TREASURES)">Finish</button>
              </div>
            </div>

            <div id="collapse">
              <collapse-transition dimension="height">
                <div v-if="isShowingTreasure">
                  <!-- Add new -->
                  <template v-if="isEditingTreasure">
                    <div>
                      <input class="item-input" type="text" v-model="treasureTempName" placeholder="New treasure name"> 
                      <div>
                        <label class="stat-label" for="equipment-input">Amount:</label>
                        <input class="input-stats" type="number" inputmode="numeric" v-model="treasureTempAmount"> 
                      </div>
                      <br>
                      <textarea v-model="treasureTempDescription" rows="4" placeholder="Description"></textarea>
                      <br>
                      <button class="button-add" @click="onPressAddTreasure">Add</button>

                      <ul class="list">
                        <hr class="list-divider">
                      </ul>
                    </div>
                  </template>

                  <template v-if="getDictionarySize(characterToView.treasures) > 0">
                    <div>
                      <ul class="list">
                        <li v-for="(item, key) in characterToView.treasures" :key="key">
                          <div v-if="!isEditingTreasure">
                            <label class="item-name">{{ key }}</label>
                            <label class="item-amount">x{{ item[EQUIPMENT_KEYS.AMOUNT] }}</label>
                            <p class="item-description">{{ item[EQUIPMENT_KEYS.DESCRIPTION] }}</p>
                          </div>

                          <!-- Edit and Delete -->
                          <div v-if="isEditingTreasure">
                            <label class="item-name">{{ key }}:</label>
                            <div class="container-edit">
                              <div>
                                <label class="stat-label" for="equipment-input">Amount:</label>
                                <input class="input-stats" type="number" inputmode="numeric" v-model="item[EQUIPMENT_KEYS.AMOUNT]"> 
                              </div>
                              <textarea v-model="item[EQUIPMENT_KEYS.DESCRIPTION]" rows="4" placeholder="Description"></textarea>
                            </div>

                            <div class="buttons-delete-update">
                              <button class="button-delete" @click="onPressDeleteStat(key, CHARACTER_KEYS.TREASURES)">Delete</button>
                              <button class="button-update" @click="onPressUpdateStat(key, item, CHARACTER_KEYS.TREASURES)">Update</button>
                            </div>
                            
                            <hr class="list-divider">
                          </div>
                        </li>
                      </ul>
                    </div>
                  </template>
                </div>
              </collapse-transition>
            </div>

          </section>
          
          <br>
          <section id="languages">
            <div class="edit-buttons">
              <div>
                <button class="button-edit-spacer" v-if="!isEditingLanguages">Edit</button>
                <button class="button-edit-spacer" v-if="isEditingLanguages">Finish</button>
              </div>

              <div class="h3-bar">
                <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.LANGUAGES)">{{ CHARACTER_SECTIONS.LANGUAGES }}</h3>
                <font-awesome-icon icon="chevron-up" v-if="!isShowingLanguages" class="collapse-chevron"/>
                <font-awesome-icon icon="chevron-down" v-if="isShowingLanguages" class="collapse-chevron"/>
              </div>
              
              <div>
                <button class="button-edit" v-if="!isEditingLanguages" @click="toggleEditForStat(CHARACTER_KEYS.LANGUAGES)">Edit</button>
                <button class="button-edit" v-if="isEditingLanguages" @click="toggleEditForStat(CHARACTER_KEYS.LANGUAGES)">Finish</button>
              </div>
            </div>

            <div id="collapse">
              <collapse-transition dimension="height">
                <div v-if="isShowingLanguages">
                  <!-- Add new -->
                  <template v-if="isEditingLanguages">
                    <div class="language-container">
                      <input class="item-input" type="text" v-model="languagesTempName" placeholder="New language name"> 
                      <div>
                        <label class="stat-label">Proficiency: </label>
                        <select class="picker" v-model="languagesTempProficiency">
                          <option v-for="prof in LANGUAGE_PROFICIENCY" :key="prof" :value="prof">{{ prof }}</option>
                        </select>
                      </div>
                      <br>
                      <button class="button-add" @click="onPressAddLanguage">Add</button>

                      <ul class="list">
                        <hr class="list-divider">
                      </ul>
                    </div>
                  </template>

                  <template v-if="getDictionarySize(characterToView.languages) > 0">
                    <ul>
                      <li v-for="(item, key) in characterToView.languages" :key="key">
                        <div v-if="!isEditingLanguages">
                          <div class="language-group">
                            <p class="language-label">{{ key }}:</p>
                            <p class="language-value">{{ item }}</p>
                          </div>
                        </div>

                        <!-- Edit and Delete -->
                        <div v-if="isEditingLanguages">
                          <div>
                            <label class="item-name">{{ key }}:</label>
                            <select class="picker" v-model="characterToView.languages[key]">
                              <option v-for="prof in LANGUAGE_PROFICIENCY" :key="prof" :value="prof">{{ prof }}</option>
                            </select>
                          </div>

                          <div class="buttons-delete-update">
                            <br>
                            <button class="button-delete" @click="onPressDeleteStat(key, CHARACTER_KEYS.LANGUAGES)">Delete</button>
                            <button class="button-update" @click="onPressUpdateStat(key, item, CHARACTER_KEYS.LANGUAGES)">Update</button>
                          </div>
                          
                          <hr class="list-divider">
                        </div>
                        
                      </li>
                    </ul>
                  </template>
                </div>
              </collapse-transition>
            </div>

            
          </section>      

          <br>
          <section id="proficiencies">
            <div class="edit-buttons">
              <div>
                <button class="button-edit-spacer" v-if="!isEditingProficiencies">Edit</button>
                <button class="button-edit-spacer" v-if="isEditingProficiencies">Finish</button>
              </div>

              <div class="h3-bar">
                <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.PROFICIENCIES)">{{ CHARACTER_SECTIONS.PROFICIENCIES }}</h3>
                <font-awesome-icon icon="chevron-up" v-if="!isShowingProficiencies" class="collapse-chevron"/>
                <font-awesome-icon icon="chevron-down" v-if="isShowingProficiencies" class="collapse-chevron"/>
              </div>
              
              <div>
                <button class="button-edit" v-if="!isEditingProficiencies" @click="toggleEditForStat(CHARACTER_KEYS.PROFICIENCIES)">Edit</button>
                <button class="button-edit" v-if="isEditingProficiencies" @click="toggleEditForStat(CHARACTER_KEYS.PROFICIENCIES)">Finish</button>
              </div>
            </div>

            <div id="collapse">
              <collapse-transition dimension="height">
                <div v-if="isShowingProficiencies">
                  <!-- Add new -->
                  <template v-if="isEditingProficiencies">
                    <div class="proficiency-container">
                      <input class="item-input" v-model="proficiencyTempName" placeholder="New proficiency name"> 
                      <br>
                      <textarea v-model="proficiencyTempDescription" rows="4" placeholder="Description"></textarea>
                      <br>
                      <button class="button-add" @click="onPressAddProficiency">Add</button>

                      <ul class="list">
                        <hr class="list-divider">
                      </ul>
                    </div>
                  </template>

                  <template v-if="getDictionarySize(characterToView.proficiencies) > 0">
                    <ul class="list">
                      <li v-for="(item, key) in characterToView.proficiencies" :key="key">
                        <div v-if="!isEditingProficiencies">
                          <label class="item-name">{{ key }}</label>
                          <p class="item-description">{{ item }}</p>
                        </div>

                        <!-- Edit and Delete -->
                        <div v-if="isEditingProficiencies">
                          <label class="item-name">{{ key }}:</label>
                          <div class="container-edit">
                            <textarea v-model="characterToView.proficiencies[key]" rows="4" placeholder="Description"></textarea>
                          </div>

                          <div class="buttons-delete-update">
                            <button class="button-delete" @click="onPressDeleteStat(key, CHARACTER_KEYS.PROFICIENCIES)">Delete</button>
                            <button class="button-update" @click="onPressUpdateStat(key, item, CHARACTER_KEYS.PROFICIENCIES)">Update</button>
                          </div>
                          
                          <hr class="list-divider">
                        </div>
                      </li>
                    </ul>
                  </template>
                </div>
              </collapse-transition>
            </div>
            
          </section>

          <br>
          <section id="spell-slots">
            <div class="edit-buttons">
              <div>
                <button class="button-edit-spacer" v-if="!isEditingSpellSlots">Edit</button>
                <button class="button-edit-spacer" v-if="isEditingSpellSlots">Finish</button>
              </div>

              <div class="h3-bar">
                <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.SPELL_SLOTS)">{{ CHARACTER_SECTIONS.SPELL_SLOTS }}</h3>
                <font-awesome-icon icon="chevron-up" v-if="!isShowingSpellSlots" class="collapse-chevron"/>
                <font-awesome-icon icon="chevron-down" v-if="isShowingSpellSlots" class="collapse-chevron"/>
              </div>
              
              <div>
                <button class="button-edit" v-if="!isEditingSpellSlots" @click="toggleEditForStat(CHARACTER_KEYS.SPELL_SLOTS)">Edit</button>
                <button class="button-edit" v-if="isEditingSpellSlots" @click="toggleEditForStat(CHARACTER_KEYS.SPELL_SLOTS)">Finish</button>
              </div>
            </div>

            <collapse-transition dimension="height">
              <div v-if="isShowingSpellSlots">
                <!-- Add new -->
                <template v-if="isEditingSpellSlots">
                  <div class="container-inputs">
                    <ul class="list-inputs">
                      <li>
                        <label class="stat-label">Level:</label>
                        <select class="picker" v-model="spellSlotTempLevel">
                          <option v-for="level in SPELL_CASTING_LEVELS" :key="level" :value="level">{{ SPELL_SLOT_NAMES_PICKER[level] }}</option>
                        </select>
                      </li>

                      <li>
                        <label class="stat-label" for="equipment-input"># of slots:</label>
                        <input class="input-stats" type="number" inputmode="numeric" v-model="spellSlotTempSlots"> 
                      </li>
                    </ul>
                  </div>

                  <br>
                  <button class="button-add" @click="onPressAddSpellSlot">Add</button>

                  <ul class="list">
                    <hr class="list-divider">
                  </ul>
                </template>

                <template v-if="getDictionarySize(characterToView.spellSlots) > 0">
                  <div>
                    <ul class="list">
                      <li v-for="(item, key) in characterToView.spellSlots" :key="key">
                        <div v-if="!isEditingSpellSlots">
                          <label class="item-name">{{ SPELL_CASTING_NAMES[key] }}:</label>
                          <label class="item-amount">{{ item[SPELL_SLOT_KEYS.MAX] }} slots</label>
                        </div>

                        <!-- Edit and Delete -->
                        <div v-if="isEditingSpellSlots">
                          <label class="item-name">{{ SPELL_CASTING_NAMES[key] }}:</label>
                          
                          <div class="container-inputs">
                            <ul class="list-inputs">
                              <li>
                                <label class="stat-label" for="equipment-input">Available # of slots:</label>
                                <input class="input-stats" type="number" inputmode="numeric" v-model="item[SPELL_SLOT_KEYS.CURRENT]"> 
                              </li>
                              
                              <li>
                                <label class="stat-label" for="equipment-input">Max # of slots:</label>
                                <input class="input-stats" type="number" inputmode="numeric" v-model="item[SPELL_SLOT_KEYS.MAX]"> 
                              </li>
                            </ul>
                          </div>

                          <div class="buttons-delete-update">
                            <button class="button-delete" @click="onPressDeleteStat(key, CHARACTER_KEYS.SPELL_SLOTS)">Delete</button>
                            <button class="button-update" @click="onPressUpdateStat(key, item, CHARACTER_KEYS.SPELL_SLOTS)">Update</button>
                          </div>
                          
                          <hr class="list-divider">
                        </div>
                      </li>
                    </ul>
                  </div>
                </template>
              </div>
            </collapse-transition>
          </section>

          <br>
          <section id="spell-casting">
            <div class="edit-buttons">
              <div>
                <button class="button-edit-spacer" v-if="!isEditingSpellCasting">Edit</button>
                <button class="button-edit-spacer" v-if="isEditingSpellCasting">Finish</button>
              </div>

              <div class="h3-bar">
                <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.SPELLS)">{{ CHARACTER_SECTIONS.SPELL_CASTING }}</h3>
                <font-awesome-icon icon="chevron-up" v-if="!isShowingSpells" class="collapse-chevron"/>
                <font-awesome-icon icon="chevron-down" v-if="isShowingSpells" class="collapse-chevron"/>
              </div>
              
              <div>
                <button class="button-edit" v-if="!isEditingSpellCasting" @click="toggleEditForStat(CHARACTER_KEYS.SPELLS)">Edit</button>
                <button class="button-edit" v-if="isEditingSpellCasting" @click="toggleEditForStat(CHARACTER_KEYS.SPELLS)">Finish</button>
              </div>
            </div>

            <div id="collapse">
              <collapse-transition dimension="height">
                <div v-if="isShowingSpells">
                  <!-- Add new -->
                  <template v-if="isEditingSpellCasting">
                    <div>
                      <input class="item-input" type="text" v-model="spellTempName" placeholder="New spell name"> 
                      <div class="container-inputs">
                        <ul class="list-inputs">
                          <li>
                            <label class="stat-label" for="spells-level">Level:</label>
                            <select class="picker" v-model="spellTempLevel">
                              <option v-for="levels in SPELL_CASTING_LEVELS" :key="levels" :value="levels">{{ SPELL_CASTING_NAMES_PICKER[levels] }}</option>
                            </select>
                          </li>
                          
                          <li>
                            <label class="stat-label" for="spells-casting-time">Casting Time (# of actions):</label>
                            <input type="number" id="spells-casting-time" v-model="spellTempCastingTime" class="input-stats" inputmode="numeric" required>
                          </li>

                          <li>
                            <label class="stat-label">Duration:</label>
                            <input type="number" id="spells-casting-duration" v-model="spellTempDuration" class="input-stats" inputmode="numeric" required :class="{ 'disabled-button': spellTempDurationType == [SPELL_CASTING_DURATION_TYPES.INSTANT]}">

                            <select class="picker" v-model="spellTempDurationType">
                              <option v-for="dType in SPELL_CASTING_DURATION_TYPES" :key="dType" :value="dType">{{ dType }}</option>
                            </select>
                          </li>

                          <li>
                            <label class="stat-label" for="spells-range">Range (in feet):</label>
                            <input type="number" id="spells-range" v-model="spellTempRange" class="input-stats" inputmode="numeric" required>
                          </li>
                        </ul>
                      </div>

                      <br>
                      <textarea v-model="spellTempDescription" rows="4" placeholder="Description"></textarea>
                      <br>
                      <button class="button-add" @click="onPressAddSpell">Add</button>

                      <ul class="list">
                        <hr class="list-divider">
                      </ul>
                    </div>
                  </template>

                  <template v-if="getDictionarySize(characterToView.spells) > 0">
                    <ul class="list">
                      <li v-for="(levelDict, level) in characterToView.spells" :key="level">
                        <template v-if="getDictionarySize(levelDict) > 0">
                          <label class="item-name">{{ SPELL_CASTING_NAMES[level] }}:</label>
                          <ul>
                            <li v-for="(spell, spellName) in levelDict" :key="spellName">
                              <div v-if="!isEditingSpellCasting">
                                <label class="item-name">{{ spellName }}</label>
                                <br>
                                <div class="spell-list">
                                  <div class="spell-group">
                                    <label class="spell-label">Casting Time:</label>
                                    <label class="spell-value">{{ spell[[SPELL_CASTING_KEYS.CASTING_TIME]] }} action(s)</label>
                                  </div>

                                  <div class="spell-group">
                                    <label class="spell-label">Duration:</label>
                                    <label class="spell-value">{{ spell[[SPELL_CASTING_KEYS.DURATION]] }} {{ spell[[SPELL_CASTING_KEYS.DURATION_TYPE]] }}</label>
                                  </div>

                                  <div class="spell-group">
                                    <label class="spell-label">Range:</label>
                                    <label class="spell-value">{{ spell[[SPELL_CASTING_KEYS.RANGE]] }} ft</label>
                                  </div>
                                </div>
                                <label class="spell-description">{{ spell[[SPELL_CASTING_KEYS.DESCRIPTION]] }}</label>
                              </div>

                              <!-- Edit and Delete -->
                              <div v-if="isEditingSpellCasting">
                                <label class="item-name">{{ spellName }}</label>
                                <div class="container-inputs">
                                  <ul class="list-inputs">
                                    <li>
                                      <label for="spells-casting-time" class="stat-label">Casting Time (# of actions):</label>
                                      <input type="number" id="spells-casting-time" v-model="spell[SPELL_CASTING_KEYS.CASTING_TIME]" class="input-stats" inputmode="numeric" required>
                                    </li>

                                    <li>
                                      <label class="stat-label">Duration:</label>
                                      <input type="number" id="spells-casting-duration" v-model="spell[SPELL_CASTING_KEYS.DURATION]" class="input-stats" inputmode="numeric" required :class="{ 'disabled-button': spellTempDurationType == [SPELL_CASTING_DURATION_TYPES.INSTANT]}">

                                      <select class="picker" v-model="spell[SPELL_CASTING_KEYS.DURATION_TYPE]">
                                        <option v-for="dType in SPELL_CASTING_DURATION_TYPES" :key="dType" :value="dType">{{ dType }}</option>
                                      </select>
                                    </li>
                                    
                                    <li>
                                      <label for="spells-range" class="stat-label">Range (in feet):</label>
                                      <input type="number" id="spells-range" v-model="spell[SPELL_CASTING_KEYS.RANGE]" class="input-stats" inputmode="numeric" required>
                                    </li>
                                  </ul>
                                </div>
                                
                                <br>
                                <textarea v-model="spell[SPELL_CASTING_KEYS.DESCRIPTION]" rows="4" placeholder="Description"></textarea>
                                <div class="buttons-delete-update">
                                  <button class="button-delete" @click="onPressDeleteSpell(level, spellName, CHARACTER_KEYS.SPELLS)">Delete</button>
                                  <button class="button-update" @click="onPressUpdateSpell(level, spellName, spell, CHARACTER_KEYS.SPELLS)">Update</button>
                                </div>
                          
                                <hr class="list-divider">
                              </div>
                            </li>
                          </ul>
                        </template>
                      </li>
                    </ul>
                  </template>
                </div>
              </collapse-transition>
            </div>
          </section>

          <br>
          <section id="save-delete-buttons" :class="{ 'disabled-page': isPopupOpen() }">
            <ul class="buttons-at-bottom">
              <li>
                <button class="button-view-backups" @click="getCharacterBackups">View Backups</button>
                <!-- <button class="button-view-backups" @click="toggleCharacterBackupPopup">View Backups</button> -->
                <button class="button-save" @click="toggleSaveCharacterPopup">Backup Character</button>
              </li>

              <li>
                <button class="button-delete" @click="toggleDeleteCharacterPopup">Delete Character</button>
              </li>
            </ul>
          </section>

          <!-- Save Character Data Popup -->
          <div id="save-character">
            <transition name="fade" appear>
              <div class="overlay" v-if="isSaveCharacterPopupOpen">
                <div class="popup">
                  <div class="form">
                    <h1>Create backup for {{ characterToView.name }}?</h1>
                    <div class="buttons-delete-character">
                      <button class="button-cancel-delete" @click="toggleSaveCharacterPopup">Cancel</button>
                      <button class="button-save" @click="onPressSaveBackup">Save</button>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <!-- Delete Character Popup -->
          <div id="delete-character">
            <transition name="fade" appear>
              <div class="overlay" v-if="isDeleteCharacterPopupOpen">
                <div class="popup">
                  <div class="form">
                    <h1>Delete {{ characterToView.name }}?</h1>
                    <p class="popup-message">This action can't be undone</p>
                    <div class="buttons-delete-character">
                      <button class="button-cancel-delete" @click="toggleDeleteCharacterPopup">Cancel</button>
                      <button class="button-delete" @click="onPressDeleteCharacter">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <!-- Character Backups Popup -->
          <transition name="fade" appear>
            <div class="overlay" v-if="isCharacterBackupsPopupOpen">
              <div class="popup-backup">
                <h1>Select a backup to view</h1>
                <p class="spell-description">(Showing most recent {{ CONST_NUMS.BACKUP_LIMIT }} backups)</p>

                <div class="popup-content">
                  <ul class="reverse-list">
                    <li v-for="(backup, timestamp) in store.getters.getCharacterBackups[this.characterToViewId]" :key="timestamp" :class="{ 'selected': selectedBackupTimestamp === timestamp }"
                    @click="selectBackup(timestamp, backup)">
                      <p>{{ convertTimestampToString(timestamp) }}</p>
                      <hr>
                      <character-summary :character="backup" :characterBackupId="characterToViewId" @openModal="toggleModalViewCharacter"></character-summary>
                    </li>
                  </ul>
                </div>

                <div class="buttons-delete-character">
                  <button class="button-cancel-delete" @click="toggleCharacterBackupPopup">Cancel</button>
                  <button class="button-save" @click="toggleViewBackup" :class="{ 'disabled-button': selectedBackupTimestamp === '' }" >View Backup</button>
                </div>
              </div>
            </div>
          </transition>
        </main>

        <footer>

        </footer>
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
import { SKILL_KEYS, SKILL_NAMES, SKILL_MODS } from '@/enums/dbKeys/skill-keys.js'
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
      if (this.treasureTempAmount === '') {
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

        this.toggleEditForStat("character info")
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

        this.toggleEditForStat(CHARACTER_KEYS.SCORES)
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

        this.toggleEditForStat(CHARACTER_KEYS.SAVING_THROWS)
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

        this.toggleEditForStat(CHARACTER_KEYS.SKILLS).then((success) => {
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

        this.toggleEditForStat(CHARACTER_KEYS.SAVING_THROWS)
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
    toggleCollapseForStat(statRef) {
      switch (statRef) {
        case CHARACTER_KEYS.SCORES:
          this.isShowingAbilityScores = !this.isShowingAbilityScores
          break

        
        case CHARACTER_KEYS.SAVING_THROWS:
          this.isShowingSavingThrows = !this.isShowingSavingThrows
          break

        
        case CHARACTER_KEYS.SKILLS:
          this.isShowingSkills = !this.isShowingSkills
          break

        
        case CHARACTER_KEYS.FEATURES:
          this.isShowingFeatures = !this.isShowingFeatures
          break

        
        case CHARACTER_KEYS.WEAPONS:
          this.isShowingWeapons = !this.isShowingWeapons
          break

        
        case CHARACTER_KEYS.EQUIPMENT:
          this.isShowingEquipment = !this.isShowingEquipment
          break

        
        case CHARACTER_KEYS.TREASURES:
          this.isShowingTreasure = !this.isShowingTreasure
          break

        
        case CHARACTER_KEYS.LANGUAGES:
          this.isShowingLanguages = !this.isShowingLanguages
          break

        
        case CHARACTER_KEYS.PROFICIENCIES:
          this.isShowingProficiencies = !this.isShowingProficiencies
          break

        
        case CHARACTER_KEYS.SPELLS:
          this.isShowingSpells = !this.isShowingSpells
          break

        case CHARACTER_KEYS.SPELL_SLOTS:
          this.isShowingSpellSlots = !this.isShowingSpellSlots
          break

        
        default:
          this.isShowingCharacterInfo = !this.isShowingCharacterInfo
      }
    },
    toggleEditForStat(statRef) {
      switch (statRef) {
        case CHARACTER_KEYS.SCORES:
          this.isEditingAbilityScores = !this.isEditingAbilityScores
          break

        case CHARACTER_KEYS.SAVING_THROWS:
          this.isEditingSavingThrows = !this.isEditingSavingThrows
          break

        case CHARACTER_KEYS.SKILLS:
          this.isEditingSkills = !this.isEditingSkills
          break
        
        case CHARACTER_KEYS.FEATURES:
          this.isEditingFeaturesTraits = !this.isEditingFeaturesTraits
          break
        
        case CHARACTER_KEYS.WEAPONS:
          this.isEditingWeapons = !this.isEditingWeapons
          break

        case CHARACTER_KEYS.EQUIPMENT:
          this.isEditingEquipment = !this.isEditingEquipment
          break
        
        case CHARACTER_KEYS.TREASURES:
          this.isEditingTreasure = !this.isEditingTreasure
          break

        case CHARACTER_KEYS.LANGUAGES:
          this.isEditingLanguages = !this.isEditingLanguages
          break

        case CHARACTER_KEYS.PROFICIENCIES:
          this.isEditingProficiencies = !this.isEditingProficiencies
          break

        case CHARACTER_KEYS.SPELLS:
          this.isEditingSpellCasting = !this.isEditingSpellCasting
          break

        case CHARACTER_KEYS.SPELL_SLOTS:
          this.isEditingSpellSlots = !this.isEditingSpellSlots
          break

        
        default:
          this.isEditingCharInfo = !this.isEditingCharInfo
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
        console.info('overwrote with backup:', characterBackup)
        this.characterToView = characterBackup
      }


      this.toggleCharacterBackupModal()
      window.scrollTo(0,0);
      this.selectedBackupTimestamp = ''
      this.selectedBackupCharacter = new Character()
    },
    selectBackup(timestamp, backup) {
      console.info('timestamp:', timestamp, "type?", typeof timestamp)
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
  /* @import '../styles/character-info-scores.css'; */
  /* @import '../styles/popup.css'; */
  @import '../styles/transitions.css';


  .nav-bar {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: var(--light-gray);
    display: flex;
    justify-content: space-between;
  }

  .nav-bar-button {
    font-size: 20px;
    color: var(--white);
    margin: 10px;
    padding: 10px;
    border: none;
    border-radius: 10px;
    background-color: var(--dimgray);
  }

  #character-background {
    margin-top: 80px;
  }
</style>