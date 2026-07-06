const { test } = require("@playwright/test");
const MainPage = require("../business/pages/MainPage");
const ProductPage = require("../business/pages/ProductPage");
const testData = require("../business/testData");

test.describe("Product", () => {
  let mainPage;
  let productPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    productPage = new ProductPage(page);

    await mainPage.open();
  });

  test("View product details", async () => {
    await mainPage.openProduct(testData.product.name);

    await productPage.verifyProductDetails(testData.product.name);
  });
});
