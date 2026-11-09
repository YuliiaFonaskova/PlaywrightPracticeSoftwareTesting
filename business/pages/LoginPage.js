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

  get emailError() {
    return this.page.locator('[data-test="email-error"]');
  }

  get passwordError() {
    return this.page.locator('[data-test="password-error"]');
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

  async submitEmptyForm() {
    await this.submitButton.click();
  }

  async enterPassword(password) {
    await this.passwordField.fill(password);
  }

  // Check the exact error text shown after an unsuccessful login.
  async verifyLoginError(expectedMessage) {
    await expect(this.errorMessage).toHaveText(expectedMessage);
  }

  async verifyEmailError(expectedMessage) {
    await expect(this.emailError).toHaveText(expectedMessage);
  }

  async verifyPasswordError(expectedMessage) {
    await expect(this.passwordError).toHaveText(expectedMessage);
  }

  async verifyPasswordIsMasked() {
    await expect(this.passwordField).toHaveAttribute("type", "password");
  }

  // Confirm that a successful login redirects to the account page.
  async verifySuccessfulLogin() {
    await expect(this.page).toHaveURL(routes.account);
  }
}

module.exports = LoginPage;
