<template>
  <Layout>
    <div class="container ticket-management">
      <div class="page-header">
        <div>
          <h1>Ticket Management</h1>
          <p>Create, view, and manage your support tickets</p>
        </div>
        
        <button 
          v-if="!showForm"
          @click="showForm = true"
          class="btn btn-primary"
        >
          Create New Ticket
        </button>
      </div>

      <TicketForm
        v-if="showForm"
        :ticket="editingTicket"
        @submit="handleFormSubmit"
        @cancel="handleCancelForm"
      />
      <TicketList
        v-else
        :tickets="tickets"
        @edit="handleEditTicket"
        @delete="handleDeleteTicket"
      />
    </div>
  </Layout>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from '../composables/useToast'
import Layout from '../components/Layout/Layout.vue'
import TicketForm from '../components/Ticket/TicketForm.vue'
import TicketList from '../components/Ticket/TicketList.vue'
import { ticketStorage } from '../utils/ticketStorage'

const route = useRoute()
const router = useRouter()
const { addToast } = useToast()

const tickets = ref([])
const editingTicket = ref(null)
const showForm = ref(false)

onMounted(() => {
  loadTickets()
  
  if (route.query.create === 'new') {
    showForm.value = true
  }
})

watch(() => route.query, (newQuery) => {
  if (newQuery.create === 'new') {
    showForm.value = true
  }
})

const loadTickets = () => {
  tickets.value = ticketStorage.getTickets()
}

const handleCreateTicket = async (ticketData) => {
  try {
    ticketStorage.createTicket(ticketData)
    loadTickets()
    showForm.value = false
    addToast('Ticket created successfully!', 'success')
  } catch (error) {
    addToast('Failed to create ticket', 'error')
  }
}

const handleUpdateTicket = async (ticketData) => {
  try {
    const updated = ticketStorage.updateTicket(editingTicket.value.id, ticketData)
    if (updated) {
      loadTickets()
      editingTicket.value = null
      showForm.value = false
      addToast('Ticket updated successfully!', 'success')
    }
  } catch (error) {
    addToast('Failed to update ticket', 'error')
  }
}

const handleDeleteTicket = async (ticketId) => {
  if (confirm('Are you sure you want to delete this ticket?')) {
    try {
      ticketStorage.deleteTicket(ticketId)
      loadTickets()
      addToast('Ticket deleted successfully!', 'success')
    } catch (error) {
      addToast('Failed to delete ticket', 'error')
    }
  }
}

const handleEditTicket = (ticket) => {
  editingTicket.value = ticket
  showForm.value = true
}

const handleCancelForm = () => {
  editingTicket.value = null
  showForm.value = false
  router.replace({ query: {} })
}

const handleFormSubmit = (ticketData) => {
  if (editingTicket.value) {
    handleUpdateTicket(ticketData)
  } else {
    handleCreateTicket(ticketData)
  }
}
</script>

<style scoped>
.ticket-management {
  padding: 2rem 0;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  margin-bottom: 0.5rem;
}

.page-header p {
  color: #6b7280;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}
</style>