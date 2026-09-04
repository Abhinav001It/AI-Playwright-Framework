class ProductPage {
    constructor(page) {
        this.page = page;

        this.productsLink = page.getByText('Products');
        this.searchInput = page.locator('#search_product');
        this.searchButton = page.locator('#submit_search');
        this.searchedProducts = page.locator('.productinfo');

        this.addToCartButton = page.getByText('Add to cart').first();
        this.viewCartLink = page.getByText('View Cart', { exact: true });
    }

    async openProductsPage() {
        await this.productsLink.click();
    }

    async searchProduct(productName) {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }

    async addProductToCart() {
        await this.addToCartButton.click();
        await this.viewCartLink.click();
    }
}

module.exports = { ProductPage };