import { User } from '@/models/User.interface'
import router from '../router'
import { NavigationFailure } from 'vue-router'

export class Storage {
  public static getUserSession(): User | null {
    const userJSON = sessionStorage.getItem('user')
  
    if (userJSON) {
      try {
        const user: User = JSON.parse(userJSON)
        return user
      } catch (error) {
        return null
      }
    } else {
      return null
    }
  }

  public static getTokenSession (): string | null {
    const token = sessionStorage.getItem('token')
  
    if (token) {
      try {
        return token
      } catch (error) {
        return null
      }
    } else {
      return null
    }
  }

  public static logout (): Promise<NavigationFailure | void> {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    
    return router.push({ name: 'auth' }).then(() => {
      window.location.reload()
    })
  }

  public static isLogged (): boolean {
    if (!this.getTokenSession()) {
      return false
    }

    return true
  }
}
