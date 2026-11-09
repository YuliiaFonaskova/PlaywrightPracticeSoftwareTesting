const { test } = require("@playwright/test");
const LoginPage = require("../business/pages/LoginPage");
const users = require("../fixtures/users.json");
const messages = require("../fixtures/messages.json");

test.describe("Login", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.openLoginPage();
  });

  test("AUTH-01 Successful login", async () => {
    await loginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);

    await loginPage.verifySuccessfulLogin();
  });

  test("AUTH-02 Unsuccessful login", async () => {
    await loginPage.login(users.invalid.email, users.invalid.password);

    await loginPage.verifyLoginError(messages.loginError);
  });
});
