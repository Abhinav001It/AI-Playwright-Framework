const { test, expect } = require('@playwright/test');
const { ProductPage } = require('../Pages/ProductPage');
const { CartPage } = require('../Pages/CartPage');

test('Validate product details in cart', async ({ page }) => {

    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await page.goto('/', {
    waitUntil: 'domcontentloaded'
});

    await productPage.openProductsPage();

    await productPage.addProductToCart();

    // Product should be present
    await expect(cartPage.productName.first()).toBeVisible();

    // Validate product name
    await expect(cartPage.productName.first())
        .toContainText('Blue Top');

    // Validate price
    await expect(cartPage.productPrice.first())
        .toContainText('Rs. 500');

    // Validate quantity
    await expect(cartPage.productQuantity.first())
        .toHaveText('1');

    // Validate total
    await expect(cartPage.productTotal.first())
        .toContainText('Rs. 500');
});