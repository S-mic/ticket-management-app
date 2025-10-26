import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section" style={{
        position: 'relative',
        padding: '4rem 0',
        backgroundColor: '#f8fafc',
        overflow: 'hidden'
      }}>
        <div className="container">
          {/* Decorative Circles */}
          <div className="decorative-circle circle-lg" style={{ top: '-50px', right: '-50px' }}></div>
          <div className="decorative-circle circle-md" style={{ bottom: '100px', left: '-100px' }}></div>
          
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
            <h1 className="hero-title" style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              color: '#1f2937'
            }}>
              Welcome to TicketFlow
            </h1>
            <p style={{ 
              fontSize: '1.25rem', 
              color: '#6b7280', 
              marginBottom: '2rem',
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}>
              Streamline your support tickets and manage customer requests efficiently with our powerful ticket management system.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/auth/login" className="btn btn-primary">
                Login
              </Link>
              <Link to="/auth/signup" className="btn btn-secondary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
        
        {/* Wave Background */}
        <div className="wave-background">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" style={{ display: 'block' }}>
            <path fill="#3b82f6" fillOpacity="0.1" d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.25rem' }}>
            Powerful Features
          </h2>
          <div className="grid grid-3">
            <div className="card text-center">
              <h3>Easy Ticket Creation</h3>
              <p>Create and manage support tickets with ease using our intuitive interface.</p>
            </div>
            <div className="card text-center">
              <h3>Real-time Updates</h3>
              <p>Track ticket status in real-time and stay updated on progress.</p>
            </div>
            <div className="card text-center">
              <h3>Team Collaboration</h3>
              <p>Work together with your team to resolve tickets efficiently.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;