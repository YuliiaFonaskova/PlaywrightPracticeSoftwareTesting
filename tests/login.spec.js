const { test } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");

test.describe("Login", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.open();
  });

  test("Successful login", async ({ page }) => {
    await loginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);

    await loginPage.verifySuccessfulLogin();
  });

  test("Unsuccessful login", async () => {
    await loginPage.login(
      process.env.INVALID_EMAIL,
      process.env.INVALID_PASSWORD,
    );

    await loginPage.verifyLoginError();
  });
});
