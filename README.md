# Playwright Practice Software Testing

UI test automation project created with Playwright for the **Practice Software Testing** application.

The project follows a layered architecture:

- **Core layer** — reusable framework functionality that is not related to a specific application.
- **Business layer** — Page Objects, application routes, and test data.
- **Tests layer** — automated test scenarios and Playwright configuration.

## Technologies

- JavaScript
- Playwright
- Page Object Model (POM)
- Dotenv

## Test Scenarios

- ✅ Successful login
- ✅ Unsuccessful login
- ✅ Search product
- ✅ View product title
- ✅ Add product to cart

## Project Structure

```text
core/
└── BasePage.js

business/
├── pages/
│   ├── LoginPage.js
│   ├── MainPage.js
│   └── ProductPage.js
├── routes.js
└── testData.js

tests/
├── cart.spec.js
├── login.spec.js
├── product.spec.js
└── search.spec.js

playwright.config.js
```

## Features

- Cross-browser testing:
  - Chromium
  - Firefox
  - WebKit
- Parallel execution with 2 workers
- 2 retries for failed tests
- Headless execution by default
- Test data configured through environment variables in `.env`

## Installation

```bash
npm install
npx playwright install
```

Copy `.env.example` to `.env`. Update the values in `.env` if needed.

## Run all tests

```bash
npm test
```

## Run tests in Chromium

```bash
npm run test:chrome
```

## Run tests in headed mode

```bash
npm run test:headed
```

## Generate and open the HTML report

```bash
npm run report
```
