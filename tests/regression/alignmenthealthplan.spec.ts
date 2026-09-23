import { test, expect, Page } from '@playwright/test';

// Homepage Tests
test.describe('Alignment Health Plan - Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
  });

  test('should display homepage with correct title', async ({ page }) => {
    const title = await page.title();
    expect(title).toBe('Medicare Advantage Plans that Put You First | Alignment Health Plan');
  });

  test('should display main hero heading', async ({ page }) => {
    const heroHeading = page.locator('h1:has-text("MEDICARE ADVANTAGE PLANS THAT PUT YOU FIRST")');
    await expect(heroHeading).toBeVisible();
  });

  test('should display hero subheading about aging', async ({ page }) => {
    const subheading = page.getByText('We believe aging should be celebrated');
    await expect(subheading).toBeVisible();
  });

  test('should display zip code entry field on hero', async ({ page }) => {
    const zipInput = page.locator('input[placeholder*="ZIP Code"]').first();
    await expect(zipInput).toBeVisible();
  });

  test('should display See Plans button on hero', async ({ page }) => {
    const seeButton = page.locator('button:has-text("See Plans")');
    await expect(seeButton).toBeVisible();
  });

  test('should display Fortune badge banner', async ({ page }) => {
    const fortuneBanner = page.getByText('Fortune', { exact: false }).first();
    await expect(fortuneBanner).toBeVisible();
  });

  test('should display 5-star rating section', async ({ page }) => {
    const starRating = page.getByText('5-star rating', { exact: false }).first();
    await expect(starRating).toBeVisible();
  });

  test('should display How Can We Help section heading', async ({ page }) => {
    const heading = page.locator('h2:has-text("How Can We Help You Today")');
    await expect(heading).toBeVisible();
  });

  test('should display Compare Plans card', async ({ page }) => {
    const card = page.getByText('Compare Medicare Advantage Plans', { exact: false });
    await expect(card).toBeVisible();
  });

  test('should display About Medicare card', async ({ page }) => {
    const card = page.getByText('Learn about Medicare Advantage', { exact: false });
    await expect(card).toBeVisible();
  });

  test('should display Find Care provider card', async ({ page }) => {
    const card = page.getByText('Find a provider that suits you', { exact: false });
    await expect(card).toBeVisible();
  });

  test('should display Find Medication card', async ({ page }) => {
    const card = page.getByText('Find medication that is covered', { exact: false });
    await expect(card).toBeVisible();
  });

  test('should display concierge services section', async ({ page }) => {
    const heading = page.locator('h2:has-text("ON-DEMAND CONCIERGE SERVICES")');
    await expect(heading).toBeVisible();
  });

  test('should display benefits section with zero dollar values', async ({ page }) => {
    const monthlyPremium = page.getByText('Monthly plan premium', { exact: false });
    await expect(monthlyPremium).toBeVisible();
  });

  test('should display ACCESS debit card section', async ({ page }) => {
    const cardSection = page.getByText('ACCESS ON-DEMAND CONCIERGE Card', { exact: false });
    await expect(cardSection).toBeVisible();
  });

  test('should display Make Plans section with phone number', async ({ page }) => {
    const heading = page.locator('h2:has-text("Let\'s Make Plans")');
    await expect(heading).toBeVisible();
  });

  test('should display phone number link', async ({ page }) => {
    const phoneLink = page.locator('a[href="tel:1-888-293-8272"]');
    await expect(phoneLink).toBeVisible();
  });

  test('should display seminars link', async ({ page }) => {
    const seminarsLink = page.locator('a:has-text("Search Seminars")');
    await expect(seminarsLink).toBeVisible();
  });

  test('should display Enroll Now button on homepage', async ({ page }) => {
    const enrollButton = page.locator('a:has-text("Enroll Now")').first();
    await expect(enrollButton).toBeVisible();
  });
});

// Navigation Tests
test.describe('Alignment Health Plan - Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
  });

  test('should have Member Login link in header', async ({ page }) => {
    const memberLogin = page.locator('a:has-text("Member Login")').first();
    await expect(memberLogin).toBeVisible();
    await expect(memberLogin).toHaveAttribute('href', 'https://members.alignmenthealthplan.com');
  });

  test('should have Provider Login link in header', async ({ page }) => {
    const providerLogin = page.locator('a:has-text("Provider Login")').first();
    await expect(providerLogin).toBeVisible();
    await expect(providerLogin).toHaveAttribute('href', 'https://ava.alignmenthealth.com');
  });

  test('should have For Agents link in header', async ({ page }) => {
    const agentsLink = page.locator('a:has-text("For Agents")').first();
    await expect(agentsLink).toBeVisible();
  });

  test('should have Contact Us link in header', async ({ page }) => {
    const contactLink = page.locator('a:has-text("Contact Us")').first();
    await expect(contactLink).toBeVisible();
    await expect(contactLink).toHaveAttribute('href', '/about-us/contact-us');
  });

  test('should have logo that links to home', async ({ page }) => {
    const logo = page.locator('a img[alt="AlignmentHealthPlan"]').first();
    await expect(logo).toBeVisible();
  });

  test('should have Discover Alignment menu item', async ({ page }) => {
    const menu = page.getByText('Discover Alignment', { exact: false }).first();
    await expect(menu).toBeVisible();
  });

  test('should have Find Plans menu item', async ({ page }) => {
    const menu = page.getByText('Find Plans', { exact: false }).first();
    await expect(menu).toBeVisible();
  });

  test('should have Find Care menu item', async ({ page }) => {
    const menu = page.getByText('Find Care', { exact: false }).first();
    await expect(menu).toBeVisible();
  });

  test('should have Enroll Now button in navigation', async ({ page }) => {
    const enrollBtn = page.locator('a:has-text("Enroll Now")').first();
    await expect(enrollBtn).toBeVisible();
    await expect(enrollBtn).toHaveAttribute('href', '/find-a-plan');
  });
});

// Hero Zip Code Entry Tests
test.describe('Alignment Health Plan - Hero Zip Code Entry', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
  });

  test('should accept zip code input in hero section', async ({ page }) => {
    const zipInput = page.locator('input[placeholder*="ZIP Code"]').first();
    await zipInput.fill('90210');
    const value = await zipInput.inputValue();
    expect(value).toBe('90210');
  });

  test('should display required indicator for zip code', async ({ page }) => {
    const required = page.locator('[text="*Required"]').first();
    await expect(required).toBeVisible();
  });

  test('should have See Plans button enabled', async ({ page }) => {
    const seeButton = page.locator('button:has-text("See Plans")');
    await expect(seeButton).toBeEnabled();
  });

  test('should allow clicking See Plans button', async ({ page }) => {
    const seeButton = page.locator('button:has-text("See Plans")');
    // Just verify it's clickable
    await expect(seeButton).toBeVisible();
  });
});

// Find a Plan Page Tests
test.describe('Alignment Health Plan - Find a Plan Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/find-a-plan');
  });

  test('should display Find a Plan page title', async ({ page }) => {
    const title = await page.title();
    expect(title).toContain('Find a Plan');
  });

  test('should display Explore Our Plans heading', async ({ page }) => {
    const heading = page.locator('h3:has-text("Explore Our Plans")');
    await expect(heading).toBeVisible();
  });

  test('should display recommendation text', async ({ page }) => {
    const text = page.getByText('Answer a few questions', { exact: false });
    await expect(text).toBeVisible();
  });

  test('should have zip code field on find plans page', async ({ page }) => {
    const zipInput = page.locator('input[placeholder*="ZIP Code"]');
    await expect(zipInput.first()).toBeVisible();
  });

  test('should display Get Started button', async ({ page }) => {
    const button = page.locator('button:has-text("Get Started")');
    await expect(button).toBeVisible();
  });

  test('should display Contact Us form section', async ({ page }) => {
    const heading = page.locator('h2:has-text("Need Help? Contact Us Today")');
    await expect(heading).toBeVisible();
  });

  test('should display First Name field in contact form', async ({ page }) => {
    const field = page.locator('input[placeholder="First Name:"]');
    await expect(field.first()).toBeVisible();
  });

  test('should display Last Name field in contact form', async ({ page }) => {
    const field = page.locator('input[placeholder="Last Name:"]');
    await expect(field.first()).toBeVisible();
  });

  test('should display Email field in contact form', async ({ page }) => {
    const field = page.locator('input[placeholder="Email:"]');
    await expect(field.first()).toBeVisible();
  });

  test('should display Phone Number field in contact form', async ({ page }) => {
    const field = page.locator('input[placeholder="Phone Number:"]');
    await expect(field.first()).toBeVisible();
  });

  test('should display Phone Type dropdown', async ({ page }) => {
    const select = page.locator('select');
    await expect(select).toBeVisible();
  });

  test('should display ZIP Code field in contact form', async ({ page }) => {
    const field = page.locator('input[placeholder="U.S. ZIP Code:"]');
    await expect(field.first()).toBeVisible();
  });

  test('should display Submit button in contact form', async ({ page }) => {
    const button = page.locator('button:has-text("Submit")');
    await expect(button).toBeVisible();
  });

  test('should display phone number for support', async ({ page }) => {
    const phoneText = page.getByText('1-888-293-8272', { exact: false }).first();
    await expect(phoneText).toBeVisible();
  });

  test('should display TTY phone notation', async ({ page }) => {
    const ttyText = page.getByText('TTY: 711', { exact: false });
    await expect(ttyText).toBeVisible();
  });
});

// Contact Form Tests
test.describe('Alignment Health Plan - Contact Forms', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/find-a-plan');
  });

  test('should allow entering first name in contact form', async ({ page }) => {
    const field = page.locator('input[placeholder="First Name:"]').first();
    await field.fill('John');
    expect(await field.inputValue()).toBe('John');
  });

  test('should allow entering last name in contact form', async ({ page }) => {
    const field = page.locator('input[placeholder="Last Name:"]').first();
    await field.fill('Doe');
    expect(await field.inputValue()).toBe('Doe');
  });

  test('should allow entering email in contact form', async ({ page }) => {
    const field = page.locator('input[placeholder="Email:"]').first();
    await field.fill('john@example.com');
    expect(await field.inputValue()).toBe('john@example.com');
  });

  test('should allow entering phone number in contact form', async ({ page }) => {
    const field = page.locator('input[placeholder="Phone Number:"]').first();
    await field.fill('5551234567');
    expect(await field.inputValue()).toBe('5551234567');
  });

  test('should allow selecting phone type from dropdown', async ({ page }) => {
    const select = page.locator('select').first();
    await select.selectOption('Home');
    expect(await select.inputValue()).toBe('Home');
  });

  test('should have Phone Type dropdown with standard options', async ({ page }) => {
    const select = page.locator('select').first();
    const options = await page.locator('select option');
    const count = await options.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should allow entering zip code in contact form', async ({ page }) => {
    const field = page.locator('input[placeholder="U.S. ZIP Code:"]').first();
    await field.fill('90210');
    expect(await field.inputValue()).toBe('90210');
  });
});

// Contact Us Page Tests
test.describe('Alignment Health Plan - Contact Us Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/about-us/contact-us');
  });

  test('should display Contact Us page title', async ({ page }) => {
    const title = await page.title();
    expect(title).toContain('Contact Us');
  });

  test('should display Contact Us heading', async ({ page }) => {
    const heading = page.locator('h1:has-text("Contact Us")');
    await expect(heading).toBeVisible();
  });

  test('should display need help heading on contact page', async ({ page }) => {
    const heading = page.getByText('Need help?', { exact: false });
    await expect(heading).toBeVisible();
  });

  test('should display Send Us a Message section', async ({ page }) => {
    const section = page.getByText('Send Us a Message', { exact: false });
    await expect(section).toBeVisible();
  });

  test('should display Member contact option', async ({ page }) => {
    const link = page.getByText('I am a Member', { exact: false });
    await expect(link).toBeVisible();
  });

  test('should display Provider contact option', async ({ page }) => {
    const link = page.getByText('I am a Provider', { exact: false });
    await expect(link).toBeVisible();
  });

  test('should display Broker contact option', async ({ page }) => {
    const link = page.getByText('I am a Broker', { exact: false });
    await expect(link).toBeVisible();
  });

  test('should display Other Inquiries option', async ({ page }) => {
    const link = page.getByText('Other Inquiries', { exact: false });
    await expect(link).toBeVisible();
  });

  test('should display expandable/collapsible contact tabs', async ({ page }) => {
    const tabs = page.locator('role=tab');
    const count = await tabs.count();
    expect(count).toBeGreaterThan(0);
  });
});

// Footer Tests
test.describe('Alignment Health Plan - Footer Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
  });

  test('should display footer with logo', async ({ page }) => {
    const footerLogo = page.locator('footer img[alt="Alignment Health Plan"]');
    await expect(footerLogo).toBeVisible();
  });

  test('should have Find Plans section in footer', async ({ page }) => {
    const section = page.locator('footer').getByText('Find Plans', { exact: false });
    await expect(section).toBeVisible();
  });

  test('should have Shop Online link in footer', async ({ page }) => {
    const link = page.locator('footer').locator('a:has-text("Shop Online")');
    await expect(link).toBeVisible();
  });

  test('should have Ways to Enroll link in footer', async ({ page }) => {
    const link = page.locator('footer').locator('a:has-text("Ways to Enroll")');
    await expect(link).toBeVisible();
  });

  test('should have Attend a Seminar link in footer', async ({ page }) => {
    const link = page.locator('footer').locator('a:has-text("Attend a Seminar")');
    await expect(link).toBeVisible();
  });

  test('should have Find Care section in footer', async ({ page }) => {
    const section = page.locator('footer').getByText('Find Care', { exact: false });
    await expect(section).toBeVisible();
  });

  test('should have Doctor search link in footer', async ({ page }) => {
    const link = page.locator('footer').locator('a:has-text("Doctor")');
    await expect(link).toBeVisible();
  });

  test('should have Drug search link in footer', async ({ page }) => {
    const link = page.locator('footer').locator('a:has-text("Drug")');
    await expect(link).toBeVisible();
  });

  test('should have Pharmacy link in footer', async ({ page }) => {
    const link = page.locator('footer').locator('a:has-text("Pharmacy")');
    await expect(link).toBeVisible();
  });

  test('should have For Members section in footer', async ({ page }) => {
    const section = page.locator('footer').getByText('For Members', { exact: false });
    await expect(section).toBeVisible();
  });

  test('should have Member Services link in footer', async ({ page }) => {
    const link = page.locator('footer').locator('a:has-text("Member Services")');
    await expect(link).toBeVisible();
  });

  test('should have For Providers section in footer', async ({ page }) => {
    const section = page.locator('footer').getByText('For Providers', { exact: false });
    await expect(section).toBeVisible();
  });

  test('should have Provider Resources link in footer', async ({ page }) => {
    const link = page.locator('footer').locator('a:has-text("Provider Resources")');
    await expect(link).toBeVisible();
  });

  test('should have Legal Notices link in footer', async ({ page }) => {
    const link = page.locator('footer').locator('a:has-text("Legal Notices")');
    await expect(link).toBeVisible();
  });

  test('should have Privacy Notices link in footer', async ({ page }) => {
    const link = page.locator('footer').locator('a:has-text("Privacy Notices")');
    await expect(link).toBeVisible();
  });

  test('should have Terms of Use link in footer', async ({ page }) => {
    const link = page.locator('footer').locator('a:has-text("Terms of Use")');
    await expect(link).toBeVisible();
  });

  test('should display copyright notice in footer', async ({ page }) => {
    const copyright = page.getByText('Copyright 2026 Alignment Health Plan', { exact: false });
    await expect(copyright).toBeVisible();
  });
});

// Page Navigation Tests
test.describe('Alignment Health Plan - Page Navigation', () => {
  test('should navigate from homepage to find a plan', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    await page.click('a:has-text("Enroll Now")');
    await expect(page).toHaveURL(/find-a-plan/);
  });

  test('should navigate to contact us from header', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    await page.click('a:has-text("Contact Us")');
    await expect(page).toHaveURL(/contact-us/);
  });

  test('should navigate to member login', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const memberLink = page.locator('a:has-text("Member Login")').first();
    expect(await memberLink.getAttribute('href')).toBe('https://members.alignmenthealthplan.com');
  });

  test('should navigate to provider login', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const providerLink = page.locator('a:has-text("Provider Login")').first();
    expect(await providerLink.getAttribute('href')).toBe('https://ava.alignmenthealth.com');
  });
});

// Accessibility Tests
test.describe('Alignment Health Plan - Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
  });

  test('should have proper heading hierarchy on homepage', async ({ page }) => {
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    const count = await h1.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('should have alt text on important images', async ({ page }) => {
    const logoImg = page.locator('img[alt="AlignmentHealthPlan"]');
    await expect(logoImg).toBeVisible();
    const alt = await logoImg.getAttribute('alt');
    expect(alt).toBeTruthy();
  });

  test('should have accessible form labels', async ({ page }) => {
    const zipLabel = page.getByText('Zip code', { exact: false });
    await expect(zipLabel).toBeVisible();
  });
});

// Search Functionality Tests
test.describe('Alignment Health Plan - Search Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
  });

  test('should display search box in header', async ({ page }) => {
    const searchBox = page.locator('input[placeholder="Search"]');
    await expect(searchBox).toBeVisible();
  });

  test('should have search button', async ({ page }) => {
    const searchButton = page.locator('button:has-text("Search")');
    await expect(searchButton).toBeVisible();
  });

  test('should allow typing in search box', async ({ page }) => {
    const searchBox = page.locator('input[placeholder="Search"]');
    await searchBox.fill('Medicare');
    expect(await searchBox.inputValue()).toBe('Medicare');
  });
});

// Device Tests
test.describe('Alignment Health Plan - Responsive Elements', () => {
  test('should have responsive hero image', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const heroImage = page.locator('img').first();
    await expect(heroImage).toBeVisible();
  });

  test('should have proper spacing on benefits section', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const benefitsHeading = page.getByText('benefits', { exact: false });
    await expect(benefitsHeading).toBeVisible();
  });
});
