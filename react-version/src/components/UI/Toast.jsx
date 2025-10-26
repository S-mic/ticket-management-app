import React from 'react';
import { useToast } from '../../contexts/ToastContext';

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast-${toast.type}`}
        >
          <div className="toast-message">
            {toast.message}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="btn btn-secondary"
            style={{ padding: '4px 8px', fontSize: '14px' }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;