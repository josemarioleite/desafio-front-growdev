<template>
<div>
  <v-data-table-server
    v-model:page="page"
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="items"
    :items-length="totalPage"
    :loading="isLoading"
    :search="search"
    item-value="ra"
    class="table"
    loading-text="Carregando... aguarde um momento"
    @update:options="loadItems"
  >
    <template v-slot:top>
      <tr>
        <td>
          <v-text-field
            v-model="search"
            class="table__search"
            placeholder="Procure pelo nome..."
            color="primary"
            variant="underlined"
            hide-details
          >
          </v-text-field>
        </td>
      </tr>
    </template>

    <template v-slot:bottom>
      <div class="text-center pt-2">
        <v-pagination
          v-model="page"
          :length="pageCount"
        ></v-pagination>
      </div>
    </template>

    <template v-slot:item.ra="{ item }">
      <span>{{ String(item.ra).padStart(5, '0') }}</span>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon @click="openDialog('update', item)" class="table__icon me-2"> mdi-pencil </v-icon>
      <v-icon @click="openDialog('delete', item)" class="table__icon"> mdi-delete </v-icon>
    </template>

    <template v-slot:no-data>
      <span>Sem dados ainda...</span>
    </template>

    <template v-slot:loader>
      <div style="display: flex; flex-direction: row; justify-content: center;">
        <ProgressCircular :IsLoading="isLoading" />
      </div>
    </template>

  </v-data-table-server>
  <DialogStudent ref="dialogRef" />
</div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { StudentsAPI } from '../services/services'
import { User } from '../models/User.interface'
import DialogStudent from './DialogStudent.vue'
import ProgressCircular from './ProgressCircular.vue'

const totalPage = ref(0)
const page = ref(1)
const itemsPerPage = ref(5)
const isLoading = ref(false)

interface ParamsTablePagination {
  itemsPerPage: number
  page: number
  search: string
}

const headers = [
  { title: 'R.A', key: 'ra', align: 'start' },
  { title: 'Nome', key: 'name', align: 'start' },
  { title: 'CPF', key: 'cpf', align: 'start' },
  { title: 'E-mail', key: 'email', align: 'start' },
  { title: 'Ações', key: 'actions', align: 'start' }
]

const pageCount = computed(() => {
  return Math.ceil(totalPage.value / itemsPerPage.value)
})

const items = ref([])
const search = ref('')
const studentsAPI = new StudentsAPI()
const loadItems = async (params: ParamsTablePagination) => {
  try {
    isLoading.value = true
    await studentsAPI.getStudents(params.page, params.itemsPerPage, params.search)
      .then(res => {
        items.value = res.rows
        totalPage.value = res.count
      })
  } catch (error) {
    console.log(error)
  } finally {
    setTimeout(() => {
      isLoading.value = false
    }, 2000);
  }
}

let dialogRef = ref<InstanceType<typeof DialogStudent> | null>(null)

let openDialog = (paramType: string, paramUser: User) => {
  dialogRef.value.changeVisibilityDialog(paramType, paramUser)
}
</script>

<style lang="scss" scoped>
:deep(.v-data-table-header__content) {
  color: #3A88EE;
  font-weight: bold;
  font-size: 1rem;
}

.table {
  min-height: 450px;
  max-height: 460px;

  &__search {
    width: 20vw;
    margin: 10px;
  }

  &__icon:hover {
    border-radius: 5px;
    margin: 0;
    padding: 0;
    height: 25px;
    width: 25px;
    background: #3A88EE;
    color: #fff;
    cursor: pointer;
  }
}

@media only screen and (max-width: 499px) {
  .table__search {
    margin-left: 30px;
    width: 300px;
  }
}
</style>
