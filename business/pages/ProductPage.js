const { expect } = require("@playwright/test");
const BasePage = require("../../core/BasePage");

class ProductPage extends BasePage {
  get productTitle() {
    return this.page.locator('[data-test="product-name"]');
  }

  get addToCartButton() {
    return this.page.locator('[data-test="add-to-cart"]');
  }

  get cartQuantity() {
    return this.page.locator('[data-test="cart-quantity"]');
  }

  async verifyProductTitle(productName) {
    await expect(this.productTitle).toHaveText(productName);
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  // Wait until the cart quantity updates to a positive number.
  async verifyCartIsNotEmpty() {
    await expect
      .poll(async () => Number(await this.cartQuantity.innerText()))
      .toBeGreaterThan(0);
  }
}

module.exports = ProductPage;
