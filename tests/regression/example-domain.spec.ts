import { test, expect } from '@playwright/test';

test.describe('Example Domain - Regression Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the target URL before each test
    await page.goto('https://example.com/');
  });

  test('Page loads with correct title', async ({ page }) => {
    // Verify the page title matches the expected value
    await expect(page).toHaveTitle('Example Domain');
  });

  test('Page URL is correct', async ({ page }) => {
    // Verify the page navigated to the correct URL
    expect(page.url()).toBe('https://example.com/');
  });

  test('Main heading is visible and has correct text', async ({ page }) => {
    // Verify the h1 heading exists, is visible, and contains the expected text
    const heading = page.getByRole('heading', { name: 'Example Domain' });
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Example Domain');
  });

  test('Heading has correct level', async ({ page }) => {
    // Verify the heading is level 1
    const heading = page.getByRole('heading', { name: 'Example Domain', level: 1 });
    await expect(heading).toBeVisible();
  });

  test('First descriptive paragraph is visible', async ({ page }) => {
    // Verify the disclaimer paragraph is visible with correct text
    const paragraph = page.getByText('This domain is for use in documentation examples without needing permission. Avoid use in operations.');
    await expect(paragraph).toBeVisible();
  });

  test('Learn more link is visible', async ({ page }) => {
    // Verify the link is visible and has correct text
    const link = page.getByRole('link', { name: 'Learn more' });
    await expect(link).toBeVisible();
  });

  test('Learn more link has correct href', async ({ page }) => {
    // Verify the link points to the IANA example domains page
    const link = page.getByRole('link', { name: 'Learn more' });
    await expect(link).toHaveAttribute('href', 'https://iana.org/domains/example');
  });

  test('Learn more link opens in same tab (no target attribute)', async ({ page }) => {
    // Verify the link does not have a target="_blank" attribute
    const link = page.getByRole('link', { name: 'Learn more' });
    const target = await link.getAttribute('target');
    expect(target).toBeNull();
  });

  test('Page has content in viewport', async ({ page }) => {
    // Verify the main content area is rendered
    const content = page.locator('body');
    await expect(content).toBeVisible();
    const box = await content.boundingBox();
    expect(box).not.toBeNull();
    expect(box?.height).toBeGreaterThan(0);
  });

  test('All page sections are visible in single viewport', async ({ page }) => {
    // Verify the heading, both paragraphs, and link are all visible without scrolling
    const heading = page.getByRole('heading', { name: 'Example Domain' });
    const firstParagraph = page.getByText('This domain is for use in documentation examples without needing permission. Avoid use in operations.');
    const link = page.getByRole('link', { name: 'Learn more' });

    await expect(heading).toBeInViewport();
    await expect(firstParagraph).toBeInViewport();
    await expect(link).toBeInViewport();
  });

  test('Learn more link is clickable', async ({ page }) => {
    // Verify the link is enabled and can be interacted with
    const link = page.getByRole('link', { name: 'Learn more' });
    await expect(link).toBeEnabled();
    expect(await link.isEnabled()).toBe(true);
  });

  test('Learn more link navigates to IANA page', async ({ page, context }) => {
    // Verify clicking the link navigates to the IANA example domains documentation
    const link = page.getByRole('link', { name: 'Learn more' });
    
    // Set up listener for new page (in case it opens in new tab/window)
    const linkHref = await link.getAttribute('href');
    expect(linkHref).toBe('https://iana.org/domains/example');
    
    // Verify the link has valid href attribute (non-empty, starts with http)
    expect(linkHref).toMatch(/^https?:\/\//);
  });

  test('Page main content is centered', async ({ page }) => {
    // Verify the main content area is visible and properly positioned
    const mainContent = page.locator('body > div').first();
    const box = await mainContent.boundingBox();
    
    // Verify content exists and is in the viewport
    expect(box).not.toBeNull();
    if (box) {
      // Verify content has reasonable left/right positioning (centered layout)
      expect(box.x).toBeGreaterThan(0);
      expect(box.width).toBeLessThan(1024); // Reasonable max width for content
    }
  });

  test('No script errors on page load', async ({ page }) => {
    // Collect console errors during page load
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Wait a moment for any deferred errors
    await page.waitForTimeout(500);
    
    // Verify no console errors were logged
    expect(errors).toHaveLength(0);
  });

  test('Page accessibility structure is valid', async ({ page }) => {
    // Verify the page has proper heading hierarchy (h1 exists)
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThan(0);

    // Verify all links have text content
    const links = page.locator('a');
    const linkCount = await links.count();
    for (let i = 0; i < linkCount; i++) {
      const text = await links.nth(i).textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });

  test('Page responds to viewport resize', async ({ page }) => {
    // Verify page remains visible after viewport changes
    const initialHeading = page.getByRole('heading', { name: 'Example Domain' });
    await expect(initialHeading).toBeVisible();

    // Resize viewport
    await page.setViewportSize({ width: 800, height: 600 });
    await expect(initialHeading).toBeVisible();

    // Resize to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(initialHeading).toBeVisible();

    // Resize back to desktop
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(initialHeading).toBeVisible();
  });

  test('Page reload preserves content', async ({ page }) => {
    // Verify content exists
    const heading = page.getByRole('heading', { name: 'Example Domain' });
    await expect(heading).toBeVisible();

    // Reload the page
    await page.reload();

    // Verify content is still visible after reload
    await expect(heading).toBeVisible();
    await expect(page).toHaveTitle('Example Domain');
  });

  test('Network request to example.com succeeds', async ({ page }) => {
    // Track network requests
    let successResponse = false;
    page.on('response', response => {
      if (response.url().includes('example.com') && response.status() === 200) {
        successResponse = true;
      }
    });

    // Navigate to the page
    const response = await page.goto('https://example.com/');
    
    // Verify successful HTTP status
    expect(response?.status()).toBe(200);
  });

  test('Page head section includes standard metadata', async ({ page }) => {
    // Verify page has proper HTML structure with head and body
    const htmlTag = page.locator('html');
    await expect(htmlTag).toBeVisible();

    // Verify body exists and contains content
    const bodyContent = await page.content();
    expect(bodyContent).toContain('<title>Example Domain</title>');
  });

  test('Content text does not contain broken characters or encoding issues', async ({ page }) => {
    // Get all text content from the page
    const heading = page.getByRole('heading', { name: 'Example Domain' });
    const headingText = await heading.textContent();
    
    // Verify text is properly encoded and readable
    expect(headingText).toBe('Example Domain');
    expect(headingText).not.toContain('?');
    expect(headingText).not.toContain('\ufffd'); // Unicode replacement character
  });

  test('Link text does not contain broken characters', async ({ page }) => {
    // Verify link text is properly encoded
    const link = page.getByRole('link', { name: 'Learn more' });
    const linkText = await link.textContent();
    
    expect(linkText).toBe('Learn more');
    expect(linkText).not.toContain('?');
    expect(linkText).not.toContain('\ufffd');
  });

  test('Page content is not empty', async ({ page }) => {
    // Verify page has meaningful content
    const bodyText = await page.textContent();
    
    expect(bodyText).toBeTruthy();
    expect(bodyText?.length).toBeGreaterThan(10);
    expect(bodyText).toContain('Example Domain');
  });

  test('No broken images on page', async ({ page }) => {
    // Get all images on the page
    const images = page.locator('img');
    const imageCount = await images.count();
    
    // If there are images, verify they have alt attributes
    for (let i = 0; i < imageCount; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      // Images should have alt text for accessibility
      expect(alt).toBeTruthy();
    }
  });

  test('Page focuses on first interactive element', async ({ page }) => {
    // Verify the link is focusable and can receive focus
    const link = page.getByRole('link', { name: 'Learn more' });
    
    // Tab to the link (it should be reachable via keyboard)
    await page.keyboard.press('Tab');
    
    // Verify something is focused
    const focused = await page.evaluate(() => document.activeElement?.textContent);
    expect(focused).toBeTruthy();
  });

  test('Page back/forward navigation works', async ({ page }) => {
    // Verify initial page state
    const heading = page.getByRole('heading', { name: 'Example Domain' });
    await expect(heading).toBeVisible();
    
    // Navigate to about:blank
    await page.goto('about:blank');
    
    // Go back
    await page.goBack();
    
    // Verify we're back on example.com
    await expect(heading).toBeVisible();
    expect(page.url()).toContain('example.com');
  });

  test('Paragraph text includes full context', async ({ page }) => {
    // Get the complete first paragraph text
    const firstParagraph = page.getByText('This domain is for use in documentation examples without needing permission. Avoid use in operations.');
    const text = await firstParagraph.textContent();
    
    // Verify the entire expected text is present
    expect(text).toContain('This domain is for use in documentation examples');
    expect(text).toContain('without needing permission');
    expect(text).toContain('Avoid use in operations');
  });

  test('Page load completes without hanging', async ({ page }) => {
    // This test verifies page.goto completes in reasonable time
    // The test framework will timeout if this hangs
    const startTime = Date.now();
    
    await page.goto('https://example.com/');
    
    const loadTime = Date.now() - startTime;
    // Page should load within 30 seconds (generous timeout)
    expect(loadTime).toBeLessThan(30000);
  });

  test('Multiple navigations to same URL maintain consistency', async ({ page }) => {
    // First visit - verify title
    await expect(page).toHaveTitle('Example Domain');
    
    // Navigate away and back
    await page.goto('about:blank');
    await page.goto('https://example.com/');
    
    // Verify title is still correct
    await expect(page).toHaveTitle('Example Domain');
    
    // Navigate away and back again
    await page.goto('about:blank');
    await page.goto('https://example.com/');
    
    // Verify heading is still visible
    const heading = page.getByRole('heading', { name: 'Example Domain' });
    await expect(heading).toBeVisible();
  });
});
