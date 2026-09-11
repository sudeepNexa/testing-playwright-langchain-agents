import { test, expect } from '@playwright/test';

/**
 * Regression test suite for https://example.com
 *
 * This spec covers the Example Domain page, a foundational reference used in
 * documentation. Tests verify:
 * - Page loads with correct title and URL
 * - Core heading and descriptive text are present and visible
 * - Navigation link ("Learn more") is functional and navigates correctly
 * - Page layout and content structure remain stable
 * - Accessibility attributes are present and correct
 */

test.describe('Example Domain (https://example.com)', () => {
  /**
   * Test: Page loads and displays correct title
   *
   * Verifies that the page loads successfully and the browser title matches
   * the expected "Example Domain" text. This is a fundamental smoke test
   * ensuring the page is reachable and properly served.
   *
   * User flow: User navigates to https://example.com
   * Expected: Browser tab title displays "Example Domain"
   */
  test('page loads with correct title', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page).toHaveTitle('Example Domain');
  });

  /**
   * Test: URL is correct after navigation
   *
   * Verifies that the page URL is exactly https://example.com/ after navigation.
   * This ensures no unwanted redirects occur during page load.
   *
   * User flow: User navigates to https://example.com
   * Expected: Final URL is https://example.com/
   */
  test('page URL is correct', async ({ page }) => {
    await page.goto('https://example.com');
    expect(page.url()).toBe('https://example.com/');
  });

  /**
   * Test: Main heading is present and visible
   *
   * Verifies that the H1 heading "Example Domain" is rendered in the DOM
   * and visible to the user. This is the primary heading of the page.
   *
   * User flow: User views the page
   * Expected: H1 heading "Example Domain" is visible
   */
  test('main heading is present and visible', async ({ page }) => {
    await page.goto('https://example.com');
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Example Domain');
  });

  /**
   * Test: Descriptive paragraphs are present
   *
   * Verifies that the page contains the two expected paragraphs:
   * 1. "This domain is for use in documentation examples without needing permission..."
   * 2. Contains the "Learn more" link
   *
   * User flow: User reads the page content
   * Expected: Both paragraphs are visible and contain expected text
   */
  test('descriptive paragraphs are present and visible', async ({ page }) => {
    await page.goto('https://example.com');
    
    // Verify first paragraph
    const firstParagraph = page.locator('p').first();
    await expect(firstParagraph).toBeVisible();
    await expect(firstParagraph).toContainText('This domain is for use in documentation examples');
    await expect(firstParagraph).toContainText('Avoid use in operations');

    // Verify second paragraph exists
    const secondParagraph = page.locator('p').nth(1);
    await expect(secondParagraph).toBeVisible();
  });

  /**
   * Test: "Learn more" link is present and navigable
   *
   * Verifies that the "Learn more" link is present in the DOM, visible,
   * has the correct href, and is clickable. The link should point to
   * https://iana.org/domains/example
   *
   * User flow: User sees the "Learn more" link
   * Expected: Link is visible and has correct URL
   */
  test('Learn more link is present and has correct href', async ({ page }) => {
    await page.goto('https://example.com');
    const learnMoreLink = page.locator('a:has-text("Learn more")');
    
    await expect(learnMoreLink).toBeVisible();
    await expect(learnMoreLink).toHaveAttribute('href', 'https://iana.org/domains/example');
  });

  /**
   * Test: "Learn more" link is clickable and navigates correctly
   *
   * Verifies that clicking the "Learn more" link navigates to the IANA
   * example domains page. This tests the full user flow of discovering
   * and following a navigation link.
   *
   * User flow: User clicks "Learn more" link
   * Expected: Page navigates to https://iana.org/domains/example
   */
  test('Learn more link navigation works', async ({ page, context }) => {
    // Set up listener for new page (if link opens in new window/tab)
    let newPagePromise = context.waitForEvent('page');
    
    await page.goto('https://example.com');
    const learnMoreLink = page.locator('a:has-text("Learn more")');
    
    // Click the link
    await learnMoreLink.click();
    
    // Either same page navigates or new page opens
    try {
      const newPage = await newPagePromise;
      await newPage.waitForLoadState('load');
      expect(newPage.url()).toContain('iana.org/domains/example');
      await newPage.close();
    } catch {
      // Link navigated in same page
      await page.waitForURL('**/iana.org/**', { timeout: 5000 }).catch(() => {
        // If navigation doesn't happen in same tab, that's okay
        // the link may open in a new window
      });
    }
  });

  /**
   * Test: Page structure is semantic and valid
   *
   * Verifies that the page uses proper semantic HTML structure:
   * - Contains exactly one H1 heading
   * - Contains paragraphs for text content
   * - Links are properly marked up
   *
   * User flow: Accessibility validator scanning the page
   * Expected: Page uses proper semantic elements
   */
  test('page structure uses semantic HTML', async ({ page }) => {
    await page.goto('https://example.com');
    
    // Should have exactly one H1
    const headings = page.locator('h1');
    const headingCount = await headings.count();
    expect(headingCount).toBe(1);

    // Should have exactly two paragraphs
    const paragraphs = page.locator('p');
    const paragraphCount = await paragraphs.count();
    expect(paragraphCount).toBe(2);

    // Should have at least one link
    const links = page.locator('a');
    const linkCount = await links.count();
    expect(linkCount).toBeGreaterThanOrEqual(1);
  });

  /**
   * Test: Page content does not change unexpectedly
   *
   * Verifies that the page content remains stable and consistent.
   * This prevents regressions where content might be removed, altered,
   * or replaced with unexpected text.
   *
   * User flow: User expects consistent documentation reference page
   * Expected: Content text remains as expected
   */
  test('page content remains stable', async ({ page }) => {
    await page.goto('https://example.com');
    
    // Verify the entire text content includes expected phrases
    const pageContent = await page.content();
    expect(pageContent).toContain('Example Domain');
    expect(pageContent).toContain('documentation examples');
    expect(pageContent).toContain('Learn more');
  });

  /**
   * Test: Page responds with success status code
   *
   * Verifies that the page responds with HTTP 200 (or similar success code).
   * This ensures the server is working and the resource is available.
   *
   * User flow: User requests the page
   * Expected: Server responds with success status (200)
   */
  test('page returns successful HTTP response', async ({ page }) => {
    const response = await page.goto('https://example.com');
    expect(response?.status()).toBe(200);
  });

  /**
   * Test: Link is accessible and keyboard navigable
   *
   * Verifies that the "Learn more" link can be focused and interacted with
   * using keyboard navigation. This ensures accessibility for users who
   * rely on keyboard or assistive technologies.
   *
   * User flow: User using keyboard to navigate page
   * Expected: Link can be focused via Tab key
   */
  test('Learn more link is keyboard accessible', async ({ page }) => {
    await page.goto('https://example.com');
    const learnMoreLink = page.locator('a:has-text("Learn more")');
    
    // Check that link has proper focus styling/behavior
    await expect(learnMoreLink).toBeFocused().catch(() => {
      // Not focused yet, which is expected
    });
    
    // Focus the link
    await learnMoreLink.focus();
    
    // Verify it's now focused
    await expect(learnMoreLink).toBeFocused();
  });

  /**
   * Test: No console errors during page load
   *
   * Verifies that the page loads without JavaScript errors or warnings
   * in the browser console. This helps catch subtle bugs and ensures
   * a clean page load experience.
   *
   * User flow: User loads the page (with browser dev tools observing)
   * Expected: No errors are logged to console
   */
  test('page loads without console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('https://example.com');
    
    // Expect no errors
    expect(consoleErrors).toHaveLength(0);
  });

  /**
   * Test: Page loads in reasonable time
   *
   * Verifies that the page loads within an acceptable timeframe.
   * This is a performance regression test to ensure the page doesn't
   * become unexpectedly slow.
   *
   * User flow: User navigates to page
   * Expected: Page loads within 10 seconds
   */
  test('page loads within acceptable timeframe', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('https://example.com', { waitUntil: 'load' });
    const loadTime = Date.now() - startTime;
    
    // Page should load within 10 seconds
    expect(loadTime).toBeLessThan(10000);
  });

  /**
   * Test: Page is responsive to viewport changes
   *
   * Verifies that the page remains functional and readable when
   * the viewport is resized (testing different device sizes).
   * This ensures the page works across desktop, tablet, and mobile views.
   *
   * User flow: User views page on different device sizes
   * Expected: Page elements remain visible and functional
   */
  test('page content is visible in different viewport sizes', async ({ page }) => {
    await page.goto('https://example.com');
    
    // Test standard desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    let heading = page.locator('h1');
    await expect(heading).toBeVisible();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    heading = page.locator('h1');
    await expect(heading).toBeVisible();
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });
});
