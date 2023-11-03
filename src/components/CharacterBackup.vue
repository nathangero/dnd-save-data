<template>
  <div class="body">
    <transition name="slide-up" mode="out-in">
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
          <p class="nav-bar-text">Backup</p>
          <button class="nav-bar-button" @click="closeModal">Close</button>
        </nav>

        <section id="character-background">
          <h1>Backup from:</h1>
          <h1>{{ convertTimestampToString(timeOfBackup) }}</h1>
          <hr>

          <h1>{{ characterToView.name }}</h1>
          <p>{{ characterToView.class }}</p>
          <p>{{ characterToView.background }}</p>
          <p>{{ characterToView.race }}</p>
          <p>{{ characterToView.alignment }}</p>
        </section>
      </header>
    </transition>

    <main v-if="characterToView.name !== ''" :class="{ 'disabled-page': isPopupOpen() }">
      <br>
      <section id="character-info">
        <header>
          <div class="section-title">
            <h2 @click="toggleCollapseForSection(CHARACTER_SECTIONS.CHARACTER_INFO)">{{ CHARACTER_SECTIONS.CHARACTER_INFO }}</h2>
            <font-awesome-icon icon="chevron-up" class="collapse-chevron" v-if="!isShowingCharacterInfo"/>
            <font-awesome-icon icon="chevron-down" class="collapse-chevron" v-if="isShowingCharacterInfo"/>
          </div>
        </header>

        <collapse-transition dimension="height">
          <div v-if="isShowingCharacterInfo"> 
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
        </collapse-transition>

      </section>
      <hr>

      <br>
      <section id="ability-scores">
        <header>
          <div class="section-title">
            <h2 @click="toggleCollapseForSection(CHARACTER_SECTIONS.ABILITY_SCORES)">{{ CHARACTER_SECTIONS.ABILITY_SCORES }}</h2>
            <font-awesome-icon icon="chevron-up" class="collapse-chevron" v-if="!isShowingAbilityScores"/>
            <font-awesome-icon icon="chevron-down" class="collapse-chevron" v-if="isShowingAbilityScores"/>
          </div>
        </header>
        
        <collapse-transition dimension="height">
          <div v-if="isShowingAbilityScores">
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
        </collapse-transition>
      </section>
      <hr>

      <br>
      <section id="saving-throws">
        <header>
          <div class="section-title">
            <h2 @click="toggleCollapseForSection(CHARACTER_SECTIONS.SAVING_THROWS)">{{ CHARACTER_SECTIONS.SAVING_THROWS }}</h2>
            <font-awesome-icon icon="chevron-up" class="collapse-chevron" v-if="!isShowingSavingThrows"/>
            <font-awesome-icon icon="chevron-down" class="collapse-chevron" v-if="isShowingSavingThrows"/>
          </div>
        </header>

        <collapse-transition dimension="height">
          <div v-if="isShowingSavingThrows">
            <ul>
              <li v-for="(stat, key) in STAT_KEYS" :key="key">
                <div>
                  <input type="checkbox" class="checkbox" v-model="characterToView.savingThrows[stat].proficient" disabled>
                  <label>{{ STAT_NAMES[stat] }}:</label>
                </div>

                <label v-if="characterToView.savingThrows[stat].proficient">
                  <strong>{{ getStatBonusSign(characterToView.scores[stat].calculateMod() + getProficiencyBonus()) }}</strong>
                </label>
                <label v-if="!characterToView.savingThrows[stat].proficient">
                  <strong>{{ getStatBonusSign(characterToView.scores[stat].calculateMod()) }}</strong>
                </label>
              </li>
            </ul>
          </div>
        </collapse-transition>
      </section>
      <hr>
      
      <br>
      <section id="skills">
        <header>
          <div class="section-title">
            <h2 @click="toggleCollapseForSection(CHARACTER_SECTIONS.SKILLS)">{{ CHARACTER_SECTIONS.SKILLS }}</h2>
            <font-awesome-icon icon="chevron-up" class="collapse-chevron" v-if="!isShowingSkills"/>
            <font-awesome-icon icon="chevron-down" class="collapse-chevron" v-if="isShowingSkills"/>
          </div>
        </header>

        <collapse-transition dimension="height">
          <div v-if="isShowingSkills">
            <ul>
              <li v-for="(skill, key) in SKILL_KEYS" :key="key">
                  <div>
                    <input type="checkbox" class="checkbox" v-model="characterToView.skills[skill].proficient" disabled>
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
            </ul>
          </div>
        </collapse-transition>
        
      </section>
      <hr>

      <br>
      <section id="features-traits">
        <header>
          <div class="section-title">
            <h2 @click="toggleCollapseForSection(CHARACTER_SECTIONS.FEATURES_TRAITS)">{{ CHARACTER_SECTIONS.FEATURES_TRAITS }}</h2>
            <font-awesome-icon icon="chevron-up" class="collapse-chevron" v-if="!isShowingFeatures"/>
            <font-awesome-icon icon="chevron-down" class="collapse-chevron" v-if="isShowingFeatures"/>
          </div>
        </header>

        <collapse-transition dimension="height">
          <div v-if="isShowingFeatures">
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
            </template>
          </div>
        </collapse-transition>
        
      </section>
      <hr>

      <br>
      <section id="weapons">
        <header>
          <div class="section-title">
            <h2 @click="toggleCollapseForSection(CHARACTER_SECTIONS.WEAPONS)">{{ CHARACTER_SECTIONS.WEAPONS }}</h2>
            <font-awesome-icon icon="chevron-up" class="collapse-chevron" v-if="!isShowingWeapons"/>
            <font-awesome-icon icon="chevron-down" class="collapse-chevron" v-if="isShowingWeapons"/>
          </div>
        </header>

        <collapse-transition dimension="height">
          <div v-if="isShowingWeapons">
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
            </template>
          </div>
        </collapse-transition>
      </section>
      <hr>

      <br>
      <section id="equipment">
        <header>
          <div class="section-title">
            <h2 @click="toggleCollapseForSection(CHARACTER_SECTIONS.EQUIPMENT)">{{ CHARACTER_SECTIONS.EQUIPMENT }}</h2>
            <font-awesome-icon icon="chevron-up" class="collapse-chevron" v-if="!isShowingEquipment"/>
            <font-awesome-icon icon="chevron-down" class="collapse-chevron" v-if="isShowingEquipment"/>
          </div>
        </header>

        <collapse-transition dimension="height">
          <div v-if="isShowingEquipment">
            <template v-if="getDictionarySize(characterToView.equipment) > 0">
              <div class="viewing" v-if="!isEditingEquipment">
                <ul>
                  <li><label class="name-and-count"><strong>Gold</strong>&emsp;x{{ characterToView.gold }}</label></li>
                </ul>
                <ul v-for="(item, key) in characterToView.equipment" :key="key">
                  <li>
                    <label class="name-and-count"><strong>{{ key }}</strong>&emsp;x{{ item[EQUIPMENT_KEYS.AMOUNT] }}</label>
                    <p class="description">{{ item[EQUIPMENT_KEYS.DESCRIPTION] }}</p>
                  </li>

                  <hr class="list-divider">
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
          <div class="section-title">
            <h2 @click="toggleCollapseForSection(CHARACTER_SECTIONS.TREASURES)">{{ CHARACTER_SECTIONS.TREASURES }}</h2>
            <font-awesome-icon icon="chevron-up" class="collapse-chevron" v-if="!isShowingTreasure"/>
            <font-awesome-icon icon="chevron-down" class="collapse-chevron" v-if="isShowingTreasure"/>
          </div>
        </header>

        <collapse-transition dimension="height">
          <div v-if="isShowingTreasure">
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
            </template>
          </div>
        </collapse-transition>

      </section>
      <hr>
      
      <br>
      <section id="languages">
        <header>
          <div class="section-title">
            <h2 @click="toggleCollapseForSection(CHARACTER_SECTIONS.LANGUAGES)">{{ CHARACTER_SECTIONS.LANGUAGES }}</h2>
            <font-awesome-icon icon="chevron-up" class="collapse-chevron" v-if="!isShowingLanguages"/>
            <font-awesome-icon icon="chevron-down" class="collapse-chevron" v-if="isShowingLanguages"/>
          </div>
        </header>

        <div id="collapse">
          <collapse-transition dimension="height">
            <div v-if="isShowingLanguages">
              <template v-if="getDictionarySize(characterToView.languages) > 0">
                <div class="viewing" v-if="!isEditingLanguages">
                  <ul v-for="(item, key) in characterToView.languages" :key="key">
                    <li class="inline">
                      <label><strong>{{ key }}</strong>:</label>
                      <p>{{ item }}</p>
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
          <div class="section-title">
            <h2 @click="toggleCollapseForSection(CHARACTER_SECTIONS.PROFICIENCIES)">{{ CHARACTER_SECTIONS.PROFICIENCIES }}</h2>
            <font-awesome-icon icon="chevron-up" class="collapse-chevron" v-if="!isShowingProficiencies"/>
            <font-awesome-icon icon="chevron-down" class="collapse-chevron" v-if="isShowingProficiencies"/>
          </div>
        </header>

        <collapse-transition dimension="height">
          <div v-if="isShowingProficiencies">
            <template v-if="getDictionarySize(characterToView.proficiencies) > 0">
              <div class="viewing" v-if="!isEditingProficiencies">
                <ul v-for="(item, key) in characterToView.proficiencies" :key="key">
                  <li>
                    <label class="name-and-count"><strong>{{ key }}</strong></label>
                    <p class="description">{{ item }}</p>
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
          <div class="section-title">
            <h2 @click="toggleCollapseForSection(CHARACTER_SECTIONS.SPELL_SLOTS)">{{ CHARACTER_SECTIONS.SPELL_SLOTS }}</h2>
            <font-awesome-icon icon="chevron-up" class="collapse-chevron" v-if="!isShowingSpellSlots"/>
            <font-awesome-icon icon="chevron-down" class="collapse-chevron" v-if="isShowingSpellSlots"/>
          </div>
        </header>

        <collapse-transition dimension="height">
          <div v-if="isShowingSpellSlots">
            <template v-if="getDictionarySize(characterToView.spellSlots) > 0">
              <div class="viewing" v-if="!isEditingSpellSlots">
                <ul v-for="(item, key) in characterToView.spellSlots" :key="key">
                  <li class="inline">
                    <label><strong>{{ SPELL_CASTING_NAMES[key] }}</strong>:</label>
                    <label>{{ item[SPELL_SLOT_KEYS.MAX] }} slots</label>
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
          <div class="section-title">
            <h2 @click="toggleCollapseForSection(CHARACTER_SECTIONS.SPELL_CASTING)">{{ CHARACTER_SECTIONS.SPELL_CASTING }}</h2>
            <font-awesome-icon icon="chevron-up" class="collapse-chevron" v-if="!isShowingSpells"/>
            <font-awesome-icon icon="chevron-down" class="collapse-chevron" v-if="isShowingSpells"/>
          </div>
        </header>

        <collapse-transition dimension="height">
          <div v-if="isShowingSpells">
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
        <ul class="popup-buttons">
          <li>
            <button class="button-delete" @click="toggleDeleteBackupPopup">Delete Backup</button>
            <button class="button-backup" @click="toggleOverwritePopup">Use this Backup</button>
          </li>
        </ul>
      </section>
    </main>

    <!-- Overwrite Data Popup -->
    <div class="popup-overlay"  v-if="isShowingOverwritePopup">
      <transition name="fade" appear>
        <div class="popup-character-action">
          <h1>Overwrite existing data for <strong>{{ characterToView.name }}</strong>?</h1>
          <p>This action can't be undone</p>
          <div class="popup-buttons">
            <button class="button-cancel" @click="toggleOverwritePopup"><strong>Cancel</strong></button>
            <button class="button-backup" @click="onPressOverwriteSave">Yes</button>
          </div>
        </div>
      </transition>
    </div>

    <!-- Delete Backup Popup -->
    <div class="popup-overlay"  v-if="isShowingDeleteBackupPopup">
      <transition name="fade" appear>
        <div class="popup-character-action">
          <h1>Delete backup for <strong>{{ characterToView.name }}</strong>?</h1>
          <p>This action can't be undone</p>
          <div class="popup-buttons">
            <button class="button-cancel" @click="toggleDeleteBackupPopup"><strong>Cancel</strong></button>
            <button class="button-delete" @click="onPressDeleteBackup">Yes</button>
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
import { SKILL_KEYS, SKILL_NAMES, SKILL_NAME_SCORES, SKILL_MODS } from '@/enums/dbKeys/skill-keys.js'
import { STAT_KEYS, STAT_VALUES_KEYS, STAT_NAMES } from '@/enums/dbKeys/stat-keys.js'
import { SPELL_CASTING_KEYS, SPELL_CASTING_LEVELS, SPELL_CASTING_NAMES, SPELL_CASTING_NAMES_PICKER } from '@/enums/dbKeys/spell-casting-keys'
import { SPELL_SLOT_KEYS } from '@/enums/dbKeys/spell-slot-keys'
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
      SKILL_NAME_SCORES: SKILL_NAME_SCORES,
      SKILL_KEYS: SKILL_KEYS,
      SKILL_NAMES: SKILL_NAMES,
      SKILL_MODS: SKILL_MODS,
      SPELL_CASTING_KEYS: SPELL_CASTING_KEYS,
      SPELL_CASTING_LEVELS: SPELL_CASTING_LEVELS,
      SPELL_CASTING_NAMES: SPELL_CASTING_NAMES,
      SPELL_CASTING_NAMES_PICKER: SPELL_CASTING_NAMES_PICKER,
      SPELL_SLOT_KEYS: SPELL_SLOT_KEYS,
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
    window.scrollTo(0,0);
    this.characterToView = Character.convertCharacterToObj(this.backups[this.timeOfBackup])
    // console.log("this.characterToView:", this.characterToView)
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

  h1 {
    font-size: 2.5em;
  }

  p {
    display: inherit;
    align-items: center;
    font-size: var(--stat-font-size);
  }

  ul {
    list-style: none;
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

  nav .nav-bar-text {
    margin: 0;
    justify-content: baseline;
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

  section .viewing {
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

  .viewing-spells ul {
    width: 100%;
  }

  .viewing-spells li {
    display: flex;
    justify-content: space-between;
  }

  .viewing-spells .spell-level {
    text-decoration: underline;
    justify-content: center;
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
  
  .popup-buttons button {
    color: var(--white);
    padding: 5px 10px;
    margin: 10px;
    border: none;
    border-radius: var(--border-radius);
    font-size: var(--stat-font-size);
    width: 70%;
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

  @media (prefers-color-scheme: dark) {
    nav {
      background-color: rgb(49, 49, 49);
    }
    nav .jump-to-menu {
      background-color: var(--black);
      border-radius: 0 0 var(--border-radius) 0;
    }

    .body {
      background-color: black;
      color: white;
    }

    .popup-character-action {
      background-color: var(--black);
      border: 2px solid var(--white)
    }
  }
</style>