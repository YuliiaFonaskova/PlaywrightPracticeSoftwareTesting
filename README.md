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

Detailed test cases, preconditions, step-by-step UI actions, and expansion roadmaps are documented in [docs/test-cases.md](docs/test-cases.md).

| ID          | Suite           | Title                                             | Priority | Automation Status  | Spec File               |
| :---------- | :-------------- | :------------------------------------------------ | :------- | :----------------- | :---------------------- |
| **AUTH-01** | Authentication  | Successful login with valid credentials           | P1       | Automated          | `tests/login.spec.js`   |
| **AUTH-02** | Authentication  | Unsuccessful login with invalid credentials       | P1       | Automated          | `tests/login.spec.js`   |
| **AUTH-03** | Authentication  | Validation on empty email and password submission | P2       | Manual (Candidate) | —                       |
| **AUTH-04** | Authentication  | Validation on malformed email address format      | P2       | Manual (Candidate) | —                       |
| **AUTH-05** | Authentication  | Password input masking and security display       | P3       | Manual             | —                       |
| **SRCH-01** | Search          | Search products with matching keyword             | P1       | Automated          | `tests/search.spec.js`  |
| **SRCH-02** | Search          | Search with non-matching query (no results)       | P2       | Manual (Candidate) | —                       |
| **SRCH-03** | Search          | Search with empty query / reset search filter     | P3       | Manual             | —                       |
| **SRCH-04** | Search          | Search keyword case-insensitivity verification    | P2       | Manual (Candidate) | —                       |
| **PRD-01**  | Product Details | View product details page and verify title        | P1       | Automated          | `tests/product.spec.js` |
| **PRD-02**  | Product Details | Verify product price and description details      | P2       | Manual (Candidate) | —                       |
| **PRD-03**  | Product Details | Product out-of-stock badge and button status      | P3       | Manual             | —                       |
| **CART-01** | Shopping Cart   | Add product to cart from product details page     | P1       | Automated          | `tests/cart.spec.js`    |
| **CART-02** | Shopping Cart   | Add multiple quantities of product to cart        | P2       | Manual (Candidate) | —                       |
| **CART-03** | Shopping Cart   | View shopping cart and remove item                | P2       | Manual (Candidate) | —                       |
| **CART-04** | Shopping Cart   | Cart item persistence across page reload          | P3       | Manual             | —                       |

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
