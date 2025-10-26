<template>
  <div class="card">
    <div class="ticket-header">
      <h3>{{ ticket.title }}</h3>
      <span :class="['status-badge', `status-${ticket.status}`]">
        {{ ticket.status.replace('_', ' ') }}
      </span>
    </div>
    
    <p v-if="ticket.description" class="ticket-description">
      {{ ticket.description }}
    </p>
    
    <div class="ticket-footer">
      <div class="ticket-meta">
        <div>Priority: {{ ticket.priority }}</div>
        <div>Created: {{ formatDate(ticket.createdAt) }}</div>
      </div>
      
      <div class="ticket-actions">
        <button @click="onEdit(ticket)" class="btn btn-secondary">
          Edit
        </button>
        <button @click="onDelete(ticket.id)" class="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  ticket: Object,
  onEdit: Function,
  onDelete: Function
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<style scoped>
.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.ticket-header h3 {
  margin: 0;
  flex: 1;
}

.ticket-description {
  margin-bottom: 1rem;
  color: #6b7280;
}

.ticket-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ticket-meta {
  font-size: 14px;
  color: #9ca3af;
}

.ticket-actions {
  display: flex;
  gap: 0.5rem;
}
</style>