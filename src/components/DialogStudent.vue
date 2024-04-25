<template>
<div>
  <v-dialog v-model="showDialog" class="dialog__student" persistent>
    <template v-slot:default>
      <v-card class="dialog__student__card" :title="titleDialog">
        <v-card-text style="margin-top: 20px;">
          <Input v-model="user.ra" v-if="!isCreating" label="R.A" disabled />
          <Input v-model="user.name" label="Nome" placeholder="Informe o seu nome..." :disabled="isDeleting" />
          <Input v-model="user.cpf" label="CPF" placeholder="Informe o seu CPF..." :disabled="!isCreating || isDeleting" />
          <Input v-model="user.email" label="E-mail" placeholder="Informe o seu e-mail..." :disabled="isDeleting" />
        </v-card-text>
        <div class="dialog__student__card__buttons">
          <v-btn @click="showDialog = false" style="background: #b18407; color: #fff;">cancelar</v-btn>
          <v-btn v-if="isCreating" class="bg-green">salvar</v-btn>
          <v-btn v-if="isUpdating" class="bg-blue">atualizar</v-btn>
          <v-btn v-if="isDeleting" class="bg-red">deletar</v-btn>
        </div>
      </v-card>
    </template>
  </v-dialog>
</div>
</template>

<script>
import Input from './Input.vue'

export default {
  name: 'DialogStudent',
  components: { Input },
  data: () => ({
    typeDialog: '',
    showDialog: false,
    user: {}
  }),
  computed: {
    isCreating () {
      return Boolean(this.typeDialog === 'create')
    },
    isUpdating () {
      return Boolean(this.typeDialog === 'update')
    },
    isDeleting () {
      return Boolean(this.typeDialog === 'delete')
    },
    titleDialog () {
      if (this.isCreating) {
        return 'Adicionar novo aluno'
      } else if (this.isUpdating) {
        return `Atualizar aluno: ${this.user.name}`
      } else if (this.isDeleting) {
        return `Deletar aluno: ${this.user.name}`
      }

      return ''
    }
  },
  methods: {
    changeVisibilityDialog (typeParam, userParam) {
      this.typeDialog = typeParam

      if (typeParam !== 'create') {
        this.user = userParam
      }

      this.showDialog = !this.showDialog
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog__student {
  &__card {
    align-self: center;
    height: 500px;
    width: 550px;

    &__buttons {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-left: 25px;
      margin-right: 25px;
      margin-bottom: 10px;
    }
  }
}
</style>
