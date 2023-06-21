<template>
  <div>
    <template v-if="listOfCharacters">
      <div class="list-container-characters">
        <ul class="list-characters">
          <li v-for="(character, id) in listOfCharacters" :key="id">
            <div @click="onPressCharacterSummary(id)">
              <div style="display: flex; flex-direction: row; justify-content: space-between;">
                <label class="summary-name">{{ character[CHARACTER_KEYS.NAME] }}</label>
                <label class="summary-amount" style="white-space: nowrap;">Level: {{ character[CHARACTER_KEYS.LEVEL] }}</label>
              </div>
              
              <label class="summary-description">{{ character[CHARACTER_KEYS.CLASS] }}</label>
              <label class="summary-description">{{ character[CHARACTER_KEYS.RACE] }}</label>
              <label class="summary-description">Current HP: {{ character[CHARACTER_KEYS.HP][HP_KEYS.CURRENT] }}</label>
              <!-- <label class="summary-description">Campaign: {{ character[CHARACTER_KEYS.CAMPAIGNS] }}</label> -->
            </div>
          </li>
        </ul>
      </div>
    </template>

    <template v-if="character">
      <div @click="onPressCharacterSummary(id)">
        <div style="display: flex; flex-direction: row; justify-content: space-between;">
          <label class="summary-name">{{ character[CHARACTER_KEYS.NAME] }}</label>
          <label class="summary-amount" style="white-space: nowrap;">Level: {{ character[CHARACTER_KEYS.LEVEL] }}</label>
        </div>
        
        <label class="summary-description">{{ character[CHARACTER_KEYS.CLASS] }}</label>
        <label class="summary-description">{{ character[CHARACTER_KEYS.RACE] }}</label>
        <label class="summary-description">Current HP: {{ character[CHARACTER_KEYS.HP][HP_KEYS.CURRENT] }}</label>
        <!-- <label class="summary-description">Campaign: {{ character[CHARACTER_KEYS.CAMPAIGNS] }}</label> -->
      </div>
    </template>
  </div>
</template>

<script>

import { CHARACTER_KEYS } from '@/enums/dbKeys/character-keys.js'
import { HP_KEYS } from '@/enums/dbKeys/hp-keys.js'

export default {
  props: {
    listOfCharacters: {
      type: Object,
    },
    character: {
      type: Object
    }
  },
  data() {
    return {
      CHARACTER_KEYS: CHARACTER_KEYS,
      HP_KEYS: HP_KEYS,
    }
  },
  mounted() {
    // console.info('listOfCharacters:', this.listOfCharacters)
    // console.info('character:', this.character)
  },
  methods: {
    onPressCharacterSummary(charId) {
      this.$emit('openModal', charId)
    },
    getDictionarySize(dict) {
      if (dict) {
        const count = Object.keys(dict).length;
        return count
      } else {
        return 0
      }
    },
  }
}
</script>

<style scoped>
@import '../syles/character-summary.css';
</style>