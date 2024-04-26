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
