<template>
  <div id="body">
    <div class="navigation-bar">
      <button class="button-jump-to" @click="openJumpToMenu">Jump to</button>
      <template v-if="isShowingJumpToMenu">
        <div class="jump-to-menu" :class="{ 'show-menu': isShowingJumpToMenu }">
          <ul class="list-inputs">
            <li>
              <a @click="scrollToSection('character-background')">{{ CHARACTER_SECTIONS.CHARACTER_BACKGROUND }}</a>
            </li>

            <li>
              <a @click="scrollToSection('character-info')">{{ CHARACTER_SECTIONS.CHARACTER_INFO }}</a>
            </li>

            <li>
              <a @click="scrollToSection('base-stats')">{{ CHARACTER_SECTIONS.BASE_STATS }}</a>
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
              <a @click="scrollToSection('proficiences')">{{ CHARACTER_SECTIONS.PROFICIENCIES }}</a>
            </li>

            <li>
              <a @click="scrollToSection('spell-slots')">{{ CHARACTER_SECTIONS.SPELL_SLOTS }}</a>
            </li>

            <li>
              <a @click="scrollToSection('spell-casting')">{{ CHARACTER_SECTIONS.SPELL_CASTING }}</a>
            </li>

            <li>
              <a @click="scrollToSection('create-character')">Create Character</a>
            </li>
          </ul>

          <!-- Add more links for other sections -->
        </div>
      </template>
      <button class="button-close" @click="closeModal">Close</button>
    </div>

    <div class="character-to-view">
      <div id="character-background">
        <div class="input-container">
          <h1>New Character</h1>
          <input class="character-description" type="text" v-model="characterName" placeholder="Name" required>
          <input class="character-description" type="text" v-model="characterBackground" placeholder="Background" required>
          <input class="character-description" type="text" v-model="characterRace" placeholder="Race" required>

          <div class="container-inputs">
            <ul class="list-inputs">
              <li style="padding-top: 10px">
                <label for="character-alignment" class="stat-label" style="margin-right: 10px;">Alignment:</label>
                <select class="picker" v-model="characterAlignment">
                  <option v-for="alignment in ALIGNMENT_TYPES" :key="alignment">{{ alignment }}</option>
                </select>
              </li>

              <li style="margin-top: 20px;">
                <label for="character-class" class="stat-label">Class:</label>
                <select class="picker" v-model="characterClass">
                  <option v-for="name in CLASS_NAMES" :key="name" :value="name">{{ name }}</option>
                </select>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <br>
      <div id="character-info">
        <div class="h3-bar">
          <h3 @click="toggleCollapseForStat(characterinfo)">Character Info</h3>
          <font-awesome-icon icon="chevron-up" v-if="!isShowingCharacterInfo" class="collapse-chevron"/>
          <font-awesome-icon icon="chevron-down" v-if="isShowingCharacterInfo" class="collapse-chevron"/>
        </div>

        <collapse-transition dimension="height">
          <div v-if="isShowingCharacterInfo">
            <ul class="stat-list">
              <li>
                <div class="stat-group">
                  <label for="stats-level" class="stat-label">Starting level:</label>
                  <div class="spacer"></div>
                  <input type="number" id="stats-level" v-model="level" class="input-stats" inputmode="numeric" required>
                </div>
              </li>

              <li>
                <div class="stat-group">
                  <label for="stats-armor-class" class="stat-label">Armor Class: </label>
                  <div class="spacer"></div>
                  <input type="number" id="stats-armor-class" v-model="characterArmor" class="input-stats" inputmode="numeric" required>
                </div>
              </li>

              <li style="margin-top: 10px; margin-bottom: 10px;">
                <div class="stat-group">
                  <label for="stats-initiative" class="stat-label">Initiative: </label>
                  <div class="spacer"></div>
                  <label class="stat-label">{{ getStatBonusSign(stats[STAT_KEYS.DEXTERITY].calculateMod()) }}</label>
                </div>
              </li>

              <li>
                <div class="stat-group">
                  <label for="stats-speed" class="stat-label">Speed (ft): </label>
                  <div class="spacer"></div>
                  <input type="number" id="stats-speed" v-model="characterSpeed" class="input-stats" inputmode="numeric" required>
                </div>
              </li>

              <li>
                <div class="stat-group">
                  <label for="stats-hp" class="stat-label">Hit Points (HP):</label>
                  <div class="spacer"></div>
                  <input type="number" id="stats-hp" v-model="hp[HP_KEYS.MAX]" class="input-stats" inputmode="numeric" required>
                </div>
              </li>

              <li style="margin-top: 10px;">
                <div class="stat-group">
                  <label class="stat-label">Hit Die Type: </label>
                  <div class="spacer"></div>
                  <select class="picker" v-model="hp[HP_KEYS.DIE]">
                    <option v-for="die in DIE_TYPE" :key="die" :value="die">{{ die }}</option>
                  </select>
                </div>
              </li>

              <li>
                <div class="stat-group">
                  <label for="stats-hit-die" class="stat-label"># of Hit Die: </label>
                  <div class="spacer"></div>
                  <input type="number" id="stats-hit-die" v-model="hp[HP_KEYS.DIE_AMOUNT_MAX]" class="input-stats" inputmode="numeric" required>
                </div>
              </li>

              <li style="margin-top: 10px; margin-bottom: 10px;">
                <div class="stat-group">
                  <label for="stats-proficiency-bonus" class="stat-label">Proficiency Bonus: </label>
                  <div class="spacer"></div>
                  <label class="stat-value">{{ getStatBonusSign(getProficiencyBonus()) }}</label>
                </div>
              </li>

              <li style="margin-top: 10px;">
                <div class="stat-group">
                  <label class="stat-label">Passive Perception: </label>
                  <div class="spacer"></div>
                  <label class="stat-value">{{ calculatePassivePerception() }}</label>
                </div>
              </li>
            </ul>
          </div>
        </collapse-transition>
      </div>

      <br>
      <div id="base-stats">
        <div class="h3-bar">
          <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.STATS)">Base Stats</h3>
          <font-awesome-icon icon="chevron-up" v-if="!isShowingBaseStats" class="collapse-chevron"/>
          <font-awesome-icon icon="chevron-down" v-if="isShowingBaseStats" class="collapse-chevron"/>
        </div>

        <collapse-transition dimension="height">
          <div v-if="isShowingBaseStats">
            <ul class="stat-list">
              <li v-for="(stat, key) in STAT_KEYS" :key="key">
                <div class="stat-group">
                  <label for="stats-label" class="stat-label">{{ STAT_NAMES[stat] }}:</label>
                  <div class="spacer"></div>
                  <div style="margin-left: 10px;">
                    <input type="number" id="stats-label" v-model="stats[stat].value" class="input-stats" inputmode="numeric" required>
                    <label class="stat-label" style="margin-left: 20px;">Mod: {{ getStatBonusSign(stats[stat].calculateMod()) }}</label>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </collapse-transition>
      </div>
        
      <br>
      <div id="saving-throws">
        <div class="h3-bar">
          <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.SAVING_THROWS)">Saving Throws</h3>
          <font-awesome-icon icon="chevron-up" v-if="!isShowingSavingThrows" class="collapse-chevron"/>
          <font-awesome-icon icon="chevron-down" v-if="isShowingSavingThrows" class="collapse-chevron"/>
        </div>

        <collapse-transition dimension="height">
          <div v-if="isShowingSavingThrows">
            <ul class="stat-list">
              <li v-for="(stat, key) in STAT_KEYS" :key="key">
                <div class="stat-group">
                  <input type="checkbox" class="checkbox" v-model="savingThrows[stat].proficient">
                  <label class="stat-label">{{ STAT_NAMES[stat] }}:</label>

                  <label class="stat-value" v-if="savingThrows[stat].proficient">
                    {{ getStatBonusSign(stats[stat].calculateMod() + getProficiencyBonus()) }}
                  </label>
                  <label class="stat-value" v-if="!savingThrows[stat][STAT_VALUES_KEYS.PROFICIENT]">
                    {{ getStatBonusSign(stats[stat].calculateMod()) }}
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </collapse-transition>

      </div>

      <br>
      <div id="skills">
        <div class="h3-bar">
          <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.SKILLS)">Skills</h3>
          <font-awesome-icon icon="chevron-up" v-if="!isShowingSkills" class="collapse-chevron"/>
          <font-awesome-icon icon="chevron-down" v-if="isShowingSkills" class="collapse-chevron"/>
        </div>

        <collapse-transition dimension="height">
          <div v-if="isShowingSkills">
            <ul class="stat-list">
              <li v-for="(skill, key) in SKILL_KEYS" :key="key">
                <div class="stat-group">
                  <input type="checkbox" class="checkbox" v-model="skills[skill].proficient">
                  <label class="stat-label">{{ SKILL_NAMES[skill] }}:</label>

                  <label class="stat-value" v-if="skills[skill].proficient">
                    {{ getStatBonusSign(stats[SKILL_MODS[skill]].calculateMod() + getProficiencyBonus()) }}
                  </label>
                  <label class="stat-value" v-if="!skills[skill].proficient">
                    {{ getStatBonusSign(stats[SKILL_MODS[skill]].calculateMod()) }}
                  </label>
                </div>
              </li>
            </ul>
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
            <!-- Add new -->
            <div>
              <input class="item-input" type="text" v-model="featuresTempName" placeholder="New feature/trait name"> 
              <div class="container-inputs">
                <ul class="list-inputs">
                  <li style="margin-top: 10px;">
                    <label class="stat-label">Type:</label>
                    <select class="picker" v-model="featuresTempType">
                      <option v-for="feat in FEATURES_TYPES" :key="feat" :value="feat">{{ feat }}</option>
                    </select>
                  </li>

                  <li style="margin-top: 10px;">
                    <label class="stat-label">Action Type:</label>
                    <select class="picker" v-model="featuresTempAction">
                      <option v-for="action in ACTION_TYPES" :key="action" :value="action">{{ action }}</option>
                    </select>
                  </li>

                  <li>
                    <label class="stat-label" for="features-input"> # of Uses:</label>
                    <input class="input-stats" style="width=70%;" type="number" inputmode="numeric" v-model="featuresTempUses"> 
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

            <template v-if="getDictionarySize(featuresTraits) > 0">
              <div>
                <ul class="list">
                  <li v-for="(item, key) in featuresTraits" :key="key">
                    <div v-if="!isEditingFeaturesTraits">
                      <label class="item-name">{{ key }}</label>
                      <label class="item-amount">x{{ item[FEATURES_KEYS.USES] }}</label>
                      <p class="item-description" style="margin-bottom: 5px;">Type: {{ item[FEATURES_KEYS.TYPE] }}</p>
                      <p class="item-description" style="margin-bottom: 5px;">Action Type: {{ item[FEATURES_KEYS.ACTION] }}</p>
                      <p class="item-description">{{ item[FEATURES_KEYS.DESCRIPTION] }}</p>
                    </div>

                    <!-- Edit and Delete -->
                    <div v-if="isEditingFeaturesTraits">
                      <label class="item-name">{{ key }}</label>
                      <div class="container-edit">
                        <div>
                          <label class="stat-label">Type:</label>
                          <select class="picker" v-model="item[FEATURES_KEYS.TYPE]">
                            <option v-for="feat in FEATURES_TYPES" :key="feat" :value="feat">{{ feat }}</option>
                          </select>
                        </div>

                        <div style="margin-top: 10px;">
                          <label class="stat-label">Action Type:</label>
                          <select class="picker" v-model="item[FEATURES_KEYS.ACTION]">
                            <option v-for="action in ACTION_TYPES" :key="action" :value="action">{{ action }}</option>
                          </select>
                        </div>

                        <div>
                          <label class="stat-label" for="features-input"> # of Uses:</label>
                          <input class="input-stats" style="width=70%;" type="number" inputmode="numeric" v-model="item[FEATURES_KEYS.USES]"> 
                        </div>
                        <br>
                        <textarea v-model="item[FEATURES_KEYS.DESCRIPTION]" rows="4" placeholder="Description"></textarea>
                        <div class="buttons-delete-update">
                          <button class="button-delete" @click="onPressDeleteFeatures(key)">Delete</button>
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
            <!-- Add new -->
            <div>
              <input class="item-input" style="width=70%;" type="text" v-model="weaponTempName" placeholder="New weapon/spell name"> 

              <div class="container-inputs">
                <ul class="list-inputs">
                  <li>
                    <label class="stat-label" for="equipment-input">Amount:</label>
                    <input class="input-stats" style="width=70%;" type="number" inputmode="numeric" v-model="weaponTempAmount"> 
                  </li>

                  <li style="margin-top: 10px;">
                    <label class="stat-label" style="margin-right: 10px;">{{ WEAPON_NAMES[WEAPON_KEYS.ATTACK_DAMAGE_STAT] }}:</label>
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

              <ul class="list">
                <hr class="list-divider">
              </ul>
            </div>

            <template v-if="getDictionarySize(weapons) > 0">
              <div>
                <ul class="list">
                  <li v-for="(item, key) in weapons" :key="key">
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
                            {{ getStatBonusSign(getStatModFromKey(item[WEAPON_KEYS.ATTACK_DAMAGE_STAT]) + proficiencyBonus) }} ({{ STAT_NAMES[item[WEAPON_KEYS.ATTACK_DAMAGE_STAT]] }})
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
                            <input class="input-stats" style="width=70%;" type="number" inputmode="numeric" v-model="item[WEAPON_KEYS.AMOUNT]"> 
                          </li>
                          
                          <li style="margin-top: 10px;">
                            <label class="stat-label" for="equipment-input">{{ WEAPON_NAMES[WEAPON_KEYS.ATTACK_DAMAGE_STAT] }}:</label>
                            <select class="picker" v-model="item[WEAPON_KEYS.ATTACK_DAMAGE_STAT]">
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
                        </ul>
                      </div>

                      <div class="buttons-delete-update">
                        <button class="button-delete" @click="onPressDeleteWeapon(key)">Delete</button>
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
            <ul class="list" style="text-align: center; margin-bottom: 20px">
              <label class="item-name">Gold:</label>
              <input type="number" id="spells-casting-duration" style="width: 120px;" v-model="gold" class="input-stats" inputmode="numeric" required>
            </ul>

            <!-- Add new -->
            <div>
              <input class="item-input" style="width=70%;" type="text" v-model="equipmentTempName" placeholder="New item name"> 
              <div>
                <label class="stat-label" for="equipment-input">Amount:</label>
                <input class="input-stats" style="width=70%;" type="number" inputmode="numeric" v-model="equipmentTempAmount"> 
              </div>
              <br>
              <textarea v-model="equipmentTempDescription" rows="4" placeholder="Description"></textarea>
              <br>
              <button class="button-add" @click="onPressAddEquipment">Add</button>

              <ul class="list">
                <hr class="list-divider">
              </ul>
            </div>

            <template v-if="getDictionarySize(equipment) > 0">
              <div>
                <ul class="list">                
                  <li v-for="(item, key) in equipment" :key="key">
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
                          <input class="input-stats" style="width=70%; margin-bottom: 10px;" type="number" inputmode="numeric" v-model="item[EQUIPMENT_KEYS.AMOUNT]"> 
                        </div>
                        <textarea v-model="item[EQUIPMENT_KEYS.DESCRIPTION]" rows="4" placeholder="Description"></textarea>
                      </div>

                      <div class="buttons-delete-update">
                        <button class="button-delete" @click="onPressDeleteEquipment(key)">Delete</button>
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
            <!-- Add new -->
            <div class="language-container">
              <input class="item-input" type="text" v-model="languagesTempName" placeholder="New language name"> 
              <div style="margin-top: 10px;">
                <label class="stat-label" style="margin-right: 10px;">Proficiency: </label>
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

            <template v-if="getDictionarySize(languages) > 0">
              <div>
                <ul>
                  <li v-for="(item, key) in languages" :key="key">
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
                        <select class="picker" v-model="languages[key]">
                          <option v-for="prof in LANGUAGE_PROFICIENCY" :key="prof" :value="prof">{{ prof }}</option>
                        </select>
                      </div>

                      <div class="buttons-delete-update">
                        <br>
                        <button class="button-delete" @click="onPressDeleteLanguage(key)">Delete</button>
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
            <!-- Add new -->
            <div class="proficiency-container">
              <input class="item-input" style="margin-bottom: 20px" v-model="proficiencyTempName" placeholder="New proficiency name"> 
              <br>
              <textarea v-model="proficiencyTempDescription" rows="4" placeholder="Description"></textarea>
              <br>
              <button class="button-add" @click="onPressAddProficiency">Add</button>

              <ul class="list">
                <hr class="list-divider">
              </ul>
            </div>

            <template v-if="getDictionarySize(proficiencies) > 0">
              <div>
                <ul class="list">
                  <li v-for="(item, key) in proficiencies" :key="key">
                    <div v-if="!isEditingProficiencies">
                      <label class="item-name">{{ key }}</label>
                      <p class="item-description">{{ item }}</p>
                    </div>

                    <!-- Edit and Delete -->
                    <div v-if="isEditingProficiencies">
                      <label class="item-name">{{ key }}:</label>
                      <div class="container-edit">
                        <textarea v-model="proficiencies[key]" rows="4" placeholder="Description"></textarea>
                      </div>

                      <div class="buttons-delete-update">
                        <button class="button-delete" @click="onPressDeleteProficiency(key)">Delete</button>
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

      <br>
      <div id="spell-slots">
        <div class="edit-buttons">
          <div>
            <button class="button-edit-spacer" v-if="!isEditingSpellSlots">Edit</button>
            <button class="button-edit-spacer" v-if="isEditingSpellSlots">Finish</button>
          </div>

          <div class="h3-bar">
            <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.SPELL_SLOTS)">Spell Slots</h3>
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
            <div>
              <div class="container-inputs">
                <ul class="list-inputs">
                  <li style="margin-top: 10px;">
                    <label class="stat-label">Level:</label>
                    <select class="picker" v-model="spellSlotTempLevel">
                      <option v-for="level in SPELL_CASTING_LEVELS" :key="level" :value="level">{{ SPELL_SLOT_NAMES_PICKER[level] }}</option>
                    </select>
                  </li>

                  <li>
                    <label class="stat-label" for="equipment-input"># of slots:</label>
                    <input class="input-stats" style="width=70%;" type="number" inputmode="numeric" v-model="spellSlotTempSlots"> 
                  </li>
                </ul>
              </div>

              <br>
              <button class="button-add" @click="onPressAddSpellSlot">Add</button>

              <ul class="list">
                <hr class="list-divider">
              </ul>
            </div>

            <template v-if="getDictionarySize(spellSlots) > 0">
              <div>
                <ul class="list">
                  <li v-for="(item, key) in spellSlots" :key="key">
                    <div v-if="!isEditingSpellSlots">
                      <label class="item-name">{{ SPELL_CASTING_NAMES[key] }}:</label>
                      <label class="item-amount">{{ item[SPELL_SLOT_KEYS.MAX] }} slots</label>
                    </div>

                    <!-- Edit and Delete -->
                    <div v-if="isEditingSpellSlots">
                      <label class="item-name">{{ SPELL_CASTING_NAMES[key] }}:</label>
                      
                      <div class="container-inputs">
                        <ul class="list-inputs">
                          <li style="margin-top: 10px;">
                            <label class="stat-label" for="equipment-input"># of slots:</label>
                            <input class="input-stats" style="width=70%;" type="number" inputmode="numeric" v-model="item[SPELL_SLOT_KEYS.MAX]"> 
                          </li>
                        </ul>
                      </div>

                      <div class="buttons-delete-update">
                        <button class="button-delete" @click="onPressDeleteSpellSlot(key)">Delete</button>
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
            <div class="container-inputs">
              <ul class="list-inputs">
                <li style="margin-top: 10px;">
                  <label for="spells-attack-bonus" class="stat-label" style="margin-right: 10px;">Casting Ability:</label>
                  <select class="picker" v-model="spellCastStat">
                    <option v-for="stat in STAT_KEYS" :key="stat" :value="stat">{{ STAT_NAMES[stat] }}</option>
                  </select>
                </li>

                <li style="margin-top: 5px;">
                  <label class="stat-label">Spell Saving DC: </label>
                  <label class="stat-label">{{ calculateSpellSavingDc(getProficiencyBonus(), getStatModFromKey(spellCastStat)) }}</label>
                </li>
              </ul>
            </div>

            <!-- Add new -->
            <div>
              <input class="item-input" style="margin-bottom: 10px;" type="text" v-model="spellTempName" placeholder="New spell name"> 
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

                  <li style="margin-top: 20px">
                    <label class="stat-label" style="margin: 0;">Duration:</label>
                    <input type="number" id="spells-casting-duration" style="width: 80px" v-model="spellTempDuration" class="input-stats" inputmode="numeric" required :class="{ 'disabled-button': spellTempDurationType == [SPELL_CASTING_DURATION_TYPES.INSTANT]}">

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

            <template v-if="getDictionarySize(spells) > 0">
              <div>
                <ul class="list">
                  <li v-for="(levelDict, level) in spells" :key="level">
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

                          <div v-if="isEditingSpellCasting">
                            <label class="item-name">{{ spellName }}</label>
                            <div class="container-inputs">
                              <ul class="list-inputs">
                                <li>
                                  <label for="spells-casting-time" class="stat-label">Casting Time (# of actions):</label>
                                  <input type="number" id="spells-casting-time" v-model="spell[SPELL_CASTING_KEYS.CASTING_TIME]" class="input-stats" inputmode="numeric" required>
                                </li>

                                <li style="margin-top: 20px">
                                  <label class="stat-label" style="margin: 0;">Duration:</label>
                                  <input type="number" id="spells-casting-duration" style="width: 80px" v-model="spell[SPELL_CASTING_KEYS.DURATION]" class="input-stats" inputmode="numeric" required :class="{ 'disabled-button': spellTempDurationType == [SPELL_CASTING_DURATION_TYPES.INSTANT]}">

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
                              <button class="button-delete" @click="onPressDeleteSpell(level, spellName)">Delete</button>
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
          </div>
        </collapse-transition>
      </div>
    </div>

    <br>
    <button id="create-character" class="button-create-character" @click="createCharacter" :class="{ 'disabled-button': !checkIfCreateCharacterButtonIsDisabled() }">Create Character</button>

  </div>
</template>

<script>
import { useStore } from 'vuex'
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue';
import Character from '@/models/character'
import SavingThrows from '@/models/saving-throws'
import Skill from '@/models/skill'
import Stat from '@/models/stat'
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
import { SKILL_KEYS, SKILL_NAMES, SKILL_MODS } from '@/enums/dbKeys/skill-keys.js'
import { STAT_KEYS, STAT_VALUES_KEYS, STAT_NAMES } from '@/enums/dbKeys/stat-keys.js'
import { SPELL_CASTING_KEYS, SPELL_CASTING_LEVELS, SPELL_CASTING_NAMES, SPELL_CASTING_NAMES_PICKER, SPELL_SLOT_NAMES_PICKER, SPELL_CASTING_DURATION_TYPES } from '@/enums/dbKeys/spell-casting-keys'
import { SPELL_SLOT_KEYS } from '@/enums/dbKeys/spell-slot-keys'
import { WEAPON_KEYS, WEAPON_CATEGORY, WEAPON_PROPERTY, WEAPON_NAMES } from '@/enums/dbKeys/weapons-keys' 

// TODO: Will be replaced by Firebase Remote Config
const MAX_VALUES = {
  LEVEL: 20,
  HP: 600,
  HIT_DIE: 10,
  STATS: 20,
  STATS_BONUS: 5,
  SAVING_THROWS: 5,
  SKILLS: 15,
}

const MIN_VALUES = {
  LEVEL: 1,
  HP: 10,
  HIT_DIE: 1,
}

export default {
  components: {
    CollapseTransition
  },
  data() {
    return {
      store: useStore(),
      isModalNewCharacterOpen: false,
      isModalViewCharacterOpen: false,
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
      isEditingSpellSlots: false,
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
      isShowingSpellSlots: true,
      isMenuOpen: false,
      isNavBarOpen: true, // show by default
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
      SPELL_SLOT_KEYS: SPELL_SLOT_KEYS,
      SPELL_SLOT_NAMES_PICKER: SPELL_SLOT_NAMES_PICKER,
      SPELL_CASTING_DURATION_TYPES: SPELL_CASTING_DURATION_TYPES,
      WEAPON_KEYS: WEAPON_KEYS,
      WEAPON_CATEGORY: WEAPON_CATEGORY,
      WEAPON_PROPERTY: WEAPON_PROPERTY,
      WEAPON_NAMES: WEAPON_NAMES,
      WEAPON_MODS: ['', STAT_KEYS.STRENGTH, STAT_KEYS.DEXTERITY, STAT_KEYS.CONSTITUTION, STAT_KEYS.INTELLIGENCE, STAT_KEYS.WISDOM, STAT_KEYS.CHARISMA],
      equipment: {},
      featuresTraits: {},
      languages: {},
      proficiencies: {},
      spells: {},
      spellSlots: {},
      weapons: {},
      deathSaves: {
        [DEATH_SAVES_KEYS.SUCCESSES]: 0, 
        [DEATH_SAVES_KEYS.FAILURES]: 0
      },
      hp: {
        [HP_KEYS.CURRENT]: '',
        [HP_KEYS.DIE]: '',
        [HP_KEYS.DIE_AMOUNT_MAX]: '',
        [HP_KEYS.DIE_AMOUNT_CURR]: '',
        [HP_KEYS.MAX]: '',
        [HP_KEYS.TEMP]: 0
      },
      stats: {
        [STAT_KEYS.STRENGTH]: new Stat(),
        [STAT_KEYS.DEXTERITY]: new Stat(),
        [STAT_KEYS.CONSTITUTION]: new Stat(),
        [STAT_KEYS.INTELLIGENCE]: new Stat(),
        [STAT_KEYS.WISDOM]: new Stat(),
        [STAT_KEYS.CHARISMA]: new Stat(),
      },
      savingThrows: {
        [STAT_KEYS.STRENGTH]: new SavingThrows(),
        [STAT_KEYS.DEXTERITY]: new SavingThrows(),
        [STAT_KEYS.CONSTITUTION]: new SavingThrows(),
        [STAT_KEYS.INTELLIGENCE]: new SavingThrows(),
        [STAT_KEYS.WISDOM]: new SavingThrows(),
        [STAT_KEYS.CHARISMA]: new SavingThrows(),
      },
      skills: {
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
      characterName: '',
      characterAlignment: '',
      characterBackground: '',
      characterClass: '',
      characterRace: '',
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
      featuresTempAction: '', // Action, Bonus, Reaction, None
      featuresTempUseable: true,
      featuresTempUses: '',
      gold: '', 
      languagesTempName: '',
      languagesTempProficiency: '',
      proficiencyTempName: '',
      proficiencyTempDescription: '',
      spellCastStat: '', // e.g. intelligence
      spellTempName: '',
      spellTempCastingTime: '',
      spellTempDescription: '',
      spellTempDuration: '',
      spellTempDurationType: '', // instant, seconds, minutes, hours
      spellTempRange: '', // in feet
      spellTempLevel: '',
      spellSlotTempLevel: '',
      spellSlotTempSlots: '',
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
    'hp.max': function(newValue) {
      this.hp[HP_KEYS.CURRENT] = newValue
    },
    'hp.dieAmountMax': function(newValue) {
      this.hp[HP_KEYS.DIE_AMOUNT_CURR] = newValue
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
        [FEATURES_KEYS.USES]: this.featuresTempUses
      }
      

      this.featuresTraits[this.featuresTempName] = newFeat

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

      // if (this.weaponTempProperties === '') {
      //   alert("Please enter a weapon properties")
      //   return
      // }

      const newItem = {
        [WEAPON_KEYS.AMOUNT]: this.weaponTempAmount,
        [WEAPON_KEYS.ATTACK_DAMAGE_STAT]: this.weaponsTempAttackModifier,
        [WEAPON_KEYS.CATEGORY]: this.weaponTempCategory,
        [WEAPON_KEYS.DESCRIPTION]: this.weaponTempDescription,
        [WEAPON_KEYS.DIE]: this.weaponTempDieType,
        [WEAPON_KEYS.PROFICIENT]: this.weaponTempIsProficient,
        // [WEAPON_KEYS.PROPERTIES]: this.weaponTempProperties,
      }      

      this.weapons[this.weaponTempName] = newItem
      
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

      // if (this.equipmentTempDescription === '') {
      //   alert("Please enter an equipment description")
      //   return
      // }

      const newItem = {
        [EQUIPMENT_KEYS.AMOUNT]: this.equipmentTempAmount,
        [EQUIPMENT_KEYS.DESCRIPTION]: this.equipmentTempDescription
      }

      this.equipment[this.equipmentTempName] = newItem
      
      this.equipmentTempName = ''
      this.equipmentTempAmount = ''
      this.equipmentTempDescription = ''
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

      this.languages[this.languagesTempName] = this.languagesTempProficiency
      
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

      this.proficiencies[this.proficiencyTempName] = this.proficiencyTempDescription
      
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

      // if (this.spellTempDescription === '') {
      //   alert("Please enter a Casting Description")
      //   return
      // }


      const newSpell = {
        [SPELL_CASTING_KEYS.CASTING_TIME]: this.spellTempCastingTime,
        [SPELL_CASTING_KEYS.DESCRIPTION]: this.spellTempDescription,
        [SPELL_CASTING_KEYS.DURATION]: this.spellTempDuration,
        [SPELL_CASTING_KEYS.DURATION_TYPE]: this.spellTempDurationType,
        [SPELL_CASTING_KEYS.RANGE]: this.spellTempRange
      }
      
      if (this.spellTempLevel in this.spells) {
        // If there's a level key already in the dictionary
        this.spells[this.spellTempLevel][this.spellTempName] = newSpell
        
      } else {
        // If there's a new entry for the level key
        const newEntry = {
          [this.spellTempName]: newSpell
        }

        this.spells[this.spellTempLevel] = newEntry
      }

      // console.info('this.spells:', this.spells)
      
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

      this.spellSlots[this.spellSlotTempLevel] = slot
      
      this.spellSlotTempLevel = ''
      this.spellSlotTempSlots = ''
    },
    onPressDeleteFeatures(key) {
      if (key in this.featuresTraits) {
        delete this.featuresTraits[key]
      }
    },
    onPressDeleteWeapon(key) {
      if (key in this.weapons) {
        delete this.weapons[key]
      }
    },
    onPressDeleteEquipment(key) {
      if (key in this.equipment) {
        delete this.equipment[key]
      }
    },
    onPressDeleteLanguage(key) {
      if (key in this.languages) {
        delete this.languages[key]
      }
    },
    onPressDeleteProficiency(key) {
      if (key in this.proficiencies) {
        delete this.proficiencies[key]
      }
    },
    onPressDeleteSpell(level, spellName) {
      if (level in this.spells) {
        const levelDict = this.spells[level]
        if (spellName in levelDict) {
          delete this.spells[level][spellName]

          // If there's nothing left in the level 
          if (this.getDictionarySize(levelDict) == 0) {
            delete this.spells[level]
          }
        }
      }
    },
    onPressDeleteSpellSlot(key) {
      if (key in this.spellSlots) {
        delete this.spellSlots[key]
      }
    },
    checkIfCreateCharacterButtonIsDisabled() {
      // console.info("@checkIfAllValid")
      if (this.characterName === '') {
        return false
      }

      if (this.characterAlignment === '') {
        return false
      }

      if (this.characterBackground === '') {
        return false
      }

      if (this.characterRace === '') {
        return false
      }

      if (this.level < MIN_VALUES.LEVEL || this.level > MAX_VALUES.LEVEL) { 
        return false
      }
      
      if (this.hp.max < MIN_VALUES.HP || this.hp.max.MAX_VALUES) {
        return false
      } 
      
      if (this.hp.dieAmount < MIN_VALUES.HIT_DIE || this.hp.dieAmount > MAX_VALUES.HIT_DIE) {
        return false
      }

      if (this.hp.die == '') {
        return false
      }
      
      if (!this.checkIfStatsValid()) {
        return false
      }

      if (!this.checkIfThrowsValid()) {
        return false
      }

      if (!this.checkIfSkillsValid()) {
        return false
      }

      if (this.spellCastStat === '') {
        return false
      }

      return true
    },
    checkIfAllValid() {
      // console.info("@checkIfAllValid")
      if (this.characterName === '') {
        alert("Please enter a character name")
        return false
      }

      if (this.characterAlignment === '') {
        alert("Please enter an alignment")
        return false
      }

      if (this.characterBackground === '') {
        alert("Please enter a background")
        return false
      }

      if (this.characterRace === '') {
        alert("Please enter a race")
        return false
      }

      if (this.level < MIN_VALUES.LEVEL || this.level > MAX_VALUES.LEVEL) { 
        alert(`Starting level must be between ${MIN_VALUES.LEVEL} - ${MAX_VALUES.LEVEL}`)
        return false
      }
      
      if (this.hp.max < MIN_VALUES.HP || this.hp.max.MAX_VALUES) {
        alert(`Starting HP must be between ${MIN_VALUES.HP} - ${MAX_VALUES.HP}`)
        return false
      } 
      
      if (this.hp.dieAmount < MIN_VALUES.HIT_DIE || this.hp.dieAmount > MAX_VALUES.HIT_DIE) {
        alert(`Starting Hit Die amount must be between ${MIN_VALUES.HIT_DIE} - ${MAX_VALUES.HIT_DIE}`)
        return false
      }

      if (this.hp.die == '') {
        alert(`Please pick a Hit Die type`)
        return false
      }
      
      if (!this.checkIfStatsValid()) {
        alert(`Stats cannot be blank or greater than ${MAX_VALUES.STATS} and Bonuses cannot be blank or greater than ${MAX_VALUES.STATS_BONUS}`)
        return false
      }

      if (!this.checkIfThrowsValid()) {
        alert(`Saving Throws cannot be blank or greater than ${MAX_VALUES.SAVING_THROWS}`)
        return false
      }

      if (!this.checkIfSkillsValid()) {
        alert(`Skills cannot be blank or greater than ${MAX_VALUES.SKILLS}`)
        return false
      }

      if (this.spellCastStat === '') {
        alert("Please select a stat your spell casting will be based off of")
        return false
      }

      return true
    },
    checkIfStatsValid() {
      // console.info("@checkIfStatsValid")
      
      if (this.stats.statsStr === '' || this.stats.statsDex === '' || this.stats.statsCon === '' || this.stats.statsInt === '' || this.stats.statsWis === '' || this.stats.statsCha === '' ||
          this.stats.statsStrBonus === '' || this.stats.statsDexBonus === '' || this.stats.statsConBonus === '' || this.stats.statsIntBonus === '' || this.stats.statsWisBonus === '' || this.stats.statsChaBonus === '') {
            return false
      }

      if (this.stats.statsStr > MAX_VALUES.STATS && this.stats.statsDex > MAX_VALUES.STATS && this.stats.statsCon > MAX_VALUES.STATS && this.stats.statsInt > MAX_VALUES.STATS && this.stats.statsWis > MAX_VALUES.STATS && this.stats.statsCha > MAX_VALUES.STATS &&
          this.stats.statsStrBonus > MAX_VALUES.STATS_BONUS && this.stats.statsDexBonus > MAX_VALUES.STATS_BONUS && this.stats.statsConBonus > MAX_VALUES.STATS_BONUS && this.stats.statsIntBonus > MAX_VALUES.STATS_BONUS && this.stats.statsWisBonus > MAX_VALUES.STATS_BONUS && this.stats.statsChaBonus > MAX_VALUES.STATS_BONUS) {
        return false

      }
      
      return true

    },
    checkIfThrowsValid() {
      // console.info("@checkIfThrowsValid")
      if (this.savingThrows.savingStr === '' || this.savingThrows.savingDex === '' || this.savingThrows.savingCon === '' || this.savingThrows.savingInt === '' || this.savingThrows.savingWis === '' || this.savingThrows.savingCha === '') {
        return false
      }
      
      if (this.savingThrows.savingStr > MAX_VALUES.SAVING_THROWS && this.savingThrows.savingDex > MAX_VALUES.SAVING_THROWS && this.savingThrows.savingCon > MAX_VALUES.SAVING_THROWS && this.savingThrows.savingInt > MAX_VALUES.SAVING_THROWS && this.savingThrows.savingWis > MAX_VALUES.SAVING_THROWS && this.savingThrows.savingCha > MAX_VALUES.SAVING_THROWS) {
        return false
      }

      return true
    },
    checkIfSkillsValid() {
      if (this.skills.skillsAcrobatics === '' || this.skills.skillsAnimalHandling === '' || this.skills.skillsArcana === '' || this.skills.skillsAthletics === '' || 
          this.skills.skillsDeception === '' || this.skills.skillsHistory === '' || this.skills.skillsInsight === '' || this.skills.skillsIntimidation === '' || 
          this.skills.skillsInvestigation === '' || this.skills.skillsMedicine === '' || this.skills.skillsNature === '' || this.skills.skillsPerception === '' || 
          this.skills.skillsPerformance === '' || this.skills.skillsPersuasion === '' || this.skills.skillsReligion === '' || this.skills.skillsSleightOfHand === '' || 
          this.skills.skillsStealth === '' || this.skills.skillsSurvival === '') {
        return false
      }

      if (this.skills.skillsAcrobatics > MAX_VALUES.SKILLS || this.skills.skillsAnimalHandling > MAX_VALUES.SKILLS || this.skills.skillsArcana > MAX_VALUES.SKILLS || this.skills.skillsAthletics > MAX_VALUES.SKILLS || 
          this.skills.skillsDeception > MAX_VALUES.SKILLS || this.skills.skillsHistory > MAX_VALUES.SKILLS || this.skills.skillsInsight > MAX_VALUES.SKILLS || this.skills.skillsIntimidation > MAX_VALUES.SKILLS || 
          this.skills.skillsInvestigation > MAX_VALUES.SKILLS || this.skills.skillsMedicine > MAX_VALUES.SKILLS || this.skills.skillsNature > MAX_VALUES.SKILLS || this.skills.skillsPerception > MAX_VALUES.SKILLS || 
          this.skills.skillsPerformance > MAX_VALUES.SKILLS || this.skills.skillsPersuasion > MAX_VALUES.SKILLS || this.skills.skillsReligion > MAX_VALUES.SKILLS || this.skills.skillsSleightOfHand > MAX_VALUES.SKILLS || 
          this.skills.skillsStealth > MAX_VALUES.SKILLS || this.skills.skillsSurvival > MAX_VALUES.SKILLS) {
        return false
      }

      return true
    },
    createCharacter() {
      // console.info("@createCharacter")
      if (this.checkIfAllValid()) {
        const newCharacter = this.createCharacterDictionary()
        console.info('character:', newCharacter)
        this.store.dispatch("addCharacterToDb", newCharacter).then((success => {
          if (success) {
            alert(`Created new character, ${this.characterName}!`)
            this.$emit('close'); // Tell parent to close this modal
          } else {
            alert("An error occurred creating your character. Please try again")
          }
        }))
      }
    },
    createCharacterDictionary() {
      var newCharacter = new Character(
        this.characterAlignment,
        this.characterArmor,
        this.characterBackground,
        this.characterClass,
        this.deathSaves,
        this.equipment,
        this.featuresTraits,
        this.gold,
        this.hp,
        this.languages,
        this.level,
        this.characterName,
        this.proficiencies,
        this.characterRace,
        this.savingThrows,
        this.skills,
        this.characterSpeed,
        this.spellCastStat,
        this.spells,
        this.spellSlots,
        this.stats,
        this.weapons,
        new Date().getTime()
      )

      return newCharacter
    },
    calculatePassivePerception() {
      const result = 10 + this.stats[STAT_KEYS.WISDOM].calculateMod()
      return result
    },
    calculateBaseStatBonus(stat) {
      return (stat - 10) / 2
    },
    calculateSpellSavingDc(profBonus, mod) {
      if (profBonus === '') {
        return 8 + mod
      }
      const result = 8 + profBonus + mod
      return result
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
        return this.stats[stat].calculateMod()
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
      if (this.level <= 4) {
        return 2
      } else if (this.level <= 8) {
        return 3
      } else if (this.level <= 12) {
        return 4
      } else if (this.level <= 16) {
        return 5
      } else {
        return 6
      }
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

        case CHARACTER_KEYS.SPELL_SLOTS:
          this.isShowingSpellSlots = !this.isShowingSpellSlots
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

        case CHARACTER_KEYS.SPELL_SLOTS:
          this.isEditingSpellSlots = !this.isEditingSpellSlots
          break
        
        default:
          this.isEditingCharInfo = !this.isEditingCharInfo
      }
    },
  }
}
</script>

<style scoped> /* TODO: Need to make this scoped and have separate css files for styles */
@import '../syles/character-info-stats.css';
</style>