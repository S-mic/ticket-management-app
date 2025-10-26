<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="decorative-circle circle-lg"></div>
        <div class="decorative-circle circle-md"></div>
        
        <div class="hero-content">
          <h1 class="hero-title">Welcome to TicketFlow</h1>
          <p class="hero-description">
            Streamline your support tickets and manage customer requests efficiently with our powerful ticket management system.
          </p>
          <div class="hero-actions">
            <router-link to="/auth/login" class="btn btn-primary">
              Login
            </router-link>
            <router-link to="/auth/signup" class="btn btn-secondary">
              Get Started
            </router-link>
          </div>
        </div>
      </div>
      
      <div class="wave-background">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
          <path fill="#3b82f6" fill-opacity="0.1" d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <h2>Powerful Features</h2>
        <div class="grid grid-3">
          <div class="card text-center">
            <h3>Easy Ticket Creation</h3>
            <p>Create and manage support tickets with ease using our intuitive interface.</p>
          </div>
          <div class="card text-center">
            <h3>Real-time Updates</h3>
            <p>Track ticket status in real-time and stay updated on progress.</p>
          </div>
          <div class="card text-center">
            <h3>Team Collaboration</h3>
            <p>Work together with your team to resolve tickets efficiently.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-section {
  position: relative;
  padding: 4rem 0;
  background-color: #f8fafc;
  overflow: hidden;
}

.hero-content {
  text-align: center;
  position: relative;
  z-index: 10;
}

.hero-title {
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1f2937;
}

.hero-description {
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.features-section {
  padding: 4rem 0;
}

.features-section h2 {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.25rem;
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 3rem;
  }
}
</style>