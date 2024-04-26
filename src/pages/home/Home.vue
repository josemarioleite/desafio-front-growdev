<template>
<div class="home">
  <aside class="home__aside">
    <span class="home__aside--title">Lista de alunos</span>
    <v-tooltip location="left">
      <template v-slot:activator="{ props }">
        <v-btn
          @click="addNewStudent"
          v-bind="props"
          class="home__aside--btn"
          icon="mdi-plus"
        />
      </template>
      <span>Adicionar novo aluno</span>
    </v-tooltip>
  </aside>
  <TableStudent :Search="search" class="home__table" />
  <DialogStudent ref="dialogRef" />
</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { DialogStudent, TableStudent } from '../../components'

const search = ref('')
const dialogRef = ref<InstanceType<typeof DialogStudent> | null>(null)

const addNewStudent = () => {
  dialogRef.value.changeVisibilityDialog('create', null)
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding&display=swap');

.home {
  font-optical-sizing: auto;
  font-style: normal;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__table {
    width: 95%;
    border-radius: 10px;
    border: 2px solid #3A88EE;
  }

  &__aside {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-bottom: 15px;
    width: 100%;

    &--title {
      position: absolute;
      top: 10%;
      font-size: 3rem;
      font-family: "Nanum Gothic Coding", monospace;
      font-weight: 400;
      font-style: normal;
      width: 100%;
    }

    &--btn {
      color: #fff;
      position: fixed;
      bottom: 20px;
      right: 30px;
      background-color: #3A88EE;
    }
  }
}

@media only screen and (max-width: 499px) {
  .home__aside--title {
    font-size: 2rem;
  }

  .home__table {
    margin-top: 35px;
  }
}
</style>