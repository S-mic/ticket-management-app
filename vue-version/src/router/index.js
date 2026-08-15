import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import LandingPage from '../pages/LandingPage.vue';
import Login from '../pages/Login.vue';
import Signup from '../pages/Signup.vue';
import Dashboard from '../pages/Dashboard.vue';
import TicketManagement from '../pages/TicketManagement.vue';

const routes = [
  { path: '/', name: 'landing', component: LandingPage },
  { path: '/auth/login', name: 'login', component: Login, meta: { publicOnly: true } },
  { path: '/auth/signup', name: 'signup', component: Signup, meta: { publicOnly: true } },
  { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/tickets', name: 'tickets', component: TicketManagement, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Mirrors the React version's ProtectedRoute/PublicRoute wrappers: routes
// flagged requiresAuth bounce unauthenticated visitors to login, and routes
// flagged publicOnly (login/signup) bounce already-authenticated users
// straight to the dashboard.
router.beforeEach((to) => {
  const { isAuthenticated } = useAuth();

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return { name: 'login' };
  }

  if (to.meta.publicOnly && isAuthenticated.value) {
    return { name: 'dashboard' };
  }

  return true;
});

export default router;
