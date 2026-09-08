import { test, expect } from '@playwright/test';

/**
 * Regression coverage for the Sauce Labs demo login flow.
 *
 * URL under test: https://www.saucedemo.com/
 *
 * Exploration evidence (accessibility snapshot taken against the live site):
 *   - textbox "Username"  -> input[data-test="username"]
 *   - textbox "Password"  -> input[data-test="password"]
 *   - button "Login"      -> input[data-test="login-button"]
 * Credentials are the ones published on the login page itself:
 *   "Accepted usernames are: standard_user, ..." / "Password for all users: secret_sauce"
 */

const URL = 'https://www.saucedemo.com/';

test.describe('Sauce Labs demo login', () => {
  test('valid credentials navigate to the inventory (Products) page', async ({ page }) => {
    await page.goto(URL);

    // Selectors follow the data-test attributes confirmed during exploration.
    await page.locator('input[data-test="username"]').fill('standard_user');
    await page.locator('input[data-test="password"]').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Web-first assertions: no fixed sleeps, Playwright retries until each
    // condition is met or the test times out.
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.getByText('Products', { exact: true })).toBeVisible();
  });

  test('invalid password keeps the user on the login page and flags the inputs as errored', async ({ page }) => {
    await page.goto(URL);

    await page.locator('input[data-test="username"]').fill('standard_user');
    await page.locator('input[data-test="password"]').fill('invalid_password');
    await page.getByRole('button', { name: 'Login' }).click();

    // The app must never navigate away from the login form on failure.
    await expect(page).toHaveURL(URL);

    // Sauce Demo applies the "input_error" CSS class to both credential
    // fields to drive the red error-state border when authentication fails.
    await expect(page.locator('input[data-test="username"]')).toHaveClass(/input_error/);
    await expect(page.locator('input[data-test="password"]')).toHaveClass(/input_error/);
  });
});
