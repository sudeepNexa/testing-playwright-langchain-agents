import { test, expect } from '@playwright/test';

test.describe('Alignment Health Plan - Regression Test Suite', () => {
  test('Homepage loads with correct title', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    await expect(page).toHaveTitle('Medicare Advantage Plans that Put You First | Alignment Health Plan');
  });

  test('Homepage banner contains Member Login link', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const memberLoginLink = page.getByRole('banner').getByRole('link', { name: 'Member Login' });
    await expect(memberLoginLink).toBeVisible();
    await expect(memberLoginLink).toHaveAttribute('href', 'https://members.alignmenthealthplan.com');
  });

  test('Homepage banner contains Provider Login link', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const providerLoginLink = page.getByRole('banner').getByRole('link', { name: 'Provider Login' });
    await expect(providerLoginLink).toBeVisible();
    await expect(providerLoginLink).toHaveAttribute('href', 'https://ava.alignmenthealth.com');
  });

  test('Homepage banner contains For Agents link', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const agentsLink = page.getByRole('banner').getByRole('link', { name: 'For Agents' });
    await expect(agentsLink).toBeVisible();
    await expect(agentsLink).toHaveAttribute('href', 'https://www.alignmenthealth.com/Partners/Brokers');
  });

  test('Homepage banner contains Contact Us link', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const contactLink = page.getByRole('banner').getByRole('link', { name: 'Contact Us' });
    await expect(contactLink).toBeVisible();
    await expect(contactLink).toHaveAttribute('href', '/about-us/contact-us');
  });

  test('Homepage displays Alignment Health Plan logo', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const logo = page.getByRole('banner').getByRole('link').filter({ has: page.getByRole('img', { name: 'AlignmentHealthPlan' }) });
    await expect(logo).toBeVisible();
  });

  test('Homepage displays hero heading "MEDICARE ADVANTAGE PLANS THAT PUT YOU FIRST!"', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const heading = page.getByRole('heading', { name: 'MEDICARE ADVANTAGE PLANS THAT PUT YOU FIRST!' });
    await expect(heading).toBeVisible();
  });

  test('Homepage hero contains zip code entry field', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const zipCodeInput = page.getByRole('textbox', { name: 'Zip code*' });
    await expect(zipCodeInput).toBeVisible();
    await expect(zipCodeInput).toHaveAttribute('placeholder', 'ZIP Code (Required)');
  });

  test('Homepage hero "See Plans >" button is visible', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const seePlansButton = page.getByRole('button', { name: 'See Plans >' });
    await expect(seePlansButton).toBeVisible();
  });

  test('Homepage displays Fortune recognition badge', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    await expect(page.getByText('Alignment Health has been named to the 2026', { exact: false })).toBeVisible();
    const learnMoreLink = page.getByRole('link', { name: 'Learn more >' });
    await expect(learnMoreLink).toBeVisible();
    await expect(learnMoreLink).toHaveAttribute('href', 'https://www.alignmenthealth.com/fortunewmac2026');
  });

  test('Homepage displays 5-star rating image', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const starImage = page.getByRole('img', { name: 'Alignment_Health_5_Stars' });
    await expect(starImage).toBeVisible();
  });

  test('Homepage displays "How Can We Help You Today?" section heading', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const sectionHeading = page.getByRole('heading', { name: 'How Can We Help You Today?' });
    await expect(sectionHeading).toBeVisible();
  });

  test('Homepage displays "Compare Medicare Advantage Plans" card with link', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const compareLink = page.getByRole('link', { name: /Compare Medicare Advantage Plans/ });
    await expect(compareLink).toBeVisible();
    await expect(compareLink).toHaveAttribute('href', '/find-a-plan');
  });

  test('Homepage displays "Learn about Medicare Advantage" card', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const aboutMedicareLink = page.getByRole('link', { name: /Learn about Medicare Advantage/ });
    await expect(aboutMedicareLink).toBeVisible();
    await expect(aboutMedicareLink).toHaveAttribute('href', '/discover-ahp/medicare-advantage-plans');
  });

  test('Homepage displays "Find a provider that suits you" card with external link', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const findCareLink = page.getByRole('link', { name: /Find a provider that suits you/ });
    await expect(findCareLink).toBeVisible();
    await expect(findCareLink).toHaveAttribute('href', 'https://providersearch.alignmenthealthplan.com/');
  });

  test('Homepage displays "Find medication that is covered in your plan" card', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const findMedicationLink = page.getByRole('link', { name: /Find medication that is covered in your plan/ });
    await expect(findMedicationLink).toBeVisible();
    await expect(findMedicationLink).toHaveAttribute('href', '/find-care/find-a-drug');
  });

  test('Homepage displays ON-DEMAND CONCIERGE SERVICES section', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const conciergeHeading = page.getByRole('heading', { name: 'ON-DEMAND CONCIERGE SERVICES' });
    await expect(conciergeHeading).toBeVisible();
  });

  test('Homepage Concierge section contains Learn More link', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    // Find Learn More link in the concierge section
    const learnMoreLinks = page.getByRole('link', { name: 'Why Alignment Health Plan' });
    const conciergeLink = learnMoreLinks.first();
    await expect(conciergeLink).toBeVisible();
    await expect(conciergeLink).toHaveAttribute('href', '/discover-ahp/why-alignment-health-plan');
  });

  test('Homepage displays benefits section with plan premium info', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const benefitsText = page.getByText('As low as');
    await expect(benefitsText).toBeVisible();
    const premiumText = page.getByText('Monthly plan premium');
    await expect(premiumText).toBeVisible();
  });

  test('Homepage displays primary care visit copay benefit', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const copayText = page.getByText('Copay for primary care visits');
    await expect(copayText).toBeVisible();
  });

  test('Homepage displays telehealth visit copay benefit', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const telehealth = page.getByText('Copay for telehealth visits');
    await expect(telehealth).toBeVisible();
  });

  test('Homepage displays drug coverage benefit', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const drugText = page.getByText('Copay on over 10,000 drugs');
    await expect(drugText).toBeVisible();
  });

  test('Homepage displays vision coverage benefit', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const visionText = page.getByText('Vision coverage');
    await expect(visionText).toBeVisible();
  });

  test('Homepage displays gym membership benefit', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const gymText = page.getByText('Gym membership');
    await expect(gymText).toBeVisible();
  });

  test('Homepage displays ACCESS On-Demand Concierge Card section', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const cardHeading = page.getByRole('heading', { name: /ACCESS ON-DEMAND CONCIERGE Card/ });
    await expect(cardHeading).toBeVisible();
  });

  test('Homepage displays "Lets Make Plans" section with phone number', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const plansHeading = page.getByRole('heading', { name: "Let's Make Plans" });
    await expect(plansHeading).toBeVisible();
    const phoneLink = page.getByRole('heading').filter({ hasText: '1-888-293-8272' });
    await expect(phoneLink).toBeVisible();
  });

  test('Homepage displays seminar section with link', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const seminarLink = page.getByRole('link', { name: /Search Seminars/ });
    await expect(seminarLink).toBeVisible();
    await expect(seminarLink).toHaveAttribute('href', '/find-plans/attend-a-seminar');
  });

  test('Homepage displays Enroll Online section', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const enrollLink = page.getByRole('link', { name: /Enroll with Alignment Health Plan/ });
    await expect(enrollLink).toBeVisible();
    await expect(enrollLink).toHaveAttribute('href', '/find-a-plan');
  });

  test('Footer contains logo link to homepage', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const footerLogo = page.getByRole('contentinfo').getByRole('link').filter({ has: page.getByRole('img', { name: 'Alignment Health Plan' }) });
    await expect(footerLogo).toBeVisible();
  });

  test('Footer Find Plans section contains Shop Online link', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const shopLink = page.getByRole('contentinfo').getByRole('link', { name: 'Shop Online' });
    await expect(shopLink).toBeVisible();
    await expect(shopLink).toHaveAttribute('href', '/find-a-plan/');
  });

  test('Footer Find Plans section contains Ways to Enroll link', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const enrollLink = page.getByRole('contentinfo').getByRole('link', { name: 'Ways to Enroll' });
    await expect(enrollLink).toBeVisible();
    await expect(enrollLink).toHaveAttribute('href', '/find-plans/ways-to-enroll');
  });

  test('Footer Find Plans section contains Attend a Seminar link', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const seminarLink = page.getByRole('contentinfo').getByRole('link', { name: 'Attend a Seminar' });
    await expect(seminarLink).toBeVisible();
    await expect(seminarLink).toHaveAttribute('href', '/find-plans/attend-a-seminar');
  });

  test('Footer Find Care section contains Doctor link', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const doctorLink = page.getByRole('contentinfo').getByRole('link', { name: 'Doctor' });
    await expect(doctorLink).toBeVisible();
    await expect(doctorLink).toHaveAttribute('href', 'https://providersearch.alignmenthealthplan.com/');
  });

  test('Footer Find Care section contains Drug link', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const drugLink = page.getByRole('contentinfo').getByRole('link', { name: 'Drug' });
    await expect(drugLink).toBeVisible();
    await expect(drugLink).toHaveAttribute('href', '/find-care/find-a-drug');
  });

  test('Footer For Members section contains Member Login link', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const memberLoginLink = page.getByRole('contentinfo').getByRole('link', { name: 'Member Login' });
    await expect(memberLoginLink).toBeVisible();
    await expect(memberLoginLink).toHaveAttribute('href', 'https://members.alignmenthealthplan.com/');
  });

  test('Footer For Providers section contains Provider Login link', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const providerLoginLink = page.getByRole('contentinfo').getByRole('link', { name: 'Provider Login' });
    await expect(providerLoginLink).toBeVisible();
    await expect(providerLoginLink).toHaveAttribute('href', 'https://ava.alignmenthealth.com');
  });

  test('Footer contains Legal Notices link', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const legalLink = page.getByRole('contentinfo').getByRole('link', { name: 'Legal Notices' });
    await expect(legalLink).toBeVisible();
    await expect(legalLink).toHaveAttribute('href', '/about-us/legal-notices');
  });

  test('Footer contains Privacy Notices link', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const privacyLink = page.getByRole('contentinfo').getByRole('link', { name: 'Privacy Notices' });
    await expect(privacyLink).toBeVisible();
    await expect(privacyLink).toHaveAttribute('href', '/about-us/privacy-notices');
  });

  test('Footer contains Terms of Use link', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const termsLink = page.getByRole('contentinfo').getByRole('link', { name: 'Terms of Use' });
    await expect(termsLink).toBeVisible();
    await expect(termsLink).toHaveAttribute('href', '/about-us/terms-of-use');
  });

  test('Find a Plan page loads with correct title', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/find-a-plan');
    await expect(page).toHaveTitle('Find a Plan | Alignment Health Plan');
  });

  test('Find a Plan page displays "Explore Our Plans" heading', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/find-a-plan');
    const heading = page.getByRole('heading', { name: 'Explore Our Plans' });
    await expect(heading).toBeVisible();
  });

  test('Find a Plan page contains zip code entry field', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/find-a-plan');
    const zipCodeInput = page.getByRole('textbox', { name: 'ZIP Code' });
    await expect(zipCodeInput).toBeVisible();
  });

  test('Find a Plan page "Get Started" button is present but disabled when zip is empty', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/find-a-plan');
    const getStartedButton = page.getByRole('button', { name: 'Get Started' });
    await expect(getStartedButton).toBeDisabled();
  });

  test('Find a Plan page displays contact form heading', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/find-a-plan');
    const heading = page.getByRole('heading', { name: 'Need Help? Contact Us Today.' });
    await expect(heading).toBeVisible();
  });

  test('Find a Plan contact form contains First Name field', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/find-a-plan');
    const firstNameInput = page.getByRole('textbox', { name: /First Name/ });
    await expect(firstNameInput).toBeVisible();
  });

  test('Find a Plan contact form contains Last Name field', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/find-a-plan');
    const lastNameInput = page.getByRole('textbox', { name: /Last Name/ });
    await expect(lastNameInput).toBeVisible();
  });

  test('Find a Plan contact form contains Email field', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/find-a-plan');
    const emailInput = page.getByRole('textbox', { name: /Email/ });
    await expect(emailInput).toBeVisible();
  });

  test('Find a Plan contact form contains Phone Number field', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/find-a-plan');
    const phoneInput = page.getByRole('textbox', { name: /Phone Number/ });
    await expect(phoneInput).toBeVisible();
  });

  test('Find a Plan contact form contains Phone Type dropdown', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/find-a-plan');
    const phoneTypeSelect = page.getByRole('combobox', { name: /Phone Type/ });
    await expect(phoneTypeSelect).toBeVisible();
  });

  test('Find a Plan contact form contains U.S. ZIP Code field', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/find-a-plan');
    const zipInput = page.getByRole('textbox', { name: /U.S. ZIP Code/ });
    await expect(zipInput).toBeVisible();
  });

  test('Find a Plan contact form contains Submit button', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/find-a-plan');
    const submitButton = page.getByRole('button', { name: 'Submit >' });
    await expect(submitButton).toBeVisible();
  });

  test('Find a Plan page displays phone help heading', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/find-a-plan');
    const heading = page.getByText('Let us guide you by phone');
    await expect(heading).toBeVisible();
  });

  test('Find a Drug page loads with correct title', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/find-care/find-a-drug');
    await expect(page).toHaveTitle('Find a Drug | Alignment Health Plan');
  });

  test('Find a Drug page displays main heading', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/find-care/find-a-drug');
    const heading = page.getByRole('heading', { name: 'Find a Drug' });
    await expect(heading).toBeVisible();
  });

  test('Find a Drug page has Digital Drug Formulary tab', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/find-care/find-a-drug');
    const tab = page.getByRole('tab', { name: 'Digital Drug Formulary' });
    await expect(tab).toBeVisible();
  });

  test('Find a Drug page has Drug Search tab', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/find-care/find-a-drug');
    const tab = page.getByRole('tab', { name: 'Drug Search' });
    await expect(tab).toBeVisible();
  });

  test('Find a Drug page has Request a Printed Copy tab', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/find-care/find-a-drug');
    const tab = page.getByRole('tab', { name: 'Request a Printed Copy' });
    await expect(tab).toBeVisible();
  });

  test('Find a Drug page contains Expand all link', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/find-care/find-a-drug');
    const expandLink = page.getByRole('link', { name: 'Expand all' });
    await expect(expandLink).toBeVisible();
  });

  test('Find a Drug page contains Collapse all link', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/find-care/find-a-drug');
    const collapseLink = page.getByRole('link', { name: 'Collapse all' });
    await expect(collapseLink).toBeVisible();
  });

  test('Contact Us page loads with correct title', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/about-us/contact-us');
    await expect(page).toHaveTitle('Contact Us | Alignment Health Plan');
  });

  test('Contact Us page displays main heading', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/about-us/contact-us');
    const heading = page.getByRole('heading', { name: 'Contact Us' });
    await expect(heading).toBeVisible();
  });

  test('Contact Us page has ACCESS On-Demand Concierge tab', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/about-us/contact-us');
    const tab = page.getByRole('tab', { name: 'ACCESS On-Demand Concierge' });
    await expect(tab).toBeVisible();
  });

  test('Contact Us page has Member Services tab', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/about-us/contact-us');
    const tab = page.getByRole('tab', { name: 'Member Services' });
    await expect(tab).toBeVisible();
  });

  test('Contact Us page has Sales tab', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/about-us/contact-us');
    const tab = page.getByRole('tab', { name: 'Sales' });
    await expect(tab).toBeVisible();
  });

  test('Contact Us page has Pharmacy Help Desk tab', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/about-us/contact-us');
    const tab = page.getByRole('tab', { name: 'Pharmacy Help Desk for Members' });
    await expect(tab).toBeVisible();
  });

  test('Contact Us page has Transportation Scheduling tab', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/about-us/contact-us');
    const tab = page.getByRole('tab', { name: 'Transportation Scheduling' });
    await expect(tab).toBeVisible();
  });

  test('Contact Us page has Utilization Management tab', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/about-us/contact-us');
    const tab = page.getByRole('tab', { name: 'Utilization Management' });
    await expect(tab).toBeVisible();
  });

  test('Contact Us page has Technical Pharmacy Help Desk tab', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/about-us/contact-us');
    const tab = page.getByRole('tab', { name: 'Technical Pharmacy Help Desk for Providers' });
    await expect(tab).toBeVisible();
  });

  test('Contact Us page has Network Management tab', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/about-us/contact-us');
    const tab = page.getByRole('tab', { name: 'Network Management and Provider Relations' });
    await expect(tab).toBeVisible();
  });

  test('Contact Us page has Corporate Headquarters tab', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/about-us/contact-us');
    const tab = page.getByRole('tab', { name: 'Alignment Health Corporate Headquarters' });
    await expect(tab).toBeVisible();
  });

  test('Contact Us page displays "Send Us a Message" section', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/about-us/contact-us');
    const heading = page.getByRole('heading', { name: 'Send Us a Message' });
    await expect(heading).toBeVisible();
  });

  test('Contact Us page has Member Services Contact Us Form link', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/about-us/contact-us');
    const formLink = page.getByRole('link', { name: 'Member Services Contact Us Form' });
    await expect(formLink).toBeVisible();
    await expect(formLink).toHaveAttribute('href', '/members/member-services#member');
  });

  test('Contact Us page has Provider Services Contact Us Form link', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/about-us/contact-us');
    const formLink = page.getByRole('link', { name: 'Provider Services Contact Us Form' });
    await expect(formLink).toBeVisible();
    await expect(formLink).toHaveAttribute('href', '/providers/provider-resources#provider');
  });

  test('Contact Us page has Broker Services Contact Us Form link', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/about-us/contact-us');
    const formLink = page.getByRole('link', { name: 'Broker Services Contact Us Form' });
    await expect(formLink).toBeVisible();
    await expect(formLink).toHaveAttribute('href', 'https://www.alignmenthealth.com/partners/brokers#broker-inquiry');
  });

  test('Contact Us page has Other inquiries link', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/about-us/contact-us');
    const formLink = page.getByRole('link', { name: 'Have other inquiries? Contact Us' });
    await expect(formLink).toBeVisible();
    await expect(formLink).toHaveAttribute('href', 'https://www.alignmenthealth.com/contact/other-inquiries#general-inquiry');
  });

  test('Enroll Now button in header navigates to find-a-plan', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const enrollButton = page.getByRole('link', { name: 'Enroll Now' });
    await expect(enrollButton).toHaveAttribute('href', '/find-a-plan');
  });

  test('Search functionality is present in header', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const searchInput = page.getByRole('textbox', { name: /Search/ });
    await expect(searchInput).toBeVisible();
    const searchButton = page.getByRole('button', { name: 'Search' });
    await expect(searchButton).toBeVisible();
  });

  test('Homepage displays disclaimer link', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const disclaimerLink = page.getByRole('link', { name: 'Click here to read the full disclaimer' });
    await expect(disclaimerLink).toBeVisible();
    await expect(disclaimerLink).toHaveAttribute('href', '/about-us/legal-notices');
  });

  test('Footer contains copyright notice', async ({ page }) => {
    await page.goto('https://www.alignmenthealthplan.com/');
    const copyright = page.getByText('© Copyright 2026 Alignment Health Plan. All Rights Reserved.');
    await expect(copyright).toBeVisible();
  });
});
