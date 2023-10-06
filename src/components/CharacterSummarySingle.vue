<template>
  <div class="d-flex justify-content-center body p-0">
    <template v-if="character">
      <div id="card-container-single" class="d-flex flex-column w-100 justify-content-center p-0 m-0"></div>
    </template>
  </div>
</template>

<script>

import Character from '@/models/character'
import THEME_LIGHT from '@/enums/styles/theme-light.js'
import THEME_DARK from '@/enums/styles/theme-dark.js'
import { CHARACTER_KEYS } from '@/enums/dbKeys/character-keys.js'
import { HP_KEYS } from '@/enums/dbKeys/hp-keys.js'

export default {
  props: {
    character: {
      type: Character
    },
    characterBackupId: {
      type: String
    }
  },
  data() {
    return {
      darkModeMediaQuery: window.matchMedia('(prefers-color-scheme: dark)'),
      isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
      CHARACTER_KEYS: CHARACTER_KEYS,
      HP_KEYS: HP_KEYS,
      THEME_LIGHT: THEME_LIGHT,
      THEME_DARK: THEME_DARK
    }
  },
  created() {

  },
  mounted: function() {
  this.isDarkMode = this.darkModeMediaQuery.matches;
  
    if (this.character) {
      // Make into an object
      let charObject = { [this.characterBackupId]: Character.convertCharacterToObj(this.character) }
      this.setupCharacters(charObject)
    }

    this.setThemeListener()
  },
  watch: {

  },
  methods: {
    setThemeListener() {
      // Watch for changes
      this.darkModeMediaQuery.addEventListener("change", () => {
        // Remove the existing cards
        if (document.getElementById("card-container-single")) {
          document.getElementById("card-container-single").children[0].remove()
          if (this.character) {
            let charObject = { [this.characterBackupId]: Character.convertCharacterToObj(this.character) }
            this.setupCharacters(charObject)
          }        
        }
      })
    },
    setupCharacters(characters) {
      let isDarkMode = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? true : false
      // console.log("@Character Summary dark mode?", isDarkMode)

      let cardContainer = document.getElementById("card-container-single")
      let cards = document.createElement("ul")
      cards.setAttribute("id", "character-list")
      cards.setAttribute("class", "p-0")

      for(const id in characters) {
        let character = characters[id]

        let card = this.setupCard(isDarkMode, id)
        let cardHeader = this.setupCardHeader(character)
        let cardBody = this.setupCardBody(character)

        card.append(cardHeader, cardBody)
        cards.appendChild(card)
        cardContainer.appendChild(cards)
        break
      }
    },
    setupCard(isDarkMode, id) {
      let card = document.createElement("li")
      card.setAttribute("id", "character-card")
      card.setAttribute("class", isDarkMode ? THEME_DARK.CARD : THEME_LIGHT.CARD)
      card.addEventListener("click", (event) => {
        event.preventDefault()
        this.onPressCharacterSummary(id)
      })
      
      return card
    },
    setupCardHeader(character) {
      let cardHeader = document.createElement("div")
      cardHeader.setAttribute("class", "card-header d-flex justify-content-between pb-0 mb-0 border-0")

      let name = document.createElement("p")
      name.setAttribute("class", "fs-1 mb-1")
      name.innerHTML = `<strong>${character.name}</strong>`

      let level = document.createElement("p")
      level.setAttribute("class", "fs-2 mt-1 mb-0")
      level.innerHTML = "Level: " + character.level

      cardHeader.append(name, level)
      return cardHeader
    },
    setupCardBody(character) {
      let cardBody = document.createElement("div")
      cardBody.setAttribute("class", "card-body d-flex flex-column text-start py-0")

      let charClass = document.createElement("p")
      charClass.setAttribute("class", "fs-3 p-0 mb-2")
      charClass.innerHTML = character.class

      let race = document.createElement("p")
      race.setAttribute("class", "fs-3 p-0 mb-2")
      race.innerHTML = character.race

      let hp = document.createElement("p")
      hp.setAttribute("class", "fs-3 p-0 mb-0")
      hp.innerHTML = `HP: ${character.hp[HP_KEYS.CURRENT]}/${character.hp[HP_KEYS.MAX]}`

      cardBody.append(charClass, race, hp)
      return cardBody
    },
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

  @media screen and (prefers-color-scheme: dark) {
    .body {
      background-color: black;
    }
    
    .custom-card {
      border-radius: var(--border-radius);
    }
  }
</style>