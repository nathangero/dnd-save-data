<template>
  <div class="d-flex justify-content-center">
    <template v-if="listOfCharacters">
      <div class="d-flex flex-column w-75 justify-content-center p-0 m-auto">
        <ul class="p-0" v-for="(character, id) in listOfCharacters" :key="id">
          <li class="card border border-dark border-4 p-0 m-0 custom-card" @click="onPressCharacterSummary(id)">
            <div class="card-header pb-0 border-0">
              <div class="d-flex justify-content-between text-dark mb-0 border-0">
                <p class="fs-1 mb-1 border-0"><strong>{{ character.name }}</strong></p>
                <p class="fs-2 mt-1 mb-0 border-0">Level: {{ character.level }}</p>
              </div>
            </div>
            <div class="card-body d-flex flex-column text-start py-0">
              <p class="fs-3 p-0 mb-2">{{ character.class }}</p>
              <p class="fs-3 p-0 mb-2">{{ character.race }}</p>
              <p class="fs-3 p-0 mb-0 border-0">HP: {{ character.hp[HP_KEYS.CURRENT] }}/{{ character.hp[HP_KEYS.MAX] }}</p>
            </div>
          </li>
        </ul>
      </div>
    </template>

    <template v-if="character">
      <div id="character-card" class="card w-100 border border-4 custom-card">
        <div class="card-header pb-0 border-0">
          <div class="d-flex justify-content-between text-dark mb-0 border-0">
            <p class="fs-1 mb-1 border-0"><strong>{{ character.name }}</strong></p>
            <p class="fs-2 mt-1 mb-0 border-0">Level: {{ character.level }}</p>
          </div>
        </div>
        <div class="card-body d-flex flex-column text-start py-0">
          <p class="fs-3 p-0 mb-2">{{ character.class }}</p>
          <p class="fs-3 p-0 mb-2">{{ character.race }}</p>
          <p class="fs-3 p-0 mb-0 border-0">HP: {{ character.hp[HP_KEYS.CURRENT] }}/{{ character.hp[HP_KEYS.MAX] }}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>

import Character from '@/models/character'
import { CHARACTER_KEYS } from '@/enums/dbKeys/character-keys.js'
import { HP_KEYS } from '@/enums/dbKeys/hp-keys.js'

export default {
  props: {
    listOfCharacters: {
      type: Object,
    },
    character: {
      type: Character
    }
  },
  data() {
    return {
      CHARACTER_KEYS: CHARACTER_KEYS,
      HP_KEYS: HP_KEYS,
    }
  },
  mounted() {
    // let card = document.getElementById("character-card")
    // if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //   console.log(card.attributes[2].value)
    //   card.attributes[2].value = "card w-75 border border-light border-4 custom-card"
    //   console.log(card.attributes[2].value)
    // } else {
    //   console.log(card.attributes[2].value)
    //   card.attributes[2].value = "card w-75 border border-dark border-4 custom-card"
    //   console.log(card.attributes[2].value)
    // }
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



li {
  list-style-type: none;
}

.custom-card {
  border-radius: var(--border-radius);
}

/* @media (prefers-color-scheme: dark) {
  .custom-card {
    background-color: black;
    color: white;
  }
} */
</style>