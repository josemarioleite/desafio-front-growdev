<template>
<div class="index">
  <v-dialog v-model="showDialog" class="dialog__student" persistent>
    <template v-slot:default>
      <v-card class="dialog__student__card" :title="titleDialog">
        <v-card-text style="margin-top: 20px;">
          <v-form ref="form">
            <Input v-if="!isCreating" v-model="user.ra" label="R.A" disabled />
            <Input v-model="user.name" label="Nome" placeholder="Informe o seu nome..." :disabled="isDeleting" :rules="[rules.required, rules.counter]" />
            <Input v-model="user.cpf" label="CPF" placeholder="Informe o seu CPF..." :disabled="!isCreating || isDeleting" :rules="[rules.required, rules.cpf]" />
            <Input v-model="user.email" label="E-mail" placeholder="Informe o seu e-mail..." :disabled="isDeleting" :rules="[rules.required, rules.email]" />
          </v-form>
        </v-card-text>
        <div class="dialog__student__card__buttons">
          <v-btn @click="showDialog = false" style="background: #b18407; color: #fff;">cancelar</v-btn>
          <v-btn @click="createUser" v-if="isCreating" class="bg-green">salvar</v-btn>
          <v-btn @click="updateUser" v-if="isUpdating" class="bg-blue">atualizar</v-btn>
          <v-btn @click="deleteUser" v-if="isDeleting" class="bg-red">deletar</v-btn>
        </div>
      </v-card>
    </template>
  </v-dialog>
</div>
</template>

<script>
import Input from './Input.vue'
import { SwalConfirm, Swal } from '../services/swal'
import { StudentsAPI } from '../services/services'

const studentAPI = new StudentsAPI()

export default {
  name: 'DialogStudent',
  components: { Input },
  data: () => ({
    user: {},
    showDialog: false,
    typeDialog: '',
    rules: {
      required: value => !!value || 'Campo obrigatório',
      counter: value => value.length >= 5 || 'Min. 5 caracteres',
      cpf: (value) => (value && value.length === 11) || 'CPF deve ter exatamente 11 caracteres',
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'E-mail inválido'
      }
    }
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
      this.user = {}
      this.typeDialog = typeParam

      if (typeParam !== 'create') {
        this.user = userParam
        this.user.cpf = this.user.cpf.replace(/\D/g, '')
      }

      this.showDialog = !this.showDialog
    },
    closeDialog () {
      this.showDialog = false
    },
    validateForm () {
      this.$refs.form.validate()

      var regex = /^\d{11}$/
      if (!regex.test(this.user.cpf)) {
        Swal('Erro', 'CPF deve conter somente números')
        return false
      }

      if (!this.$refs.form.isValid) {
        Swal('Atenção', 'Preencha corretamente todos os campos')
        return false
      }

      return true
    },
    async deleteUser () {
      if (this.validateForm()) {
        SwalConfirm('Atenção', 'Tem certeza que deseja deletar o aluno: ' + this.user.name)
          .then((result) => {
            if (result.isConfirmed) {
              studentAPI.deleteStudent(this.user.ra)
              this.closeDialog()
              window.location.reload()
            }
          })
          .catch(() => this.closeDialog())
      }
    },
    async createUser () {
      if (this.validateForm()) {
        SwalConfirm('Atenção', 'Tem certeza que deseja adicionar o aluno')
          .then((result) => {
            if (result.isConfirmed) {
              studentAPI.saveStudent({
                cpf: this.user.cpf,
                name: this.user.name,
                email: this.user.email
              })
              this.closeDialog()
              window.location.reload()
            }
          })
          .catch(() => this.closeDialog())
      }
    },
    async updateUser () {
      if (this.validateForm()) {
        SwalConfirm('Atenção', 'Tem certeza que deseja atualizar o aluno: ' + this.user.name)
        .then((result) => {
          if (result.isConfirmed) {
            studentAPI.updateStudent(this.user.ra, {
              name: this.user.name,
              email: this.user.email
            })
            this.closeDialog()
            window.location.reload()
          }
        })
        .catch(() => this.closeDialog())
      }
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

@media only screen and (max-width: 499px) {
  .dialog__student__card {
    width: 95%;
  }
}
</style>
