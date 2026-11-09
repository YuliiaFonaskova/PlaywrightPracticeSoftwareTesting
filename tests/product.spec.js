const { test } = require("@playwright/test");
const MainPage = require("../business/pages/MainPage");
const ProductPage = require("../business/pages/ProductPage");
const testData = require("../fixtures/testData.json");

test.describe("Product", () => {
  let mainPage;
  let productPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    productPage = new ProductPage(page);

    await mainPage.open();
  });

  test("PRD-01 View product title", async () => {
    await mainPage.openProduct(testData.product.name);

    await productPage.verifyProductTitle(testData.product.name);
  });
});
