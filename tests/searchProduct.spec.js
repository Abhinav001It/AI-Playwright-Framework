const { test, expect } = require('@playwright/test');
const { ProductPage } = require('../Pages/ProductPage');

test('Search product', async ({ page }) => {

    const productPage = new ProductPage(page);

    await page.goto('/');

    await productPage.openProductsPage();

    await expect(
        page.getByText('All Products')
    ).toBeVisible();

    await productPage.searchProduct('Tshirt');

    await expect(
        page.getByText('SEARCHED PRODUCTS')
    ).toBeVisible();

    await expect(
        productPage.searchedProducts.first()
    ).toBeVisible();
});