<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Layout from '../components/Layout/Layout.vue';
import TicketList from '../components/Ticket/TicketList.vue';
import TicketForm from '../components/Ticket/TicketForm.vue';
import { useToast } from '../composables/useToast';
import { ticketStorage } from '../utils/ticketStorage';

const tickets = ref([]);
const editingTicket = ref(null);
const showForm = ref(false);

const route = useRoute();
const router = useRouter();
const { addToast } = useToast();

const loadTickets = () => {
  tickets.value = ticketStorage.getTickets();
};

const applyCreateParam = () => {
  if (route.query.create === 'new') {
    showForm.value = true;
  }
};

onMounted(() => {
  loadTickets();
  applyCreateParam();
});

// Mirrors the React version's useEffect on searchParams — re-checks the
// ?create=new query param whenever the route changes.
watch(() => route.query.create, applyCreateParam);

const handleCreateTicket = async (ticketData) => {
  try {
    ticketStorage.createTicket(ticketData);
    loadTickets();
    showForm.value = false;
    addToast('Ticket created successfully!', 'success');
  } catch {
    addToast('Failed to create ticket', 'error');
  }
};

const handleUpdateTicket = async (ticketData) => {
  try {
    const updated = ticketStorage.updateTicket(editingTicket.value.id, ticketData);
    if (updated) {
      loadTickets();
      editingTicket.value = null;
      showForm.value = false;
      addToast('Ticket updated successfully!', 'success');
    }
  } catch {
    addToast('Failed to update ticket', 'error');
  }
};

const handleDeleteTicket = async (ticketId) => {
  if (window.confirm('Are you sure you want to delete this ticket?')) {
    try {
      ticketStorage.deleteTicket(ticketId);
      loadTickets();
      addToast('Ticket deleted successfully!', 'success');
    } catch {
      addToast('Failed to delete ticket', 'error');
    }
  }
};

const handleEditTicket = (ticket) => {
  editingTicket.value = ticket;
  showForm.value = true;
};

const handleCancelForm = () => {
  editingTicket.value = null;
  showForm.value = false;
  router.replace({ query: {} });
};

const handleFormSubmit = (ticketData) => {
  if (editingTicket.value) {
    handleUpdateTicket(ticketData);
  } else {
    handleCreateTicket(ticketData);
  }
};
</script>

<template>
  <Layout>
    <div class="container" style="padding: 2rem 0;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <div>
          <h1>Ticket Management</h1>
          <p style="color: #6b7280;">Create, view, and manage your support tickets</p>
        </div>

        <button v-if="!showForm" @click="showForm = true" class="btn btn-primary">
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
