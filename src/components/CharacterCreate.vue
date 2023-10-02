<template>
  <div id="body">
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

                  <li @click="scrollToSection('save-delete-buttons')">
                    <p>Backup Character</p>
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
                <input class="name" type="text" v-model="characterName" placeholder="Name" required>
              </li>
              
              <li>
                <input class="name" type="text" v-model="characterBackground" placeholder="Background" required>
              </li>
              
              <li>
                <input class="name" type="text" v-model="characterRace" placeholder="Race" required>
              </li>
              
              <li>
                <label for="character-alignment" style="margin-right: 10px;">Alignment:</label>
                <select class="picker" v-model="characterAlignment">
                  <option v-for="alignment in ALIGNMENT_TYPES" :key="alignment">{{ alignment }}</option>
                </select>
              </li>
              
              <li>
                <label for="character-class">Class:</label>
                <select class="picker" v-model="characterClass">
                  <option v-for="name in CLASS_NAMES" :key="name" :value="name">{{ name }}</option>
                </select>
              </li>
            </ul>
          </section>
          <hr>

          <!-- <br>
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
                    <label for="stats-level">Level:</label>
                    <input type="number" v-model="newCharacter.level" inputmode="numeric" required>
                  </li>

                  <li>
                    <label for="stats-armor-class">Armor Class: </label>
                    <input type="number" id="stats-armor-class" v-model="newCharacter.armor" inputmode="numeric" required>
                  </li>

                  <li>
                    <label for="stats-initiative">Initiative: </label>
                    <label>{{ getStatBonusSign(newCharacter.scores[STAT_KEYS.DEXTERITY].calculateMod()) }}</label>
                  </li>
                  
                  <li>
                    <label for="stats-speed">Speed (ft): </label>
                    <input type="number" id="stats-speed" v-model="newCharacter.speed" inputmode="numeric" required>
                  </li>

                  <li>
                    <label for="stats-hp">Hit Points - Current:</label>
                    <input type="number" id="stats-hp" v-model="newCharacter.hp[HP_KEYS.CURRENT]" inputmode="numeric" required>
                  </li>

                  <li>
                    <label for="stats-hp">Hit Points - Max:</label>
                    <input type="number" id="stats-hp" v-model="newCharacter.hp[HP_KEYS.MAX]" inputmode="numeric" required>
                  </li>

                  <li>
                    <label for="stats-hp">Hit Points - Temp:</label>
                    <input type="number" id="stats-hp" v-model="newCharacter.hp[HP_KEYS.TEMP]" inputmode="numeric" required>
                  </li>

                  <li>
                    <label>Hit Die Type: </label>
                    <select v-model="newCharacter.hp[HP_KEYS.DIE]">
                      <option v-for="die in DIE_TYPE" :key="die" :value="die">{{ die }}</option>
                    </select>
                  </li>

                  <li>
                    <label for="stats-hit-die">Current # of Hit Die: </label>
                    <input type="number" id="stats-hit-die" v-model="newCharacter.hp[HP_KEYS.DIE_AMOUNT_CURR]" inputmode="numeric" required>
                  </li>

                  <li>
                    <label for="stats-hit-die">Max # of Hit Die: </label>
                    <input type="number" id="stats-hit-die" v-model="newCharacter.hp[HP_KEYS.DIE_AMOUNT_MAX]" inputmode="numeric" required>
                  </li>

                  <li>
                    <label>Death save successes:</label>
                    <div>
                      <select v-model="newCharacter.deathSaves.successes">
                        <option v-for="count in DEATH_SAVES_COUNTS" :key="count" :value="count">{{ count }}</option>
                      </select>
                      <label> / 3</label>
                    </div>
                  </li>

                  <li>
                    <label>Death save failures:</label>
                    <div>
                      <select v-model="newCharacter.deathSaves.failures">
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
                    <select v-model="newCharacter.spellCastStat">
                      <option v-for="stat in STAT_KEYS" :key="stat" :value="stat">{{ STAT_NAMES[stat] }}</option>
                    </select>
                  </li>
                
                  <li>
                    <label>Spell Saving DC: </label>
                    <label>{{ calculateSpellSavingDc(newCharacter.scores[newCharacter.spellCastStat].calculateMod()) }}</label>
                  </li>

                  <li>
                    <label for="stats-proficiency-bonus">Inspriation: </label>
                    <input type="number" id="stats-inspiration" v-model="newCharacter.inspiration" inputmode="numeric" required>
                  </li>
                </ul>
              </div>
            </collapse-transition>
          </section>
          <hr> -->
        </main>
      </div>
    </transition>

    <div class="character-to-view">
      <br>
      <section id="character-info">
        <div class="h3-bar">
          <h3 @click="toggleCollapseForStat(characterinfo)">{{ CHARACTER_SECTIONS.CHARACTER_INFO }}</h3>
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
                  <label class="stat-label">{{ getStatBonusSign(scores[STAT_KEYS.DEXTERITY].calculateMod()) }}</label>
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
      </section>

      <br>
      <section id="ability-scores">
        <div class="h3-bar">
          <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.SCORES)">{{ CHARACTER_SECTIONS.ABILITY_SCORES }}</h3>
          <font-awesome-icon icon="chevron-up" v-if="!isShowingAbilityScores" class="collapse-chevron"/>
          <font-awesome-icon icon="chevron-down" v-if="isShowingAbilityScores" class="collapse-chevron"/>
        </div>

        <collapse-transition dimension="height">
          <div v-if="isShowingAbilityScores">
            <ul class="stat-list">
              <li v-for="(stat, key) in STAT_KEYS" :key="key">
                <div class="stat-group">
                  <label for="stats-label" class="stat-label">{{ STAT_NAMES[stat] }}:</label>
                  <div class="spacer"></div>
                  <div style="margin-left: 10px;">
                    <input type="number" id="stats-label" v-model="scores[stat].value" class="input-stats" inputmode="numeric" required>
                    <label class="stat-label" style="margin-left: 20px;">Mod: {{ getStatBonusSign(scores[stat].calculateMod()) }}</label>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </collapse-transition>
      </section>
        
      <br>
      <section id="saving-throws">
        <div class="h3-bar">
          <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.SAVING_THROWS)">{{ CHARACTER_SECTIONS.SAVING_THROWS }}</h3>
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
                    {{ getStatBonusSign(scores[stat].calculateMod() + getProficiencyBonus()) }}
                  </label>
                  <label class="stat-value" v-if="!savingThrows[stat][STAT_VALUES_KEYS.PROFICIENT]">
                    {{ getStatBonusSign(scores[stat].calculateMod()) }}
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </collapse-transition>

      </section>

      <br>
      <section id="skills">
        <div class="h3-bar">
          <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.SKILLS)">{{ CHARACTER_SECTIONS.SKILLS }}</h3>
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
                    {{ getStatBonusSign(scores[SKILL_MODS[skill]].calculateMod() + getProficiencyBonus()) }}
                  </label>
                  <label class="stat-value" v-if="!skills[skill].proficient">
                    {{ getStatBonusSign(scores[SKILL_MODS[skill]].calculateMod()) }}
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </collapse-transition>
        
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
        
      </section>   
        
      <br>
      <section id="proficiences">
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
      </section>
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
  SCORES: 20,
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
      scores: {
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
      newCharacter: new Character(),
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
        alert(`Scores cannot be blank or greater than ${MAX_VALUES.SCORES} and Bonuses cannot be blank or greater than ${MAX_VALUES.STATS_BONUS}`)
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
      
      if (this.scores.statsStr === '' || this.scores.statsDex === '' || this.scores.statsCon === '' || this.scores.statsInt === '' || this.scores.statsWis === '' || this.scores.statsCha === '' ||
          this.scores.statsStrBonus === '' || this.scores.statsDexBonus === '' || this.scores.statsConBonus === '' || this.scores.statsIntBonus === '' || this.scores.statsWisBonus === '' || this.scores.statsChaBonus === '') {
            return false
      }

      if (this.scores.statsStr > MAX_VALUES.SCORES && this.scores.statsDex > MAX_VALUES.SCORES && this.scores.statsCon > MAX_VALUES.SCORES && this.scores.statsInt > MAX_VALUES.SCORES && this.scores.statsWis > MAX_VALUES.SCORES && this.scores.statsCha > MAX_VALUES.SCORES &&
          this.scores.statsStrBonus > MAX_VALUES.STATS_BONUS && this.scores.statsDexBonus > MAX_VALUES.STATS_BONUS && this.scores.statsConBonus > MAX_VALUES.STATS_BONUS && this.scores.statsIntBonus > MAX_VALUES.STATS_BONUS && this.scores.statsWisBonus > MAX_VALUES.STATS_BONUS && this.scores.statsChaBonus > MAX_VALUES.STATS_BONUS) {
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
        this.scores,
        this.weapons,
        new Date().getTime()
      )

      return newCharacter
    },
    calculatePassivePerception() {
      const result = 10 + this.scores[STAT_KEYS.WISDOM].calculateMod()
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
        return this.scores[stat].calculateMod()
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

  .new-character .name {
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