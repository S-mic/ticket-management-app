import { TICKETS_KEY } from './constants';

export const ticketStorage = {
  getTickets: () => {
    try {
      const tickets = localStorage.getItem(TICKETS_KEY);
      return tickets ? JSON.parse(tickets) : [];
    } catch {
      return [];
    }
  },

  saveTickets: (tickets) => {
    localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
  },

  createTicket: (ticket) => {
    const tickets = ticketStorage.getTickets();
    const newTicket = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...ticket
    };
    tickets.push(newTicket);
    ticketStorage.saveTickets(tickets);
    return newTicket;
  },

  updateTicket: (id, updates) => {
    const tickets = ticketStorage.getTickets();
    const index = tickets.findIndex(ticket => ticket.id === id);
    if (index !== -1) {
      tickets[index] = {
        ...tickets[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      ticketStorage.saveTickets(tickets);
      return tickets[index];
    }
    return null;
  },

  deleteTicket: (id) => {
    const tickets = ticketStorage.getTickets();
    const filteredTickets = tickets.filter(ticket => ticket.id !== id);
    ticketStorage.saveTickets(filteredTickets);
    return true;
  }
};