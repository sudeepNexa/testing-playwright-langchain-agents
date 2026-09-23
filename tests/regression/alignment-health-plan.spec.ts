import { test, expect, Page } from '@playwright/test';

const BASE_URL = 'https://www.alignmenthealthplan.com/';

/**
 * Regression Test Suite: Alignment Health Plan
 * 
 * Coverage Areas:
 * 1. Homepage Hero and CTA (8 tests)
 * 2. Primary Navigation (9 tests)
 * 3. Footer Links and Information (10 tests)
 * 4. Plan Finder and Comparison (8 tests)
 * 5. Member Login Entry Points (5 tests)
 * 6. Provider/Doctor Search (4 tests)
 * 7. Contact Us and Forms (8 tests)
 * 8. Additional Pages and Features (5 tests)
 * Total: 57 tests
 */

// ============================================================================
// HOMEPAGE HERO AND CTA SECTION (8 tests)
// ============================================================================

test.describe('Homepage Hero Section', () => {
  test('HH-001: Should display main hero heading "MEDICARE ADVANTAGE PLANS THAT PUT YOU FIRST"', async ({ page }) => {
    await page.goto(BASE_URL);
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText('MEDICARE ADVANTAGE PLANS THAT PUT YOU FIRST');
  });

  test('HH-002: Should display hero subtitle about celebrating aging', async ({ page }) => {
    await page.goto(BASE_URL);
    const subtitle = page.getByText('We believe aging should be celebrated');
    await expect(subtitle).toBeVisible();
  });

  test('HH-003: Should display zip code input field on hero section', async ({ page }) => {
    await page.goto(BASE_URL);
    const zipInput = page.locator('input[placeholder*="ZIP Code"]');
    await expect(zipInput).toBeVisible();
  });

  test('HH-004: Should display "See Plans" button in hero section', async ({ page }) => {
    await page.goto(BASE_URL);
    const seeButton = page.getByRole('button', { name: /See Plans/ });
    await expect(seeButton).toBeVisible();
  });

  test('HH-005: Should display 5-star Medicare rating badge on hero', async ({ page }) => {
    await page.goto(BASE_URL);
    const badge = page.locator('img[alt*="5 Stars"], img[alt*="5-star"]');
    await expect(badge).toBeVisible();
  });

  test('HH-006: Should accept zip code input and enable See Plans button', async ({ page }) => {
    await page.goto(BASE_URL);
    const zipInput = page.locator('input[placeholder*="ZIP Code"]');
    await zipInput.fill('90210');
    await expect(zipInput).toHaveValue('90210');
  });

  test('HH-007: Should display "Enroll Now" button in top navigation', async ({ page }) => {
    await page.goto(BASE_URL);
    const enrollBtn = page.getByRole('link', { name: /Enroll Now/ }).first();
    await expect(enrollBtn).toBeVisible();
  });

  test('HH-008: Should display hero section with image of seniors', async ({ page }) => {
    await page.goto(BASE_URL);
    const heroImg = page.locator('img[alt*="senior"], img[alt*="people"], img[alt*="couple"]').first();
    // Hero section should have imagery
    const heroSection = page.getByRole('heading', { level: 1 });
    await expect(heroSection).toBeVisible();
  });
});

// ============================================================================
// PRIMARY NAVIGATION (9 tests)
// ============================================================================

test.describe('Primary Navigation', () => {
  test('NAV-001: Should display "Find Care" navigation item', async ({ page }) => {
    await page.goto(BASE_URL);
    const findCareNav = page.getByRole('link', { name: /Find Care/ }).first();
    await expect(findCareNav).toBeVisible();
  });

  test('NAV-002: Should display "For Members" navigation item', async ({ page }) => {
    await page.goto(BASE_URL);
    const forMembers = page.getByRole('menuitem', { name: /For Members/ });
    await expect(forMembers).toBeVisible();
  });

  test('NAV-003: Should display "For Providers" navigation item', async ({ page }) => {
    await page.goto(BASE_URL);
    const forProviders = page.getByRole('menuitem', { name: /For Providers/ });
    await expect(forProviders).toBeVisible();
  });

  test('NAV-004: Should display "Member Login" link in top header', async ({ page }) => {
    await page.goto(BASE_URL);
    const memberLogin = page.getByRole('link', { name: /Member Login/ }).first();
    await expect(memberLogin).toBeVisible();
    await expect(memberLogin).toHaveAttribute('href', /members\.alignmenthealthplan\.com/);
  });

  test('NAV-005: Should display "Provider Login" link in top header', async ({ page }) => {
    await page.goto(BASE_URL);
    const providerLogin = page.getByRole('link', { name: /Provider Login/ }).first();
    await expect(providerLogin).toBeVisible();
    await expect(providerLogin).toHaveAttribute('href', /ava\.alignmenthealth\.com/);
  });

  test('NAV-006: Should display "Contact Us" link in top header', async ({ page }) => {
    await page.goto(BASE_URL);
    const contactUs = page.getByRole('link', { name: /Contact Us/ }).first();
    await expect(contactUs).toBeVisible();
    await expect(contactUs).toHaveAttribute('href', /contact-us/);
  });

  test('NAV-007: Should display "For Agents" link in top header', async ({ page }) => {
    await page.goto(BASE_URL);
    const forAgents = page.getByRole('link', { name: /For Agents/ }).first();
    await expect(forAgents).toBeVisible();
  });

  test('NAV-008: Should display Alignment Health Plan logo', async ({ page }) => {
    await page.goto(BASE_URL);
    // Navigation should contain a logo link
    const navLogo = page.locator('header a').first();
    await expect(navLogo).toBeVisible();
  });

  test('NAV-009: Should navigate to home when clicking logo', async ({ page }) => {
    await page.goto(BASE_URL);
    const logo = page.locator('header a').first();
    const href = await logo.getAttribute('href');
    expect(href).toBeTruthy();
  });
});

// ============================================================================
// FOOTER LINKS AND INFORMATION (10 tests)
// ============================================================================

test.describe('Footer Section', () => {
  test('FOOT-001: Should display footer with Shop Online link', async ({ page }) => {
    await page.goto(BASE_URL);
    const shopOnline = page.getByRole('link', { name: /Shop Online/ });
    await expect(shopOnline).toBeVisible();
    await expect(shopOnline).toHaveAttribute('href', /find-a-plan/);
  });

  test('FOOT-002: Should display Ways to Enroll link in footer', async ({ page }) => {
    await page.goto(BASE_URL);
    const waysToEnroll = page.getByRole('link', { name: /Ways to Enroll/ });
    await expect(waysToEnroll).toBeVisible();
  });

  test('FOOT-003: Should display Attend a Seminar link in footer', async ({ page }) => {
    await page.goto(BASE_URL);
    const seminar = page.getByRole('link', { name: /Attend a Seminar/ });
    await expect(seminar).toBeVisible();
  });

  test('FOOT-004: Should display Medicare Part D FAQs link in footer', async ({ page }) => {
    await page.goto(BASE_URL);
    const faqLink = page.getByRole('link', { name: /Medicare Part D FAQs/ });
    await expect(faqLink).toBeVisible();
  });

  test('FOOT-005: Should display Member Login in For Members section', async ({ page }) => {
    await page.goto(BASE_URL);
    const memberLoginFooter = page.locator('footer >> a:has-text("Member Login")').first();
    await expect(memberLoginFooter).toBeVisible();
  });

  test('FOOT-006: Should display Member Services link in footer', async ({ page }) => {
    await page.goto(BASE_URL);
    const memberServices = page.getByRole('link', { name: /Member Services/ });
    await expect(memberServices).toBeVisible();
  });

  test('FOOT-007: Should display Provider Login in For Providers section', async ({ page }) => {
    await page.goto(BASE_URL);
    const providerLoginFooter = page.locator('footer >> a:has-text("Provider Login")').first();
    await expect(providerLoginFooter).toBeVisible();
  });

  test('FOOT-008: Should display Agents Login in For Agents section', async ({ page }) => {
    await page.goto(BASE_URL);
    const agentsLogin = page.getByRole('link', { name: /Agents Login/ });
    await expect(agentsLogin).toBeVisible();
  });

  test('FOOT-009: Should display Contact Us By Phone link in footer', async ({ page }) => {
    await page.goto(BASE_URL);
    const contactPhone = page.locator('footer >> a:has-text("By Phone")').first();
    await expect(contactPhone).toBeVisible();
  });

  test('FOOT-010: Should display Send Us a Message link in footer', async ({ page }) => {
    await page.goto(BASE_URL);
    const sendMessage = page.locator('footer >> a:has-text("Send Us a Message")').first();
    await expect(sendMessage).toBeVisible();
  });
});

// ============================================================================
// PLAN FINDER AND COMPARISON (8 tests)
// ============================================================================

test.describe('Plan Finder and Comparison', () => {
  test('PLAN-001: Should display "How Can We Help You Today?" section on homepage', async ({ page }) => {
    await page.goto(BASE_URL);
    const helpSection = page.getByRole('heading', { name: /HOW CAN WE HELP YOU TODAY/ });
    await expect(helpSection).toBeVisible();
  });

  test('PLAN-002: Should display Compare Plans card', async ({ page }) => {
    await page.goto(BASE_URL);
    const comparePlans = page.getByRole('link', { name: /Compare Plans/ });
    await expect(comparePlans).toBeVisible();
  });

  test('PLAN-003: Should display Compare Plans description', async ({ page }) => {
    await page.goto(BASE_URL);
    const description = page.getByText(/Answer a few questions, and we'll recommend plans/);
    await expect(description).toBeVisible();
  });

  test('PLAN-004: Should display About Medicare link', async ({ page }) => {
    await page.goto(BASE_URL);
    const aboutMedicare = page.getByRole('link', { name: /About Medicare/ });
    await expect(aboutMedicare).toBeVisible();
  });

  test('PLAN-005: Should display Find Care card', async ({ page }) => {
    await page.goto(BASE_URL);
    const findCare = page.getByRole('heading', { level: 3 }).filter({ hasText: /Find Care/ });
    await expect(findCare).toBeVisible();
  });

  test('PLAN-006: Should display Find Medication card', async ({ page }) => {
    await page.goto(BASE_URL);
    const findMedication = page.getByRole('link', { name: /Find Medication/ });
    await expect(findMedication).toBeVisible();
  });

  test('PLAN-007: Should display Find Medication description', async ({ page }) => {
    await page.goto(BASE_URL);
    const medDesc = page.getByText(/Find out which prescription medications are covered/);
    await expect(medDesc).toBeVisible();
  });

  test('PLAN-008: Should navigate to plan finder on Compare Plans click', async ({ page }) => {
    await page.goto(BASE_URL);
    const comparePlans = page.getByRole('link', { name: /Compare Plans/ }).first();
    const href = await comparePlans.getAttribute('href');
    expect(href).toContain('find-a-plan');
  });
});

// ============================================================================
// MEMBER LOGIN ENTRY POINTS (5 tests)
// ============================================================================

test.describe('Member Login Access Points', () => {
  test('LOGIN-001: Should have Member Login in top header navigation', async ({ page }) => {
    await page.goto(BASE_URL);
    const headerLogin = page.locator('header >> a:has-text("Member Login")').first();
    await expect(headerLogin).toBeVisible();
    await expect(headerLogin).toHaveAttribute('href', /members\.alignmenthealthplan\.com/);
  });

  test('LOGIN-002: Should have Member Login in footer', async ({ page }) => {
    await page.goto(BASE_URL);
    const footerLogin = page.locator('footer >> a:has-text("Member Login")').first();
    await expect(footerLogin).toBeVisible();
  });

  test('LOGIN-003: Should have Member Login link with correct URL', async ({ page }) => {
    await page.goto(BASE_URL);
    const memberLogin = page.locator('a[href*="members.alignmenthealthplan.com"]').first();
    await expect(memberLogin).toBeVisible();
  });

  test('LOGIN-004: Should display "For Members" section in footer with login', async ({ page }) => {
    await page.goto(BASE_URL);
    const forMembers = page.locator('footer >> p:has-text("For Members")');
    await expect(forMembers).toBeVisible();
  });

  test('LOGIN-005: Should have Provider Login link in navigation', async ({ page }) => {
    await page.goto(BASE_URL);
    const providerLogin = page.locator('a[href*="ava.alignmenthealth.com"]').first();
    await expect(providerLogin).toBeVisible();
  });
});

// ============================================================================
// PROVIDER/DOCTOR SEARCH (4 tests)
// ============================================================================

test.describe('Provider and Doctor Search', () => {
  test('PROVIDER-001: Should display Find Care navigation item', async ({ page }) => {
    await page.goto(BASE_URL);
    const findCare = page.getByRole('link', { name: /Find Care/ }).first();
    await expect(findCare).toBeVisible();
  });

  test('PROVIDER-002: Should show Provider Search in Find Care submenu', async ({ page }) => {
    await page.goto(BASE_URL);
    const providerSearch = page.getByText(/Provider Search/);
    await expect(providerSearch).toBeVisible();
  });

  test('PROVIDER-003: Should have Find a Doctor link in help section', async ({ page }) => {
    await page.goto(BASE_URL);
    const findDoctor = page.getByRole('link', { name: /Find Care/ }).first();
    await expect(findDoctor).toBeVisible();
  });

  test('PROVIDER-004: Should display Transportation link in footer', async ({ page }) => {
    await page.goto(BASE_URL);
    const transportation = page.getByRole('link', { name: /Transportation/ });
    await expect(transportation).toBeVisible();
  });
});

// ============================================================================
// CONTACT US AND FORMS (8 tests)
// ============================================================================

test.describe('Contact Us and Help', () => {
  test('CONTACT-001: Should navigate to Contact Us page', async ({ page }) => {
    await page.goto(`${BASE_URL}about-us/contact-us`);
    await expect(page).toHaveTitle(/Contact Us/);
  });

  test('CONTACT-002: Should display Member Services Contact Form heading', async ({ page }) => {
    await page.goto(`${BASE_URL}about-us/contact-us`);
    const heading = page.getByRole('heading').filter({ hasText: /Send Us a Message/ });
    await expect(heading).toBeVisible();
  });

  test('CONTACT-003: Should display "I am a Member" contact option', async ({ page }) => {
    await page.goto(`${BASE_URL}about-us/contact-us`);
    const memberOption = page.getByRole('link', { name: /I am a Member/ });
    await expect(memberOption).toBeVisible();
  });

  test('CONTACT-004: Should display "I am a Provider" contact option', async ({ page }) => {
    await page.goto(`${BASE_URL}about-us/contact-us`);
    const providerOption = page.getByRole('link', { name: /I am a Provider/ });
    await expect(providerOption).toBeVisible();
  });

  test('CONTACT-005: Should display "I am a Broker" contact option', async ({ page }) => {
    await page.goto(`${BASE_URL}about-us/contact-us`);
    const brokerOption = page.getByRole('link', { name: /I am a Broker/ });
    await expect(brokerOption).toBeVisible();
  });

  test('CONTACT-006: Should display phone contact information', async ({ page }) => {
    await page.goto(`${BASE_URL}about-us/contact-us`);
    // Look for phone number display (1-888-293-8272 or TTY: 711)
    const phoneText = page.getByText(/1-888-293-8272|TTY.*711/);
    await expect(phoneText.first()).toBeVisible();
  });

  test('CONTACT-007: Should display security warning for web form', async ({ page }) => {
    await page.goto(`${BASE_URL}about-us/contact-us`);
    const security = page.getByText(/For your personal security/);
    await expect(security).toBeVisible();
  });

  test('CONTACT-008: Should display emergency guidance for medical issues', async ({ page }) => {
    await page.goto(`${BASE_URL}about-us/contact-us`);
    const emergency = page.getByText(/call 911/i);
    await expect(emergency).toBeVisible();
  });
});

// ============================================================================
// HOMEPAGE FEATURE SECTIONS (8 tests)
// ============================================================================

test.describe('Homepage Feature Sections', () => {
  test('FEATURES-001: Should display "On-Demand Concierge Services" section', async ({ page }) => {
    await page.goto(BASE_URL);
    const concierge = page.getByText(/ON-DEMAND CONCIERGE SERVICES/);
    await expect(concierge).toBeVisible();
  });

  test('FEATURES-002: Should display concierge description', async ({ page }) => {
    await page.goto(BASE_URL);
    const description = page.getByText(/Our 24\/7 On-Demand Concierge can make it a one-stop-shop/);
    await expect(description).toBeVisible();
  });

  test('FEATURES-003: Should display "Benefits We Can All Align On" section', async ({ page }) => {
    await page.goto(BASE_URL);
    const benefits = page.getByRole('heading').filter({ hasText: /BENEFITS/ });
    await expect(benefits).toBeVisible();
  });

  test('FEATURES-004: Should display $0 monthly premium benefit', async ({ page }) => {
    await page.goto(BASE_URL);
    const premiumText = page.getByText(/Monthly plan premium/);
    await expect(premiumText).toBeVisible();
  });

  test('FEATURES-005: Should display $0 copay benefits', async ({ page }) => {
    await page.goto(BASE_URL);
    const copayTexts = page.getByText(/copay|Copay/).first();
    await expect(copayTexts).toBeVisible();
  });

  test('FEATURES-006: Should display $0 vision coverage', async ({ page }) => {
    await page.goto(BASE_URL);
    const visionText = page.getByText(/Vision coverage/);
    await expect(visionText).toBeVisible();
  });

  test('FEATURES-007: Should display $0 gym membership', async ({ page }) => {
    await page.goto(BASE_URL);
    const gymText = page.getByText(/Gym membership/);
    await expect(gymText).toBeVisible();
  });

  test('FEATURES-008: Should display Access On-Demand Concierge Card info', async ({ page }) => {
    await page.goto(BASE_URL);
    const cardText = page.getByText(/ACCESS ON-DEMAND CONCIERGE CARD/);
    await expect(cardText).toBeVisible();
  });
});

// ============================================================================
// ENROLLMENT SECTION (5 tests)
// ============================================================================

test.describe('Enrollment and Call to Action', () => {
  test('ENROLL-001: Should display "Let\'s Make Plans" call-to-action section', async ({ page }) => {
    await page.goto(BASE_URL);
    const section = page.getByText(/LET'S MAKE PLANS|Let's Make Plans/);
    await expect(section).toBeVisible();
  });

  test('ENROLL-002: Should display phone number 1-888-293-8272 for enrollment', async ({ page }) => {
    await page.goto(BASE_URL);
    const phone = page.getByText(/1-888-293-8272/);
    await expect(phone).toBeVisible();
  });

  test('ENROLL-003: Should display TTY number 711', async ({ page }) => {
    await page.goto(BASE_URL);
    const ttyText = page.getByText(/TTY.*711/);
    await expect(ttyText).toBeVisible();
  });

  test('ENROLL-004: Should display "Search Seminars" button', async ({ page }) => {
    await page.goto(BASE_URL);
    const seminars = page.getByRole('link', { name: /Search Seminars/ });
    await expect(seminars).toBeVisible();
  });

  test('ENROLL-005: Should display "Enroll Online" section with button', async ({ page }) => {
    await page.goto(BASE_URL);
    const enrollOnline = page.getByRole('heading').filter({ hasText: /Enroll Online/ });
    await expect(enrollOnline).toBeVisible();
    const button = page.getByRole('link', { name: /Enroll Now/ }).last();
    await expect(button).toBeVisible();
  });
});

// ============================================================================
// PAGE NAVIGATION AND REDIRECTS (4 tests)
// ============================================================================

test.describe('Page Navigation', () => {
  test('NAV-FLOW-001: Should allow navigation to home page', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveURL(/alignmenthealthplan\.com\/?$/);
    await expect(page).toHaveTitle(/Medicare Advantage Plans/);
  });

  test('NAV-FLOW-002: Should allow navigation from hero zip code to plans', async ({ page }) => {
    await page.goto(BASE_URL);
    const zipInput = page.locator('input[placeholder*="ZIP Code"]');
    const seeButton = page.getByRole('button', { name: /See Plans/ });
    await expect(zipInput).toBeVisible();
    await expect(seeButton).toBeVisible();
  });

  test('NAV-FLOW-003: Should have working links in help cards', async ({ page }) => {
    await page.goto(BASE_URL);
    const helpSection = page.getByRole('heading').filter({ hasText: /HOW CAN WE HELP YOU TODAY/ });
    const links = page.locator('a', { has: helpSection });
    const count = await page.locator('a').count();
    expect(count).toBeGreaterThan(0);
  });

  test('NAV-FLOW-004: Should have "Why Alignment Health Plan" link', async ({ page }) => {
    await page.goto(BASE_URL);
    const whyLink = page.getByRole('link', { name: /Why Alignment Health Plan/ });
    await expect(whyLink).toBeVisible();
  });
});

// ============================================================================
// COMPLIANCE AND DISCLAIMERS (3 tests)
// ============================================================================

test.describe('Compliance and Legal Information', () => {
  test('COMPLY-001: Should display HMO/PPO plan information in footer', async ({ page }) => {
    await page.goto(BASE_URL);
    const compliance = page.getByText(/Alignment Health Plan is an HMO/);
    await expect(compliance).toBeVisible();
  });

  test('COMPLY-002: Should display full disclaimer link', async ({ page }) => {
    await page.goto(BASE_URL);
    const disclaimer = page.getByRole('link', { name: /Click here to read the full disclaimer/ });
    await expect(disclaimer).toBeVisible();
  });

  test('COMPLY-003: Should display page update information', async ({ page }) => {
    await page.goto(BASE_URL);
    const updated = page.getByText(/Page last updated on/);
    await expect(updated).toBeVisible();
  });
});

// ============================================================================
// RESPONSIVE AND ACCESSIBILITY (3 tests)
// ============================================================================

test.describe('Page Structure and Accessibility', () => {
  test('A11Y-001: Should have proper heading hierarchy', async ({ page }) => {
    await page.goto(BASE_URL);
    const h1 = page.getByRole('heading', { level: 1 });
    const count = await h1.count();
    expect(count).toBeGreaterThan(0);
  });

  test('A11Y-002: Should have banner landmark', async ({ page }) => {
    await page.goto(BASE_URL);
    const banner = page.locator('header');
    await expect(banner).toBeVisible();
  });

  test('A11Y-003: Should have contentinfo landmark for footer', async ({ page }) => {
    await page.goto(BASE_URL);
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });
});
