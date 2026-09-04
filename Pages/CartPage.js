class CartPage {
    constructor(page) {
        this.page = page;

        this.cartItems = page.locator('#cart_info_table tbody tr');

        this.productName = page.locator('.cart_description h4 a');
        this.productPrice = page.locator('.cart_price p');
        this.productQuantity = page.locator('.cart_quantity button');
        this.productTotal = page.locator('.cart_total p');
    }
}

module.exports = { CartPage };