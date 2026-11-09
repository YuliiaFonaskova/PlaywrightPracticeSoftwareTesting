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

  test("AUTH-03 Validation on empty email and password submission", async () => {
    await loginPage.submitEmptyForm();

    await loginPage.verifyEmailError(messages.emailRequired);
    await loginPage.verifyPasswordError(messages.passwordRequired);
  });

  test("AUTH-04 Validation on malformed email address format", async () => {
    await loginPage.login(users.invalid.malformedEmail, users.invalid.password);

    await loginPage.verifyEmailError(messages.invalidEmailFormat);
  });

  test("AUTH-05 Password input masking and security display", async () => {
    await loginPage.enterPassword(users.invalid.password);

    await loginPage.verifyPasswordIsMasked();
  });
});
