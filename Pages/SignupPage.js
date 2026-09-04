class SignupPage {
    constructor(page) {
        this.page = page;

        // Initial Signup
        this.signupLoginLink = page.getByText('Signup / Login');
        this.nameInput = page.locator('[data-qa="signup-name"]');
        this.emailInput = page.locator('[data-qa="signup-email"]');
        this.signupButton = page.getByRole('button', { name: 'Signup' });

        // Account Information
        this.passwordInput = page.locator('[data-qa="password"]');
        this.firstNameInput = page.locator('[data-qa="first_name"]');
        this.lastNameInput = page.locator('[data-qa="last_name"]');
        this.addressInput = page.locator('[data-qa="address"]');
        this.stateInput = page.locator('[data-qa="state"]');
        this.cityInput = page.locator('[data-qa="city"]');
        this.zipcodeInput = page.locator('[data-qa="zipcode"]');
        this.mobileInput = page.locator('[data-qa="mobile_number"]');
        this.createAccountButton = page.getByRole('button', {
            name: 'Create Account'
        });
    }

    async openSignupPage() {
        await this.signupLoginLink.click();
    }

    async signup(name, email) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.signupButton.click();
    }

    async completeAccountDetails() {
        await this.passwordInput.fill('Test@12345');

        await this.page.locator('#days').selectOption('10');
        await this.page.locator('#months').selectOption('5');
        await this.page.locator('#years').selectOption('1999');

        await this.firstNameInput.fill('Abhinav');
        await this.lastNameInput.fill('Siddhu');
        await this.addressInput.fill('Test Address');

        await this.stateInput.fill('Uttar Pradesh');
        await this.cityInput.fill('Ghaziabad');
        await this.zipcodeInput.fill('201001');
        await this.mobileInput.fill('9876543210');

        await this.createAccountButton.click();
    }
}

module.exports = { SignupPage };