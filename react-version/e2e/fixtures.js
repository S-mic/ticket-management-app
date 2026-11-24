import { test as base, expect } from '@playwright/test';

// Must match react-version/src/utils/constants.js
export const SESSION_KEY = 'ticketapp_session';
export const TICKETS_KEY = 'ticketapp_tickets';
export const DEMO_USER = { email: 'demo@example.com', password: 'password123', name: 'Demo User' };

/**
 * Seed localStorage before the app loads, so a test can start from a known
 * state without clicking through the UI to get there.
 */
async function seedStorage(page, { session, tickets }) {
  await page.addInitScript(
    ({ SESSION_KEY, TICKETS_KEY, session, tickets }) => {
      // addInitScript runs on every navigation; only seed once per test so
      // that reloads exercise the app's own persistence.
      if (sessionStorage.getItem('__seeded')) return;
      sessionStorage.setItem('__seeded', '1');
      localStorage.clear();
      if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      if (tickets) localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
    },
    { SESSION_KEY, TICKETS_KEY, session, tickets },
  );
}

export function sessionFor(user = DEMO_USER) {
  return {
    user: { email: user.email, name: user.name },
    token: 'e2e-token',
    expiresAt: Date.now() + 24 * 60 * 60 * 1000,
  };
}

export function makeTicket(overrides = {}) {
  const now = new Date().toISOString();
  return {
    id: `t-${Math.random().toString(36).slice(2, 10)}`,
    title: 'Printer on floor 2 is jammed',
    description: '',
    status: 'open',
    priority: 'medium',
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

export const test = base.extend({
  /** A page with a valid session and the given tickets already stored. */
  seed: async ({ page }, use) => {
    await use((options = {}) =>
      seedStorage(page, { session: sessionFor(), tickets: [], ...options }),
    );
  },
});

export { expect };
