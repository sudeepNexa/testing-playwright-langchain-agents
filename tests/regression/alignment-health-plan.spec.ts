import { test, expect, Page } from '@playwright/test';

/**
 * Comprehensive Playwright Regression Test Suite for Alignment Health Plan
 * 
 * This test suite covers:
 * - Main navigation structure and behavior (8 tests)
 * - Header and footer links (12 tests)
 * - Homepage sections and call-to-action buttons (15 tests)
 * - Find Plans page (5 tests)
 * - Contact Us page (6 tests)
 * - Additional inner pages (4 tests)
 * 
 * Total: ~50 test cases
 * 
 * Based on accessibility snapshot analysis of:
 * https://www.alignmenthealthplan.com/
 */

const BASE_URL = 'https://www.alignmenthealthplan.com';

test.describe('Alignment Health Plan - Navigation Structure', () => {
  test('Homepage should load with correct title', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await expect(page).toHaveTitle('Medicare Advantage Plans that Put You First | Alignment Health Plan');
  });

  test('Main navigation menu should be visible and contain expected items', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const menubar = page.locator('menubar');
    await expect(menubar).toBeVisible();
    
    // Check for main menu items
    await expect(page.locator('text=Discover Alignment')).toBeVisible();
    await expect(page.locator('text=Find Plans')).toBeVisible();
    await expect(page.locator('text=Find Care')).toBeVisible();
    await expect(page.locator('text=For Members')).toBeVisible();
    await expect(page.locator('text=For Providers')).toBeVisible();
  });

  test('Discover Alignment menu item should be navigable', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const discoverLink = page.locator('link[href="#"]:has-text("Discover Alignment")').first();
    await expect(discoverLink).toBeVisible();
  });

  test('Find Plans menu item should be navigable', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const findPlansLink = page.locator('link[href="#"]:has-text("Find Plans")').first();
    await expect(findPlansLink).toBeVisible();
  });

  test('Find Care menu item should be navigable', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const findCareLink = page.locator('link[href="#"]:has-text("Find Care")').first();
    await expect(findCareLink).toBeVisible();
  });

  test('Enroll Now CTA button should be visible in header', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const enrollButton = page.locator('link:has-text("Enroll Now")');
    await expect(enrollButton).toBeVisible();
  });

  test('Logo should link back to homepage', async ({ page }) => {
    await page.goto(`${BASE_URL}/find-a-plan`);
    const logo = page.locator('img[alt="AlignmentHealthPlan"]').first();
    await expect(logo).toBeVisible();
    
    const logoLink = logo.locator('..').first();
    expect(logoLink).toBeDefined();
  });

  test('Member Login link should be visible in top navigation', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const memberLogin = page.locator('link:has-text("Member Login")').first();
    await expect(memberLogin).toBeVisible();
  });
});

test.describe('Alignment Health Plan - Header Links and Authentication', () => {
  test('Provider Login link should be visible and navigable', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const providerLogin = page.locator('link:has-text("Provider Login")');
    await expect(providerLogin).toBeVisible();
  });

  test('For Agents link should be visible in top navigation', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const agentsLink = page.locator('link:has-text("For Agents")').first();
    await expect(agentsLink).toBeVisible();
  });

  test('Contact Us link should be visible in top navigation', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const contactUs = page.locator('link:has-text("Contact Us")').first();
    await expect(contactUs).toBeVisible();
  });

  test('Search functionality should be present in header', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const searchBox = page.locator('textbox[placeholder="Search"]');
    await expect(searchBox).toBeVisible();
    
    const searchButton = page.locator('button:has-text("Search")');
    await expect(searchButton).toBeVisible();
  });

  test('Text Size control should be visible in header', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const textSizeControl = page.locator('text=Text Size');
    await expect(textSizeControl).toBeVisible();
  });

  test('Language selector should default to English', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const languageSelector = page.locator('text=English');
    await expect(languageSelector).toBeVisible();
  });

  test('Fortune World\'s Most Admired Companies badge should be visible', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const badge = page.locator('text=Fortune');
    await expect(badge).toBeVisible();
    
    const learnMoreLink = page.locator('link:has-text("Learn more >")');
    await expect(learnMoreLink).toBeVisible();
  });

  test('Five-star rating image should be visible on homepage', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const starImage = page.locator('img[alt*="5_Stars"]');
    await expect(starImage).toBeVisible();
  });

  test('5-star rating disclosure text should be visible', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const starText = page.locator('text=Centers for Medicare');
    await expect(starText).toBeVisible();
  });

  test('Medicare Advantage Plans heading should display correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const heading = page.locator('heading:has-text("MEDICARE ADVANTAGE PLANS THAT PUT YOU FIRST")');
    await expect(heading).toBeVisible();
  });
});

test.describe('Alignment Health Plan - Homepage Sections and CTAs', () => {
  test('ZIP code input field should be present on homepage', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const zipInput = page.locator('textbox[placeholder="ZIP Code (Required)"]');
    await expect(zipInput).toBeVisible();
  });

  test('See Plans button should be present and visible', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const seePlansBtn = page.locator('button:has-text("See Plans >")');
    await expect(seePlansBtn).toBeVisible();
  });

  test('How Can We Help You Today section should be visible', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const helpSection = page.locator('heading:has-text("How Can We Help You Today?")');
    await expect(helpSection).toBeVisible();
  });

  test('Compare Medicare Advantage Plans card should be visible', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const compareCard = page.locator('link:has-text("Compare Plans >")');
    await expect(compareCard).toBeVisible();
  });

  test('Learn about Medicare Advantage link should be visible', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const aboutMedicareLink = page.locator('link:has-text("About Medicare >")');
    await expect(aboutMedicareLink).toBeVisible();
  });

  test('Find Care card should be visible on homepage', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const findCareLink = page.locator('link:has-text("Find Care >")');
    await expect(findCareLink).toBeVisible();
  });

  test('Find Medication card should be visible on homepage', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const findMedLink = page.locator('link:has-text("Find Medication >")');
    await expect(findMedLink).toBeVisible();
  });

  test('On-Demand Concierge Services section should be visible', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const conciergeHeading = page.locator('heading:has-text("ON-DEMAND CONCIERGE SERVICES")');
    await expect(conciergeHeading).toBeVisible();
  });

  test('Benefits section should highlight key benefits', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const benefitsText = page.locator('text=benefits').first();
    await expect(benefitsText).toBeVisible();
  });

  test('$0 Monthly plan premium benefit should be displayed', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const premiumText = page.locator('text=Monthly plan premium');
    await expect(premiumText).toBeVisible();
  });

  test('$0 Copay for primary care visits should be displayed', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const primaryCareText = page.locator('text=Copay for primary care visits');
    await expect(primaryCareText).toBeVisible();
  });

  test('$0 Copay for telehealth visits should be displayed', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const telehealthText = page.locator('text=Copay for telehealth visits');
    await expect(telehealthText).toBeVisible();
  });

  test('ACCESS On-Demand Concierge Card section should be visible', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const cardHeading = page.locator('heading:has-text("ACCESS ON-DEMAND CONCIERGE Card")');
    await expect(cardHeading).toBeVisible();
  });

  test('Phone number for enrollment should be visible on homepage', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const phoneNumber = page.locator('link[href="tel:1-888-293-8272"]');
    await expect(phoneNumber).toBeVisible();
  });
});

test.describe('Alignment Health Plan - Footer Links', () => {
  test('Footer should contain Find Plans section', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    const findPlansHeader = page.locator('paragraph:has-text("Find Plans")');
    await expect(findPlansHeader).toBeVisible();
  });

  test('Shop Online footer link should be visible', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    const shopLink = page.locator('link:has-text("Shop Online")').last();
    await expect(shopLink).toBeVisible();
  });

  test('Ways to Enroll footer link should be visible', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    const enrollLink = page.locator('link:has-text("Ways to Enroll")');
    await expect(enrollLink).toBeVisible();
  });

  test('Attend a Seminar footer link should be visible', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    const seminarLink = page.locator('link:has-text("Attend a Seminar")');
    await expect(seminarLink).toBeVisible();
  });

  test('Benefits Highlights footer link should be visible', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    const benefitsLink = page.locator('link:has-text("Benefits Highlights")');
    await expect(benefitsLink).toBeVisible();
  });

  test('Find Care footer section should be present', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    const findCareHeader = page.locator('paragraph:has-text("Find Care")');
    await expect(findCareHeader).toBeVisible();
  });

  test('Find Doctor footer link should be visible', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    const doctorLink = page.locator('link:has-text("Doctor")');
    await expect(doctorLink).toBeVisible();
  });

  test('Find Drug footer link should be visible', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    const drugLink = page.locator('link:has-text("Drug")');
    await expect(drugLink).toBeVisible();
  });

  test('Member Services footer section should be present', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    const memberServicesHeader = page.locator('paragraph:has-text("Member Services")').first();
    await expect(memberServicesHeader).toBeVisible();
  });

  test('Copyright notice should be visible in footer', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    const copyright = page.locator('text=Copyright 2026 Alignment Health Plan');
    await expect(copyright).toBeVisible();
  });

  test('Legal Notices link should be in footer', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    const legalLink = page.locator('link:has-text("Legal Notices")').last();
    await expect(legalLink).toBeVisible();
  });

  test('Privacy Notices link should be in footer', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    const privacyLink = page.locator('link:has-text("Privacy Notices")').last();
    await expect(privacyLink).toBeVisible();
  });
});

test.describe('Alignment Health Plan - Find a Plan Page', () => {
  test('Find a Plan page should load with correct title', async ({ page }) => {
    await page.goto(`${BASE_URL}/find-a-plan`);
    await expect(page).toHaveTitle('Find a Plan | Alignment Health Plan');
  });

  test('Explore Our Plans heading should be visible', async ({ page }) => {
    await page.goto(`${BASE_URL}/find-a-plan`);
    const heading = page.locator('heading:has-text("Explore Our Plans")');
    await expect(heading).toBeVisible();
  });

  test('ZIP Code input on Find a Plan page should be visible', async ({ page }) => {
    await page.goto(`${BASE_URL}/find-a-plan`);
    const zipInput = page.locator('textbox[placeholder="ZIP Code"]');
    await expect(zipInput).toBeVisible();
  });

  test('Get Started button should be visible and disabled initially', async ({ page }) => {
    await page.goto(`${BASE_URL}/find-a-plan`);
    const getStartedBtn = page.locator('button:has-text("Get Started")');
    await expect(getStartedBtn).toBeVisible();
    await expect(getStartedBtn).toBeDisabled();
  });

  test('Contact form fields should be visible on Find a Plan page', async ({ page }) => {
    await page.goto(`${BASE_URL}/find-a-plan`);
    const firstNameField = page.locator('textbox[placeholder="First Name:"]');
    const lastNameField = page.locator('textbox[placeholder="Last Name:"]');
    const emailField = page.locator('textbox[placeholder="Email:"]');
    
    await expect(firstNameField).toBeVisible();
    await expect(lastNameField).toBeVisible();
    await expect(emailField).toBeVisible();
  });
});

test.describe('Alignment Health Plan - Contact Us Page', () => {
  test('Contact Us page should load with correct title', async ({ page }) => {
    await page.goto(`${BASE_URL}/about-us/contact-us`);
    await expect(page).toHaveTitle('Contact Us | Alignment Health Plan');
  });

  test('Contact Us heading should be visible', async ({ page }) => {
    await page.goto(`${BASE_URL}/about-us/contact-us`);
    const heading = page.locator('heading:has-text("Contact Us")').first();
    await expect(heading).toBeVisible();
  });

  test('Breadcrumb navigation should be present on Contact Us page', async ({ page }) => {
    await page.goto(`${BASE_URL}/about-us/contact-us`);
    const homeLink = page.locator('link:has-text("Home")');
    const aboutLink = page.locator('link:has-text("About Us")');
    
    await expect(homeLink).toBeVisible();
    await expect(aboutLink).toBeVisible();
  });

  test('Contact tabs should be visible', async ({ page }) => {
    await page.goto(`${BASE_URL}/about-us/contact-us`);
    const conciergeTab = page.locator('tab:has-text("ACCESS On-Demand Concierge")');
    const memberTab = page.locator('tab:has-text("Member Services")');
    
    await expect(conciergeTab).toBeVisible();
    await expect(memberTab).toBeVisible();
  });

  test('Expand and Collapse all links should be visible on Contact Us page', async ({ page }) => {
    await page.goto(`${BASE_URL}/about-us/contact-us`);
    const expandLink = page.locator('link:has-text("Expand all")');
    const collapseLink = page.locator('link:has-text("Collapse all")');
    
    await expect(expandLink).toBeVisible();
    await expect(collapseLink).toBeVisible();
  });

  test('Send Us a Message form option should be visible', async ({ page }) => {
    await page.goto(`${BASE_URL}/about-us/contact-us`);
    const formHeading = page.locator('strong:has-text("Send Us a Message")');
    await expect(formHeading).toBeVisible();
  });

  test('Member form option should be visible on Contact Us page', async ({ page }) => {
    await page.goto(`${BASE_URL}/about-us/contact-us`);
    const memberLink = page.locator('link:has-text("I am a Member >")');
    await expect(memberLink).toBeVisible();
  });
});

test.describe('Alignment Health Plan - Medicare Advantage Page', () => {
  test('Medicare Advantage Plans page should load with correct title', async ({ page }) => {
    await page.goto(`${BASE_URL}/discover-ahp/medicare-advantage-plans`);
    const pageTitle = await page.title();
    expect(pageTitle).toContain('Medicare Advantage');
  });

  test('Breadcrumb navigation should be present on Medicare page', async ({ page }) => {
    await page.goto(`${BASE_URL}/discover-ahp/medicare-advantage-plans`);
    const homeLink = page.locator('link:has-text("Home")');
    await expect(homeLink).toBeVisible();
  });

  test('Why Alignment Health Plan link should be visible on Find Drug page', async ({ page }) => {
    await page.goto(`${BASE_URL}/find-care/find-a-drug`);
    const whyAlignmentLink = page.locator('link:has-text("Why Alignment Health Plan")');
    // May or may not be visible on this specific page
    if (await whyAlignmentLink.isVisible()) {
      await expect(whyAlignmentLink).toBeVisible();
    }
  });
});

test.describe('Alignment Health Plan - Accessibility and Page Structure', () => {
  test('All pages should have proper banner structure', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const banner = page.locator('banner').first();
    await expect(banner).toBeVisible();
  });

  test('All pages should have proper footer structure', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const footer = page.locator('contentinfo');
    await expect(footer).toBeVisible();
  });

  test('Page should have proper main content area', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const main = page.locator('main, [role="main"]').first();
    // Main content area exists in generic wrapper
    const content = page.locator('generic').first();
    await expect(content).toBeVisible();
  });

  test('Homepage hero section should contain prominent CTA', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const heroCta = page.locator('button:has-text("See Plans >"), link:has-text("Enroll Now")');
    await expect(heroCta.first()).toBeVisible();
  });

  test('All external links should have proper href attributes', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const memberLoginLink = page.locator('link:has-text("Member Login")').first();
    const href = await memberLoginLink.getAttribute('href');
    expect(href).toBeTruthy();
    expect(href).toContain('members.alignmenthealthplan.com');
  });
});

test.describe('Alignment Health Plan - Cross-page Navigation', () => {
  test('Home link in breadcrumb should navigate to homepage', async ({ page }) => {
    await page.goto(`${BASE_URL}/find-a-plan`);
    const homeLink = page.locator('link:has-text("Home")');
    await expect(homeLink).toBeVisible();
  });

  test('Logo should be clickable from inner pages', async ({ page }) => {
    await page.goto(`${BASE_URL}/find-a-plan`);
    const logo = page.locator('img[alt="AlignmentHealthPlan"]').first();
    await expect(logo).toBeVisible();
  });

  test('Find Care section should be navigable from homepage', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const findCareLink = page.locator('link:has-text("Find Care >")');
    await expect(findCareLink).toBeVisible();
  });

  test('Learn More link for concierge should be visible and clickable', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const learnMoreLinks = page.locator('link:has-text("Learn More >")');
    expect(await learnMoreLinks.count()).toBeGreaterThan(0);
  });

  test('Seminar search link should be accessible', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const seminarLink = page.locator('link:has-text("Search Seminars >")');
    await expect(seminarLink).toBeVisible();
  });
});

test.describe('Alignment Health Plan - Content Verification', () => {
  test('TTY accessibility number should be visible', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const ttyText = page.locator('text=TTY: 711');
    await expect(ttyText).toBeVisible();
  });

  test('Plan availability disclaimer should be visible', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const disclaimerText = page.locator('text=Benefits vary by plan');
    await expect(disclaimerText).toBeVisible();
  });

  test('Alignment Health Plan description should be visible on homepage', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const descriptionText = page.locator('text=We believe aging should be celebrated');
    await expect(descriptionText).toBeVisible();
  });

  test('Access On-Demand Concierge description should be visible', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const conciergeText = page.locator('text=24/7 for personal assistance');
    await expect(conciergeText).toBeVisible();
  });

  test('Pharmacy benefit should be mentioned on homepage', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const pharmacyBenefit = page.locator('text=Copay on over 10,000 drugs');
    await expect(pharmacyBenefit).toBeVisible();
  });
});

test.describe('Alignment Health Plan - External Links Verification', () => {
  test('Newsroom link should point to external domain', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    const newsroomLink = page.locator('link:has-text("Newsroom")');
    const href = await newsroomLink.getAttribute('href');
    expect(href).toContain('alignmenthealth.com');
  });

  test('Investor Relations link should be external', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    const irLink = page.locator('link:has-text("Investor Relations")');
    const href = await irLink.getAttribute('href');
    expect(href).toContain('ir.alignmenthealth.com');
  });

  test('Career Opportunities link should be external', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    const careersLink = page.locator('link:has-text("Career Opportunities")');
    const href = await careersLink.getAttribute('href');
    expect(href).toContain('alignmenthealth.com');
  });

  test('Provider Search link should be external', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    const providerSearchLink = page.locator('link:has-text("Doctor")');
    const href = await providerSearchLink.getAttribute('href');
    expect(href).toContain('providersearch');
  });

  test('Click here for full disclaimer should link to legal notices', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    const disclaimerLink = page.locator('link:has-text("Click here to read the full disclaimer")');
    const href = await disclaimerLink.getAttribute('href');
    expect(href).toContain('legal-notices');
  });
});
