import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ticketStorage } from '../utils/ticketStorage';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    closed: 0
  });

  useEffect(() => {
    const tickets = ticketStorage.getTickets();
    
    const newStats = {
      total: tickets.length,
      open: tickets.filter(t => t.status === 'open').length,
      inProgress: tickets.filter(t => t.status === 'in_progress').length,
      closed: tickets.filter(t => t.status === 'closed').length
    };
    
    setStats(newStats);
  }, []);

  const StatCard = ({ title, value, color }) => (
    <div className="card text-center">
      <h3 style={{ color, fontSize: '2rem', margin: '0 0 0.5rem 0' }}>{value}</h3>
      <p style={{ color: '#6b7280', margin: 0 }}>{title}</p>
    </div>
  );

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1>Dashboard</h1>
        <p style={{ color: '#6b7280' }}>
          Welcome to your ticket management dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-4" style={{ marginBottom: '3rem' }}>
        <StatCard title="Total Tickets" value={stats.total} color="#3b82f6" />
        <StatCard title="Open" value={stats.open} color="#10b981" />
        <StatCard title="In Progress" value={stats.inProgress} color="#f59e0b" />
        <StatCard title="Closed" value={stats.closed} color="#6b7280" />
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 style={{ marginBottom: '1rem' }}>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/tickets" className="btn btn-primary">
            View All Tickets
          </Link>
          <Link to="/tickets?create=new" className="btn btn-secondary">
            Create New Ticket
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;