<template>
<v-card>
  <v-layout>
    <Header v-if="isLoggedIn" />
    <router-view/>
  </v-layout>
</v-card>
</template>

<script lang="ts" setup>
import Header from './template/Header.vue'
import { ref, watchEffect } from 'vue'
import { Storage } from './services/storage'

const isLoggedIn = ref(Storage.isLogged())

watchEffect(() => {
  isLoggedIn.value = Storage.isLogged()
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
