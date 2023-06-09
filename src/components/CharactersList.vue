<template>
  <div class="body" ref="bodyRef">
    <side-menu @click="toggleMenu"></side-menu>

    <div class="content" ref="contentRef">
      <h1>{{ getUserInfo.name }}'s characters</h1>
      <div class="top-buttons">
        <button class="button-open-modal" @click="toggleModalNewCharacter">Create Character</button>
      </div>

      <hr v-if="!showMenu">
      <hr v-if="showMenu" style="visibility: hidden ;" >
      
      <!-- Character summary -->
      <character-page @click="toggleModalViewCharacter"></character-page>

      <!-- Create a new character -->
      <div id="create-character">
        <transition name="slide-up" mode="out-in">
          <template v-if="showModalNewCharacter">
            <div class="modal-page-overlay">
              <div class="modal-page scrollable">
                <button class="button-close" @click="toggleModalNewCharacter">Close</button>

                <h2>New Character</h2>
                
                <div class="input-container">
                  <input class="character-description" type="text" v-model="characterName" placeholder="Name" required>
                  <input class="character-description" type="text" v-model="characterBackground" placeholder="Background" required>
                  <input class="character-description" type="text" v-model="characterRace" placeholder="Race" required>

                  <div class="container-inputs">
                    <ul class="list-inputs">
                    <li>
                      <label for="character-alignment" class="label-stats">Alignment:</label>
                      <select class="picker" v-model="characterAlignment">
                        <option v-for="alignment in ALIGNMENT_TYPES" :key="alignment">{{ alignment }}</option>
                      </select>
                    </li>

                    <li style="margin-top: 20px;">
                      <label for="character-class" class="label-stats">Class:</label>
                      <select class="picker" v-model="characterClass">
                        <option v-for="name in CLASS_NAMES" :key="name" :value="name">{{ name }}</option>
                      </select>
                    </li>
                  </ul>
                </div>
              </div>
              
              <br>
              <h3>Base Stats</h3>
              <div id="character-info">
                <div class="container-inputs">
                  <ul class="list-inputs">
                    <li>
                      <label for="stats-level" class="label-stats">Starting level:</label>
                      <input type="number" id="stats-level" v-model="level" class="input-stats" inputmode="numeric" required>
                    </li>

                    <li>
                      <label for="stats-hp" class="label-stats">Hit Points (HP):</label>
                      <input type="number" id="stats-hp" v-model="hp[HP_KEYS.MAX]" class="input-stats" inputmode="numeric" required>
                    </li>

                    <li>
                      <label for="stats-hit-die"># of Hit Die: </label>
                      <input type="number" id="stats-hit-die" v-model="hp[HP_KEYS.DIEAMOUNT]" class="input-stats" inputmode="numeric" required>
                    </li>

                    <li style="margin-top: 10px;">
                      <label>Hit Die Type: </label>
                      <select class="picker" v-model="hp[HP_KEYS.DIE]">
                        <option v-for="die in DIE_TYPE" :key="die" :value="die">{{ die }}</option>
                      </select>
                    </li>

                    <li>
                      <label for="stats-proficiency-bonus">Proficiency Bonus: </label>
                      <input type="number" id="stats-proficiency-bonus" v-model="proficiencyBonus" class="input-stats" inputmode="numeric" required>
                    </li>

                    <li>
                      <label for="stats-armor-class">Armor Class: </label>
                      <input type="number" id="stats-armor-class" v-model="characterArmor" class="input-stats" inputmode="numeric" required>
                    </li>

                    <li>
                      <label for="stats-initiative">Initiative: </label>
                      <input type="number" id="stats-hit-die" v-model="initiative" class="input-stats" inputmode="numeric" required>
                    </li>

                    <li>
                      <label for="stats-speed">Speed: </label>
                      <input type="number" id="stats-speed" v-model="characterSpeed" class="input-stats" inputmode="numeric" required>
                    </li>
                  </ul>
                </div>
              </div>

              <div id="base-stats">
                <div class="container-inputs">
                  <ul class="list-inputs">
                    <li>
                        <label for="stats-str" class="label-stats">Strength:</label>
                        <input type="number" id="stats-str" v-model="stats[BASE_STAT_KEYS.STRENGTH]" class="input-stats" inputmode="numeric" required>
                    </li>
                    
                    <li>
                      <label for="stats-dex" class="label-stats">Dexterity: </label>
                      <input type="number" id="stats-dex" v-model="stats[BASE_STAT_KEYS.DEXTERITY]" class="input-stats" inputmode="numeric" required>
                    </li>
                      
                    <li>
                      <label for="stats-con" class="label-stats">Consitution: </label>
                      <input type="number" id="stats-con" v-model="stats[BASE_STAT_KEYS.CONSTITUTION]" class="input-stats" inputmode="numeric" required>
                    </li>

                    <li>
                      <label for="stats-int" class="label-stats">Intelligence: </label>
                      <input type="number" id="stats-int" v-model="stats[BASE_STAT_KEYS.INTELLIGENCE]" class="input-stats" inputmode="numeric" required>
                    </li>

                    <li>
                      <label for="stats-wis" class="label-stats">Wisdom: </label>
                      <input type="number" id="stats-wis" v-model="stats[BASE_STAT_KEYS.WISDOM]" class="input-stats" inputmode="numeric" required>
                    </li>

                    <li>
                      <label for="stats-cha" class="label-stats">Charisma: </label>
                      <input type="number" id="stats-cha" v-model="stats[BASE_STAT_KEYS.CHARISMA]" class="input-stats" inputmode="numeric" required>
                    </li>
                  </ul>

                  <!-- Bonus modifier -->
                  <ul class="list-inputs">
                    <li>
                        <label for="stats-str-bonus" style="margin-left: 10px;">Bonus: </label>
                        <input type="number" id="stats-str-bonus" v-model="stats[BASE_STAT_KEYS.STRENGTH_BONUS]" class="input-stats" inputmode="numeric" required>
                    </li>
                    
                    <li>
                      <label for="stats-dex-bonus" style="margin-left: 10px;">Bonus: </label>
                      <input type="number" id="stats-dex-bonus" v-model="stats[BASE_STAT_KEYS.DEXTERITY_BONUS]" class="input-stats" inputmode="numeric" required>
                    </li>
                      
                    <li>
                      <label for="stats-con-bonus" style="margin-left: 10px;">Bonus: </label>
                      <input type="number" id="stats-con-bonus" v-model="stats[BASE_STAT_KEYS.CONSTITUTION_BONUS]" class="input-stats" inputmode="numeric" required>
                    </li>

                    <li>
                      <label for="stats-int-bonus" style="margin-left: 10px;">Bonus: </label>
                      <input type="number" id="stats-int-bonus" v-model="stats[BASE_STAT_KEYS.INTELLIGENCE_BONUS]" class="input-stats" inputmode="numeric" required>
                    </li>

                    <li>
                      <label for="stats-wis-bonus" style="margin-left: 10px;">Bonus: </label>
                      <input type="number" id="stats-wis-bonus" v-model="stats[BASE_STAT_KEYS.WISDOM_BONUS]" class="input-stats" inputmode="numeric" required>
                    </li>

                    <li>
                      <label for="stats-cha-bonus" style="margin-left: 10px;">Bonus: </label>
                      <input type="number" id="stats-cha-bonus" v-model="stats[BASE_STAT_KEYS.CHARISMA_BONUS]" class="input-stats" inputmode="numeric" required>
                    </li>
                  </ul>
                </div>
              </div>
              
              <br>
              <h3>Saving Throws</h3>
              <div id="saving-throws">
                <div class="container-inputs">
                  <ul class="list-inputs">
                    <li>
                      <label for="saving-str" class="label-stats">Strength:</label>
                      <input type="number" id="saving-str" v-model="savingThrows[BASE_STAT_KEYS.STRENGTH]" class="input-stats" inputmode="numeric" required>
                    </li>
                    
                    <li>
                      <label for="saving-dex" class="label-stats">Dexterity: </label>
                      <input type="number" id="saving-dex" v-model="savingThrows[BASE_STAT_KEYS.DEXTERITY]" class="input-stats" inputmode="numeric" required>
                    </li>

                    <li>
                      <label for="saving-con" class="label-stats">Consitution: </label>
                      <input type="number" id="saving-con" v-model="savingThrows[BASE_STAT_KEYS.CONSTITUTION]" class="input-stats" inputmode="numeric" required>
                    </li>
                    
                    <li>
                      <label for="saving-int" class="label-stats">Intelligence: </label>
                      <input type="number" id="saving-int" v-model="savingThrows[BASE_STAT_KEYS.INTELLIGENCE]" class="input-stats" inputmode="numeric" required>
                    </li>
                    
                    <li>
                      <label for="saving-wis" class="label-stats">Wisdom: </label>
                      <input type="number" id="saving-wis" v-model="savingThrows[BASE_STAT_KEYS.WISDOM]" class="input-stats" inputmode="numeric" required>
                    </li>
                    
                    <li>
                      <label for="saving-cha" class="label-stats">Charisma: </label>
                      <input type="number" id="saving-cha" v-model="savingThrows[BASE_STAT_KEYS.CHARISMA]" class="input-stats" inputmode="numeric" required>
                    </li>
                  </ul>
                </div>
              </div>

              <br>
              <h3>Skills</h3>
              <div id="skills">
                <div class="container-inputs">
                  <ul class="list-inputs">
                    <li>
                      <label for="skills-acrobatics" class="label-stats">Acrobatics:</label>
                      <input type="number" id="skills-acrobatics" v-model="skills[SKILL_KEYS.ACROBATICS]" class="input-stats" inputmode="numeric" required>
                    </li>

                    <li>
                      <label for="skills-animal-handling" class="label-stats">Animal Hanlding:</label>
                      <input type="number" id="skills-animal-handling" v-model="skills[SKILL_KEYS.ANIMALHANDLING]" class="input-stats" inputmode="numeric" required>
                    </li>

                    <li>
                      <label for="skills-arcana" class="label-stats">Arcana:</label>
                      <input type="number" id="skills-arcana" v-model="skills[SKILL_KEYS.ARCANA]" class="input-stats" inputmode="numeric" required>
                    </li>

                    <li>
                      <label for="skills-athletics" class="label-stats">Athletics:</label>
                      <input type="number" id="skills-athletics" v-model="skills[SKILL_KEYS.ATHLETICS]" class="input-stats" inputmode="numeric" required>
                    </li>

                    <li>
                      <label for="skills-deception" class="label-stats">Deception:</label>
                      <input type="number" id="skills-deception" v-model="skills[SKILL_KEYS.DECEPTION]" class="input-stats" inputmode="numeric" required>
                    </li>

                    <li>
                      <label for="skills-history" class="label-stats">History:</label>
                      <input type="number" id="skills-history" v-model="skills[SKILL_KEYS.HISTORY]" class="input-stats" inputmode="numeric" required>
                    </li>

                    <li>
                      <label for="skills-insight" class="label-stats">Insight:</label>
                      <input type="number" id="skills-insight" v-model="skills[SKILL_KEYS.INSIGHT]" class="input-stats" inputmode="numeric" required>
                    </li>
                    
                    <li>
                      <label for="skills-intimidation" class="label-stats">Intimidation:</label>
                      <input type="number" id="skills-intimidation" v-model="skills[SKILL_KEYS.INTIMIDATION]" class="input-stats" inputmode="numeric" required>
                    </li>

                    <li>
                      <label for="skills-investigation" class="label-stats">Investigation:</label>
                      <input type="number" id="skills-investigation" v-model="skills[SKILL_KEYS.INVESTIGATION]" class="input-stats" inputmode="numeric" required>
                    </li>

                    <li>
                      <label for="skills-medicine" class="label-stats">Medicine:</label>
                      <input type="number" id="skills-medicine" v-model="skills[SKILL_KEYS.MEDICINE]" class="input-stats" inputmode="numeric" required>
                    </li>

                    <li>
                      <label for="skills-nature" class="label-stats">Nature:</label>
                      <input type="number" id="skills-nature" v-model="skills[SKILL_KEYS.NATURE]" class="input-stats" inputmode="numeric" required>
                    </li>
                    
                    <li>
                      <label for="skills-perception" class="label-stats">Perception:</label>
                      <input type="number" id="skills-perception" v-model="skills[SKILL_KEYS.PERCEPTION]" class="input-stats" inputmode="numeric" required>
                    </li>

                    <li>
                      <label for="skills-performance" class="label-stats">Performance:</label>
                      <input type="number" id="skills-performance" v-model="skills[SKILL_KEYS.PERFORMANCE]" class="input-stats" inputmode="numeric" required>
                    </li>

                    <li>
                      <label for="skills-persuasion" class="label-stats">Persuasion:</label>
                      <input type="number" id="skills-persuasion" v-model="skills[SKILL_KEYS.PERSUASION]" class="input-stats" inputmode="numeric" required>
                    </li>

                    <li>
                      <label for="skills-religion" class="label-stats">Religion:</label>
                      <input type="number" id="skills-religion" v-model="skills[SKILL_KEYS.RELIGION]" class="input-stats" inputmode="numeric" required>
                    </li>

                    <li>
                      <label for="skills-sleight-of-hand" class="label-stats">Slight of Hand:</label>
                      <input type="number" id="skills-sleight-of-hand" v-model="skills[SKILL_KEYS.SLEIGHT_OF_HAND]" class="input-stats" inputmode="numeric" required>
                    </li>

                    <li>
                      <label for="skills-stealth" class="label-stats">Stealth:</label>
                      <input type="number" id="skills-stealth" v-model="skills[SKILL_KEYS.STEALTH]" class="input-stats" inputmode="numeric" required>
                    </li>

                    <li>
                      <label for="skills-survival" class="label-stats">Survival:</label>
                      <input type="number" id="skills-survival" v-model="skills[SKILL_KEYS.SURVIVAL]" class="input-stats" inputmode="numeric" required>
                    </li>
                  </ul>
                </div>
              </div>

              <br>
              <h3>Features & Traits</h3>
              <div id="features-and-traits">

                <template v-if="getDictionarySize(featuresTraits) > 0">
                  <div class="list-container">
                    <ul class="list">
                      <li v-for="(item, key) in featuresTraits" :key="key">
                        <div>
                          <label class="item-name">{{ key }}</label>
                          <label class="item-amount">x{{ item[FEATURES_KEYS.USES] }}</label>
                        </div>
                        <label class="item-type">Type: {{ item[FEATURES_KEYS.TYPE] }}</label>
                        <label class="item-description">{{ item[FEATURES_KEYS.DESCRIPTION] }}</label>
                        <br>
                        <button @click="onPressDeleteFeatures(key)">Delete</button>
                      </li>
                    </ul>
                  </div>
                </template>

                <input class="item-input" type="text" v-model="featuresTempName" placeholder="Feature/Trait name"> 

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
                  
                  <textarea v-model="featuresTempDescription" rows="4" placeholder="Description"></textarea>
                  <br>
                  <button @click="onPressAddFeatures" style="margin-top: 10px;">Add</button>
              </div>

              <br>
              <h3>Equipment</h3>
              <div id="equipment">
                <div style="margin-bottom: 10px;">
                  <label for="equipment-gold" class="label-stats">Starting Gold:</label>
                  <input type="number" id="equipment-gold" v-model="gold" class="input-stats" inputmode="numeric" required>
                </div>

                <template v-if="getDictionarySize(equipment) > 0">
                  <div class="list-container">
                    <ul class="list">
                      <li v-for="(item, key) in equipment" :key="key">
                        <div>
                          <label class="item-name">{{ key }}</label>
                          <label class="item-amount">x{{ item[EQUIPMENT_KEYS.AMOUNT] }}</label>
                        </div>
                        <label class="item-description">{{ item[EQUIPMENT_KEYS.DESCRIPTION] }}</label>
                        <br>
                        <button @click="onPressDeleteEquipment(key)">Delete</button>
                      </li>
                    </ul>
                  </div>
                </template>
                
                <div class="equipment-container">
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
              </div>
              
              <br>
              <h3>Languages</h3>
              <div id="languages">
                <template v-if="getDictionarySize(languages) > 0">
                  <div class="list-container">
                    <ul class="list">
                      <li v-for="(item, key) in languages" :key="key">
                        <label class="item-name">{{ key }}</label>
                        <label class="item-description">{{ item }}</label>
                        <br>
                        <button @click="onPressDeleteLanguage(key)">Delete</button>
                      </li>
                    </ul>
                  </div>
                </template>

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
              </div>
              
              <br>
              <h3>Proficiencies</h3>
              <div id="proficiencies">
                <template v-if="getDictionarySize(proficiencies) > 0">
                  <div class="list-container">
                    <ul class="list">
                      <li v-for="(item, key) in proficiencies" :key="key">
                        <label class="item-name">{{ key }}</label>
                        <label class="item-description">{{ item }}</label>
                        <br>
                        <button @click="onPressDeleteProficiency(key)">Delete</button>
                      </li>
                    </ul>
                  </div>
                </template>

                <div class="proficiency-container">
                  <input class="item-input" v-model="proficiencyTempName" placeholder="Proficiency name"> 
                  <br>
                  <textarea v-model="proficiencyTempDescription" rows="4" placeholder="Description"></textarea>
                  <br>
                  <button @click="onPressAddProficiency" style="margin-top: 10px;">Add</button>
                </div>
              </div>

              <br>
              <h3>Spell Casting</h3>
              <div id="spells">
                <div class="container-inputs">
                  <ul class="list-inputs">
                    <li>
                      <label for="spells-attack-bonus" class="label-stats">Attack Bonus:</label>
                      <input type="number" id="spells-attack-bonus" v-model="spellAttackBonus" class="input-stats" inputmode="numeric" required>
                    </li>

                    <li style="margin-top: 10px;">
                      <label for="spells-attack-bonus" class="label-stats">Casting Ability:</label>
                      <select class="picker" v-model="spellCastingStat">
                        <option v-for="stat in STAT_NAMES" :key="stat" :value="stat">{{ stat }}</option>
                      </select>
                    </li>

                    <li>
                      <label for="spells-save-dc" class="label-stats">Saving DC:</label>
                      <input type="number" id="spells-save-dc" v-model="spellSavingDc" class="input-stats" inputmode="numeric" required>
                    </li>
                  </ul>
                </div>

                <template v-if="getDictionarySize(spells) > 0">
                  <div class="list-container">
                    <ul class="list">
                      <li v-for="(item, level) in spells" :key="level">
                        <template v-if="getDictionarySize(spells[level]) > 0">
                          <label class="item-name">{{ getSpellLevelName(level) }}:</label>
                          <ul class="list">
                            <li v-for="(spell, spellName) in spells[level]" :key="spellName">
                              <label class="item-name">{{ spellName }}</label>
                              <br>
                              <label class="item-description">Casting Time: {{ spell[[SPELLCASTING_KEYS.CASTING_TIME]] }}</label>
                              <label class="item-description">Duration: {{ spell[[SPELLCASTING_KEYS.DURATION]] }} seconds</label>
                              <label class="item-description">Range: {{ spell[[SPELLCASTING_KEYS.RANGE]] }} ft</label>
                              <label class="item-description">{{ spell[[SPELLCASTING_KEYS.DESCRIPTION]] }}</label>
                              
                              <br>
                              <button @click="onPressDeleteSpell(level, spellName)">Delete</button>
                            </li>
                          </ul>
                        </template>
                      </li>
                    </ul>
                  </div>
                </template>

                <input class="item-input" v-model="spellTempName" placeholder="Spell name"> 

                <div class="container-inputs">
                  <ul class="list-inputs">
                    <li style="margin-top: 10px;">
                      <label for="spells-level" class="label-stats">Level:</label>
                      <select class="picker" v-model="spellTempLevel">
                        <option v-for="levels in SPELLCASTING_NAMES" :key="levels" :value="levels">{{ levels }}</option>
                      </select>
                    </li>

                    <li>
                      <label for="spells-casting-time" class="label-stats">Casting Time (# of actions):</label>
                      <input type="number" id="spells-casting-time" v-model="spellTempCastingTime" class="input-stats" inputmode="numeric" required>
                    </li>
                    
                    <li>
                      <label for="spells-casting-duration" class="label-stats">Duration (in seconds):</label>
                      <input type="number" id="spells-casting-duration" style="width: 100px;" v-model="spellTempDuration" class="input-stats" inputmode="numeric" required>
                    </li>
                    
                    <li>
                      <label for="spells-range" class="label-stats">Range (in feet):</label>
                      <input type="number" id="spells-range" v-model="spellTempRange" class="input-stats" inputmode="numeric" required>
                    </li>
                  </ul>
                </div>

                <textarea v-model="spellTempDescription" rows="4" placeholder="Description"></textarea>
                <br>
                <button @click="onPressAddSpell" style="margin-top: 10px;">Add</button>
              </div>
              <button class="button-create-character" @click="createCharacter">Create Character</button>

            </div>
          </div>
        </template>
      </transition>
      </div>
    </div>

    <!-- Bottom Navigation Bar -->
    <nav class="bottom-navigation" v-if="showNavBar">
      <ul>
        <li @click="navigateTo(ROUTER_NAMES.Campaigns)" :class="{ active: currentRoute === ROUTER_NAMES.Campaigns }">
          <i class="fas fa-campaigns"></i>
          {{ ROUTER_NAMES.Campaigns.charAt(0).toUpperCase() + ROUTER_NAMES.Campaigns.slice(1) }}
        </li>
        <li @click="navigateTo(ROUTER_NAMES.Characters)" :class="{ active: currentRoute === ROUTER_NAMES.Characters }">
          <i class="fas fa-characters"></i>
          {{ ROUTER_NAMES.Characters.charAt(0).toUpperCase() + ROUTER_NAMES.Characters.slice(1) }}
        </li><li @click="navigateTo(ROUTER_NAMES.Sessions)" :class="{ active: currentRoute === ROUTER_NAMES.Sessions }">
          <i class="fas fa-sessions"></i>
          {{ ROUTER_NAMES.Sessions.charAt(0).toUpperCase() + ROUTER_NAMES.Sessions.slice(1) }}
        </li>
      </ul>
    </nav>
    
  </div>
</template>

<script>
import CharacterPage from '@/components/CharacterPage.vue'
import SideMenu from '@/components/SideMenu.vue'
import { useStore } from 'vuex'
import { createNewCharacter } from '@/functions/rtdb'
import Character from '@/models/character'
import Cookies from 'js-cookie'
import ROUTER_NAMES from '@/enums/router-names'
import COOKIE_NAMES from '@/enums/cookie-names'
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
    name: ROUTER_NAMES.CHARACTERS.charAt(0).toUpperCase() + ROUTER_NAMES.CHARACTERS.slice(1),
    components: {
      SideMenu,
      CharacterPage
    },
    data() {
        return {
          store: useStore(),
          showModalNewCharacter: false,
          showModalViewCharacter: false,
          showMenu: false,
          showNavBar: true, // show by default
          characterToView: new Character(),
          usersCharacters: {},
          ALIGNMENT_TYPES: ALIGNMENT_TYPES,
          BASE_STAT_KEYS: BASE_STAT_KEYS,
          CHARACTER_KEYS: CHARACTER_KEYS,
          CLASS_NAMES: CLASS_NAMES,
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
          characterName: '',
          characterAlignment: '',
          characterBackground: '',
          characterClass: '',
          deathSaves: {
            [DEATH_SAVES_KEYS.SUCCESSES]: 0, 
            [DEATH_SAVES_KEYS.FAILURES]: 0
          },
          characterRace: '',
          level: '',
          characterArmor: '',
          [CHARACTER_KEYS.INITIATIVE]: '',
          proficiencyBonus: '',
          characterSpeed: '',
          hp: {
            [HP_KEYS.CURRENT]: '',
            [HP_KEYS.DIE]: '',
            [HP_KEYS.DIEAMOUNT]: '',
            [HP_KEYS.MAX]: '',
            [HP_KEYS.TEMP]: 0
          },
          hitDieType: '', // d10
          hitDieAmount: '', // 3
          equipment: {},
          equipmentTempName: '',
          equipmentTempAmount: '',
          equipmentTempDescription: '',
          featuresTraits: {},
          featuresTempName: '',
          featuresTempDescription: '',
          featuresTempType: '', // Racial, Class, Other
          featuresTempUseable: true,
          featuresTempUses: '',
          gold: '', // TODO
          languages: {},
          languagesTempName: '',
          languagesTempProficiency: '',
          proficiencies: {},
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
          stats: {
            [BASE_STAT_KEYS.STRENGTH]: '',
            [BASE_STAT_KEYS.STRENGTH_BONUS]: '',
            [BASE_STAT_KEYS.DEXTERITY]: '',
            [BASE_STAT_KEYS.DEXTERITY_BONUS]: '',
            [BASE_STAT_KEYS.CONSTITUTION]: '',
            [BASE_STAT_KEYS.CONSTITUTION_BONUS]: '',
            [BASE_STAT_KEYS.INTELLIGENCE]: '',
            [BASE_STAT_KEYS.INTELLIGENCE_BONUS]: '',
            [BASE_STAT_KEYS.WISDOM]: '',
            [BASE_STAT_KEYS.WISDOM_BONUS]: '',
            [BASE_STAT_KEYS.CHARISMA]: '',
            [BASE_STAT_KEYS.CHARISMA_BONUS]: '',
          },
          savingThrows: {
            [BASE_STAT_KEYS.STRENGTH]: '',
            [BASE_STAT_KEYS.DEXTERITY]: '',
            [BASE_STAT_KEYS.CONSTITUTION]: '',
            [BASE_STAT_KEYS.INTELLIGENCE]: '',
            [BASE_STAT_KEYS.WISDOM]: '',
            [BASE_STAT_KEYS.CHARISMA_BONUS]: '',
          },
          skills: {
            [SKILL_KEYS.ACROBATICS]: '', // TODO Convert to enum 
            [SKILL_KEYS.ANIMALHANDLING]: '',
            [SKILL_KEYS.ARCANA]: '',
            [SKILL_KEYS.ATHLETICS]: '',
            [SKILL_KEYS.DECEPTION]: '',
            [SKILL_KEYS.HISTORY]: '',
            [SKILL_KEYS.INSIGHT]: '',
            [SKILL_KEYS.INTIMIDATION]: '',
            [SKILL_KEYS.INVESTIGATION]: '',
            [SKILL_KEYS.MEDICINE]: '',
            [SKILL_KEYS.NATURE]: '',
            [SKILL_KEYS.PERCEPTION]: '',
            [SKILL_KEYS.PERFORMANCE]: '',
            [SKILL_KEYS.PERSUASION]: '',
            [SKILL_KEYS.RELIGION]: '',
            [SKILL_KEYS.SLEIGHT_OF_HAND]: '',
            [SKILL_KEYS.STEALTH]: '',
            [SKILL_KEYS.SURVIVAL]: '',
          },
          spells: {}
        }
    },
    mounted() {
      if (this.store.getters.getUser.id === '') {
        try {
          const userCookie = Cookies.get(COOKIE_NAMES.USER)
          if (userCookie != undefined) {
            const userJson = JSON.parse(userCookie)
            // console.info('userCookie: ' + JSON.stringify(userJson))
            this.store.commit('setUser', userJson)
          }
          
        } catch (error) {
          console.info(error)
        }
      } else {
        // this.usersCharacters = this.store.getters.getUserCharacters
      }
    },
    computed: {
      getUserInfo() {
        const user = this.store.getters.getUser
        
        return user
      },
      ROUTER_NAMES() {
        return {
          Campaigns: ROUTER_NAMES.CAMPAIGNS,
          Characters: ROUTER_NAMES.CHARACTERS,
          Sessions: ROUTER_NAMES.SESSIONS
        };
      }
    },
    watch: {
      'hp.max': function(newValue) {
        this.hp.current = newValue
      }
    },
    methods: {
      resetVariables() {
        this.characterName = ''
        this.characterAlignment = ''
        this.characterBackground = ''
        this.characterClass = ''
        this.deathSaves = {
          [DEATH_SAVES_KEYS.SUCCESSES]: 0, 
          [DEATH_SAVES_KEYS.FAILURES]: 0
        },
        this.characterRace = ''
        this.level = ''
        this.characterArmor = ''
        this.initiative = ''
        this.proficiencyBonus = ''
        this.characterSpeed = ''
        this.hp = {
          [HP_KEYS.CURRENT]: '',
          [HP_KEYS.DIE]: '',
          [HP_KEYS.DIEAMOUNT]: '',
          [HP_KEYS.MAX]: '',
          [HP_KEYS.TEMP]: 0
        }
        this.hitDieType = '' // d10
        this.hitDieAmount = '' // 3
        this.equipment = {}
        this.equipmentTempName = ''
        this.equipmentTempAmount = ''
        this.equipmentTempDescription = ''
        this.featuresTraits = {}
        this.featuresTempName = ''
        this.featuresTempDescription = ''
        this.featuresTempType = '' // Racial, Class, Other
        this.featuresTempUseable = true
        this.featuresTempUses = ''
        this.gold = '' // TODO
        this.languages = {}
        this.languagesTempName = ''
        this.languagesTempProficiency = ''
        this.proficiencies = {}
        this.proficiencyTempName = ''
        this.proficiencyTempDescription = ''
        this.spellAttackBonus = ''
        this.spellCastingStat = '' // e.g. intelligence
        this.spellSavingDc = ''
        this.spellTempName = ''
        this.spellTempCastingTime = ''
        this.spellTempDescription = ''
        this.spellTempDuration = '' // in seconds
        this.spellTempRange = '' // in feet
        this.spellTempLevel = ''
        this.stats = {
          [BASE_STAT_KEYS.STRENGTH]: '',
          [BASE_STAT_KEYS.STRENGTH_BONUS]: '',
          [BASE_STAT_KEYS.DEXTERITY]: '',
          [BASE_STAT_KEYS.DEXTERITY_BONUS]: '',
          [BASE_STAT_KEYS.CONSTITUTION]: '',
          [BASE_STAT_KEYS.CONSTITUTION_BONUS]: '',
          [BASE_STAT_KEYS.INTELLIGENCE]: '',
          [BASE_STAT_KEYS.INTELLIGENCE_BONUS]: '',
          [BASE_STAT_KEYS.WISDOM]: '',
          [BASE_STAT_KEYS.WISDOM_BONUS]: '',
          [BASE_STAT_KEYS.CHARISMA]: '',
          [BASE_STAT_KEYS.CHARISMA_BONUS]: '',
        }
        this.savingThrows = {
          [BASE_STAT_KEYS.STRENGTH]: '',
          [BASE_STAT_KEYS.DEXTERITY]: '',
          [BASE_STAT_KEYS.CONSTITUTION]: '',
          [BASE_STAT_KEYS.INTELLIGENCE]: '',
          [BASE_STAT_KEYS.WISDOM]: '',
          [BASE_STAT_KEYS.CHARISMA_BONUS]: '',
        }
        this.skills = {
          [SKILL_KEYS.ACROBATICS]: '', // TODO Convert to enum 
          [SKILL_KEYS.ANIMALHANDLING]: '',
          [SKILL_KEYS.ARCANA]: '',
          [SKILL_KEYS.ATHLETICS]: '',
          [SKILL_KEYS.DECEPTION]: '',
          [SKILL_KEYS.HISTORY]: '',
          [SKILL_KEYS.INSIGHT]: '',
          [SKILL_KEYS.INTIMIDATION]: '',
          [SKILL_KEYS.INVESTIGATION]: '',
          [SKILL_KEYS.MEDICINE]: '',
          [SKILL_KEYS.NATURE]: '',
          [SKILL_KEYS.PERCEPTION]: '',
          [SKILL_KEYS.PERFORMANCE]: '',
          [SKILL_KEYS.PERSUASION]: '',
          [SKILL_KEYS.RELIGION]: '',
          [SKILL_KEYS.SLEIGHT_OF_HAND]: '',
          [SKILL_KEYS.STEALTH]: '',
          [SKILL_KEYS.SURVIVAL]: '',
        }
        this.spells = {}
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
        

        this.featuresTraits[this.featuresTempName] = newFeat

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

        if (this.proficiencyTempDescription == '') {
          alert("Please enter a proficiency proficiency")
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
        
        if (levelKey in this.spells) {
          // If there's a level key already in the dictionary
          this.spells[levelKey][this.spellTempName] = newSpell
          
        } else {
          // If there's a new entry for the level key
          const newEntry = {
            [this.spellTempName]: newSpell
          }

          this.spells[levelKey] = newEntry
        }
        
        this.spellTempName = ''
        this.spellTempLevel = ''
        this.spellTempCastingTime = ''
        this.spellTempDescription = ''
        this.spellTempDuration = ''
        this.spellTempRange = ''
      },
      onPressDeleteFeatures(key) {
        if (key in this.featuresTraits) {
          delete this.featuresTraits[key]
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
      onPressDeleteSpell(key, spellName) {
        if (key in this.spells) {
          const levelDict = this.spells[key]
          if (spellName in levelDict) {
            delete this.spells[key][spellName]

            // If there's nothing left in the level 
            if (this.getDictionarySize(levelDict) == 0) {
              delete this.spells[key]
            }
          }
        }
      },
      checkIfAllValid() {
        console.info("@checkIfAllValid")
        if (this.characterName === '') {
          alert("Please enter a character name")
          return
        }

        if (this.characterAlignment === '') {
          alert("Please enter an alignment")
          return
        }

        if (this.characterBackground === '') {
          alert("Please enter a background")
          return
        }

        if (this.characterRace === '') {
          alert("Please enter a race")
          return
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

        if (this.spellAttackBonus === '') {
          alert("Please put a spell attack bonus. Even if you don't have spells")
          return
        }

        if (this.spellCastingStat === '') {
          alert("Please select a stat your spell casting will be based off of")
          return
        }

        if (this.spellSavingDc === '') {
          alert("Please enter your spell saving DC")
          return
        }

        return true
      },
      checkIfStatsValid() {
        console.info("@checkIfStatsValid")
        
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
        console.info("@checkIfThrowsValid")
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
        console.info("@createCharacter")
        if (this.checkIfAllValid()) {
          const newCharacter = this.createCharacterDictionary()
          console.info('character:', newCharacter)
          // alert("New Character created!")
          createNewCharacter(this.store.getters.getUser.id, newCharacter).then((success => {
            if (success) {
              alert("New Character created!")
              this.resetVariables()
              this.toggleModalNewCharacter()
              window.scrollTo({ top: 0, behavior: 'smooth' });
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
          this.initiative,
          this.languages,
          this.level,
          this.characterName,
          this.proficiencies,
          this.proficiencyBonus,
          this.characterRace,
          this.savingThrows,
          this.skills,
          this.characterSpeed,
          this.spellAttackBonus,
          this.spellCastingStat,
          this.spellSavingDc,
          this.spells,
          this.stats,
        )

        return newCharacter
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
      navigateTo(routeName) {
        this.$router.push({ name: routeName })
      },
      toggleModalViewCharacter(charId) {
        this.showModalViewCharacter = !this.showModalViewCharacter
        this.characterToView = this.usersCharacters[charId]

        this.showNavBar = !this.showNavBar
      },
      toggleModalNewCharacter() {
        this.showModalNewCharacter = !this.showModalNewCharacter
        this.showNavBar = !this.showNavBar
      },
      toggleMenu() {
        this.showMenu = !this.showMenu
        this.showNavBar = !this.showNavBar
        if (this.showMenu) {
          this.$refs.contentRef.style.backgroundColor = 'gray';
          // this.$refs.bodyRef.style.height = 100%
          
        } else {
          this.$refs.contentRef.style.backgroundColor = ''
        }
      },
      logOut() {
        this.store.commit('signOut')
      },
    }
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

.body {
  margin: 0%;
  height: 110dvh;
}

.content {
  height: 100%;
}

.hamburger-menu {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 30px;
  height: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  /* z-index: 9999; */
}

.hamburger-line {
  width: 100%;
  height: 3px;
  background-color: #000;
}


.side-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 70%;
  height: 100%;
  background-color: white;
}

.side-menu {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.side-menu h1 {
  padding: 20px 12%;
  margin-bottom: 30px;
  
}

.menu-close {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  color: #007aff;
}

.list-side-menu {
  list-style: none;
}

.list-side-menu li {
  /* font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; */
  font-size: xx-large;
  margin-bottom: 10%;
}


.modal-page.scrollable {
  overflow-y: scroll;
  height: 100dvh;
}

.modal-page-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-page {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: white;
}

.button-close {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
}

h2 {
  padding-top: 50px;
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

.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 300px; /* Adjust the height as needed */
}

.character-description {
  border: none; /* Remove the default border */
  border-bottom: 1px solid black; /* Add a bottom border */
  outline: none;
  text-align: left;
  padding-left: 0;
  padding-bottom: 5px;
}

.input-field {
  width: 200px; /* Adjust the width as needed */
  margin-bottom: 10px; /* Adjust the spacing between input fields as needed */
}

.input-stats {
  width: 65px; /* Adjust the width as needed */
  margin-left: 5px; /* Adjust the spacing between the label and input */
  border: none; /* Remove the default border */
  border-bottom: 1px solid black; /* Add a bottom border */
  outline: none;
  text-align: center;
  padding-bottom: 5px;
}

.flex-container-stat {
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
}

.picker {
  padding: 5px;
  margin-left: 10px;
}


/* LIST - ENTERING INPUT STYLE */

.container-inputs {
  display: flex;
  justify-content: center;
  margin: 0 auto; /* centers the container */
}

.list-inputs {
  list-style: none;
  padding: 0;
}

.list-inputs li {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* LIST - ADDED ITEMS STYLE */

.item-input {
  width: 80%;
  margin-left: 5px; /* Adjust the spacing between the label and input */
  border: none; /* Remove the default border */
  border-bottom: 1px solid black; /* Add a bottom border */
  outline: none;
  padding-left: 0;
  padding-bottom: 5px;
}

.list-container {
  display: flex;
  justify-content: center;
  width: 90%;
  margin: 0 auto; /* centers the container */
  border: 1px solid black;
  border-radius: 10px; /* Rounded corners */
}

.list li {
  text-align: left;
  margin-bottom: 10px;
}

.item-name {
  font-weight: bold;
  font-size: larger;
  margin-right: 20px;
}

.item-amount {
  font-size: large;
}

.item-description {
  width: 80%;
  font-size: large;
  text-align: left;
}


/* USER'S CHARACTERS LIST STYLE */

.list-container-characters {
  display: flex;
  justify-content: center;
  width: 90%;
  margin: 0 auto; /* centers the container */
}

.list-characters li {
  width: 90%;
  list-style: none;
  border: 1px solid black;
  border-radius: 10px; /* Rounded corners */
  text-align: left;
  margin-bottom: 10px;
  padding: 5px;
}

/* BASE STATS STYLE */



/* SAVING THROWS STYLE */


/* SKILLS STYLE */



/* FEATURES & TRAITS STYLE */




/* EQUIPMENT STYLE */



/* LANGUAGE STYLE */




/* PROFICIENCY STYLE */

.proficiency-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}



/* SPELL CASTING STYLE */

.spells-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-create-character {
  font-size: x-large;
  margin-top: 10%;
  margin-bottom: 10%;
}
</style>