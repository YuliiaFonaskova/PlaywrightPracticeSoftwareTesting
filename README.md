# Playwright Practice Software Testing

UI test automation project created with Playwright for the **Practice Software Testing** application.

## Technologies

* JavaScript
* Playwright
* Page Object Model (POM)
* Dotenv

## Test Scenarios

* ✅ Successful login
* ✅ Unsuccessful login
* ✅ Search product
* ✅ View product details
* ✅ Add product to cart

## Project Structure

```
pages/
    BasePage.js
    LoginPage.js
    MainPage.js
    ProductPage.js

tests/
    login.spec.js
    search.spec.js
    product.spec.js
    cart.spec.js

playwright.config.js
```

## Features

* Cross-browser testing

  * Chromium
  * Firefox
  * WebKit

* Parallel execution (2 workers)

* Retry failed tests (2 retries)

* Headless execution

* Environment variables stored in `.env`

## Installation

```bash
npm install
```

## Run all tests

```bash
npx playwright test
```

## Run tests in Chromium

```bash
npx playwright test --project=chromium
```

## Run tests in headed mode

```bash
npx playwright test --headed
```

## Generate HTML report

```bash
npx playwright show-report
```
