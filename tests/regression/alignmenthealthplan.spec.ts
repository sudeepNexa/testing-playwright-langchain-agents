import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.alignmenthealthplan.com/';

test.describe('Alignment Health Plan - Homepage Regression Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  // ===== HERO SECTION & PAGE TITLE =====
  test('hero-01: page title contains "Medicare Advantage Plans"', async ({ page }) => {
    await expect(page).toHaveTitle(/Medicare Advantage Plans that Put You First/);
  });

  test('hero-02: hero heading displays "MEDICARE ADVANTAGE PLANS THAT PUT YOU FIRST!"', async ({ page }) => {
    const heading = page.getByRole('heading', { level: 1, name: /MEDICARE ADVANTAGE PLANS/ });
    await expect(heading).toBeVisible();
  });

  test('hero-03: hero subtitle describes aging celebration and enrollment', async ({ page }) => {
    const subtitle = page.getByText(/We believe aging should be celebrated/);
    await expect(subtitle).toBeVisible();
  });

  // ===== ZIP CODE ENTRY FORM (Hero Section) =====
  test('hero-04: zip code input field is visible and has correct placeholder', async ({ page }) => {
    const zipInput = page.getByPlaceholder('ZIP Code (Required)');
    await expect(zipInput).toBeVisible();
  });

  test('hero-05: zip code field is required (marked with asterisk)', async ({ page }) => {
    const label = page.getByText('Zip code*');
    await expect(label).toBeVisible();
  });

  test('hero-06: "See Plans >" button is visible in hero section', async ({ page }) => {
    const button = page.getByRole('button', { name: /See Plans >/ });
    await expect(button).toBeVisible();
  });

  test('hero-07: zip code input accepts numeric values', async ({ page }) => {
    const zipInput = page.getByPlaceholder('ZIP Code (Required)');
    await zipInput.fill('12345');
    await expect(zipInput).toHaveValue('12345');
  });

  test('hero-08: 5-star rating image is visible in hero section', async ({ page }) => {
    const starImage = page.getByAltText('Alignment_Health_5_Stars');
    await expect(starImage).toBeVisible();
  });

  // ===== FORTUNE BADGE (Below Hero) =====
  test('hero-09: Fortune 2026 World\'s Most Admired Companies badge is visible', async ({ page }) => {
    const badge = page.getByAltText('badge icon');
    await expect(badge).toBeVisible();
  });

  test('hero-10: Fortune badge contains "2026" in text', async ({ page }) => {
    const text = page.getByText(/2026/);
    await expect(text).toBeVisible();
  });

  test('hero-11: Fortune badge "Learn more" link is present and clickable', async ({ page }) => {
    const link = page.getByRole('link', { name: /Learn more >/ }).first();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'https://www.alignmenthealth.com/fortunewmac2026');
  });

  // ===== PRIMARY NAVIGATION =====
  test('nav-01: "Discover Alignment" menu item is visible', async ({ page }) => {
    const navItem = page.getByRole('menuitem', { name: /Discover Alignment/ });
    await expect(navItem).toBeVisible();
  });

  test('nav-02: "Find Plans" menu item is visible', async ({ page }) => {
    const navItem = page.getByRole('menuitem', { name: /Find Plans/ });
    await expect(navItem).toBeVisible();
  });

  test('nav-03: "Find Care" menu item is visible', async ({ page }) => {
    const navItem = page.getByRole('menuitem', { name: /Find Care/ });
    await expect(navItem).toBeVisible();
  });

  test('nav-04: "For Members" menu item is visible', async ({ page }) => {
    const navItem = page.getByRole('menuitem', { name: /For Members/ });
    await expect(navItem).toBeVisible();
  });

  test('nav-05: "For Providers" menu item is visible', async ({ page }) => {
    const navItem = page.getByRole('menuitem', { name: /For Providers/ });
    await expect(navItem).toBeVisible();
  });

  test('nav-06: "Enroll Now" CTA button is visible in navigation', async ({ page }) => {
    const button = page.getByRole('link', { name: /Enroll Now/ });
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute('href', '/find-a-plan');
  });

  test('nav-07: Alignment Health Plan logo is visible in header', async ({ page }) => {
    const logo = page.getByAltText('AlignmentHealthPlan');
    await expect(logo).toBeVisible();
  });

  test('nav-08: logo link navigates to home', async ({ page }) => {
    const logoLink = page.getByRole('link').filter({ has: page.getByAltText('AlignmentHealthPlan') });
    await expect(logoLink).toHaveAttribute('href', '/');
  });

  // ===== HEADER LOGIN & UTILITY LINKS =====
  test('header-01: "Member Login" link is visible in top header', async ({ page }) => {
    const link = page.getByRole('link', { name: /Member Login/ }).first();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'https://members.alignmenthealthplan.com');
  });

  test('header-02: "Provider Login" link is visible in top header', async ({ page }) => {
    const link = page.getByRole('link', { name: /Provider Login/ }).first();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'https://ava.alignmenthealth.com');
  });

  test('header-03: "For Agents" link is visible in top header', async ({ page }) => {
    const link = page.getByRole('link', { name: /For Agents/ }).first();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'https://www.alignmenthealth.com/Partners/Brokers');
  });

  test('header-04: "Contact Us" link is visible in top header', async ({ page }) => {
    const link = page.getByRole('link', { name: /Contact Us/ }).first();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/about-us/contact-us');
  });

  test('header-05: search input field is visible', async ({ page }) => {
    const searchBox = page.getByPlaceholder('Search');
    await expect(searchBox).toBeVisible();
  });

  test('header-06: search button is visible and clickable', async ({ page }) => {
    const searchBtn = page.getByRole('button', { name: /Search/ });
    await expect(searchBtn).toBeVisible();
  });

  // ===== CALL TO ACTION CARDS ("How Can We Help You Today?") =====
  test('cards-01: "How Can We Help You Today?" section heading is visible', async ({ page }) => {
    const heading = page.getByRole('heading', { level: 2, name: /How Can We Help You Today/ });
    await expect(heading).toBeVisible();
  });

  test('cards-02: "Compare Plans" card is visible with correct link', async ({ page }) => {
    const link = page.getByRole('link', { name: /Compare Plans >/ });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/find-a-plan');
  });

  test('cards-03: "Compare Plans" card description is visible', async ({ page }) => {
    const text = page.getByText(/Answer a few questions, and we'll recommend plans/);
    await expect(text).toBeVisible();
  });

  test('cards-04: "About Medicare" card is visible with correct link', async ({ page }) => {
    const link = page.getByRole('link', { name: /About Medicare >/ });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/discover-ahp/medicare-advantage-plans');
  });

  test('cards-05: "About Medicare" card shows FAQs description', async ({ page }) => {
    const text = page.getByText(/View videos and read tips and FAQs/);
    await expect(text).toBeVisible();
  });

  test('cards-06: "Find Care" card is visible with external provider search link', async ({ page }) => {
    const link = page.getByRole('link', { name: /Find Care >/ });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'https://providersearch.alignmenthealthplan.com/');
  });

  test('cards-07: "Find Care" card shows provider search description', async ({ page }) => {
    const text = page.getByText(/Search for doctors, facilities and other services/);
    await expect(text).toBeVisible();
  });

  test('cards-08: "Find Medication" card is visible with correct link', async ({ page }) => {
    const link = page.getByRole('link', { name: /Find Medication >/ });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/find-care/find-a-drug');
  });

  test('cards-09: "Find Medication" card shows coverage description', async ({ page }) => {
    const text = page.getByText(/Find out which prescription medications are covered/);
    await expect(text).toBeVisible();
  });

  // ===== BENEFITS SECTION =====
  test('benefits-01: "benefits we can all align on" heading is visible', async ({ page }) => {
    const heading = page.getByRole('heading', { level: 2 }).filter({ hasText: /benefits/ }).filter({ hasText: /align on/ });
    await expect(heading).toBeVisible();
  });

  test('benefits-02: benefit cards display "$0 Monthly plan premium"', async ({ page }) => {
    const text = page.getByText(/Monthly plan premium/);
    await expect(text).toBeVisible();
  });

  test('benefits-03: benefit cards display "$0 Copay for primary care visits"', async ({ page }) => {
    const text = page.getByText(/Copay for primary care visits/);
    await expect(text).toBeVisible();
  });

  test('benefits-04: benefit cards display "$0 Copay for telehealth visits"', async ({ page }) => {
    const text = page.getByText(/Copay for telehealth visits/);
    await expect(text).toBeVisible();
  });

  test('benefits-05: benefit cards display "$0 Copay on over 10,000 drugs"', async ({ page }) => {
    const text = page.getByText(/Copay on over 10,000 drugs/);
    await expect(text).toBeVisible();
  });

  test('benefits-06: benefit cards display "$0 Vision coverage"', async ({ page }) => {
    const text = page.getByText(/Vision coverage/);
    await expect(text).toBeVisible();
  });

  test('benefits-07: benefit cards display "$0 Gym membership"', async ({ page }) => {
    const text = page.getByText(/Gym membership/);
    await expect(text).toBeVisible();
  });

  // ===== CONCIERGE SECTION =====
  test('concierge-01: "ON-DEMAND CONCIERGE SERVICES" heading is visible', async ({ page }) => {
    const heading = page.getByRole('heading', { level: 2, name: /ON-DEMAND CONCIERGE SERVICES/ });
    await expect(heading).toBeVisible();
  });

  test('concierge-02: concierge description mentions "24/7" service', async ({ page }) => {
    const text = page.getByText(/24\/7/);
    await expect(text).toBeVisible();
  });

  test('concierge-03: concierge "Learn More" link is present', async ({ page }) => {
    const links = page.getByRole('link', { name: /Why Alignment Health Plan/ });
    await expect(links.first()).toBeVisible();
    await expect(links.first()).toHaveAttribute('href', '/discover-ahp/why-alignment-health-plan');
  });

  // ===== ACCESS CARD SECTION =====
  test('card-01: "ACCESS ON-DEMAND CONCIERGE Card" heading is visible', async ({ page }) => {
    const heading = page.getByRole('heading', { level: 2 }).filter({ hasText: /ACCESS ON-DEMAND CONCIERGE Card/ });
    await expect(heading).toBeVisible();
  });

  test('card-02: card description mentions "66,000+ participating retailers"', async ({ page }) => {
    const text = page.getByText(/66,000\+ participating retailers/);
    await expect(text).toBeVisible();
  });

  // ===== CTA SECTION ("Let's Make Plans") =====
  test('cta-01: "Let\'s Make Plans" heading is visible', async ({ page }) => {
    const heading = page.getByRole('heading', { level: 2, name: /Let's Make Plans/ });
    await expect(heading).toBeVisible();
  });

  test('cta-02: phone number "1-888-293-8272" is present and callable', async ({ page }) => {
    const link = page.getByRole('link', { name: /1-888-293-8272/ });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'tel:1-888-293-8272');
  });

  test('cta-03: TTY accessibility info is displayed', async ({ page }) => {
    const text = page.getByText(/TTY: 711/);
    await expect(text).toBeVisible();
  });

  test('cta-04: phone availability hours are displayed', async ({ page }) => {
    const text = page.getByText(/8:00 a.m. to 8:00 p.m., 7 days a week/);
    await expect(text).toBeVisible();
  });

  test('cta-05: "Seminars" card link is present', async ({ page }) => {
    const link = page.getByRole('link', { name: /Search Seminars >/ });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/find-plans/attend-a-seminar');
  });

  test('cta-06: "Enroll Online" card link is present', async ({ page }) => {
    const link = page.getByRole('link', { name: /Enroll Now >/ });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/find-a-plan');
  });

  // ===== FOOTER LINKS =====
  test('footer-01: footer "Shop Online" link is present', async ({ page }) => {
    const link = page.getByRole('link', { name: /Shop Online/ });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/find-a-plan/');
  });

  test('footer-02: footer "Member Login" link is present in For Members section', async ({ page }) => {
    const link = page.getByRole('contentinfo').getByRole('link', { name: /Member Login/ });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'https://members.alignmenthealthplan.com/');
  });

  test('footer-03: footer "Provider Login" link is present in For Providers section', async ({ page }) => {
    const link = page.getByRole('contentinfo').getByRole('link', { name: /Provider Login/ });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'https://ava.alignmenthealth.com');
  });

  test('footer-04: footer "Agents Login" link is present', async ({ page }) => {
    const link = page.getByRole('contentinfo').getByRole('link', { name: /Agents Login/ });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'https://agents.alignmenthealthcare.com/');
  });

  test('footer-05: footer "Doctor" provider search link is present', async ({ page }) => {
    const link = page.getByRole('contentinfo').getByRole('link', { name: /^Doctor$/ });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'https://providersearch.alignmenthealthplan.com/');
  });

  test('footer-06: footer "Drug" link is present', async ({ page }) => {
    const link = page.getByRole('contentinfo').getByRole('link', { name: /^Drug$/ });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/find-care/find-a-drug');
  });

  test('footer-07: footer "Pharmacy" link is present', async ({ page }) => {
    const link = page.getByRole('contentinfo').getByRole('link', { name: /Pharmacy/ });
    await expect(link).toBeVisible();
  });

  test('footer-08: footer "Hospital" link is present', async ({ page }) => {
    const link = page.getByRole('contentinfo').getByRole('link', { name: /Hospital/ });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'https://providersearch.alignmenthealthplan.com/');
  });

  test('footer-09: footer "Transportation" link is present', async ({ page }) => {
    const link = page.getByRole('contentinfo').getByRole('link', { name: /Transportation/ });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/find-care/schedule-transportation');
  });

  test('footer-10: footer "About Our Mission & Vision" link is present', async ({ page }) => {
    const link = page.getByRole('contentinfo').getByRole('link', { name: /Our Mission & Vision/ });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/about-us/');
  });

  test('footer-11: footer legal notice link "Click here to read the full disclaimer" is present', async ({ page }) => {
    const link = page.getByRole('link', { name: /Click here to read the full disclaimer/ });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/about-us/legal-notices');
  });

  test('footer-12: footer copyright text is visible', async ({ page }) => {
    const text = page.getByText(/© Copyright 2026 Alignment Health Plan/);
    await expect(text).toBeVisible();
  });

  test('footer-13: footer "Legal Notices" link is present', async ({ page }) => {
    const link = page.getByRole('link', { name: /^Legal Notices$/ });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/about-us/legal-notices');
  });

  test('footer-14: footer "Privacy Notices" link is present', async ({ page }) => {
    const link = page.getByRole('link', { name: /^Privacy Notices$/ });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/about-us/privacy-notices');
  });

  test('footer-15: footer "Terms of Use" link is present', async ({ page }) => {
    const link = page.getByRole('link', { name: /^Terms of Use$/ });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/about-us/terms-of-use');
  });

  test('footer-16: footer "Nondiscrimination Policy" link is present', async ({ page }) => {
    const link = page.getByRole('link', { name: /Nondiscrimination Policy/ });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/about-us/terms-of-use/nondiscrimination-policy');
  });

  test('footer-17: footer "Interoperability" link is present', async ({ page }) => {
    const link = page.getByRole('link', { name: /Interoperability/ });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'https://www.alignmenthealth.com/api');
  });

  test('footer-18: footer "Disaster Policy" link is present', async ({ page }) => {
    const link = page.getByRole('link', { name: /Disaster Policy/ });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/about-us/disaster-policy');
  });
});
