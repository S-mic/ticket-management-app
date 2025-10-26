import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/LandingPage.vue')
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/auth/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/tickets',
    name: 'Tickets',
    component: () => import('../views/TicketManagement.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuth()
  
  if (to.meta.requiresAuth && !auth.isAuthenticated.value) {
    next('/auth/login')
  } else if ((to.name === 'Login' || to.name === 'Signup') && auth.isAuthenticated.value) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router