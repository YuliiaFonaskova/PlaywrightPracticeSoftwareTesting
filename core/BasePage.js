class BasePage {
  constructor(page) {
    this.page = page;
  }

  async open(path = "/") {
    await this.page.goto(path);
  }

  async click(locator) {
    await locator.click();
  }

  async fill(locator, value) {
    await locator.fill(value);
  }

  async getText(locator) {
    return locator.textContent();
  }
}

module.exports = BasePage;
