import { ref } from 'vue'

export function useToast() {
  const toasts = ref([])

  const addToast = (message, type = 'success') => {
    const id = Date.now()
    toasts.value.push({ id, message, type })
    
    setTimeout(() => {
      removeToast(id)
    }, 5000)
  }

  const removeToast = (id) => {
    toasts.value = toasts.value.filter(toast => toast.id !== id)
  }

  return {
    toasts,
    addToast,
    removeToast
  }
}