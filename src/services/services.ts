import axios, { AxiosResponse } from 'axios'
import router from '@/router'
import { Swal } from './swal'
import { Student } from '../models/Students.interface'
import { User } from '../models/User.interface'

const baseURL = 'http://localhost:3300/api/v1/'
const conexion = axios.create({ baseURL })

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
      Swal('Atenção', decodeMessageError(error,'Não foi possível obter os alunos'))
    }
  }
}