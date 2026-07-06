const { test } = require("@playwright/test");
const MainPage = require("../business/pages/MainPage");
const testData = require("../business/testData");

test.describe("Search", () => {
  let mainPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);

    await mainPage.open();
  });

  test("Search product successfully", async () => {
    await mainPage.searchProduct(testData.product.searchRequest);

    await mainPage.verifySearchResults(testData.product.searchRequest);
  });
});
