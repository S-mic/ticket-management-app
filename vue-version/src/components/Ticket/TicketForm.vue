<script setup>
import { reactive, ref } from 'vue';
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from '../../utils/constants';
import { validateTicket } from '../../utils/validation';

const props = defineProps({
  ticket: { type: Object, default: null }
});

const emit = defineEmits(['submit', 'cancel']);

// The parent toggles between this form and the ticket list with v-if, so
// this component fully unmounts/remounts on every open — same as React's
// version, where useState(ticket?.title...) only runs once per mount.
const formData = reactive({
  title: props.ticket?.title || '',
  description: props.ticket?.description || '',
  status: props.ticket?.status || 'open',
  priority: props.ticket?.priority || 'medium'
});

const errors = ref({});
const isSubmitting = ref(false);

const clearError = (field) => {
  if (errors.value[field]) {
    errors.value = { ...errors.value, [field]: '' };
  }
};

const handleSubmit = async () => {
  const validationErrors = validateTicket(formData);
  if (Object.keys(validationErrors).length > 0) {
    errors.value = validationErrors;
    return;
  }

  isSubmitting.value = true;
  try {
    await emit('submit', { ...formData });
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="card">
    <h2 style="margin-bottom: 1.5rem;">
      {{ ticket ? 'Edit Ticket' : 'Create New Ticket' }}
    </h2>

    <div class="form-group">
      <label class="form-label">Title *</label>
      <input
        type="text"
        v-model="formData.title"
        @input="clearError('title')"
        class="form-input"
        placeholder="Enter ticket title"
      />
      <div v-if="errors.title" class="form-error">{{ errors.title }}</div>
    </div>

    <div class="form-group">
      <label class="form-label">Description</label>
      <textarea
        v-model="formData.description"
        @input="clearError('description')"
        class="form-input"
        rows="4"
        placeholder="Enter ticket description"
      />
      <div v-if="errors.description" class="form-error">{{ errors.description }}</div>
    </div>

    <div class="form-group">
      <label class="form-label">Status *</label>
      <select
        v-model="formData.status"
        @change="clearError('status')"
        class="form-select"
      >
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

    <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
      <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
        {{ isSubmitting ? 'Saving...' : (ticket ? 'Update Ticket' : 'Create Ticket') }}
      </button>
      <button
        type="button"
        class="btn btn-secondary"
        :disabled="isSubmitting"
        @click="$emit('cancel')"
      >
        Cancel
      </button>
    </div>
  </form>
</template>
