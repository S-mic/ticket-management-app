<template>
  <form @submit="handleSubmit" class="card">
    <h2>{{ ticket ? 'Edit Ticket' : 'Create New Ticket' }}</h2>
    
    <div class="form-group">
      <label class="form-label">Title *</label>
      <input
        type="text"
        v-model="formData.title"
        class="form-input"
        placeholder="Enter ticket title"
      />
      <div v-if="errors.title" class="form-error">{{ errors.title }}</div>
    </div>

    <div class="form-group">
      <label class="form-label">Description</label>
      <textarea
        v-model="formData.description"
        class="form-input"
        rows="4"
        placeholder="Enter ticket description"
      />
      <div v-if="errors.description" class="form-error">{{ errors.description }}</div>
    </div>

    <div class="form-group">
      <label class="form-label">Status *</label>
      <select v-model="formData.status" class="form-select">
        <option value="">Select Status</option>
        <option v-for="option in STATUS_OPTIONS" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
      <div v-if="errors.status" class="form-error">{{ errors.status }}</div>
    </div>

    <div class="form-group">
      <label class="form-label">Priority</label>
      <select v-model="formData.priority" class="form-select">
        <option v-for="option in PRIORITY_OPTIONS" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>

    <div class="form-actions">
      <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
        {{ isSubmitting ? 'Saving...' : (ticket ? 'Update Ticket' : 'Create Ticket') }}
      </button>
      <button type="button" class="btn btn-secondary" @click="onCancel" :disabled="isSubmitting">
        Cancel
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from '../../utils/constants'
import { validateTicket } from '../../utils/validation'

const props = defineProps({
  ticket: Object,
  onSubmit: Function,
  onCancel: Function
})

const formData = reactive({
  title: props.ticket?.title || '',
  description: props.ticket?.description || '',
  status: props.ticket?.status || 'open',
  priority: props.ticket?.priority || 'medium'
})

const errors = ref({})
const isSubmitting = ref(false)

watch(() => props.ticket, (newTicket) => {
  if (newTicket) {
    Object.assign(formData, newTicket)
  }
}, { immediate: true })

const handleSubmit = async (e) => {
  e.preventDefault()
  
  const validationErrors = validateTicket(formData)
  if (Object.keys(validationErrors).length > 0) {
    errors.value = validationErrors
    return
  }
  
  isSubmitting.value = true
  try {
    await props.onSubmit(formData)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}
</style>