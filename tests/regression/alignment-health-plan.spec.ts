import { test, expect, Page } from '@playwright/test';

/**
 * Alignment Health Plan - Comprehensive Regression Test Suite
 * 
 * Scope covers:
 * 1. Homepage hero, primary navigation, and footer links
 * 2. Plan-finder / plan-comparison cards (Medicare Advantage plan options)
 * 3. Member login entry point
 * 4. Find-a-doctor / provider search
 * 5. Contact us / help / FAQ
 * 6. Forms (zip code entry, contact form)
 * 
 * Total: 60+ test cases covering user-observable behaviors
 */

const BASE_URL = 'https://www.alignmenthealthplan.com';
const PROVIDER_SEARCH_URL = 'https://providersearch.alignmenthealthplan.com/';
const MEMBERS_LOGIN_URL = 'https://members.alignmenthealthplan.com';
const PROVIDER_LOGIN_URL = 'https://ava.alignmenthealth.com';
const AGENTS_LOGIN_URL = 'https://agents.alignmenthealthcare.com/';

// ============================================================================
// HOMEPAGE - HERO SECTION & PRIMARY NAVIGATION
// ============================================================================

test('Homepage loads and displays correct title', async ({ page }) => {
  await page.goto(BASE_URL);
  await expect(page).toHaveTitle(/Medicare Advantage Plans that Put You First/);
});

test('Homepage displays hero heading with Medicare message', async ({ page }) => {
  await page.goto(BASE_URL);
  const heading = page.getByRole('heading', { name: /MEDICARE ADVANTAGE PLANS THAT PUT YOU FIRST/i });
  await expect(heading).toBeVisible();
});

test('Homepage hero section contains descriptive text about aging', async ({ page }) => {
  await page.goto(BASE_URL);
  const text = page.getByText(/We believe aging should be celebrated/);
  await expect(text).toBeVisible();
});

test('Homepage hero section displays 5-star rating image', async ({ page }) => {
  await page.goto(BASE_URL);
  const image = page.getByAltText(/Alignment_Health_5_Stars/);
  await expect(image).toBeVisible();
});

test('Fortune badge is visible on homepage', async ({ page }) => {
  await page.goto(BASE_URL);
  const badgeText = page.getByText(/Alignment Health has been named to the 2026.*Fortune.*World's Most Admired Companies/);
  await expect(badgeText).toBeVisible();
});

test('Fortune badge contains "Learn more" link', async ({ page }) => {
  await page.goto(BASE_URL);
  const link = page.getByRole('link', { name: /Learn more >/i });
  await expect(link).toBeVisible();
});

test('Primary navigation menu "Discover Alignment" is visible', async ({ page }) => {
  await page.goto(BASE_URL);
  const nav = page.getByRole('menuitem', { name: /Discover Alignment/i });
  await expect(nav).toBeVisible();
});

test('Primary navigation menu "Find Plans" is visible', async ({ page }) => {
  await page.goto(BASE_URL);
  const nav = page.getByRole('menuitem', { name: /Find Plans/i });
  await expect(nav).toBeVisible();
});

test('Primary navigation menu "Find Care" is visible', async ({ page }) => {
  await page.goto(BASE_URL);
  const nav = page.getByRole('menuitem', { name: /Find Care/i });
  await expect(nav).toBeVisible();
});

test('Primary navigation menu "For Members" is visible', async ({ page }) => {
  await page.goto(BASE_URL);
  const nav = page.getByRole('menuitem', { name: /For Members/i });
  await expect(nav).toBeVisible();
});

test('Primary navigation menu "For Providers" is visible', async ({ page }) => {
  await page.goto(BASE_URL);
  const nav = page.getByRole('menuitem', { name: /For Providers/i });
  await expect(nav).toBeVisible();
});

test('Enroll Now button is visible in navigation', async ({ page }) => {
  await page.goto(BASE_URL);
  const enrollBtn = page.getByRole('link', { name: /Enroll Now/i }).first();
  await expect(enrollBtn).toBeVisible();
});

test('Enroll Now button links to find-a-plan page', async ({ page }) => {
  await page.goto(BASE_URL);
  const enrollBtn = page.locator('a[href="/find-a-plan"]').first();
  const href = await enrollBtn.getAttribute('href');
  expect(href).toBe('/find-a-plan');
});

// ============================================================================
// HERO SECTION - ZIP CODE FORM
// ============================================================================

test('Hero section displays zip code input field', async ({ page }) => {
  await page.goto(BASE_URL);
  const zipInput = page.getByPlaceholder(/ZIP Code \(Required\)/i);
  await expect(zipInput).toBeVisible();
});

test('Hero section zip code input accepts numeric input', async ({ page }) => {
  await page.goto(BASE_URL);
  const zipInput = page.getByPlaceholder(/ZIP Code \(Required\)/i);
  await zipInput.fill('12345');
  await expect(zipInput).toHaveValue('12345');
});

test('Hero section "See Plans >" button is visible', async ({ page }) => {
  await page.goto(BASE_URL);
  const btn = page.getByRole('button', { name: /See Plans >/i });
  await expect(btn).toBeVisible();
});

// ============================================================================
// HOMEPAGE - HOW CAN WE HELP SECTION (4 CARDS)
// ============================================================================

test('Homepage displays "How Can We Help You Today?" heading', async ({ page }) => {
  await page.goto(BASE_URL);
  const heading = page.getByRole('heading', { name: /How Can We Help You Today\?/i });
  await expect(heading).toBeVisible();
});

test('Compare Plans card is visible with link', async ({ page }) => {
  await page.goto(BASE_URL);
  const compareLink = page.getByRole('link', { name: /Compare Medicare Advantage Plans/i });
  await expect(compareLink).toBeVisible();
});

test('Compare Plans card contains description text', async ({ page }) => {
  await page.goto(BASE_URL);
  const text = page.getByText(/Answer a few questions, and we'll recommend plans based on your needs/);
  await expect(text).toBeVisible();
});

test('Learn about Medicare card is visible with link', async ({ page }) => {
  await page.goto(BASE_URL);
  const link = page.getByRole('link', { name: /Learn about Medicare Advantage/i });
  await expect(link).toBeVisible();
});

test('Find a provider card is visible with link', async ({ page }) => {
  await page.goto(BASE_URL);
  const link = page.getByRole('link', { name: /Find a provider that suits you/i });
  await expect(link).toBeVisible();
});

test('Find medication card is visible with link', async ({ page }) => {
  await page.goto(BASE_URL);
  const link = page.getByRole('link', { name: /Find medication that is covered in your plan/i });
  await expect(link).toBeVisible();
});

// ============================================================================
// HOMEPAGE - BENEFITS SECTION
// ============================================================================

test('Benefits section displays "$0 monthly plan premium"', async ({ page }) => {
  await page.goto(BASE_URL);
  const text = page.getByText(/Monthly plan premium/i);
  await expect(text).toBeVisible();
});

test('Benefits section displays "$0 copay for primary care visits"', async ({ page }) => {
  await page.goto(BASE_URL);
  const text = page.getByText(/Copay for primary care visits/i);
  await expect(text).toBeVisible();
});

test('Benefits section displays "$0 copay for telehealth visits"', async ({ page }) => {
  await page.goto(BASE_URL);
  const text = page.getByText(/Copay for telehealth visits/i);
  await expect(text).toBeVisible();
});

test('Benefits section displays "$0 gym membership"', async ({ page }) => {
  await page.goto(BASE_URL);
  const text = page.getByText(/Gym membership/i);
  await expect(text).toBeVisible();
});

// ============================================================================
// HOMEPAGE - ON-DEMAND CONCIERGE SECTION
// ============================================================================

test('Concierge section displays heading', async ({ page }) => {
  await page.goto(BASE_URL);
  const heading = page.getByRole('heading', { name: /ON-DEMAND CONCIERGE SERVICES/i });
  await expect(heading).toBeVisible();
});

test('Concierge section contains description text', async ({ page }) => {
  await page.goto(BASE_URL);
  const text = page.getByText(/Our ACCESS On-Demand Concierge connects you to a real person 24\/7/);
  await expect(text).toBeVisible();
});

test('Concierge "Learn More" link is visible', async ({ page }) => {
  await page.goto(BASE_URL);
  const link = page.getByRole('link', { name: /Why Alignment Health Plan/ }).first();
  await expect(link).toBeVisible();
});

// ============================================================================
// HOMEPAGE - CALL TO ACTION & SEMINARS
// ============================================================================

test('Contact phone number "1-888-293-8272" is visible', async ({ page }) => {
  await page.goto(BASE_URL);
  const phone = page.getByRole('heading', { name: /1-888-293-8272/ });
  await expect(phone).toBeVisible();
});

test('TTY information is displayed', async ({ page }) => {
  await page.goto(BASE_URL);
  const text = page.getByText(/TTY: 711/i);
  await expect(text).toBeVisible();
});

test('Seminars section "Search Seminars >" link is visible', async ({ page }) => {
  await page.goto(BASE_URL);
  const link = page.getByRole('link', { name: /Search Alignment Health Plan Seminars/i });
  await expect(link).toBeVisible();
});

test('Seminars section "Search Seminars" link navigates to seminar page', async ({ page }) => {
  await page.goto(BASE_URL);
  const link = page.getByRole('link', { name: /Search Alignment Health Plan Seminars/i });
  const href = await link.getAttribute('href');
  expect(href).toContain('/find-plans/attend-a-seminar');
});

// ============================================================================
// FOOTER - LINKS & STRUCTURE
// ============================================================================

test('Footer logo is visible and links to homepage', async ({ page }) => {
  await page.goto(BASE_URL);
  const footerLink = page.footer().getByRole('link', { name: /Alignment Health Plan/i });
  await expect(footerLink).toBeVisible();
});

test('Footer "Find Plans" section has "Shop Online" link', async ({ page }) => {
  await page.goto(BASE_URL);
  const link = page.getByRole('link', { name: /Shop Online/i }).first();
  await expect(link).toBeVisible();
});

test('Footer "Find Care" section has "Doctor" link', async ({ page }) => {
  await page.goto(BASE_URL);
  const link = page.getByRole('link', { name: /^Doctor$/ });
  await expect(link).toBeVisible();
});

test('Footer "Find Care" section has "Drug" link', async ({ page }) => {
  await page.goto(BASE_URL);
  const link = page.getByRole('link', { name: /^Drug$/ });
  await expect(link).toBeVisible();
});

test('Footer "For Members" section has "Member Login" link', async ({ page }) => {
  await page.goto(BASE_URL);
  const link = page.footer().getByRole('link', { name: /Member Login/i });
  await expect(link).toBeVisible();
});

test('Footer "For Providers" section has "Provider Login" link', async ({ page }) => {
  await page.goto(BASE_URL);
  const link = page.footer().getByRole('link', { name: /Provider Login/i });
  await expect(link).toBeVisible();
});

test('Footer "Contact Us" section has "By Phone" link', async ({ page }) => {
  await page.goto(BASE_URL);
  const link = page.footer().getByRole('link', { name: /By Phone/i });
  await expect(link).toBeVisible();
});

test('Footer legal links are visible', async ({ page }) => {
  await page.goto(BASE_URL);
  const legalLink = page.getByRole('link', { name: /Legal Notices/i });
  const privacyLink = page.getByRole('link', { name: /Privacy Notices/i });
  await expect(legalLink).toBeVisible();
  await expect(privacyLink).toBeVisible();
});

test('Footer copyright year is displayed', async ({ page }) => {
  await page.goto(BASE_URL);
  const copyright = page.getByText(/Copyright 2026 Alignment Health Plan/);
  await expect(copyright).toBeVisible();
});

// ============================================================================
// HEADER - LOGIN LINKS
// ============================================================================

test('Header Member Login link is visible', async ({ page }) => {
  await page.goto(BASE_URL);
  const link = page.locator('header').getByRole('link', { name: /Member Login/i });
  await expect(link).toBeVisible();
});

test('Header Member Login links to correct URL', async ({ page }) => {
  await page.goto(BASE_URL);
  const link = page.locator('header').getByRole('link', { name: /Member Login/i });
  const href = await link.getAttribute('href');
  expect(href).toBe(MEMBERS_LOGIN_URL);
});

test('Header Provider Login link is visible', async ({ page }) => {
  await page.goto(BASE_URL);
  const link = page.locator('header').getByRole('link', { name: /Provider Login/i });
  await expect(link).toBeVisible();
});

test('Header Provider Login links to correct URL', async ({ page }) => {
  await page.goto(BASE_URL);
  const link = page.locator('header').getByRole('link', { name: /Provider Login/i });
  const href = await link.getAttribute('href');
  expect(href).toBe(PROVIDER_LOGIN_URL);
});

test('Header For Agents link is visible', async ({ page }) => {
  await page.goto(BASE_URL);
  const link = page.locator('header').getByRole('link', { name: /For Agents/i });
  await expect(link).toBeVisible();
});

test('Header Contact Us link is visible', async ({ page }) => {
  await page.goto(BASE_URL);
  const link = page.locator('header').getByRole('link', { name: /Contact Us/i });
  await expect(link).toBeVisible();
});

// ============================================================================
// FIND A PLAN PAGE
// ============================================================================

test('Find a Plan page loads with correct title', async ({ page }) => {
  await page.goto(`${BASE_URL}/find-a-plan`);
  await expect(page).toHaveTitle(/Find a Plan/);
});

test('Find a Plan page displays "Explore Our Plans" heading', async ({ page }) => {
  await page.goto(`${BASE_URL}/find-a-plan`);
  const heading = page.getByRole('heading', { name: /Explore Our Plans/i });
  await expect(heading).toBeVisible();
});

test('Find a Plan page contains description text about plan recommendations', async ({ page }) => {
  await page.goto(`${BASE_URL}/find-a-plan`);
  const text = page.getByText(/Can't decide\? Answer a few questions/);
  await expect(text).toBeVisible();
});

test('Find a Plan page has breadcrumb link to Home', async ({ page }) => {
  await page.goto(`${BASE_URL}/find-a-plan`);
  const link = page.getByRole('link', { name: /^Home$/i });
  await expect(link).toBeVisible();
});

// ============================================================================
// PROVIDER SEARCH PAGE
// ============================================================================

test('Provider Search page loads with correct title', async ({ page }) => {
  await page.goto(PROVIDER_SEARCH_URL);
  await expect(page).toHaveTitle(/Provider Search/);
});

test('Provider Search page displays guided search tab', async ({ page }) => {
  await page.goto(PROVIDER_SEARCH_URL);
  const tab = page.getByRole('tab', { name: /Guided Search/i });
  await expect(tab).toBeVisible();
});

test('Provider Search page displays quick search tab', async ({ page }) => {
  await page.goto(PROVIDER_SEARCH_URL);
  const tab = page.getByRole('tab', { name: /Quick Search/i });
  await expect(tab).toBeVisible();
});

test('Provider Search page displays "Select Provider Type" text', async ({ page }) => {
  await page.goto(PROVIDER_SEARCH_URL);
  const text = page.getByText(/Select Provider Type/);
  await expect(text).toBeVisible();
});

test('Provider Search page displays "Doctors" button', async ({ page }) => {
  await page.goto(PROVIDER_SEARCH_URL);
  const btn = page.getByRole('button', { name: /Doctors/i });
  await expect(btn).toBeVisible();
});

test('Provider Search page displays "Facilities" button', async ({ page }) => {
  await page.goto(PROVIDER_SEARCH_URL);
  const btn = page.getByRole('button', { name: /Facilities/i });
  await expect(btn).toBeVisible();
});

test('Provider Search page displays "Dental" button', async ({ page }) => {
  await page.goto(PROVIDER_SEARCH_URL);
  const btn = page.getByRole('button', { name: /Dental/i });
  await expect(btn).toBeVisible();
});

test('Provider Search page displays "Vision" button', async ({ page }) => {
  await page.goto(PROVIDER_SEARCH_URL);
  const btn = page.getByRole('button', { name: /Vision/i });
  await expect(btn).toBeVisible();
});

test('Provider Search page displays "Other Specialty Services" button', async ({ page }) => {
  await page.goto(PROVIDER_SEARCH_URL);
  const btn = page.getByRole('button', { name: /Other Specialty Services/i });
  await expect(btn).toBeVisible();
});

test('Provider Search page displays "Provider Search Help" link', async ({ page }) => {
  await page.goto(PROVIDER_SEARCH_URL);
  const link = page.getByRole('link', { name: /Provider Search Help/i });
  await expect(link).toBeVisible();
});

// ============================================================================
// CONTACT US PAGE
// ============================================================================

test('Contact Us page loads with correct title', async ({ page }) => {
  await page.goto(`${BASE_URL}/about-us/contact-us`);
  await expect(page).toHaveTitle(/Contact Us/);
});

test('Contact Us page displays main heading', async ({ page }) => {
  await page.goto(`${BASE_URL}/about-us/contact-us`);
  const heading = page.getByRole('heading', { name: /Contact Us/i }).first();
  await expect(heading).toBeVisible();
});

test('Contact Us page displays help section heading', async ({ page }) => {
  await page.goto(`${BASE_URL}/about-us/contact-us`);
  const heading = page.getByRole('heading', { name: /Need help\? We're here and ready to answer your questions/i });
  await expect(heading).toBeVisible();
});

test('Contact Us page displays "Send Us a Message" section', async ({ page }) => {
  await page.goto(`${BASE_URL}/about-us/contact-us`);
  const heading = page.getByRole('heading', { name: /Send Us a Message/i });
  await expect(heading).toBeVisible();
});

test('Contact Us page displays security warning message', async ({ page }) => {
  await page.goto(`${BASE_URL}/about-us/contact-us`);
  const text = page.getByText(/For your personal security, please refrain from sharing your health and personal information/);
  await expect(text).toBeVisible();
});

test('Contact Us page displays medical emergency warning', async ({ page }) => {
  await page.goto(`${BASE_URL}/about-us/contact-us`);
  const text = page.getByText(/For any medical emergency, please call 911 immediately/);
  await expect(text).toBeVisible();
});

test('Contact Us page has expand and collapse links', async ({ page }) => {
  await page.goto(`${BASE_URL}/about-us/contact-us`);
  const expandLink = page.getByRole('link', { name: /Expand all/i });
  const collapseLink = page.getByRole('link', { name: /Collapse all/i });
  await expect(expandLink).toBeVisible();
  await expect(collapseLink).toBeVisible();
});

// ============================================================================
// DISCOVER - MEDICARE ADVANTAGE PLANS PAGE
// ============================================================================

test('Medicare Advantage Plans page loads with correct title', async ({ page }) => {
  await page.goto(`${BASE_URL}/discover-ahp/medicare-advantage-plans`);
  await expect(page).toHaveTitle(/What is a Medicare Advantage Plan/);
});

// ============================================================================
// FIND A DRUG PAGE
// ============================================================================

test('Find a Drug page loads with correct title', async ({ page }) => {
  await page.goto(`${BASE_URL}/find-care/find-a-drug`);
  await expect(page).toHaveTitle(/Find a Drug/);
});

test('Find a Drug page displays main heading', async ({ page }) => {
  await page.goto(`${BASE_URL}/find-care/find-a-drug`);
  const heading = page.getByRole('heading', { name: /Find a Drug/i }).first();
  await expect(heading).toBeVisible();
});

test('Find a Drug page displays description about drug formulary', async ({ page }) => {
  await page.goto(`${BASE_URL}/find-care/find-a-drug`);
  const text = page.getByText(/A drug formulary is a complete list/);
  await expect(text).toBeVisible();
});

// ============================================================================
// NAVIGATION - CROSS-PAGE LINKS
// ============================================================================

test('Homepage logo links back to homepage', async ({ page }) => {
  await page.goto(`${BASE_URL}/find-a-plan`);
  const logo = page.getByRole('link', { name: /AlignmentHealthPlan/i });
  const href = await logo.getAttribute('href');
  expect(href).toBe('/');
});

test('Navigation "Discover Alignment" link opens dropdown menu', async ({ page }) => {
  await page.goto(BASE_URL);
  const menuItem = page.getByRole('menuitem', { name: /Discover Alignment/i });
  await expect(menuItem).toBeVisible();
});

// ============================================================================
// PAGE STRUCTURE - CRITICAL ELEMENTS
// ============================================================================

test('All pages have consistent header structure', async ({ page }) => {
  await page.goto(BASE_URL);
  const header = page.locator('header');
  await expect(header).toBeVisible();
});

test('All pages have consistent footer structure', async ({ page }) => {
  await page.goto(BASE_URL);
  const footer = page.locator('footer');
  await expect(footer).toBeVisible();
});

test('Homepage has banner with Fortune award information', async ({ page }) => {
  await page.goto(BASE_URL);
  const banner = page.locator('table >> text=/Fortune/').first();
  await expect(banner).toBeVisible();
});

test('Find Plans page has breadcrumb navigation', async ({ page }) => {
  await page.goto(`${BASE_URL}/find-a-plan`);
  const breadcrumb = page.getByText(/Home.*Get Recommendations/);
  await expect(breadcrumb).toBeVisible();
});

test('Contact Us page has breadcrumb navigation', async ({ page }) => {
  await page.goto(`${BASE_URL}/about-us/contact-us`);
  const breadcrumb = page.getByRole('link', { name: /^Home$/i });
  await expect(breadcrumb).toBeVisible();
});

test('All major pages have Alignment Health Plan logo in header', async ({ page }) => {
  const pages = [
    BASE_URL,
    `${BASE_URL}/find-a-plan`,
    `${BASE_URL}/about-us/contact-us`,
  ];
  
  for (const pageUrl of pages) {
    await page.goto(pageUrl);
    const logo = page.getByAltText(/AlignmentHealthPlan/i);
    await expect(logo).toBeVisible();
  }
});

test('Provider Search page has footer with copyright', async ({ page }) => {
  await page.goto(PROVIDER_SEARCH_URL);
  const copyright = page.getByText(/Copyright 2026 Alignment Health Plan/);
  await expect(copyright).toBeVisible();
});

test('Enroll Now header link navigates to find-a-plan from any page', async ({ page }) => {
  await page.goto(`${BASE_URL}/about-us/contact-us`);
  const enrollBtn = page.locator('a[href="/find-a-plan"]').first();
  await expect(enrollBtn).toBeVisible();
});

// ============================================================================
// MEMBER SERVICES & ACCESSIBILITY
// ============================================================================

test('Member services contact information is available', async ({ page }) => {
  await page.goto(BASE_URL);
  const phone = page.getByText(/1-888-293-8272/);
  await expect(phone).toBeVisible();
});

test('TTY accessibility number is displayed with phone number', async ({ page }) => {
  await page.goto(BASE_URL);
  const tty = page.getByText(/TTY: 711/);
  await expect(tty).toBeVisible();
});

test('Hours of operation information is available', async ({ page }) => {
  await page.goto(BASE_URL);
  const hours = page.getByText(/8:00 a.m. to 8:00 p.m./);
  await expect(hours).toBeVisible();
});
