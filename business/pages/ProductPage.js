const BasePage = require("../../core/BasePage");
const routes = require("../routes");

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

  get navHome() {
    return this.page.locator('[data-test="nav-home"]');
  }

  async setQuantity(quantity) {
    await this.fill(this.quantityInput, String(quantity));
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async getCartQuantity() {
    if ((await this.cartQuantity.count()) === 0) {
      return 0;
    }
    return Number(await this.cartQuantity.innerText());
  }

  async navigateHome() {
    await this.click(this.navHome);
    await this.page.waitForURL(routes.home);
  }

  async openCart() {
    await this.click(this.navCart);
    await this.page.waitForURL(routes.checkout);
  }
}

module.exports = ProductPage;
