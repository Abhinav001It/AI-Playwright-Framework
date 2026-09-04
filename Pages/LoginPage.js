class LoginPage {
    constructor(page) {
        this.page = page;

        this.signupLoginLink = page.getByText('Signup / Login');
        this.emailInput = page.locator('[data-qa="login-email"]');
        this.passwordInput = page.locator('[data-qa="login-password"]');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async openLoginPage() {
        await this.signupLoginLink.click();
    }

    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}

module.exports = { LoginPage };