<template>
  <Layout>
    <div class="container dashboard">
      <div class="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to your ticket management dashboard</p>
      </div>

      <div class="stats-grid">
        <StatCard title="Total Tickets" :value="stats.total" color="#3b82f6" />
        <StatCard title="Open" :value="stats.open" color="#10b981" />
        <StatCard title="In Progress" :value="stats.inProgress" color="#f59e0b" />
        <StatCard title="Closed" :value="stats.closed" color="#6b7280" />
      </div>

      <div class="card quick-actions">
        <h2>Quick Actions</h2>
        <div class="actions">
          <router-link to="/tickets" class="btn btn-primary">
            View All Tickets
          </router-link>
          <router-link to="/tickets?create=new" class="btn btn-secondary">
            Create New Ticket
          </router-link>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Layout from '../components/Layout/Layout.vue'
import StatCard from '../components/UI/StatCard.vue'
import { ticketStorage } from '../utils/ticketStorage'

const stats = ref({
  total: 0,
  open: 0,
  inProgress: 0,
  closed: 0
})

onMounted(() => {
  const tickets = ticketStorage.getTickets()
  
  stats.value = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in_progress').length,
    closed: tickets.filter(t => t.status === 'closed').length
  }
})
</script>

<style scoped>
.dashboard {
  padding: 2rem 0;
}

.dashboard-header {
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  margin-bottom: 0.5rem;
}

.dashboard-header p {
  color: #6b7280;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.quick-actions h2 {
  margin-bottom: 1rem;
}

.actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

@media (min-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1024px) {
  .stats-grid {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>