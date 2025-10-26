<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <router-link to="/dashboard" class="logo"> TicketFlow </router-link>

        <nav class="navigation">
          <router-link to="/dashboard" class="logo">
            Multi-Framework Tickets
          </router-link>
          <router-link to="/tickets">Tickets</router-link>
          <div class="user-info">
            <span>Welcome, {{ user?.name }}</span>
            <button @click="handleLogout" class="btn btn-secondary">
              Logout
            </button>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuth } from "../../composables/useAuth";

const router = useRouter();
const { user, logout } = useAuth();

const handleLogout = () => {
  logout();
  router.push("/");
};
</script>

<style scoped>
.header {
  border-bottom: 1px solid #e5e7eb;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 40;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
}

.logo {
  font-size: 1.25rem;
  font-weight: bold;
  color: #3b82f6;
  text-decoration: none;
}

.navigation {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.navigation a {
  text-decoration: none;
  color: #374151;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.navigation a:hover {
  background-color: #f3f4f6;
  color: #111827;
}

.navigation a.router-link-active {
  background-color: #3b82f6;
  color: white;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

@media (max-width: 768px) {
  .navigation {
    flex-direction: column;
    gap: 0.75rem;
  }

  .header-content {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
