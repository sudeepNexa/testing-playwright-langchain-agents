import { test, expect } from '@playwright/test';

/**
 * Regression test for Sauce Demo login flow.
 * 
 * URL: https://www.saucedemo.com/
 * Flow: Successful login with standard credentials (standard_user / secret_sauce)
 *       leads to the inventory page.
 * 
 * Assertions based on:
 * - URL transition from / (login) to /inventory.html
 * - Accessible page elements confirming authenticated state:
 *   * "Products" page title/heading visible
 *   * "Open Menu" hamburger button visible (app-level nav)
 *   * Product grid rendered with 6 products, each with name, description, price, "Add to cart" button
 *   * Login form completely removed from accessibility tree post-submit
 */
test('successful login with standard_user credentials reaches inventory page', async ({ page }) => {
  // Navigate to Sauce Demo login page
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveTitle('Swag Labs');

  // Fill login credentials
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');

  // Submit login form
  await page.click('[data-test="login-button"]');

  // Verify URL transition to inventory page
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  // Verify "Products" heading is visible (confirms authenticated inventory page)
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toContainText('Products');

  // Verify hamburger menu button is visible (app-level nav only in authenticated state)
  await expect(page.getByRole('button', { name: 'Open Menu' })).toBeVisible();

  // Verify product grid is rendered with products
  const productItems = page.locator('[data-test="inventory-item"]');
  await expect(productItems).toHaveCount(6);

  // Verify each product has expected structure (name, description, price, add to cart button)
  for (let i = 0; i < 6; i++) {
    const item = productItems.nth(i);
    
    // Product name link
    await expect(item.locator('[data-test="inventory-item-name"]')).toBeVisible();
    
    // Product description
    await expect(item.locator('[data-test="inventory-item-desc"]')).toBeVisible();
    
    // Product price
    await expect(item.locator('[data-test="inventory-item-price"]')).toBeVisible();
    
    // Add to cart button
    await expect(item.getByRole('button', { name: /Add to cart/i })).toBeVisible();
  }

  // Verify login form is completely removed from accessibility tree
  await expect(page.getByRole('textbox', { name: 'Username' })).not.toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Password' })).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Login' })).not.toBeVisible();
});
