const { test, expect } = require("@playwright/test");
const MainPage = require("../business/pages/MainPage");
const ProductPage = require("../business/pages/ProductPage");
const testData = require("../fixtures/testData.json");
const messages = require("../fixtures/messages.json");

// Matches a numeric price value with two decimal places (e.g. "14.15").
const UNIT_PRICE_REGEX = /^\d+\.\d{2}$/;

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

    await expect(productPage.productTitle).toHaveText(testData.product.name);
  });

  test("PRD-02 Verify product price and description details", async () => {
    await mainPage.openProduct(testData.product.name);

    await expect(productPage.unitPrice).toBeVisible();
    await expect(productPage.unitPrice).toHaveText(UNIT_PRICE_REGEX);
    await expect(productPage.productDescription).toBeVisible();
    await expect(productPage.productDescription).not.toBeEmpty();
  });

  test("PRD-03 Product out-of-stock badge and button status", async () => {
    await mainPage.openProduct(testData.product.outOfStockName);

    await expect(productPage.outOfStockBadge).toBeVisible();
    await expect(productPage.outOfStockBadge).toHaveText(messages.outOfStock);
    await expect(productPage.addToCartButton).toBeDisabled();
  });
});
