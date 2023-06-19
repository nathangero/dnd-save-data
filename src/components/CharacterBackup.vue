<template>
  <div class="body">
    <div id="character-info" v-if="characterToView[CHARACTER_KEYS.NAME] !== ''">
      <p class="character-name">{{ characterToView[CHARACTER_KEYS.NAME] }}</p>

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
                  <label class="stat-label">Spell `Ca`sting Stat: </label>
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
                  <label class="stat-label">{{ STAT_NAMES[stat] }}:</label>
                  <label class="stat-value">{{ getStatValue(CHARACTER_KEYS.STATS, stat, STAT_VALUES_KEYS.VALUE) }}</label>
                  <label class="stat-bonus">{{ getStatBonusSign(getStatValue(CHARACTER_KEYS.STATS, stat, STAT_VALUES_KEYS.MOD)) }}</label>
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
                  <input type="checkbox" class="checkbox" v-model="characterToView[CHARACTER_KEYS.SAVING_THROWS][stat][STAT_VALUES_KEYS.PROFICIENT]" :disabled="true">
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
                  <input type="checkbox" class="checkbox" v-model="characterToView[CHARACTER_KEYS.SKILLS][skill][STAT_VALUES_KEYS.PROFICIENT]" :disabled="true">
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
          </div>
        </collapse-transition>
        
      </div>

      <br>
      <div id="features-traits">
        <div class="h3-bar">
          <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.FEATURES)">Features & Traits</h3>
          <font-awesome-icon icon="chevron-up" v-if="!isShowingFeatures" class="collapse-chevron"/>
          <font-awesome-icon icon="chevron-down" v-if="isShowingFeatures" class="collapse-chevron"/>
        </div>

        <collapse-transition dimension="height">
          <div v-if="isShowingFeatures">
            <template v-if="getDictionarySize(characterToView[CHARACTER_KEYS.FEATURES]) > 0">
              <div>
                <ul class="list">
                  <li v-for="(item, key) in characterToView[CHARACTER_KEYS.FEATURES]" :key="key">
                    <label class="item-name">{{ key }}</label>
                    <label class="item-amount">x{{ item[FEATURES_KEYS.USES] }}</label>
                    <p class="item-description" style="margin-bottom: 5px;">Type: {{ item[FEATURES_KEYS.TYPE] }}</p>
                    <p class="item-description">{{ item[FEATURES_KEYS.DESCRIPTION] }}</p>
                  </li>
                </ul>
              </div>
            </template>
          </div>
        </collapse-transition>
        
      </div>

      <br>
      <div id="weapons">
        <div class="h3-bar">
          <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.WEAPONS)">Weapons & Spells</h3>
          <font-awesome-icon icon="chevron-up" v-if="!isShowingWeapons" class="collapse-chevron"/>
          <font-awesome-icon icon="chevron-down" v-if="isShowingWeapons" class="collapse-chevron"/>
        </div>

        <collapse-transition dimension="height">
          <div v-if="isShowingWeapons">
            <template v-if="getDictionarySize(characterToView[CHARACTER_KEYS.WEAPONS]) > 0">
              <div>
                <ul class="list">
                  <li v-for="(item, key) in characterToView[CHARACTER_KEYS.WEAPONS]" :key="key">
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
                  </li>
                </ul>
              </div>
            </template>
          </div>
        </collapse-transition>
      </div>

      <br>
      <div id="equipment">
        <div class="h3-bar">
          <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.EQUIPMENT)">Equipment</h3>
          <font-awesome-icon icon="chevron-up" v-if="!isShowingEquipment" class="collapse-chevron"/>
          <font-awesome-icon icon="chevron-down" v-if="isShowingEquipment" class="collapse-chevron"/>
        </div>

        <collapse-transition dimension="height">
          <div v-if="isShowingEquipment">
            <template v-if="getDictionarySize(characterToView[CHARACTER_KEYS.EQUIPMENT]) > 0">
              <div>
                <ul class="list">
                  <li style="text-align: left; margin-bottom: 20px">
                    <label class="item-name">Gold:</label>
                    <label class="item-amount">x{{ characterToView[CHARACTER_KEYS.GOLD] }}</label>
                  </li>
                  
                  <li v-for="(item, key) in characterToView[CHARACTER_KEYS.EQUIPMENT]" :key="key">
                    <label class="item-name">{{ key }}</label>
                    <label class="item-amount">x{{ item[EQUIPMENT_KEYS.AMOUNT] }}</label>
                    <p class="item-description">{{ item[EQUIPMENT_KEYS.DESCRIPTION] }}</p>
                  </li>
                </ul>
              </div>
            </template>
          </div>
        </collapse-transition>
      </div>

      <br>
      <div id="treasure">
        <div class="h3-bar">
          <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.TREASURES)">Treasures</h3>
          <font-awesome-icon icon="chevron-up" v-if="!isShowingTreasure" class="collapse-chevron"/>
          <font-awesome-icon icon="chevron-down" v-if="isShowingTreasure" class="collapse-chevron"/>
        </div>

        <collapse-transition dimension="height">
          <div v-if="isShowingTreasure">
            <template v-if="getDictionarySize(characterToView[CHARACTER_KEYS.TREASURES]) > 0">
              <div>
                <ul class="list">
                  <li v-for="(item, key) in characterToView[CHARACTER_KEYS.TREASURES]" :key="key">
                    <label class="item-name">{{ key }}</label>
                    <label class="item-amount">x{{ item[EQUIPMENT_KEYS.AMOUNT] }}</label>
                    <p class="item-description">{{ item[EQUIPMENT_KEYS.DESCRIPTION] }}</p>
                  </li>
                </ul>
              </div>
            </template>
          </div>
        </collapse-transition>
      </div>
      
      <br>
      <div id="languages">
        <div class="h3-bar">
          <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.LANGUAGES)">Languages</h3>
          <font-awesome-icon icon="chevron-up" v-if="!isShowingLanguages" class="collapse-chevron"/>
          <font-awesome-icon icon="chevron-down" v-if="isShowingLanguages" class="collapse-chevron"/>
        </div>

        <collapse-transition dimension="height">
          <div v-if="isShowingLanguages">
            <template v-if="getDictionarySize(characterToView[CHARACTER_KEYS.LANGUAGES]) > 0">
              <ul>
                <li v-for="(item, key) in characterToView[CHARACTER_KEYS.LANGUAGES]" :key="key">
                  <div class="language-group">
                    <p class="language-label">{{ key }}:</p>
                    <p class="language-value">{{ item }}</p>
                  </div>                    
                </li>
              </ul>
            </template>
          </div>
        </collapse-transition>
        
      </div>      

      <br>
      <div id="proficiences">
        <div class="h3-bar">
          <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.PROFICIENCIES)">Proficiencies</h3>
          <font-awesome-icon icon="chevron-up" v-if="!isShowingProficiencies" class="collapse-chevron"/>
          <font-awesome-icon icon="chevron-down" v-if="isShowingProficiencies" class="collapse-chevron"/>
        </div>
        
        <collapse-transition dimension="height">
          <div v-if="isShowingProficiencies">
            <template v-if="getDictionarySize(characterToView[CHARACTER_KEYS.PROFICIENCIES]) > 0">
              <ul class="list">
                <li v-for="(item, key) in characterToView[CHARACTER_KEYS.PROFICIENCIES]" :key="key">
                  <label class="item-name">{{ key }}</label>
                  <p class="item-description">{{ item }}</p>
                </li>
              </ul>
            </template>
          </div>
        </collapse-transition>
      </div>

      <br>
      <div id="spell-casting">
        <div class="h3-bar">
          <h3 @click="toggleCollapseForStat(CHARACTER_KEYS.SPELLS)">Spell Casting</h3>
          <font-awesome-icon icon="chevron-up" v-if="!isShowingSpells" class="collapse-chevron"/>
          <font-awesome-icon icon="chevron-down" v-if="isShowingSpells" class="collapse-chevron"/>
        </div>

        <collapse-transition dimension="height">
          <div v-if="isShowingSpells">
            <template v-if="getDictionarySize(characterToView[CHARACTER_KEYS.SPELLS]) > 0">
              <ul class="list">
                <li v-for="(levelDict, level) in characterToView[CHARACTER_KEYS.SPELLS]" :key="level">
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
      </div>
    </div>

    <loading-spinner :loadingText="LOADING_TEXT.SAVING_BACKUP"></loading-spinner>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue';
import LoadingSpinner from './LoadingSpinner.vue';
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

export default {
  components: {
    CollapseTransition,
    LoadingSpinner
  },
  props: {
    timeOfBackup: { // TODO
      type: String,
      required: true
    },
    characterBackup: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      store: useStore(),
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
      SPELL_CASTING_KEYS: SPELL_CASTING_KEYS,
      SPELL_CASTING_LEVELS: SPELL_CASTING_LEVELS,
      SPELL_CASTING_NAMES: SPELL_CASTING_NAMES,
      SPELL_CASTING_NAMES_PICKER: SPELL_CASTING_NAMES_PICKER,
      WEAPON_KEYS: WEAPON_KEYS,
      WEAPON_CATEGORY: WEAPON_CATEGORY,
      WEAPON_PROPERTY: WEAPON_PROPERTY,
      WEAPON_NAMES: WEAPON_NAMES,
      WEAPON_MODS: ['', STAT_KEYS.STRENGTH, STAT_KEYS.DEXTERITY, STAT_KEYS.CONSTITUTION, STAT_KEYS.INTELLIGENCE, STAT_KEYS.WISDOM, STAT_KEYS.CHARISMA],
    }
  },
  methods: {
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
  }
}
</script>

<style scoped>

</style>