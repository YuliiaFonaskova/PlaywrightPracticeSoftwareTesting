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

  async verifyProductDetails(productName) {
    await expect(this.productTitle).toContainText(productName);
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async verifyCartIsNotEmpty() {
    const quantity = Number(await this.cartQuantity.innerText());

    expect(quantity).toBeGreaterThan(0);
  }
}

module.exports = ProductPage;
