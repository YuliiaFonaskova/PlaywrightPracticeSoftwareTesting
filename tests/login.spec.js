const { test } = require("@playwright/test");
const LoginPage = require("../business/pages/LoginPage");
const testData = require("../business/testData");

test.describe("Login", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.openLoginPage();
  });

  test("AUTH-01 Successful login", async () => {
    await loginPage.login(testData.user.email, testData.user.password);

    await loginPage.verifySuccessfulLogin();
  });

  test("AUTH-02 Unsuccessful login", async () => {
    await loginPage.login(
      testData.user.invalidEmail,
      testData.user.invalidPassword
    );

    await loginPage.verifyLoginError(testData.messages.loginError);
  });
});
