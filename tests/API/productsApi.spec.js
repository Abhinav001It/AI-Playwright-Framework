const { test, expect } = require('@playwright/test');

test('Get all products API', async ({ request }) => {

    const response = await request.get('/api/productsList');

    // Status code validation
    expect(response.status()).toBe(200);

    // Response JSON
    const responseBody = await response.json();

    // Response body validation
    expect(responseBody).toHaveProperty('products');

    // Products should be an array
    expect(Array.isArray(responseBody.products)).toBeTruthy();

    // Products should not be empty
    expect(responseBody.products.length).toBeGreaterThan(0);

});

test('Search product API', async ({ request }) => {

    const response = await request.post('/api/searchProduct', {
        form: {
            search_product: 'Tshirt'
        }
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('products');
    expect(Array.isArray(responseBody.products)).toBeTruthy();
    expect(responseBody.products.length).toBeGreaterThan(0);
});

test('API + UI product validation', async ({ request, page }) => {

    // 1. Search product through API
    const response = await request.post('/api/searchProduct', {
        form: {
            search_product: 'Tshirt'
        }
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    const productName = responseBody.products[0].name;

    // 2. Open UI
    await page.goto('/');

    await page.getByText('Products').click();

    // 3. Search same product on UI
    await page.locator('#search_product').fill('Tshirt');
    await page.locator('#submit_search').click();

    // 4. Verify product exists on UI
    await expect(
        page.locator('.productinfo').first()
    ).toBeVisible();

    await expect(
        page.locator('.productinfo').first()
    ).toContainText(productName);
});