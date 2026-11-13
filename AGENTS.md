# AGENTS.md

## Quick Start

```bash
npm install          # install Node deps
npx playwright install --with-deps   # install browsers + system deps (Linux only)
cp .env.example .env  # .env is gitignored — tests will fail without it
npm test
```

## Architecture

Three layers, import style is CommonJS (`require`/`module.exports`):

| Layer    | Directory                              | Purpose                                                                       |
| -------- | -------------------------------------- | ----------------------------------------------------------------------------- |
| Core     | `core/BasePage.js`                     | Low-level helpers (open, click, fill, getText)                                |
| Business | `business/pages/*.js`, `business/*.js` | Page Objects (locators, actions, state getters) + centralized `routes.js`     |
| Fixtures | `fixtures/*.json`                      | Static test data (messages, testData, invalid users)                          |
| Tests    | `tests/*.spec.js`                      | Playwright test specs and all `expect` assertions                             |
| Docs     | `docs/test-cases.md`                   | Manual test cases & coverage matrix mapped by ID (`AUTH-01`, `SRCH-01`, etc.) |

Every Page Object extends `BasePage`, whose constructor takes a Playwright `page` fixture.

## Design Rules & Conventions

1. **No Assertions in Page Objects (Strict POM):**
   - **Page Objects (`business/pages/*.js`)** must ONLY expose locators (`get ...()`), user actions, state retrieval methods (e.g., `getCartQuantity()`, `getProductTitlesList()`), and synchronization (`locator.waitFor()`, `page.waitForURL()`, `page.waitForResponse()`). **Never import or use `expect` inside Page Objects.**
   - **Tests (`tests/*.spec.js`)** own all verifications (`expect`, `expect.poll`). If multiple tests in a spec share the same group of assertions, use a local helper function (`expectCartItem`, `expectMatchingTitles`) inside that spec file.
2. **Synchronization & Waits:**
   - Never use `page.waitForTimeout()` (hard waits) or inline magic timeout numbers (e.g., `{ timeout: 15000 }`) in tests.
   - Always register `page.waitForResponse()` **before** triggering the action (such as `.click()`) to avoid race conditions.
3. **Selectors & Routes:**
   - Prefer `[data-test="..."]` attributes for locators.
   - Store all URL paths, route regexes, and API endpoint substrings in `business/routes.js` rather than hardcoding them in Page Objects or specs.
4. **Traceability:**
   - Prefix every test title with its ID from `docs/test-cases.md` (e.g., `AUTH-01`, `SRCH-01`, `PRD-01`, `CART-01`). When adding new automated tests, update the coverage matrix in `docs/test-cases.md` and `README.md`.

## Key Quirk: ESLint vs. Module System

ESLint config (`eslint.config.js`) declares `sourceType: "module"`, but the codebase uses CommonJS (`require`/`module.exports`). The Node globals plugin prevents lint failures, but the mismatch means an agent could "fix" imports to `import`/`export` and break runtime. **Do not convert to ESM.**

## Commands

| Action            | Command                                   |
| ----------------- | ----------------------------------------- |
| Run all tests     | `npm test` (or `npx playwright test`)     |
| Run one spec      | `npx playwright test tests/login.spec.js` |
| Run one browser   | `npx playwright test --project=chromium`  |
| Run headed        | `npm run test:headed` (`--headed`)        |
| Show HTML report  | `npm run report`                          |
| Lint              | `npm run lint`                            |
| Format (write)    | `npm run format`                          |
| Check format (CI) | `npm run format:check`                    |
| Lint + Format     | `npm run check`                           |

## Pre-commit Hook & CI Order

A Git pre-commit hook (`.husky/pre-commit`) automatically runs `npx lint-staged` (`eslint --fix` and `prettier --write`) on all staged files before every commit.

`.github/workflows/playwright.yml` runs: `npm run lint` → `npx prettier --check .` → `npx playwright test`. GitHub Actions requires secrets (`USER_EMAIL`, `USER_PASSWORD`) — CI will fail without them.

## Test Data

Valid user credentials come from environment variables (`USER_EMAIL`, `USER_PASSWORD`, read via `dotenv.config()` at top of `playwright.config.js`). Static test data, invalid credentials, and error messages are stored in `fixtures/*.json` and imported directly into specs. Do not hardcode values in specs.

## Qase MCP

Use the Qase MCP exclusively for all interaction with Qase. Do not access Qase through its web UI, REST API directly, CLI, or other integrations. Use MCP tools for both reads and writes, and follow their tool documentation before calling them. Do not create or modify Qase data unless the user explicitly asks for that change.

## Playwright Config Notes

- `baseURL`: `https://practicesoftwaretesting.com` (set in config; use `page.goto("/")` in `BasePage.open`)
- `retries`: 2 — flaky tests auto-retry
- `workers`: 2 — parallel execution
- `trace`: `on-first-retry` — traces captured on retry; view via `npx playwright show-report`
- `headless`: true
