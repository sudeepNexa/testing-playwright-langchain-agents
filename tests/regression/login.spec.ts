import { test, expect } from '@playwright/test';

const LOGIN_URL = 'https://the-internet.herokuapp.com/login';
const VALID_USERNAME = 'tomsmith';
const VALID_PASSWORD = 'SuperSecretPassword!';

test.describe('Login Page (the-internet.herokuapp.com/login)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL);
  });

  test('renders the login form with username, password, and submit control', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Login Page', level: 2 })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('valid credentials log the user in and reveal the secure area', async ({ page }) => {
    await page.locator('#username').fill(VALID_USERNAME);
    await page.locator('#password').fill(VALID_PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/\/secure$/);
    await expect(page.locator('#flash')).toContainText('You logged into a secure area');
    await expect(page.getByRole('heading', { name: 'Secure Area', level: 2 })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
  });

  test('invalid username shows an "invalid username" error and stays on the login page', async ({ page }) => {
    await page.locator('#username').fill('invalidUser');
    await page.locator('#password').fill(VALID_PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(LOGIN_URL);
    await expect(page.locator('#flash')).toContainText('Your username is invalid!');
    await expect(page.locator('#username')).toHaveValue('');
  });

  test('valid username with wrong password shows an "invalid password" error and stays on the login page', async ({ page }) => {
    await page.locator('#username').fill(VALID_USERNAME);
    await page.locator('#password').fill('wrongpassword');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(LOGIN_URL);
    await expect(page.locator('#flash')).toContainText('Your password is invalid!');
    await expect(page.locator('#password')).toHaveValue('');
  });

  test('empty credentials show an "invalid username" error (username is validated first)', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(LOGIN_URL);
    await expect(page.locator('#flash')).toContainText('Your username is invalid!');
  });
});
