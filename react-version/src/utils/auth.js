import { SESSION_KEY, TEST_USERS } from './constants';

export const authAPI = {
  login: async (email, password) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = TEST_USERS.find(u => u.email === email && u.password === password);
    
    if (user) {
      const session = {
        user: { email: user.email, name: user.name },
        token: `mock-jwt-token-${Date.now()}`,
        expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return { success: true, user: session.user };
    } else {
      throw new Error('Invalid email or password');
    }
  },

  signup: async (name, email, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const existingUser = TEST_USERS.find(u => u.email === email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }
    
    const session = {
      user: { email, name },
      token: `mock-jwt-token-${Date.now()}`,
      expiresAt: Date.now() + (24 * 60 * 60 * 1000)
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { success: true, user: session.user };
  },

  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  getSession: () => {
    const sessionStr = localStorage.getItem(SESSION_KEY);
    if (!sessionStr) return null;
    
    try {
      const session = JSON.parse(sessionStr);
      if (session.expiresAt < Date.now()) {
        localStorage.removeItem(SESSION_KEY);
        return null;
      }
      return session;
    } catch {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
  },

  isAuthenticated: () => {
    return !!authAPI.getSession();
  }
};