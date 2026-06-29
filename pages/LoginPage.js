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

  async login(email, password) {
    await this.loginButton.click();
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.submitButton.click();
  }

  async verifyLoginError() {
    await expect(this.errorMessage).toBeVisible();
  }

  async verifySuccessfulLogin() {
    await expect(this.page).toHaveURL(/.*account/);
  }
}

module.exports = LoginPage;
