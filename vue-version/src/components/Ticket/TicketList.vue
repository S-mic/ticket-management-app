<template>
  <div class="grid">
    <TicketCard
      v-for="ticket in tickets"
      :key="ticket.id"
      :ticket="ticket"
      @edit="onEdit"
      @delete="onDelete"
    />
    <div v-if="tickets.length === 0" class="card text-center">
      <p>No tickets found.</p>
      <p>Create your first ticket to get started!</p>
    </div>
  </div>
</template>

<script setup>
import TicketCard from './TicketCard.vue'

defineProps({
  tickets: Array,
  onEdit: Function,
  onDelete: Function
})
</script>