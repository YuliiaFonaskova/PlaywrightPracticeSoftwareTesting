const { test } = require("@playwright/test");
const MainPage = require("../business/pages/MainPage");
const ProductPage = require("../business/pages/ProductPage");
const CartPage = require("../business/pages/CartPage");
const testData = require("../fixtures/testData.json");

test.describe("Cart", () => {
  let mainPage;
  let productPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);

    await mainPage.open();
  });

  test("CART-01 Add product to cart", async () => {
    await mainPage.openProduct(testData.product.name);

    await productPage.addToCart();

    await productPage.verifyCartIsNotEmpty();
  });

  test("CART-02 Add multiple quantities of product to cart", async () => {
    await mainPage.openProduct(testData.product.name);

    await productPage.setQuantity(testData.product.multipleQuantity);
    await productPage.addToCart();

    await productPage.verifyCartQuantity(testData.product.multipleQuantity);
  });

  test("CART-03 View shopping cart and remove item", async () => {
    await mainPage.openProduct(testData.product.name);
    await productPage.addToCart();
    await productPage.verifyCartIsNotEmpty();

    await productPage.openCart();
    await cartPage.verifyCartItem(testData.product.name);

    await cartPage.removeItem();
    await cartPage.verifyCartIsEmpty();
  });

  test("CART-04 Cart item persistence across page reload", async () => {
    await mainPage.openProduct(testData.product.name);
    await productPage.addToCart();
    await productPage.verifyCartQuantity(1);

    await productPage.reloadPage();

    await productPage.verifyCartQuantity(1);
  });
});
