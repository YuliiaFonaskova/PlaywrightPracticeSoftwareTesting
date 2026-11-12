const BasePage = require("../../core/BasePage");
const routes = require("../routes");

class MainPage extends BasePage {
  get searchField() {
    return this.page.locator('[data-test="search-query"]');
  }

  get searchButton() {
    return this.page.locator('[data-test="search-submit"]');
  }

  get searchResetButton() {
    return this.page.locator('[data-test="search-reset"]');
  }

  get productTitles() {
    return this.page.locator('[data-test="product-name"]');
  }

  get searchCompleted() {
    return this.page.locator('[data-test="search_completed"]');
  }

  get noResultsMessage() {
    return this.page.locator('[data-test="no-results"]');
  }

  async open(path = routes.home) {
    await super.open(path);
    await this.productTitles.first().waitFor({ state: "visible" });
  }

  async searchProduct(request) {
    await this.searchField.fill(request);

    const searchResponse = this.page.waitForResponse((response) =>
      response.url().includes(routes.productSearchEndpoint)
    );

    await this.searchButton.click();

    const response = await searchResponse;
    await this.searchCompleted.waitFor({ state: "visible" });
    return response;
  }

  async resetSearch() {
    await this.searchResetButton.click();
  }

  async getProductTitlesList() {
    await this.productTitles.first().waitFor({ state: "visible" });
    const titles = await this.productTitles.allTextContents();
    return titles.map((title) => title.trim());
  }

  async openProduct(productName) {
    const product = this.page.locator('[data-test="product-name"]', {
      hasText: productName,
    });

    await product.waitFor({ state: "visible" });
    await product.click();
    await this.page.waitForURL(routes.product);
  }
}

module.exports = MainPage;
