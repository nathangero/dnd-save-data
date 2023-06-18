<template>
  <div>
    <div class="v-spinner">
      <div class="spinner-background">
        <div class="v-clip" v-bind:style="spinnerStyle">
        </div>
        <p class="logging-in-text">{{ loadingText }}</p>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  props: [
    'loadingText',
  ],
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

<style>
.spinner-background {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 200px;
  height: 200px;
  background-color: #fff;
  border-radius: 10px;
}

.v-spinner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  color: black;
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
</style>