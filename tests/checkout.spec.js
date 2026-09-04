const { test } = require('../Fixtures/testFixtures');
const { expect } = require('@playwright/test');
const { ProductPage } = require('../Pages/ProductPage');
const { CartPage } = require('../Pages/CartPage');
const { CheckoutPage } = require('../Pages/CheckoutPage');

test('Checkout and place order', async ({ loggedInPage }) => {

    const productPage = new ProductPage(loggedInPage);
    const cartPage = new CartPage(loggedInPage);
    const checkoutPage = new CheckoutPage(loggedInPage);



    // Open Products
    await productPage.openProductsPage();

    // Add product and open cart
    await productPage.addProductToCart();

    // Verify product
    await expect(
        cartPage.productName.first()
    ).toBeVisible();

    // Proceed to checkout
    await checkoutPage.proceedToCheckout();

    // Verify checkout page
    await expect(
        loggedInPage.getByText('Address Details')
    ).toBeVisible();

    // Place order
    await checkoutPage.placeOrder();

    // Verify order placed
    await expect(
        checkoutPage.orderPlacedMessage
    ).toBeVisible();
});