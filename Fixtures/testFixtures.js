const { test: base } = require('@playwright/test');
const { LoginPage } = require('../Pages/LoginPage');

const test = base.extend({
    loggedInPage: async ({ page }, use) => {

        const loginPage = new LoginPage(page);

        await page.goto('/');

        await loginPage.openLoginPage();

        await loginPage.login(
            process.env.EMAIL,
            process.env.PASSWORD
        );

        await use(page);
    }
});

module.exports = { test };