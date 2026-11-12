const { test, expect } = require("@playwright/test");
const MainPage = require("../business/pages/MainPage");
const testData = require("../fixtures/testData.json");
const messages = require("../fixtures/messages.json");

function expectMatchingTitles(titles, searchRequest) {
  expect(titles.length).toBeGreaterThan(0);

  for (const title of titles) {
    expect(title.toLowerCase()).toContain(searchRequest.trim().toLowerCase());
  }
}

test.describe("Search", () => {
  let mainPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);

    await mainPage.open();
  });

  test("SRCH-01 Search product successfully", async () => {
    const response = await mainPage.searchProduct(
      testData.product.searchRequest
    );
    expect(response.status()).toBe(200);

    const titles = await mainPage.getProductTitlesList();
    expectMatchingTitles(titles, testData.product.searchRequest);
  });

  test("SRCH-02 Search with non-matching query (no results)", async () => {
    const response = await mainPage.searchProduct(
      testData.product.invalidSearchRequest
    );
    expect(response.status()).toBe(200);

    await expect(mainPage.noResultsMessage).toHaveText(
      messages.noProductsFound
    );
    await expect(mainPage.productTitles).toHaveCount(0);
  });

  test("SRCH-03 Search with empty query / reset search filter", async () => {
    await mainPage.searchProduct(testData.product.searchRequest);
    const filteredResults = await mainPage.getProductTitlesList();

    await mainPage.resetSearch();

    await expect(mainPage.searchField).toHaveValue("");
    await expect
      .poll(() => mainPage.productTitles.count())
      .toBeGreaterThan(filteredResults.length);
  });

  test("SRCH-04 Search keyword case-insensitivity verification", async () => {
    const uppercaseQuery = testData.product.searchRequest.toUpperCase();
    const lowercaseQuery = testData.product.searchRequest.toLowerCase();

    await mainPage.searchProduct(uppercaseQuery);
    const uppercaseResults = await mainPage.getProductTitlesList();
    expectMatchingTitles(uppercaseResults, uppercaseQuery);

    await mainPage.searchProduct(lowercaseQuery);
    const lowercaseResults = await mainPage.getProductTitlesList();
    expectMatchingTitles(lowercaseResults, lowercaseQuery);

    expect(uppercaseResults).toEqual(lowercaseResults);
  });
});
