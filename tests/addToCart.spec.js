const { test, expect } = require('@playwright/test');
const { ProductPage } = require('../Pages/ProductPage');
const { CartPage } = require('../Pages/CartPage');

test('Add product to cart', async ({ page }) => {

    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await page.goto('/');

    // Open Products
    await productPage.openProductsPage();

    await expect(
        page.getByText('All Products')
    ).toBeVisible();

    // Add product and open Cart
    await productPage.addProductToCart();

    // Verify cart has product
    await expect(
        cartPage.cartItems.first()
    ).toBeVisible();

    // Verify quantity
    await expect(
        cartPage.cartItems.first().locator('.cart_quantity')
    ).toContainText('1');
});