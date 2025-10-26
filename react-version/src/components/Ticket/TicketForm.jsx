import React, { useState } from 'react';
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from '../../utils/constants';
import { validateTicket } from '../../utils/validation';

const TicketForm = ({ ticket, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: ticket?.title || '',
    description: ticket?.description || '',
    status: ticket?.status || 'open',
    priority: ticket?.priority || 'medium'
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateTicket(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2 style={{ marginBottom: '1.5rem' }}>
        {ticket ? 'Edit Ticket' : 'Create New Ticket'}
      </h2>
      
      <div className="form-group">
        <label className="form-label">Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="form-input"
          placeholder="Enter ticket title"
        />
        {errors.title && <div className="form-error">{errors.title}</div>}
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-input"
          rows="4"
          placeholder="Enter ticket description"
        />
        {errors.description && <div className="form-error">{errors.description}</div>}
      </div>

      <div className="form-group">
        <label className="form-label">Status *</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Select Status</option>
          {STATUS_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.status && <div className="form-error">{errors.status}</div>}
      </div>

      <div className="form-group">
        <label className="form-label">Priority</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="form-select"
        >
          {PRIORITY_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : (ticket ? 'Update Ticket' : 'Create Ticket')}
        </button>
        <button 
          type="button" 
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TicketForm;