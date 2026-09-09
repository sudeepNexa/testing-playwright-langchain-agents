import { test, expect } from '@playwright/test';

test.describe('Example Domain - Public Content', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com/');
  });

  test('should display the Example Domain heading', async ({ page }) => {
    const heading = page.locator('heading', { hasText: 'Example Domain' });
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Example Domain');
  });

  test('should display descriptive paragraph about domain usage', async ({ page }) => {
    const paragraph = page.locator('paragraph').first();
    await expect(paragraph).toBeVisible();
    await expect(paragraph).toContainText('This domain is for use in documentation examples');
    await expect(paragraph).toContainText('Avoid use in operations');
  });

  test('should display Learn more link pointing to IANA', async ({ page }) => {
    const link = page.locator('a', { hasText: 'Learn more' });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'https://iana.org/domains/example');
  });

  test('should have correct page title', async ({ page }) => {
    await expect(page).toHaveTitle('Example Domain');
  });

  test('should contain all required content elements', async ({ page }) => {
    // Verify heading
    const heading = page.locator('heading');
    await expect(heading).toHaveCount(1);
    await expect(heading.first()).toHaveText('Example Domain');

    // Verify descriptive content exists
    const paragraphs = page.locator('paragraph');
    await expect(paragraphs.first()).toContainText('This domain is for use in documentation examples');

    // Verify link exists and is accessible
    const link = page.locator('a', { hasText: 'Learn more' });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'https://iana.org/domains/example');
  });
});
