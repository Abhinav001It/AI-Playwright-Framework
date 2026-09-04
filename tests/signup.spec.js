const { test, expect } = require('@playwright/test');
const { SignupPage } = require('../Pages/SignupPage');
const { generateEmail } = require('../Utils/testData');

test('Register a new user', async ({ page }) => {

    const signupPage = new SignupPage(page);
    const email = generateEmail();

    await page.goto('/');

    await signupPage.openSignupPage();

    await expect(page.getByText('New User Signup!')).toBeVisible();

    await signupPage.signup('Abhinav', email);
});