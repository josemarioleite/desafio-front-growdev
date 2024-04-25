<template>
<div class="header">
  <v-app-bar color="primary" class="header__bar">
    <v-toolbar-title>Escola Desafio Vencido</v-toolbar-title>

    <v-btn @click="Storage.logout" class="header__bar--btn">logout</v-btn>
  </v-app-bar>
</div>
</template>

<script lang="ts" setup>
import { Storage } from '../services/storage'
</script>

<style lang="scss" scoped>
.header {
  &__bar {
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;

    &--btn {
      text-align: center;
      width: 100px;
      background: #000;
    }
  }
}
</style>