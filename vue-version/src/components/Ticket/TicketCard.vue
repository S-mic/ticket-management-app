<script setup>
defineProps({
  ticket: { type: Object, required: true }
});

defineEmits(['edit', 'delete']);

const getStatusClass = (status) => {
  switch (status) {
    case 'open': return 'status-open';
    case 'in_progress': return 'status-in-progress';
    case 'closed': return 'status-closed';
    default: return '';
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
</script>

<template>
  <div class="card">
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
      <h3 style="margin: 0; flex: 1;">{{ ticket.title }}</h3>
      <span :class="`status-badge ${getStatusClass(ticket.status)}`">
        {{ ticket.status.replace('_', ' ') }}
      </span>
    </div>

    <p v-if="ticket.description" style="margin-bottom: 1rem; color: #6b7280;">
      {{ ticket.description }}
    </p>

    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div style="font-size: 14px; color: #9ca3af;">
        <div>Priority: {{ ticket.priority }}</div>
        <div>Created: {{ formatDate(ticket.createdAt) }}</div>
      </div>

      <div style="display: flex; gap: 0.5rem;">
        <button
          @click="$emit('edit', ticket)"
          class="btn btn-secondary"
          style="font-size: 14px; padding: 0.5rem 1rem;"
        >
          Edit
        </button>
        <button
          @click="$emit('delete', ticket.id)"
          class="btn btn-danger"
          style="font-size: 14px; padding: 0.5rem 1rem;"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
