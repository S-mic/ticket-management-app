<script setup>
import TicketCard from './TicketCard.vue';

defineProps({
  tickets: { type: Array, required: true }
});

defineEmits(['edit', 'delete']);
</script>

<template>
  <div v-if="tickets.length === 0" class="card text-center">
    <p>No tickets found.</p>
    <p style="color: #6b7280; margin-top: 0.5rem;">
      Create your first ticket to get started!
    </p>
  </div>

  <div v-else class="grid">
    <TicketCard
      v-for="ticket in tickets"
      :key="ticket.id"
      :ticket="ticket"
      @edit="$emit('edit', $event)"
      @delete="$emit('delete', $event)"
    />
  </div>
</template>
