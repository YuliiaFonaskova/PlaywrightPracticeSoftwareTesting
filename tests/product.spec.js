const { test } = require("@playwright/test");
const MainPage = require("../business/pages/MainPage");
const ProductPage = require("../business/pages/ProductPage");
const testData = require("../fixtures/testData.json");
const messages = require("../fixtures/messages.json");

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

  test("PRD-02 Verify product price and description details", async () => {
    await mainPage.openProduct(testData.product.name);

    await productPage.verifyProductPriceAndDescription();
  });

  test("PRD-03 Product out-of-stock badge and button status", async () => {
    await mainPage.openProduct(testData.product.outOfStockName);

    await productPage.verifyOutOfStockState(messages.outOfStock);
  });
});
