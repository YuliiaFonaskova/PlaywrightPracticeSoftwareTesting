const { expect } = require("@playwright/test");
const routes = require("../routes");
const BasePage = require("../../core/BasePage");

class LoginPage extends BasePage {
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

  // Keep navigation separate so login() only handles the login form.
  async openLoginPage() {
    await this.loginButton.click();
  }

  async login(email, password) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.submitButton.click();
  }

  // Check the exact error text shown after an unsuccessful login.
  async verifyLoginError(expectedMessage) {
    await expect(this.errorMessage).toHaveText(expectedMessage);
  }

  // Confirm that a successful login redirects to the account page.
  async verifySuccessfulLogin() {
    await expect(this.page).toHaveURL(routes.account);
  }
}

module.exports = LoginPage;
