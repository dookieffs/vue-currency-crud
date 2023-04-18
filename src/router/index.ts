// Composables
import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
const routes = [
  {
      path: '/',
      name: 'Home',
      meta: { requiresAuth: true },
      component: () => import('../views/DashboardView.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: { requiresAuth: true },
    component: () => import('../views/DashboardView.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.isLoggedIn;//store.state.isLoggedIn;// Check if user is authenticated, e.g. by checking for a token in localStorage
  if (to.name !== 'Login' && !isAuthenticated) 
  {
    next({ name: 'Login' }) // Redirect to login page
  }
  else if (to.name == 'Login' && isAuthenticated) 
  {
    next({ name: 'Dashboard' })
  }
  else
  {
    next()
  }
})

export default router
