import axios, { AxiosResponse } from 'axios'
import router from '@/router'
import { Storage } from '../services/storage'
import { Swal } from './swal'
import { Student } from '../models/Students.interface'
import { User } from '../models/User.interface'

const baseURL = 'http://localhost:3300/api/v1/'
const conexion = axios.create({ baseURL })

conexion.interceptors.request.use(
  (config) => {
    const token = Storage.getTokenSession()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

function decodeMessageError (error: any, message: string) {
  return error?.response?.data?.message || message
}

export class AuthService {
  async login (email: string, password: string): Promise<void> {
    try {
      const { status, data } = await conexion.post('users/auth', {email, password})

      if (status === 200) {
        const token: string = data.token
        const user: User = data.user

        sessionStorage.setItem('user', JSON.stringify(user))
        sessionStorage.setItem('token', token)

        Swal('Sucesso', `Olá ${user.name}. Seja Bem-Vindo novamente.`)
            .then(() => {
              router.push({name: 'home'})
                .then(() => window.location.reload())
            })
      }
    } catch (error) {
      Swal('Atenção', decodeMessageError(error,'Não foi possível fazer login'))
    }
  }
}

export class StudentsAPI {
  async getStudents (page: number, pageSize: number, search: string): Promise<any> {
    try {
      const response: AxiosResponse<Student> = await conexion.get(`students?page=${page}&pageSize=${pageSize}&search=${search}`)
      return response.data
    } catch (error) {
      console.log(error)
      Swal('Erro', decodeMessageError(error,'Não foi possível obter os alunos'))
    }
  }

  async deleteStudent (ra: string) {
    try {
      const response: AxiosResponse<Student> = await conexion.delete(`students/${ra}`)

      return Swal('Sucesso', decodeMessageError(response.data, 'Aluno foi excluído com sucesso'))
    } catch (error) {
      console.log(error)
      Swal('Erro', decodeMessageError(error, 'Não foi possível deletar o aluno'))
    }
  }

  async saveStudent (student: Partial<Student>) {
    try {
      const response: AxiosResponse<Student> = await conexion.post('students/create', student)

      return Swal('Sucesso', decodeMessageError(response.data, 'Aluno foi adicionado com sucesso'))
    } catch (error) {
      console.log(error)
      Swal('Erro', decodeMessageError(error, 'Não foi possível criar novo aluno'))
    }
  }

  async updateStudent (ra: string, student: Partial<Student>) {
    try {
      const response: AxiosResponse<Student> = await conexion.put(`students/${ra}`, student)

      return Swal('Sucesso', decodeMessageError(response.data, 'Aluno foi atualizado com sucesso'))
    } catch (error) {
      console.log(error)
      Swal('Erro', decodeMessageError(error, 'Não foi possível atualizar o aluno'))
    }
  }
}