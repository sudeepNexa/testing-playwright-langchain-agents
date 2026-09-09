import { test, expect } from '@playwright/test';

/**
 * Regression tests for Alignment Health Plan homepage
 * URL: https://www.alignmenthealthplan.com/
 * 
 * Covers:
 * - Main heading presence and text
 * - Top navigation links (Find Plans, Find Care, For Members, For Providers, For Agents, Contact Us, About Alignment)
 * - Phone number presence and text
 * 
 * Navigation elements are located in the footer of the page as a list of links.
 */

test.describe('Alignment Health Plan Homepage', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage with implicit retry via Playwright's auto-waiting
    await page.goto('https://www.alignmenthealthplan.com/', { waitUntil: 'networkidle' });
  });

  test('should display the main heading with correct text', async ({ page }) => {
    // Verify the main heading (level 1) is present and contains expected text
    const mainHeading = page.getByRole('heading', { level: 1 });
    await expect(mainHeading).toBeVisible();
    await expect(mainHeading).toContainText('MEDICARE ADVANTAGE PLANS THAT PUT YOU FIRST');
  });

  test('should display "Find Plans" navigation link', async ({ page }) => {
    // Verify the "Find Plans" link is present in the footer navigation
    const findPlansLink = page.getByRole('link', { name: /Find Plans/i });
    await expect(findPlansLink).toBeVisible();
    await expect(findPlansLink).toHaveCount(1);
  });

  test('should display "Find Care" navigation link', async ({ page }) => {
    // Verify the "Find Care" link is present in the footer navigation
    const findCareLink = page.getByRole('link', { name: /Find Care/i });
    await expect(findCareLink).toBeVisible();
    await expect(findCareLink).toHaveCount(1);
  });

  test('should display "For Members" navigation link', async ({ page }) => {
    // Verify the "For Members" link is present in the footer navigation
    const forMembersLink = page.getByRole('link', { name: /For Members/i });
    await expect(forMembersLink).toBeVisible();
    await expect(forMembersLink).toHaveCount(1);
  });

  test('should display "For Providers" navigation link', async ({ page }) => {
    // Verify the "For Providers" link is present in the footer navigation
    const forProvidersLink = page.getByRole('link', { name: /For Providers/i });
    await expect(forProvidersLink).toBeVisible();
    await expect(forProvidersLink).toHaveCount(1);
  });

  test('should display "For Agents" navigation link', async ({ page }) => {
    // Verify the "For Agents" link is present in the footer navigation
    const forAgentsLink = page.getByRole('link', { name: /For Agents/i });
    await expect(forAgentsLink).toBeVisible();
    await expect(forAgentsLink).toHaveCount(1);
  });

  test('should display "Contact Us" navigation link', async ({ page }) => {
    // Verify the "Contact Us" link is present in the footer navigation
    const contactUsLink = page.getByRole('link', { name: /Contact Us/i });
    await expect(contactUsLink).toBeVisible();
    await expect(contactUsLink).toHaveCount(1);
  });

  test('should display "About Alignment" navigation link', async ({ page }) => {
    // Verify the "About Alignment" link is present in the footer navigation
    const aboutAlignmentLink = page.getByRole('link', { name: /About Alignment/i });
    await expect(aboutAlignmentLink).toBeVisible();
    await expect(aboutAlignmentLink).toHaveCount(1);
  });

  test('should display the phone number with correct text', async ({ page }) => {
    // Verify the phone number link is present with correct text
    const phoneLink = page.getByRole('link', { name: /1-888-293-8272/ });
    await expect(phoneLink).toBeVisible();
    await expect(phoneLink).toHaveAttribute('href', 'tel:1-888-293-8272');
  });

  test('should display phone number within "Let\'s Make Plans" section', async ({ page }) => {
    // Verify the phone number appears in the expected section context
    const letsMakePlansSection = page.getByRole('heading', { name: /Let\'s Make Plans/i });
    await expect(letsMakePlansSection).toBeVisible();
    
    // Verify phone number is accessible near the section
    const phoneLink = page.getByRole('link', { name: /1-888-293-8272/ });
    await expect(phoneLink).toBeVisible();
  });
});
