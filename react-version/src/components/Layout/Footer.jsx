import React from 'react';

const Footer = () => {
  return (
    <footer style={{ 
      borderTop: '1px solid #e5e7eb', 
      backgroundColor: 'white',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{ 
          padding: '2rem 0',
          textAlign: 'center',
          color: '#6b7280'
        }}>
          <p>&copy; 2024 TicketFlow. All rights reserved.</p>
          <p style={{ fontSize: '14px', marginTop: '0.5rem' }}>
            Built with React, Vue.js, and Twig
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;