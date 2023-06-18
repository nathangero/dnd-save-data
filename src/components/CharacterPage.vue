<template>
  <div class="body">
    <button class="button-close" @click="closeModal">Close</button>
    <div id="character-info" v-if="characterToView[CHARACTER_KEYS.NAME] !== ''">
      <p class="character-name">{{ characterToView[CHARACTER_KEYS.NAME] }}</p>

      <!-- NOT EDITABLE -->
      <div id="character-background">
        <ul class="stat-list">
          <li>
            <label class="character-info">{{ characterToView[CHARACTER_KEYS.CLASS] }}</label>
          </li>

          <li>
            <label class="character-info">{{ characterToView[CHARACTER_KEYS.BACKGROUND] }}</label>
          </li>

          <li>
            <label class="character-info">{{ characterToView[CHARACTER_KEYS.RACE] }}</label>
          </li>

          <li>
            <label class="character-info">{{ characterToView[CHARACTER_KEYS.ALIGNMENT] }}</label>
          </li>
        </ul>
      </div>
        
      <br>
      <div id="character-info">
        <div class="edit-buttons">
          <div>
            <button class="button-edit-spacer" v-if="!isEditingCharInfo">Edit</button>
            <button class="button-edit-spacer" v-if="isEditingCharInfo">Finish</button>
          </div>

          <div class="h3-bar">
            <h3 @click="toggleCollapseForStat(characterinfo)">Character Info</h3>
            <font-awesome-icon icon="chevron-up" v-if="!isShowingCharacterInfo" class="collapse-chevron"/>
            <font-awesome-icon icon="chevron-down" v-if="isShowingCharacterInfo" class="collapse-chevron"/>
          </div>
          
          <div>
            <button class="button-edit" v-if="!isEditingCharInfo" @click="toggleEditForStat(characterinfo)">Edit</button>
            <button class="button-edit" v-if="isEditingCharInfo" @click="toggleEditForStat(characterinfo)">Finish</button>
          </div>
        </div>

        <collapse-transition dimension="height">
          <div v-if="isShowingCharacterInfo">
            <div v-if="!isEditingCharInfo">
              <ul class="stat-list">
                <li>
                  <div class="stat-group">
                    <label class="stat-label">Level:</label>
                    <label class="stat-value">{{ characterToView[CHARACTER_KEYS.LEVEL] }}</label>
                  </div>
                </li>

                <li>
                  <div class="stat-group">
                    <label class="stat-label">Armor Class: </label>
                    <label class="stat-value">{{ characterToView[CHARACTER_KEYS.ARMOR] }}</label>
                  </div>
                </li>
                
                <li>
                  <div class="stat-group">
                    <label class="stat-label">Initiative: </label>
                    <label class="stat-value">{{ getStatBonusSign(characterToView[CHARACTER_KEYS.INITIATIVE]) }}</label>
                  </div>
                </li>
                
                <li>
                  <div class="stat-group">
                    <label class="stat-label">Speed (ft): </label>
                    <label class="stat-value">{{ characterToView[CHARACTER_KEYS.SPEED] }}</label>
                  </div>
                </li>
                
                <li>
                  <div class="stat-group">
                    <label class="stat-label" style="margin-right: 20px;">Current HP: </label>
                    <label class="stat-value">{{ characterToView[CHARACTER_KEYS.HP][HP_KEYS.CURRENT] }}/{{ characterToView[CHARACTER_KEYS.HP][HP_KEYS.MAX] }}</label>
                  </div>
                </li>
                
                <li>
                  <div class="stat-group">
                    <label class="stat-label" style="margin-right: 20px;">Temp HP: </label>
                    <label class="stat-value">{{ characterToView[CHARACTER_KEYS.HP][HP_KEYS.TEMP] }}</label>
                  </div>
                </li>
                
                <li>
                  <div class="stat-group">
                    <label class="stat-label" style="margin-right: 20px;">Hit die: </label>
                    <label class="stat-value">1{{ characterToView[CHARACTER_KEYS.HP][HP_KEYS.DIE] }}</label>
                  </div>
                </li>
                
                <li>
                  <div class="stat-group">
                    <label class="stat-label" style="margin-right: 20px;">Hit die count: </label>
                    <label class="stat-value">{{ characterToView[CHARACTER_KEYS.HP][HP_KEYS.DIE_AMOUNT_CURR] }}/{{ characterToView[CHARACTER_KEYS.HP][HP_KEYS.DIE_AMOUNT_MAX] }}</label>
                  </div>
                </li>
                
                <li>
                  <div class="stat-group">
                    <label class="stat-label" style="margin-right: 20px;">Death saves successes: </label>
                    <label class="stat-value">{{ characterToView[CHARACTER_KEYS.DEATH_SAVES][DEATH_SAVES_KEYS.SUCCESSES] }}/3</label>
                  </div>
                </li>
                
                <li>
                  <div class="stat-group">
                    <label class="stat-label" style="margin-right: 20px;">Death saves failures: </label>
                    <label class="stat-value">{{ characterToView[CHARACTER_KEYS.DEATH_SAVES][DEATH_SAVES_KEYS.FAILURES] }}/3</label>
                  </div>
                </li>
                
                <li>
                  <div class="stat-group">
                    <label class="stat-label">Proficiency Bonus: </label>
                    <label class="stat-value">{{ getStatBonusSign(characterToView[CHARACTER_KEYS.PROFICIENCY_BONUS]) }}</label>
                  </div>
                </li>
                
                <li>
                  <div class="stat-group">
                    <label class="stat-label">Passive Perception: </label>
                    <label class="stat-value">{{ characterToView[CHARACTER_KEYS.PASSIVE_PERCEPTION] }}</label>
                  </div>
                </li>
                
                <li>
                  <div class="stat-group">
                    <label class="stat-label">Spell Casting Stat: </label>
                    <label class="stat-value">{{ STAT_NAMES[characterToView[CHARACTER_KEYS.SPELL_CAST_STAT]] }}</label>
                  </div>
                </li>
                
                <li>
                  <div class="stat-group">
                    <label class="stat-label">Spell Saving DC: </label>
                    <label class="stat-value">{{ characterToView[CHARACTER_KEYS.SPELL_SAVE_DC] }}</label>
                  </div>
                </li>
              </ul>
            </div>

            <div v-if="isEditingCharInfo">
              <div class="container-inputs">
                <ul class="list-inputs">
                  <li>
                    <label for="stats-level" class="stat-label"> Current Level:</label>
                    <input type="number" id="stats-level" v-model="characterToView[CHARACTER_KEYS.LEVEL]" class="input-stats" inputmode="numeric" required>
                  </li>

                  <li>
                    <label for="stats-armor-class" class="stat-label">Armor Class: </label>
                    <input type="number" id="stats-armor-class" v-model="characterToView[CHARACTER_KEYS.ARMOR]" class="input-stats" inputmode="numeric" required>
                  </li>

                  <li style="margin-top: 10px; margin-bottom: 10px;">
                    <label for="stats-initiative" class="stat-label">Initiative: </label>
                    <label class="stat-label">{{ getStatBonusSign(characterToView[CHARACTER_KEYS.INITIATIVE]) }}</label>
                  </li>
                  
                  <li>
                    <label for="stats-speed" class="stat-label">Speed (ft): </label>
                    <input type="number" id="stats-speed" v-model="characterToView[CHARACTER_KEYS.SPEED]" class="input-stats" inputmode="numeric" required>
                  </li>

                  <li>
                    <label for="stats-hp" class="stat-label">Hit Points - Current:</label>
                    <input type="number" id="stats-hp" v-model="characterToView[CHARACTER_KEYS.HP][HP_KEYS.CURRENT]" class="input-stats" inputmode="numeric" required>
                  </li>

                  <li>
                    <label for="stats-hp" class="stat-label">Hit Points - Max:</label>
                    <input type="number" id="stats-hp" v-model="characterToView[CHARACTER_KEYS.HP][HP_KEYS.MAX]" class="input-stats" inputmode="numeric" required>
                  </li>

                  <li>
                    <label for="stats-hp" class="stat-label">Hit Points - Temp:</label>
                    <input type="number" id="stats-hp" v-model="characterToView[CHARACTER_KEYS.HP][HP_KEYS.TEMP]" class="input-stats" inputmode="numeric" required>
                  </li>

                  <li style="margin-top: 10px;">
                    <label class="stat-label">Hit Die Type: </label>
                    <select class="picker" v-model="characterToView[CHARACTER_KEYS.HP][HP_KEYS.DIE]">
                      <option v-for="die in DIE_TYPE" :key="die" :value="die">{{ die }}</option>
                    </select>
                  </li>

                  <li>
                    <label for="stats-hit-die" class="stat-label">Current # of Hit Die: </label>
                    <input type="number" id="stats-hit-die" v-model="characterToView[CHARACTER_KEYS.HP][HP_KEYS.DIE_AMOUNT_CURR]" class="input-stats" inputmode="numeric" required>
                  </li>

                  <li>
                    <label for="stats-hit-die" class="stat-label">Max # of Hit Die: </label>
                    <input type="number" id="stats-hit-die" v-model="characterToView[CHARACTER_KEYS.HP][HP_KEYS.DIE_AMOUNT_MAX]" class="input-stats" inputmode="numeric" required>
                  </li>
                
                  <li> 
                    <label for="death-saves-successes" class="stat-label">Death saves successes: </label>
                    <input type="number" id="death-saves-successes" v-model="characterToView[CHARACTER_KEYS.DEATH_SAVES][DEATH_SAVES_KEYS.SUCCESSES]" class="input-stats" inputmode="numeric" required>
                  </li>
                  
                  <li>
                    <label for="death-saves-failures" class="stat-label">Death saves failures: </label>
                    <input type="number" id="death-saves-failures" v-model="characterToView[CHARACTER_KEYS.DEATH_SAVES][DEATH_SAVES_KEYS.FAILURES]" class="input-stats" inputmode="numeric" required>
                  </li>

                  <li>
                    <label for="stats-proficiency-bonus" class="stat-label">Proficiency Bonus: </label>
                    <input type="number" id="stats-proficiency-bonus" v-model="characterToView[CHARACTER_KEYS.PROFICIENCY_BONUS]" class="input-stats" inputmode="numeric" required>
                  </li>

                  <li style="margin-top: 10px; margin-bottom: 10px;">
                    <label for="stats-proficiency-bonus" class="stat-label">Passive Perception: </label>
                    <label class="stat-label">{{ getStatBonusSign(characterToView[CHARACTER_KEYS.PASSIVE_PERCEPTION]) }}</label>
                  </li>

                  <li style="margin-top: 10px;">
                    <label for="spells-attack-bonus" class="stat-label">Casting Ability:</label>
                    <select class="picker" v-model="characterToView[CHARACTER_KEYS.SPELL_CAST_STAT]">
                      <option v-for="stat in STAT_KEYS" :key="stat" :value="stat">{{ stat }}</option>
                    </select>
                  </li>
                
                  <li style="margin-top: 5px;">
                    <label class="stat-label">Spell Saving DC: </label>
                    <label class="stat-label">{{ getStatBonusSign(characterToView[CHARACTER_KEYS.SPELL_SAVE_DC]) }}</label>
                  </li>
                </ul>
              </div>

              <div class="buttons-delete-update">
                <button class="button-update" @click="onPressUpdateCharacterInfo()">Update</button>
              </div>
            </div>
          </div>
        </collapse-transition>

      </div>

      <br>
      <div id="base-stats">
        <div class="edit-buttons">
          <div>
            <button class="button-edit-spacer" v-if="!isEditingBaseStats">Edit</button>
            <button class="button-edit-spacer" v-if="isEditingBaseStats">Finish</button>
          </div>

          <div class="h3-bar">
            <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.STATS)">Base Stats</h3>
            <font-awesome-icon icon="chevron-up" v-if="!isShowingBaseStats" class="collapse-chevron"/>
            <font-awesome-icon icon="chevron-down" v-if="isShowingBaseStats" class="collapse-chevron"/>
          </div>
          
          <div>
            <button class="button-edit" v-if="!isEditingBaseStats" @click="toggleEditForStat(CHARACTER_KEYS.STATS)">Edit</button>
            <button class="button-edit" v-if="isEditingBaseStats" @click="toggleEditForStat(CHARACTER_KEYS.STATS)">Finish</button>
          </div>
        </div>
        
        <collapse-transition dimension="height">
          <div v-if="isShowingBaseStats">
            <div v-if="!isEditingBaseStats">
              <ul class="stat-list">
                <li v-for="(stat, key) in STAT_KEYS" :key="key">
                  <div class="stat-group">
                    <label class="stat-label">{{ STAT_NAMES[stat] }}:</label>
                    <label class="stat-value">{{ getStatValue(CHARACTER_KEYS.STATS, stat, STAT_VALUES_KEYS.VALUE) }}</label>
                    <label class="stat-bonus">{{ getStatBonusSign(getStatValue(CHARACTER_KEYS.STATS, stat, STAT_VALUES_KEYS.MOD)) }}</label>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Editing -->
            <div v-if="isEditingBaseStats" class="isEditing">
              <div class="container-inputs">
                <ul class="list-inputs" style="margin-right: 20px;">
                  <li v-for="(stat, key) in STAT_KEYS" :key="key">
                    <label for="stats-label" class="stat-label">{{ STAT_NAMES[stat] }}:</label>
                    <div style="margin-left: 10px;">
                      <input type="number" id="stats-label" v-model="characterToView[CHARACTER_KEYS.STATS][stat][STAT_VALUES_KEYS.VALUE]" class="input-stats" inputmode="numeric" required>
                      <label class="stat-label" style="margin-left: 20px;">Mod: {{ getStatBonusSign(getStatValue(CHARACTER_KEYS.STATS, stat, STAT_VALUES_KEYS.MOD)) }}</label>
                    </div>
                  </li>
                </ul>
              </div>

              <div class="buttons-delete-update">
                <button class="button-update" @click="onPressUpdateBaseStats()">Update</button>
              </div>
            </div>
          </div>
        </collapse-transition>
      </div>

      <br>
      <div id="saving-throws">
        <div class="edit-buttons">
          <div>
            <button class="button-edit-spacer" v-if="!isEditingSavingThrows">Edit</button>
            <button class="button-edit-spacer" v-if="isEditingSavingThrows">Finish</button>
          </div>

          <div class="h3-bar">
            <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.SAVING_THROWS)">Saving Throws</h3>
            <font-awesome-icon icon="chevron-up" v-if="!isShowingSavingThrows" class="collapse-chevron"/>
            <font-awesome-icon icon="chevron-down" v-if="isShowingSavingThrows" class="collapse-chevron"/>
          </div>
          
          <div>
            <button class="button-edit" v-if="!isEditingSavingThrows" @click="toggleEditForStat(CHARACTER_KEYS.SAVING_THROWS)">Edit</button>
            <button class="button-edit" v-if="isEditingSavingThrows" @click="toggleEditForStat(CHARACTER_KEYS.SAVING_THROWS)">Finish</button>
          </div>
        </div>

        <collapse-transition dimension="height">
          <div v-if="isShowingSavingThrows">
            <ul class="stat-list">
              <li v-for="(stat, key) in STAT_KEYS" :key="key">
                <div class="stat-group">
                  <input type="checkbox" class="checkbox" v-model="characterToView[CHARACTER_KEYS.SAVING_THROWS][stat][STAT_VALUES_KEYS.PROFICIENT]" :disabled="!isEditingSavingThrows">
                  <label class="stat-label">{{ STAT_NAMES[stat] }}:</label>

                  <label class="stat-value" v-if="characterToView[CHARACTER_KEYS.SAVING_THROWS][stat][STAT_VALUES_KEYS.PROFICIENT]">
                    {{ getStatBonusSign(getStatValue(CHARACTER_KEYS.SAVING_THROWS, stat, STAT_VALUES_KEYS.MOD) + characterToView[CHARACTER_KEYS.PROFICIENCY_BONUS]) }}
                  </label>
                  <label class="stat-value" v-if="!characterToView[CHARACTER_KEYS.SAVING_THROWS][stat][STAT_VALUES_KEYS.PROFICIENT]">
                    {{ getStatBonusSign(getStatValue(CHARACTER_KEYS.SAVING_THROWS, stat, STAT_VALUES_KEYS.MOD)) }}
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
      
      <br>
      <div id="skills">
        <div class="edit-buttons">
          <div>
            <button class="button-edit-spacer" v-if="!isEditingSkills">Edit</button>
            <button class="button-edit-spacer" v-if="isEditingSkills">Finish</button>
          </div>

          <div class="h3-bar">
            <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.SKILLS)">Skills</h3>
            <font-awesome-icon icon="chevron-up" v-if="!isShowingSkills" class="collapse-chevron"/>
            <font-awesome-icon icon="chevron-down" v-if="isShowingSkills" class="collapse-chevron"/>
          </div>
          
          <div>
            <button class="button-edit" v-if="!isEditingSkills" @click="toggleEditForStat(CHARACTER_KEYS.SKILLS)">Edit</button>
            <button class="button-edit" v-if="isEditingSkills" @click="toggleEditForStat(CHARACTER_KEYS.SKILLS)">Finish</button>
          </div>
        </div>

        <collapse-transition dimension="height">
          <div v-if="isShowingSkills">
            <ul class="stat-list">
              <li v-for="(skill, key) in SKILL_KEYS" :key="key">
                <div class="stat-group">
                  <input type="checkbox" class="checkbox" v-model="characterToView[CHARACTER_KEYS.SKILLS][skill][STAT_VALUES_KEYS.PROFICIENT]" :disabled="!isEditingSkills">
                  <label class="stat-label">{{ SKILL_NAMES[skill] }}:</label>

                  <label class="stat-value" v-if="characterToView[CHARACTER_KEYS.SKILLS][skill][STAT_VALUES_KEYS.PROFICIENT]">
                    {{ getStatBonusSign(getStatValue(CHARACTER_KEYS.SKILLS, skill, STAT_VALUES_KEYS.MOD) + characterToView[CHARACTER_KEYS.PROFICIENCY_BONUS]) }}
                  </label>
                  <label class="stat-value" v-if="!characterToView[CHARACTER_KEYS.SKILLS][skill][STAT_VALUES_KEYS.PROFICIENT]">
                    {{ getStatBonusSign(getStatValue(CHARACTER_KEYS.SKILLS, skill, STAT_VALUES_KEYS.MOD)) }}
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

      <br>
      <div id="features-traits">
        <div class="edit-buttons">
          <div>
            <button class="button-edit-spacer" v-if="!isEditingFeaturesTraits">Edit</button>
            <button class="button-edit-spacer" v-if="isEditingFeaturesTraits">Finish</button>
          </div>

          <div class="h3-bar">
            <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.FEATURES)">Features & Traits</h3>
            <font-awesome-icon icon="chevron-up" v-if="!isShowingFeatures" class="collapse-chevron"/>
            <font-awesome-icon icon="chevron-down" v-if="isShowingFeatures" class="collapse-chevron"/>
          </div>
          
          <div>
            <button class="button-edit" v-if="!isEditingFeaturesTraits" @click="toggleEditForStat(CHARACTER_KEYS.FEATURES)">Edit</button>
            <button class="button-edit" v-if="isEditingFeaturesTraits" @click="toggleEditForStat(CHARACTER_KEYS.FEATURES)">Finish</button>
          </div>
        </div>

        <collapse-transition dimension="height">
          <div v-if="isShowingFeatures">
            <template v-if="getDictionarySize(characterToView[CHARACTER_KEYS.FEATURES]) > 0">
              <div>
                <ul class="list">
                  <li v-for="(item, key) in characterToView[CHARACTER_KEYS.FEATURES]" :key="key">
                    <div v-if="!isEditingFeaturesTraits">
                      <label class="item-name">{{ key }}</label>
                      <label class="item-amount">x{{ item[FEATURES_KEYS.USES] }}</label>
                      <p class="item-description" style="margin-bottom: 5px;">Type: {{ item[FEATURES_KEYS.TYPE] }}</p>
                      <p class="item-description">{{ item[FEATURES_KEYS.DESCRIPTION] }}</p>
                    </div>

                    <!-- Edit and Delete -->
                    <div v-if="isEditingFeaturesTraits">
                      <label class="item-name">{{ key }}</label>
                      <div class="container-inputs">
                        <ul class="list-inputs">
                          <li style="margin-top: 10px;">
                            <label class="stat-label">Type:</label>
                            <select class="picker" v-model="item[FEATURES_KEYS.TYPE]">
                              <option v-for="feat in FEATURES_TYPES" :key="feat" :value="feat">{{ feat }}</option>
                            </select>
                          </li>

                          <li>
                            <label class="stat-label" for="features-input"> # of Uses:</label>
                            <input class="input-stats" style="width=70%;" type="number" v-model="item[FEATURES_KEYS.USES]"> 
                          </li>
                        </ul>
                      </div>

                      <div class="container-edit">
                        <div>
                          
                        </div>
                        <div>
                          
                        </div>
                        <br>
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

            <!-- Add new -->
            <template v-if="isEditingFeaturesTraits">
              <div>
                <input class="item-input" type="text" v-model="featuresTempName" placeholder="New feature/trait name"> 
                <div class="container-inputs">
                  <ul class="list-inputs">
                    <li style="margin-top: 10px;">
                      <label>Type:</label>
                      <select class="picker" v-model="featuresTempType">
                        <option v-for="feat in FEATURES_TYPES" :key="feat" :value="feat">{{ feat }}</option>
                      </select>
                    </li>

                    <li>
                      <label for="features-input"> # of Uses:</label>
                      <input class="input-stats" style="width=70%;" type="number" v-model="featuresTempUses"> 
                    </li>
                  </ul>
                </div>
                
                <br>
                <textarea v-model="featuresTempDescription" rows="4" placeholder="Description"></textarea>
                <br>
                <button class="button-add" @click="onPressAddFeatures">Add</button>
              </div>         
            </template>
          </div>
        </collapse-transition>
        
      </div>

      <br>
      <div id="weapons">
        <div class="edit-buttons">
          <div>
            <button class="button-edit-spacer" v-if="!isEditingWeapons">Edit</button>
            <button class="button-edit-spacer" v-if="isEditingWeapons">Finish</button>
          </div>

          <div class="h3-bar">
            <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.WEAPONS)">Weapons & Spells</h3>
            <font-awesome-icon icon="chevron-up" v-if="!isShowingWeapons" class="collapse-chevron"/>
            <font-awesome-icon icon="chevron-down" v-if="isShowingWeapons" class="collapse-chevron"/>
          </div>
          
          <div>
            <button class="button-edit" v-if="!isEditingWeapons" @click="toggleEditForStat(CHARACTER_KEYS.WEAPONS)">Edit</button>
            <button class="button-edit" v-if="isEditingWeapons" @click="toggleEditForStat(CHARACTER_KEYS.WEAPONS)">Finish</button>
          </div>
        </div>

        <collapse-transition dimension="height">
          <div v-if="isShowingWeapons">
            <template v-if="getDictionarySize(characterToView[CHARACTER_KEYS.WEAPONS]) > 0">
              <div>
                <ul class="list">
                  <li v-for="(item, key) in characterToView[CHARACTER_KEYS.WEAPONS]" :key="key">
                    <div v-if="!isEditingWeapons">
                      <label class="item-name">{{ key }}</label>
                      <label class="item-amount">x{{ item[WEAPON_KEYS.AMOUNT] }}</label>

                      <div class="spell-list">
                        <div class="spell-group">
                          <label class="spell-label">{{ WEAPON_NAMES[WEAPON_KEYS.ATTACK_DAMAGE_MOD] }}:</label>
                          <label class="spell-value" v-if="!item[WEAPON_KEYS.PROFICIENT]">
                            {{ getStatBonusSign(getStatModFromKey(item[WEAPON_KEYS.ATTACK_DAMAGE_MOD])) }} ({{ STAT_NAMES[item[WEAPON_KEYS.ATTACK_DAMAGE_MOD]] }})
                          </label>
                          <label class="spell-value" v-if="item[WEAPON_KEYS.PROFICIENT]">
                            {{ getStatBonusSign(getStatModFromKey(item[WEAPON_KEYS.ATTACK_DAMAGE_MOD]) + characterToView[CHARACTER_KEYS.PROFICIENCY_BONUS]) }} ({{ STAT_NAMES[item[WEAPON_KEYS.ATTACK_DAMAGE_MOD]] }})
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
                          <label class="spell-label" style="flex-grow: 1;">{{ WEAPON_NAMES[WEAPON_KEYS.PROFICIENT] }}:</label>
                          <input type="checkbox" class="checkbox" style="margin-right: 0px;" v-model="item[WEAPON_KEYS.PROFICIENT]" :disabled="!isEditingWeapons">
                        </div>
                      </div>
                      
                      <p class="spell-label">{{ item[WEAPON_KEYS.DESCRIPTION] }}</p>
                    </div>

                    <!-- Edit and Delete -->
                    <div v-if="isEditingWeapons">
                      <label class="item-name">{{ key }}:</label>
                      
                      <div class="container-inputs">
                        <ul class="list-inputs">
                          <li style="margin-top: 10px;">
                            <label class="stat-label" for="equipment-input">{{ WEAPON_NAMES[WEAPON_KEYS.AMOUNT] }}:</label>
                            <input class="input-stats" style="width=70%;" type="number" v-model="item[WEAPON_KEYS.AMOUNT]"> 
                          </li>
                          
                          <li style="margin-top: 10px;">
                            <label class="stat-label" for="equipment-input">{{ WEAPON_NAMES[WEAPON_KEYS.ATTACK_DAMAGE_MOD] }}:</label>
                            <select class="picker" v-model="item[WEAPON_KEYS.ATTACK_DAMAGE_MOD]">
                              <option v-for="mod in WEAPON_MODS" :key="mod" :value="mod">{{ STAT_NAMES[mod] }}</option>
                            </select>
                          </li>
                          
                          <li style="margin-top: 10px;">
                            <label class="stat-label" for="equipment-input">{{ WEAPON_NAMES[WEAPON_KEYS.DIE] }}:</label>
                            <select class="picker" v-model="item[WEAPON_KEYS.DIE]">
                              <option v-for="die in DIE_TYPE" :key="die" :value="die">{{ die }}</option>
                            </select>
                          </li>

                          <li style="margin-top: 10px;">
                            <label class="stat-label" for="equipment-input">{{ WEAPON_NAMES[WEAPON_KEYS.CATEGORY] }}:</label>
                            <select class="picker" v-model="item[WEAPON_KEYS.CATEGORY]">
                              <option v-for="category in WEAPON_CATEGORY" :key="category" :value="category">{{ category }}</option>
                            </select>
                          </li>

                          <li style="margin-top: 10px;">
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

            <!-- Add new -->
            <template v-if="isEditingWeapons">
              <div>
                <input class="item-input" style="width=70%;" type="text" v-model="weaponTempName" placeholder="New weapon/spell name"> 

                <div class="container-inputs">
                  <ul class="list-inputs">
                    <li>
                      <label class="stat-label" for="equipment-input">Amount:</label>
                      <input class="input-stats" style="width=70%;" type="number" v-model="weaponTempAmount"> 
                    </li>

                    <li style="margin-top: 10px;">
                      <label class="stat-label" for="equipment-input">{{ WEAPON_NAMES[WEAPON_KEYS.ATTACK_DAMAGE_MOD] }}:</label>
                      <select class="picker" v-model="weaponsTempAttackModifier">
                        <option v-for="mod in WEAPON_MODS" :key="mod" :value="mod">{{ STAT_NAMES[mod] }}</option>
                      </select>
                    </li>
                    
                    <li style="margin-top: 10px;">
                      <label class="stat-label" for="equipment-input">Die Type:</label>
                      <select class="picker" v-model="weaponTempDieType">
                        <option v-for="die in DIE_TYPE" :key="die" :value="die">{{ die }}</option>
                      </select>
                    </li>

                    <li style="margin-top: 10px;">
                      <label class="stat-label" for="equipment-input">Category:</label>
                      <select class="picker" v-model="weaponTempCategory">
                        <option v-for="category in WEAPON_CATEGORY" :key="category" :value="category">{{ category }}</option>
                      </select>
                    </li>

                    <li style="margin-top: 10px;">
                      <label class="stat-label" for="equipment-input">Proficient:</label>
                      <input type="checkbox" class="checkbox" v-model="weaponTempIsProficient">
                    </li>
                  </ul>
                </div>

                <br>
                <textarea v-model="weaponTempDescription" rows="4" placeholder="Description"></textarea>
                <br>
                <button class="button-add" @click="onPressAddWeapon">Add</button>
              </div>
            </template>
          </div>
        </collapse-transition>
      </div>

      <br>
      <div id="equipment">
        <div class="edit-buttons">
          <div>
            <button class="button-edit-spacer" v-if="!isEditingEquipment">Edit</button>
            <button class="button-edit-spacer" v-if="isEditingEquipment">Finish</button>
          </div>

          <div class="h3-bar">
            <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.EQUIPMENT)">Equipment</h3>
            <font-awesome-icon icon="chevron-up" v-if="!isShowingEquipment" class="collapse-chevron"/>
            <font-awesome-icon icon="chevron-down" v-if="isShowingEquipment" class="collapse-chevron"/>
          </div>
          
          <div>
            <button class="button-edit" v-if="!isEditingEquipment" @click="toggleEditForStat(CHARACTER_KEYS.EQUIPMENT)">Edit</button>
            <button class="button-edit" v-if="isEditingEquipment" @click="toggleEditForStat(CHARACTER_KEYS.EQUIPMENT)">Finish</button>
          </div>
        </div>

        <collapse-transition dimension="height">
          <div v-if="isShowingEquipment">
            <template v-if="getDictionarySize(characterToView[CHARACTER_KEYS.EQUIPMENT]) > 0">
              <div>
                <ul class="list">
                  <li style="text-align: left; margin-bottom: 20px">
                    <div v-if="!isEditingEquipment">
                      <label class="item-name">Gold:</label>
                      <label class="item-amount">x{{ characterToView[CHARACTER_KEYS.GOLD] }}</label>
                    </div>
                    <div v-if="isEditingEquipment" style="margin-bottom: 20px">
                      <label class="item-name">Gold:</label>
                      <input type="number" id="spells-casting-duration" style="width: 120px;" v-model="characterToView[CHARACTER_KEYS.GOLD]" class="input-stats" inputmode="numeric" required>
                      <button class="button-update" style="margin-left: 10px;" @click="onPressUpdateGold()">Update</button>
                    </div>
                  </li>
                  
                  <li v-for="(item, key) in characterToView[CHARACTER_KEYS.EQUIPMENT]" :key="key">
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
                          <input class="input-stats" style="width=70%; margin-bottom: 10px;" type="number" v-model="item[EQUIPMENT_KEYS.AMOUNT]"> 
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
              </div>
            </template>

            <!-- Add new -->
            <template v-if="isEditingEquipment">
              <div>
                <input class="item-input" style="width=70%;" type="text" v-model="equipmentTempName" placeholder="New item name"> 
                <div>
                  <label class="stat-label" for="equipment-input">Amount:</label>
                  <input class="input-stats" style="width=70%;" type="number" v-model="equipmentTempAmount"> 
                </div>
                <br>
                <textarea v-model="equipmentTempDescription" rows="4" placeholder="Description"></textarea>
                <br>
                <button class="button-add" @click="onPressAddEquipment">Add</button>
              </div>
            </template>
          </div>
        </collapse-transition>
      </div>

      <br>
      <div id="treasure">
        <div class="edit-buttons">
          <div>
            <button class="button-edit-spacer" v-if="!isEditingTreasure">Edit</button>
            <button class="button-edit-spacer" v-if="isEditingTreasure">Finish</button>
          </div>

          <div class="h3-bar">
            <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.TREASURES)">Treasures</h3>
            <font-awesome-icon icon="chevron-up" v-if="!isShowingTreasure" class="collapse-chevron"/>
            <font-awesome-icon icon="chevron-down" v-if="isShowingTreasure" class="collapse-chevron"/>
          </div>
          
          <div>
            <button class="button-edit" v-if="!isEditingTreasure" @click="toggleEditForStat(CHARACTER_KEYS.TREASURES)">Edit</button>
            <button class="button-edit" v-if="isEditingTreasure" @click="toggleEditForStat(CHARACTER_KEYS.TREASURES)">Finish</button>
          </div>
        </div>

        <collapse-transition dimension="height">
          <div v-if="isShowingTreasure">
            <template v-if="getDictionarySize(characterToView[CHARACTER_KEYS.TREASURES]) > 0">
              <div>
                <ul class="list">
                  <li v-for="(item, key) in characterToView[CHARACTER_KEYS.TREASURES]" :key="key">
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
                          <input class="input-stats" style="width=70%; margin-bottom: 10px;" type="number" v-model="item[EQUIPMENT_KEYS.AMOUNT]"> 
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

            <!-- Add new -->
            <template v-if="isEditingTreasure">
              <div>
                <input class="item-input" style="width=70%;" type="text" v-model="treasureTempName" placeholder="New treasure name"> 
                <div>
                  <label class="stat-label" for="equipment-input">Amount:</label>
                  <input class="input-stats" style="width=70%;" type="number" v-model="treasureTempAmount"> 
                </div>
                <br>
                <textarea v-model="treasureTempDescription" rows="4" placeholder="Description"></textarea>
                <br>
                <button class="button-add" @click="onPressAddTreasure">Add</button>
              </div>
            </template>
          </div>
        </collapse-transition>
      </div>
      
      <br>
      <div id="languages">
        <div class="edit-buttons">
          <div>
            <button class="button-edit-spacer" v-if="!isEditingLanguages">Edit</button>
            <button class="button-edit-spacer" v-if="isEditingLanguages">Finish</button>
          </div>

          <div class="h3-bar">
            <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.LANGUAGES)">Languages</h3>
            <font-awesome-icon icon="chevron-up" v-if="!isShowingLanguages" class="collapse-chevron"/>
            <font-awesome-icon icon="chevron-down" v-if="isShowingLanguages" class="collapse-chevron"/>
          </div>
          
          <div>
            <button class="button-edit" v-if="!isEditingLanguages" @click="toggleEditForStat(CHARACTER_KEYS.LANGUAGES)">Edit</button>
            <button class="button-edit" v-if="isEditingLanguages" @click="toggleEditForStat(CHARACTER_KEYS.LANGUAGES)">Finish</button>
          </div>
        </div>

        <collapse-transition dimension="height">
          <div v-if="isShowingLanguages">
            <template v-if="getDictionarySize(characterToView[CHARACTER_KEYS.LANGUAGES]) > 0">
              <div>
                <ul>
                  <li v-for="(item, key) in characterToView[CHARACTER_KEYS.LANGUAGES]" :key="key">
                    <div v-if="!isEditingLanguages">
                      <div class="language-group">
                        <p class="language-label">{{ key }}:</p>
                        <p class="language-value">{{ item }}</p>
                      </div>
                    </div>

                    <!-- Edit and Delete -->
                    <div v-if="isEditingLanguages">
                      <div style="margin-top: 10px; text-align: left;">
                        <label class="item-name">{{ key }}:</label>
                        <select class="picker" v-model="characterToView[CHARACTER_KEYS.LANGUAGES][key]">
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
              </div>
            </template>

            <!-- Add new -->
            <template v-if="isEditingLanguages">
              <div class="language-container">
                <input class="item-input" type="text" v-model="languagesTempName" placeholder="New language name"> 
                <div style="margin-top: 10px;">
                  <label class="stat-label">Proficiency: </label>
                  <select class="picker" v-model="languagesTempProficiency">
                    <option v-for="prof in LANGUAGE_PROFICIENCY" :key="prof" :value="prof">{{ prof }}</option>
                  </select>
                </div>
                <br>
                <button class="button-add" @click="onPressAddLanguage">Add</button>
              </div>
            </template>
          </div>
        </collapse-transition>
        
      </div>      

      <br>
      <div id="proficiences">
        <div class="edit-buttons">
          <div>
            <button class="button-edit-spacer" v-if="!isEditingProficiencies">Edit</button>
            <button class="button-edit-spacer" v-if="isEditingProficiencies">Finish</button>
          </div>

          <div class="h3-bar">
            <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.PROFICIENCIES)">Proficiencies</h3>
            <font-awesome-icon icon="chevron-up" v-if="!isShowingProficiencies" class="collapse-chevron"/>
            <font-awesome-icon icon="chevron-down" v-if="isShowingProficiencies" class="collapse-chevron"/>
          </div>
          
          <div>
            <button class="button-edit" v-if="!isEditingProficiencies" @click="toggleEditForStat(CHARACTER_KEYS.PROFICIENCIES)">Edit</button>
            <button class="button-edit" v-if="isEditingProficiencies" @click="toggleEditForStat(CHARACTER_KEYS.PROFICIENCIES)">Finish</button>
          </div>
        </div>
        
        <collapse-transition dimension="height">
          <div v-if="isShowingProficiencies">
            <template v-if="getDictionarySize(characterToView[CHARACTER_KEYS.PROFICIENCIES]) > 0">
              <div>
                <ul class="list">
                  <li v-for="(item, key) in characterToView[CHARACTER_KEYS.PROFICIENCIES]" :key="key">
                    <div v-if="!isEditingProficiencies">
                      <label class="item-name">{{ key }}</label>
                      <p class="item-description">{{ item }}</p>
                    </div>

                    <!-- Edit and Delete -->
                    <div v-if="isEditingProficiencies">
                      <label class="item-name">{{ key }}:</label>
                      <div class="container-edit">
                        <textarea v-model="characterToView[CHARACTER_KEYS.PROFICIENCIES][key]" rows="4" placeholder="Description"></textarea>
                      </div>

                      <div class="buttons-delete-update">
                        <button class="button-delete" @click="onPressDeleteStat(key, CHARACTER_KEYS.PROFICIENCIES)">Delete</button>
                        <button class="button-update" @click="onPressUpdateStat(key, item, CHARACTER_KEYS.PROFICIENCIES)">Update</button>
                      </div>
                      
                      <hr class="list-divider">
                    </div>
                  </li>
                </ul>
              </div>
            </template>

            <!-- Add new -->
            <template v-if="isEditingProficiencies">
              <div class="proficiency-container">
                <input class="item-input" v-model="proficiencyTempName" placeholder="New proficiency name"> 
                <br>
                <textarea v-model="proficiencyTempDescription" rows="4" placeholder="Description"></textarea>
                <br>
                <button class="button-add" @click="onPressAddProficiency">Add</button>
              </div>
            </template>
          </div>
        </collapse-transition>
      </div>

      <br>
      <div id="spell-casting">
        <div class="edit-buttons">
          <div>
            <button class="button-edit-spacer" v-if="!isEditingSpellCasting">Edit</button>
            <button class="button-edit-spacer" v-if="isEditingSpellCasting">Finish</button>
          </div>

          <div class="h3-bar">
            <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.SPELLS)">Spell Casting</h3>
            <font-awesome-icon icon="chevron-up" v-if="!isShowingSpells" class="collapse-chevron"/>
            <font-awesome-icon icon="chevron-down" v-if="isShowingSpells" class="collapse-chevron"/>
          </div>
          
          <div>
            <button class="button-edit" v-if="!isEditingSpellCasting" @click="toggleEditForStat(CHARACTER_KEYS.SPELLS)">Edit</button>
            <button class="button-edit" v-if="isEditingSpellCasting" @click="toggleEditForStat(CHARACTER_KEYS.SPELLS)">Finish</button>
          </div>
        </div>

        <collapse-transition dimension="height">
          <div v-if="isShowingSpells">
            <template v-if="getDictionarySize(characterToView[CHARACTER_KEYS.SPELLS]) > 0">
              <div>
                <ul class="list">
                  <li v-for="(levelDict, level) in characterToView[CHARACTER_KEYS.SPELLS]" :key="level">
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
                                <label class="spell-value">{{ spell[[SPELL_CASTING_KEYS.DURATION]] }} sec</label>
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
                                  <label for="spells-casting-duration" class="stat-label">Duration (in seconds):</label>
                                  <input type="number" id="spells-casting-duration" style="width: 80px;" v-model="spell[SPELL_CASTING_KEYS.DURATION]" class="input-stats" inputmode="numeric" required>
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
              </div>
            </template>

            <!-- Add new -->
            <template v-if="isEditingSpellCasting">
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
                    <label class="stat-label" for="spells-casting-duration">Duration (in seconds):</label>
                    <input type="number" id="spells-casting-duration" style="width: 100px;" v-model="spellTempDuration" class="input-stats" inputmode="numeric" required>
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
            </template>
          </div>
        </collapse-transition>
      </div>
      
      <br>
      <div id="save-delete-buttons">
        <ul class="buttons-at-bottom">
          <li>
            <button class="button-view-backups" @click="getCharacterBackups">View Backups</button>
            <button class="button-save" @click="toggleSaveCharacterPopup">Backup Character</button>
          </li>

          <li>
            <button class="button-delete" style="margin-bottom: 30px;" @click="toggleDeleteCharacterPopup">Delete Character</button>
          </li>
        </ul>
      </div>
    </div>
    
    <!-- Save Character Data Popup -->
    <div id="save-character">
      <transition name="fade" appear>
        <div class="overlay" v-if="isSaveCharacterPopupOpen">
          <div class="popup">
            <div class="form">
              <h1>Create backup for {{ characterToView[CHARACTER_KEYS.NAME] }}?</h1>
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
              <h1>Delete {{ characterToView[CHARACTER_KEYS.NAME] }}?</h1>
              <p class="delete-character-prompt">This action can't be undone</p>
              <div class="buttons-delete-character">
                <button class="button-cancel-delete" @click="toggleDeleteCharacterPopup">Cancel</button>
                <button class="button-delete" @click="onPressDeleteCharacter">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- View Character Backups -->
    <div v-show="isShowingLoader">
      <loading-spinner :loadingText="LOADING_TEXT.GETING_BACKUPS"></loading-spinner>
    </div>
    <div id="view-character-backups">
      <transition name="fade" appear>
        <div class="overlay" v-if="isCharacterBackupsOpen">
          <div class="popup-backup">
            <div class="form">
              <h1>Select a backup to view</h1>
              <ul class="list-backups">
                <li v-for="(backup, timestamp) in store.getters.getCharacterBackups[this.characterToViewId]" :key="timestamp" :class="{ 'selected': selectedBackupTimestamp === timestamp }"
                @click="selectBackup(timestamp, backup)">
                  <p>{{ convertTimestampToString(timestamp) }}</p>
                  <!-- <p>{{ backup }}</p> -->
                </li>
              </ul>
              <div class="buttons-delete-character">
                <button class="button-cancel-delete" @click="toggleCharacterBackupPopup">Cancel</button>
                <button class="button-save">View</button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
// import store from '@/store'
import { useStore } from 'vuex'
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue';
import LoadingSpinner from './LoadingSpinner.vue';
import Character from '@/models/character'
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
import { SKILL_KEYS, SKILL_NAMES } from '@/enums/dbKeys/skill-keys.js'
import { STAT_KEYS, STAT_VALUES_KEYS, STAT_NAMES } from '@/enums/dbKeys/stat-keys.js'
import { SPELL_CASTING_KEYS, SPELL_CASTING_LEVELS, SPELL_CASTING_NAMES, SPELL_CASTING_NAMES_PICKER } from '@/enums/dbKeys/spell-casting-keys'
import { WEAPON_KEYS, WEAPON_CATEGORY, WEAPON_PROPERTY, WEAPON_NAMES } from '@/enums/dbKeys/weapons-keys' 
import { LOADING_TEXT } from '@/enums/loading-text';


const MAX_VALUES = {
  DEATH_SAVES: 3,
  HP: 600,
  HIT_DIE: 10,
  LEVEL: 20,
  STATS: 20,
  STATS_BONUS: 5,
  SAVING_THROWS: 5,
  SKILLS: 15,
}

export default {
  components: {
    CollapseTransition,
    LoadingSpinner,
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
      isCharacterBackupsOpen: false,
      isEditingCharInfo: false,
      isEditingBaseStats: false,
      isEditingSavingThrows: false,
      isEditingSkills: false,
      isEditingFeaturesTraits: false,
      isEditingWeapons: false,
      isEditingEquipment: false,
      isEditingTreasure: false,
      isEditingLanguages: false,
      isEditingProficiencies: false,
      isEditingSpellCasting: false,
      isShowingCharacterInfo: true,
      isShowingBaseStats: true,
      isShowingSavingThrows: true,
      isShowingSkills: true,
      isShowingFeatures: true,
      isShowingWeapons: true,
      isShowingEquipment: true,
      isShowingTreasure: true,
      isShowingLanguages: true,
      isShowingProficiencies: true,
      isShowingSpells: true,
      isShowingLoader: false,
      LOADING_TEXT: LOADING_TEXT,
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
      SPELL_CASTING_KEYS: SPELL_CASTING_KEYS,
      SPELL_CASTING_LEVELS: SPELL_CASTING_LEVELS,
      SPELL_CASTING_NAMES: SPELL_CASTING_NAMES,
      SPELL_CASTING_NAMES_PICKER: SPELL_CASTING_NAMES_PICKER,
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
      initiative: '',
      proficiencyBonus: '',
      characterSpeed: '',
      hitDieType: '', // d10
      hitDieAmount: '', // 3
      equipmentTempName: '',
      equipmentTempAmount: '',
      equipmentTempDescription: '',
      featuresTempName: '',
      featuresTempDescription: '',
      featuresTempType: '', // Racial, Class, Other
      featuresTempUseable: true,
      featuresTempUses: '',
      gold: '',
      languagesTempName: '',
      languagesTempProficiency: '',
      proficiencyTempName: '',
      proficiencyTempDescription: '',
      spellAttackBonus: '',
      spellCastingStat: '', // e.g. intelligence
      spellSavingDc: '',
      spellTempName: '',
      spellTempCastingTime: '',
      spellTempDescription: '',
      spellTempDuration: '', // in seconds
      spellTempRange: '', // in feet
      spellTempLevel: '',
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
    this.characterToView = this.store.getters.getUserCharacters[this.characterToViewId]
    // console.info('this.characterToView:', this.characterToView)
  },

  watch: {
    'characterToView.proficiencyBonus': function(newValue) {
      const stat = this.characterToView[CHARACTER_KEYS.SPELL_CAST_STAT]
      const statMod = this.characterToView[CHARACTER_KEYS.STATS][stat][STAT_VALUES_KEYS.MOD]
      this.characterToView[CHARACTER_KEYS.SPELL_SAVE_DC] = this.calculateSpellSavingDc(newValue, statMod)
    },
    'characterToView.stats.str.value': function(newValue) {
      const statMod = Math.floor(this.calculateBaseStatBonus(newValue))

      this.characterToView[CHARACTER_KEYS.STATS][STAT_KEYS.STRENGTH][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SAVING_THROWS][STAT_KEYS.STRENGTH][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.ATHLETICS][STAT_VALUES_KEYS.MOD] = statMod
      
      // Adjust spell saving dc if necessary
      if (this.characterToView[CHARACTER_KEYS.SPELL_CAST_STAT] == STAT_KEYS.STRENGTH) {
        const profBonus = this.characterToView[CHARACTER_KEYS.PROFICIENCY_BONUS]
        const statMod = this.characterToView[CHARACTER_KEYS.STATS][STAT_KEYS.STRENGTH][STAT_VALUES_KEYS.MOD]
        this.characterToView[CHARACTER_KEYS.SPELL_SAVE_DC] = this.calculateSpellSavingDc(profBonus, statMod)
      }
    },
    'characterToView.stats.dex.value': function(newValue) {
      const statMod = Math.floor(this.calculateBaseStatBonus(newValue))

      this.characterToView[CHARACTER_KEYS.STATS][STAT_KEYS.DEXTERITY][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SAVING_THROWS][STAT_KEYS.DEXTERITY][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.ACROBATICS][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.SLEIGHT_OF_HAND][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.STEALTH][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.INITIATIVE] = statMod
      
      // Adjust spell saving dc if necessary
      if (this.characterToView[CHARACTER_KEYS.SPELL_CAST_STAT] == STAT_KEYS.DEXTERITY) {
        const profBonus = this.characterToView[CHARACTER_KEYS.PROFICIENCY_BONUS]
        const statMod = this.characterToView[CHARACTER_KEYS.STATS][STAT_KEYS.DEXTERITY][STAT_VALUES_KEYS.MOD]
        this.characterToView[CHARACTER_KEYS.SPELL_SAVE_DC] = this.calculateSpellSavingDc(profBonus, statMod)
      }
    },
    'characterToView.stats.con.value': function(newValue) {
      const statMod = Math.floor(this.calculateBaseStatBonus(newValue))

      this.characterToView[CHARACTER_KEYS.STATS][STAT_KEYS.CONSTITUTION][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SAVING_THROWS][STAT_KEYS.CONSTITUTION][STAT_VALUES_KEYS.MOD] = statMod
      
      // Adjust spell saving dc if necessary
      if (this.characterToView[CHARACTER_KEYS.SPELL_CAST_STAT] == STAT_KEYS.CONSTITUTION) {
        const profBonus = this.characterToView[CHARACTER_KEYS.PROFICIENCY_BONUS]
        const statMod = this.characterToView[CHARACTER_KEYS.STATS][STAT_KEYS.CONSTITUTION][STAT_VALUES_KEYS.MOD]
        this.characterToView[CHARACTER_KEYS.SPELL_SAVE_DC] = this.calculateSpellSavingDc(profBonus, statMod)
      }
    },
    'characterToView.stats.int.value': function(newValue) {
      const statMod = Math.floor(this.calculateBaseStatBonus(newValue))

      this.characterToView[CHARACTER_KEYS.STATS][STAT_KEYS.INTELLIGENCE][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SAVING_THROWS][STAT_KEYS.INTELLIGENCE][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.ARCANA][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.HISTORY][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.INVESTIGATION][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.NATURE][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.RELIGION][STAT_VALUES_KEYS.MOD] = statMod
      
      // Adjust spell saving dc if necessary
      if (this.characterToView[CHARACTER_KEYS.SPELL_CAST_STAT] == STAT_KEYS.INTELLIGENCE) {
        const profBonus = this.characterToView[CHARACTER_KEYS.PROFICIENCY_BONUS]
        const statMod = this.characterToView[CHARACTER_KEYS.STATS][STAT_KEYS.INTELLIGENCE][STAT_VALUES_KEYS.MOD]
        this.characterToView[CHARACTER_KEYS.SPELL_SAVE_DC] = this.calculateSpellSavingDc(profBonus, statMod)
      }
    },
    'characterToView.stats.wis.value': function(newValue) {
      const statMod = Math.floor(this.calculateBaseStatBonus(newValue))

      this.characterToView[CHARACTER_KEYS.STATS][STAT_KEYS.WISDOM][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SAVING_THROWS][STAT_KEYS.WISDOM][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.ANIMAL_HANDLING][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.INSIGHT][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.MEDICINE][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.PERCEPTION][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.SURVIVAL][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.PASSIVE_PERCEPTION] = this.calculatePassivePerception(statMod)
      
      // Adjust spell saving dc if necessary
      if (this.characterToView[CHARACTER_KEYS.SPELL_CAST_STAT] == STAT_KEYS.WISDOM) {
        const profBonus = this.characterToView[CHARACTER_KEYS.PROFICIENCY_BONUS]
        const statMod = this.characterToView[CHARACTER_KEYS.STATS][STAT_KEYS.WISDOM][STAT_VALUES_KEYS.MOD]
        this.characterToView[CHARACTER_KEYS.SPELL_SAVE_DC] = this.calculateSpellSavingDc(profBonus, statMod)
      }
    },
    'characterToView.stats.cha.value': function(newValue) {
      const statMod = Math.floor(this.calculateBaseStatBonus(newValue))

      this.characterToView[CHARACTER_KEYS.STATS][STAT_KEYS.CHARISMA][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SAVING_THROWS][STAT_KEYS.CHARISMA][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.DECEPTION][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.INTIMIDATION][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.PERFORMANCE][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.PERSUASION][STAT_VALUES_KEYS.MOD] = statMod
      
      // Adjust spell saving dc if necessary
      if (this.characterToView[CHARACTER_KEYS.SPELL_CAST_STAT] == STAT_KEYS.CHARISMA) {
        const profBonus = this.characterToView[CHARACTER_KEYS.PROFICIENCY_BONUS]
        const statMod = this.characterToView[CHARACTER_KEYS.STATS][STAT_KEYS.CHARISMA][STAT_VALUES_KEYS.MOD]
        this.characterToView[CHARACTER_KEYS.SPELL_SAVE_DC] = this.calculateSpellSavingDc(profBonus, statMod)
      }
    },
    'characterToView.spellCastStat': function(newValue) {
      if (newValue === '') {
        this.characterToView[CHARACTER_KEYS.SPELL_SAVE_DC] = 0
      } else {
        const profBonus = this.characterToView[CHARACTER_KEYS.PROFICIENCY_BONUS]
        const statMod = this.characterToView[CHARACTER_KEYS.STATS][newValue][STAT_VALUES_KEYS.MOD]
        this.characterToView[CHARACTER_KEYS.SPELL_SAVE_DC] = this.calculateSpellSavingDc(profBonus, statMod)
      }
      
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    onPressSaveBackup() {
      const payload = {
        charId: this.characterToViewId, 
        characterInfo: this.characterToView
      }
      this.store.dispatch("addBackupToDb", payload).then((success) => {
        if (success) {
          alert(`Saved data for ${this.characterToView[CHARACTER_KEYS.NAME]}`)
        } else {
          alert(`ERROR saving data for ${this.characterToView[CHARACTER_KEYS.NAME]}. Please try again.`)
        }
        this.closeModal()
      })
    },
    onPressDeleteCharacter() {
      this.store.dispatch("deleteCharacterFromDb", this.characterToViewId).then((success) => {
        if (success) {
          alert(`Deleted ${this.characterToView[CHARACTER_KEYS.NAME]}`)
          this.closeModal()
        } else {
          alert(`ERROR deleting "${this.characterToView[CHARACTER_KEYS.NAME]}" occurred. Please try again.`)
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

      if (this.featuresTempDescription === '') {
        alert("Please enter a feature description")
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

      if (this.weaponsTempAttackModifier === '') {
        alert("Please enter a weapon attack mod")
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

      if (this.weaponTempIsProficient === '') {
        alert("Please decide if you're proficient in the weapon")
        return
      }

      if (this.weaponTempDescription === '') {
        alert("Please enter a weapon description")
        return
      }

      // if (this.weaponTempProperties === '') {
      //   alert("Please enter a weapon properties")
      //   return
      // }

      const newItem = {
        [WEAPON_KEYS.AMOUNT]: this.weaponTempAmount,
        [WEAPON_KEYS.ATTACK_DAMAGE_MOD]: this.weaponsTempAttackModifier,
        [WEAPON_KEYS.CATEGORY]: this.weaponTempCategory,
        [WEAPON_KEYS.DESCRIPTION]: this.weaponTempDescription,
        [WEAPON_KEYS.DIE]: this.weaponTempDieType,
        [WEAPON_KEYS.PROFICIENT]: this.weaponTempIsProficient,
        // [WEAPON_KEYS.PROPERTIES]: this.weaponTempProperties,
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

      if (this.equipmentTempDescription === '') {
        alert("Please enter an equipment description")
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

      if (this.treasureTempDescription === '') {
        alert("Please enter an treasure description")
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
      
      this.treasureTempAmount = ''
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

      if (this.proficiencyTempDescription == '') {
        alert("Please enter a proficiency proficiency")
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

      if (this.spellTempDuration === '' || this.spellTempDuration <= 0) {
        alert("Please enter a Casting Duration")
        return
      }

      if (this.spellTempRange === '' || this.spellTempRange <= 0) {
        alert("Please enter a Casting Range")
        return
      }

      if (this.spellTempDescription === '') {
        alert("Please enter a Casting Description")
        return
      }


      const newSpell = {
        [SPELL_CASTING_KEYS.CASTING_TIME]: this.spellTempCastingTime,
        [SPELL_CASTING_KEYS.DESCRIPTION]: this.spellTempDescription,
        [SPELL_CASTING_KEYS.DURATION]: this.spellTempDuration,
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
      this.spellTempRange = ''
    },
    onPressUpdateCharacterInfo() {
      const info = {
        [CHARACTER_KEYS.LEVEL]: this.characterToView[CHARACTER_KEYS.LEVEL],
        [CHARACTER_KEYS.ARMOR]: this.characterToView[CHARACTER_KEYS.ARMOR],
        [CHARACTER_KEYS.INITIATIVE]: this.characterToView[CHARACTER_KEYS.INITIATIVE],
        [CHARACTER_KEYS.SPEED]: this.characterToView[CHARACTER_KEYS.SPEED],
        [CHARACTER_KEYS.HP]: this.characterToView[CHARACTER_KEYS.HP],
        [CHARACTER_KEYS.PROFICIENCY_BONUS]: this.characterToView[CHARACTER_KEYS.PROFICIENCY_BONUS],
        [CHARACTER_KEYS.PASSIVE_PERCEPTION]: this.characterToView[CHARACTER_KEYS.PASSIVE_PERCEPTION],
        [CHARACTER_KEYS.SPELL_CAST_STAT]: this.characterToView[CHARACTER_KEYS.SPELL_CAST_STAT],
        [CHARACTER_KEYS.SPELL_SAVE_DC]: this.characterToView[CHARACTER_KEYS.SPELL_SAVE_DC],
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
    onPressUpdateBaseStats() {
      const stats = {
        [STAT_KEYS.STRENGTH]: this.characterToView[CHARACTER_KEYS.STATS][STAT_KEYS.STRENGTH],
        [STAT_KEYS.DEXTERITY]: this.characterToView[CHARACTER_KEYS.STATS][STAT_KEYS.DEXTERITY],
        [STAT_KEYS.CONSTITUTION]: this.characterToView[CHARACTER_KEYS.STATS][STAT_KEYS.CONSTITUTION],
        [STAT_KEYS.INTELLIGENCE]: this.characterToView[CHARACTER_KEYS.STATS][STAT_KEYS.INTELLIGENCE],
        [STAT_KEYS.WISDOM]: this.characterToView[CHARACTER_KEYS.STATS][STAT_KEYS.WISDOM],
        [STAT_KEYS.CHARISMA]: this.characterToView[CHARACTER_KEYS.STATS][STAT_KEYS.CHARISMA],
      }

      const savingThrows = {
        [STAT_KEYS.STRENGTH]: this.characterToView[CHARACTER_KEYS.SAVING_THROWS][STAT_KEYS.STRENGTH],
        [STAT_KEYS.DEXTERITY]: this.characterToView[CHARACTER_KEYS.SAVING_THROWS][STAT_KEYS.DEXTERITY],
        [STAT_KEYS.CONSTITUTION]: this.characterToView[CHARACTER_KEYS.SAVING_THROWS][STAT_KEYS.CONSTITUTION],
        [STAT_KEYS.INTELLIGENCE]: this.characterToView[CHARACTER_KEYS.SAVING_THROWS][STAT_KEYS.INTELLIGENCE],
        [STAT_KEYS.WISDOM]: this.characterToView[CHARACTER_KEYS.SAVING_THROWS][STAT_KEYS.WISDOM],
        [STAT_KEYS.CHARISMA]: this.characterToView[CHARACTER_KEYS.SAVING_THROWS][STAT_KEYS.CHARISMA],
      }

      const skills = {
        [SKILL_KEYS.ACROBATICS]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.ACROBATICS],
        [SKILL_KEYS.ANIMAL_HANDLING]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.ANIMAL_HANDLING],
        [SKILL_KEYS.ARCANA]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.ARCANA],
        [SKILL_KEYS.ATHLETICS]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.ATHLETICS],
        [SKILL_KEYS.DECEPTION]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.DECEPTION],
        [SKILL_KEYS.HISTORY]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.HISTORY],
        [SKILL_KEYS.INSIGHT]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.INSIGHT],
        [SKILL_KEYS.INTIMIDATION]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.INTIMIDATION],
        [SKILL_KEYS.INVESTIGATION]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.INVESTIGATION],
        [SKILL_KEYS.MEDICINE]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.MEDICINE],
        [SKILL_KEYS.NATURE]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.NATURE],
        [SKILL_KEYS.PERCEPTION]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.PERCEPTION],
        [SKILL_KEYS.PERFORMANCE]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.PERFORMANCE],
        [SKILL_KEYS.PERSUASION]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.PERSUASION],
        [SKILL_KEYS.RELIGION]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.RELIGION],
        [SKILL_KEYS.SLEIGHT_OF_HAND]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.SLEIGHT_OF_HAND],
        [SKILL_KEYS.STEALTH]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.STEALTH],
        [SKILL_KEYS.SURVIVAL]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.SURVIVAL],
      }

      const payload = {
        charId: this.characterToViewId,
        stats: stats,
        savingThrows: savingThrows,
        skills: skills,
        [CHARACTER_KEYS.INITIATIVE]: this.characterToView[CHARACTER_KEYS.INITIATIVE],
        [CHARACTER_KEYS.PASSIVE_PERCEPTION]: this.characterToView[CHARACTER_KEYS.PASSIVE_PERCEPTION]
      }

      this.store.dispatch("updateCharacterBaseStats", payload).then((success) => {
        if (success) {
          alert(`updated base stats, saving throws, skills, initiative, and passive perception`)
        } else {
          alert(`couldn't update base stats for some reason`)
        }

        this.toggleEditForStat(CHARACTER_KEYS.STATS)
      })
      .catch((error) => {
        console.error(error)
        alert(`An error occured updating base stats`)
      })
    },
    onPressUpdateSavingThrows() {
      const savingThrows = {
        [STAT_KEYS.STRENGTH]: this.characterToView[CHARACTER_KEYS.SAVING_THROWS][STAT_KEYS.STRENGTH],
        [STAT_KEYS.DEXTERITY]: this.characterToView[CHARACTER_KEYS.SAVING_THROWS][STAT_KEYS.DEXTERITY],
        [STAT_KEYS.CONSTITUTION]: this.characterToView[CHARACTER_KEYS.SAVING_THROWS][STAT_KEYS.CONSTITUTION],
        [STAT_KEYS.INTELLIGENCE]: this.characterToView[CHARACTER_KEYS.SAVING_THROWS][STAT_KEYS.INTELLIGENCE],
        [STAT_KEYS.WISDOM]: this.characterToView[CHARACTER_KEYS.SAVING_THROWS][STAT_KEYS.WISDOM],
        [STAT_KEYS.CHARISMA]: this.characterToView[CHARACTER_KEYS.SAVING_THROWS][STAT_KEYS.CHARISMA],
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
        [SKILL_KEYS.ACROBATICS]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.ACROBATICS],
        [SKILL_KEYS.ANIMAL_HANDLING]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.ANIMAL_HANDLING],
        [SKILL_KEYS.ARCANA]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.ARCANA],
        [SKILL_KEYS.ATHLETICS]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.ATHLETICS],
        [SKILL_KEYS.DECEPTION]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.DECEPTION],
        [SKILL_KEYS.HISTORY]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.HISTORY],
        [SKILL_KEYS.INSIGHT]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.INSIGHT],
        [SKILL_KEYS.INTIMIDATION]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.INTIMIDATION],
        [SKILL_KEYS.INVESTIGATION]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.INVESTIGATION],
        [SKILL_KEYS.MEDICINE]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.MEDICINE],
        [SKILL_KEYS.NATURE]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.NATURE],
        [SKILL_KEYS.PERCEPTION]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.PERCEPTION],
        [SKILL_KEYS.PERFORMANCE]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.PERFORMANCE],
        [SKILL_KEYS.PERSUASION]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.PERSUASION],
        [SKILL_KEYS.RELIGION]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.RELIGION],
        [SKILL_KEYS.SLEIGHT_OF_HAND]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.SLEIGHT_OF_HAND],
        [SKILL_KEYS.STEALTH]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.STEALTH],
        [SKILL_KEYS.SURVIVAL]: this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.SURVIVAL],
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
          alert(`Updated info for ${key}`)
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
        [CHARACTER_KEYS.GOLD]: this.characterToView[CHARACTER_KEYS.GOLD]
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
          alert(`updated spell ${spellName}`)
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
      if (spellName in this.characterToView[statRef][levelKey]) {
        delete this.characterToView[statRef][levelKey][spellName]
        
        const payload = {
          charId: this.characterToViewId, 
          levelKey: levelKey,
          spellName: spellName,
          statRef: statRef
        }

        this.store.dispatch("deleteCharacterSpell", payload).then((success) => {
          if (success) {
            alert(`deleted spell ${spellName}`)
          } else {
            alert(`couldn't delete ${spellName} for some reason`)
          }
        })
      }
    },
    calculatePassivePerception(mod) {
      return 10 + mod
    },
    calculateBaseStatBonus(stat) {
      return (stat - 10) / 2
    },
    calculateSpellSavingDc(profBonus, mod) {
      if (profBonus === '') {
        return 8 + mod
      }
      return 8 + profBonus + mod
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
        return this.characterToView[CHARACTER_KEYS.STATS][stat][STAT_VALUES_KEYS.MOD]
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
    getCharacterBackups() {
      this.isShowingLoader = true
      this.store.dispatch("dbGetCharacterBackups", this.characterToViewId).then((success) => {
        if (success) {
          setTimeout(() => {
            this.isShowingLoader = false
            this.toggleCharacterBackupPopup()
          }, 1000)
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
        case CHARACTER_KEYS.STATS:
          this.isShowingBaseStats = !this.isShowingBaseStats
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

        
        default:
          this.isShowingCharacterInfo = !this.isShowingCharacterInfo
      }
    },
    toggleEditForStat(statRef) {
      switch (statRef) {
        case CHARACTER_KEYS.STATS:
          this.isEditingBaseStats = !this.isEditingBaseStats
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
      this.isCharacterBackupsOpen = !this.isCharacterBackupsOpen
    },
    selectBackup(timestamp, backup) {
      this.selectedBackupTimestamp = timestamp
      this.selectedBackupCharacter = backup
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
    }
  },
}
</script>

<style scoped>
@import '../syles/character-info-stats.css';
@import '../syles/popup.css';
/* CHARACTER INFO STYLE */

.character-name {
  margin-top: 50px;
  font-size: 2.5em;
}

.character-info {
  font-size: 1.5em;
}


/* BACKUP STYLING */

.popup-backup {
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  max-width: 80%;
}

.list-backups {
  list-style: none;
  padding: 0;
}

.selected {
  background-color: yellow;
}

/* BUTTONS STYLING */

.button-update {
  padding: 10px;
  background-color: #42B6E8;
  border: none;
  color: white;
  border-radius: 10px;
  font-size: large;
}

.buttons-delete-character {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 10px auto;
  width: 100%;
}

.button-view-backups {
  padding: 10px;
  background-color: dimgray;
  border: none;
  color: white;
  border-radius: 10px;
  font-size: larger;
}

.button-save {
  padding: 10px;
  background-color: #42B6E8;
  border: none;
  color: white;
  border-radius: 10px;
  font-size: larger;
}

.button-cancel-delete {
  padding: 10px;
  background-color: black;
  border: none;
  color: white;
  border-radius: 10px;
  font-size: large;
}

.delete-character-prompt {
  font-size: larger;
  text-align: center;
}


.buttons-at-bottom {
  list-style: none;
}

.buttons-at-bottom li {
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 10px auto;
  width: 100%;
}

</style>