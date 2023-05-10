<template>
  <div>
    <h1>Dashboard</h1>

  </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
    name: 'DashBoard',
    data() {
        return {
            store: useStore()
        }
    },
    created() {
        console.info('store user is: ' + JSON.stringify(this.store.getters.getUser))
    },
    methods() {

    }
}
</script>

<style>

</style>