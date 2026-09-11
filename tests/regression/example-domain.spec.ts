import { test, expect } from '@playwright/test';

test.describe('Example Domain', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com/');
  });

  test('should display the Example Domain heading as h1', async ({ page }) => {
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Example Domain');
  });

  test('should display introductory description paragraph', async ({ page }) => {
    const mainContent = page.locator('body');
    await expect(mainContent).toContainText('This domain is for use in documentation examples without needing permission');
    await expect(mainContent).toContainText('Avoid use in operations');
  });

  test('should display Learn more link with correct href', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Learn more' });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'https://iana.org/domains/example');
  });

  test('should have correct page title', async ({ page }) => {
    await expect(page).toHaveTitle('Example Domain');
  });

  test('should navigate to IANA example domains when Learn more link is clicked', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Learn more' });
    
    // Create a promise that resolves when navigation completes
    const navigationPromise = page.waitForNavigation();
    
    // Click the link
    await link.click();
    
    // Wait for navigation to complete
    await navigationPromise;
    
    // Verify we navigated to the expected URL
    expect(page.url()).toContain('iana.org');
  });

  test('should have single h1 heading on page', async ({ page }) => {
    const headings = page.getByRole('heading', { level: 1 });
    await expect(headings).toHaveCount(1);
  });

  test('should display complete content without layout issues', async ({ page }) => {
    // Verify the main heading is visible and properly positioned
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeInViewport();
    
    // Verify the Learn more link is in the viewport
    const link = page.getByRole('link', { name: 'Learn more' });
    await expect(link).toBeInViewport();
  });
});
