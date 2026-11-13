# Playwright Practice Software Testing

UI test automation project created with Playwright for the **Practice Software Testing** application (https://practicesoftwaretesting.com).

The project follows a layered architecture:

- **Core layer** — reusable framework functionality independent of application-specific logic.
- **Business layer** — Page Objects, application routes, and test data.
- **Tests layer** — automated test scenarios and Playwright configuration.

---

## Technologies

- JavaScript (CommonJS)
- Playwright Test Runner
- Page Object Model (POM)
- Dotenv

---

## Test Scenarios & Coverage Matrix

**Coverage Summary:** **16** automated E2E test scenarios across **4** functional suites (**48** total test executions across Chromium, Firefox, and WebKit).

Detailed test cases, preconditions, step-by-step UI actions, and expansion roadmaps are documented in [docs/test-cases.md](docs/test-cases.md).

Format: **ID** · Priority · Status — Title

#### Authentication (`tests/login.spec.js`)

- **AUTH-01** · P1 · Automated — Successful login with valid credentials
- **AUTH-02** · P1 · Automated — Unsuccessful login with invalid credentials
- **AUTH-03** · P2 · Automated — Validation on empty email and password submission
- **AUTH-04** · P2 · Automated — Validation on malformed email address format
- **AUTH-05** · P3 · Automated — Password input masking and security display

#### Search (`tests/search.spec.js`)

- **SRCH-01** · P1 · Automated — Search products with matching keyword
- **SRCH-02** · P2 · Automated — Search with non-matching query (no results)
- **SRCH-03** · P3 · Automated — Search with empty query / reset search filter
- **SRCH-04** · P2 · Automated — Search keyword case-insensitivity verification

#### Product Details (`tests/product.spec.js`)

- **PRD-01** · P1 · Automated — View product details page and verify title
- **PRD-02** · P2 · Automated — Verify product price and description details
- **PRD-03** · P3 · Automated — Product out-of-stock badge and button status

#### Shopping Cart (`tests/cart.spec.js`)

- **CART-01** · P1 · Automated — Add product to cart from product details page
- **CART-02** · P2 · Automated — Add multiple quantities of product to cart
- **CART-03** · P2 · Automated — View shopping cart and remove item
- **CART-04** · P3 · Automated — Cart item persistence across page navigation

---

## Project Structure

```text
docs/
└── test-cases.md

fixtures/
├── messages.json
├── testData.json
└── users.json

core/
└── BasePage.js

business/
├── pages/
│   ├── CartPage.js
│   ├── LoginPage.js
│   ├── MainPage.js
│   └── ProductPage.js
└── routes.js

tests/
├── cart.spec.js
├── login.spec.js
├── product.spec.js
└── search.spec.js

playwright.config.js
```

---

## Features

- Cross-browser testing:
  - Chromium
  - Firefox
  - WebKit
- Parallel execution with 2 workers
- 2 retries for failed tests
- Headless execution by default
- Test data configured through environment variables in `.env`
- Trace capture on first retry (`on-first-retry`)

---

## Installation

```bash
npm install
npx playwright install
```

Copy `.env.example` to `.env`. Update the values in `.env` if needed.

---

## Test Execution Commands

| Action                        | Command                                   |
| :---------------------------- | :---------------------------------------- |
| Run all tests                 | `npm test`                                |
| Run tests in Chromium         | `npm run test:chrome`                     |
| Run tests in headed mode      | `npm run test:headed`                     |
| Run single spec               | `npx playwright test tests/login.spec.js` |
| Generate and open HTML report | `npm run report`                          |
| Check linting                 | `npm run lint`                            |
| Format code                   | `npm run format`                          |
| Check format (CI)             | `npx prettier --check .`                  |

---

## AI-Assisted Development

This repository is developed and maintained with the assistance of agentic coding workflows (OpenCode / Antigravity):

- **Repository Guidelines (`AGENTS.md`):** Serves as the single source of truth for AI agents regarding architecture layers, CommonJS module constraints, selector rules (`data-test` attributes only), and CI pipeline stages.
- **Model Context Protocol (MCP):** Integrates specialized MCP servers (such as Qase MCP for test management) through sanctioned protocol tools while avoiding unauthorized manual web/API mutations.
- **Agent Guardrails & Pair Programming:**
  - **Zero Unauthorized Execution:** Agents never run builds, installs, or test executions without explicit user authorization.
  - **No Hallucinated Selectors:** Locators, text labels, and UI error states are validated against actual application behavior before adding code.
  - **Quality Gates:** Every agent code iteration is validated with ESLint (`npm run lint`) and Prettier formatting checks (`npx prettier --check . --end-of-line crlf`).
