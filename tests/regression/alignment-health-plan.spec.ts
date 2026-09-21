import { test, expect, Page } from '@playwright/test';

const baseURL = 'https://www.alignmenthealthplan.com';

test.describe('Alignment Health Plan - Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto(baseURL);
    expect(page.url()).toBe(baseURL + '/');
    expect(page).toHaveTitle(/Medicare Advantage Plans/);
  });

  test('should display main hero section with heading', async ({ page }) => {
    await page.goto(baseURL);
    const heading = page.locator('h1:has-text("MEDICARE ADVANTAGE PLANS")');
    await expect(heading).toBeVisible();
  });

  test('should display hero text content', async ({ page }) => {
    await page.goto(baseURL);
    const heroText = page.locator('text=We believe aging should be celebrated');
    await expect(heroText).toBeVisible();
  });

  test('should display hero image', async ({ page }) => {
    await page.goto(baseURL);
    const heroImage = page.locator('img[alt*="5_Stars"]');
    await expect(heroImage).toBeVisible();
  });

  test('should display zip code input field in hero', async ({ page }) => {
    await page.goto(baseURL);
    const zipInput = page.locator('input[placeholder*="ZIP Code"]');
    await expect(zipInput).toBeVisible();
  });

  test('should display See Plans button in hero', async ({ page }) => {
    await page.goto(baseURL);
    const button = page.locator('button:has-text("See Plans >")');
    await expect(button).toBeVisible();
  });

  test('should show validation error when submitting empty zip code', async ({ page }) => {
    await page.goto(baseURL);
    const button = page.locator('button:has-text("See Plans >")');
    page.on('dialog', dialog => dialog.accept());
    await button.click();
  });

  test('should navigate to plans page with valid zip code', async ({ page }) => {
    await page.goto(baseURL);
    await page.locator('input[placeholder*="ZIP Code"]').fill('89014');
    await page.locator('button:has-text("See Plans >")').click();
    await page.waitForURL('**/find-a-plan/**');
    expect(page.url()).toContain('find-a-plan');
  });

  test('should display Fortune award banner', async ({ page }) => {
    await page.goto(baseURL);
    const banner = page.locator('text=World\'s Most Admired Companies');
    await expect(banner).toBeVisible();
  });

  test('should display "How Can We Help You Today?" section', async ({ page }) => {
    await page.goto(baseURL);
    const section = page.locator('h2:has-text("How Can We Help You Today")');
    await expect(section).toBeVisible();
  });

  test('should display Compare Plans card', async ({ page }) => {
    await page.goto(baseURL);
    const card = page.locator('text=Compare Medicare Advantage Plans');
    await expect(card).toBeVisible();
  });

  test('should display Learn about Medicare card', async ({ page }) => {
    await page.goto(baseURL);
    const card = page.locator('text=Learn about Medicare Advantage');
    await expect(card).toBeVisible();
  });

  test('should display Find Care card', async ({ page }) => {
    await page.goto(baseURL);
    const card = page.locator('text=Find a provider that suits you');
    await expect(card).toBeVisible();
  });

  test('should display Find Medication card', async ({ page }) => {
    await page.goto(baseURL);
    const card = page.locator('text=Find medication that is covered');
    await expect(card).toBeVisible();
  });

  test('should display ON-DEMAND CONCIERGE SERVICES section', async ({ page }) => {
    await page.goto(baseURL);
    const section = page.locator('h2:has-text("ON-DEMAND CONCIERGE SERVICES")');
    await expect(section).toBeVisible();
  });

  test('should display benefits section with pricing', async ({ page }) => {
    await page.goto(baseURL);
    const heading = page.locator('text=benefits');
    await expect(heading).toBeVisible();
  });

  test('should display zero premium highlight', async ({ page }) => {
    await page.goto(baseURL);
    const premium = page.locator('text=$ 0').first();
    await expect(premium).toBeVisible();
  });

  test('should display Let\'s Make Plans section', async ({ page }) => {
    await page.goto(baseURL);
    const section = page.locator('h2:has-text("Let\'s Make Plans")');
    await expect(section).toBeVisible();
  });

  test('should display phone number in Let\'s Make Plans', async ({ page }) => {
    await page.goto(baseURL);
    const phone = page.locator('a:has-text("1-888-293-8272")').first();
    await expect(phone).toBeVisible();
  });

  test('should display Seminars link in Let\'s Make Plans', async ({ page }) => {
    await page.goto(baseURL);
    const link = page.locator('text=Search Seminars >');
    await expect(link).toBeVisible();
  });

  test('should display Enroll Online link in Let\'s Make Plans', async ({ page }) => {
    await page.goto(baseURL);
    const link = page.locator('text=Enroll Now >').last();
    await expect(link).toBeVisible();
  });
});

test.describe('Alignment Health Plan - Navigation', () => {
  test('should display top navigation menu', async ({ page }) => {
    await page.goto(baseURL);
    const menubar = page.locator('[role="menubar"]');
    await expect(menubar).toBeVisible();
  });

  test('should display Member Login link in header', async ({ page }) => {
    await page.goto(baseURL);
    const link = page.locator('a:has-text("Member Login")').first();
    await expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', 'https://members.alignmenthealthplan.com');
  });

  test('should display Provider Login link in header', async ({ page }) => {
    await page.goto(baseURL);
    const link = page.locator('a:has-text("Provider Login")').first();
    await expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', 'https://ava.alignmenthealth.com');
  });

  test('should display For Agents link in header', async ({ page }) => {
    await page.goto(baseURL);
    const link = page.locator('a:has-text("For Agents")').first();
    await expect(link).toBeVisible();
  });

  test('should display Contact Us link in header', async ({ page }) => {
    await page.goto(baseURL);
    const link = page.locator('a:has-text("Contact Us")').first();
    await expect(link).toBeVisible();
  });

  test('should display Discover Alignment menu item', async ({ page }) => {
    await page.goto(baseURL);
    const menuItem = page.locator('[role="menuitem"]:has-text("Discover Alignment")');
    await expect(menuItem).toBeVisible();
  });

  test('should display Find Plans menu item', async ({ page }) => {
    await page.goto(baseURL);
    const menuItem = page.locator('[role="menuitem"]:has-text("Find Plans")');
    await expect(menuItem).toBeVisible();
  });

  test('should display Find Care menu item', async ({ page }) => {
    await page.goto(baseURL);
    const menuItem = page.locator('[role="menuitem"]:has-text("Find Care")');
    await expect(menuItem).toBeVisible();
  });

  test('should display logo link to homepage', async ({ page }) => {
    await page.goto(baseURL);
    const logo = page.locator('img[alt*="AlignmentHealthPlan"]').first();
    await expect(logo).toBeVisible();
  });

  test('should display Enroll Now button in header navigation', async ({ page }) => {
    await page.goto(baseURL);
    const button = page.locator('a:has-text("Enroll Now")');
    await expect(button).toBeVisible();
  });
});

test.describe('Alignment Health Plan - Footer', () => {
  test('should display footer', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('footer').first();
    await expect(footer).toBeVisible();
  });

  test('should display Find Plans section in footer', async ({ page }) => {
    await page.goto(baseURL);
    const section = page.locator('footer').locator('text=Find Plans');
    await expect(section).toBeVisible();
  });

  test('should display Shop Online link in footer', async ({ page }) => {
    await page.goto(baseURL);
    const link = page.locator('footer a:has-text("Shop Online")');
    await expect(link).toBeVisible();
  });

  test('should display Ways to Enroll link in footer', async ({ page }) => {
    await page.goto(baseURL);
    const link = page.locator('footer a:has-text("Ways to Enroll")');
    await expect(link).toBeVisible();
  });

  test('should display Doctor link in footer', async ({ page }) => {
    await page.goto(baseURL);
    const link = page.locator('footer a:has-text("Doctor")');
    await expect(link).toBeVisible();
  });

  test('should display Member Login in footer', async ({ page }) => {
    await page.goto(baseURL);
    const link = page.locator('footer a:has-text("Member Login")');
    await expect(link).toBeVisible();
  });

  test('should display copyright text in footer', async ({ page }) => {
    await page.goto(baseURL);
    const copyright = page.locator('text=© Copyright 2026 Alignment Health Plan');
    await expect(copyright).toBeVisible();
  });

  test('should display Legal Notices link in footer', async ({ page }) => {
    await page.goto(baseURL);
    const link = page.locator('footer a:has-text("Legal Notices")');
    await expect(link).toBeVisible();
  });

  test('should display Privacy Notices link in footer', async ({ page }) => {
    await page.goto(baseURL);
    const link = page.locator('footer a:has-text("Privacy Notices")');
    await expect(link).toBeVisible();
  });

  test('should display Terms of Use link in footer', async ({ page }) => {
    await page.goto(baseURL);
    const link = page.locator('footer a:has-text("Terms of Use")');
    await expect(link).toBeVisible();
  });
});

test.describe('Alignment Health Plan - Plans Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
    await page.locator('input[placeholder*="ZIP Code"]').fill('89014');
    await page.locator('button:has-text("See Plans >")').click();
    await page.waitForURL('**/find-a-plan/**');
  });

  test('should load plans page successfully', async ({ page }) => {
    expect(page.url()).toContain('find-a-plan');
    expect(page).toHaveTitle(/Find a Plan/);
  });

  test('should display plans heading', async ({ page }) => {
    const heading = page.locator('h3:has-text("Plans in your area")');
    await expect(heading).toBeVisible();
  });

  test('should display plan filter section', async ({ page }) => {
    const filterHeading = page.locator('h4:has-text("Filter by")');
    await expect(filterHeading).toBeVisible();
  });

  test('should display Plan Type filter with HMO checkbox', async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]').filter({ hasText: 'HMO' }).first();
    await expect(checkbox).toBeVisible();
  });

  test('should display Plan Type filter with PPO checkbox', async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]').filter({ hasText: 'PPO' });
    await expect(checkbox.first()).toBeVisible();
  });

  test('should display Additional Benefits filter section', async ({ page }) => {
    const filterHeading = page.locator('h4:has-text("Additional Benefits")');
    await expect(filterHeading).toBeVisible();
  });

  test('should display FLEX Allowance filter option', async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]').filter({ hasText: 'FLEX Allowance' });
    await expect(checkbox.first()).toBeVisible();
  });

  test('should display Transportation filter option', async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]').filter({ hasText: 'Transportation' });
    await expect(checkbox.first()).toBeVisible();
  });

  test('should display Clear filters button', async ({ page }) => {
    const button = page.locator('button:has-text("Clear filters")');
    await expect(button).toBeVisible();
  });

  test('should display Sort by dropdown', async ({ page }) => {
    const dropdown = page.locator('select, [role="combobox"]').filter({ hasText: 'Sort by' });
    await expect(dropdown.first()).toBeVisible();
  });

  test('should display plan cards with details', async ({ page }) => {
    const planCard = page.locator('h3').filter({ hasText: 'HMO' }).first();
    await expect(planCard).toBeVisible();
  });

  test('should display monthly premium in plan card', async ({ page }) => {
    const premium = page.locator('text=$0').filter({ hasText: 'Monthly Premium' }).first();
    await expect(premium).toBeVisible();
  });

  test('should display maximum out-of-pocket in plan card', async ({ page }) => {
    const maxOOP = page.locator('text=Maximum Out-of-Pocket').first();
    await expect(maxOOP).toBeVisible();
  });

  test('should display PCP Copay in plan card', async ({ page }) => {
    const copay = page.locator('text=PCP Copay').first();
    await expect(copay).toBeVisible();
  });

  test('should display Benefits At-a-Glance section in plan card', async ({ page }) => {
    const benefits = page.locator('h3:has-text("Benefits At-a-Glance")').first();
    await expect(benefits).toBeVisible();
  });

  test('should display Vision benefit in plan card', async ({ page }) => {
    const vision = page.locator('text=Vision').first();
    await expect(vision).toBeVisible();
  });

  test('should display Dental benefit in plan card', async ({ page }) => {
    const dental = page.locator('text=Dental').first();
    await expect(dental).toBeVisible();
  });

  test('should display Prescription benefit in plan card', async ({ page }) => {
    const prescription = page.locator('text=Prescription').first();
    await expect(prescription).toBeVisible();
  });

  test('should display Enroll button in plan card', async ({ page }) => {
    const enrollButton = page.locator('button:has-text("Enroll")').first();
    await expect(enrollButton).toBeVisible();
  });

  test('should display View Details link in plan card', async ({ page }) => {
    const detailsLink = page.locator('a:has-text("View Details")').first();
    await expect(detailsLink).toBeVisible();
  });

  test('should display Compare checkbox in plan card', async ({ page }) => {
    const compareCheckbox = page.locator('input[type="checkbox"]').filter({ hasText: 'Compare' }).first();
    await expect(compareCheckbox).toBeVisible();
  });

  test('should display "Get Recommendations" link', async ({ page }) => {
    const link = page.locator('a:has-text("Get Recommendations")');
    await expect(link).toBeVisible();
  });

  test('should display location info (Clark County, NV)', async ({ page }) => {
    const location = page.locator('text=Clark County, NV');
    await expect(location).toBeVisible();
  });

  test('should display Print button', async ({ page }) => {
    const printButton = page.locator('button:has-text("Print")');
    await expect(printButton).toBeVisible();
  });

  test('should display "Can\'t decide on a plan?" text', async ({ page }) => {
    const text = page.locator('text=Can\'t decide on a plan');
    await expect(text).toBeVisible();
  });
});

test.describe('Alignment Health Plan - Provider Search', () => {
  test('should load provider search page successfully', async ({ page }) => {
    await page.goto('https://providersearch.alignmenthealthplan.com/');
    expect(page.url()).toContain('providersearch');
    expect(page).toHaveTitle(/Provider Search/);
  });

  test('should display main search container', async ({ page }) => {
    await page.goto('https://providersearch.alignmenthealthplan.com/');
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should display search tabs', async ({ page }) => {
    await page.goto('https://providersearch.alignmenthealthplan.com/');
    const tablist = page.locator('[role="tablist"]').filter({ hasText: 'Search tabs' });
    await expect(tablist).toBeVisible();
  });
});

test.describe('Alignment Health Plan - Contact Us Page', () => {
  test('should load contact us page successfully', async ({ page }) => {
    await page.goto(baseURL + '/about-us/contact-us');
    expect(page.url()).toContain('contact-us');
    expect(page).toHaveTitle(/Contact Us/);
  });

  test('should display Contact Us heading', async ({ page }) => {
    await page.goto(baseURL + '/about-us/contact-us');
    const heading = page.locator('h1:has-text("Contact Us")');
    await expect(heading).toBeVisible();
  });

  test('should display need help text', async ({ page }) => {
    await page.goto(baseURL + '/about-us/contact-us');
    const text = page.locator('h4:has-text("Need help")');
    await expect(text).toBeVisible();
  });

  test('should display Expand all link', async ({ page }) => {
    await page.goto(baseURL + '/about-us/contact-us');
    const link = page.locator('a:has-text("Expand all")');
    await expect(link).toBeVisible();
  });

  test('should display Collapse all link', async ({ page }) => {
    await page.goto(baseURL + '/about-us/contact-us');
    const link = page.locator('a:has-text("Collapse all")');
    await expect(link).toBeVisible();
  });

  test('should display ACCESS On-Demand Concierge tab', async ({ page }) => {
    await page.goto(baseURL + '/about-us/contact-us');
    const tab = page.locator('text=ACCESS On-Demand Concierge').first();
    await expect(tab).toBeVisible();
  });

  test('should display Member Services tab', async ({ page }) => {
    await page.goto(baseURL + '/about-us/contact-us');
    const tab = page.locator('text=Member Services').first();
    await expect(tab).toBeVisible();
  });

  test('should display Sales tab', async ({ page }) => {
    await page.goto(baseURL + '/about-us/contact-us');
    const tab = page.locator('text=Sales').first();
    await expect(tab).toBeVisible();
  });

  test('should display Pharmacy Help Desk tab', async ({ page }) => {
    await page.goto(baseURL + '/about-us/contact-us');
    const tab = page.locator('text=Pharmacy Help Desk').first();
    await expect(tab).toBeVisible();
  });

  test('should display Transportation Scheduling tab', async ({ page }) => {
    await page.goto(baseURL + '/about-us/contact-us');
    const tab = page.locator('text=Transportation Scheduling').first();
    await expect(tab).toBeVisible();
  });

  test('should display Send Us a Message section', async ({ page }) => {
    await page.goto(baseURL + '/about-us/contact-us');
    const heading = page.locator('text=Send Us a Message');
    await expect(heading).toBeVisible();
  });

  test('should display Member Services contact card', async ({ page }) => {
    await page.goto(baseURL + '/about-us/contact-us');
    const card = page.locator('text=I am a Member');
    await expect(card).toBeVisible();
  });

  test('should display Provider Services contact card', async ({ page }) => {
    await page.goto(baseURL + '/about-us/contact-us');
    const card = page.locator('text=I am a Provider');
    await expect(card).toBeVisible();
  });

  test('should display Broker Services contact card', async ({ page }) => {
    await page.goto(baseURL + '/about-us/contact-us');
    const card = page.locator('text=I am a Broker');
    await expect(card).toBeVisible();
  });

  test('should display Other Inquiries contact card', async ({ page }) => {
    await page.goto(baseURL + '/about-us/contact-us');
    const card = page.locator('text=Other Inquiries');
    await expect(card).toBeVisible();
  });

  test('should display phone number with TTY info', async ({ page }) => {
    await page.goto(baseURL + '/about-us/contact-us');
    const phone = page.locator('text=1-888-293-8272').first();
    await expect(phone).toBeVisible();
  });
});

test.describe('Alignment Health Plan - Login Entry Points', () => {
  test('should have Member Login link accessible from homepage header', async ({ page }) => {
    await page.goto(baseURL);
    const loginLink = page.locator('a[href*="members.alignmenthealthplan.com"]').first();
    await expect(loginLink).toBeVisible();
    await expect(loginLink).toHaveAttribute('href', 'https://members.alignmenthealthplan.com');
  });

  test('should have Provider Login link accessible from homepage header', async ({ page }) => {
    await page.goto(baseURL);
    const loginLink = page.locator('a[href*="ava.alignmenthealth.com"]').first();
    await expect(loginLink).toBeVisible();
    await expect(loginLink).toHaveAttribute('href', 'https://ava.alignmenthealth.com');
  });

  test('should have Agents Login link accessible from footer', async ({ page }) => {
    await page.goto(baseURL);
    const loginLink = page.locator('footer a:has-text("Agents Login")');
    await expect(loginLink).toBeVisible();
  });

  test('should have Member Login link in footer', async ({ page }) => {
    await page.goto(baseURL);
    const loginLink = page.locator('footer a[href*="members.alignmenthealthplan.com"]');
    await expect(loginLink).toBeVisible();
  });

  test('should have Provider Login link in footer', async ({ page }) => {
    await page.goto(baseURL);
    const loginLink = page.locator('footer a[href*="ava.alignmenthealth.com"]');
    await expect(loginLink).toBeVisible();
  });
});

test.describe('Alignment Health Plan - Form Elements', () => {
  test('should display zip code field with correct placeholder', async ({ page }) => {
    await page.goto(baseURL);
    const input = page.locator('input[placeholder*="ZIP Code"]');
    await expect(input).toHaveAttribute('placeholder', /ZIP Code/);
  });

  test('should accept numeric input in zip code field', async ({ page }) => {
    await page.goto(baseURL);
    const input = page.locator('input[placeholder*="ZIP Code"]');
    await input.fill('89014');
    await expect(input).toHaveValue('89014');
  });

  test('should enable See Plans button click with valid zip', async ({ page }) => {
    await page.goto(baseURL);
    await page.locator('input[placeholder*="ZIP Code"]').fill('89014');
    const button = page.locator('button:has-text("See Plans >")');
    await expect(button).toBeEnabled();
  });
});

test.describe('Alignment Health Plan - Page Accessibility', () => {
  test('should have proper page title on homepage', async ({ page }) => {
    await page.goto(baseURL);
    expect(page).toHaveTitle(/Medicare Advantage Plans that Put You First/);
  });

  test('should have proper page title on plans page', async ({ page }) => {
    await page.goto(baseURL + '/find-a-plan');
    expect(page).toHaveTitle(/Find a Plan/);
  });

  test('should have proper page title on contact page', async ({ page }) => {
    await page.goto(baseURL + '/about-us/contact-us');
    expect(page).toHaveTitle(/Contact Us/);
  });

  test('should have navigation landmark on homepage', async ({ page }) => {
    await page.goto(baseURL);
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
  });

  test('should have banner landmark on homepage', async ({ page }) => {
    await page.goto(baseURL);
    const banner = page.locator('banner').first();
    await expect(banner).toBeVisible();
  });

  test('should have footer landmark on homepage', async ({ page }) => {
    await page.goto(baseURL);
    const footer = page.locator('footer').first();
    await expect(footer).toBeVisible();
  });
});

test.describe('Alignment Health Plan - Links and Navigation', () => {
  test('should navigate to plans page when clicking Compare Plans link', async ({ page }) => {
    await page.goto(baseURL);
    const link = page.locator('a:has-text("Compare Plans >")');
    await link.click();
    await page.waitForURL('**/find-a-plan/**');
    expect(page.url()).toContain('find-a-plan');
  });

  test('should navigate to Medicare info when clicking About Medicare link', async ({ page }) => {
    await page.goto(baseURL);
    const link = page.locator('a:has-text("About Medicare >")');
    await link.click();
    await page.waitForURL('**/medicare-advantage-plans/**');
  });

  test('should navigate to provider search when clicking Find Care link', async ({ page }) => {
    await page.goto(baseURL);
    const link = page.locator('a:has-text("Find Care >")');
    await link.click();
    await page.waitForURL('**/providersearch**');
  });

  test('should navigate to find medication page when clicking Find Medication', async ({ page }) => {
    await page.goto(baseURL);
    const link = page.locator('a:has-text("Find Medication >")');
    await link.click();
    await page.waitForURL('**/find-a-drug/**');
  });

  test('should navigate back to homepage when clicking logo', async ({ page }) => {
    await page.goto(baseURL + '/find-a-plan');
    const logo = page.locator('img[alt*="AlignmentHealthPlan"]').first();
    await logo.click();
    await page.waitForURL(baseURL + '/');
  });

  test('should navigate to seminars page when clicking Search Seminars', async ({ page }) => {
    await page.goto(baseURL);
    const link = page.locator('a:has-text("Search Seminars >")');
    await link.click();
    await page.waitForURL('**/attend-a-seminar/**');
  });

  test('should call phone number when clicking 1-888-293-8272', async ({ page }) => {
    await page.goto(baseURL);
    const phoneLink = page.locator('a[href*="tel:1-888-293-8272"]').first();
    expect(phoneLink).toHaveAttribute('href', /tel:1-888-293-8272/);
  });

  test('should navigate to legal notices page', async ({ page }) => {
    await page.goto(baseURL);
    const link = page.locator('footer a:has-text("Legal Notices")');
    await expect(link).toHaveAttribute('href', /legal-notices/);
  });

  test('should navigate to privacy notices page', async ({ page }) => {
    await page.goto(baseURL);
    const link = page.locator('footer a:has-text("Privacy Notices")');
    await expect(link).toHaveAttribute('href', /privacy-notices/);
  });
});

test.describe('Alignment Health Plan - Text and Content', () => {
  test('should display disclaimer text at bottom of page', async ({ page }) => {
    await page.goto(baseURL);
    const disclaimer = page.locator('text=/Alignment Health Plan is an HMO/');
    await expect(disclaimer).toBeVisible();
  });

  test('should display benefits disclaimer with superscript', async ({ page }) => {
    await page.goto(baseURL);
    const disclaimer = page.locator('text=Benefits vary by plan');
    await expect(disclaimer).toBeVisible();
  });

  test('should display hours of operation text', async ({ page }) => {
    await page.goto(baseURL);
    const hours = page.locator('text=/8:00 a.m. to 8:00 p.m./');
    await expect(hours).toBeVisible();
  });

  test('should display Copyright text with current year', async ({ page }) => {
    await page.goto(baseURL);
    const copyright = page.locator('text=/© Copyright 2026/');
    await expect(copyright).toBeVisible();
  });

  test('should display page last updated text', async ({ page }) => {
    await page.goto(baseURL);
    const updated = page.locator('text=/Page last updated/');
    await expect(updated).toBeVisible();
  });
});
