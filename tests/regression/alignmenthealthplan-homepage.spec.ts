import { test, expect, Page } from '@playwright/test';

const ALIGNMENT_HOMEPAGE = 'https://www.alignmenthealthplan.com/';
const MAX_RETRIES = 2;

/**
 * Regression test suite for Alignment Health Plan homepage
 * Tests the main landing page at https://www.alignmenthealthplan.com/
 * 
 * Note: The site has been intermittently slow, so navigation includes retry logic
 */

/**
 * Navigate to homepage with retry logic for intermittent slowness
 */
async function navigateToHomepage(page: Page) {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      await page.goto(ALIGNMENT_HOMEPAGE, { waitUntil: 'domcontentloaded' });
      return; // Success
    } catch (error) {
      lastError = error as Error;
      if (attempt < MAX_RETRIES) {
        // Wait before retrying
        await page.waitForTimeout(1000);
      }
    }
  }
  
  throw lastError;
}

test.describe('Alignment Health Plan Homepage', () => {
  test('should load the homepage successfully', async ({ page }) => {
    await navigateToHomepage(page);
    
    // Verify page title
    expect(page).toHaveTitle(/Medicare Advantage Plans that Put You First/);
  });

  test('should display the main heading with correct text', async ({ page }) => {
    await navigateToHomepage(page);
    
    // Verify main h1 heading text
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toBeVisible();
    await expect(mainHeading).toHaveText('MEDICARE ADVANTAGE PLANS THAT PUT YOU FIRST!');
  });

  test('should have navigation menu items with correct roles', async ({ page }) => {
    await navigateToHomepage(page);
    
    // Verify menubar exists
    const menubar = page.locator('[role="menubar"]');
    await expect(menubar).toBeVisible();
    
    // Verify specific menu items exist with correct roles
    const discoverAlignment = page.locator('[role="menuitem"]:has-text("Discover Alignment")');
    await expect(discoverAlignment).toBeVisible();
    
    const findPlans = page.locator('[role="menuitem"]:has-text("Find Plans")');
    await expect(findPlans).toBeVisible();
    
    const findCare = page.locator('[role="menuitem"]:has-text("Find Care")');
    await expect(findCare).toBeVisible();
    
    const forMembers = page.locator('[role="menuitem"]:has-text("For Members")');
    await expect(forMembers).toBeVisible();
    
    const forProviders = page.locator('[role="menuitem"]:has-text("For Providers")');
    await expect(forProviders).toBeVisible();
  });

  test('should display phone number for enrollment', async ({ page }) => {
    await navigateToHomepage(page);
    
    // Verify phone number link is displayed
    const phoneLink = page.getByRole('link', { name: /1-888-293-8272/ });
    await expect(phoneLink).toBeVisible();
    await expect(phoneLink).toHaveAttribute('href', 'tel:1-888-293-8272');
  });

  test('should have top navigation links (Member Login, Provider Login, For Agents, Contact Us)', async ({ page }) => {
    await navigateToHomepage(page);
    
    // Verify top navigation links exist
    const memberLogin = page.getByRole('link', { name: 'Member Login' });
    await expect(memberLogin).toBeVisible();
    await expect(memberLogin).toHaveAttribute('href', 'https://members.alignmenthealthplan.com');
    
    const providerLogin = page.getByRole('link', { name: 'Provider Login' });
    await expect(providerLogin).toBeVisible();
    await expect(providerLogin).toHaveAttribute('href', 'https://ava.alignmenthealth.com');
    
    const forAgents = page.getByRole('link', { name: 'For Agents' });
    await expect(forAgents).toBeVisible();
    await expect(forAgents).toHaveAttribute('href', 'https://www.alignmenthealth.com/Partners/Brokers');
    
    const contactUs = page.getByRole('link', { name: 'Contact Us' });
    await expect(contactUs).toBeVisible();
    await expect(contactUs).toHaveAttribute('href', '/about-us/contact-us');
  });

  test('should display "Enroll Now" button in header', async ({ page }) => {
    await navigateToHomepage(page);
    
    // Verify Enroll Now button exists and is clickable
    const enrollButton = page.getByRole('link', { name: 'Enroll Now' });
    await expect(enrollButton).toBeVisible();
    await expect(enrollButton).toHaveAttribute('href', '/find-a-plan');
  });

  test('should display logo as home link', async ({ page }) => {
    await navigateToHomepage(page);
    
    // Verify logo link exists and navigates to home
    const logoLink = page.locator('link[href="/"] img[alt="AlignmentHealthPlan"]').locator('..').first();
    await expect(logoLink).toBeVisible();
  });
});
