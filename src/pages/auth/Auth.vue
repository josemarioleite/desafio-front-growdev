<template>
<div class="auth">
  <v-card class="auth__card">
    <v-card-title>Login</v-card-title>
    <v-card-text>
      <v-form class="auth__card--form" @submit.prevent="login">
        <v-text-field v-model="email" label="Email" outlined></v-text-field>
        <v-text-field v-model="password" label="Password" outlined type="password"></v-text-field>
        <v-btn :disabled="isLoading" type="submit" color="primary" block>Login</v-btn>
      </v-form>
    </v-card-text>
  </v-card>

  <ProgressCircular :IsLoading="isLoading" />
</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { AuthService } from '../../services/services'
import { ProgressCircular } from '../../components'

const email = ref('')
const password = ref('')
const isLoading = ref(false)

const login = async () => {
  isLoading.value = true
  await new AuthService()
    .login(email.value, password.value)
    .then(() => isLoading.value = false)
}
</script>

<style lang="scss" scoped>
.auth {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__card {
    border-radius: 10px;
    text-align: center;
    border: 1px solid #9C9A9A;
    width: 500px;
    height: 300px;

    &--form {
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}

@media only screen and (max-width: 499px) {
  .auth__card {
    width: 95%;
  }
}
</style>