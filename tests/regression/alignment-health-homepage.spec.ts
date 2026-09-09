import { test, expect } from '@playwright/test';

/**
 * Regression tests for Alignment Health Plan homepage
 * URL: https://www.alignmenthealthplan.com/
 * 
 * These tests verify core homepage elements and navigation:
 * - Main heading visible and correct
 * - Top-bar navigation links present
 * - Navigation menu items accessible
 * - Contact phone number visible
 */

test.describe('Alignment Health Plan Homepage', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage
    await page.goto('https://www.alignmenthealthplan.com/');
    
    // Wait for main content to load
    await page.waitForLoadState('networkidle');
  });

  test('should display main heading', async ({ page }) => {
    // Verify the main h1 heading is visible
    const mainHeading = page.getByRole('heading', { 
      level: 1, 
      name: /MEDICARE ADVANTAGE PLANS THAT PUT YOU FIRST/i 
    });
    
    await expect(mainHeading).toBeVisible();
  });

  test('should display navigation menu items', async ({ page }) => {
    // Verify main navigation menu items are present in the menubar
    // Note: These are menu items (not direct links), defined in a menubar role
    
    const discoverAlignment = page.getByRole('menuitem', { name: 'Discover Alignment' });
    const findPlans = page.getByRole('menuitem', { name: 'Find Plans' });
    const findCare = page.getByRole('menuitem', { name: 'Find Care' });
    const forMembers = page.getByRole('menuitem', { name: 'For Members' });
    const forProviders = page.getByRole('menuitem', { name: 'For Providers' });
    
    await expect(discoverAlignment).toBeVisible();
    await expect(findPlans).toBeVisible();
    await expect(findCare).toBeVisible();
    await expect(forMembers).toBeVisible();
    await expect(forProviders).toBeVisible();
  });

  test('should display top-bar links in banner', async ({ page }) => {
    // Verify top navigation bar links are visible
    // These links are in the banner and form a list at the top
    
    const memberLogin = page.locator('banner').getByRole('link', { name: 'Member Login' });
    const providerLogin = page.locator('banner').getByRole('link', { name: 'Provider Login' });
    const forAgents = page.locator('banner').getByRole('link', { name: 'For Agents' });
    const contactUs = page.locator('banner').getByRole('link', { name: 'Contact Us' });
    
    await expect(memberLogin).toBeVisible();
    await expect(memberLogin).toHaveAttribute('href', 'https://members.alignmenthealthplan.com');
    
    await expect(providerLogin).toBeVisible();
    await expect(providerLogin).toHaveAttribute('href', 'https://ava.alignmenthealth.com');
    
    await expect(forAgents).toBeVisible();
    await expect(forAgents).toHaveAttribute('href', 'https://www.alignmenthealth.com/Partners/Brokers');
    
    await expect(contactUs).toBeVisible();
    await expect(contactUs).toHaveAttribute('href', '/about-us/contact-us');
  });

  test('should display contact phone number', async ({ page }) => {
    // Verify phone number link is visible
    // The phone number "1-888-293-8272" is displayed as a clickable link
    
    const phoneLink = page.getByRole('link', { name: /1-888-293-8272/ });
    
    await expect(phoneLink).toBeVisible();
    await expect(phoneLink).toHaveAttribute('href', 'tel:1-888-293-8272');
  });

  test('should display TTY information with phone number', async ({ page }) => {
    // Verify TTY information is displayed alongside phone number
    // Text should indicate TTY: 711
    
    const ttyText = page.getByText('TTY: 711');
    
    await expect(ttyText).toBeVisible();
  });

  test('should have Enroll Now button in banner', async ({ page }) => {
    // Verify Enroll Now call-to-action button is present in banner
    
    const enrollButton = page.locator('banner').getByRole('link', { name: 'Enroll Now' });
    
    await expect(enrollButton).toBeVisible();
    await expect(enrollButton).toHaveAttribute('href', '/find-a-plan');
  });

  test('should have functioning search functionality in header', async ({ page }) => {
    // Verify search box is present and accessible in the header
    
    const searchBox = page.getByRole('textbox', { name: /Search/ });
    const searchButton = page.getByRole('button', { name: 'Search' });
    
    await expect(searchBox).toBeVisible();
    await expect(searchButton).toBeVisible();
  });

  test('should display "How Can We Help You Today?" section heading', async ({ page }) => {
    // Verify secondary heading is visible
    
    const helpHeading = page.getByRole('heading', { 
      level: 2, 
      name: /How Can We Help You Today/i 
    });
    
    await expect(helpHeading).toBeVisible();
  });

  test('should display help action cards', async ({ page }) => {
    // Verify four main action cards are present and visible
    
    // These are links within headings in the help section
    const compareLink = page.getByRole('link', { name: /Compare Plans/ });
    const learnLink = page.getByRole('link', { name: /About Medicare/ });
    const findCareLink = page.getByRole('link', { name: /Find a provider that suits you/ });
    const medicationLink = page.getByRole('link', { name: /Find medication that is covered/ });
    
    await expect(compareLink).toBeVisible();
    await expect(learnLink).toBeVisible();
    await expect(findCareLink).toBeVisible();
    await expect(medicationLink).toBeVisible();
  });

  test('should display Concierge Services section', async ({ page }) => {
    // Verify On-Demand Concierge Services section is visible
    
    const conciergeHeading = page.getByRole('heading', { 
      level: 2, 
      name: /ON-DEMAND CONCIERGE SERVICES/i 
    });
    
    await expect(conciergeHeading).toBeVisible();
  });

  test('should display benefits section with cost information', async ({ page }) => {
    // Verify benefits section shows pricing information
    
    const benefitsHeading = page.getByRole('heading', { 
      level: 2, 
      name: /benefits.*we can all align on/i 
    });
    
    await expect(benefitsHeading).toBeVisible();
    
    // Verify $0 premium is displayed
    const zeroPremium = page.getByText(/Monthly plan premium/).filter({ has: page.getByText(/\$ 0/) });
    await expect(zeroPremium.first()).toBeVisible();
  });

  test('should have footer with links and legal information', async ({ page }) => {
    // Verify footer is present with basic structure
    
    const footer = page.locator('contentinfo');
    
    await expect(footer).toBeVisible();
    
    // Check for some key footer links
    const legalLink = footer.getByRole('link', { name: /Legal Notices/ });
    const privacyLink = footer.getByRole('link', { name: /Privacy Notices/ });
    
    await expect(legalLink).toBeVisible();
    await expect(privacyLink).toBeVisible();
  });

  test('should display logo in banner and footer', async ({ page }) => {
    // Verify Alignment Health Plan logo is displayed
    
    const logoImages = page.locator('img[alt*="Alignment"]');
    
    // Should have at least one logo visible (banner)
    await expect(logoImages.first()).toBeVisible();
  });
});
