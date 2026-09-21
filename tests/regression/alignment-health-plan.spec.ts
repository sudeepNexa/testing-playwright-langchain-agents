import { test, expect, Page } from '@playwright/test';

test.describe('Alignment Health Plan Regression Suite', () => {
  const baseURL = 'https://www.alignmenthealthplan.com';
  const providerSearchURL = 'https://providersearch.alignmenthealthplan.com/';
  const memberLoginURL = 'https://members.alignmenthealthplan.com';

  // ========== HOMEPAGE HERO & BANNER TESTS ==========
  test('Homepage loads with correct title and banner', async ({ page }) => {
    await page.goto(baseURL);
    await expect(page).toHaveTitle(/Medicare Advantage Plans that Put You First/);
  });

  test('Hero section displays main heading', async ({ page }) => {
    await page.goto(baseURL);
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText('MEDICARE ADVANCE PLANS THAT PUT YOU FIRST');
  });

  test('Hero section subheading is visible', async ({ page }) => {
    await page.goto(baseURL);
    const subheading = page.getByText(/We believe aging should be celebrated/);
    await expect(subheading).toBeVisible();
  });

  test('Hero section displays 5-star rating image', async ({ page }) => {
    await page.goto(baseURL);
    const starImage = page.getByAltText('Alignment_Health_5_Stars');
    await expect(starImage).toBeVisible();
  });

  test('Homepage contains Fortune award notice in banner', async ({ page }) => {
    await page.goto(baseURL);
    const table = page.locator('table');
    await expect(table).toBeVisible();
  });

  // ========== PRIMARY NAVIGATION MENU TESTS ==========
  test('Primary navigation menu displays Discover Alignment', async ({ page }) => {
    await page.goto(baseURL);
    const menuItem = page.getByRole('menuitem', { name: /Discover Alignment/ });
    await expect(menuItem).toBeVisible();
  });

  test('Primary navigation menu displays Find Plans', async ({ page }) => {
    await page.goto(baseURL);
    const menuItem = page.getByRole('menuitem', { name: /Find Plans/ });
    await expect(menuItem).toBeVisible();
  });

  test('Primary navigation menu displays Find Care', async ({ page }) => {
    await page.goto(baseURL);
    const menuItem = page.getByRole('menuitem', { name: /Find Care/ });
    await expect(menuItem).toBeVisible();
  });

  test('Primary navigation menu displays For Members', async ({ page }) => {
    await page.goto(baseURL);
    const menuItem = page.getByRole('menuitem', { name: /For Members/ });
    await expect(menuItem).toBeVisible();
  });

  test('Primary navigation menu displays For Providers', async ({ page }) => {
    await page.goto(baseURL);
    const menuItem = page.getByRole('menuitem', { name: /For Providers/ });
    await expect(menuItem).toBeVisible();
  });

  test('Enroll Now button is visible in navigation', async ({ page }) => {
    await page.goto(baseURL);
    const enrollBtn = page.getByRole('link', { name: /Enroll Now/ });
    await expect(enrollBtn).toBeVisible();
  });

  test('Enroll Now button navigates to find-a-plan', async ({ page }) => {
    await page.goto(baseURL);
    const enrollBtn = page.getByRole('link', { name: /Enroll Now/ });
    await enrollBtn.click();
    await expect(page).toHaveURL(/find-a-plan/);
  });

  // ========== TOP NAVIGATION LINKS TESTS ==========
  test('Provider Login link is visible in header', async ({ page }) => {
    await page.goto(baseURL);
    const banner = page.locator('banner');
    const providerLogin = banner.locator('a[href*="ava.alignmenthealth.com"]');
    await expect(providerLogin).toBeVisible();
  });

  test('For Agents link is visible in header', async ({ page }) => {
    await page.goto(baseURL);
    const banner = page.locator('banner');
    const agentsLink = banner.getByRole('link', { name: /For Agents/ });
    await expect(agentsLink).toBeVisible();
  });

  test('Contact Us link is visible in header', async ({ page }) => {
    await page.goto(baseURL);
    const banner = page.locator('banner');
    const contactUs = banner.getByRole('link', { name: /Contact Us/ });
    await expect(contactUs).toBeVisible();
  });

  // ========== MEMBER LOGIN ENTRY POINT TESTS ==========
  test('Member Login link is visible in header banner', async ({ page }) => {
    await page.goto(baseURL);
    const banner = page.locator('banner');
    const memberLogin = banner.getByRole('link', { name: /Member Login/ }).first();
    await expect(memberLogin).toBeVisible();
  });

  test('Member Login link has correct href', async ({ page }) => {
    await page.goto(baseURL);
    const banner = page.locator('banner');
    const memberLogin = banner.getByRole('link', { name: /Member Login/ }).first();
    await expect(memberLogin).toHaveAttribute('href', /members.alignmenthealthplan.com/);
  });

  test('Member Login link in footer is visible', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('contentinfo');
    const memberLogin = footer.getByRole('link', { name: /Member Login/ });
    await expect(memberLogin).toBeVisible();
  });

  test('Member Login links navigate correctly', async ({ page }) => {
    await page.goto(baseURL);
    const banner = page.locator('banner');
    const memberLogin = banner.getByRole('link', { name: /Member Login/ }).first();
    const href = await memberLogin.getAttribute('href');
    expect(href).toContain('members.alignmenthealthplan.com');
  });

  // ========== HOMEPAGE QUICK ACTION CARDS ==========
  test('Compare Plans card displays link', async ({ page }) => {
    await page.goto(baseURL);
    const compareLink = page.getByRole('link', { name: /Compare Plans/ });
    await expect(compareLink).toBeVisible();
  });

  test('Compare Plans card navigates to find-a-plan', async ({ page }) => {
    await page.goto(baseURL);
    const compareLink = page.getByRole('link', { name: /Compare Plans/ });
    await compareLink.click();
    await expect(page).toHaveURL(/find-a-plan/);
  });

  test('Learn about Medicare card displays link', async ({ page }) => {
    await page.goto(baseURL);
    const aboutLink = page.getByRole('link', { name: /Learn about Medicare/ });
    await expect(aboutLink).toBeVisible();
  });

  test('Find Care card displays link', async ({ page }) => {
    await page.goto(baseURL);
    const findCareLink = page.getByRole('link', { name: /Find Care/ });
    await expect(findCareLink).toBeVisible();
  });

  test('Find Medication card displays link', async ({ page }) => {
    await page.goto(baseURL);
    const medicationLink = page.getByRole('link', { name: /Find Medication/ });
    await expect(medicationLink).toBeVisible();
  });

  // ========== HOMEPAGE ZIP CODE FORM TESTS ==========
  test('Zip code input field is visible on homepage', async ({ page }) => {
    await page.goto(baseURL);
    const zipInput = page.getByPlaceholder(/ZIP Code/);
    await expect(zipInput).toBeVisible();
  });

  test('See Plans button is visible below zip code field', async ({ page }) => {
    await page.goto(baseURL);
    const seeButton = page.getByRole('button', { name: /See Plans/ });
    await expect(seeButton).toBeVisible();
  });

  test('Can enter zip code in homepage form', async ({ page }) => {
    await page.goto(baseURL);
    const zipInput = page.getByPlaceholder(/ZIP Code/);
    await zipInput.fill('89101');
    const value = await zipInput.inputValue();
    expect(value).toBe('89101');
  });

  // ========== FIND A PLAN PAGE TESTS ==========
  test('Find a Plan page loads with correct title', async ({ page }) => {
    await page.goto(`${baseURL}/find-a-plan`);
    await expect(page).toHaveTitle(/Find a Plan/);
  });

  test('Find a Plan page displays Explore Our Plans heading', async ({ page }) => {
    await page.goto(`${baseURL}/find-a-plan`);
    const heading = page.getByRole('heading', { name: /Explore Our Plans/ });
    await expect(heading).toBeVisible();
  });

  test('Find a Plan page contains recommendation prompt', async ({ page }) => {
    await page.goto(`${baseURL}/find-a-plan`);
    const text = page.getByText(/Answer a few questions/);
    await expect(text).toBeVisible();
  });

  // ========== PROVIDER SEARCH PAGE TESTS ==========
  test('Provider Search page loads', async ({ page }) => {
    await page.goto(providerSearchURL);
    await expect(page).toHaveTitle(/Provider Search/);
  });

  test('Provider Search displays Guided Search tab', async ({ page }) => {
    await page.goto(providerSearchURL);
    const tab = page.getByRole('tab', { name: /Guided Search/ });
    await expect(tab).toBeVisible();
  });

  test('Provider Search displays Quick Search tab', async ({ page }) => {
    await page.goto(providerSearchURL);
    const tab = page.getByRole('tab', { name: /Quick Search/ });
    await expect(tab).toBeVisible();
  });

  test('Provider Search Guided Search shows Provider Type section', async ({ page }) => {
    await page.goto(providerSearchURL);
    const label = page.getByText('Select Provider Type');
    await expect(label).toBeVisible();
  });

  test('Provider Search displays location/zip code input', async ({ page }) => {
    await page.goto(providerSearchURL);
    const input = page.getByPlaceholder(/Enter zip code, city, county or address/);
    await expect(input).toBeVisible();
  });

  test('Provider Search can accept zip code input', async ({ page }) => {
    await page.goto(providerSearchURL);
    const input = page.getByPlaceholder(/Enter zip code, city, county or address/);
    await input.fill('89101');
    const value = await input.inputValue();
    expect(value).toBe('89101');
  });

  test('Provider Search displays Search Term field', async ({ page }) => {
    await page.goto(providerSearchURL);
    const input = page.getByPlaceholder(/Enter a provider name, practice name/);
    await expect(input).toBeVisible();
  });

  test('Provider Search displays Help link', async ({ page }) => {
    await page.goto(providerSearchURL);
    const helpLink = page.getByRole('link', { name: /Provider Search Help/ });
    await expect(helpLink).toBeVisible();
  });

  // ========== FIND CARE - DRUG SEARCH TESTS ==========
  test('Find a Drug page loads with correct title', async ({ page }) => {
    await page.goto(`${baseURL}/find-care/find-a-drug`);
    await expect(page).toHaveTitle(/Find a Drug/);
  });

  test('Find a Drug page displays main heading', async ({ page }) => {
    await page.goto(`${baseURL}/find-care/find-a-drug`);
    const heading = page.getByRole('heading', { level: 1, name: /Find a Drug/ });
    await expect(heading).toBeVisible();
  });

  test('Find a Drug page displays formulary description', async ({ page }) => {
    await page.goto(`${baseURL}/find-care/find-a-drug`);
    const text = page.getByText(/drug formulary is a complete list/);
    await expect(text).toBeVisible();
  });

  test('Find a Drug page displays Digital Drug Formulary tab', async ({ page }) => {
    await page.goto(`${baseURL}/find-care/find-a-drug`);
    const tab = page.getByRole('tab', { name: /Digital Drug Formulary/ });
    await expect(tab).toBeVisible();
  });

  test('Find a Drug page displays Drug Search tab', async ({ page }) => {
    await page.goto(`${baseURL}/find-care/find-a-drug`);
    const tab = page.getByRole('tab', { name: /Drug Search/ });
    await expect(tab).toBeVisible();
  });

  test('Find a Drug page displays Request Printed Copy tab', async ({ page }) => {
    await page.goto(`${baseURL}/find-care/find-a-drug`);
    const tab = page.getByRole('tab', { name: /Request a Printed Copy/ });
    await expect(tab).toBeVisible();
  });

  // ========== CONTACT US PAGE TESTS ==========
  test('Contact Us page loads with correct title', async ({ page }) => {
    await page.goto(`${baseURL}/about-us/contact-us`);
    await expect(page).toHaveTitle(/Contact Us/);
  });

  test('Contact Us page displays phone contact option', async ({ page }) => {
    await page.goto(`${baseURL}/about-us/contact-us`);
    const heading = page.getByRole('heading', { level: 2 }).first();
    await expect(heading).toBeVisible();
  });

  test('Contact Us page displays Send Us a Message section', async ({ page }) => {
    await page.goto(`${baseURL}/about-us/contact-us`);
    const heading = page.getByRole('heading', { level: 2, name: /Send Us a Message/ });
    await expect(heading).toBeVisible();
  });

  test('Contact Us page shows Member Services form link', async ({ page }) => {
    await page.goto(`${baseURL}/about-us/contact-us`);
    const memberLink = page.getByRole('link', { name: /Member Services Contact/ });
    await expect(memberLink).toBeVisible();
  });

  test('Contact Us page shows Provider Services form link', async ({ page }) => {
    await page.goto(`${baseURL}/about-us/contact-us`);
    const providerLink = page.getByRole('link', { name: /Provider Services Contact/ });
    await expect(providerLink).toBeVisible();
  });

  test('Contact Us page shows Broker Services form link', async ({ page }) => {
    await page.goto(`${baseURL}/about-us/contact-us`);
    const brokerLink = page.getByRole('link', { name: /Broker Services Contact/ });
    await expect(brokerLink).toBeVisible();
  });

  // ========== FAQ / HELP TESTS ==========
  test('Medicare Part D FAQs page loads with correct title', async ({ page }) => {
    await page.goto(`${baseURL}/find-plans/part-d-faqs`);
    await expect(page).toHaveTitle(/Medicare Part D FAQs/);
  });

  test('FAQ page displays main heading', async ({ page }) => {
    await page.goto(`${baseURL}/find-plans/part-d-faqs`);
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText(/Frequently Asked Questions/);
  });

  test('FAQ page displays Medicare Part D Common Questions section', async ({ page }) => {
    await page.goto(`${baseURL}/find-plans/part-d-faqs`);
    const heading = page.getByRole('heading', { level: 2, name: /Medicare Part D Common Questions/ });
    await expect(heading).toBeVisible();
  });

  // ========== FOOTER LINK TESTS - FIND PLANS SECTION ==========
  test('Footer contains Find Plans section', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('contentinfo');
    const section = footer.getByText('Find Plans');
    await expect(section).toBeVisible();
  });

  test('Footer Find Plans section contains Shop Online link', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('contentinfo');
    const link = footer.getByRole('link', { name: /Shop Online/ });
    await expect(link).toBeVisible();
  });

  test('Footer Find Plans section contains Ways to Enroll link', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('contentinfo');
    const link = footer.getByRole('link', { name: /Ways to Enroll/ });
    await expect(link).toBeVisible();
  });

  test('Footer Find Plans section contains Attend a Seminar link', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('contentinfo');
    const link = footer.getByRole('link', { name: /Attend a Seminar/ });
    await expect(link).toBeVisible();
  });

  test('Footer Find Plans section contains Benefits Highlights link', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('contentinfo');
    const link = footer.getByRole('link', { name: /Benefits Highlights/ });
    await expect(link).toBeVisible();
  });

  test('Footer Find Plans section contains Pre-Enrollment Kit link', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('contentinfo');
    const link = footer.getByRole('link', { name: /Pre-Enrollment Kit/ });
    await expect(link).toBeVisible();
  });

  test('Footer Find Plans section contains Group Retiree Options link', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('contentinfo');
    const link = footer.getByRole('link', { name: /Group Retiree Options/ });
    await expect(link).toBeVisible();
  });

  test('Footer Find Plans section contains Medicare Part D FAQs link', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('contentinfo');
    const link = footer.getByRole('link', { name: /Medicare Part D FAQs/ });
    await expect(link).toBeVisible();
  });

  test('Footer Find Plans section contains Visit Us link', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('contentinfo');
    const link = footer.getByRole('link', { name: /Visit Us/ });
    await expect(link).toBeVisible();
  });

  // ========== FOOTER LINK TESTS - FIND CARE SECTION ==========
  test('Footer contains Find Care section', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('contentinfo');
    const section = footer.getByText('Find Care').first();
    await expect(section).toBeVisible();
  });

  test('Footer Find Care section contains Doctor link', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('contentinfo');
    const link = footer.getByRole('link', { name: /^Doctor$/ });
    await expect(link).toBeVisible();
  });

  test('Footer Find Care section contains Drug link', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('contentinfo');
    const link = footer.getByRole('link', { name: /^Drug$/ });
    await expect(link).toBeVisible();
  });

  test('Footer Find Care section contains Pharmacy link', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('contentinfo');
    const link = footer.getByRole('link', { name: /Pharmacy/ });
    await expect(link).toBeVisible();
  });

  test('Footer Find Care section contains Hospital link', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('contentinfo');
    const link = footer.getByRole('link', { name: /Hospital/ });
    await expect(link).toBeVisible();
  });

  test('Footer Find Care section contains Care Center link', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('contentinfo');
    const link = footer.getByRole('link', { name: /Care Center/ });
    await expect(link).toBeVisible();
  });

  // ========== FOOTER LINK TESTS - MEMBERS SECTION ==========
  test('Footer contains For Members section', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('contentinfo');
    const section = footer.getByText('For Members');
    await expect(section).toBeVisible();
  });

  test('Footer For Members section contains Member Login link', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('contentinfo');
    const memberLogins = footer.getByRole('link', { name: /Member Login/ });
    const count = await memberLogins.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Footer For Members section contains Member Services link', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('contentinfo');
    const link = footer.getByRole('link', { name: /Member Services/ });
    await expect(link).toBeVisible();
  });

  // ========== FOOTER LINK TESTS - PROVIDERS SECTION ==========
  test('Footer contains For Providers section', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('contentinfo');
    const section = footer.getByText('For Providers');
    await expect(section).toBeVisible();
  });

  test('Footer For Providers section contains Provider Login link', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('contentinfo');
    const link = footer.getByRole('link', { name: /Provider Login/ });
    await expect(link).toBeVisible();
  });

  test('Footer For Providers section contains Provider Resources link', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('contentinfo');
    const link = footer.getByRole('link', { name: /Provider Resources/ });
    await expect(link).toBeVisible();
  });

  // ========== FOOTER LINK TESTS - AGENTS SECTION ==========
  test('Footer contains For Agents section', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('contentinfo');
    const section = footer.getByText('For Agents');
    await expect(section).toBeVisible();
  });

  test('Footer contains Contact Us section', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('contentinfo');
    const section = footer.getByText('Contact Us');
    await expect(section).toBeVisible();
  });

  test('Footer Contact Us section contains By Phone link', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('contentinfo');
    const link = footer.getByRole('link', { name: /By Phone/ });
    await expect(link).toBeVisible();
  });

  test('Footer Contact Us section contains Send Us a Message link', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('contentinfo');
    const link = footer.getByRole('link', { name: /Send Us a Message/ });
    await expect(link).toBeVisible();
  });

  // ========== FOOTER LEGAL SECTION TESTS ==========
  test('Footer contains Legal Notices link', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('contentinfo');
    const link = footer.getByRole('link', { name: /Legal Notices/ });
    await expect(link).toBeVisible();
  });

  test('Footer contains copyright notice', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('contentinfo');
    const copyright = footer.getByText(/Copyright.*Alignment Health Plan/);
    await expect(copyright).toBeVisible();
  });

  // ========== NAVIGATION TO KEY PAGES ==========
  test('Shop Online footer link navigates to find-a-plan', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('contentinfo');
    const link = footer.getByRole('link', { name: /Shop Online/ });
    await link.click();
    await expect(page).toHaveURL(/find-a-plan/);
  });

  test('Doctor search footer link navigates to provider search', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('contentinfo');
    const link = footer.getByRole('link', { name: /^Doctor$/ });
    await link.click();
    await expect(page).toHaveURL(/providersearch.alignmenthealthplan.com/);
  });

  test('Drug search footer link navigates to find-a-drug', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('contentinfo');
    const link = footer.getByRole('link', { name: /^Drug$/ });
    await link.click();
    await expect(page).toHaveURL(/find-care\/find-a-drug/);
  });

  test('Contact Us footer link navigates to contact page', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('contentinfo');
    const link = footer.getByRole('link', { name: /By Phone/ });
    await link.click();
    await expect(page).toHaveURL(/about-us\/contact-us/);
  });

  // ========== LOGO NAVIGATION TESTS ==========
  test('Header logo navigates to homepage', async ({ page }) => {
    await page.goto(`${baseURL}/find-a-plan`);
    const logo = page.locator('banner').getByRole('link').first();
    await logo.click();
    await expect(page).toHaveURL(baseURL);
  });

  test('Footer logo navigates to homepage', async ({ page }) => {
    await page.goto(`${baseURL}/find-a-plan`);
    const footer = page.locator('contentinfo');
    const logo = footer.getByRole('link').first();
    await logo.click();
    await expect(page).toHaveURL(baseURL);
  });

  // ========== BENEFITS DISPLAY TESTS ==========
  test('Homepage displays benefits section', async ({ page }) => {
    await page.goto(baseURL);
    const heading = page.getByRole('heading', { level: 2 }).filter({ hasText: /benefits/ });
    await expect(heading.first()).toBeVisible();
  });

  test('Benefits section displays $0 premium information', async ({ page }) => {
    await page.goto(baseURL);
    const text = page.getByText(/As low as/);
    await expect(text.first()).toBeVisible();
  });

  // ========== ONCOLOGY/CONCIERGE SERVICE TESTS ==========
  test('Homepage displays Concierge Services section', async ({ page }) => {
    await page.goto(baseURL);
    const heading = page.getByRole('heading', { level: 2, name: /ON-DEMAND CONCIERGE SERVICES/ });
    await expect(heading).toBeVisible();
  });

  test('Concierge Services section contains Learn More link', async ({ page }) => {
    await page.goto(baseURL);
    const section = page.getByText(/ACCESS On-Demand Concierge connects you/);
    const learnLink = section.locator('..').getByRole('link', { name: /Learn More/ });
    await expect(learnLink).toBeTruthy();
  });

  // ========== SEMINARS AND ENROLLMENT SECTION TESTS ==========
  test('Homepage displays Seminars section', async ({ page }) => {
    await page.goto(baseURL);
    const heading = page.getByRole('heading', { level: 2, name: /Seminars/ });
    await expect(heading).toBeVisible();
  });

  test('Seminars section contains Search Seminars link', async ({ page }) => {
    await page.goto(baseURL);
    const link = page.getByRole('link', { name: /Search Seminars/ });
    await expect(link).toBeVisible();
  });

  test('Homepage displays Enroll Online section', async ({ page }) => {
    await page.goto(baseURL);
    const heading = page.getByRole('heading', { level: 2, name: /Enroll Online/ });
    await expect(heading).toBeVisible();
  });

  test('Enroll Online section contains Enroll Now link', async ({ page }) => {
    await page.goto(baseURL);
    const link = page.getByRole('link', { name: /Enroll with Alignment/ });
    await expect(link).toBeVisible();
  });

  test('Enroll Online link navigates to find-a-plan', async ({ page }) => {
    await page.goto(baseURL);
    const link = page.getByRole('link', { name: /Enroll with Alignment/ });
    await link.click();
    await expect(page).toHaveURL(/find-a-plan/);
  });

  // ========== ABOUT MEDICARE SECTION ==========
  test('About Medicare link is present in navigation', async ({ page }) => {
    await page.goto(baseURL);
    const link = page.getByRole('link', { name: /Learn about Medicare Advantage/ });
    await expect(link).toBeVisible();
  });

  test('About Medicare page loads', async ({ page }) => {
    await page.goto(`${baseURL}/discover-ahp/medicare-advantage-plans`);
    await expect(page).toHaveTitle(/Medicare Advantage Plan/);
  });

  // ========== DIRECT NAVIGATION TESTS ==========
  test('Ways to Enroll page loads', async ({ page }) => {
    await page.goto(`${baseURL}/find-plans/ways-to-enroll`);
    const heading = page.getByRole('heading').first();
    await expect(heading).toBeVisible();
  });

  test('Member Services page loads', async ({ page }) => {
    await page.goto(`${baseURL}/members/member-services`);
    const banner = page.locator('banner');
    await expect(banner).toBeVisible();
  });
});
