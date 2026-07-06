const BasePage = require("../../core/BasePage");
const { expect } = require("@playwright/test");

class MainPage extends BasePage {
  get searchField() {
    return this.page.locator('[data-test="search-query"]');
  }

  get searchButton() {
    return this.page.locator('[data-test="search-submit"]');
  }

  get productTitles() {
    return this.page.locator('[data-test="product-name"]');
  }

  async open(path = "/") {
    await super.open(path);
    await expect(this.productTitles.first()).toBeVisible();
  }

  async searchProduct(request) {
    await this.searchField.fill(request);

    await expect(this.searchField).toHaveValue(request);

    await this.searchButton.click();

    // Wait until all network requests triggered by search are completed
    await this.page.waitForLoadState("networkidle");
    await expect(this.productTitles.first()).toBeVisible();
  }

  async verifySearchResults(searchRequest) {
    const titles = await this.productTitles.allTextContents();

    expect(titles.length).toBeGreaterThan(0);

    for (const title of titles) {
      expect(title.toLowerCase()).toContain(searchRequest.toLowerCase());
    }
  }

  async openProduct(productName) {
    const product = this.page.locator('[data-test="product-name"]', {
      hasText: productName,
    });

    await expect(product).toBeVisible();
    await product.click();

    await expect(this.page).toHaveURL(/.*product/);
  }
}
module.exports = MainPage;
