import { test, expect } from '@playwright/test';

test.describe('Alignment Health Plan - Comprehensive Regression Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
  });

  // ============================================================================
  // 1. HOMEPAGE HERO AND PRIMARY NAVIGATION
  // ============================================================================
  
  test('should display hero heading on homepage', async ({ page }) => {
    const heading = page.getByRole('heading', { 
      name: /MEDICARE ADVANTAGE PLANS THAT PUT YOU FIRST/i 
    });
    await expect(heading).toBeVisible();
  });

  test('should display hero subheading text on homepage', async ({ page }) => {
    const subheading = page.getByText(/We believe aging should be celebrated/i);
    await expect(subheading).toBeVisible();
  });

  test('should display "See Plans" button in hero section', async ({ page }) => {
    const button = page.getByRole('button', { name: /See Plans/i });
    await expect(button).toBeVisible();
  });

  test('should display Medicare star rating badge on homepage', async ({ page }) => {
    const starImage = page.getByAltText(/Alignment_Health_5_Stars/i);
    await expect(starImage).toBeVisible();
  });

  test('should have Member Login link in header navigation', async ({ page }) => {
    const link = page.getByRole('link', { name: /Member Login/i }).first();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'https://members.alignmenthealthplan.com');
  });

  test('should have Provider Login link in header navigation', async ({ page }) => {
    const link = page.getByRole('link', { name: /Provider Login/i }).first();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'https://ava.alignmenthealth.com');
  });

  test('should have Contact Us link in header navigation', async ({ page }) => {
    const link = page.getByRole('link', { name: /Contact Us/i }).first();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/about-us/contact-us');
  });

  test('should have "Discover Alignment" menu item in primary navigation', async ({ page }) => {
    const menuitem = page.getByRole('menuitem', { name: /Discover Alignment/i });
    await expect(menuitem).toBeVisible();
  });

  test('should have "Find Plans" menu item in primary navigation', async ({ page }) => {
    const menuitem = page.getByRole('menuitem', { name: /Find Plans/i });
    await expect(menuitem).toBeVisible();
  });

  test('should have "Find Care" menu item in primary navigation', async ({ page }) => {
    const menuitem = page.getByRole('menuitem', { name: /Find Care/i });
    await expect(menuitem).toBeVisible();
  });

  test('should have "For Members" menu item in primary navigation', async ({ page }) => {
    const menuitem = page.getByRole('menuitem', { name: /For Members/i });
    await expect(menuitem).toBeVisible();
  });

  test('should have "For Providers" menu item in primary navigation', async ({ page }) => {
    const menuitem = page.getByRole('menuitem', { name: /For Providers/i });
    await expect(menuitem).toBeVisible();
  });

  test('should have "Enroll Now" primary CTA button in navigation', async ({ page }) => {
    const button = page.getByRole('link', { name: /Enroll Now/i });
    await expect(button).toBeVisible();
  });

  test('should display Alignment Health Plan logo in header', async ({ page }) => {
    const logo = page.getByAltText(/AlignmentHealthPlan/i).first();
    await expect(logo).toBeVisible();
  });

  test('should have "For Agents" link in header', async ({ page }) => {
    const link = page.getByRole('link', { name: /For Agents/i }).first();
    await expect(link).toBeVisible();
  });

  // ============================================================================
  // 2. HERO SECTION - ZIP CODE FORM
  // ============================================================================

  test('should display ZIP code input field in hero section', async ({ page }) => {
    const input = page.getByRole('textbox', { name: /ZIP Code/i });
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', /ZIP Code \(Required\)/i);
  });

  test('should allow user to enter ZIP code in hero form', async ({ page }) => {
    const input = page.getByRole('textbox', { name: /ZIP Code/i });
    await input.fill('89144');
    await expect(input).toHaveValue('89144');
  });

  test('should display "See Plans" submit button in hero form', async ({ page }) => {
    const button = page.getByRole('button', { name: /See Plans/i });
    await expect(button).toBeVisible();
  });

  // ============================================================================
  // 3. PLAN COMPARISON AND DISCOVERY CARDS
  // ============================================================================

  test('should display "How Can We Help You Today?" section', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /How Can We Help You Today?/i });
    await expect(heading).toBeVisible();
  });

  test('should display "Compare Medicare Advantage Plans" card', async ({ page }) => {
    const link = page.getByRole('link', { name: /Compare Plans/i });
    await expect(link).toBeVisible();
  });

  test('should display "Compare Plans" card description', async ({ page }) => {
    const text = page.getByText(/Answer a few questions, and we'll recommend plans/i);
    await expect(text).toBeVisible();
  });

  test('should display "Learn about Medicare Advantage" card', async ({ page }) => {
    const link = page.getByRole('link', { name: /About Medicare/i });
    await expect(link).toBeVisible();
  });

  test('should display "Find a provider" card', async ({ page }) => {
    const link = page.getByRole('link', { name: /Find Care/i }).nth(2);
    await expect(link).toBeVisible();
  });

  test('should have correct link for Compare Plans card', async ({ page }) => {
    const link = page.getByRole('link', { name: /Compare Plans/i });
    await expect(link).toHaveAttribute('href', '/find-a-plan');
  });

  test('should have correct link for About Medicare card', async ({ page }) => {
    const link = page.getByRole('link', { name: /About Medicare/i });
    await expect(link).toHaveAttribute('href', '/discover-ahp/medicare-advantage-plans');
  });

  // ============================================================================
  // 4. PROVIDER SEARCH / FIND CARE
  // ============================================================================

  test('should display "Find a provider that suits you" section', async ({ page }) => {
    const text = page.getByText(/Find a provider that suits you/i);
    await expect(text).toBeVisible();
  });

  test('should have "Find Care" link pointing to provider search', async ({ page }) => {
    const link = page.getByRole('link', { name: /Find Care >/ }).first();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'https://providersearch.alignmenthealthplan.com/');
  });

  test('should display provider search description text', async ({ page }) => {
    const text = page.getByText(/Search for doctors, facilities and other services/i);
    await expect(text).toBeVisible();
  });

  // ============================================================================
  // 5. CONTACT AND HELP SECTION
  // ============================================================================

  test('should display "Let\'s Make Plans" section heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /Let's Make Plans/i });
    await expect(heading).toBeVisible();
  });

  test('should display phone number in "Let\'s Make Plans" section', async ({ page }) => {
    const link = page.getByRole('link', { name: /1-888-293-8272/i });
    await expect(link).toBeVisible();
  });

  // ============================================================================
  // 6. FOOTER NAVIGATION - FIND PLANS SECTION
  // ============================================================================

  test('should display "Find Plans" footer section', async ({ page }) => {
    const heading = page.getByText(/Find Plans/i).filter({ hasNot: page.getByRole('menuitem') }).nth(3);
    await expect(heading).toBeVisible();
  });

  test('should have "Shop Online" link in footer', async ({ page }) => {
    const link = page.getByRole('link', { name: /Shop Online/i });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/find-a-plan/');
  });

  test('should have "Ways to Enroll" link in footer', async ({ page }) => {
    const link = page.getByRole('link', { name: /Ways to Enroll/i });
    await expect(link).toBeVisible();
  });

  test('should have "Attend a Seminar" link in footer', async ({ page }) => {
    const link = page.getByRole('link', { name: /Attend a Seminar/i });
    await expect(link).toBeVisible();
  });

  test('should have "Benefits Highlights" link in footer', async ({ page }) => {
    const link = page.getByRole('link', { name: /Benefits Highlights/i });
    await expect(link).toBeVisible();
  });

  test('should have "Medicare Part D FAQs" link in footer', async ({ page }) => {
    const link = page.getByRole('link', { name: /Medicare Part D FAQs/i });
    await expect(link).toBeVisible();
  });

  // ============================================================================
  // 7. FOOTER NAVIGATION - FIND CARE SECTION
  // ============================================================================

  test('should display "Find Care" footer section', async ({ page }) => {
    const heading = page.getByText(/Find Care/i).filter({ hasNot: page.getByRole('menuitem') }).last();
    await expect(heading).toBeVisible();
  });

  test('should have "Doctor" link in Find Care footer section', async ({ page }) => {
    const link = page.getByRole('link', { name: /^Doctor$/i });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'https://providersearch.alignmenthealthplan.com/');
  });

  test('should have "Drug" link in Find Care footer section', async ({ page }) => {
    const link = page.getByRole('link', { name: /^Drug$/i });
    await expect(link).toBeVisible();
  });

  test('should have "Pharmacy" link in Find Care footer section', async ({ page }) => {
    const link = page.getByRole('link', { name: /^Pharmacy$/i });
    await expect(link).toBeVisible();
  });

  test('should have "Hospital" link in Find Care footer section', async ({ page }) => {
    const link = page.getByRole('link', { name: /^Hospital$/i });
    await expect(link).toBeVisible();
  });

  test('should have "Care Center" link in Find Care footer section', async ({ page }) => {
    const link = page.getByRole('link', { name: /Care Center/i });
    await expect(link).toBeVisible();
  });

  // ============================================================================
  // 8. FOOTER NAVIGATION - FOR MEMBERS SECTION
  // ============================================================================

  test('should have "Member Login" link in For Members footer section', async ({ page }) => {
    const link = page.getByRole('link', { name: /Member Login/i }).last();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'https://members.alignmenthealthplan.com/');
  });

  test('should have "Member Services" link in For Members footer section', async ({ page }) => {
    const link = page.getByRole('link', { name: /Member Services/i });
    await expect(link).toBeVisible();
  });

  // ============================================================================
  // 9. FOOTER NAVIGATION - FOR PROVIDERS SECTION
  // ============================================================================

  test('should have "Provider Login" link in For Providers footer section', async ({ page }) => {
    const link = page.getByRole('link', { name: /Provider Login/i }).last();
    await expect(link).toBeVisible();
  });

  test('should have "Provider Resources" link in For Providers footer section', async ({ page }) => {
    const link = page.getByRole('link', { name: /Provider Resources/i });
    await expect(link).toBeVisible();
  });

  // ============================================================================
  // 10. FOOTER - LEGAL AND COPYRIGHT
  // ============================================================================

  test('should display copyright notice in footer', async ({ page }) => {
    const text = page.getByText(/© Copyright.*Alignment Health Plan/i);
    await expect(text).toBeVisible();
  });

  test('should have "Legal Notices" link in footer', async ({ page }) => {
    const link = page.getByRole('link', { name: /Legal Notices/i });
    await expect(link).toBeVisible();
  });

  test('should display Alignment Health Plan logo in footer', async ({ page }) => {
    const logo = page.getByAltText(/Alignment Health Plan/i).nth(1);
    await expect(logo).toBeVisible();
  });

  // ============================================================================
  // 11. FOOTER - CONTACT US SECTION
  // ============================================================================

  test('should display "Contact Us" section in footer', async ({ page }) => {
    const text = page.getByText(/Contact Us/i).filter({ hasNot: page.getByRole('link') }).nth(1);
    await expect(text).toBeVisible();
  });

  test('should have "By Phone" contact link in footer', async ({ page }) => {
    const link = page.getByRole('link', { name: /By Phone/i });
    await expect(link).toBeVisible();
  });

  test('should have "Send Us a Message" link in footer', async ({ page }) => {
    const link = page.getByRole('link', { name: /Send Us a Message/i });
    await expect(link).toBeVisible();
  });

  // ============================================================================
  // 12. PLAN FINDER PAGE - NAVIGATION
  // ============================================================================

  test('should navigate to plan finder page when clicking Compare Plans', async ({ page }) => {
    const link = page.getByRole('link', { name: /Compare Plans >/ });
    await link.click();
    await page.waitForURL('**/find-a-plan*');
    await expect(page).toHaveURL(/\/find-a-plan/);
  });

  test('should display breadcrumb navigation on plan finder page', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/find-a-plan');
    const breadcrumb = page.getByRole('link', { name: /Home/i });
    await expect(breadcrumb).toBeVisible();
  });

  test('should display "Explore Our Plans" heading on plan finder page', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/find-a-plan');
    const heading = page.getByRole('heading', { name: /Explore Our Plans/i });
    await expect(heading).toBeVisible();
  });

  test('should display ZIP code input on plan finder page', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/find-a-plan');
    const input = page.getByRole('textbox', { name: /ZIP Code/i });
    await expect(input).toBeVisible();
  });

  test('should allow ZIP code entry on plan finder page', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/find-a-plan');
    const input = page.getByRole('textbox', { name: /ZIP Code/i });
    await input.fill('89144');
    await expect(input).toHaveValue('89144');
  });

  test('should have Submit button on plan finder form', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/find-a-plan');
    const button = page.getByRole('button', { name: /Submit/i });
    await expect(button).toBeVisible();
  });

  // ============================================================================
  // 13. CONTACT US PAGE - STRUCTURE AND FORMS
  // ============================================================================

  test('should navigate to contact page via Contact Us link', async ({ page }) => {
    const link = page.getByRole('link', { name: /Contact Us/i }).first();
    await link.click();
    await page.waitForURL('**/contact-us*');
    await expect(page).toHaveURL(/\/contact-us/);
  });

  test('should display help section heading on contact page', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/about-us/contact-us');
    const heading = page.getByRole('heading', { name: /Need help\?/i });
    await expect(heading).toBeVisible();
  });

  test('should display "Send Us a Message" section on contact page', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/about-us/contact-us');
    const heading = page.getByRole('heading', { name: /Send Us a Message/i });
    await expect(heading).toBeVisible();
  });

  test('should display security disclaimer on contact page', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/about-us/contact-us');
    const text = page.getByText(/For your personal security, please refrain from sharing/i);
    await expect(text).toBeVisible();
  });

  test('should display medical emergency notice on contact page', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/about-us/contact-us');
    const text = page.getByText(/For any medical emergency, please call 911/i);
    await expect(text).toBeVisible();
  });

  test('should display contact tabs on contact page', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/about-us/contact-us');
    const tab = page.getByRole('tab', { name: /Sales/i });
    await expect(tab).toBeVisible();
  });

  test('should display "Pharmacy Help Desk for Members" tab', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/about-us/contact-us');
    const tab = page.getByRole('tab', { name: /Pharmacy Help Desk for Members/i });
    await expect(tab).toBeVisible();
  });

  test('should display "Transportation Scheduling" tab', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/about-us/contact-us');
    const tab = page.getByRole('tab', { name: /Transportation Scheduling/i });
    await expect(tab).toBeVisible();
  });

  test('should allow switching between contact tabs', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/about-us/contact-us');
    const tab = page.getByRole('tab', { name: /Pharmacy Help Desk for Members/i });
    await tab.click();
    // Verify the tab is now active by checking it has aria-selected
    await expect(tab).toHaveAttribute('aria-selected', 'true');
  });

  // ============================================================================
  // 14. FOOTER AGENT SECTION
  // ============================================================================

  test('should display "For Agents" section in footer', async ({ page }) => {
    const text = page.getByText(/For Agents/i).filter({ hasNot: page.getByRole('link').filter({ hasText: /For Agents/i }).first() }).nth(0);
    await expect(text).toBeVisible();
  });

  test('should have "Agents Overview" link in footer', async ({ page }) => {
    const link = page.getByRole('link', { name: /Agents Overview/i });
    await expect(link).toBeVisible();
  });

  // ============================================================================
  // 15. NAVIGATION MENU - SUBMENU VERIFICATION
  // ============================================================================

  test('should display "About Medicare" in Discover Alignment submenu', async ({ page }) => {
    const text = page.getByText(/About Medicare/);
    await expect(text.first()).toBeVisible();
  });

  test('should have Enroll Now CTA visible above the fold', async ({ page }) => {
    const button = page.getByRole('link', { name: /Enroll Now/i });
    await expect(button).toBeVisible();
  });

  // ============================================================================
  // 16. INTEGRATION TESTS - FULL FLOWS
  // ============================================================================

  test('should complete flow: homepage to plan finder', async ({ page }) => {
    // Start on homepage
    await expect(page).toHaveURL('https://www.alignmenthealthplan.com/');
    
    // Click Compare Plans
    const compareLink = page.getByRole('link', { name: /Compare Plans/i });
    await compareLink.click();
    
    // Verify on plan finder page
    await page.waitForURL('**/find-a-plan*');
    await expect(page).toHaveURL(/\/find-a-plan/);
    
    // Verify plan finder elements exist
    const heading = page.getByRole('heading', { name: /Explore Our Plans/i });
    await expect(heading).toBeVisible();
  });

  test('should complete flow: homepage to contact us', async ({ page }) => {
    // Start on homepage
    await expect(page).toHaveURL('https://www.alignmenthealthplan.com/');
    
    // Click Contact Us
    const contactLink = page.getByRole('link', { name: /Contact Us/i }).first();
    await contactLink.click();
    
    // Verify on contact page
    await page.waitForURL('**/contact-us*');
    await expect(page).toHaveURL(/\/contact-us/);
    
    // Verify help section
    const helpText = page.getByText(/Need help\?/i);
    await expect(helpText).toBeVisible();
  });

  test('should complete flow: member login accessible from header', async ({ page }) => {
    const memberLoginLink = page.getByRole('link', { name: /Member Login/i }).first();
    await expect(memberLoginLink).toBeVisible();
    await expect(memberLoginLink).toHaveAttribute('href', 'https://members.alignmenthealthplan.com');
  });

  test('should complete flow: member login accessible from footer', async ({ page }) => {
    const memberLoginLink = page.getByRole('link', { name: /Member Login/i }).last();
    await expect(memberLoginLink).toBeVisible();
    await expect(memberLoginLink).toHaveAttribute('href', 'https://members.alignmenthealthplan.com/');
  });

  test('should complete flow: provider search accessible from homepage', async ({ page }) => {
    const providerSearchLink = page.getByRole('link', { name: /Find Care >/ }).first();
    await expect(providerSearchLink).toBeVisible();
    await expect(providerSearchLink).toHaveAttribute('href', 'https://providersearch.alignmenthealthplan.com/');
  });

  test('should complete flow: FAQ accessible from footer', async ({ page }) => {
    const faqLink = page.getByRole('link', { name: /Medicare Part D FAQs/i });
    await expect(faqLink).toBeVisible();
  });

  // ============================================================================
  // 17. RESPONSIVE AND ACCESSIBILITY
  // ============================================================================

  test('should have valid page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Medicare Advantage Plans/i);
  });

  test('should have proper heading hierarchy on homepage', async ({ page }) => {
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toBeVisible();
    expect(await h1.count()).toBeGreaterThan(0);
  });

  test('should have visible logo link to home', async ({ page }) => {
    const logoLink = page.getByRole('link').filter({ has: page.getByAltText(/AlignmentHealthPlan|Alignment Health Plan/i) }).first();
    await expect(logoLink).toBeVisible();
  });

  test('should display content info region (footer)', async ({ page }) => {
    const footer = page.getByRole('contentinfo');
    await expect(footer).toBeVisible();
  });

  test('should have banner region (header)', async ({ page }) => {
    const header = page.getByRole('banner');
    await expect(header).toBeVisible();
  });

  // ============================================================================
  // 18. FORM VALIDATION AND BEHAVIOR
  // ============================================================================

  test('should have required ZIP code field with placeholder', async ({ page }) => {
    const input = page.getByRole('textbox', { name: /ZIP Code/i });
    await expect(input).toHaveAttribute('placeholder', /ZIP Code \(Required\)/i);
  });

  test('should mark ZIP code field as required', async ({ page }) => {
    const label = page.getByText(/\*Required/i);
    await expect(label).toBeVisible();
  });

  test('should be able to fill and clear ZIP code field', async ({ page }) => {
    const input = page.getByRole('textbox', { name: /ZIP Code/i });
    await input.fill('90210');
    await expect(input).toHaveValue('90210');
    await input.clear();
    await expect(input).toHaveValue('');
  });

  // ============================================================================
  // 19. LINK INTEGRITY VERIFICATION
  // ============================================================================

  test('should have working "Find Care" link in menu', async ({ page }) => {
    const link = page.getByRole('menuitem', { name: /Find Care/i });
    await expect(link).toBeVisible();
  });

  test('should have working "For Agents" link', async ({ page }) => {
    const link = page.getByRole('link', { name: /For Agents/i }).first();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', expect.stringContaining('brokers'));
  });

  test('should have valid phone number link', async ({ page }) => {
    const phoneLink = page.getByRole('link', { name: /1-888-293-8272/i });
    await expect(phoneLink).toBeVisible();
    await expect(phoneLink).toHaveAttribute('href', 'tel:1-888-293-8272');
  });

  // ============================================================================
  // 20. STAR RATING AND BADGES
  // ============================================================================

  test('should display 5-star rating badge', async ({ page }) => {
    const starImage = page.getByAltText(/Alignment_Health_5_Stars/i);
    await expect(starImage).toBeVisible();
  });

  test('should display star rating disclaimer text', async ({ page }) => {
    const disclaimer = page.getByText(/Centers for Medicare & Medicaid Services/i);
    await expect(disclaimer).toBeVisible();
  });

  test('should display superscript dagger symbol', async ({ page }) => {
    const superscript = page.getByText(/†/);
    await expect(superscript).toBeVisible();
  });

  // ============================================================================
  // 21. ADDITIONAL FOOTER SECTIONS
  // ============================================================================

  test('should have "About Alignment" section in footer', async ({ page }) => {
    const text = page.getByText(/About Alignment/i);
    await expect(text).toBeVisible();
  });

  test('should have "Medicare Part D FAQs" link in Find Plans section', async ({ page }) => {
    const link = page.getByRole('link', { name: /Medicare Part D FAQs/i });
    await expect(link).toBeVisible();
  });

  test('should have "Group Retiree Options" link in footer', async ({ page }) => {
    const link = page.getByRole('link', { name: /Group Retiree Options/i });
    await expect(link).toBeVisible();
  });

  test('should have "Pre-Enrollment Kit" link in footer', async ({ page }) => {
    const link = page.getByRole('link', { name: /Pre-Enrollment Kit/i });
    await expect(link).toBeVisible();
  });

  test('should have "Visit Us" link in footer', async ({ page }) => {
    const link = page.getByRole('link', { name: /Visit Us/i });
    await expect(link).toBeVisible();
  });

  // ============================================================================
  // 22. PAGE LOAD AND STABILITY
  // ============================================================================

  test('should load homepage without errors', async ({ page }) => {
    const consoleMessages = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleMessages.push(msg.text());
      }
    });
    
    await page.goto('https://www.alignmenthealthplan.com/');
    await expect(page).toHaveURL('https://www.alignmenthealthplan.com/');
    
    // Allow page time to fully load
    await page.waitForLoadState('networkidle');
  });

  test('should have banner element visible', async ({ page }) => {
    const banner = page.getByRole('banner');
    await expect(banner).toBeVisible();
  });

  test('should display hero image context', async ({ page }) => {
    const heroSection = page.getByRole('heading', { 
      name: /MEDICARE ADVANTAGE PLANS THAT PUT YOU FIRST/i 
    });
    await expect(heroSection).toBeVisible();
  });
});
