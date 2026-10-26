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

| Layer    | Directory                                     | Purpose                                                                      |
| -------- | --------------------------------------------- | ---------------------------------------------------------------------------- |
| Core     | `core/BasePage.js`                            | Low-level helpers (open, click, fill, getText)                               |
| Business | `business/pages/*.js`, `business/testData.js` | Page Objects + selectors via `data-test` attributes; test data from env vars |
| Tests    | `tests/*.spec.js`                             | Playwright test specs                                                        |

Every Page Object extends `BasePage`, whose constructor takes a Playwright `page` fixture.

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
| Check format (CI) | `npx prettier --check .`                  |

## CI Order

`.github/workflows/playwright.yml` runs: `npm run lint` → `npx prettier --check .` → `npx playwright test`. GitHub Actions requires secrets (`USER_EMAIL`, `USER_PASSWORD`, `SEARCH_REQUEST`, `PRODUCT_NAME`, `INVALID_EMAIL`, `INVALID_PASSWORD`) — the repo has no defaults; CI will fail without them.

The Jenkinsfile (`Jenkinsfile`) sets env vars inline (no secrets) and runs `npm ci` → `npx playwright install` → `npm test`.

## Test Data

All credentials and test values come from environment variables (read via `dotenv.config()` at top of `playwright.config.js`, then consumed by `business/testData.js`). Do not hardcode values in specs.

## Qase MCP

Use the Qase MCP exclusively for all interaction with Qase. Do not access Qase through its web UI, REST API directly, CLI, or other integrations. Use MCP tools for both reads and writes, and follow their tool documentation before calling them. Do not create or modify Qase data unless the user explicitly asks for that change.

## Playwright Config Notes

- `baseURL`: `https://practicesoftwaretesting.com` (set in config; use `page.goto("/")` in `BasePage.open`)
- `retries`: 2 — flaky tests auto-retry
- `workers`: 2 — parallel execution
- `trace`: `on-first-retry` — traces captured on retry; view via `npx playwright show-report`
- `headless`: true
