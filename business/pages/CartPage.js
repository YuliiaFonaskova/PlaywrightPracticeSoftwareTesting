const { expect } = require("@playwright/test");
const BasePage = require("../../core/BasePage");

// Matches a currency price formatted with a leading dollar sign and two decimal places (e.g. "$14.15").
const CURRENCY_PRICE_REGEX = /^\$\d+\.\d{2}$/;

class CartPage extends BasePage {
  get productTitle() {
    return this.page.locator('[data-test="product-title"]');
  }

  get productQuantity() {
    return this.page.locator('[data-test="product-quantity"]');
  }

  get productPrice() {
    return this.page.locator('[data-test="product-price"]');
  }

  get linePrice() {
    return this.page.locator('[data-test="line-price"]');
  }

  get cartTotal() {
    return this.page.locator('[data-test="cart-total"]');
  }

  get deleteButton() {
    return this.page.locator(".btn.btn-danger");
  }

  async verifyCartItem(expectedName, expectedQuantity = 1) {
    await expect(this.productTitle).toContainText(expectedName);
    await expect(this.productQuantity).toHaveValue(String(expectedQuantity));
    await expect(this.productPrice).toHaveText(CURRENCY_PRICE_REGEX);
    await expect(this.linePrice).toHaveText(CURRENCY_PRICE_REGEX);
    await expect(this.cartTotal).toHaveText(CURRENCY_PRICE_REGEX);
  }

  async removeItem() {
    await this.click(this.deleteButton);
  }

  async verifyCartIsEmpty() {
    await expect(this.productTitle).toHaveCount(0);
  }
}

module.exports = CartPage;
