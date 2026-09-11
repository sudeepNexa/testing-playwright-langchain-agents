import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.alignmenthealthplan.com';

test.describe('Alignment Health Plan - Comprehensive Regression Test Suite', () => {
  
  test.describe('Homepage - Navigation & Structure', () => {
    test('should load homepage with correct title', async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page).toHaveTitle('Medicare Advantage Plans that Put You First | Alignment Health Plan');
    });

    test('should display main navigation menubar', async ({ page }) => {
      await page.goto(BASE_URL);
      const menubar = page.locator('role=menubar');
      await expect(menubar).toBeVisible();
    });

    test('should display Discover Alignment menu item', async ({ page }) => {
      await page.goto(BASE_URL);
      const menuitem = page.locator('role=menuitem[name="Discover Alignment"]');
      await expect(menuitem).toBeVisible();
    });

    test('should display Find Plans menu item', async ({ page }) => {
      await page.goto(BASE_URL);
      const menuitem = page.locator('role=menuitem[name="Find Plans"]');
      await expect(menuitem).toBeVisible();
    });

    test('should display Find Care menu item', async ({ page }) => {
      await page.goto(BASE_URL);
      const menuitem = page.locator('role=menuitem[name="Find Care"]');
      await expect(menuitem).toBeVisible();
    });

    test('should display For Members menu item', async ({ page }) => {
      await page.goto(BASE_URL);
      const menuitem = page.locator('role=menuitem[name="For Members"]');
      await expect(menuitem).toBeVisible();
    });

    test('should display For Providers menu item', async ({ page }) => {
      await page.goto(BASE_URL);
      const menuitem = page.locator('role=menuitem[name="For Providers"]');
      await expect(menuitem).toBeVisible();
    });
  });

  test.describe('Homepage - Header Links', () => {
    test('should display Member Login link in header', async ({ page }) => {
      await page.goto(BASE_URL);
      const memberLoginLink = page.locator('role=link[name="Member Login"]');
      await expect(memberLoginLink).toBeVisible();
      await expect(memberLoginLink).toHaveAttribute('href', 'https://members.alignmenthealthplan.com');
    });

    test('should display Provider Login link in header', async ({ page }) => {
      await page.goto(BASE_URL);
      const providerLoginLink = page.locator('role=link[name="Provider Login"]');
      await expect(providerLoginLink).toBeVisible();
      await expect(providerLoginLink).toHaveAttribute('href', 'https://ava.alignmenthealth.com');
    });

    test('should display For Agents link in header', async ({ page }) => {
      await page.goto(BASE_URL);
      const agentsLink = page.locator('role=link[name="For Agents"]');
      await expect(agentsLink).toBeVisible();
      await expect(agentsLink).toHaveAttribute('href', 'https://www.alignmenthealth.com/Partners/Brokers');
    });

    test('should display Contact Us link in header', async ({ page }) => {
      await page.goto(BASE_URL);
      const contactUsLink = page.locator('role=link[name="Contact Us"]');
      await expect(contactUsLink).toBeVisible();
      await expect(contactUsLink).toHaveAttribute('href', '/about-us/contact-us');
    });

    test('should display Alignment Health Plan logo link', async ({ page }) => {
      await page.goto(BASE_URL);
      const logoLink = page.locator('role=link[name="AlignmentHealthPlan"]');
      await expect(logoLink).toBeVisible();
      await expect(logoLink).toHaveAttribute('href', '/');
    });

    test('should display Enroll Now button in header', async ({ page }) => {
      await page.goto(BASE_URL);
      const enrollNowBtn = page.locator('role=link[name="Enroll Now"]');
      await expect(enrollNowBtn).toBeVisible();
      await expect(enrollNowBtn).toHaveAttribute('href', '/find-a-plan');
    });
  });

  test.describe('Homepage - Main Content', () => {
    test('should display main heading on homepage', async ({ page }) => {
      await page.goto(BASE_URL);
      const heading = page.locator('role=heading[level="1"]').filter({ hasText: 'MEDICARE ADVANTAGE PLANS THAT PUT YOU FIRST!' });
      await expect(heading).toBeVisible();
    });

    test('should display homepage tagline', async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator('text=We believe aging should be celebrated')).toBeVisible();
    });

    test('should display "How Can We Help You Today?" section', async ({ page }) => {
      await page.goto(BASE_URL);
      const helpHeading = page.locator('role=heading[level="2"]').filter({ hasText: 'How Can We Help You Today?' });
      await expect(helpHeading).toBeVisible();
    });

    test('should display "ON-DEMAND CONCIERGE SERVICES" section', async ({ page }) => {
      await page.goto(BASE_URL);
      const conciergeHeading = page.locator('role=heading[level="2"]').filter({ hasText: 'ON-DEMAND CONCIERGE SERVICES' });
      await expect(conciergeHeading).toBeVisible();
    });

    test('should display Concierge tagline text', async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator('text=Our ACCESS On-Demand Concierge connects you')).toBeVisible();
    });

    test('should display benefits section heading', async ({ page }) => {
      await page.goto(BASE_URL);
      const benefitsHeading = page.locator('role=heading[level="2"]').filter({ hasText: 'benefits' });
      await expect(benefitsHeading).toBeVisible();
    });

    test('should display "Why Alignment Health Plan" link in concierge section', async ({ page }) => {
      await page.goto(BASE_URL);
      const whyLink = page.locator('role=link[name="Why Alignment Health Plan"]').first();
      await expect(whyLink).toBeVisible();
      await expect(whyLink).toHaveAttribute('href', '/discover-ahp/why-alignment-health-plan');
    });
  });

  test.describe('Homepage - Benefits Display', () => {
    test('should display $0 monthly plan premium text', async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator('text=Monthly plan premium')).toBeVisible();
      await expect(page.locator('text=$ 0').first()).toBeVisible();
    });

    test('should display $0 copay for primary care', async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator('text=Copay for primary care visits')).toBeVisible();
    });

    test('should display $0 copay for telehealth', async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator('text=Copay for telehealth visits')).toBeVisible();
    });

    test('should display $0 copay on drugs', async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator('text=Copay on over 10,000 drugs')).toBeVisible();
    });

    test('should display $0 vision coverage', async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator('text=Vision coverage')).toBeVisible();
    });

    test('should display $0 gym membership', async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator('text=Gym membership')).toBeVisible();
    });
  });

  test.describe('Homepage - Contact Section', () => {
    test('should display "Lets Make Plans" heading', async ({ page }) => {
      await page.goto(BASE_URL);
      const heading = page.locator('role=heading[level="2"]').filter({ hasText: 'Let\'s Make Plans' });
      await expect(heading).toBeVisible();
    });

    test('should display phone number heading', async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator('text=1-888-293-8272')).toBeVisible();
    });

    test('should display contact hours text', async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator('text=From 8:00 a.m. to 8:00 p.m.')).toBeVisible();
    });
  });

  test.describe('Homepage - Footer Links', () => {
    test('should display Legal Notices footer link', async ({ page }) => {
      await page.goto(BASE_URL);
      const legalLink = page.locator('role=link[name="Legal Notices"]');
      await expect(legalLink).toBeVisible();
      await expect(legalLink).toHaveAttribute('href', '/about-us/legal-notices');
    });

    test('should display Privacy Notices footer link', async ({ page }) => {
      await page.goto(BASE_URL);
      const privacyLink = page.locator('role=link[name="Privacy Notices"]');
      await expect(privacyLink).toBeVisible();
      await expect(privacyLink).toHaveAttribute('href', '/about-us/privacy-notices');
    });

    test('should display Terms of Use footer link', async ({ page }) => {
      await page.goto(BASE_URL);
      const termsLink = page.locator('role=link[name="Terms of Use"]');
      await expect(termsLink).toBeVisible();
      await expect(termsLink).toHaveAttribute('href', '/about-us/terms-of-use');
    });

    test('should display Nondiscrimination Policy footer link', async ({ page }) => {
      await page.goto(BASE_URL);
      const nondiscrimLink = page.locator('role=link[name="Nondiscrimination Policy"]');
      await expect(nondiscrimLink).toBeVisible();
      await expect(nondiscrimLink).toHaveAttribute('href', '/about-us/terms-of-use/nondiscrimination-policy');
    });

    test('should display Notice of Availability footer link', async ({ page }) => {
      await page.goto(BASE_URL);
      const noticeLink = page.locator('role=link[name="Notice of Availability"]');
      await expect(noticeLink).toBeVisible();
      await expect(noticeLink).toHaveAttribute('href', '/about-us/terms-of-use/notice-of-availability');
    });

    test('should display Disaster Policy footer link', async ({ page }) => {
      await page.goto(BASE_URL);
      const disasterLink = page.locator('role=link[name="Disaster Policy"]');
      await expect(disasterLink).toBeVisible();
      await expect(disasterLink).toHaveAttribute('href', '/about-us/disaster-policy');
    });

    test('should display Interoperability footer link', async ({ page }) => {
      await page.goto(BASE_URL);
      const interopLink = page.locator('role=link[name="Interoperability"]');
      await expect(interopLink).toBeVisible();
      await expect(interopLink).toHaveAttribute('href', 'https://www.alignmenthealth.com/api');
    });

    test('should display copyright text in footer', async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator('text=© Copyright 2026 Alignment Health Plan. All Rights Reserved.')).toBeVisible();
    });
  });

  test.describe('Find a Plan Page', () => {
    test('should load Find a Plan page with correct title', async ({ page }) => {
      await page.goto(`${BASE_URL}/find-a-plan`);
      await expect(page).toHaveTitle('Find a Plan | Alignment Health Plan');
    });

    test('should display phone number in Find a Plan header', async ({ page }) => {
      await page.goto(`${BASE_URL}/find-a-plan`);
      const phoneLink = page.locator('role=link[name="1-888-293-8272"]');
      await expect(phoneLink).toBeVisible();
      await expect(phoneLink).toHaveAttribute('href', 'tel:1-888-293-8272');
    });

    test('should display Explore Our Plans heading', async ({ page }) => {
      await page.goto(`${BASE_URL}/find-a-plan`);
      const heading = page.locator('role=heading[level="3"]').filter({ hasText: 'Explore Our Plans' });
      await expect(heading).toBeVisible();
    });

    test('should display ZIP code prompt text on Find a Plan', async ({ page }) => {
      await page.goto(`${BASE_URL}/find-a-plan`);
      await expect(page.locator('text=Enter your ZIP Code to get started')).toBeVisible();
    });

    test('should display breadcrumb navigation on Find a Plan', async ({ page }) => {
      await page.goto(`${BASE_URL}/find-a-plan`);
      const homeLink = page.locator('role=link[name="Home"]').first();
      await expect(homeLink).toBeVisible();
      await expect(homeLink).toHaveAttribute('href', '/home');
    });
  });

  test.describe('Contact Us Page', () => {
    test('should load Contact Us page with correct title', async ({ page }) => {
      await page.goto(`${BASE_URL}/about-us/contact-us`);
      await expect(page).toHaveTitle('Contact Us | Alignment Health Plan');
    });

    test('should display Contact Us main heading', async ({ page }) => {
      await page.goto(`${BASE_URL}/about-us/contact-us`);
      const heading = page.locator('role=heading[level="1"]').filter({ hasText: 'Contact Us' });
      await expect(heading).toBeVisible();
    });

    test('should display contact help subheading', async ({ page }) => {
      await page.goto(`${BASE_URL}/about-us/contact-us`);
      const subheading = page.locator('role=heading[level="4"]').filter({ hasText: 'Need help?' });
      await expect(subheading).toBeVisible();
    });

    test('should display Send Us a Message heading on Contact page', async ({ page }) => {
      await page.goto(`${BASE_URL}/about-us/contact-us`);
      const heading = page.locator('role=heading[level="2"]').filter({ hasText: 'Send Us a Message' });
      await expect(heading).toBeVisible();
    });

    test('should display breadcrumb navigation on Contact page', async ({ page }) => {
      await page.goto(`${BASE_URL}/about-us/contact-us`);
      const homeLink = page.locator('role=link[name="Home"]').first();
      await expect(homeLink).toBeVisible();
      await expect(homeLink).toHaveAttribute('href', '/home');
      const aboutLink = page.locator('role=link[name="About Us"]');
      await expect(aboutLink).toBeVisible();
      await expect(aboutLink).toHaveAttribute('href', '/about-us');
    });
  });

  test.describe('Why Alignment Health Plan Page', () => {
    test('should load Why Alignment page with correct title', async ({ page }) => {
      await page.goto(`${BASE_URL}/discover-ahp/why-alignment-health-plan`);
      await expect(page).toHaveTitle('Discover Alignment | Alignment Health Plan');
    });

    test('should display breadcrumb navigation on Why Alignment page', async ({ page }) => {
      await page.goto(`${BASE_URL}/discover-ahp/why-alignment-health-plan`);
      const homeLink = page.locator('role=link[name="Home"]').first();
      await expect(homeLink).toBeVisible();
      await expect(homeLink).toHaveAttribute('href', '/home');
      const discoverLink = page.locator('role=link[name="Discover Alignment"]');
      await expect(discoverLink).toBeVisible();
    });

    test('should display Medicare Advantage Plans section', async ({ page }) => {
      await page.goto(`${BASE_URL}/discover-ahp/why-alignment-health-plan`);
      const heading = page.locator('role=heading[level="2"]').filter({ hasText: 'MEDICARE advantage PLANS' });
      await expect(heading).toBeVisible();
    });

    test('should display Awards & Recognition section', async ({ page }) => {
      await page.goto(`${BASE_URL}/discover-ahp/why-alignment-health-plan`);
      const heading = page.locator('role=heading[level="2"]').filter({ hasText: 'Awards & Recognition' });
      await expect(heading).toBeVisible();
    });

    test('should display awards recognition text', async ({ page }) => {
      await page.goto(`${BASE_URL}/discover-ahp/why-alignment-health-plan`);
      await expect(page.locator('text=Alignment Health Plan is proud to be recognized')).toBeVisible();
    });

    test('should display Why Alignment Health Plan link on its own page', async ({ page }) => {
      await page.goto(`${BASE_URL}/discover-ahp/why-alignment-health-plan`);
      const whyLink = page.locator('role=link[name="Why Alignment Health Plan"]');
      await expect(whyLink).toBeVisible();
    });
  });

  test.describe('About Us Page', () => {
    test('should load About Us page with correct title', async ({ page }) => {
      await page.goto(`${BASE_URL}/about-us`);
      await expect(page).toHaveTitle('About Us | Alignment Health Plan');
    });

    test('should display Enroll Now button on About Us page', async ({ page }) => {
      await page.goto(`${BASE_URL}/about-us`);
      const enrollBtn = page.locator('role=link[name="Enroll Now"]');
      await expect(enrollBtn).toBeVisible();
      await expect(enrollBtn).toHaveAttribute('href', '/find-a-plan');
    });
  });

  test.describe('Privacy Notices Page', () => {
    test('should load Privacy Notices page with correct title', async ({ page }) => {
      await page.goto(`${BASE_URL}/about-us/privacy-notices`);
      await expect(page).toHaveTitle('Privacy Notices | Alignment Health Plan');
    });
  });

  test.describe('Cross-Page Navigation', () => {
    test('should navigate from Homepage to Find a Plan', async ({ page }) => {
      await page.goto(BASE_URL);
      const enrollBtn = page.locator('role=link[name="Enroll Now"]');
      await enrollBtn.click();
      await page.waitForURL(`${BASE_URL}/find-a-plan`);
      await expect(page).toHaveTitle('Find a Plan | Alignment Health Plan');
    });

    test('should navigate from Homepage to Contact Us via header', async ({ page }) => {
      await page.goto(BASE_URL);
      const contactLink = page.locator('role=link[name="Contact Us"]');
      await contactLink.click();
      await page.waitForURL(`${BASE_URL}/about-us/contact-us`);
      await expect(page).toHaveTitle('Contact Us | Alignment Health Plan');
    });

    test('should navigate back to Homepage from any page', async ({ page }) => {
      await page.goto(`${BASE_URL}/about-us/contact-us`);
      const logoLink = page.locator('role=link[name="AlignmentHealthPlan"]');
      await logoLink.click();
      await page.waitForURL(BASE_URL);
      await expect(page).toHaveTitle('Medicare Advantage Plans that Put You First | Alignment Health Plan');
    });

    test('should navigate from Homepage to Why Alignment via link', async ({ page }) => {
      await page.goto(BASE_URL);
      const whyLink = page.locator('role=link[name="Why Alignment Health Plan"]').first();
      await whyLink.click();
      await page.waitForURL(`${BASE_URL}/discover-ahp/why-alignment-health-plan`);
      await expect(page).toHaveTitle('Discover Alignment | Alignment Health Plan');
    });

    test('should navigate from Contact Us to Legal Notices', async ({ page }) => {
      await page.goto(`${BASE_URL}/about-us/contact-us`);
      const legalLink = page.locator('role=link[name="Legal Notices"]');
      await legalLink.click();
      await page.waitForURL(`${BASE_URL}/about-us/legal-notices`);
    });
  });

  test.describe('Page Elements Presence Validation', () => {
    test('should have banner element on Homepage', async ({ page }) => {
      await page.goto(BASE_URL);
      const banner = page.locator('role=banner');
      await expect(banner).toBeVisible();
    });

    test('should have contentinfo element on Homepage', async ({ page }) => {
      await page.goto(BASE_URL);
      const footer = page.locator('role=contentinfo');
      await expect(footer).toBeVisible();
    });

    test('should have banner on Contact Us page', async ({ page }) => {
      await page.goto(`${BASE_URL}/about-us/contact-us`);
      const banner = page.locator('role=banner');
      await expect(banner).toBeVisible();
    });

    test('should have contentinfo on Contact Us page', async ({ page }) => {
      await page.goto(`${BASE_URL}/about-us/contact-us`);
      const footer = page.locator('role=contentinfo');
      await expect(footer).toBeVisible();
    });
  });

  test.describe('External Link Validation', () => {
    test('Member Login link should point to correct external URL', async ({ page }) => {
      await page.goto(BASE_URL);
      const memberLink = page.locator('role=link[name="Member Login"]');
      const href = await memberLink.getAttribute('href');
      expect(href).toBe('https://members.alignmenthealthplan.com');
    });

    test('Provider Login link should point to correct external URL', async ({ page }) => {
      await page.goto(BASE_URL);
      const providerLink = page.locator('role=link[name="Provider Login"]');
      const href = await providerLink.getAttribute('href');
      expect(href).toBe('https://ava.alignmenthealth.com');
    });

    test('For Agents link should point to correct external URL', async ({ page }) => {
      await page.goto(BASE_URL);
      const agentsLink = page.locator('role=link[name="For Agents"]');
      const href = await agentsLink.getAttribute('href');
      expect(href).toBe('https://www.alignmenthealth.com/Partners/Brokers');
    });

    test('Interoperability link should point to Alignment Health API', async ({ page }) => {
      await page.goto(BASE_URL);
      const interopLink = page.locator('role=link[name="Interoperability"]');
      const href = await interopLink.getAttribute('href');
      expect(href).toBe('https://www.alignmenthealth.com/api');
    });
  });
});
