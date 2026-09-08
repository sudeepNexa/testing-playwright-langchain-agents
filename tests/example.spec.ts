import { test, expect } from '@playwright/test';

/**
 * Smoke test proving the CI wiring works. Not a regression spec — those are
 * authored by the NexAI SDET agent and land under tests/regression/.
 */
test('homepage has a title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});
