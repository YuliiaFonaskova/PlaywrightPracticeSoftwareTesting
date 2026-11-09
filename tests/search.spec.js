const { test } = require("@playwright/test");
const MainPage = require("../business/pages/MainPage");
const testData = require("../fixtures/testData.json");
const messages = require("../fixtures/messages.json");

test.describe("Search", () => {
  let mainPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);

    await mainPage.open();
  });

  test("SRCH-01 Search product successfully", async () => {
    await mainPage.searchProduct(testData.product.searchRequest);

    await mainPage.verifySearchResults(testData.product.searchRequest);
  });

  test("SRCH-02 Search with non-matching query (no results)", async () => {
    await mainPage.searchProduct(testData.product.invalidSearchRequest);

    await mainPage.verifyNoSearchResults(messages.noProductsFound);
  });

  test("SRCH-03 Search with empty query / reset search filter", async () => {
    await mainPage.searchProduct(testData.product.searchRequest);
    const filteredResults = await mainPage.getProductTitlesList();

    await mainPage.resetSearch();

    await mainPage.verifyCatalogRestored(filteredResults.length);
  });

  test("SRCH-04 Search keyword case-insensitivity verification", async () => {
    const uppercaseQuery = testData.product.searchRequest.toUpperCase();
    const lowercaseQuery = testData.product.searchRequest.toLowerCase();

    await mainPage.searchProduct(uppercaseQuery);
    await mainPage.verifySearchResults(uppercaseQuery);
    const uppercaseResults = await mainPage.getProductTitlesList();

    await mainPage.searchProduct(lowercaseQuery);
    await mainPage.verifySearchResults(lowercaseQuery);
    const lowercaseResults = await mainPage.getProductTitlesList();

    await mainPage.verifyEqualResults(uppercaseResults, lowercaseResults);
  });
});
