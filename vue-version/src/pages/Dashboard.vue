<script setup>
import { reactive, onMounted } from 'vue';
import Layout from '../components/Layout/Layout.vue';
import { ticketStorage } from '../utils/ticketStorage';

const stats = reactive({ total: 0, open: 0, inProgress: 0, closed: 0 });

onMounted(() => {
  const tickets = ticketStorage.getTickets();
  stats.total = tickets.length;
  stats.open = tickets.filter(t => t.status === 'open').length;
  stats.inProgress = tickets.filter(t => t.status === 'in_progress').length;
  stats.closed = tickets.filter(t => t.status === 'closed').length;
});
</script>

<template>
  <Layout>
    <div class="container" style="padding: 2rem 0;">
      <div style="margin-bottom: 2rem;">
        <h1>Dashboard</h1>
        <p style="color: #6b7280;">Welcome to your ticket management dashboard</p>
      </div>

      <div class="grid grid-4" style="margin-bottom: 3rem;">
        <div class="card text-center">
          <h3 style="color: #3b82f6; font-size: 2rem; margin: 0 0 0.5rem 0;">{{ stats.total }}</h3>
          <p style="color: #6b7280; margin: 0;">Total Tickets</p>
        </div>
        <div class="card text-center">
          <h3 style="color: #10b981; font-size: 2rem; margin: 0 0 0.5rem 0;">{{ stats.open }}</h3>
          <p style="color: #6b7280; margin: 0;">Open</p>
        </div>
        <div class="card text-center">
          <h3 style="color: #f59e0b; font-size: 2rem; margin: 0 0 0.5rem 0;">{{ stats.inProgress }}</h3>
          <p style="color: #6b7280; margin: 0;">In Progress</p>
        </div>
        <div class="card text-center">
          <h3 style="color: #6b7280; font-size: 2rem; margin: 0 0 0.5rem 0;">{{ stats.closed }}</h3>
          <p style="color: #6b7280; margin: 0;">Closed</p>
        </div>
      </div>

      <div class="card">
        <h2 style="margin-bottom: 1rem;">Quick Actions</h2>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <router-link to="/tickets" class="btn btn-primary">View All Tickets</router-link>
          <router-link to="/tickets?create=new" class="btn btn-secondary">Create New Ticket</router-link>
        </div>
      </div>
    </div>
  </Layout>
</template>
