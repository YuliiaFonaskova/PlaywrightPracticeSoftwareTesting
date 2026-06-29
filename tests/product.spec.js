const { test } = require("@playwright/test");

const MainPage = require("../pages/MainPage");
const ProductPage = require("../pages/ProductPage");

test.describe("Product", () => {
  let mainPage;
  let productPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    productPage = new ProductPage(page);

    await mainPage.open();
  });

  test("View product details", async () => {
    await mainPage.openProduct(process.env.PRODUCT_NAME);

    await productPage.verifyProductDetails(process.env.PRODUCT_NAME);
  });
});
