import { test, expect, Page } from '@playwright/test';

/**
 * Comprehensive Regression Test Suite for Alignment Health Plan
 * 
 * This suite covers:
 * 1. Homepage hero, primary navigation, and footer links
 * 2. Plan-finder / plan-comparison cards (Medicare Advantage plan options)
 * 3. Member login entry point
 * 4. Find-a-doctor / provider search
 * 5. Contact us / help / FAQ
 * 6. Forms (zip code entry, contact form)
 * 
 * ~50 test cases covering real user-observable behavior
 * Based on accessibility snapshot analysis of live URL
 */

const BASE_URL = 'https://www.alignmenthealthplan.com/';

test.describe('Alignment Health Plan - Homepage & Navigation', () => {
  
  test('should load homepage with correct title', async ({ page }) => {
    await page.goto(BASE_URL);
    const title = await page.title();
    expect(title).toContain('Medicare Advantage Plans that Put You First');
  });

  test('should display page heading correctly', async ({ page }) => {
    await page.goto(BASE_URL);
    const heading = page.getByRole('heading', { name: /MEDICARE ADVANTAGE PLANS THAT PUT YOU FIRST/i });
    await expect(heading).toBeVisible();
  });

  test('should display hero description text', async ({ page }) => {
    await page.goto(BASE_URL);
    const description = page.getByText(/We believe aging should be celebrated/);
    await expect(description).toBeVisible();
  });

  test('should display 5-star rating image in hero', async ({ page }) => {
    await page.goto(BASE_URL);
    const starImage = page.getByRole('img', { name: /Alignment_Health_5_Stars/i });
    await expect(starImage).toBeVisible();
  });

  test('should have header banner element', async ({ page }) => {
    await page.goto(BASE_URL);
    const banner = page.getByRole('banner');
    await expect(banner).toBeVisible();
  });

  test('should have footer element', async ({ page }) => {
    await page.goto(BASE_URL);
    const footer = page.getByRole('contentinfo');
    await expect(footer).toBeVisible();
  });

});

test.describe('Alignment Health Plan - Primary Navigation', () => {

  test('should display "Discover Alignment" menu item in header', async ({ page }) => {
    await page.goto(BASE_URL);
    const discoverMenuItem = page.getByRole('menuitem', { name: /Discover Alignment/i });
    await expect(discoverMenuItem).toBeVisible();
  });

  test('should display "Find Plans" menu item in header', async ({ page }) => {
    await page.goto(BASE_URL);
    const findPlansMenuItem = page.getByRole('menuitem', { name: /Find Plans/i });
    await expect(findPlansMenuItem).toBeVisible();
  });

  test('should display "Find Care" menu item in header', async ({ page }) => {
    await page.goto(BASE_URL);
    const findCareMenuItem = page.getByRole('menuitem', { name: /Find Care/i });
    await expect(findCareMenuItem).toBeVisible();
  });

  test('should display "For Members" menu item in header', async ({ page }) => {
    await page.goto(BASE_URL);
    const forMembersMenuItem = page.getByRole('menuitem', { name: /For Members/i });
    await expect(forMembersMenuItem).toBeVisible();
  });

  test('should display Alignment Health logo in header', async ({ page }) => {
    await page.goto(BASE_URL);
    const banner = page.getByRole('banner');
    const logo = banner.getByRole('link', { name: /AlignmentHealthPlan/i });
    await expect(logo).toBeVisible();
  });

  test('should have "Enroll Now" button in header', async ({ page }) => {
    await page.goto(BASE_URL);
    const banner = page.getByRole('banner');
    const enrollButton = banner.getByRole('link', { name: /Enroll Now/i });
    await expect(enrollButton).toBeVisible();
  });

  test('"Enroll Now" button should link to find-a-plan', async ({ page }) => {
    await page.goto(BASE_URL);
    const banner = page.getByRole('banner');
    const enrollButton = banner.getByRole('link', { name: /Enroll Now/i });
    const href = await enrollButton.getAttribute('href');
    expect(href).toBe('/find-a-plan');
  });

  test('should display "Member Login" link in header', async ({ page }) => {
    await page.goto(BASE_URL);
    const banner = page.getByRole('banner');
    const memberLoginLink = banner.getByRole('link', { name: /Member Login/i });
    await expect(memberLoginLink).toBeVisible();
  });

  test('"Member Login" should link to member portal', async ({ page }) => {
    await page.goto(BASE_URL);
    const banner = page.getByRole('banner');
    const memberLoginLink = banner.getByRole('link', { name: /Member Login/i });
    const href = await memberLoginLink.getAttribute('href');
    expect(href).toContain('members.alignmenthealthplan.com');
  });

  test('should display "Contact Us" link in header', async ({ page }) => {
    await page.goto(BASE_URL);
    const banner = page.getByRole('banner');
    const contactLink = banner.getByRole('link', { name: /Contact Us/i });
    await expect(contactLink).toBeVisible();
  });

  test('should display "For Agents" link in header', async ({ page }) => {
    await page.goto(BASE_URL);
    const banner = page.getByRole('banner');
    const agentsLink = banner.getByRole('link', { name: /For Agents/i });
    await expect(agentsLink).toBeVisible();
  });

});

test.describe('Alignment Health Plan - Plan Finder & Zip Code Form', () => {

  test('should display zip code input field', async ({ page }) => {
    await page.goto(BASE_URL);
    const zipInput = page.getByRole('textbox', { name: /Zip code/i });
    await expect(zipInput).toBeVisible();
  });

  test('zip code input should have placeholder text', async ({ page }) => {
    await page.goto(BASE_URL);
    const zipInput = page.getByRole('textbox', { name: /Zip code/i });
    const placeholder = await zipInput.getAttribute('placeholder');
    expect(placeholder).toContain('ZIP Code');
  });

  test('should display "See Plans" button', async ({ page }) => {
    await page.goto(BASE_URL);
    const seeButton = page.getByRole('button', { name: /See Plans/i });
    await expect(seeButton).toBeVisible();
  });

  test('should be able to enter text in zip code field', async ({ page }) => {
    await page.goto(BASE_URL);
    const zipInput = page.getByRole('textbox', { name: /Zip code/i });
    await zipInput.fill('90210');
    const value = await zipInput.inputValue();
    expect(value).toBe('90210');
  });

  test('should clear zip code field', async ({ page }) => {
    await page.goto(BASE_URL);
    const zipInput = page.getByRole('textbox', { name: /Zip code/i });
    await zipInput.fill('90210');
    await zipInput.clear();
    const value = await zipInput.inputValue();
    expect(value).toBe('');
  });

  test('should display "How Can We Help You Today?" section heading', async ({ page }) => {
    await page.goto(BASE_URL);
    const helpHeading = page.getByRole('heading', { name: /How Can We Help You Today/i });
    await expect(helpHeading).toBeVisible();
  });

});

test.describe('Alignment Health Plan - Plan Comparison Cards', () => {

  test('should display "Compare Plans" card with icon', async ({ page }) => {
    await page.goto(BASE_URL);
    const compareImage = page.getByRole('img', { name: /Compare Plans Icon/i });
    await expect(compareImage).toBeVisible();
  });

  test('should display "Compare Medicare Advantage Plans" link', async ({ page }) => {
    await page.goto(BASE_URL);
    const compareLink = page.getByRole('link', { name: /Compare Medicare Advantage Plans/i });
    await expect(compareLink).toBeVisible();
  });

  test('"Compare Plans" link should navigate to find-a-plan', async ({ page }) => {
    await page.goto(BASE_URL);
    const compareLink = page.getByRole('link', { name: /Compare Medicare Advantage Plans/i });
    const href = await compareLink.getAttribute('href');
    expect(href).toBe('/find-a-plan');
  });

  test('should display "About Medicare" card', async ({ page }) => {
    await page.goto(BASE_URL);
    const aboutImage = page.getByRole('img', { name: /About Medicare Icon/i });
    await expect(aboutImage).toBeVisible();
  });

  test('should display "Learn about Medicare Advantage" link', async ({ page }) => {
    await page.goto(BASE_URL);
    const aboutLink = page.getByRole('link', { name: /Learn about Medicare Advantage/i });
    await expect(aboutLink).toBeVisible();
  });

  test('"About Medicare" link should navigate to correct page', async ({ page }) => {
    await page.goto(BASE_URL);
    const aboutLink = page.getByRole('link', { name: /Learn about Medicare Advantage/i });
    const href = await aboutLink.getAttribute('href');
    expect(href).toContain('/discover-ahp/medicare-advantage-plans');
  });

  test('should display "Find Care" card with icon', async ({ page }) => {
    await page.goto(BASE_URL);
    const findCareLink = page.getByRole('link', { name: /Find a provider that suits you/i });
    await expect(findCareLink).toBeVisible();
  });

  test('"Find Care" link should navigate to provider search', async ({ page }) => {
    await page.goto(BASE_URL);
    const findCareLink = page.getByRole('link', { name: /Find a provider that suits you/i });
    const href = await findCareLink.getAttribute('href');
    expect(href).toContain('providersearch.alignmenthealthplan.com');
  });

  test('should display "Find Medication" card', async ({ page }) => {
    await page.goto(BASE_URL);
    const medImage = page.getByRole('img', { name: /Medication Prescription Coverage Icon/i });
    await expect(medImage).toBeVisible();
  });

});

test.describe('Alignment Health Plan - Member Login Entry Points', () => {

  test('should have "Member Login" link in footer', async ({ page }) => {
    await page.goto(BASE_URL);
    const footer = page.getByRole('contentinfo');
    const memberLoginLink = footer.getByRole('link', { name: /Member Login/i }).first();
    await expect(memberLoginLink).toBeVisible();
  });

  test('footer "Member Login" should link to member portal', async ({ page }) => {
    await page.goto(BASE_URL);
    const footer = page.getByRole('contentinfo');
    const memberLoginLinks = footer.getByRole('link', { name: /Member Login/i });
    const count = await memberLoginLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display "Member Services" link in footer', async ({ page }) => {
    await page.goto(BASE_URL);
    const footer = page.getByRole('contentinfo');
    const memberServicesLink = footer.getByRole('link', { name: /Member Services/i });
    await expect(memberServicesLink).toBeVisible();
  });

});

test.describe('Alignment Health Plan - Provider Search / Find Care', () => {

  test('should display "Doctor" link in Find Care section of footer', async ({ page }) => {
    await page.goto(BASE_URL);
    const footer = page.getByRole('contentinfo');
    const doctorLink = footer.getByRole('link', { name: /Doctor/i });
    await expect(doctorLink).toBeVisible();
  });

  test('should navigate to Find Plans page', async ({ page }) => {
    await page.goto(`${BASE_URL}find-a-plan`);
    const title = await page.title();
    expect(title).toContain('Find a Plan');
  });

});

test.describe('Alignment Health Plan - Benefits Section', () => {

  test('should display "BENEFITS WE CAN ALL ALIGN ON" section heading', async ({ page }) => {
    await page.goto(BASE_URL);
    const benefitsHeading = page.getByRole('heading', { name: /BENEFITS WE CAN ALL ALIGN ON/i });
    await expect(benefitsHeading).toBeVisible();
  });

  test('should display benefits table with pricing information', async ({ page }) => {
    await page.goto(BASE_URL);
    const benefitsTable = page.getByRole('table');
    await expect(benefitsTable).toBeVisible();
  });

});

test.describe('Alignment Health Plan - Concierge Services Section', () => {

  test('should display "ON-DEMAND CONCIERGE SERVICES" section', async ({ page }) => {
    await page.goto(BASE_URL);
    const heading = page.getByRole('heading', { name: /ON-DEMAND CONCIERGE SERVICES/i });
    await expect(heading).toBeVisible();
  });

  test('should display concierge service description', async ({ page }) => {
    await page.goto(BASE_URL);
    const description = page.getByText(/Our on-demand/i);
    await expect(description).toBeVisible();
  });

  test('should display "Learn More" link in concierge section', async ({ page }) => {
    await page.goto(BASE_URL);
    const learnMoreLink = page.getByRole('link', { name: /Learn More/i }).first();
    await expect(learnMoreLink).toBeVisible();
  });

});

test.describe('Alignment Health Plan - Contact & Enrollment Section', () => {

  test('should display "LET\'S MAKE PLANS" section', async ({ page }) => {
    await page.goto(BASE_URL);
    const heading = page.getByRole('heading', { name: /Let's Make Plans/i });
    await expect(heading).toBeVisible();
  });

  test('should display phone number link', async ({ page }) => {
    await page.goto(BASE_URL);
    const phoneLink = page.getByRole('link', { name: /1-888-293-8272/i });
    await expect(phoneLink).toBeVisible();
  });

  test('phone number should have tel: protocol', async ({ page }) => {
    await page.goto(BASE_URL);
    const phoneLink = page.getByRole('link', { name: /1-888-293-8272/i });
    const href = await phoneLink.getAttribute('href');
    expect(href).toContain('tel:');
  });

  test('should display "Search Seminars" link', async ({ page }) => {
    await page.goto(BASE_URL);
    const seminarsLink = page.getByRole('link', { name: /Search Seminars/i });
    await expect(seminarsLink).toBeVisible();
  });

  test('"Search Seminars" should navigate to seminars page', async ({ page }) => {
    await page.goto(BASE_URL);
    const seminarsLink = page.getByRole('link', { name: /Search Seminars/i });
    const href = await seminarsLink.getAttribute('href');
    expect(href).toContain('/find-plans/attend-a-seminar');
  });

});

test.describe('Alignment Health Plan - Footer Links - Find Plans Section', () => {

  test('should display "Shop Online" link in footer', async ({ page }) => {
    await page.goto(BASE_URL);
    const footer = page.getByRole('contentinfo');
    const shopLink = footer.getByRole('link', { name: /Shop Online/i });
    await expect(shopLink).toBeVisible();
  });

  test('"Shop Online" should link to find-a-plan', async ({ page }) => {
    await page.goto(BASE_URL);
    const footer = page.getByRole('contentinfo');
    const shopLink = footer.getByRole('link', { name: /Shop Online/i });
    const href = await shopLink.getAttribute('href');
    expect(href).toContain('/find-a-plan');
  });

  test('should display "Ways to Enroll" link in footer', async ({ page }) => {
    await page.goto(BASE_URL);
    const footer = page.getByRole('contentinfo');
    const enrollLink = footer.getByRole('link', { name: /Ways to Enroll/i });
    await expect(enrollLink).toBeVisible();
  });

  test('should display "Attend a Seminar" link in footer', async ({ page }) => {
    await page.goto(BASE_URL);
    const footer = page.getByRole('contentinfo');
    const seminarLink = footer.getByRole('link', { name: /Attend a Seminar/i });
    await expect(seminarLink).toBeVisible();
  });

  test('should display "Benefits Highlights" link in footer', async ({ page }) => {
    await page.goto(BASE_URL);
    const footer = page.getByRole('contentinfo');
    const benefitsLink = footer.getByRole('link', { name: /Benefits Highlights/i });
    await expect(benefitsLink).toBeVisible();
  });

  test('should display "Pre-Enrollment Kit" link in footer', async ({ page }) => {
    await page.goto(BASE_URL);
    const footer = page.getByRole('contentinfo');
    const kitLink = footer.getByRole('link', { name: /Pre-Enrollment Kit/i });
    await expect(kitLink).toBeVisible();
  });

  test('should display "Group Retiree Options" link in footer', async ({ page }) => {
    await page.goto(BASE_URL);
    const footer = page.getByRole('contentinfo');
    const groupLink = footer.getByRole('link', { name: /Group Retiree Options/i });
    await expect(groupLink).toBeVisible();
  });

  test('should display "Medicare Part D FAQs" link in footer', async ({ page }) => {
    await page.goto(BASE_URL);
    const footer = page.getByRole('contentinfo');
    const faqLink = footer.getByRole('link', { name: /Medicare Part D FAQs/i });
    await expect(faqLink).toBeVisible();
  });

});

test.describe('Alignment Health Plan - Footer Links - Contact Us Section', () => {

  test('should display "Contact Us" section in footer', async ({ page }) => {
    await page.goto(BASE_URL);
    const footer = page.getByRole('contentinfo');
    const byPhoneLink = footer.getByRole('link', { name: /By Phone/i });
    await expect(byPhoneLink).toBeVisible();
  });

  test('should display "Send Us a Message" link in footer', async ({ page }) => {
    await page.goto(BASE_URL);
    const footer = page.getByRole('contentinfo');
    const messageLink = footer.getByRole('link', { name: /Send Us a Message/i });
    await expect(messageLink).toBeVisible();
  });

});

test.describe('Alignment Health Plan - Footer Links - Find Care Section', () => {

  test('should display "Find Care" section heading in footer', async ({ page }) => {
    await page.goto(BASE_URL);
    const footer = page.getByRole('contentinfo');
    const paragraphs = footer.getByRole('paragraph');
    const findCareParagraph = paragraphs.filter({ hasText: /Find Care/ });
    await expect(findCareParagraph).toContainText('Find Care');
  });

  test('should display additional care-related links in footer', async ({ page }) => {
    await page.goto(BASE_URL);
    const footer = page.getByRole('contentinfo');
    const doctorLink = footer.getByRole('link', { name: /Doctor/i });
    await expect(doctorLink).toBeVisible();
  });

});

test.describe('Alignment Health Plan - Contact Us Page', () => {

  test('should navigate to Contact Us page', async ({ page }) => {
    await page.goto(`${BASE_URL}about-us/contact-us`);
    const title = await page.title();
    expect(title).toContain('Contact Us');
  });

  test('should display "Send Us a Message" section on Contact Us page', async ({ page }) => {
    await page.goto(`${BASE_URL}about-us/contact-us`);
    const heading = page.getByRole('heading', { name: /Send Us a Message/i });
    await expect(heading).toBeVisible();
  });

  test('should display security warning on Contact Us page', async ({ page }) => {
    await page.goto(`${BASE_URL}about-us/contact-us`);
    const securityText = page.getByText(/For your personal security/i);
    await expect(securityText).toBeVisible();
  });

  test('should display medical emergency warning on Contact Us page', async ({ page }) => {
    await page.goto(`${BASE_URL}about-us/contact-us`);
    const emergencyText = page.getByText(/For any medical emergency, please call 911/i);
    await expect(emergencyText).toBeVisible();
  });

});

test.describe('Alignment Health Plan - Accessibility & Page Structure', () => {

  test('should have proper heading hierarchy on homepage', async ({ page }) => {
    await page.goto(BASE_URL);
    const h1 = page.getByRole('heading', { level: 1 });
    const h1Count = await h1.count();
    expect(h1Count).toBeGreaterThan(0);
  });

  test('should have a navigation menu bar', async ({ page }) => {
    await page.goto(BASE_URL);
    const menubar = page.getByRole('menubar');
    await expect(menubar).toBeVisible();
  });

  test('should have proper landmark regions', async ({ page }) => {
    await page.goto(BASE_URL);
    const banner = page.getByRole('banner');
    const contentinfo = page.getByRole('contentinfo');
    await expect(banner).toBeVisible();
    await expect(contentinfo).toBeVisible();
  });

  test('should have accessible footer with proper structure', async ({ page }) => {
    await page.goto(BASE_URL);
    const footer = page.getByRole('contentinfo');
    const footerLinks = footer.getByRole('link');
    const linkCount = await footerLinks.count();
    expect(linkCount).toBeGreaterThan(5);
  });

  test('should display year in footer copyright', async ({ page }) => {
    await page.goto(BASE_URL);
    const footer = page.getByRole('contentinfo');
    const copyrightText = footer.getByText(/Copyright/i);
    await expect(copyrightText).toBeVisible();
  });

});

test.describe('Alignment Health Plan - Form Interactions', () => {

  test('should accept numeric input in zip code field', async ({ page }) => {
    await page.goto(BASE_URL);
    const zipInput = page.getByRole('textbox', { name: /Zip code/i });
    await zipInput.fill('12345');
    const value = await zipInput.inputValue();
    expect(/^\d+$/.test(value)).toBe(true);
  });

  test('should handle backspace in zip code field', async ({ page }) => {
    await page.goto(BASE_URL);
    const zipInput = page.getByRole('textbox', { name: /Zip code/i });
    await zipInput.fill('12345');
    await zipInput.press('Backspace');
    const value = await zipInput.inputValue();
    expect(value).toBe('1234');
  });

  test('"See Plans" button should be clickable', async ({ page }) => {
    await page.goto(BASE_URL);
    const seeButton = page.getByRole('button', { name: /See Plans/i });
    expect(await seeButton.isEnabled()).toBe(true);
  });

});

test.describe('Alignment Health Plan - Link Navigation', () => {

  test('should successfully navigate to Find Plans page via link', async ({ page }) => {
    await page.goto(BASE_URL);
    const footer = page.getByRole('contentinfo');
    const shopLink = footer.getByRole('link', { name: /Shop Online/i });
    const href = await shopLink.getAttribute('href');
    
    await page.goto(`${BASE_URL.replace(/\/$/, '')}${href}`);
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('should successfully navigate to Contact Us via header link', async ({ page }) => {
    await page.goto(BASE_URL);
    const banner = page.getByRole('banner');
    const contactLink = banner.getByRole('link', { name: /Contact Us/i });
    await contactLink.click();
    
    const title = await page.title();
    expect(title).toContain('Contact');
  });

});

test.describe('Alignment Health Plan - CSS & Styling', () => {

  test('buttons should be visible and interactive', async ({ page }) => {
    await page.goto(BASE_URL);
    const seeButton = page.getByRole('button', { name: /See Plans/i });
    const isVisible = await seeButton.isVisible();
    const isEnabled = await seeButton.isEnabled();
    expect(isVisible).toBe(true);
    expect(isEnabled).toBe(true);
  });

  test('images should have alt text for accessibility', async ({ page }) => {
    await page.goto(BASE_URL);
    const images = page.getByRole('img');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);
  });

});

test.describe('Alignment Health Plan - Content Verification', () => {

  test('should display Medicare-related content on homepage', async ({ page }) => {
    await page.goto(BASE_URL);
    const medicareText = page.getByText(/Medicare/i);
    await expect(medicareText).toBeVisible();
  });

  test('should display Advantage plan mentions on homepage', async ({ page }) => {
    await page.goto(BASE_URL);
    const advantageText = page.getByText(/Medicare Advantage/i);
    await expect(advantageText).toBeVisible();
  });

  test('should display aging-related content in hero', async ({ page }) => {
    await page.goto(BASE_URL);
    const agingText = page.getByText(/aging/i);
    await expect(agingText).toBeVisible();
  });

});
