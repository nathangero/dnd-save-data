<template>
  <div class="body">
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
              <a @click="scrollToSection('save-delete-buttons')">Delete/Use Backup</a>
            </li>
          </ul>

          <!-- Add more links for other sections -->
        </div>
      </template>
      <button class="button-close" @click="closeModal">Close Backup</button>
    </div>

    <div class="character-to-view" v-if="characterToView.name !== ''" :class="{ 'disabled-page': isPopupOpen() }">
      <section id="character-background">
        <h1>Backup from:</h1>
        <h1>{{ convertTimestampToString(timeOfBackup) }}</h1>
        <hr>
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
                  <label class="stat-label" style="margin-right: 20px;">Current HP: </label>
                  <label class="stat-value">{{ characterToView.hp[HP_KEYS.CURRENT] }}/{{ characterToView.hp[HP_KEYS.MAX] }}</label>
                </div>
              </li>
              
              <li>
                <div class="stat-group">
                  <label class="stat-label" style="margin-right: 20px;">Temp HP: </label>
                  <label class="stat-value">{{ characterToView.hp[HP_KEYS.TEMP] }}</label>
                </div>
              </li>
              
              <li>
                <div class="stat-group">
                  <label class="stat-label" style="margin-right: 20px;">Hit die: </label>
                  <label class="stat-value">1{{ characterToView.hp[HP_KEYS.DIE] }}</label>
                </div>
              </li>
              
              <li>
                <div class="stat-group">
                  <label class="stat-label" style="margin-right: 20px;">Hit die count: </label>
                  <label class="stat-value">{{ characterToView.hp[HP_KEYS.DIE_AMOUNT_CURR] }}/{{ characterToView.hp[HP_KEYS.DIE_AMOUNT_MAX] }}</label>
                </div>
              </li>
              
              <li>
                <div class="stat-group">
                  <label class="stat-label" style="margin-right: 20px;">Death saves successes: </label>
                  <label class="stat-value">{{ characterToView.deathSaves.successes }}/3</label>
                </div>
              </li>
              
              <li>
                <div class="stat-group">
                  <label class="stat-label" style="margin-right: 20px;">Death saves failures: </label>
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
                  <label class="stat-label">{{ STAT_NAMES[stat] }}:</label>
                  <label class="stat-value">{{ characterToView.scores[stat].value }}</label>
                  <label class="stat-bonus">{{ getStatBonusSign(characterToView.scores[stat].calculateMod()) }}</label>
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
          </div>
        </collapse-transition>
        
      </section>

      <br>
      <section id="features-traits">
        <div class="h3-bar">
          <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.FEATURES)">{{ CHARACTER_SECTIONS.FEATURES_TRAITS }}</h3>
          <font-awesome-icon icon="chevron-up" v-if="!isShowingFeatures" class="collapse-chevron"/>
          <font-awesome-icon icon="chevron-down" v-if="isShowingFeatures" class="collapse-chevron"/>
        </div>

        <collapse-transition dimension="height">
          <div v-if="isShowingFeatures">
            <template v-if="getDictionarySize(characterToView.featuresTraits) > 0">
              <div>
                <ul class="list">
                  <li v-for="(item, key) in characterToView.featuresTraits" :key="key">
                    <label class="item-name">{{ key }}</label>
                    <label class="item-amount">x{{ item[FEATURES_KEYS.USES] }}</label>
                    <p class="item-description" style="margin-bottom: 5px;">Type: {{ item[FEATURES_KEYS.TYPE] }}</p>
                    <p class="item-description" style="margin-bottom: 5px;">Action Type: {{ item[FEATURES_KEYS.ACTION] }}</p>
                    <p class="item-description">{{ item[FEATURES_KEYS.DESCRIPTION] }}</p>
                  </li>
                </ul>
              </div>
            </template>
          </div>
        </collapse-transition>
        
      </section>

      <br>
      <section id="weapons">
        <div class="h3-bar">
          <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.WEAPONS)">{{ CHARACTER_SECTIONS.WEAPONS_SPELLS }}</h3>
          <font-awesome-icon icon="chevron-up" v-if="!isShowingWeapons" class="collapse-chevron"/>
          <font-awesome-icon icon="chevron-down" v-if="isShowingWeapons" class="collapse-chevron"/>
        </div>

        <collapse-transition dimension="height">
          <div v-if="isShowingWeapons">
            <template v-if="getDictionarySize(characterToView.weapons) > 0">
              <div>
                <ul class="list">
                  <li v-for="(item, key) in characterToView.weapons" :key="key">
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
                        <label class="spell-label" style="flex-grow: 1;">{{ WEAPON_NAMES[WEAPON_KEYS.PROFICIENT] }}:</label>
                        <input type="checkbox" class="checkbox" style="margin-right: 0px;" v-model="item[WEAPON_KEYS.PROFICIENT]" :disabled="!isEditingWeapons">
                      </div>
                    </div>
                    
                    <p class="spell-label">{{ item[WEAPON_KEYS.DESCRIPTION] }}</p>
                  </li>
                </ul>
              </div>
            </template>
          </div>
        </collapse-transition>
      </section>

      <br>
      <section id="equipment">
        <div class="h3-bar">
          <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.EQUIPMENT)">{{ CHARACTER_SECTIONS.EQUIPMENT }}</h3>
          <font-awesome-icon icon="chevron-up" v-if="!isShowingEquipment" class="collapse-chevron"/>
          <font-awesome-icon icon="chevron-down" v-if="isShowingEquipment" class="collapse-chevron"/>
        </div>

        <collapse-transition dimension="height">
          <div v-if="isShowingEquipment">
            <template v-if="getDictionarySize(characterToView.equipment) > 0">
              <div>
                <ul class="list">
                  <li style="text-align: left; margin-bottom: 20px">
                    <label class="item-name">Gold:</label>
                    <label class="item-amount">x{{ characterToView.gold }}</label>
                  </li>
                  
                  <li v-for="(item, key) in characterToView.equipment" :key="key">
                    <label class="item-name">{{ key }}</label>
                    <label class="item-amount">x{{ item[EQUIPMENT_KEYS.AMOUNT] }}</label>
                    <p class="item-description">{{ item[EQUIPMENT_KEYS.DESCRIPTION] }}</p>
                  </li>
                </ul>
              </div>
            </template>
          </div>
        </collapse-transition>
      </section>

      <br>
      <section id="treasure">
        <div class="h3-bar">
          <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.TREASURES)">{{ CHARACTER_SECTIONS.TREASURES }}</h3>
          <font-awesome-icon icon="chevron-up" v-if="!isShowingTreasure" class="collapse-chevron"/>
          <font-awesome-icon icon="chevron-down" v-if="isShowingTreasure" class="collapse-chevron"/>
        </div>

        <collapse-transition dimension="height">
          <div v-if="isShowingTreasure">
            <template v-if="getDictionarySize(characterToView.treasures) > 0">
              <div>
                <ul class="list">
                  <li v-for="(item, key) in characterToView.treasures" :key="key">
                    <label class="item-name">{{ key }}</label>
                    <label class="item-amount">x{{ item[EQUIPMENT_KEYS.AMOUNT] }}</label>
                    <p class="item-description">{{ item[EQUIPMENT_KEYS.DESCRIPTION] }}</p>
                  </li>
                </ul>
              </div>
            </template>
          </div>
        </collapse-transition>
      </section>
      
      <br>
      <section id="languages">
        <div class="h3-bar">
          <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.LANGUAGES)">{{ CHARACTER_SECTIONS.LANGUAGES }}</h3>
          <font-awesome-icon icon="chevron-up" v-if="!isShowingLanguages" class="collapse-chevron"/>
          <font-awesome-icon icon="chevron-down" v-if="isShowingLanguages" class="collapse-chevron"/>
        </div>

        <collapse-transition dimension="height">
          <div v-if="isShowingLanguages">
            <template v-if="getDictionarySize(characterToView.languages) > 0">
              <ul>
                <li v-for="(item, key) in characterToView.languages" :key="key">
                  <div class="language-group">
                    <p class="language-label">{{ key }}:</p>
                    <p class="language-value">{{ item }}</p>
                  </div>                    
                </li>
              </ul>
            </template>
          </div>
        </collapse-transition>
        
      </section>      

      <br>
      <section id="proficiencies">
        <div class="h3-bar">
          <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.PROFICIENCIES)">{{ CHARACTER_SECTIONS.PROFICIENCIES }}</h3>
          <font-awesome-icon icon="chevron-up" v-if="!isShowingProficiencies" class="collapse-chevron"/>
          <font-awesome-icon icon="chevron-down" v-if="isShowingProficiencies" class="collapse-chevron"/>
        </div>
        
        <collapse-transition dimension="height">
          <div v-if="isShowingProficiencies">
            <template v-if="getDictionarySize(characterToView.proficiencies) > 0">
              <ul class="list">
                <li v-for="(item, key) in characterToView.proficiencies" :key="key">
                  <label class="item-name">{{ key }}</label>
                  <p class="item-description">{{ item }}</p>
                </li>
              </ul>
            </template>
          </div>
        </collapse-transition>
      </section>

      <br>
      <section id="spell-slots">
        <div class="h3-bar">
          <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.SPELL_SLOTS)">{{ CHARACTER_SECTIONS.SPELL_SLOTS }}</h3>
          <font-awesome-icon icon="chevron-up" v-if="!isShowingSpellSlots" class="collapse-chevron"/>
          <font-awesome-icon icon="chevron-down" v-if="isShowingSpellSlots" class="collapse-chevron"/>
        </div>

        <collapse-transition dimension="height">
          <div v-if="isShowingSpellSlots">
            <template v-if="getDictionarySize(characterToView.spellSlots) > 0">
              <div>
                <ul class="list">
                  <li v-for="(item, key) in characterToView.spellSlots" :key="key">
                    <div v-if="!isEditingSpellSlots">
                      <label class="item-name">{{ SPELL_CASTING_NAMES[key] }}:</label>
                      <label class="item-amount">{{ item[SPELL_SLOT_KEYS.MAX] }} slots</label>
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
        <div class="h3-bar">
          <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.SPELLS)">{{ CHARACTER_SECTIONS.SPELL_CASTING }}</h3>
          <font-awesome-icon icon="chevron-up" v-if="!isShowingSpells" class="collapse-chevron"/>
          <font-awesome-icon icon="chevron-down" v-if="isShowingSpells" class="collapse-chevron"/>
        </div>

        <collapse-transition dimension="height">
          <div v-if="isShowingSpells">
            <template v-if="getDictionarySize(characterToView.spells) > 0">
              <ul class="list">
                <li v-for="(levelDict, level) in characterToView.spells" :key="level">
                  <template v-if="getDictionarySize(levelDict) > 0">
                    <label class="item-name">{{ SPELL_CASTING_NAMES[level] }}:</label>
                    <ul>
                      <li v-for="(spell, spellName) in levelDict" :key="spellName">
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
                      </li>
                    </ul>
                  </template>
                </li>
              </ul>
            </template>
          </div>
        </collapse-transition>
      </section>
    </div>

    <div id="save-delete-buttons" :class="{ 'disabled-page': isPopupOpen() }">
      <ul class="buttons-at-bottom">
        <li style="margin-bottom: 30px;">
          <!-- <button class="button-view-backups" @click="getcharacterToViews">View Backups</button> -->
          <button class="button-delete" @click="toggleDeleteBackupPopup">Delete Backup</button>
          <button class="button-save" @click="toggleOverwritePopup">Use this Backup</button>
        </li>
      </ul>
    </div>

    <!-- Overwrite Data Popup -->
    <div id="overwrite-character">
      <transition name="fade" appear>
        <div class="overlay" v-if="isShowingOverwritePopup">
          <div class="popup">
            <h1>Overwrite existing data for {{ characterToView.name }}?</h1>
            <p class="popup-message">This action can't be undone</p>
            <div class="buttons-delete-character">
              <button class="button-cancel-delete" @click="toggleOverwritePopup">Cancel</button>
              <button class="button-save" @click="onPressOverwriteSave">Yes</button>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Delete Backup Popup -->
    <div id="delete-character">
        <transition name="fade" appear>
          <div class="overlay" v-if="isShowingDeleteBackupPopup">
            <div class="popup">
              <div class="form">
                <h1>Delete backup for {{ characterToView.name }}?</h1>
                <p class="popup-message">This action can't be undone</p>
                <div class="buttons-delete-character">
                  <button class="button-cancel-delete" @click="toggleDeleteBackupPopup">Cancel</button>
                  <button class="button-delete" @click="onPressDeleteBackup">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

    <div v-if="isShowingLoader">
      <loading-spinner :loading-text="loadingText"></loading-spinner>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue';
import LoadingSpinner from './LoadingSpinner.vue';
import Character from '@/models/character'
import { CHARACTER_SECTIONS } from "@/enums/character-sections"
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
import { SPELL_CASTING_KEYS, SPELL_CASTING_LEVELS, SPELL_CASTING_NAMES, SPELL_CASTING_NAMES_PICKER } from '@/enums/dbKeys/spell-casting-keys'
import { WEAPON_KEYS, WEAPON_CATEGORY, WEAPON_PROPERTY, WEAPON_NAMES } from '@/enums/dbKeys/weapons-keys' 
import { LOADING_TEXT } from '@/enums/loading-text';

const TIMEOUT_LOADER = 500
const TIMEOUT_TRANSITION = 200

export default {
  components: {
    CollapseTransition,
    LoadingSpinner
  },
  props: {
    backups: {
      type:[Object],
      required: true
    },
    timeOfBackup: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      store: useStore(),
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
      isShowingSpellSlots: true,
      isShowingSpells: true,
      isShowingOverwritePopup: false,
      isShowingDeleteBackupPopup: false,
      isShowingLoader: false,
      isShowingJumpToMenu: false,
      CHARACTER_SECTIONS: CHARACTER_SECTIONS,
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
      WEAPON_KEYS: WEAPON_KEYS,
      WEAPON_CATEGORY: WEAPON_CATEGORY,
      WEAPON_PROPERTY: WEAPON_PROPERTY,
      WEAPON_NAMES: WEAPON_NAMES,
      WEAPON_MODS: ['', STAT_KEYS.STRENGTH, STAT_KEYS.DEXTERITY, STAT_KEYS.CONSTITUTION, STAT_KEYS.INTELLIGENCE, STAT_KEYS.WISDOM, STAT_KEYS.CHARISMA],
      loadingText: '',
      characterToView: new Character(),
    }
  },
  mounted() {
    this.characterToView = Character.convertCharacterToObj(this.backups[this.timeOfBackup])
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    closeModalFromOverwrite() {
      this.$emit('close', this.characterToView)
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
    onPressOverwriteSave() {
      this.loadingText = LOADING_TEXT.SAVING_BACKUP
      this.toggleOverwritePopup()
      this.isShowingLoader = true

      const payload = {
        charId: this.characterToViewId,
        characterToView: this.characterToView
      }

      this.store.dispatch("overwriteCharacterFromBackup", payload).then((success) => {
        if (success) {
          alert("Overwrote Backup")
          
          setTimeout(() => {
            this.isShowingLoader = false
            setTimeout(() => {
              this.closeModalFromOverwrite()
            }, TIMEOUT_TRANSITION);
          }, TIMEOUT_LOADER);
        } else {
          alert("Couldn't delete back up for some reason")
          setTimeout(() => {
            this.isShowingLoader = false
            setTimeout(() => {
              this.closeModal()
            }, TIMEOUT_TRANSITION);
          }, TIMEOUT_LOADER);
        }
      })
      .catch((error) => {
        alert("Couldn't delete back up for reason:", error)
        setTimeout(() => {
          this.isShowingLoader = false
          setTimeout(() => {
            this.closeModal()
          }, TIMEOUT_TRANSITION);
        }, TIMEOUT_LOADER);
      })
    },
    onPressDeleteBackup() {
      this.loadingText = LOADING_TEXT.DELETE_BACKUP
      this.toggleDeleteBackupPopup()
      this.isShowingLoader = true
      
      const payload = {
        charId: this.characterToViewId,
        timestamp: this.timeOfBackup
      }
      
      this.store.dispatch("deleteBackupFromDb", payload).then((success) => {
        if (success) {
          alert("Deleted Backup")
          setTimeout(() => {
            this.isShowingLoader = false
            setTimeout(() => {
              this.closeModal()
            }, 200);
          }, 1000);
        } else {
          alert("Couldn't delete back up for some reason")
          setTimeout(() => {
            this.isShowingLoader = false
            setTimeout(() => {
              this.closeModal()
            }, 200);
          }, 1000);
        }
      })
      .catch((error) => {
        alert("Couldn't delete back up for reason:", error)
        setTimeout(() => {
          this.isShowingLoader = false
          setTimeout(() => {
            this.closeModal()
          }, 200);
        }, 1000);
      })
      
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

        case CHARACTER_KEYS.SPELL_SLOTS:
          this.isShowingSpellSlots = !this.isShowingSpellSlots
          break
        
        case CHARACTER_KEYS.SPELLS:
          this.isShowingSpells = !this.isShowingSpells
          break

        
        default:
          this.isShowingCharacterInfo = !this.isShowingCharacterInfo
      }
    },
    toggleOverwritePopup() {
      this.isShowingOverwritePopup = !this.isShowingOverwritePopup
    },
    toggleDeleteBackupPopup() {
      this.isShowingDeleteBackupPopup = !this.isShowingDeleteBackupPopup
    },
    isPopupOpen() {
      return this.isShowingOverwritePopup || this.isShowingDeleteBackupPopup
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
  }
}
</script>

<style scoped>
@import '../styles/reset.css';
/* @import '../styles/character-info-scores.css'; */
/* @import '../styles/popup.css'; */
/* @import '../styles/transitions.css'; */


</style>