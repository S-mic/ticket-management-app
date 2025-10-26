
# Ticket Management App - Multi-Framework Implementation

A complete ticket management system built with three different frontend technologies: React, Vue.js, and Twig (PHP). Each implementation provides identical functionality with a consistent design system.

## 🚀 Features

- **Landing Page** - Welcoming hero section with wave background and decorative elements
- **Authentication** - Login and signup with form validation
- **Dashboard** - Overview with ticket statistics and quick actions
- **Ticket Management** - Full CRUD operations (Create, Read, Update, Delete)
- **Responsive Design** - Mobile-first approach with consistent layout
- **Protected Routes** - Authentication-required pages
- **Form Validation** - Real-time validation with error messages
- **Toast Notifications** - Success and error feedback

## 🛠️ Tech Stack

| Framework | Technology Stack |
|-----------|------------------|
| **React** | React 18, React Router DOM, Vite, Context API |
| **Vue.js** | Vue 3, Vue Router 4, Vite, Composables |
| **Twig** | PHP 8+, Twig templating, Symfony HTTP Foundation |

## 📁 Project Structure

```
ticket-management-app/
├── react-version/          # React implementation
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React Context providers
│   │   ├── pages/          # Page components
│   │   └── utils/          # Utility functions
│   └── package.json
├── vue-version/            # Vue.js implementation
│   ├── src/
│   │   ├── components/     # Vue components
│   │   ├── composables/    # Vue composables
│   │   ├── views/          # Page views
│   │   └── utils/          # Utility functions
│   └── package.json
├── twig-version/           # Twig/PHP implementation
│   ├── templates/          # Twig templates
│   ├── src/                # PHP classes
│   ├── public/             # Web root
│   └── composer.json
├── shared-assets/          # Shared design system
│   └── styles/
│       ├── base.css        # CSS variables and base styles
│       ├── components.css  # Component styles
│       └── responsive.css  # Responsive utilities
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **PHP** (v8.0 or higher)
- **Composer** (for PHP dependencies)

### React Version

```bash
cd react-version

# Install dependencies
npm install

# Start development server
npm run dev

# App will be available at http://localhost:5173
```

### Vue.js Version

```bash
cd vue-version

# Install dependencies
npm install

# Start development server
npm run dev

# App will be available at http://localhost:5173 (or next available port)
```

### Twig Version

```bash
cd twig-version

# Install PHP dependencies
composer install

# Start PHP development server
php -S localhost:8000 -t public

# App will be available at http://localhost:8000
```

## 🔐 Test Credentials

All versions use the same test accounts:

| Email | Password | Purpose |
|-------|----------|---------|
| `demo@example.com` | `password123` | Demo user account |
| `admin@example.com` | `admin123` | Admin user account |

## 📱 Core Features

### Landing Page
- Hero section with wave SVG background
- Decorative circular elements
- Responsive call-to-action buttons
- Feature highlights section

### Authentication
- **Login**: Email/password validation
- **Signup**: Form validation with password confirmation
- Session management with localStorage (React/Vue) or PHP sessions (Twig)
- Protected route redirection

### Dashboard
- Ticket statistics (Total, Open, In Progress, Closed)
- Quick action buttons
- User greeting and logout functionality

### Ticket Management
- **Create**: Form with title, description, status, and priority fields
- **Read**: Card-based ticket list with status badges
- **Update**: Edit existing tickets with pre-filled forms
- **Delete**: Confirmation-based ticket deletion
- Real-time form validation
- Status tracking (Open, In Progress, Closed)

## 🎨 Design System

All implementations share the same design system:

### Colors
- **Primary**: `#3b82f6` (Blue)
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Amber)
- **Error**: `#ef4444` (Red)

### Status Colors
- **Open**: Green
- **In Progress**: Amber
- **Closed**: Gray

### Layout
- **Max Width**: 1440px (centered)
- **Container Padding**: Responsive (1rem mobile, 1.5rem desktop)
- **Grid System**: CSS Grid with responsive breakpoints

### Components
- Consistent button styles and states
- Card components with shadows and borders
- Form inputs with focus states
- Status badges with color coding
- Toast notifications

## 🔧 Development

### React Version Architecture
- **State Management**: React Context (AuthContext, ToastContext)
- **Routing**: React Router DOM with protected routes
- **Data Persistence**: localStorage for tickets and sessions
- **Components**: Functional components with hooks

### Vue.js Version Architecture
- **State Management**: Composables (useAuth, useToast)
- **Routing**: Vue Router with navigation guards
- **Data Persistence**: localStorage for tickets and sessions
- **Components**: Composition API with `<script setup>`

### Twig Version Architecture
- **Templating**: Twig with PHP includes
- **Routing**: Simple PHP-based routing
- **Data Persistence**: PHP sessions
- **Architecture**: Server-side rendered with form handling

## 📊 Data Models

### Ticket Object
```javascript
{
  id: string,
  title: string,        // Required
  description: string,  // Optional
  status: string,       // 'open', 'in_progress', 'closed'
  priority: string,     // 'low', 'medium', 'high'
  createdAt: string,    // ISO date string
  updatedAt: string     // ISO date string
}
```

### User Session
```javascript
{
  user: {
    email: string,
    name: string
  },
  token: string,
  expiresAt: number     // Timestamp
}
```

## 🧪 Validation Rules

### Authentication
- **Email**: Valid email format, required
- **Password**: Minimum 6 characters, required
- **Name**: Minimum 2 characters, required (signup only)

### Tickets
- **Title**: Required, minimum 3 characters
- **Status**: Required, must be one of: 'open', 'in_progress', 'closed'
- **Description**: Optional, maximum 1000 characters

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Scripts

### React & Vue.js
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Twig
- `composer install` - Install PHP dependencies
- `php -S localhost:8000 -t public` - Start PHP server

## 🚨 Known Issues & Limitations

- **Data Persistence**: All data is stored in localStorage (React/Vue) or sessions (Twig) and will be lost on clear
- **Authentication**: Mock authentication system - no real backend
- **File Uploads**: Not implemented in any version
- **Real-time Updates**: No WebSocket implementation
- **Production Ready**: Additional security measures needed for production

## 🔄 Switching Between Versions

Each version is completely independent. To switch:

1. Stop the current development server
2. Navigate to the desired framework directory
3. Follow the setup instructions for that version
4. Start the development server

## 📈 Performance Notes

- **React**: Optimized with React.memo where appropriate
- **Vue.js**: Uses Vue 3's Composition API for better performance
- **Twig**: Server-side rendering with minimal JavaScript

## 🤝 Contributing

When adding features, ensure consistency across all three implementations:

1. Implement feature in React first
2. Port to Vue.js maintaining same functionality
3. Implement in Twig with server-side approach
4. Update shared CSS if needed
5. Test all three versions

## 📄 License

This project is for educational purposes as part of a frontend framework comparison.

## 🆘 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# React/Vue - Vite will automatically use next available port
# Twig - Use different port:
php -S localhost:8001 -t public
```

**Dependencies not installing:**
```bash
# Clear cache and reinstall
npm cache clean --force
npm install
```

**PHP session issues:**
- Ensure PHP has write permissions for session files
- Check PHP version compatibility (requires PHP 8.0+)

**Styling inconsistencies:**
- Verify shared CSS files are properly imported
- Check CSS variable definitions in base.css

---

**Note**: This is a demonstration project showing the same application built with three different frontend technologies. Each implementation provides identical user experience and functionality while demonstrating framework-specific patterns and best practices.