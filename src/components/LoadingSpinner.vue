<template>
  <div>
    <div class="v-spinner">
      <div class="v-clip" v-bind:style="spinnerStyle">
      </div>
      <p class="fs-2 mt-4 logging-in-text">{{ loadingText }}</p>
    </div>
  </div>
</template>

<script>


export default {
  props: {
    loadingText: {
      type: String,
      required: true  
    }
  },
  computed: {
    spinnerStyle () {
      return {
        height: '100px',
        width: '100px',
        borderWidth: '5px',
        borderStyle: 'solid',
        borderColor: '#5dc596' + ' ' + '#5dc596' + ' transparent',
        borderRadius: '100%',
        background: 'transparent'
      }
    }
  }
}
</script>

<style scoped>

.v-spinner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  color: var(--black);
}

.v-spinner .v-clip {
  -webkit-animation: v-clipDelay 1.25s 0s infinite linear;
  animation: v-clipDelay 1.25s 0s infinite linear;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  display: inline-block;
  height: 100px;
  width: 100px;
  border: 5px solid #5dc596;
  border-radius: 50%;
  background-color: #fff;
  position: relative;
}

.logging-in-text {
  color: black;
  margin-top: 20px;
}

@-webkit-keyframes v-clipDelay
{
  100%
  {
    -webkit-transform: rotate(360deg) scale(1);
            transform: rotate(360deg) scale(1);
  }
}

@keyframes v-clipDelay
{
  100%
  {
    -webkit-transform: rotate(360deg) scale(1);
            transform: rotate(360deg) scale(1);
  }
}

@media (prefers-color-scheme: dark) {
  .v-spinner {
    background-color: var(--black);
    color: var(--white);
  }

  .logging-in-text {
    color: white;
  }
}
</style>