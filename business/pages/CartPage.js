const BasePage = require("../../core/BasePage");

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

  async removeItem() {
    await this.click(this.deleteButton);
  }
}

module.exports = CartPage;
