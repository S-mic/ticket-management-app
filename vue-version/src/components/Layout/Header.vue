<script setup>
import { useRouter } from 'vue-router';
import { useAuth } from '../../composables/useAuth';

const router = useRouter();
const { user, logout } = useAuth();

const handleLogout = () => {
  logout();
  router.push('/');
};
</script>

<template>
  <header
    style="border-bottom: 1px solid #e5e7eb; background-color: white; position: sticky; top: 0; z-index: 40;"
  >
    <div class="container">
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem 0;">
        <router-link
          to="/dashboard"
          style="font-size: 1.25rem; font-weight: bold; color: #3b82f6; text-decoration: none;"
        >
          TicketFlow
        </router-link>

        <nav class="navigation">
          <router-link
            to="/dashboard"
            style="font-size: 1.25rem; font-weight: bold; color: #3b82f6; text-decoration: none;"
          >
            Multi-Framework Tickets
          </router-link>
          <router-link
            to="/tickets"
            style="text-decoration: none; color: #374151; padding: 0.5rem 1rem;"
          >
            Tickets
          </router-link>
          <div style="display: flex; align-items: center; gap: 1rem;">
            <span style="color: #4b5563;">Welcome, {{ user?.name }}</span>
            <button @click="handleLogout" class="btn btn-secondary" style="font-size: 14px;">
              Logout
            </button>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>
