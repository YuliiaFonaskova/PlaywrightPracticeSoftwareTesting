const { expect } = require("@playwright/test");
const BasePage = require("./BasePage");

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
  }
  get loginButton() {
    return this.page.locator('[data-test="nav-sign-in"]');
  }

  get emailField() {
    return this.page.locator('[data-test="email"]');
  }

  get passwordField() {
    return this.page.locator('[data-test="password"]');
  }

  get submitButton() {
    return this.page.locator('[data-test="login-submit"]');
  }

  get errorMessage() {
    return this.page.locator('[data-test="login-error"]');
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async fillEmail(email) {
    await this.emailField.fill(email);
  }

  async fillPassword(password) {
    await this.passwordField.fill(password);
  }

  async clickSubmitButton() {
    await this.submitButton.click();
  }

  async login(email, password) {
    await this.clickLoginButton();

    await this.fillEmail(email);

    await this.fillPassword(password);

    await this.clickSubmitButton();
  }

  async verifyLoginError() {
    await expect(this.errorMessage).toBeVisible();
  }

  async verifySuccessfulLogin() {
    await expect(this.page).toHaveURL(/.*account/);
  }
}

module.exports = LoginPage;
