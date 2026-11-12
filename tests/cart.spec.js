const { test, expect } = require("@playwright/test");
const MainPage = require("../business/pages/MainPage");
const ProductPage = require("../business/pages/ProductPage");
const CartPage = require("../business/pages/CartPage");
const testData = require("../fixtures/testData.json");

// Matches a currency price formatted with a leading dollar sign and two decimal places (e.g. "$14.15").
const CURRENCY_PRICE_REGEX = /^\$\d+\.\d{2}$/;

async function expectCartItem(cartPage, expectedName, expectedQuantity = 1) {
  await expect(cartPage.productTitle).toContainText(expectedName);
  await expect(cartPage.productQuantity).toHaveValue(String(expectedQuantity));
  await expect(cartPage.productPrice).toHaveText(CURRENCY_PRICE_REGEX);
  await expect(cartPage.linePrice).toHaveText(CURRENCY_PRICE_REGEX);
  await expect(cartPage.cartTotal).toHaveText(CURRENCY_PRICE_REGEX);
}

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

    await expect.poll(() => productPage.getCartQuantity()).toBeGreaterThan(0);
  });

  test("CART-02 Add multiple quantities of product to cart", async () => {
    await mainPage.openProduct(testData.product.name);

    await productPage.setQuantity(testData.product.multipleQuantity);
    await expect(productPage.quantityInput).toHaveValue(
      String(testData.product.multipleQuantity)
    );
    await productPage.addToCart();

    await expect
      .poll(() => productPage.getCartQuantity())
      .toBe(testData.product.multipleQuantity);
  });

  test("CART-03 View shopping cart and remove item", async () => {
    await mainPage.openProduct(testData.product.name);
    await productPage.addToCart();
    await expect.poll(() => productPage.getCartQuantity()).toBeGreaterThan(0);

    await productPage.openCart();
    await expectCartItem(cartPage, testData.product.name);

    await cartPage.removeItem();
    await expect(cartPage.productTitle).toHaveCount(0);
  });

  test("CART-04 Cart item persistence across page navigation", async () => {
    await mainPage.openProduct(testData.product.name);
    await productPage.addToCart();
    await expect.poll(() => productPage.getCartQuantity()).toBeGreaterThan(0);

    await productPage.openCart();

    await expectCartItem(cartPage, testData.product.name, 1);
  });
});
