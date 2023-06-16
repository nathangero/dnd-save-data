<template>
  <div class="body">
    <button class="button-close" @click="closeModal('')">Close</button>
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
            <div v-if="!isEditingCharInfo">
              <button class="button-edit-spacer">Edit</button>
            </div>
            <div v-if="isEditingCharInfo">
              <button class="button-edit-spacer">Finish</button>
            </div>
          </div>

          <h3>Character Info</h3>
          
          <div>
            <div v-if="!isEditingCharInfo">
              <button class="button-edit" @click="toggleEditForStat(characterinfo)">Edit</button>
            </div>
            <div v-if="isEditingCharInfo">
              <button class="button-edit" @click="toggleEditForStat(characterinfo)">Finish</button>
            </div>
          </div>
        </div>

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
                <label class="stat-label">Speed: </label>
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

              <li>
                <label for="stats-initiative" class="stat-label">Initiative: </label>
                <input type="number" id="stats-hit-die" v-model="characterToView[CHARACTER_KEYS.INITIATIVE]" class="input-stats" inputmode="numeric" required>
              </li>
              
              <li>
                <label for="stats-speed" class="stat-label">Speed: </label>
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

              <li style="margin-top: 10px;">
                <label for="stats-proficiency-bonus" class="stat-label">Passive Perception: </label>
                <label class="stat-label">{{ characterToView[CHARACTER_KEYS.PASSIVE_PERCEPTION] }}</label>
              </li>

              <li style="margin-top: 10px;">
                <label for="spells-attack-bonus" class="stat-label">Casting Ability:</label>
                <select class="picker" v-model="characterToView[CHARACTER_KEYS.SPELL_CAST_STAT]">
                  <option v-for="stat in STAT_KEYS" :key="stat" :value="stat">{{ stat }}</option>
                </select>
              </li>
            
              <li style="margin-top: 5px;">
                <label class="stat-label">Spell Saving DC: </label>
                <label class="stat-label">{{ characterToView[CHARACTER_KEYS.SPELL_SAVE_DC] }}</label>
              </li>
            </ul>
          </div>

          <div class="buttons-delete-update">
            <button style="margin-left: 10px;" @click="onPressUpdateCharacterInfo()">Update</button>
          </div>
        </div>
      </div>

      <br>
      <div id="base-stats">
        <div class="edit-buttons">
          <div>
            <div v-if="!isEditingBaseStats">
              <button class="button-edit-spacer">Edit</button>
            </div>
            <div v-if="isEditingBaseStats">
              <button class="button-edit-spacer">Finish</button>
            </div>
          </div>

          <h3>Base Stats</h3>
          
          <div>
            <div v-if="!isEditingBaseStats">
              <button class="button-edit" @click="toggleEditForStat(CHARACTER_KEYS.STATS)">Edit</button>
            </div>
            <div v-if="isEditingBaseStats">
              <button class="button-edit" @click="toggleEditForStat(CHARACTER_KEYS.STATS)">Finish</button>
            </div>
          </div>
        </div>
        
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
            <button style="margin-left: 10px;" @click="onPressUpdateBaseStats()">Update</button>
          </div>
        </div>
      </div>

      <br>
      <div id="saving-throws">
        <div class="edit-buttons">
          <div>
            <div v-if="!isEditingSavingThrows">
              <button class="button-edit-spacer">Edit</button>
            </div>
            <div v-if="isEditingSavingThrows">
              <button class="button-edit-spacer">Finish</button>
            </div>
          </div>

          <h3>Saving Throws</h3>
          
          <div>
            <div v-if="!isEditingSavingThrows">
              <button class="button-edit" @click="toggleEditForStat(CHARACTER_KEYS.SAVING_THROWS)">Edit</button>
            </div>
            <div v-if="isEditingSavingThrows">
              <button class="button-edit" @click="toggleEditForStat(CHARACTER_KEYS.SAVING_THROWS)">Finish</button>
            </div>
          </div>
        </div>

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
            <button style="margin-left: 10px;" @click="onPressUpdateSavingThrows()">Update</button>
          </div>
        </div>
      </div>
      
      <br>
      <div id="skills">
        <div class="edit-buttons">
          <div>
            <div v-if="!isEditingSkills">
              <button class="button-edit-spacer">Edit</button>
            </div>
            <div v-if="isEditingSkills">
              <button class="button-edit-spacer">Finish</button>
            </div>
          </div>

          <h3>Skills</h3>
          
          <div>
            <div v-if="!isEditingSkills">
              <button class="button-edit" @click="toggleEditForStat(CHARACTER_KEYS.SKILLS)">Edit</button>
            </div>
            <div v-if="isEditingSkills">
              <button class="button-edit" @click="toggleEditForStat(CHARACTER_KEYS.SKILLS)">Finish</button>
            </div>
          </div>
        </div>

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
            <button style="margin-left: 10px;" @click="onPressUpdateSkills()">Update</button>
          </div>
        </div>
      </div>

      <br>
      <div id="features-traits">
        <div class="edit-buttons">
          <div>
            <div v-if="!isEditingFeaturesTraits">
              <button class="button-edit-spacer">Edit</button>
            </div>
            <div v-if="isEditingFeaturesTraits">
              <button class="button-edit-spacer">Finish</button>
            </div>
          </div>

          <h3>Features & Traits</h3>
          
          <div>
            <div v-if="!isEditingFeaturesTraits">
              <button class="button-edit" @click="toggleEditForStat(CHARACTER_KEYS.FEATURES)">Edit</button>
            </div>
            <div v-if="isEditingFeaturesTraits">
              <button class="button-edit" @click="toggleEditForStat(CHARACTER_KEYS.FEATURES)">Finish</button>
            </div>
          </div>
        </div>

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
                  <div class="container-edit">
                    <div>
                      <br>
                      <label class="stat-label">Type:</label>
                      <select class="picker" v-model="characterToView[CHARACTER_KEYS.FEATURES][key][FEATURES_KEYS.TYPE]">
                        <option v-for="feat in FEATURES_TYPES" :key="feat" :value="feat">{{ feat }}</option>
                      </select>
                    </div>
                    <div>
                      <label class="stat-label" style="margin-right: 10px;" for="features-input"> # of Uses:</label>
                      <input class="input-stats" style="width=70%;" type="number" v-model="characterToView[CHARACTER_KEYS.FEATURES][key][FEATURES_KEYS.USES]"> 
                    </div>
                    <br>
                    <textarea v-model="characterToView[CHARACTER_KEYS.FEATURES][key][FEATURES_KEYS.DESCRIPTION]" rows="4" placeholder="Description"></textarea>
                    <div class="buttons-delete-update">
                      <button @click="onPressDeleteStat(key, CHARACTER_KEYS.FEATURES)">Delete</button>
                      <button @click="onPressUpdateStat(key, characterToView[CHARACTER_KEYS.FEATURES][key], CHARACTER_KEYS.FEATURES)">Update</button>
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
            <input class="item-input" type="text" v-model="featuresTempName" placeholder="New feature/Trait name"> 
            <div class="container-inputs">
              <ul class="list-inputs">
                <li style="margin-top: 10px;">
                  <label>Type:</label>
                  <select class="picker" v-model="featuresTempType">
                    <option v-for="feat in FEATURES_TYPES" :key="feat" :value="feat">{{ feat }}</option>
                  </select>
                </li>

                <li>
                  <label style="margin-right: 10px;" for="features-input"> # of Uses:</label>
                  <input class="input-stats" style="width=70%;" type="number" v-model="featuresTempUses"> 
                </li>
              </ul>
            </div>
            
            <br>
            <textarea v-model="featuresTempDescription" rows="4" placeholder="Description"></textarea>
            <br>
            <button @click="onPressAddFeatures" style="margin-top: 10px;">Add</button>
          </div>         
        </template>
      </div>

      <br>
      <div id="weapons">
        <div class="edit-buttons">
          <div>
            <div v-if="!isEditingWeapons">
              <button class="button-edit-spacer">Edit</button>
            </div>
            <div v-if="isEditingWeapons">
              <button class="button-edit-spacer">Finish</button>
            </div>
          </div>

          <h3>Weapons & Spells</h3>
          
          <div>
            <div v-if="!isEditingWeapons">
              <button class="button-edit" @click="toggleEditForStat(CHARACTER_KEYS.WEAPONS)">Edit</button>
            </div>
            <div v-if="isEditingWeapons">
              <button class="button-edit" @click="toggleEditForStat(CHARACTER_KEYS.WEAPONS)">Finish</button>
            </div>
          </div>
        </div>

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
                      <label class="spell-value">{{ getStatBonusSign(getStatModFromKey(item[WEAPON_KEYS.ATTACK_DAMAGE_MOD])) }} ({{ STAT_NAMES[item[WEAPON_KEYS.ATTACK_DAMAGE_MOD]] }})</label>
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
                        <label style="margin-right: 10px;" for="equipment-input">{{ WEAPON_NAMES[WEAPON_KEYS.AMOUNT] }}:</label>
                        <input class="input-stats" style="width=70%;" type="number" v-model="characterToView[CHARACTER_KEYS.WEAPONS][key][WEAPON_KEYS.AMOUNT]"> 
                      </li>
                      
                      <li style="margin-top: 10px;">
                        <label style="margin-right: 10px;" for="equipment-input">{{ WEAPON_NAMES[WEAPON_KEYS.ATTACK_DAMAGE_MOD] }}:</label>
                        <select class="picker" v-model="characterToView[CHARACTER_KEYS.WEAPONS][key][WEAPON_KEYS.ATTACK_DAMAGE_MOD]">
                          <option v-for="mod in WEAPON_MODS" :key="mod" :value="mod">{{ STAT_NAMES[mod] }}</option>
                        </select>
                      </li>
                      
                      <li style="margin-top: 10px;">
                        <label style="margin-right: 10px;" for="equipment-input">{{ WEAPON_NAMES[WEAPON_KEYS.DIE] }}:</label>
                        <select class="picker" v-model="characterToView[CHARACTER_KEYS.WEAPONS][key][WEAPON_KEYS.DIE]">
                          <option v-for="die in DIE_TYPE" :key="die" :value="die">{{ die }}</option>
                        </select>
                      </li>

                      <li style="margin-top: 10px;">
                        <label style="margin-right: 10px;" for="equipment-input">{{ WEAPON_NAMES[WEAPON_KEYS.CATEGORY] }}:</label>
                        <select class="picker" v-model="characterToView[CHARACTER_KEYS.WEAPONS][key][WEAPON_KEYS.CATEGORY]">
                          <option v-for="category in WEAPON_CATEGORY" :key="category" :value="category">{{ category }}</option>
                        </select>
                      </li>

                      <li style="margin-top: 10px;">
                        <label style="margin-right: 10px;" for="equipment-input">{{ WEAPON_NAMES[WEAPON_KEYS.PROFICIENT] }}:</label>
                        <input type="checkbox" class="checkbox" v-model="characterToView[CHARACTER_KEYS.WEAPONS][key][WEAPON_KEYS.PROFICIENT]">
                      </li>
                    </ul>
                  </div>

                  <div class="buttons-delete-update">
                    <button @click="onPressDeleteStat(key, CHARACTER_KEYS.WEAPONS)">Delete</button>
                    <button @click="onPressUpdateStat(key, characterToView[CHARACTER_KEYS.WEAPONS][key], CHARACTER_KEYS.WEAPONS)">Update</button>
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
                <li style="margin-top: 10px;">
                  <label style="margin-right: 10px;" for="equipment-input">Amount:</label>
                  <input class="input-stats" style="width=70%;" type="number" v-model="weaponTempAmount"> 
                </li>
                
                <li style="margin-top: 10px;">
                  <label style="margin-right: 10px;" for="equipment-input">Attack Bonus Mod:</label>
                  <select class="picker" v-model="weaponsTempAttackModifier">
                    <option v-for="mod in WEAPON_MODS" :key="mod" :value="mod">{{ mod }}</option>
                  </select>
                </li>
                
                <li style="margin-top: 10px;">
                  <label style="margin-right: 10px;" for="equipment-input">Damage Mod:</label>
                  <select class="picker" v-model="weaponsTempDamageModifier">
                    <option v-for="mod in WEAPON_MODS" :key="mod" :value="mod">{{ mod }}</option>
                  </select>
                </li>
                
                <li style="margin-top: 10px;">
                  <label style="margin-right: 10px;" for="equipment-input">Die Type:</label>
                  <select class="picker" v-model="weaponTempDieType">
                    <option v-for="die in DIE_TYPE" :key="die" :value="die">{{ die }}</option>
                  </select>
                </li>

                <li style="margin-top: 10px;">
                  <label style="margin-right: 10px;" for="equipment-input">Category:</label>
                  <select class="picker" v-model="weaponTempCategory">
                    <option v-for="category in WEAPON_CATEGORY" :key="category" :value="category">{{ category }}</option>
                  </select>
                </li>

                <li style="margin-top: 10px;">
                  <label style="margin-right: 10px;" for="equipment-input">Proficient:</label>
                  <input type="checkbox" class="checkbox" v-model="weaponTempIsProficient">
                </li>
              </ul>
            </div>

            <br>
            <textarea v-model="weaponTempDescription" rows="4" placeholder="Description"></textarea>
            <br>
            <button @click="onPressAddWeapon" style="margin-top: 10px;">Add</button>
          </div>
        </template>
      </div>

      <br>
      <div id="equipment">
        <div class="edit-buttons">
          <div>
            <div v-if="!isEditingEquipment">
              <button class="button-edit-spacer">Edit</button>
            </div>
            <div v-if="isEditingEquipment">
              <button class="button-edit-spacer">Finish</button>
            </div>
          </div>

          <h3>Equipment</h3>
          
          <div>
            <div v-if="!isEditingEquipment">
              <button class="button-edit" @click="toggleEditForStat(CHARACTER_KEYS.EQUIPMENT)">Edit</button>
            </div>
            <div v-if="isEditingEquipment">
              <button class="button-edit" @click="toggleEditForStat(CHARACTER_KEYS.EQUIPMENT)">Finish</button>
            </div>
          </div>
        </div>

        <template v-if="getDictionarySize(characterToView[CHARACTER_KEYS.EQUIPMENT]) > 0">
          <div>
            <ul class="list">
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
                      <label style="margin-right: 10px;" for="equipment-input">Amount:</label>
                      <input class="input-stats" style="width=70%; margin-bottom: 10px;" type="number" v-model="characterToView[CHARACTER_KEYS.EQUIPMENT][key][EQUIPMENT_KEYS.AMOUNT]"> 
                    </div>
                    <textarea v-model="characterToView[CHARACTER_KEYS.EQUIPMENT][key][EQUIPMENT_KEYS.DESCRIPTION]" rows="4" placeholder="Description"></textarea>
                  </div>

                  <div class="buttons-delete-update">
                    <button @click="onPressDeleteStat(key, CHARACTER_KEYS.EQUIPMENT)">Delete</button>
                    <button @click="onPressUpdateStat(key, characterToView[CHARACTER_KEYS.EQUIPMENT][key], CHARACTER_KEYS.EQUIPMENT)">Update</button>
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
              <label style="margin-right: 10px;" for="equipment-input">Amount:</label>
              <input class="input-stats" style="width=70%;" type="number" v-model="equipmentTempAmount"> 
            </div>
            <br>
            <textarea v-model="equipmentTempDescription" rows="4" placeholder="Description"></textarea>
            <br>
            <button @click="onPressAddEquipment" style="margin-top: 10px;">Add</button>
          </div>
        </template>
      </div>

      <br>
      <div id="treasure">
        <div class="edit-buttons">
          <div>
            <div v-if="!isEditingTreasure">
              <button class="button-edit-spacer">Edit</button>
            </div>
            <div v-if="isEditingTreasure">
              <button class="button-edit-spacer">Finish</button>
            </div>
          </div>

          <h3>Treasures</h3>
          
          <div>
            <div v-if="!isEditingTreasure">
              <button class="button-edit" @click="toggleEditForStat(CHARACTER_KEYS.TREASURES)">Edit</button>
            </div>
            <div v-if="isEditingTreasure">
              <button class="button-edit" @click="toggleEditForStat(CHARACTER_KEYS.TREASURES)">Finish</button>
            </div>
          </div>
        </div>

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
                      <label style="margin-right: 10px;" for="equipment-input">Amount:</label>
                      <input class="input-stats" style="width=70%; margin-bottom: 10px;" type="number" v-model="characterToView[CHARACTER_KEYS.TREASURES][key][EQUIPMENT_KEYS.AMOUNT]"> 
                    </div>
                    <textarea v-model="characterToView[CHARACTER_KEYS.TREASURES][key][EQUIPMENT_KEYS.DESCRIPTION]" rows="4" placeholder="Description"></textarea>
                  </div>

                  <div class="buttons-delete-update">
                    <button @click="onPressDeleteStat(key, CHARACTER_KEYS.TREASURES)">Delete</button>
                    <button @click="onPressUpdateStat(key, characterToView[CHARACTER_KEYS.TREASURES][key], CHARACTER_KEYS.TREASURES)">Update</button>
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
              <label style="margin-right: 10px;" for="equipment-input">Amount:</label>
              <input class="input-stats" style="width=70%;" type="number" v-model="treasureTempAmount"> 
            </div>
            <br>
            <textarea v-model="treasureTempDescription" rows="4" placeholder="Description"></textarea>
            <br>
            <button @click="onPressAddTreasure" style="margin-top: 10px;">Add</button>
          </div>
        </template>
      </div>
      
      <br>
      <div id="languages">
        <div class="edit-buttons">
          <div>
            <div v-if="!isEditingLanguages">
              <button class="button-edit-spacer">Edit</button>
            </div>
            <div v-if="isEditingLanguages">
              <button class="button-edit-spacer">Finish</button>
            </div>
          </div>

          <h3>Languages</h3>
          
          <div>
            <div v-if="!isEditingLanguages">
              <button class="button-edit" @click="toggleEditForStat(CHARACTER_KEYS.LANGUAGES)">Edit</button>
            </div>
            <div v-if="isEditingLanguages">
              <button class="button-edit" @click="toggleEditForStat(CHARACTER_KEYS.LANGUAGES)">Finish</button>
            </div>
          </div>
        </div>

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
                    <button style="margin-right: 20px;" @click="onPressDeleteStat(key, CHARACTER_KEYS.LANGUAGES)">Delete</button>
                    <button @click="onPressUpdateStat(key, characterToView[CHARACTER_KEYS.LANGUAGES][key], CHARACTER_KEYS.LANGUAGES)">Update</button>
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
              <label>Proficiency: </label>
              <select class="picker" v-model="languagesTempProficiency">
                <option v-for="prof in LANGUAGE_PROFICIENCY" :key="prof" :value="prof">{{ prof }}</option>
              </select>
            </div>
            <br>
            <button @click="onPressAddLanguage" style="margin-top: 10px;">Add</button>
          </div>
        </template>
      </div>      

      <br>
      <div id="proficiences">
        <div class="edit-buttons">
          <div>
            <div v-if="!isEditingProficiencies">
              <button class="button-edit-spacer">Edit</button>
            </div>
            <div v-if="isEditingProficiencies">
              <button class="button-edit-spacer">Finish</button>
            </div>
          </div>

          <h3>Proficiencies</h3>
          
          <div>
            <div v-if="!isEditingProficiencies">
              <button class="button-edit" @click="toggleEditForStat(CHARACTER_KEYS.PROFICIENCIES)">Edit</button>
            </div>
            <div v-if="isEditingProficiencies">
              <button class="button-edit" @click="toggleEditForStat(CHARACTER_KEYS.PROFICIENCIES)">Finish</button>
            </div>
          </div>
        </div>

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
                    <button @click="onPressDeleteStat(key, CHARACTER_KEYS.PROFICIENCIES)">Delete</button>
                    <button @click="onPressUpdateStat(key, characterToView[CHARACTER_KEYS.PROFICIENCIES][key], CHARACTER_KEYS.PROFICIENCIES)">Update</button>
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
            <button @click="onPressAddProficiency" style="margin-top: 10px;">Add</button>
          </div>
        </template>
      </div>

      <br>
      <div id="spell-casting">
        <div class="edit-buttons">
          <div>
            <div v-if="!isEditingSpellCasting">
              <button class="button-edit-spacer">Edit</button>
            </div>
            <div v-if="isEditingSpellCasting">
              <button class="button-edit-spacer">Finish</button>
            </div>
          </div>

          <h3>Spell Casting</h3>
          
          <div>
            <div v-if="!isEditingSpellCasting">
              <button class="button-edit" @click="toggleEditForStat(CHARACTER_KEYS.SPELLS)">Edit</button>
            </div>
            <div v-if="isEditingSpellCasting">
              <button class="button-edit" @click="toggleEditForStat(CHARACTER_KEYS.SPELLS)">Finish</button>
            </div>
          </div>
        </div>

        <template v-if="getDictionarySize(characterToView[CHARACTER_KEYS.SPELLS]) > 0">
          <div>
            <ul class="list">
              <li v-for="(item, level) in characterToView[CHARACTER_KEYS.SPELLS]" :key="level">
                <template v-if="getDictionarySize(characterToView[CHARACTER_KEYS.SPELLS][level]) > 0">
                  <label class="item-name">{{ getSpellLevelName(level) }}:</label>
                  <ul>
                    <li v-for="(spell, spellName) in characterToView[CHARACTER_KEYS.SPELLS][level]" :key="spellName">
                      <div v-if="!isEditingSpellCasting">
                        <label class="item-name">{{ spellName }}</label>
                        <br>
                        <div class="spell-list">
                          <div class="spell-group">
                            <label class="spell-label">Casting Time:</label>
                            <label class="spell-value">{{ spell[[SPELLCASTING_KEYS.CASTING_TIME]] }} action(s)</label>
                          </div>
                          <div class="spell-group">
                            <label class="spell-label">Duration:</label>
                            <label class="spell-value">{{ spell[[SPELLCASTING_KEYS.DURATION]] }} sec</label>
                          </div>
                          <div class="spell-group">
                            <label class="spell-label">Range:</label>
                            <label class="spell-value">{{ spell[[SPELLCASTING_KEYS.RANGE]] }} ft</label>
                          </div>
                        </div>
                        <label class="spell-description">{{ spell[[SPELLCASTING_KEYS.DESCRIPTION]] }}</label>
                      </div>

                      <!-- Edit and Delete -->
                      <div v-if="isEditingSpellCasting">
                        <label class="item-name">{{ spellName }}</label>
                        <br>
                        <div>
                          <label for="spells-casting-time" class="stat-label">Casting Time (# of actions):</label>
                          <input type="number" id="spells-casting-time" v-model="characterToView[CHARACTER_KEYS.SPELLS][level][spellName][SPELLCASTING_KEYS.CASTING_TIME]" class="input-stats" inputmode="numeric" required>
                        </div>
                        <div>
                          <label for="spells-casting-duration" class="stat-label">Duration (in seconds):</label>
                          <input type="number" id="spells-casting-duration" style="width: 100px;" v-model="characterToView[CHARACTER_KEYS.SPELLS][level][spellName][SPELLCASTING_KEYS.DURATION]" class="input-stats" inputmode="numeric" required>
                        </div>
                        
                        <div>
                          <label for="spells-range" class="stat-label">Range (in feet):</label>
                          <input type="number" id="spells-range" v-model="characterToView[CHARACTER_KEYS.SPELLS][level][spellName][SPELLCASTING_KEYS.RANGE]" class="input-stats" inputmode="numeric" required>
                        </div>
                        <br>
                        <textarea v-model="characterToView[CHARACTER_KEYS.SPELLS][level][spellName][SPELLCASTING_KEYS.DESCRIPTION]" rows="4" placeholder="Description"></textarea>
                        <div class="buttons-delete-update">
                          <button style="margin-right: 10px;" @click="onPressDeleteSpell(level, spellName, CHARACTER_KEYS.SPELLS)">Delete</button>
                          <button style="margin-left: 10px;" @click="onPressUpdateSpell(level, spellName, characterToView[CHARACTER_KEYS.SPELLS][level][spellName], CHARACTER_KEYS.SPELLS)">Update</button>
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
          <div>
            <input class="item-input" type="text" v-model="spellTempName" placeholder="New spell name"> 
            <div>
              <br>
              <label for="spells-level" class="stat-label">Level:</label>
              <select class="picker" v-model="spellTempLevel">
                <option v-for="levels in SPELLCASTING_NAMES" :key="levels" :value="levels">{{ levels }}</option>
              </select>
            </div>
            <div>
              <label for="spells-casting-time" class="stat-label">Casting Time (# of actions):</label>
              <input type="number" id="spells-casting-time" v-model="spellTempCastingTime" class="input-stats" inputmode="numeric" required>
            </div>
            <div>
              <label for="spells-casting-duration" class="stat-label">Duration (in seconds):</label>
              <input type="number" id="spells-casting-duration" style="width: 100px;" v-model="spellTempDuration" class="input-stats" inputmode="numeric" required>
            </div>
            
            <div>
              <label for="spells-range" class="stat-label">Range (in feet):</label>
              <input type="number" id="spells-range" v-model="spellTempRange" class="input-stats" inputmode="numeric" required>
            </div>
            <br>
            <textarea v-model="spellTempDescription" rows="4" placeholder="Description"></textarea>
            <br>
            <button @click="onPressAddSpell" style="margin-top: 10px;">Add</button>
          </div>         
        </template>
      </div>
      
      <br>
      <button class="button-delete" @click="toggleDeleteCharacterPopup">Delete Character</button>
    </div>

    <!-- Delete Character Popup -->
    <div id="delete-character">
      <transition name="fade" appear>
        <div class="overlay" v-if="isDeleteCharacterPopupOpen">
          <div class="popup">
            <div class="form">
              <h1>Delete {{ characterToView[CHARACTER_KEYS.NAME] }}?</h1>
              <p>This action can't be undone</p>
              <div class="delete-buttons">
                <button style="margin-right: 20px;" @click="toggleDeleteCharacterPopup">Cancel</button>
                <button @click="deleteCharacter">Delete</button>
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
import { DEATH_SAVES_KEYS } from '@/enums/dbKeys/deathSaves-keys.js'
import { SKILL_KEYS, SKILL_NAMES } from '@/enums/dbKeys/skill-keys.js'
import { STAT_KEYS, STAT_VALUES_KEYS, STAT_NAMES } from '@/enums/dbKeys/stat-keys.js'
import { SPELLCASTING_KEYS, SPELLCASTING_NAMES } from '@/enums/dbKeys/spellcasting_keys'
import { WEAPON_KEYS, WEAPON_CATEGORY, WEAPON_PROPERTY, WEAPON_NAMES } from '@/enums/dbKeys/weapons-keys'


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
      isDeleteCharacterPopupOpen: false,
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
      SPELLCASTING_KEYS: SPELLCASTING_KEYS,
      SPELLCASTING_NAMES: SPELLCASTING_NAMES,
      WEAPON_KEYS: WEAPON_KEYS,
      WEAPON_CATEGORY: WEAPON_CATEGORY,
      WEAPON_PROPERTY: WEAPON_PROPERTY,
      WEAPON_NAMES: WEAPON_NAMES,
      WEAPON_MODS: ['', STAT_KEYS.STRENGTH, STAT_KEYS.DEXTERITY, STAT_KEYS.CONSTITUTION, STAT_KEYS.INTELLIGENCE, STAT_KEYS.WISDOM, STAT_KEYS.CHARISMA],
      characterToView: new Character(),
      level: '',
      characterArmor: '',
      [CHARACTER_KEYS.INITIATIVE]: '',
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
      weaponsTempDamageModifier: '', // e.g. dex
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
    'characterToView.stats.str.value': function(newValue) {
      const statMod = Math.floor(this.getBaseStatBonus(newValue))

      this.characterToView[CHARACTER_KEYS.STATS][STAT_KEYS.STRENGTH][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SAVING_THROWS][STAT_KEYS.STRENGTH][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.ATHLETICS][STAT_VALUES_KEYS.MOD] = statMod
    },
    'characterToView.stats.dex.value': function(newValue) {
      const statMod = Math.floor(this.getBaseStatBonus(newValue))

      this.characterToView[CHARACTER_KEYS.STATS][STAT_KEYS.DEXTERITY][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SAVING_THROWS][STAT_KEYS.DEXTERITY][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.ACROBATICS][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.SLEIGHT_OF_HAND][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.STEALTH][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.INITIATIVE] = statMod
    },
    'characterToView.stats.con.value': function(newValue) {
      const statMod = Math.floor(this.getBaseStatBonus(newValue))

      this.characterToView[CHARACTER_KEYS.STATS][STAT_KEYS.CONSTITUTION][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SAVING_THROWS][STAT_KEYS.CONSTITUTION][STAT_VALUES_KEYS.MOD] = statMod
    },
    'characterToView.stats.int.value': function(newValue) {
      const statMod = Math.floor(this.getBaseStatBonus(newValue))

      this.characterToView[CHARACTER_KEYS.STATS][STAT_KEYS.INTELLIGENCE][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SAVING_THROWS][STAT_KEYS.INTELLIGENCE][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.ARCANA][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.HISTORY][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.INVESTIGATION][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.NATURE][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.RELIGION][STAT_VALUES_KEYS.MOD] = statMod
    },
    'characterToView.stats.wis.value': function(newValue) {
      const statMod = Math.floor(this.getBaseStatBonus(newValue))

      this.characterToView[CHARACTER_KEYS.STATS][STAT_KEYS.WISDOM][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SAVING_THROWS][STAT_KEYS.WISDOM][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.ANIMAL_HANDLING][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.INSIGHT][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.MEDICINE][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.PERCEPTION][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.SURVIVAL][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.PASSIVE_PERCEPTION] = 10 + statMod
    },
    'characterToView.stats.cha.value': function(newValue) {
      const statMod = Math.floor(this.getBaseStatBonus(newValue))

      this.characterToView[CHARACTER_KEYS.STATS][STAT_KEYS.CHARISMA][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SAVING_THROWS][STAT_KEYS.CHARISMA][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.DECEPTION][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.INTIMIDATION][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.PERFORMANCE][STAT_VALUES_KEYS.MOD] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.PERSUASION][STAT_VALUES_KEYS.MOD] = statMod
    },
    'characterToView.spellCastStat': function(newValue) {
      if (newValue === '') {
        this.characterToView[CHARACTER_KEYS.SPELL_SAVE_DC] = 0
      } else {
        const profBonus = this.characterToView[CHARACTER_KEYS.PROFICIENCY_BONUS]
        const mod = this.characterToView[CHARACTER_KEYS.STATS][newValue][STAT_VALUES_KEYS.MOD]
        this.characterToView[CHARACTER_KEYS.SPELL_SAVE_DC] = 8 + profBonus + mod
      }
      
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    deleteCharacter() {
      this.store.dispatch("deleteCharacterFromDb", this.characterToViewId).then((success) => {
        console.info('@CharacterPage: deleteCharacter() post store')
        if (success) {
          this.closeModal()
        } else {
          alert(`ERROR deleting "${this.characterToView[CHARACTER_KEYS.NAME]}" occurred. Please try again.`)
        }
      })
      
    },
    getBaseStatBonus(stat) {
      return (stat - 10) / 2
    },
    getDictionarySize(dict) {
      if (dict) {
        const count = Object.keys(dict).length;
        return count
      } else {
        return 0
      }
    },
    getSpellLevelName(level) {
      var output = "Level "
      switch (level) {
        case SPELLCASTING_KEYS.LEVEL_1:
          output += SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_1]
          break
        case SPELLCASTING_KEYS.LEVEL_2:
          output += SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_2]
          break
        case SPELLCASTING_KEYS.LEVEL_3:
          output += SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_3]
          break
        case SPELLCASTING_KEYS.LEVEL_4:
          output += SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_4]
          break
        case SPELLCASTING_KEYS.LEVEL_5:
          output += SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_5]
          break
        case SPELLCASTING_KEYS.LEVEL_6:
          output += SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_6]
          break
        case SPELLCASTING_KEYS.LEVEL_7:
          output += SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_7]
          break
        case SPELLCASTING_KEYS.LEVEL_8:
          output += SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_8]
          break
        case SPELLCASTING_KEYS.LEVEL_9:
          output += SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_9]
          break
        default:
          output = SPELLCASTING_NAMES[SPELLCASTING_KEYS.CANTRIPS]
          break
      }

      return output
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

      if (this.weaponsTempDamageModifier === '') {
        alert("Please enter a weapon damage mod")
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
        [WEAPON_KEYS.DAMAGE_MOD]: this.weaponsTempDamageModifier,
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


      var levelKey;
      switch (this.spellTempLevel) {
        case SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_1]:
          levelKey = SPELLCASTING_KEYS.LEVEL_1
          break
        case SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_2]:
          levelKey = SPELLCASTING_KEYS.LEVEL_2
          break
        case SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_3]:
          levelKey = SPELLCASTING_KEYS.LEVEL_3
          break
        case SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_4]:
          levelKey = SPELLCASTING_KEYS.LEVEL_4
          break
        case SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_5]:
          levelKey = SPELLCASTING_KEYS.LEVEL_5
          break
        case SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_6]:
          levelKey = SPELLCASTING_KEYS.LEVEL_6
          break
        case SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_7]:
          levelKey = SPELLCASTING_KEYS.LEVEL_7
          break
        case SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_8]:
          levelKey = SPELLCASTING_KEYS.LEVEL_8
          break
        case SPELLCASTING_NAMES[SPELLCASTING_KEYS.LEVEL_9]:
          levelKey = SPELLCASTING_KEYS.LEVEL_9
          break
        default:
          levelKey = SPELLCASTING_KEYS.CANTRIPS
      }

      const newSpell = {
        [SPELLCASTING_KEYS.CASTING_TIME]: this.spellTempCastingTime,
        [SPELLCASTING_KEYS.DESCRIPTION]: this.spellTempDescription,
        [SPELLCASTING_KEYS.DURATION]: this.spellTempDuration,
        [SPELLCASTING_KEYS.RANGE]: this.spellTempRange
      }
      
      const newEntry = {
        [this.spellTempName]: newSpell
      }

      const payload = {
        charId: this.characterToViewId,
        levelKey: levelKey,
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
    toggleDeleteCharacterPopup() {
      this.isDeleteCharacterPopupOpen = !this.isDeleteCharacterPopupOpen
    },
  },
}
</script>

<style>
.slide-up-enter-active {
transition: transform 0.3s;
}

.slide-up-leave-active {
  transition: transform 0.4s;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}

.slide-up-enter-to,
.slide-up-leave {
  transform: translateY(0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

h3 {
  text-decoration: underline;
}

textarea {
  width: 90%;
  text-align: left;
  border-radius: 10px;
  padding: 5px;
  font-size: large;
}

.picker {
  padding: 5px;
  margin: 5px;
  font-size: larger;
}

.checkbox {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  padding: 0;
}

.list-divider {
  width: 90%;
  margin-top: 10px;
}

.input-stats {
  font-size: larger;
}

/* CHARACTER INFO STYLE */

.character-name {
  margin-top: 50px;
  font-size: 2.5em;
}

.character-info {
  font-size: 1.5em;
}

/* LIST - ENTERING INPUT STYLE */

.container-inputs {
  display: flex;
  justify-content: space-evenly;
  margin: 0 auto;
}

.list-inputs {
  list-style: none;
}

.list-inputs li {
  display: flex;
  align-items: left;
}

/* LIST - ADDED ITEMS STYLE */

.list-container-character {
  display: flex;
  justify-content: center;
  /* width: 90%; */
  margin: 0 auto;
}

/* POPUP STYLE */

.popup {
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  max-width: 500px;
}

.popup.active {
  opacity: 1;
}

/* EDITING - STYLE */

.container-edit {
  text-align: center;
}

/* STAT STYLE */

.stat-list {
  display: flex;
  flex-direction: column;
  list-style-type: none;
  width: 65%;
  margin: 0 auto;
  padding-left: 0;
}

.stat-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.stat-label {
  text-align: left;
  font-size: larger;
}

.stat-value {
  flex-grow: 1;
  text-align: right;
  font-size: larger;
}

.stat-bonus {
  margin-left: 10px; /* Adjust as needed */
  text-align: right;
  font-size: larger;
}

/* WEAPON STYLES */

.weapon-list {
  display: flex;
  flex-direction: column;
  list-style-type: none;
  width: 80%;
  margin: 0 auto;
}


.weapon-group {
  display: flex;
  
  margin-bottom: 10px;
}

.weapon-label {
  text-align: left;
  font-size: larger;
}

.weapon-value {
  flex-grow: 1;
  text-align: right;
  font-size: larger;
}

/* LANGUAGE STYLES */

.language-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  width: 50%
}

.language-label {
  text-align: left;
  font-size: larger;
  font-weight: bold;
}

.language-value {
  flex-grow: 1;
  text-align: right;
  font-size: larger;
}


/* SPELL STYLES */

.spell-list {
  display: flex;
  flex-direction: column;
  list-style-type: none;
  width: 75%;
}

.spell-group {
  display: flex;
  align-items: center;
}

.spell-label {
  text-align: left;
  font-size: larger;
}

.spell-value {
  flex-grow: 1;
  text-align: right;
  font-size: larger;
}

.spell-description {
  font-size: larger;
  width: 100%;
  margin-top: 10px;
}

/* BUTTON STYLES */

.button-close {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
}

.delete-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.button-delete {
  margin-bottom: 30px;
}

.edit-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.edit-buttons h3 {
  margin: 0 auto;
}

.button-edit {
  margin-left: auto;
  margin-right: 10px;
  padding: 5px 10px;
}

.button-edit-spacer {
  margin-right: auto;
  margin-left: 10px;
  padding: 5px 10px;
  visibility: hidden;
}

.buttons-delete-update {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 15px auto;
  width: 60%;
}
</style>