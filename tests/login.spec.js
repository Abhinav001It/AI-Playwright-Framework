const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../Pages/LoginPage');

test('Login with valid credentials', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await page.goto('/');

    await loginPage.openLoginPage();

    await expect(
        page.getByText('Login to your account')
    ).toBeVisible();

    await loginPage.login(
        process.env.EMAIL,
        process.env.PASSWORD
        
    );

    await expect(
        page.getByText('Logged in as')
    ).toBeVisible();
});