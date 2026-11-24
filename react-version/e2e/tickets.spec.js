import { test, expect, makeTicket } from './fixtures.js';

const ticketCard = (page, title) => page.getByRole('article', { name: title });

test.describe('tickets', () => {
  test('shows an empty state when there are no tickets', async ({ page, seed }) => {
    await seed();
    await page.goto('/tickets');

    await expect(page.getByText('No tickets found.')).toBeVisible();
  });

  test('creates a ticket and keeps it after a reload', async ({ page, seed }) => {
    await seed();
    await page.goto('/tickets');

    await page.getByRole('button', { name: 'Create New Ticket' }).click();
    await page.getByLabel('Title *').fill('VPN drops every hour');
    await page.getByLabel('Description').fill('Started after the router update.');
    await page.getByLabel('Priority').selectOption('high');
    await page.getByRole('button', { name: 'Create Ticket' }).click();

    const card = ticketCard(page, 'VPN drops every hour');
    await expect(card).toBeVisible();
    await expect(card).toContainText('Priority: high');
    await expect(card.getByTestId('ticket-status')).toHaveText('open');

    await page.reload();
    await expect(ticketCard(page, 'VPN drops every hour')).toBeVisible();
  });

  test('will not save a ticket with a too-short title', async ({ page, seed }) => {
    await seed();
    await page.goto('/tickets');

    await page.getByRole('button', { name: 'Create New Ticket' }).click();
    await page.getByLabel('Title *').fill('ab');
    await page.getByRole('button', { name: 'Create Ticket' }).click();

    await expect(page.getByRole('alert')).toHaveText('Title must be at least 3 characters');
    await expect(page.getByRole('heading', { name: 'Create New Ticket' })).toBeVisible();
  });

  test('will not save a ticket with no status', async ({ page, seed }) => {
    await seed();
    await page.goto('/tickets');

    await page.getByRole('button', { name: 'Create New Ticket' }).click();
    await page.getByLabel('Title *').fill('Status deliberately left blank');
    await page.getByLabel('Status *').selectOption('');
    await page.getByRole('button', { name: 'Create Ticket' }).click();

    await expect(page.getByRole('alert')).toHaveText('Status is required');
  });

  test('edits a ticket status', async ({ page, seed }) => {
    await seed({ tickets: [makeTicket({ title: 'Laptop will not boot' })] });
    await page.goto('/tickets');

    await ticketCard(page, 'Laptop will not boot').getByRole('button', { name: 'Edit' }).click();
    await expect(page.getByLabel('Title *')).toHaveValue('Laptop will not boot');
    await page.getByLabel('Status *').selectOption('in_progress');
    await page.getByRole('button', { name: 'Update Ticket' }).click();

    await expect(ticketCard(page, 'Laptop will not boot').getByTestId('ticket-status')).toHaveText('in progress');
  });

  test('cancelling the delete dialog keeps the ticket', async ({ page, seed }) => {
    await seed({ tickets: [makeTicket({ title: 'Keep me' })] });
    await page.goto('/tickets');

    page.once('dialog', (dialog) => dialog.dismiss());
    await ticketCard(page, 'Keep me').getByRole('button', { name: 'Delete' }).click();

    await expect(ticketCard(page, 'Keep me')).toBeVisible();
  });

  test('confirming the delete dialog removes only that ticket', async ({ page, seed }) => {
    await seed({ tickets: [makeTicket({ title: 'Delete me' }), makeTicket({ title: 'Leave me alone' })] });
    await page.goto('/tickets');

    page.once('dialog', (dialog) => {
      expect(dialog.message()).toBe('Are you sure you want to delete this ticket?');
      dialog.accept();
    });
    await ticketCard(page, 'Delete me').getByRole('button', { name: 'Delete' }).click();

    await expect(ticketCard(page, 'Delete me')).toBeHidden();
    await expect(ticketCard(page, 'Leave me alone')).toBeVisible();
  });

  test('the dashboard counts tickets by status', async ({ page, seed }) => {
    await seed({
      tickets: [
        makeTicket({ status: 'open' }),
        makeTicket({ status: 'open' }),
        makeTicket({ status: 'in_progress' }),
        makeTicket({ status: 'closed' }),
      ],
    });
    await page.goto('/dashboard');

    await expect(page.getByTestId('stat-total-tickets')).toContainText('4');
    await expect(page.getByTestId('stat-open')).toContainText('2');
    await expect(page.getByTestId('stat-in-progress')).toContainText('1');
    await expect(page.getByTestId('stat-closed')).toContainText('1');
  });

  test('the dashboard shortcut opens the create form', async ({ page, seed }) => {
    await seed();
    await page.goto('/dashboard');

    await page.getByRole('link', { name: 'Create New Ticket' }).click();

    await expect(page).toHaveURL(/\/tickets\?create=new$/);
    await expect(page.getByRole('heading', { name: 'Create New Ticket' })).toBeVisible();
  });
});
