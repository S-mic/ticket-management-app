import React from 'react';

const TicketCard = ({ ticket, onEdit, onDelete }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'open': return 'status-open';
      case 'in_progress': return 'status-in-progress';
      case 'closed': return 'status-closed';
      default: return '';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0, flex: 1 }}>{ticket.title}</h3>
        <span className={`status-badge ${getStatusClass(ticket.status)}`}>
          {ticket.status.replace('_', ' ')}
        </span>
      </div>
      
      {ticket.description && (
        <p style={{ marginBottom: '1rem', color: '#6b7280' }}>
          {ticket.description}
        </p>
      )}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '14px', color: '#9ca3af' }}>
          <div>Priority: {ticket.priority}</div>
          <div>Created: {formatDate(ticket.createdAt)}</div>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => onEdit(ticket)}
            className="btn btn-secondary"
            style={{ fontSize: '14px', padding: '0.5rem 1rem' }}
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(ticket.id)}
            className="btn btn-danger"
            style={{ fontSize: '14px', padding: '0.5rem 1rem' }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;