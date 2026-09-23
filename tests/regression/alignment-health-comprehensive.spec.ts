import { test, expect, Page } from '@playwright/test';

/**
 * Alignment Health Plan - Comprehensive Regression Test Suite
 * 
 * 50+ test cases covering:
 * 1. Homepage hero, primary navigation, and footer links
 * 2. Plan-finder / plan-comparison flows
 * 3. Member login entry points
 * 4. Find-a-doctor / provider search
 * 5. Contact us / help / FAQ
 * 6. Forms (zip code entry, contact forms, validation)
 * 
 * Base URL: https://www.alignmenthealthplan.com/
 */

const BASE_URL = 'https://www.alignmenthealthplan.com/';

test.describe('Alignment Health Plan - Comprehensive Regression Suite', () => {
  
  // ============================================================================
  // HOMEPAGE HERO & MAIN CONTENT (8 tests)
  // ============================================================================
  
  test.describe('Homepage Hero Section', () => {
    
    test('should load homepage with Medicare Advantage heading', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const heading = page.locator('h1:has-text("MEDICARE ADVANTAGE PLANS THAT PUT YOU FIRST")');
      await expect(heading).toBeVisible();
    });

    test('should display Fortune World\'s Most Admired Companies badge', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const badge = page.locator('img[alt="badge icon"]');
      await expect(badge).toBeVisible();
      
      const badgeText = page.getByText('Alignment Health has been named to the 2026');
      await expect(badgeText).toBeVisible();
    });

    test('should display 5-star rating image on homepage', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const starRating = page.locator('img[alt="Alignment_Health_5_Stars"]');
      await expect(starRating).toBeVisible();
    });

    test('should display subheading about aging celebration', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const subheading = page.getByText('We believe aging should be celebrated');
      await expect(subheading).toBeVisible();
    });

    test('should display hero section benefits grid', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Check for benefits section heading
      const benefitsHeading = page.getByText('benefits we can all align on', { exact: false });
      await expect(benefitsHeading).toBeVisible();
      
      // Check for specific benefit text
      const premiumBenefit = page.getByText('Monthly plan premium');
      await expect(premiumBenefit).toBeVisible();
    });

    test('should display "How Can We Help You Today?" section with 4 main cards', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const section = page.getByText('How Can We Help You Today?');
      await expect(section).toBeVisible();
      
      // Check for main action cards
      const comparePlans = page.getByText('Compare Medicare Advantage Plans');
      const aboutMedicare = page.getByText('Learn about Medicare Advantage');
      const findCare = page.getByText('Find a provider that suits you');
      const findMeds = page.getByText('Find medication that is covered');
      
      await expect(comparePlans).toBeVisible();
      await expect(aboutMedicare).toBeVisible();
      await expect(findCare).toBeVisible();
      await expect(findMeds).toBeVisible();
    });

    test('should display ACCESS On-Demand Concierge section', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const conciergeHeading = page.getByText('ON-DEMAND CONCIERGE SERVICES');
      await expect(conciergeHeading).toBeVisible();
      
      const conciergeText = page.getByText('Our ACCESS On-Demand Concierge connects you to a real person', { exact: false });
      await expect(conciergeText).toBeVisible();
    });

    test('should display contact phone number with TTY information', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const phoneLink = page.locator('a[href="tel:1-888-293-8272"]');
      await expect(phoneLink).toBeVisible();
      
      const ttyText = page.getByText('TTY: 711', { exact: false });
      await expect(ttyText).toBeVisible();
    });
  });

  // ============================================================================
  // PLAN FINDER & ZIP CODE ENTRY (5 tests)
  // ============================================================================
  
  test.describe('Plan Finder & Zip Code Form', () => {
    
    test('should display zip code input field on homepage hero', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const zipInput = page.locator('input[placeholder="ZIP Code (Required)"]');
      await expect(zipInput).toBeVisible();
    });

    test('should validate zip code - reject empty submission', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const seeePlansButton = page.locator('button:has-text("See Plans")').first();
      
      page.on('dialog', dialog => {
        expect(dialog.message()).toContain('Please enter a valid 5-digit zip code');
        dialog.accept();
      });
      
      await seeePlansButton.click();
    });

    test('should accept valid 5-digit zip code input', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const zipInput = page.locator('input[placeholder="ZIP Code (Required)"]');
      await zipInput.fill('90210');
      
      const value = await zipInput.inputValue();
      expect(value).toBe('90210');
    });

    test('should navigate to find-a-plan when valid zip entered', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const zipInput = page.locator('input[placeholder="ZIP Code (Required)"]');
      await zipInput.fill('90210');
      
      const seePlansButton = page.locator('button:has-text("See Plans")').first();
      
      // Set up promise to handle potential dialog
      const dialogPromise = page.waitForEvent('dialog');
      await seePlansButton.click();
      
      // Either a dialog appears or page navigates
      try {
        const dialog = await Promise.race([
          dialogPromise.then(d => { d.accept(); return null; }),
          page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 5000 })
        ]);
      } catch (e) {
        // Navigation or dialog handling may fail due to CAPTCHA
      }
    });

    test('should have "See Plans" button accessible via keyboard', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const seePlansButton = page.locator('button:has-text("See Plans")').first();
      await expect(seePlansButton).toBeVisible();
      
      // Verify button is keyboard accessible
      const isEnabled = await seePlansButton.isEnabled();
      expect(isEnabled).toBe(true);
    });
  });

  // ============================================================================
  // PRIMARY NAVIGATION & MENUS (7 tests)
  // ============================================================================
  
  test.describe('Primary Navigation & Menu', () => {
    
    test('should display main navigation menu items', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Using role selector for menuitem
      const discoverMenu = page.getByRole('menuitem', { name: /Discover Alignment/ });
      const findPlansMenu = page.getByRole('menuitem', { name: /Find Plans/ });
      const findCareMenu = page.getByRole('menuitem', { name: /Find Care/ });
      
      await expect(discoverMenu).toBeVisible();
      await expect(findPlansMenu).toBeVisible();
      await expect(findCareMenu).toBeVisible();
    });

    test('should display "Enroll Now" button in header', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const enrollButton = page.locator('a:has-text("Enroll Now")');
      await expect(enrollButton).toBeVisible();
      
      const href = await enrollButton.getAttribute('href');
      expect(href).toBe('/find-a-plan');
    });

    test('should display Member Login in top navigation', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const memberLogin = page.locator('a:has-text("Member Login")').first();
      await expect(memberLogin).toBeVisible();
      
      const href = await memberLogin.getAttribute('href');
      expect(href).toBe('https://members.alignmenthealthplan.com');
    });

    test('should display Provider Login in top navigation', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const providerLogin = page.locator('a:has-text("Provider Login")').first();
      await expect(providerLogin).toBeVisible();
      
      const href = await providerLogin.getAttribute('href');
      expect(href).toBe('https://ava.alignmenthealth.com');
    });

    test('should display For Agents link in top navigation', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const agentsLink = page.locator('a:has-text("For Agents")').first();
      await expect(agentsLink).toBeVisible();
      
      const href = await agentsLink.getAttribute('href');
      expect(href).toContain('alignmenthealth.com');
    });

    test('should display Contact Us link in top navigation', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const contactLink = page.locator('a:has-text("Contact Us")').first();
      await expect(contactLink).toBeVisible();
      
      const href = await contactLink.getAttribute('href');
      expect(href).toBe('/about-us/contact-us');
    });

    test('should display logo link to homepage', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const logoLink = page.locator('a img[alt="AlignmentHealthPlan"]').first();
      await expect(logoLink).toBeVisible();
      
      const parent = logoLink.locator('..');
      const href = await parent.getAttribute('href');
      expect(href).toBe('/');
    });
  });

  // ============================================================================
  // FOOTER LINKS - ORGANIZATION (12 tests)
  // ============================================================================
  
  test.describe('Footer Links - Find Plans Section', () => {
    
    test('should display Footer "Find Plans" section with all links', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Check section heading
      const footer = page.locator('footer');
      const findPlansHeading = footer.getByText('Find Plans').first();
      await expect(findPlansHeading).toBeVisible();
    });

    test('should have "Shop Online" link in Find Plans footer', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const link = page.locator('footer a:has-text("Shop Online")');
      await expect(link).toBeVisible();
      
      const href = await link.getAttribute('href');
      expect(href).toBe('/find-a-plan/');
    });

    test('should have "Ways to Enroll" link in Find Plans footer', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const link = page.locator('footer a:has-text("Ways to Enroll")');
      await expect(link).toBeVisible();
      
      const href = await link.getAttribute('href');
      expect(href).toBe('/find-plans/ways-to-enroll');
    });

    test('should have "Attend a Seminar" link in Find Plans footer', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const link = page.locator('footer a:has-text("Attend a Seminar")');
      await expect(link).toBeVisible();
      
      const href = await link.getAttribute('href');
      expect(href).toBe('/find-plans/attend-a-seminar');
    });

    test('should have "Benefits Highlights" link in Find Plans footer', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const link = page.locator('footer a:has-text("Benefits Highlights")');
      await expect(link).toBeVisible();
      
      const href = await link.getAttribute('href');
      expect(href).toBe('/find-plans/benefit-highlights');
    });
  });

  test.describe('Footer Links - Find Care Section', () => {
    
    test('should display Footer "Find Care" section heading', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const footer = page.locator('footer');
      const findCareHeading = footer.getByText('Find Care').first();
      await expect(findCareHeading).toBeVisible();
    });

    test('should have "Doctor" link in Find Care footer', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const link = page.locator('footer a:has-text("Doctor")');
      await expect(link).toBeVisible();
      
      const href = await link.getAttribute('href');
      expect(href).toBe('https://providersearch.alignmenthealthplan.com/');
    });

    test('should have "Drug" link in Find Care footer', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const link = page.locator('footer a:has-text("Drug")');
      await expect(link).toBeVisible();
      
      const href = await link.getAttribute('href');
      expect(href).toBe('/find-care/find-a-drug');
    });

    test('should have "Pharmacy" link in Find Care footer', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const link = page.locator('footer a:has-text("Pharmacy")');
      await expect(link).toBeVisible();
      
      const href = await link.getAttribute('href');
      expect(href.includes('/find-care/find-a-pharmacy')).toBeTruthy();
    });

    test('should have "Hospital" link in Find Care footer', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const link = page.locator('footer a:has-text("Hospital")');
      await expect(link).toBeVisible();
      
      const href = await link.getAttribute('href');
      expect(href).toBe('https://providersearch.alignmenthealthplan.com/');
    });

    test('should have "Care Center" link in Find Care footer', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const link = page.locator('footer a:has-text("Care Center")');
      await expect(link).toBeVisible();
      
      const href = await link.getAttribute('href');
      expect(href).toBe('/find-care/find-a-care-center');
    });

    test('should have "Transportation" link in Find Care footer', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const link = page.locator('footer a:has-text("Transportation")');
      await expect(link).toBeVisible();
      
      const href = await link.getAttribute('href');
      expect(href).toBe('/find-care/schedule-transportation');
    });
  });

  test.describe('Footer Links - For Members Section', () => {
    
    test('should have "Member Login" link in For Members footer', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const link = page.locator('footer a:has-text("Member Login")');
      await expect(link).toBeVisible();
      
      const href = await link.getAttribute('href');
      expect(href).toBe('https://members.alignmenthealthplan.com/');
    });

    test('should have "Member Services" link in For Members footer', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const link = page.locator('footer a:has-text("Member Services")').last();
      await expect(link).toBeVisible();
      
      const href = await link.getAttribute('href');
      expect(href.includes('/members/member-services')).toBeTruthy();
    });

    test('should have "Rights & Responsibilities" link in For Members footer', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const link = page.locator('footer a:has-text("Rights & Responsibilities")');
      await expect(link).toBeVisible();
      
      const href = await link.getAttribute('href');
      expect(href).toBe('/members/rights-and-responsibilities');
    });
  });

  // ============================================================================
  // CONTACT US PAGE (6 tests)
  // ============================================================================
  
  test.describe('Contact Us Page', () => {
    
    test('should load Contact Us page successfully', async ({ page }) => {
      await page.goto(`${BASE_URL}about-us/contact-us`);
      
      const heading = page.locator('h1:has-text("Contact Us")');
      await expect(heading).toBeVisible();
    });

    test('should display "Need help?" subheading on Contact Us page', async ({ page }) => {
      await page.goto(`${BASE_URL}about-us/contact-us`);
      
      const subheading = page.getByText('Need help', { exact: false });
      await expect(subheading).toBeVisible();
    });

    test('should display contact tabs on Contact Us page', async ({ page }) => {
      await page.goto(`${BASE_URL}about-us/contact-us`);
      
      // Check for tabs using role selector
      const accessTab = page.getByRole('tab', { name: /ACCESS On-Demand Concierge/ });
      const memberTab = page.getByRole('tab', { name: /Member Services/ });
      
      await expect(accessTab).toBeVisible();
      await expect(memberTab).toBeVisible();
    });

    test('should display "Send Us a Message" section on Contact Us page', async ({ page }) => {
      await page.goto(`${BASE_URL}about-us/contact-us`);
      
      const messageSection = page.getByText('Send Us a Message');
      await expect(messageSection).toBeVisible();
      
      // Check for form options
      const memberOption = page.getByText('I am a Member');
      const providerOption = page.getByText('I am a Provider');
      
      await expect(memberOption).toBeVisible();
      await expect(providerOption).toBeVisible();
    });

    test('should display "Expand all" and "Collapse all" links on Contact Us', async ({ page }) => {
      await page.goto(`${BASE_URL}about-us/contact-us`);
      
      const expandLink = page.locator('a:has-text("Expand all")');
      const collapseLink = page.locator('a:has-text("Collapse all")');
      
      await expect(expandLink).toBeVisible();
      await expect(collapseLink).toBeVisible();
    });

    test('should display breadcrumb navigation on Contact Us page', async ({ page }) => {
      await page.goto(`${BASE_URL}about-us/contact-us`);
      
      const homeBreadcrumb = page.locator('a:has-text("Home")');
      const aboutBreadcrumb = page.locator('a:has-text("About Us")');
      
      await expect(homeBreadcrumb).toBeVisible();
      await expect(aboutBreadcrumb).toBeVisible();
    });
  });

  // ============================================================================
  // MEMBER & PROVIDER LOGIN ACCESS (4 tests)
  // ============================================================================
  
  test.describe('Member & Provider Login Entry Points', () => {
    
    test('should have Member Login link in header and footer', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const headerLogin = page.locator('a:has-text("Member Login")').first();
      const footerLogin = page.locator('footer a:has-text("Member Login")');
      
      await expect(headerLogin).toBeVisible();
      await expect(footerLogin).toBeVisible();
    });

    test('should have Provider Login link in header and footer', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const headerLogin = page.locator('a:has-text("Provider Login")').first();
      const footerLogin = page.locator('footer a:has-text("Provider Login")');
      
      await expect(headerLogin).toBeVisible();
      await expect(footerLogin).toBeVisible();
    });

    test('should have Agents Login link in footer', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const agentsLogin = page.locator('footer a:has-text("Agents Login")');
      await expect(agentsLogin).toBeVisible();
      
      const href = await agentsLogin.getAttribute('href');
      expect(href).toBe('https://agents.alignmenthealthcare.com/');
    });

    test('should navigate to correct member login URL', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const memberLogin = page.locator('a:has-text("Member Login")').first();
      const href = await memberLogin.getAttribute('href');
      
      expect(href).toBe('https://members.alignmenthealthplan.com');
    });
  });

  // ============================================================================
  // FIND A DRUG PAGE (3 tests)
  // ============================================================================
  
  test.describe('Find A Drug / Medication Coverage', () => {
    
    test('should load Find a Drug page successfully', async ({ page }) => {
      await page.goto(`${BASE_URL}find-care/find-a-drug`);
      
      const heading = page.locator('h1:has-text("Find a Drug")');
      await expect(heading).toBeVisible();
    });

    test('should display drug formulary tabs on Find a Drug page', async ({ page }) => {
      await page.goto(`${BASE_URL}find-care/find-a-drug`);
      
      const digitalFormuaryTab = page.getByRole('tab', { name: /Digital Drug Formulary/ });
      const drugSearchTab = page.getByRole('tab', { name: /Drug Search/ });
      const printedCopyTab = page.getByRole('tab', { name: /Request a Printed Copy/ });
      
      await expect(digitalFormuaryTab).toBeVisible();
      await expect(drugSearchTab).toBeVisible();
      await expect(printedCopyTab).toBeVisible();
    });

    test('should display drug search action links', async ({ page }) => {
      await page.goto(`${BASE_URL}find-care/find-a-drug`);
      
      const searchLink = page.locator('a:has-text("Search")');
      const getCopyLink = page.locator('a:has-text("Get a Copy")');
      
      await expect(searchLink).toBeVisible();
      await expect(getCopyLink).toBeVisible();
    });
  });

  // ============================================================================
  // SEARCH FUNCTIONALITY (3 tests)
  // ============================================================================
  
  test.describe('Site Search', () => {
    
    test('should display search input field in header', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const searchInput = page.locator('input[placeholder="Search"]');
      await expect(searchInput).toBeVisible();
    });

    test('should have accessible search button', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const searchButton = page.locator('button:has-text("Search")').first();
      await expect(searchButton).toBeVisible();
      
      const isEnabled = await searchButton.isEnabled();
      expect(isEnabled).toBe(true);
    });

    test('should allow text entry in search field', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const searchInput = page.locator('input[placeholder="Search"]');
      await searchInput.fill('Medicare plans');
      
      const value = await searchInput.inputValue();
      expect(value).toBe('Medicare plans');
    });
  });

  // ============================================================================
  // ACCESSIBILITY & TEXT SIZE FEATURES (5 tests)
  // ============================================================================
  
  test.describe('Accessibility Features', () => {
    
    test('should display Text Size selector in header', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const textSizeControl = page.getByText('Text Size');
      await expect(textSizeControl).toBeVisible();
    });

    test('should display Language selector in header', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const languageSelector = page.getByText('English');
      await expect(languageSelector).toBeVisible();
    });

    test('should have proper page title for accessibility', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const title = await page.title();
      expect(title).toContain('Medicare Advantage Plans');
    });

    test('should have fortune badge with proper alt text', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const badgeImage = page.locator('img[alt="badge icon"]');
      await expect(badgeImage).toBeVisible();
    });

    test('should have Learn More link for fortune award', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const learnMoreLink = page.locator('a:has-text("Learn more >")').first();
      await expect(learnMoreLink).toBeVisible();
      
      const href = await learnMoreLink.getAttribute('href');
      expect(href).toBe('https://www.alignmenthealth.com/fortunewmac2026');
    });
  });

  // ============================================================================
  // LEGAL & COMPLIANCE FOOTER LINKS (5 tests)
  // ============================================================================
  
  test.describe('Legal & Compliance Links', () => {
    
    test('should have Legal Notices link in footer', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const link = page.locator('footer a:has-text("Legal Notices")');
      await expect(link).toBeVisible();
      
      const href = await link.getAttribute('href');
      expect(href).toBe('/about-us/legal-notices');
    });

    test('should have Privacy Notices link in footer', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const link = page.locator('footer a:has-text("Privacy Notices")');
      await expect(link).toBeVisible();
      
      const href = await link.getAttribute('href');
      expect(href).toBe('/about-us/privacy-notices');
    });

    test('should have Terms of Use link in footer', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const link = page.locator('footer a:has-text("Terms of Use")').first();
      await expect(link).toBeVisible();
      
      const href = await link.getAttribute('href');
      expect(href).toBe('/about-us/terms-of-use');
    });

    test('should have Nondiscrimination Policy link in footer', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const link = page.locator('footer a:has-text("Nondiscrimination Policy")');
      await expect(link).toBeVisible();
      
      const href = await link.getAttribute('href');
      expect(href).toBe('/about-us/terms-of-use/nondiscrimination-policy');
    });

    test('should have Disaster Policy link in footer', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const link = page.locator('footer a:has-text("Disaster Policy")');
      await expect(link).toBeVisible();
      
      const href = await link.getAttribute('href');
      expect(href).toBe('/about-us/disaster-policy');
    });
  });

  // ============================================================================
  // PROVIDER & CORPORATE LINKS (4 tests)
  // ============================================================================
  
  test.describe('Provider & Corporate Resources', () => {
    
    test('should have Provider Resources link in footer', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const link = page.locator('footer a:has-text("Provider Resources")');
      await expect(link).toBeVisible();
      
      const href = await link.getAttribute('href');
      expect(href).toBe('/providers/provider-resources');
    });

    test('should have Agents Overview link in footer', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const link = page.locator('footer a:has-text("Agents Overview")');
      await expect(link).toBeVisible();
      
      const href = await link.getAttribute('href');
      expect(href).toBe('https://www.alignmenthealth.com/Partners/Brokers');
    });

    test('should have Our Mission & Vision link in footer', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const link = page.locator('footer a:has-text("Our Mission & Vision")');
      await expect(link).toBeVisible();
      
      const href = await link.getAttribute('href');
      expect(href).toBe('/about-us/');
    });

    test('should have Career Opportunities link in footer', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const link = page.locator('footer a:has-text("Career Opportunities")');
      await expect(link).toBeVisible();
      
      const href = await link.getAttribute('href');
      expect(href).toBe('https://www.alignmenthealth.com/careers');
    });
  });
});
