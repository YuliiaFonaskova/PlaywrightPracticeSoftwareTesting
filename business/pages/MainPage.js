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

    await expect(this.searchCompleted).toBeVisible();
  }

  async resetSearch() {
    await this.searchResetButton.click();
    await expect(this.searchField).toHaveValue("");
  }

  async verifyCatalogRestored(filteredCount) {
    await expect
      .poll(async () => await this.productTitles.count())
      .toBeGreaterThan(filteredCount);
  }

  async verifySearchResults(searchRequest) {
    await expect(this.productTitles.first()).toBeVisible();

    const titles = await this.productTitles.allTextContents();

    expect(titles.length).toBeGreaterThan(0);

    for (const title of titles) {
      expect(title.trim().toLowerCase()).toContain(
        searchRequest.trim().toLowerCase()
      );
    }
  }

  async verifyNoSearchResults(expectedMessage) {
    await expect(this.noResultsMessage).toHaveText(expectedMessage);
    await expect(this.productTitles).toHaveCount(0);
  }

  async getProductTitlesList() {
    await expect(this.productTitles.first()).toBeVisible();
    const titles = await this.productTitles.allTextContents();
    return titles.map((title) => title.trim());
  }

  async verifyEqualResults(firstResults, secondResults) {
    expect(firstResults).toEqual(secondResults);
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
