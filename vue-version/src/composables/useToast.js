import { ref } from 'vue';

// Module-level state, shared across every component that calls useToast().
const toasts = ref([]);

const removeToast = (id) => {
  toasts.value = toasts.value.filter(toast => toast.id !== id);
};

const addToast = (message, type = 'success') => {
  const id = Date.now();
  toasts.value.push({ id, message, type });

  setTimeout(() => {
    removeToast(id);
  }, 5000);
};

export function useToast() {
  return {
    toasts,
    addToast,
    removeToast
  };
}
