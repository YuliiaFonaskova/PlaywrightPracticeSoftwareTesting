const { expect } = require("@playwright/test");
const BasePage = require("../../core/BasePage");
const routes = require("../routes");

// Matches a numeric price value with two decimal places (e.g. "14.15").
const UNIT_PRICE_REGEX = /^\d+\.\d{2}$/;

class ProductPage extends BasePage {
  get productTitle() {
    return this.page.locator('[data-test="product-name"]');
  }

  get unitPrice() {
    return this.page.locator('[data-test="unit-price"]');
  }

  get productDescription() {
    return this.page.locator('[data-test="product-description"]');
  }

  get outOfStockBadge() {
    return this.page.locator('[data-test="out-of-stock"]');
  }

  get quantityInput() {
    return this.page.locator('[data-test="quantity"]');
  }

  get increaseQuantityButton() {
    return this.page.locator('[data-test="increase-quantity"]');
  }

  get addToCartButton() {
    return this.page.locator('[data-test="add-to-cart"]');
  }

  get cartQuantity() {
    return this.page.locator('[data-test="cart-quantity"]');
  }

  get navCart() {
    return this.page.locator('[data-test="nav-cart"]');
  }

  async verifyProductTitle(productName) {
    await expect(this.productTitle).toHaveText(productName);
  }

  async verifyProductPriceAndDescription() {
    await expect(this.unitPrice).toBeVisible();
    await expect(this.unitPrice).toHaveText(UNIT_PRICE_REGEX);
    await expect(this.productDescription).toBeVisible();
    await expect(this.productDescription).not.toBeEmpty();
  }

  async verifyOutOfStockState(expectedBadgeText) {
    await expect(this.outOfStockBadge).toBeVisible();
    await expect(this.outOfStockBadge).toHaveText(expectedBadgeText);
    await expect(this.addToCartButton).toBeDisabled();
  }

  async setQuantity(quantity) {
    await this.fill(this.quantityInput, String(quantity));
    await expect(this.quantityInput).toHaveValue(String(quantity));
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

  async verifyCartQuantity(expectedQuantity) {
    await expect(this.cartQuantity).toHaveText(String(expectedQuantity));
  }

  async openCart() {
    await this.click(this.navCart);
    await expect(this.page).toHaveURL(routes.checkout);
  }
}

module.exports = ProductPage;
