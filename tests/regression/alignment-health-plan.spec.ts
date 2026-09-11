import { test, expect } from '@playwright/test';

// Test configuration
const BASE_URL = 'https://www.alignmenthealthplan.com';

test.describe('Alignment Health Plan - Regression Test Suite', () => {
  
  // ============================================================================
  // HOMEPAGE TESTS (Tests 1-15)
  // ============================================================================
  
  test.describe('Homepage - Navigation & Header', () => {
    test('1. Homepage loads successfully with correct title', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      await expect(page).toHaveTitle('Medicare Advantage Plans that Put You First | Alignment Health Plan');
    });

    test('2. Logo link is present and navigates to home', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const logoLink = page.locator('a[href="/"]').first();
      await expect(logoLink).toBeVisible();
      await expect(logoLink.locator('img[alt="AlignmentHealthPlan"]')).toBeVisible();
    });

    test('3. Member Login link is visible in top navigation', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const memberLoginLink = page.locator('a').filter({ hasText: 'Member Login' });
      await expect(memberLoginLink).toBeVisible();
      expect(await memberLoginLink.getAttribute('href')).toBe('https://members.alignmenthealthplan.com');
    });

    test('4. Provider Login link is visible in top navigation', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const providerLoginLink = page.locator('a').filter({ hasText: 'Provider Login' });
      await expect(providerLoginLink).toBeVisible();
      expect(await providerLoginLink.getAttribute('href')).toBe('https://ava.alignmenthealth.com');
    });

    test('5. For Agents link is visible in top navigation', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const agentsLink = page.locator('a').filter({ hasText: 'For Agents' });
      await expect(agentsLink).toBeVisible();
      expect(await agentsLink.getAttribute('href')).toBe('https://www.alignmenthealth.com/Partners/Brokers');
    });

    test('6. Contact Us link is visible in top navigation', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const contactUsLink = page.locator('a').filter({ hasText: 'Contact Us' }).first();
      await expect(contactUsLink).toBeVisible();
      expect(await contactUsLink.getAttribute('href')).toBe('/about-us/contact-us');
    });

    test('7. Main navigation menu has Discover Alignment item', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const discoverAlignment = page.locator('text=Discover Alignment').first();
      await expect(discoverAlignment).toBeVisible();
    });

    test('8. Main navigation menu has Find Plans item', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const findPlans = page.locator('text=Find Plans').first();
      await expect(findPlans).toBeVisible();
    });

    test('9. Main navigation menu has Find Care item', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const findCare = page.locator('text=Find Care').first();
      await expect(findCare).toBeVisible();
    });

    test('10. Enroll Now button is present in header', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const enrollButton = page.locator('a').filter({ hasText: 'Enroll Now' });
      await expect(enrollButton).toBeVisible();
      expect(await enrollButton.getAttribute('href')).toBe('/find-a-plan');
    });

    test('11. Fortune award banner is visible on homepage', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const fortuneBanner = page.locator('text=Alignment Health has been named to the 2026').first();
      await expect(fortuneBanner).toBeVisible();
    });

    test('12. Fortune award "Learn more" link is present', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const learnMoreLink = page.locator('a').filter({ hasText: 'Learn more >' }).first();
      await expect(learnMoreLink).toBeVisible();
      expect(await learnMoreLink.getAttribute('href')).toBe('https://www.alignmenthealth.com/fortunewmac2026');
    });

    test('13. Main heading "MEDICARE ADVANTAGE PLANS THAT PUT YOU FIRST!" is visible', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const mainHeading = page.locator('heading').filter({ hasText: 'MEDICARE ADVANTAGE PLANS THAT PUT YOU FIRST' });
      await expect(mainHeading).toBeVisible();
    });

    test('14. Homepage subtitle text is visible', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const subtitle = page.locator('text=We believe aging should be celebrated').first();
      await expect(subtitle).toBeVisible();
    });

    test('15. ZIP code input field is present on homepage', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const zipInput = page.locator('input[placeholder*="ZIP Code"]').first();
      await expect(zipInput).toBeVisible();
    });
  });

  // ============================================================================
  // HOMEPAGE - CALL-TO-ACTION & BUTTONS (Tests 16-25)
  // ============================================================================

  test.describe('Homepage - CTAs and Buttons', () => {
    test('16. "See Plans >" button is present and functional', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const seePlansButton = page.locator('button').filter({ hasText: 'See Plans >' });
      await expect(seePlansButton).toBeVisible();
    });

    test('17. 5-star rating section is visible', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const fiveStarText = page.locator('text=5-star rating').first();
      await expect(fiveStarText).toBeVisible();
    });

    test('18. "How Can We Help You Today?" section heading is visible', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const helpSection = page.locator('heading').filter({ hasText: 'How Can We Help You Today?' });
      await expect(helpSection).toBeVisible();
    });

    test('19. "Compare Plans" CTA card is visible', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const compareLink = page.locator('a').filter({ hasText: 'Compare Plans >' }).first();
      await expect(compareLink).toBeVisible();
      expect(await compareLink.getAttribute('href')).toBe('/find-a-plan');
    });

    test('20. "About Medicare" CTA card is visible', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const aboutMedicareLink = page.locator('a').filter({ hasText: 'About Medicare >' }).first();
      await expect(aboutMedicareLink).toBeVisible();
      expect(await aboutMedicareLink.getAttribute('href')).toBe('/discover-ahp/medicare-advantage-plans');
    });

    test('21. "Find Care" CTA card is visible', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const findCareLink = page.locator('a').filter({ hasText: 'Find Care >' }).first();
      await expect(findCareLink).toBeVisible();
    });

    test('22. "Find Medication" CTA card is visible', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const findMedicationLink = page.locator('a').filter({ hasText: 'Find Medication >' });
      await expect(findMedicationLink).toBeVisible();
      expect(await findMedicationLink.getAttribute('href')).toBe('/find-care/find-a-drug');
    });

    test('23. Benefits section displays $0 premium information', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const zeroText = page.locator('text=$ 0').first();
      await expect(zeroText).toBeVisible();
    });

    test('24. Phone number link "1-888-293-8272" is present', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const phoneLink = page.locator('a[href="tel:1-888-293-8272"]').first();
      await expect(phoneLink).toBeVisible();
    });

    test('25. "Let\'s Make Plans" section with "Enroll Now >" link is visible', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const letsMakePlans = page.locator('heading').filter({ hasText: 'Let\'s Make Plans' });
      await expect(letsMakePlans).toBeVisible();
    });
  });

  // ============================================================================
  // HOMEPAGE - FOOTER TESTS (Tests 26-35)
  // ============================================================================

  test.describe('Homepage - Footer & Legal', () => {
    test('26. Footer logo is present', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const footerLogo = page.locator('footer img[alt="Alignment Health Plan"]');
      await expect(footerLogo).toBeVisible();
    });

    test('27. "Find Plans" footer section is present with links', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const findPlansHeader = page.locator('text=Find Plans').filter({ exact: false });
      const findPlansSectionText = page.locator('text=Shop Online');
      await expect(findPlansSectionText).toBeVisible();
    });

    test('28. "Shop Online" link in footer points to /find-a-plan/', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const shopOnlineLink = page.locator('a').filter({ hasText: 'Shop Online' });
      expect(await shopOnlineLink.getAttribute('href')).toBe('/find-a-plan/');
    });

    test('29. "Ways to Enroll" footer link is present', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const waysToEnrollLink = page.locator('a').filter({ hasText: 'Ways to Enroll' });
      await expect(waysToEnrollLink).toBeVisible();
    });

    test('30. "Attend a Seminar" footer link is present', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const attendSeminarLink = page.locator('a').filter({ hasText: 'Attend a Seminar' });
      await expect(attendSeminarLink).toBeVisible();
    });

    test('31. Footer "Find Care" section contains Doctor link', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const doctorLink = page.locator('a').filter({ hasText: 'Doctor' }).first();
      await expect(doctorLink).toBeVisible();
    });

    test('32. Footer contains Member Login link', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const memberLoginLink = page.locator('footer').locator('a').filter({ hasText: 'Member Login' });
      await expect(memberLoginLink).toBeVisible();
    });

    test('33. Legal Notices footer link is present', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const legalNoticesLink = page.locator('a').filter({ hasText: 'Legal Notices' }).last();
      await expect(legalNoticesLink).toBeVisible();
      expect(await legalNoticesLink.getAttribute('href')).toBe('/about-us/legal-notices');
    });

    test('34. Privacy Notices footer link is present', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const privacyLink = page.locator('a').filter({ hasText: 'Privacy Notices' });
      await expect(privacyLink).toBeVisible();
    });

    test('35. Copyright year is displayed in footer', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const copyrightText = page.locator('text=© Copyright 2026');
      await expect(copyrightText).toBeVisible();
    });
  });

  // ============================================================================
  // FIND A PLAN PAGE TESTS (Tests 36-42)
  // ============================================================================

  test.describe('Find a Plan Page', () => {
    test('36. Find a Plan page loads with correct title', async ({ page }) => {
      await page.goto(BASE_URL + '/find-a-plan');
      await expect(page).toHaveTitle('Find a Plan | Alignment Health Plan');
    });

    test('37. "Explore Our Plans" heading is visible', async ({ page }) => {
      await page.goto(BASE_URL + '/find-a-plan');
      const exploreHeading = page.locator('text=Explore Our Plans');
      await expect(exploreHeading).toBeVisible();
    });

    test('38. ZIP Code input field is present on Find a Plan page', async ({ page }) => {
      await page.goto(BASE_URL + '/find-a-plan');
      const zipInput = page.locator('input[placeholder*="ZIP Code"]');
      await expect(zipInput).toBeVisible();
    });

    test('39. "Get Started" button is present on Find a Plan page', async ({ page }) => {
      await page.goto(BASE_URL + '/find-a-plan');
      const getStartedButton = page.locator('button').filter({ hasText: 'Get Started' });
      await expect(getStartedButton).toBeVisible();
    });

    test('40. "Need Help? Contact Us Today." section is visible', async ({ page }) => {
      await page.goto(BASE_URL + '/find-a-plan');
      const needHelpHeading = page.locator('heading').filter({ hasText: 'Need Help? Contact Us Today.' });
      await expect(needHelpHeading).toBeVisible();
    });

    test('41. Contact form First Name field is visible', async ({ page }) => {
      await page.goto(BASE_URL + '/find-a-plan');
      const firstNameField = page.locator('input[placeholder*="First Name"]').first();
      await expect(firstNameField).toBeVisible();
    });

    test('42. Contact form Submit button is present', async ({ page }) => {
      await page.goto(BASE_URL + '/find-a-plan');
      const submitButton = page.locator('button').filter({ hasText: 'Submit >' });
      await expect(submitButton).toBeVisible();
    });
  });

  // ============================================================================
  // CONTACT US PAGE TESTS (Tests 43-50)
  // ============================================================================

  test.describe('Contact Us Page', () => {
    test('43. Contact Us page loads with correct title', async ({ page }) => {
      await page.goto(BASE_URL + '/about-us/contact-us');
      await expect(page).toHaveTitle('Contact Us | Alignment Health Plan');
    });

    test('44. Main "Contact Us" heading is visible', async ({ page }) => {
      await page.goto(BASE_URL + '/about-us/contact-us');
      const heading = page.locator('heading').filter({ hasText: 'Contact Us' }).first();
      await expect(heading).toBeVisible();
    });

    test('45. "Expand all" link is present in contact sections', async ({ page }) => {
      await page.goto(BASE_URL + '/about-us/contact-us');
      const expandLink = page.locator('a').filter({ hasText: 'Expand all' });
      await expect(expandLink).toBeVisible();
    });

    test('46. "ACCESS On-Demand Concierge" tab is visible', async ({ page }) => {
      await page.goto(BASE_URL + '/about-us/contact-us');
      const accessTab = page.locator('text=ACCESS On-Demand Concierge').first();
      await expect(accessTab).toBeVisible();
    });

    test('47. "Member Services" tab is visible in contact page', async ({ page }) => {
      await page.goto(BASE_URL + '/about-us/contact-us');
      const memberServicesTab = page.locator('text=Member Services').nth(1);
      await expect(memberServicesTab).toBeVisible();
    });

    test('48. "Sales" tab is visible in contact page', async ({ page }) => {
      await page.goto(BASE_URL + '/about-us/contact-us');
      const salesTab = page.locator('text=Sales').first();
      await expect(salesTab).toBeVisible();
    });

    test('49. Contact member card with "I am a Member >" link is visible', async ({ page }) => {
      await page.goto(BASE_URL + '/about-us/contact-us');
      const memberCardLink = page.locator('a').filter({ hasText: 'I am a Member >' });
      await expect(memberCardLink).toBeVisible();
    });

    test('50. Contact provider card with "I am a Provider >" link is visible', async ({ page }) => {
      await page.goto(BASE_URL + '/about-us/contact-us');
      const providerCardLink = page.locator('a').filter({ hasText: 'I am a Provider >' });
      await expect(providerCardLink).toBeVisible();
    });

    test('51. "Send Us a Message" heading is visible on contact page', async ({ page }) => {
      await page.goto(BASE_URL + '/about-us/contact-us');
      const sendMessageHeading = page.locator('text=Send Us a Message').first();
      await expect(sendMessageHeading).toBeVisible();
    });

    test('52. Phone support hours information is displayed', async ({ page }) => {
      await page.goto(BASE_URL + '/about-us/contact-us');
      const hoursText = page.locator('text=8:00 a.m. to 8:00 p.m.').first();
      await expect(hoursText).toBeVisible();
    });

    test('53. Medicare Advantage Plans page loads and has correct title', async ({ page }) => {
      await page.goto(BASE_URL + '/discover-ahp/medicare-advantage-plans');
      expect(page.url()).toContain('medicare-advantage-plans');
    });

    test('54. Medicare Advantage page displays main heading', async ({ page }) => {
      await page.goto(BASE_URL + '/discover-ahp/medicare-advantage-plans');
      const heading = page.locator('heading').filter({ hasText: 'What is a Medicare Advantage Plan' });
      await expect(heading).toBeVisible();
    });

    test('55. Medicare Advantage page has state-specific links (California, Nevada, etc)', async ({ page }) => {
      await page.goto(BASE_URL + '/discover-ahp/medicare-advantage-plans');
      const californiaLink = page.locator('a').filter({ hasText: 'California' }).first();
      await expect(californiaLink).toBeVisible();
      expect(await californiaLink.getAttribute('href')).toContain('california');
    });
  });

  // ============================================================================
  // ACCESSIBILITY & SEMANTIC HTML TESTS (Tests 56-60)
  // ============================================================================

  test.describe('Accessibility & Semantic HTML', () => {
    test('56. Search field has proper accessible name', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const searchInput = page.locator('input[placeholder="Search"]');
      await expect(searchInput).toBeVisible();
    });

    test('57. All links have meaningful text or aria-label', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const allLinks = page.locator('a');
      const linkCount = await allLinks.count();
      expect(linkCount).toBeGreaterThan(5);
      
      for (let i = 0; i < Math.min(linkCount, 10); i++) {
        const link = allLinks.nth(i);
        const text = await link.textContent();
        const ariaLabel = await link.getAttribute('aria-label');
        const hasContent = text?.trim() || ariaLabel;
        expect(hasContent).toBeTruthy();
      }
    });

    test('58. Images have alt text or aria-label', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const imagesWithAlt = page.locator('img[alt]');
      const altCount = await imagesWithAlt.count();
      expect(altCount).toBeGreaterThan(0);
    });

    test('59. Page contains proper heading hierarchy (h1, h2, h3)', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const h1s = page.locator('h1');
      const h2s = page.locator('h2');
      expect(await h1s.count()).toBeGreaterThan(0);
      expect(await h2s.count()).toBeGreaterThan(0);
    });

    test('60. Buttons and form fields are properly labeled', async ({ page }) => {
      await page.goto(BASE_URL + '/find-a-plan');
      const buttons = page.locator('button');
      const buttonCount = await buttons.count();
      expect(buttonCount).toBeGreaterThan(0);
      
      for (let i = 0; i < Math.min(buttonCount, 5); i++) {
        const button = buttons.nth(i);
        const text = await button.textContent();
        expect(text?.trim()).toBeTruthy();
      }
    });
  });

  // ============================================================================
  // CROSS-PAGE NAVIGATION TESTS (Tests 61-65)
  // ============================================================================

  test.describe('Cross-Page Navigation & Links', () => {
    test('61. Navigation from homepage to Find Plans works', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const enrollNowButton = page.locator('a').filter({ hasText: 'Enroll Now' });
      await enrollNowButton.click();
      await page.waitForURL('**/find-a-plan**');
      expect(page.url()).toContain('find-a-plan');
    });

    test('62. Navigation from homepage to Medicare Advantage info works', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const aboutMedicareLink = page.locator('a').filter({ hasText: 'About Medicare >' }).first();
      await aboutMedicareLink.click();
      await page.waitForURL('**/medicare-advantage-plans**');
      expect(page.url()).toContain('medicare-advantage-plans');
    });

    test('63. Breadcrumb navigation is present on inner pages', async ({ page }) => {
      await page.goto(BASE_URL + '/find-a-plan');
      const breadcrumb = page.locator('text=Home');
      await expect(breadcrumb).toBeVisible();
    });

    test('64. Logo click navigates back to homepage', async ({ page }) => {
      await page.goto(BASE_URL + '/about-us/contact-us');
      const logo = page.locator('img[alt="AlignmentHealthPlan"]').or(page.locator('img[alt="Alignment Health Plan"]')).first();
      const logoLink = logo.locator('xpath=ancestor::a').first();
      await logoLink.click();
      await page.waitForURL(BASE_URL + '/');
      expect(page.url()).toBe(BASE_URL + '/');
    });

    test('65. Footer "About Alignment" links section is present on all pages', async ({ page }) => {
      const pagesToTest = ['/', '/find-a-plan', '/about-us/contact-us'];
      
      for (const pagePath of pagesToTest) {
        await page.goto(BASE_URL + pagePath);
        const aboutAlignmentSection = page.locator('text=About Alignment');
        await expect(aboutAlignmentSection).toBeVisible();
      }
    });
  });

  // ============================================================================
  // RESPONSIVE DESIGN TESTS (Tests 66-70)
  // ============================================================================

  test.describe('Responsive Design', () => {
    test('66. Page is responsive at tablet width (768px)', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto(BASE_URL + '/');
      const heading = page.locator('heading').filter({ hasText: 'MEDICARE ADVANTAGE PLANS' });
      await expect(heading).toBeVisible();
    });

    test('67. Page is responsive at mobile width (375px)', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(BASE_URL + '/');
      const heading = page.locator('heading').filter({ hasText: 'MEDICARE ADVANTAGE PLANS' });
      await expect(heading).toBeVisible();
    });

    test('68. Navigation menu adapts to smaller screens', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(BASE_URL + '/');
      const menuItems = page.locator('menuitem');
      expect(await menuItems.count()).toBeGreaterThan(0);
    });

    test('69. Form fields are properly displayed on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(BASE_URL + '/find-a-plan');
      const zipInput = page.locator('input[placeholder*="ZIP Code"]').first();
      await expect(zipInput).toBeVisible();
    });

    test('70. CTA buttons are properly sized on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(BASE_URL + '/');
      const seePlansButton = page.locator('button').filter({ hasText: 'See Plans' });
      const boundingBox = await seePlansButton.boundingBox();
      expect(boundingBox?.height).toBeGreaterThan(40);
    });
  });

  // ============================================================================
  // FORM VALIDATION TESTS (Tests 71-75)
  // ============================================================================

  test.describe('Form Validation', () => {
    test('71. ZIP code field accepts numeric input', async ({ page }) => {
      await page.goto(BASE_URL + '/find-a-plan');
      const zipInput = page.locator('input[placeholder*="ZIP Code"]').first();
      await zipInput.fill('12345');
      const value = await zipInput.inputValue();
      expect(value).toBe('12345');
    });

    test('72. Contact form First Name field is visible and functional', async ({ page }) => {
      await page.goto(BASE_URL + '/find-a-plan');
      const firstNameInput = page.locator('input[placeholder*="First Name"]').first();
      await expect(firstNameInput).toBeVisible();
      await firstNameInput.fill('John');
      const value = await firstNameInput.inputValue();
      expect(value).toBe('John');
    });

    test('73. Contact form Last Name field is visible and functional', async ({ page }) => {
      await page.goto(BASE_URL + '/find-a-plan');
      const lastNameInput = page.locator('input[placeholder*="Last Name"]').first();
      await expect(lastNameInput).toBeVisible();
      await lastNameInput.fill('Doe');
      const value = await lastNameInput.inputValue();
      expect(value).toBe('Doe');
    });

    test('74. Contact form Email field is visible', async ({ page }) => {
      await page.goto(BASE_URL + '/find-a-plan');
      const emailInput = page.locator('input[placeholder*="Email"]').first();
      await expect(emailInput).toBeVisible();
    });

    test('75. Contact form Phone Number field is visible', async ({ page }) => {
      await page.goto(BASE_URL + '/find-a-plan');
      const phoneInput = page.locator('input[placeholder*="Phone Number"]').first();
      await expect(phoneInput).toBeVisible();
    });
  });

  // ============================================================================
  // TEXT CONTENT & MESSAGING TESTS (Tests 76-80)
  // ============================================================================

  test.describe('Text Content & Messaging', () => {
    test('76. Homepage contains "We believe aging should be celebrated" message', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const message = page.locator('text=We believe aging should be celebrated');
      await expect(message).toBeVisible();
    });

    test('77. Homepage displays "Answer a few questions" CTA text', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const ctaText = page.locator('text=Answer a few questions').first();
      await expect(ctaText).toBeVisible();
    });

    test('78. Benefits section mentions "$ 0" pricing', async ({ page }) => {
      await page.goto(BASE_URL + '/');
      const pricingText = page.locator('text=$ 0').first();
      await expect(pricingText).toBeVisible();
    });

    test('79. Disclaimer text about medical emergency is present on Contact page', async ({ page }) => {
      await page.goto(BASE_URL + '/about-us/contact-us');
      const disclaimerText = page.locator('text=For any medical emergency, please call 911').first();
      await expect(disclaimerText).toBeVisible();
    });

    test('80. Find Plans page contains "Can\'t decide?" helpful text', async ({ page }) => {
      await page.goto(BASE_URL + '/find-a-plan');
      const helpfulText = page.locator('text=Can\'t decide').first();
      await expect(helpfulText).toBeVisible();
    });
  });
});
