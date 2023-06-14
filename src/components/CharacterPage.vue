<template>
  <div class="body">
    <div id="character-info">
      <button class="button-close" @click="closeModal('')">Close</button>
      <p class="character-name">{{ characterToView[CHARACTER_KEYS.NAME] }}</p>

      <!-- Not editable -->
      <div id="character-background">
        <ul class="stat-list">
        <li>
          <label class="item-label">{{ characterToView[CHARACTER_KEYS.CLASS] }}</label>
        </li>

        <li>
          <label class="item-label">{{ characterToView[CHARACTER_KEYS.BACKGROUND] }}</label>
        </li>

        <li>
          <label class="item-label">{{ characterToView[CHARACTER_KEYS.RACE] }}</label>
        </li>

        <li>
          <label class="item-label">{{ characterToView[CHARACTER_KEYS.ALIGNMENT] }}</label>
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
                <label class="stat-value">{{ getStatBonus(characterToView[CHARACTER_KEYS.INITIATIVE]) }}</label>
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
                <label class="stat-label">Proficiency Bonus: </label>
                <label class="stat-value">{{ getStatBonus(characterToView[CHARACTER_KEYS.PROFICIENCY_BONUS]) }}</label>
              </div>
            </li>
            
            <li>
              <div class="stat-group">
                <label class="stat-label">Passive Perception: </label>
                <label class="stat-value">{{ characterToView[CHARACTER_KEYS.PASSIVE_PERCEPTION] }}</label>
              </div>
            </li>
          </ul>
        </div>

        <div v-if="isEditingCharInfo">
          <div class="container-inputs">
            <ul class="list-inputs">
              <li>
                <label for="stats-level" class="label-stats"> Current Level:</label>
                <input type="number" id="stats-level" v-model="characterToView[CHARACTER_KEYS.LEVEL]" class="input-stats" inputmode="numeric" required>
              </li>

              <li>
                <label for="stats-armor-class">Armor Class: </label>
                <input type="number" id="stats-armor-class" v-model="characterToView[CHARACTER_KEYS.ARMOR]" class="input-stats" inputmode="numeric" required>
              </li>

              <li>
                <label for="stats-initiative">Initiative: </label>
                <input type="number" id="stats-hit-die" v-model="characterToView[CHARACTER_KEYS.INITIATIVE]" class="input-stats" inputmode="numeric" required>
              </li>
              
              <li>
                <label for="stats-speed">Speed: </label>
                <input type="number" id="stats-speed" v-model="characterToView[CHARACTER_KEYS.SPEED]" class="input-stats" inputmode="numeric" required>
              </li>

              <li>
                <label for="stats-hp" class="label-stats">Hit Points - Current:</label>
                <input type="number" id="stats-hp" v-model="characterToView[CHARACTER_KEYS.HP][HP_KEYS.CURRENT]" class="input-stats" inputmode="numeric" required>
              </li>

              <li>
                <label for="stats-hp" class="label-stats">Hit Points - Max:</label>
                <input type="number" id="stats-hp" v-model="characterToView[CHARACTER_KEYS.HP][HP_KEYS.MAX]" class="input-stats" inputmode="numeric" required>
              </li>

              <li style="margin-top: 10px;">
                <label>Hit Die Type: </label>
                <select class="picker" v-model="characterToView[CHARACTER_KEYS.HP][HP_KEYS.DIE]">
                  <option v-for="die in DIE_TYPE" :key="die" :value="die">{{ die }}</option>
                </select>
              </li>

              <li>
                <label for="stats-hit-die"># of Hit Die: </label>
                <input type="number" id="stats-hit-die" v-model="characterToView[CHARACTER_KEYS.HP][HP_KEYS.DIE_AMOUNT_CURR]" class="input-stats" inputmode="numeric" required>
              </li>

              <li>
                <label for="stats-proficiency-bonus">Proficiency Bonus: </label>
                <input type="number" id="stats-proficiency-bonus" v-model="characterToView[CHARACTER_KEYS.PROFICIENCY_BONUS]" class="input-stats" inputmode="numeric" required>
              </li>

              <li>
                <label for="stats-proficiency-bonus">Passive Perception: </label>
                <input type="number" id="stats-proficiency-bonus" v-model="characterToView[CHARACTER_KEYS.PASSIVE_PERCEPTION]" class="input-stats" inputmode="numeric" required>
              </li>
            </ul>
          </div>

          <div class="buttons-delete-save">
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
            <li>
              <div class="stat-group">
                <label class="stat-label">Strength: </label>
                <label class="stat-value">{{ characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.STRENGTH] }}</label>
                <label class="stat-bonus">{{ getStatBonus(characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.STRENGTH_BONUS]) }}</label>
              </div>
            </li>
            
            <li>
              <div class="stat-group">
                <label class="stat-label">Dexterity: </label>
                <label class="stat-value">{{ characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.DEXTERITY] }}</label>
                <label class="stat-bonus">{{ getStatBonus(characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.DEXTERITY_BONUS]) }}</label>
              </div>
            </li>
              
            <li>
              <div class="stat-group">
                <label class="stat-label">Consitution: </label>
                <label class="stat-value">{{ characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.CONSTITUTION] }}</label>
                <label class="stat-bonus">{{ getStatBonus(characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.CONSTITUTION_BONUS]) }}</label>
              </div>
            </li>

            <li>
              <div class="stat-group">
                <label class="stat-label">Intelligence: </label>
                <label class="stat-value">{{ characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.INTELLIGENCE] }}</label>
                <label class="stat-bonus">{{ getStatBonus(characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.INTELLIGENCE_BONUS]) }}</label>
              </div>
            </li>

            <li>
              <div class="stat-group">
                <label class="stat-label">Wisdom: </label>
                <label class="stat-value">{{ characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.WISDOM] }}</label>
                <label class="stat-bonus">{{ getStatBonus(characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.WISDOM_BONUS]) }}</label>
              </div>
            </li>

            <li>
              <div class="stat-group">
                <label class="stat-label">Charisma: </label>
                <label class="stat-value">{{ characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.CHARISMA] }}</label>
                <label class="stat-bonus">{{ getStatBonus(characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.CHARISMA_BONUS]) }}</label>
              </div>
            </li>
          </ul>
        </div>

        <div v-if="isEditingBaseStats">
          <div class="container-inputs">
            <ul class="list-inputs">
              <li>
                <label for="stats-str" class="label-stats">Strength:</label>
                <input type="number" id="stats-str" v-model="characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.STRENGTH]" class="input-stats" inputmode="numeric" required>
              </li>
              
              <li>
                <label for="stats-dex" class="label-stats">Dexterity: </label>
                <input type="number" id="stats-dex" v-model="characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.DEXTERITY]" class="input-stats" inputmode="numeric" required>
              </li>
                
              <li>
                <label for="stats-con" class="label-stats">Consitution: </label>
                <input type="number" id="stats-con" v-model="characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.CONSTITUTION]" class="input-stats" inputmode="numeric" required>
              </li>

              <li>
                <label for="stats-int" class="label-stats">Intelligence: </label>
                <input type="number" id="stats-int" v-model="characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.INTELLIGENCE]" class="input-stats" inputmode="numeric" required>
              </li>

              <li>
                <label for="stats-wis" class="label-stats">Wisdom: </label>
                <input type="number" id="stats-wis" v-model="characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.WISDOM]" class="input-stats" inputmode="numeric" required>
              </li>

              <li>
                <label for="stats-cha" class="label-stats">Charisma: </label>
                <input type="number" id="stats-cha" v-model="characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.CHARISMA]" class="input-stats" inputmode="numeric" required>
              </li>
            </ul>

            <!-- Bonus modifier -->
            <ul class="list-inputs">
              <li>
                  <label for="stats-str-bonus" style="margin-left: 10px;">Bonus: </label>
                  <input type="number" id="stats-str-bonus" v-model="characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.STRENGTH_BONUS]" class="input-stats" inputmode="numeric" required>
              </li>
              
              <li>
                <label for="stats-dex-bonus" style="margin-left: 10px;">Bonus: </label>
                <input type="number" id="stats-dex-bonus" v-model="characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.DEXTERITY_BONUS]" class="input-stats" inputmode="numeric" required>
              </li>
                
              <li>
                <label for="stats-con-bonus" style="margin-left: 10px;">Bonus: </label>
                <input type="number" id="stats-con-bonus" v-model="characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.CONSTITUTION_BONUS]" class="input-stats" inputmode="numeric" required>
              </li>

              <li>
                <label for="stats-int-bonus" style="margin-left: 10px;">Bonus: </label>
                <input type="number" id="stats-int-bonus" v-model="characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.INTELLIGENCE_BONUS]" class="input-stats" inputmode="numeric" required>
              </li>

              <li>
                <label for="stats-wis-bonus" style="margin-left: 10px;">Bonus: </label>
                <input type="number" id="stats-wis-bonus" v-model="characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.WISDOM_BONUS]" class="input-stats" inputmode="numeric" required>
              </li>

              <li>
                <label for="stats-cha-bonus" style="margin-left: 10px;">Bonus: </label>
                <input type="number" id="stats-cha-bonus" v-model="characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.CHARISMA_BONUS]" class="input-stats" inputmode="numeric" required>
              </li>
            </ul>
          </div>

          <div class="buttons-delete-save">
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
          <li>
            <div class="stat-group">
              <label class="stat-label">Strength: </label>
              <label class="stat-value">{{ getStatBonus(characterToView[CHARACTER_KEYS.SAVING_THROWS][BASE_STAT_KEYS.STRENGTH]) }}</label>
            </div>
          </li>
          
          <li>
            <div class="stat-group">
              <label class="stat-label">Dexterity: </label>
              <label class="stat-value">{{ getStatBonus(characterToView[CHARACTER_KEYS.SAVING_THROWS][BASE_STAT_KEYS.DEXTERITY]) }}</label>
            </div>
          </li>
            
          <li>
            <div class="stat-group">
              <label class="stat-label">Consitution: </label>
              <label class="stat-value">{{ getStatBonus(characterToView[CHARACTER_KEYS.SAVING_THROWS][BASE_STAT_KEYS.CONSTITUTION]) }}</label>
            </div>
          </li>

          <li>
            <div class="stat-group">
              <label class="stat-label">Intelligence: </label>
              <label class="stat-value">{{ getStatBonus(characterToView[CHARACTER_KEYS.SAVING_THROWS][BASE_STAT_KEYS.INTELLIGENCE]) }}</label>
            </div>
          </li>

          <li>
            <div class="stat-group">
              <label class="stat-label">Wisdom: </label>
              <label class="stat-value">{{ getStatBonus(characterToView[CHARACTER_KEYS.SAVING_THROWS][BASE_STAT_KEYS.WISDOM]) }}</label>
            </div>
          </li>

          <li>
            <div class="stat-group">
              <label class="stat-label">Charisma: </label>
              <label class="stat-value">{{ getStatBonus(characterToView[CHARACTER_KEYS.SAVING_THROWS][BASE_STAT_KEYS.CHARISMA]) }}</label>
            </div>
          </li>
        </ul>
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
              <label class="stat-label">{{ SKILL_NAMES[skill] }}:</label>
              <label class="stat-value">{{ getStatBonus(characterToView[CHARACTER_KEYS.SKILLS][skill]) }}</label>
            </div>
          </li>
        </ul>
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
                      <label>Type:</label>
                      <select class="picker" v-model="characterToView[CHARACTER_KEYS.FEATURES][key][FEATURES_KEYS.TYPE]">
                        <option v-for="feat in FEATURES_TYPES" :key="feat" :value="feat">{{ feat }}</option>
                      </select>
                    </div>
                    <div>
                      <label style="margin-right: 10px;" for="features-input"> # of Uses:</label>
                      <input class="input-stats" style="width=70%;" type="number" v-model="characterToView[CHARACTER_KEYS.FEATURES][key][FEATURES_KEYS.USES]"> 
                    </div>
                    <br>
                    <textarea v-model="characterToView[CHARACTER_KEYS.FEATURES][key][FEATURES_KEYS.DESCRIPTION]" rows="4" placeholder="Description"></textarea>
                    <div class="buttons-delete-save">
                      <button style="margin-right: 10px;" @click="onPressDeleteStat(key, CHARACTER_KEYS.FEATURES)">Delete</button>
                      <button style="margin-left: 10px;" @click="onPressUpdateStat(key, characterToView[CHARACTER_KEYS.FEATURES][key], CHARACTER_KEYS.FEATURES)">Update</button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </template>

        <!-- Add new -->
        <template v-if="isEditingFeaturesTraits">
          <div>
            <input class="item-input" type="text" v-model="featuresTempName" placeholder="Feature/Trait name"> 
            <div>
              <br>
              <label>Type:</label>
              <select class="picker" v-model="featuresTempType">
                <option v-for="feat in FEATURES_TYPES" :key="feat" :value="feat">{{ feat }}</option>
              </select>
            </div>
            <div>
              <label style="margin-right: 10px;" for="features-input"> # of Uses:</label>
              <input class="input-stats" style="width=70%;" type="number" v-model="featuresTempUses"> 
            </div>
            <br>
            <textarea v-model="featuresTempDescription" rows="4" placeholder="Description"></textarea>
            <br>
            <button @click="onPressAddFeatures" style="margin-top: 10px;">Add</button>
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

                  <div class="buttons-delete-save">
                    <button style="margin-right: 10px;" @click="onPressDeleteStat(key, CHARACTER_KEYS.EQUIPMENT)">Delete</button>
                    <button style="margin-left: 10px;" @click="onPressUpdateStat(key, characterToView[CHARACTER_KEYS.EQUIPMENT][key], CHARACTER_KEYS.EQUIPMENT)">Update</button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </template>

        <!-- Add new -->
        <template v-if="isEditingEquipment">
          <div>
            <input class="item-input" style="width=70%;" type="text" v-model="equipmentTempName" placeholder="Item name"> 
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
                  <div style="display: flex; flex-direction: row; margin-bottom: -10px;">
                    <p class="item-name">{{ key }}:</p>
                    <p class="item-description">{{ item }}</p>
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

                  <div class="buttons-delete-save">
                    <br>
                    <button style="margin-right: 20px;" @click="onPressDeleteStat(key, CHARACTER_KEYS.LANGUAGES)">Delete</button>
                    <button @click="onPressUpdateStat(key, characterToView[CHARACTER_KEYS.LANGUAGES][key], CHARACTER_KEYS.LANGUAGES)">Update</button>
                  </div>
                </div>
                
              </li>
            </ul>
          </div>
        </template>

        <!-- Add new -->
        <template v-if="isEditingLanguages">
          <div class="language-container">
            <input class="item-input" type="text" v-model="languagesTempName" placeholder="Language name"> 
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

                  <div class="buttons-delete-save">
                    <button style="margin-right: 10px;" @click="onPressDeleteStat(key, CHARACTER_KEYS.PROFICIENCIES)">Delete</button>
                    <button style="margin-left: 10px;" @click="onPressUpdateStat(key, characterToView[CHARACTER_KEYS.PROFICIENCIES][key], CHARACTER_KEYS.PROFICIENCIES)">Update</button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </template>

        <!-- Add new -->
        <template v-if="isEditingProficiencies">
          <div class="proficiency-container">
            <input class="item-input" v-model="proficiencyTempName" placeholder="Proficiency name"> 
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
                        <label class="item-description">Casting Time: {{ spell[[SPELLCASTING_KEYS.CASTING_TIME]] }}</label>
                        <label class="item-description">Duration: {{ spell[[SPELLCASTING_KEYS.DURATION]] }} seconds</label>
                        <label class="item-description">Range: {{ spell[[SPELLCASTING_KEYS.RANGE]] }} ft</label>
                        <label class="item-description">{{ spell[[SPELLCASTING_KEYS.DESCRIPTION]] }}</label>
                      </div>

                      <!-- Edit and Delete -->
                      <div v-if="isEditingSpellCasting">
                        <label class="item-name">{{ spellName }}</label>
                        <br>
                        <div>
                          <label for="spells-casting-time" class="label-stats">Casting Time (# of actions):</label>
                          <input type="number" id="spells-casting-time" v-model="characterToView[CHARACTER_KEYS.SPELLS][level][spellName][SPELLCASTING_KEYS.CASTING_TIME]" class="input-stats" inputmode="numeric" required>
                        </div>
                        <div>
                          <label for="spells-casting-duration" class="label-stats">Duration (in seconds):</label>
                          <input type="number" id="spells-casting-duration" style="width: 100px;" v-model="characterToView[CHARACTER_KEYS.SPELLS][level][spellName][SPELLCASTING_KEYS.DURATION]" class="input-stats" inputmode="numeric" required>
                        </div>
                        
                        <div>
                          <label for="spells-range" class="label-stats">Range (in feet):</label>
                          <input type="number" id="spells-range" v-model="characterToView[CHARACTER_KEYS.SPELLS][level][spellName][SPELLCASTING_KEYS.RANGE]" class="input-stats" inputmode="numeric" required>
                        </div>
                        <br>
                        <textarea v-model="characterToView[CHARACTER_KEYS.SPELLS][level][spellName][SPELLCASTING_KEYS.DESCRIPTION]" rows="4" placeholder="Description"></textarea>
                        <div class="buttons-delete-save">
                          <button style="margin-right: 10px;" @click="onPressDeleteSpell(level, spellName, CHARACTER_KEYS.SPELLS)">Delete</button>
                          <button style="margin-left: 10px;" @click="onPressUpdateSpell(level, spellName, characterToView[CHARACTER_KEYS.SPELLS][level][spellName], CHARACTER_KEYS.SPELLS)">Update</button>
                        </div>
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
            <input class="item-input" type="text" v-model="spellTempName" placeholder="Spell name"> 
            <div>
              <br>
              <label for="spells-level" class="label-stats">Level:</label>
              <select class="picker" v-model="spellTempLevel">
                <option v-for="levels in SPELLCASTING_NAMES" :key="levels" :value="levels">{{ levels }}</option>
              </select>
            </div>
            <div>
              <label for="spells-casting-time" class="label-stats">Casting Time (# of actions):</label>
              <input type="number" id="spells-casting-time" v-model="spellTempCastingTime" class="input-stats" inputmode="numeric" required>
            </div>
            <div>
              <label for="spells-casting-duration" class="label-stats">Duration (in seconds):</label>
              <input type="number" id="spells-casting-duration" style="width: 100px;" v-model="spellTempDuration" class="input-stats" inputmode="numeric" required>
            </div>
            
            <div>
              <label for="spells-range" class="label-stats">Range (in feet):</label>
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
      <button class="button-delete" @click="toggleDeletePopup">Delete Character</button>
    </div>

    <!-- Delete Character Popup -->
    <div id="delete-character">
      <transition name="fade" appear>
        <div class="overlay" v-if="isDeletePopupOpen">
          <div class="popup">
            <div class="form">
              <h1>Delete {{ characterToView[CHARACTER_KEYS.NAME] }}?</h1>
              <p>This action can't be undone</p>
              <div class="delete-buttons">
                <button style="margin-right: 20px;" @click="toggleDeletePopup">Cancel</button>
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
import { BASE_STAT_KEYS } from '@/enums/dbKeys/baseStat-keys.js'
import { HP_KEYS } from '@/enums/dbKeys/hp-keys.js'
import { DEATH_SAVES_KEYS } from '@/enums/dbKeys/deathSaves-keys.js'
import { SKILL_KEYS, SKILL_NAMES } from '@/enums/dbKeys/skill-keys.js'
import { STAT_NAMES } from '@/enums/dbKeys/stat-keys.js'
import { SPELLCASTING_KEYS, SPELLCASTING_NAMES } from '@/enums/dbKeys/spellcasting_keys'

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
      isDeletePopupOpen: false,
      isEditingCharInfo: false,
      isEditingBaseStats: false,
      isEditingSavingThrows: false,
      isEditingSkills: false,
      isEditingFeaturesTraits: false,
      isEditingEquipment: false,
      isEditingLanguages: false,
      isEditingProficiencies: false,
      isEditingSpellCasting: false,
      ALIGNMENT_TYPES: ALIGNMENT_TYPES,
      BASE_STAT_KEYS: BASE_STAT_KEYS,
      CHARACTER_KEYS: CHARACTER_KEYS,
      CLASS_NAMES: CLASS_NAMES,
      DEATH_SAVES_KEYS: DEATH_SAVES_KEYS,
      DIE_TYPE: DIE_TYPE,
      EQUIPMENT_KEYS: EQUIPMENT_KEYS,
      FEATURES_KEYS: FEATURES_KEYS,
      FEATURES_TYPES: FEATURES_TYPES,
      HP_KEYS: HP_KEYS,
      LANGUAGE_PROFICIENCY: LANGUAGE_PROFICIENCY,
      STAT_NAMES: STAT_NAMES,
      SKILL_KEYS: SKILL_KEYS,
      SKILL_NAMES: SKILL_NAMES,
      SPELLCASTING_KEYS: SPELLCASTING_KEYS,
      SPELLCASTING_NAMES: SPELLCASTING_NAMES,
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
    }
  },
  mounted() {
    this.characterToView = this.store.getters.getUserCharacters[this.characterToViewId]
    // console.info('this.characterToView:', this.characterToView)
  },
  watch: {
    'characterToView.stats.str': function(newValue) {
      const statMod = Math.floor(this.getBaseStatBonus(newValue))

      this.characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.STRENGTH_BONUS] = statMod
      this.characterToView[CHARACTER_KEYS.SAVING_THROWS][BASE_STAT_KEYS.STRENGTH] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.ATHLETICS] = statMod
    },
    'characterToView.stats.dex': function(newValue) {
      const statMod = Math.floor(this.getBaseStatBonus(newValue))

      this.characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.DEXTERITY_BONUS] = statMod
      this.characterToView[CHARACTER_KEYS.SAVING_THROWS][BASE_STAT_KEYS.DEXTERITY] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.ACROBATICS] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.SLEIGHT_OF_HAND] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.STEALTH] = statMod
      this.characterToView[CHARACTER_KEYS.INITIATIVE] = statMod
    },
    'characterToView.stats.con': function(newValue) {
      const statMod = Math.floor(this.getBaseStatBonus(newValue))

      this.characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.CONSTITUTION_BONUS] = statMod
      this.characterToView[CHARACTER_KEYS.SAVING_THROWS][BASE_STAT_KEYS.CONSTITUTION] = statMod
    },
    'characterToView.stats.int': function(newValue) {
      const statMod = Math.floor(this.getBaseStatBonus(newValue))

      this.characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.INTELLIGENCE_BONUS] = statMod
      this.characterToView[CHARACTER_KEYS.SAVING_THROWS][BASE_STAT_KEYS.INTELLIGENCE] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.ARCANA] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.HISTORY] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.INVESTIGATION] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.NATURE] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.RELIGION] = statMod
    },
    'characterToView.stats.wis': function(newValue) {
      const statMod = Math.floor(this.getBaseStatBonus(newValue))

      this.characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.WISDOM_BONUS] = statMod
      this.characterToView[CHARACTER_KEYS.SAVING_THROWS][BASE_STAT_KEYS.WISDOM] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.ANIMAL_HANDLING] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.INSIGHT] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.MEDICINE] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.PERCEPTION] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.SURVIVAL] = statMod
      this.characterToView[CHARACTER_KEYS.PASSIVE_PERCEPTION] = 10 + statMod
    },
    'characterToView.stats.cha': function(newValue) {
      const statMod = Math.floor(this.getBaseStatBonus(newValue))

      this.characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.CHARISMA_BONUS] = statMod
      this.characterToView[CHARACTER_KEYS.SAVING_THROWS][BASE_STAT_KEYS.CHARISMA] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.DECEPTION] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.INTIMIDATION] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.PERFORMANCE] = statMod
      this.characterToView[CHARACTER_KEYS.SKILLS][SKILL_KEYS.PERSUASION] = statMod
    },
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
    getStatBonus(stat) {
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
    },
    onPressUpdateBaseStats() {
      const stats = {
        [BASE_STAT_KEYS.STRENGTH]: this.characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.STRENGTH],
        [BASE_STAT_KEYS.STRENGTH_BONUS]: this.characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.STRENGTH_BONUS],
        [BASE_STAT_KEYS.DEXTERITY]: this.characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.DEXTERITY],
        [BASE_STAT_KEYS.DEXTERITY_BONUS]: this.characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.DEXTERITY_BONUS],
        [BASE_STAT_KEYS.CONSTITUTION]: this.characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.CONSTITUTION],
        [BASE_STAT_KEYS.CONSTITUTION_BONUS]: this.characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.CONSTITUTION_BONUS],
        [BASE_STAT_KEYS.INTELLIGENCE]: this.characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.INTELLIGENCE],
        [BASE_STAT_KEYS.INTELLIGENCE_BONUS]: this.characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.INTELLIGENCE_BONUS],
        [BASE_STAT_KEYS.WISDOM]: this.characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.WISDOM],
        [BASE_STAT_KEYS.WISDOM_BONUS]: this.characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.WISDOM_BONUS],
        [BASE_STAT_KEYS.CHARISMA]: this.characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.CHARISMA],
        [BASE_STAT_KEYS.CHARISMA_BONUS]: this.characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.CHARISMA_BONUS],
      }

      const savingThrows = {
        [BASE_STAT_KEYS.STRENGTH]: this.characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.STRENGTH_BONUS],
        [BASE_STAT_KEYS.DEXTERITY]: this.characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.DEXTERITY_BONUS],
        [BASE_STAT_KEYS.CONSTITUTION]: this.characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.CONSTITUTION_BONUS],
        [BASE_STAT_KEYS.INTELLIGENCE]: this.characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.INTELLIGENCE_BONUS],
        [BASE_STAT_KEYS.WISDOM]: this.characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.WISDOM_BONUS],
        [BASE_STAT_KEYS.CHARISMA]: this.characterToView[CHARACTER_KEYS.STATS][BASE_STAT_KEYS.CHARISMA_BONUS],
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
          alert(`couldn't update character info for some reason`)
        }

        this.toggleEditForStat(CHARACTER_KEYS.STATS)
      })
    },
    onPressUpdateStat(key, value, statRef) {
      const payload = {
        charId: this.characterToViewId,
        key: key,
        value: value,
        statRef: statRef
      }
      this.store.dispatch("updateCharacterSpell", payload)
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

        
        case CHARACTER_KEYS.EQUIPMENT:
          this.isEditingEquipment = !this.isEditingEquipment
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
    toggleDeletePopup() {
      this.isDeletePopupOpen = !this.isDeletePopupOpen
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
  width: 80%;
  text-align: left;
  border-radius: 10px;
  padding: 5px;
}

.character-name {
  margin-top: 50px;
  font-size: 2.5em;
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

/* EDITING - STYLE */

.container-edit {
  text-align: center;
}

/* STAT STYLE */

.stat-list {
  display: flex;
  flex-direction: column;
  list-style-type: none;
  width: 50%;
  margin: 0 auto;
  padding-left: 0;
}

.stat-group {
  display: flex;
  align-items: center;
}

.stat-label {
  text-align: left;
  font-size: large;
}

.stat-value {
  flex-grow: 1;
  text-align: right;
  font-size: large;
}

.stat-bonus {
  margin-left: 10px; /* Adjust as needed */
  text-align: right;
  font-size: large;
}

.popup {
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  max-width: 500px;
}

.popup.active {
  opacity: 1;
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

.buttons-delete-save {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 auto;
  margin-top: 20px;
}
</style>