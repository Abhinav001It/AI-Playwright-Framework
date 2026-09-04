class CheckoutPage {
    constructor(page) {
        this.page = page;

        this.proceedToCheckoutButton = page.getByText(
            'Proceed To Checkout',
            { exact: true }
        );

        this.placeOrderButton = page.getByText(
            'Place Order',
            { exact: true }
        );

        this.orderPlacedMessage = page.getByText(
            'Order Placed!',
            { exact: true }
        );
    }

    async proceedToCheckout() {
        await this.proceedToCheckoutButton.click();
    }

    async placeOrder() {
        await this.placeOrderButton.click();
    }
}

module.exports = { CheckoutPage };