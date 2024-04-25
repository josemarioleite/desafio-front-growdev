import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { Auth, Home } from '../pages/index'
import { Storage } from '../services/storage'

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'auth', component: Auth },
  { path: '/home', name: 'home', component: Home, meta: {
    requiresAuth: true
  } }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !Storage.isLogged()) {
    next('/auth')
    window.location.reload()
  } else {
    next()
  }
})

export default router
