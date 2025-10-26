import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  type = 'button', 
  disabled = false,
  onClick,
  ...props 
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;