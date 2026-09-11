import { test, expect } from '@playwright/test';

test.describe('Example Domain Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the target URL
    await page.goto('https://example.com');
  });

  test('should display the page title correctly', async ({ page }) => {
    // Verify the page title is "Example Domain"
    await expect(page).toHaveTitle('Example Domain');
  });

  test('should display the main heading', async ({ page }) => {
    // Verify the h1 heading "Example Domain" is visible
    const heading = page.getByRole('heading', { name: 'Example Domain', level: 1 });
    await expect(heading).toBeVisible();
  });

  test('should display the descriptive text content', async ({ page }) => {
    // Verify the description paragraph is visible and contains expected text
    const description = page.getByText('This domain is for use in documentation examples without needing permission. Avoid use in operations.');
    await expect(description).toBeVisible();
  });

  test('should have a "Learn more" link pointing to IANA', async ({ page }) => {
    // Verify the link is visible and has correct href
    const learnMoreLink = page.getByRole('link', { name: 'Learn more' });
    await expect(learnMoreLink).toBeVisible();
    await expect(learnMoreLink).toHaveAttribute('href', 'https://iana.org/domains/example');
  });

  test('should navigate when clicking the "Learn more" link', async ({ page, context }) => {
    // Listen for new page (in case it opens in a new tab/window)
    const [popup] = await Promise.all([
      context.waitForEvent('page'),
      page.getByRole('link', { name: 'Learn more' }).click()
    ]);
    
    // Verify navigation occurred
    await expect(popup).toHaveURL('https://iana.org/domains/example');
  });

  test('should have proper semantic structure', async ({ page }) => {
    // Verify the page has the expected content hierarchy
    // Check for heading
    const mainHeading = page.getByRole('heading', { level: 1 });
    await expect(mainHeading).toHaveText('Example Domain');
    
    // Check that there are paragraphs with content
    const paragraphs = page.locator('p');
    await expect(paragraphs).toHaveCount(2);
  });

  test('should be accessible with keyboard navigation', async ({ page }) => {
    // Tab to the learn more link
    await page.keyboard.press('Tab');
    
    // Verify the link is focused
    const learnMoreLink = page.getByRole('link', { name: 'Learn more' });
    await expect(learnMoreLink).toBeFocused();
  });

  test('should contain proper link text (not generic)', async ({ page }) => {
    // Verify the link has meaningful text, not "click here" or similar
    const links = page.locator('a');
    const linkText = await links.first().textContent();
    
    // Link should contain "Learn more", not empty or generic text
    expect(linkText?.trim()).toBe('Learn more');
  });
});
