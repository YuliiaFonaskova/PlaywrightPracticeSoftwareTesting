const { test } = require("@playwright/test");
const MainPage = require("../pages/MainPage");

test.describe("Search", () => {
  let mainPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);

    await mainPage.open();
  });

  test("Search product successfully", async () => {
    await mainPage.searchProduct(process.env.SEARCH_REQUEST);

    await mainPage.verifySearchResults(process.env.SEARCH_REQUEST);
  });
});
