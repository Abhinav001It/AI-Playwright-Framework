const { test, expect } = require('@playwright/test');

test('Verify Automation Exercise homepage', async ({ page }) => {

    // Open application
    await page.goto('https://automationexercise.com/');

    // Verify page title
    await expect(page).toHaveTitle(/Automation Exercise/);

    // Verify homepage content
    await expect(page.locator('body'))
        .toContainText('Full-Fledged practice website for Automation Engineers');

});