Multi-Framework Ticket Management App
A complete ticket management system built with React, Vue.js, and Twig/PHP - demonstrating identical functionality across three different frontend technologies.

🚀 Live Demos
React: https://react-version-6a4pcptq2-sashas-projects-8206ecea.vercel.app/

Vue.js: https://vue-version-o8p8a7km0-sashas-projects-8206ecea.vercel.app/

Twig: Local setup required (see below)

🔐 Test Credentials
Email: demo@example.com
Password: password123

📋 Features
Landing page with wave background & decorative elements

User authentication (login/signup)

Dashboard with ticket statistics

Complete ticket CRUD operations

Responsive design & consistent UI across all frameworks

Form validation & protected routes

🛠️ Quick Start
React
bash
cd react-version
npm install && npm run dev
Vue.js
bash
cd vue-version  
npm install && npm run dev
Twig (Local Setup)
bash
cd twig-version
composer install
php -S localhost:8000 -t public
🧪 End-to-End Tests (React)
The React version has a Playwright suite that drives the real production build in Chromium and a mobile viewport. It runs on every pull request via GitHub Actions.

bash
cd react-version
npx playwright install chromium   # first time only
npm run test:e2e                  # headless
npm run test:e2e:ui               # interactive runner

What it covers:

Auth: protected routes redirect to login, demo login, wrong password, field validation, signup password mismatch, expired sessions

Tickets: empty state, create (and persist across reload), title and status validation, edit, delete confirm and cancel

Dashboard: counts by status, the "Create New Ticket" shortcut

How the tests are written:

Role and label queries first (getByRole, getByLabel), like a user or screen reader finds things. Test IDs only where there is no accessible name (status badge, stat cards)

Tests seed localStorage directly (e2e/fixtures.js) instead of clicking through login, so each test is independent and fast. One test still covers the real login flow end to end

To make label queries work, form labels are now linked to their inputs (htmlFor/id), and errors and toasts are announced to screen readers (role="alert", aria-live)

🎯 Project Structure
text
ticket-management-app/
├── react-version/     # React implementation
├── vue-version/       # Vue.js implementation  
├── twig-version/      # Twig/PHP implementation
└── shared-assets/     # Common design system
🎨 Design System
Colors: Consistent palette (#3b82f6 primary, #10b981 success, etc.)

Status Badges: Open (green), In Progress (amber), Closed (gray)

Layout: 1440px max-width, responsive grid

Components: Unified buttons, cards, forms, toasts

Note: Twig version requires local PHP environment. All three implementations provide identical functionality with consistent user experience.