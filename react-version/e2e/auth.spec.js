import { test, expect, DEMO_USER, SESSION_KEY } from './fixtures.js';

test.describe('authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('a signed-out visitor is sent to login from a protected page', async ({ page }) => {
    await page.goto('/tickets');

    await expect(page).toHaveURL(/\/auth\/login$/);
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });

  test('logs in with the demo account and lands on the dashboard', async ({ page }) => {
    await page.goto('/auth/login');

    await page.getByLabel('Email').fill(DEMO_USER.email);
    await page.getByLabel('Password').fill(DEMO_USER.password);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByText(`Welcome, ${DEMO_USER.name}`)).toBeVisible();
    await expect(page.getByRole('status')).toContainText('Login successful!');
  });

  test('shows field errors and does not submit an empty form', async ({ page }) => {
    await page.goto('/auth/login');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByRole('alert').filter({ hasText: 'Email is required' })).toBeVisible();
    await expect(page.getByRole('alert').filter({ hasText: 'Password is required' })).toBeVisible();
    await expect(page).toHaveURL(/\/auth\/login$/);
  });

  test('clears a field error as soon as the user starts typing', async ({ page }) => {
    await page.goto('/auth/login');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Email is required')).toBeVisible();

    await page.getByLabel('Email').fill('d');

    await expect(page.getByText('Email is required')).toBeHidden();
  });

  test('rejects a wrong password and stays signed out', async ({ page }) => {
    await page.goto('/auth/login');

    await page.getByLabel('Email').fill(DEMO_USER.email);
    await page.getByLabel('Password').fill('not-the-password');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByRole('alert').filter({ hasText: 'Invalid email or password' })).toBeVisible();
    await expect(page).toHaveURL(/\/auth\/login$/);
    expect(await page.evaluate((k) => localStorage.getItem(k), SESSION_KEY)).toBeNull();
  });

  test('signup refuses mismatched passwords', async ({ page }) => {
    await page.goto('/auth/signup');

    await page.getByLabel('Full Name').fill('New Person');
    await page.getByLabel('Email').fill('new.person@example.com');
    await page.getByLabel('Password', { exact: true }).fill('secret123');
    await page.getByLabel('Confirm Password').fill('secret124');
    await page.getByRole('button', { name: 'Sign Up' }).click();

    await expect(page.getByText('Passwords do not match')).toBeVisible();
    await expect(page).toHaveURL(/\/auth\/signup$/);
  });

  test('an expired session is treated as signed out', async ({ page }) => {
    await page.evaluate((k) => {
      localStorage.setItem(k, JSON.stringify({
        user: { email: 'demo@example.com', name: 'Demo User' },
        token: 'expired',
        expiresAt: Date.now() - 1000,
      }));
    }, SESSION_KEY);

    await page.goto('/dashboard');

    await expect(page).toHaveURL(/\/auth\/login$/);
  });
});
