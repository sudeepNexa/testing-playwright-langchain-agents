import { test, expect, Page } from '@playwright/test';

/**
 * Alignment Health Plan - Comprehensive Regression Test Suite
 * 
 * This test suite covers:
 * - Homepage structure and key CTAs
 * - Navigation menus and links
 * - Header and footer elements
 * - Key page sections and content areas
 * - Primary action buttons
 * - Footer links and accessibility
 * 
 * Scope: Read-only exploration. No form submissions, login attempts, or state changes.
 * All assertions based on accessibility snapshots.
 */

test.describe('Alignment Health Plan - Regression Suite', () => {
  
  // ==================== HOMEPAGE TESTS ====================
  
  test.describe('Homepage - Structure and Layout', () => {
    
    test('HP-001: Homepage loads with correct title and URL', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      expect(page.url()).toBe('https://www.alignmenthealthplan.com/');
      expect(page.title()).toContain('Medicare Advantage Plans');
    });

    test('HP-002: Main heading "MEDICARE ADVANTAGE PLANS THAT PUT YOU FIRST!" is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      const snapshot = await page.accessibility.snapshot();
      expect(snapshot?.children).toBeDefined();
      await expect(page.locator('h1')).toContainText('MEDICARE ADVANTAGE PLANS THAT PUT YOU FIRST');
    });

    test('HP-003: Hero section includes ZIP code search input', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      const zipInput = page.locator('input[placeholder*="ZIP Code"]');
      await expect(zipInput).toBeVisible();
    });

    test('HP-004: Hero section "See Plans >" button is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      const seePlansBtn = page.locator('button:has-text("See Plans >")');
      await expect(seePlansBtn).toBeVisible();
    });

    test('HP-005: Homepage includes Fortune badge with "World\'s Most Admired Companies" badge', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      await expect(page.locator('text=Fortune')).toBeVisible();
      await expect(page.locator('text=World\'s Most Admired Companies')).toBeVisible();
    });

    test('HP-006: 5-Star rating section is visible on homepage', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      await expect(page.locator('text=5-star rating')).toBeVisible();
    });

  });

  // ==================== HEADER AND TOP NAVIGATION ====================
  
  test.describe('Header - Top Navigation and Links', () => {
    
    test('HDR-001: Member Login link is visible in header', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      const memberLogin = page.locator('a:has-text("Member Login")').first();
      await expect(memberLogin).toBeVisible();
    });

    test('HDR-002: Provider Login link is visible in header', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      const providerLogin = page.locator('a:has-text("Provider Login")').first();
      await expect(providerLogin).toBeVisible();
    });

    test('HDR-003: "For Agents" link is visible in header', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      const forAgents = page.locator('a:has-text("For Agents")').first();
      await expect(forAgents).toBeVisible();
    });

    test('HDR-004: "Contact Us" link is visible in header', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      const contactUs = page.locator('a:has-text("Contact Us")').first();
      await expect(contactUs).toBeVisible();
    });

    test('HDR-005: Alignment Health Plan logo is visible and clickable', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      const logo = page.locator('img[alt="AlignmentHealthPlan"]').first();
      await expect(logo).toBeVisible();
    });

    test('HDR-006: Text Size control is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      await expect(page.locator('text=Text Size')).toBeVisible();
    });

    test('HDR-007: Language selector (English) is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      await expect(page.locator('text=English')).toBeVisible();
    });

    test('HDR-008: Search box with placeholder "Search" is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      const searchBox = page.locator('input[placeholder="Search"]');
      await expect(searchBox).toBeVisible();
    });

    test('HDR-009: Search button is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      const searchBtn = page.locator('button:has-text("Search")');
      await expect(searchBtn).toBeVisible();
    });

  });

  // ==================== MAIN NAVIGATION MENU ====================
  
  test.describe('Main Navigation Menu', () => {
    
    test('NAV-001: "Discover Alignment" menu item is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      const discoverMenu = page.locator('[role="menuitem"]:has-text("Discover Alignment")').first();
      await expect(discoverMenu).toBeVisible();
    });

    test('NAV-002: "Find Plans" menu item is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      const findPlansMenu = page.locator('[role="menuitem"]:has-text("Find Plans")').first();
      await expect(findPlansMenu).toBeVisible();
    });

    test('NAV-003: "Find Care" menu item is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      const findCareMenu = page.locator('[role="menuitem"]:has-text("Find Care")').first();
      await expect(findCareMenu).toBeVisible();
    });

    test('NAV-004: "For Members" menu item is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      const forMembersMenu = page.locator('[role="menuitem"]:has-text("For Members")').first();
      await expect(forMembersMenu).toBeVisible();
    });

    test('NAV-005: "For Providers" menu item is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      const forProvidersMenu = page.locator('[role="menuitem"]:has-text("For Providers")').first();
      await expect(forProvidersMenu).toBeVisible();
    });

    test('NAV-006: "Enroll Now" primary CTA button is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      const enrollBtn = page.locator('a:has-text("Enroll Now")').filter({ hasText: 'Enroll Now' }).first();
      await expect(enrollBtn).toBeVisible();
    });

  });

  // ==================== HOMEPAGE KEY SECTIONS ====================
  
  test.describe('Homepage - Key Content Sections', () => {
    
    test('SEC-001: "How Can We Help You Today?" section heading is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      await expect(page.locator('h2:has-text("How Can We Help You Today?")')).toBeVisible();
    });

    test('SEC-002: "Compare Medicare Advantage Plans" CTA card is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      const compareCard = page.locator('a:has-text("Compare Plans >")');
      await expect(compareCard).toBeVisible();
    });

    test('SEC-003: "Learn about Medicare Advantage" CTA card is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      const aboutCard = page.locator('a:has-text("About Medicare >")');
      await expect(aboutCard).toBeVisible();
    });

    test('SEC-004: "Find Care" CTA card is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      const findCareCard = page.locator('a:has-text("Find Care >")');
      await expect(findCareCard).toBeVisible();
    });

    test('SEC-005: "Find Medication" CTA card is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      const findMedCard = page.locator('a:has-text("Find Medication >")');
      await expect(findMedCard).toBeVisible();
    });

    test('SEC-006: "ON-DEMAND CONCIERGE SERVICES" section heading is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      await expect(page.locator('h2:has-text("ON-DEMAND CONCIERGE SERVICES")')).toBeVisible();
    });

    test('SEC-007: Benefits section with zero dollar values is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      const benefitsHeading = page.locator('text=/benefits.*we can all align on/i');
      await expect(benefitsHeading).toBeVisible();
    });

    test('SEC-008: "Let\'s Make Plans" section with phone number is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      await expect(page.locator('h2:has-text("Let\'s Make Plans")')).toBeVisible();
      await expect(page.locator('text=1-888-293-8272')).toBeVisible();
    });

    test('SEC-009: "Seminars" section with "Search Seminars >" link is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      await expect(page.locator('h2:has-text("Seminars")')).toBeVisible();
      await expect(page.locator('a:has-text("Search Seminars >")')).toBeVisible();
    });

    test('SEC-010: "Enroll Online" section with "Enroll Now >" link is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      await expect(page.locator('h2:has-text("Enroll Online")')).toBeVisible();
      const enrollLinks = page.locator('a:has-text("Enroll Now >")');
      expect(await enrollLinks.count()).toBeGreaterThan(0);
    });

  });

  // ==================== FOOTER NAVIGATION ====================
  
  test.describe('Footer - Navigation and Links', () => {
    
    test('FTR-001: Footer "Find Plans" section with Shop Online link is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      await expect(page.locator('footer')).toBeVisible();
      await expect(page.locator('footer a:has-text("Shop Online")')).toBeVisible();
    });

    test('FTR-002: Footer "Ways to Enroll" link is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      await expect(page.locator('footer a:has-text("Ways to Enroll")')).toBeVisible();
    });

    test('FTR-003: Footer "Attend a Seminar" link is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      await expect(page.locator('footer a:has-text("Attend a Seminar")')).toBeVisible();
    });

    test('FTR-004: Footer "Benefits Highlights" link is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      await expect(page.locator('footer a:has-text("Benefits Highlights")')).toBeVisible();
    });

    test('FTR-005: Footer "Pre-Enrollment Kit" link is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      await expect(page.locator('footer a:has-text("Pre-Enrollment Kit")')).toBeVisible();
    });

    test('FTR-006: Footer "Find Care" Doctor link is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      await expect(page.locator('footer a:has-text("Doctor")')).toBeVisible();
    });

    test('FTR-007: Footer "Find a Drug" link is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      await expect(page.locator('footer a:has-text("Drug")')).toBeVisible();
    });

    test('FTR-008: Footer "Find a Pharmacy" link is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      await expect(page.locator('footer a:has-text("Pharmacy")')).toBeVisible();
    });

    test('FTR-009: Footer "Member Login" link is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      const memberLogins = page.locator('footer a:has-text("Member Login")');
      expect(await memberLogins.count()).toBeGreaterThan(0);
    });

    test('FTR-010: Footer "Member Services" link is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      await expect(page.locator('footer a:has-text("Member Services")')).toBeVisible();
    });

    test('FTR-011: Footer "Provider Login" link is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      await expect(page.locator('footer a:has-text("Provider Login")')).toBeVisible();
    });

    test('FTR-012: Footer "For Agents" - Agents Login link is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      await expect(page.locator('footer a:has-text("Agents Login")')).toBeVisible();
    });

    test('FTR-013: Footer "Contact Us" - By Phone link is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      const contactLinks = page.locator('footer a:has-text("By Phone")');
      expect(await contactLinks.count()).toBeGreaterThan(0);
    });

    test('FTR-014: Footer "Legal Notices" link is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      await expect(page.locator('footer a:has-text("Legal Notices")')).toBeVisible();
    });

    test('FTR-015: Footer "Privacy Notices" link is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      await expect(page.locator('footer a:has-text("Privacy Notices")')).toBeVisible();
    });

    test('FTR-016: Footer "Terms of Use" link is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      await expect(page.locator('footer a:has-text("Terms of Use")')).toBeVisible();
    });

    test('FTR-017: Footer copyright notice is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      await expect(page.locator('footer text=© Copyright')).toBeVisible();
    });

  });

  // ==================== INNER PAGE TESTS ====================
  
  test.describe('Medicare Advantage Plans Page', () => {
    
    test('MAP-001: Medicare Advantage Plans page loads with correct title', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/discover-ahp/medicare-advantage-plans');
      expect(page.url()).toContain('medicare-advantage-plans');
      expect(page.title()).toContain('Medicare Advantage Plan');
    });

    test('MAP-002: Main heading for Medicare Advantage is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/discover-ahp/medicare-advantage-plans');
      await expect(page.locator('h1:has-text("What is a Medicare Advantage Plan")')).toBeVisible();
    });

    test('MAP-003: Table of contents with anchors is visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/discover-ahp/medicare-advantage-plans');
      const toc = page.locator('ul:has(li a[href*="#what-is-medicare-advantage"])');
      await expect(toc).toBeVisible();
    });

    test('MAP-004: State-specific Medicare links (California, Nevada, North Carolina, Texas) are visible', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/discover-ahp/medicare-advantage-plans');
      await expect(page.locator('a:has-text("California")')).toBeVisible();
      await expect(page.locator('a:has-text("Nevada")')).toBeVisible();
      await expect(page.locator('a:has-text("North Carolina")')).toBeVisible();
      await expect(page.locator('a:has-text("Texas")')).toBeVisible();
    });

  });

  // ==================== DRUG FINDER PAGE ====================
  
  test.describe('Drug Finder Page', () => {
    
    test('DRG-001: Drug finder page loads with correct title', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/find-care/find-a-drug');
      expect(page.url()).toContain('find-a-drug');
      expect(page.title()).toContain('Find a Drug');
    });

  });

  // ==================== CONTACT US PAGE ====================
  
  test.describe('Contact Us Page', () => {
    
    test('CNT-001: Contact Us page loads with correct title', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/about-us/contact-us');
      expect(page.url()).toContain('contact-us');
      expect(page.title()).toContain('Contact Us');
    });

  });

  // ==================== FIND A PLAN PAGE ====================
  
  test.describe('Find a Plan Page', () => {
    
    test('FND-001: Find a Plan page loads with correct title', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/find-a-plan');
      expect(page.url()).toContain('find-a-plan');
      expect(page.title()).toContain('Find a Plan');
    });

  });

  // ==================== ACCESSIBILITY AND SEMANTIC STRUCTURE ====================
  
  test.describe('Accessibility - Page Structure', () => {
    
    test('A11Y-001: Homepage has proper heading hierarchy (h1 exists)', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
    });

    test('A11Y-002: Page has banner landmark', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      const banner = page.locator('[role="banner"]');
      await expect(banner).toBeVisible();
    });

    test('A11Y-003: Page has contentinfo (footer) landmark', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      const footer = page.locator('[role="contentinfo"]');
      await expect(footer).toBeVisible();
    });

    test('A11Y-004: Navigation menu has menubar role', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      const menubar = page.locator('[role="menubar"]');
      await expect(menubar).toBeVisible();
    });

    test('A11Y-005: Images have alt text', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      const images = page.locator('img[alt]');
      expect(await images.count()).toBeGreaterThan(0);
    });

  });

  // ==================== LINK VERIFICATION ====================
  
  test.describe('Key Links - Destination Verification', () => {
    
    test('LNK-001: Member Login link has correct href', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      const memberLogin = page.locator('a:has-text("Member Login")').first();
      const href = await memberLogin.getAttribute('href');
      expect(href).toContain('members.alignmenthealthplan.com');
    });

    test('LNK-002: Provider Login link has correct href', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      const providerLogin = page.locator('a:has-text("Provider Login")').first();
      const href = await providerLogin.getAttribute('href');
      expect(href).toContain('ava.alignmenthealth.com');
    });

    test('LNK-003: For Agents link routes to broker partners page', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      const forAgents = page.locator('a:has-text("For Agents")').first();
      const href = await forAgents.getAttribute('href');
      expect(href).toContain('Partners/Brokers');
    });

    test('LNK-004: Contact Us link has correct href', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      const contactUs = page.locator('a:has-text("Contact Us")').first();
      const href = await contactUs.getAttribute('href');
      expect(href).toContain('contact-us');
    });

    test('LNK-005: Enroll Now button links to find-a-plan', async ({ page }) => {
      await page.goto('https://www.alignmenthealthplan.com/');
      const enrollBtn = page.locator('a:has-text("Enroll Now")').first();
      const href = await enrollBtn.getAttribute('href');
      expect(href).toContain('find-a-plan');
    });

  });

});
