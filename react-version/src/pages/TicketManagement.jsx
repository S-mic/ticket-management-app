import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import { ticketStorage } from '../utils/ticketStorage';
import TicketList from '../components/Ticket/TicketList';
import TicketForm from '../components/Ticket/TicketForm';

const TicketManagement = () => {
  const [tickets, setTickets] = useState([]);
  const [editingTicket, setEditingTicket] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToast } = useToast();

  useEffect(() => {
    loadTickets();
    
    // Check if we should show create form from URL
    if (searchParams.get('create') === 'new') {
      setShowForm(true);
    }
  }, [searchParams]);

  const loadTickets = () => {
    const allTickets = ticketStorage.getTickets();
    setTickets(allTickets);
  };

  const handleCreateTicket = async (ticketData) => {
    try {
      const newTicket = ticketStorage.createTicket(ticketData);
      loadTickets();
      setShowForm(false);
      addToast('Ticket created successfully!', 'success');
    } catch (error) {
      addToast('Failed to create ticket', 'error');
    }
  };

  const handleUpdateTicket = async (ticketData) => {
    try {
      const updatedTicket = ticketStorage.updateTicket(editingTicket.id, ticketData);
      if (updatedTicket) {
        loadTickets();
        setEditingTicket(null);
        setShowForm(false);
        addToast('Ticket updated successfully!', 'success');
      }
    } catch (error) {
      addToast('Failed to update ticket', 'error');
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      try {
        ticketStorage.deleteTicket(ticketId);
        loadTickets();
        addToast('Ticket deleted successfully!', 'success');
      } catch (error) {
        addToast('Failed to delete ticket', 'error');
      }
    }
  };

  const handleEditTicket = (ticket) => {
    setEditingTicket(ticket);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setEditingTicket(null);
    setShowForm(false);
    // Clear URL params
    setSearchParams({});
  };

  const handleFormSubmit = (ticketData) => {
    if (editingTicket) {
      handleUpdateTicket(ticketData);
    } else {
      handleCreateTicket(ticketData);
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Ticket Management</h1>
          <p style={{ color: '#6b7280' }}>
            Create, view, and manage your support tickets
          </p>
        </div>
        
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
          >
            Create New Ticket
          </button>
        )}
      </div>

      {showForm ? (
        <TicketForm
          ticket={editingTicket}
          onSubmit={handleFormSubmit}
          onCancel={handleCancelForm}
        />
      ) : (
        <TicketList
          tickets={tickets}
          onEdit={handleEditTicket}
          onDelete={handleDeleteTicket}
        />
      )}
    </div>
  );
};

export default TicketManagement;