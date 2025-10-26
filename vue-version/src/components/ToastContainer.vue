<template>
  <div class="toast-container" v-if="toasts.length">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="['toast', `toast-${toast.type}`]"
    >
      <div class="toast-message">
        {{ toast.message }}
      </div>
      <button
        @click="removeToast(toast.id)"
        class="btn btn-secondary"
        style="padding: 4px 8px; font-size: 14px"
      >
        ×
      </button>
    </div>
  </div>
</template>

<script setup>
import { useToast } from '../composables/useToast'

const { toasts, removeToast } = useToast()
</script>