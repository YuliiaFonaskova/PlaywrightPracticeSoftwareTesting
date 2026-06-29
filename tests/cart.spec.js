const { test } = require("@playwright/test");
const MainPage = require("../pages/MainPage");
const ProductPage = require("../pages/ProductPage");

test.describe("Cart", () => {
  let mainPage;
  let productPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    productPage = new ProductPage(page);

    await mainPage.open();
  });

  test("Add product to cart", async () => {
    await mainPage.openProduct(process.env.PRODUCT_NAME);

    await productPage.addToCart();

    await productPage.verifyCartIsNotEmpty();
  });
});
