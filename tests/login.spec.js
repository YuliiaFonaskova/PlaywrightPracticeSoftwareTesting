const { test, expect } = require("@playwright/test");
const LoginPage = require("../business/pages/LoginPage");
const routes = require("../business/routes");
const users = require("../fixtures/users.json");
const messages = require("../fixtures/messages.json");

test.describe("Login", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.openLoginPage();
  });

  test("AUTH-01 Successful login", async ({ page }) => {
    await loginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);

    await expect(page).toHaveURL(routes.account);
  });

  test("AUTH-02 Unsuccessful login", async () => {
    await loginPage.login(users.invalid.email, users.invalid.password);

    await expect(loginPage.errorMessage).toHaveText(messages.loginError);
  });

  test("AUTH-03 Validation on empty email and password submission", async () => {
    await loginPage.submitEmptyForm();

    await expect(loginPage.emailError).toHaveText(messages.emailRequired);
    await expect(loginPage.passwordError).toHaveText(messages.passwordRequired);
  });

  test("AUTH-04 Validation on malformed email address format", async () => {
    await loginPage.login(users.invalid.malformedEmail, users.invalid.password);

    await expect(loginPage.emailError).toHaveText(messages.invalidEmailFormat);
  });

  test("AUTH-05 Password input masking and security display", async () => {
    await loginPage.enterPassword(users.invalid.password);

    await expect(loginPage.passwordField).toHaveAttribute("type", "password");
  });
});
