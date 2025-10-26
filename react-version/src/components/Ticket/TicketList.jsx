import React from 'react';
import TicketCard from './TicketCard';

const TicketList = ({ tickets, onEdit, onDelete }) => {
  if (tickets.length === 0) {
    return (
      <div className="card text-center">
        <p>No tickets found.</p>
        <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>
          Create your first ticket to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="grid">
      {tickets.map(ticket => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TicketList;