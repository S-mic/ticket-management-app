export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return '';
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return '';
};

export const validateName = (name) => {
  if (!name) return 'Name is required';
  if (name.length < 2) return 'Name must be at least 2 characters';
  return '';
};

export const validateTicket = (ticket) => {
  const errors = {};
  
  if (!ticket.title?.trim()) {
    errors.title = 'Title is required';
  } else if (ticket.title.length < 3) {
    errors.title = 'Title must be at least 3 characters';
  }
  
  if (!ticket.status) {
    errors.status = 'Status is required';
  } else if (!['open', 'in_progress', 'closed'].includes(ticket.status)) {
    errors.status = 'Invalid status value';
  }
  
  if (ticket.description && ticket.description.length > 1000) {
    errors.description = 'Description must be less than 1000 characters';
  }
  
  return errors;
};