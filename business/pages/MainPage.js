const BasePage = require("../../core/BasePage");
const routes = require("../routes");
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

  async open(path = routes.home) {
    await super.open(path);
    await expect(this.productTitles.first()).toBeVisible();
  }

  async searchProduct(request) {
    await this.searchField.fill(request);

    await expect(this.searchField).toHaveValue(request);

    const searchResponse = this.page.waitForResponse((response) =>
      response.url().includes(routes.productSearchEndpoint)
    );

    await this.searchButton.click();

    const response = await searchResponse;
    expect(response.status()).toBe(200);

    await expect(this.productTitles.first()).toBeVisible();
  }

  async verifySearchResults(searchRequest) {
    const titles = await this.productTitles.allTextContents();

    expect(titles.length).toBeGreaterThan(0);

    for (const title of titles) {
      expect(title.trim().toLowerCase()).toContain(
        searchRequest.trim().toLowerCase()
      );
    }
  }

  async openProduct(productName) {
    const product = this.page.locator('[data-test="product-name"]', {
      hasText: productName,
    });

    await expect(product).toHaveCount(1);
    await expect(product).toBeVisible();
    await product.click();

    await expect(this.page).toHaveURL(routes.product);
  }
}
module.exports = MainPage;
