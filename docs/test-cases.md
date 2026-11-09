# Test Cases & Coverage Matrix

This document contains test cases for the **Practice Software Testing** web application, along with the current test coverage and test automation roadmap.

---

## 1. Coverage Matrix

| ID          | Suite           | Title                                             | Priority | Type                  | Automation Status  | Spec File               |
| :---------- | :-------------- | :------------------------------------------------ | :------- | :-------------------- | :----------------- | :---------------------- |
| **AUTH-01** | Authentication  | Successful login with valid credentials           | P1       | Positive / Functional | Automated          | `tests/login.spec.js`   |
| **AUTH-02** | Authentication  | Unsuccessful login with invalid credentials       | P1       | Negative / Functional | Automated          | `tests/login.spec.js`   |
| **AUTH-03** | Authentication  | Validation on empty email and password submission | P2       | Negative / Validation | Manual (Candidate) | —                       |
| **AUTH-04** | Authentication  | Validation on malformed email address format      | P2       | Negative / Validation | Manual (Candidate) | —                       |
| **AUTH-05** | Authentication  | Password input masking and security display       | P3       | Security / UI         | Manual             | —                       |
| **SRCH-01** | Search          | Search products with matching keyword             | P1       | Positive / Functional | Automated          | `tests/search.spec.js`  |
| **SRCH-02** | Search          | Search with non-matching query (no results)       | P2       | Negative / Functional | Manual (Candidate) | —                       |
| **SRCH-03** | Search          | Search with empty query / reset search filter     | P3       | Edge / Functional     | Manual             | —                       |
| **SRCH-04** | Search          | Search keyword case-insensitivity verification    | P2       | Functional            | Manual (Candidate) | —                       |
| **PRD-01**  | Product Details | View product details page and verify title        | P1       | Positive / Functional | Automated          | `tests/product.spec.js` |
| **PRD-02**  | Product Details | Verify product price and description details      | P2       | Functional / UI       | Manual (Candidate) | —                       |
| **PRD-03**  | Product Details | Product out-of-stock badge and button status      | P3       | Edge / Functional     | Manual             | —                       |
| **CART-01** | Shopping Cart   | Add product to cart from product details page     | P1       | Positive / Functional | Automated          | `tests/cart.spec.js`    |
| **CART-02** | Shopping Cart   | Add multiple quantities of product to cart        | P2       | Functional            | Manual (Candidate) | —                       |
| **CART-03** | Shopping Cart   | View shopping cart and remove item                | P2       | Functional            | Manual (Candidate) | —                       |
| **CART-04** | Shopping Cart   | Cart item persistence across page reload          | P3       | Functional / State    | Manual             | —                       |

---

## 2. Test Cases

### Suite: Authentication (AUTH)

#### AUTH-01: Successful login with valid credentials

- **Priority:** P1
- **Type:** Positive / Functional
- **Automation Status:** Automated (`tests/login.spec.js`)
- **Preconditions:** Registered user account exists with known valid credentials.

**Steps:**

| #   | Action                                                 | Expected result                                                                 |
| :-- | :----------------------------------------------------- | :------------------------------------------------------------------------------ |
| 1   | Navigate to Home page.                                 | Home page is loaded and product catalog is displayed.                           |
| 2   | Click on the "Sign in" link in the top navigation bar. | User is navigated to the Login page with Email address and Password fields.     |
| 3   | Enter valid email in the "Email address" field.        | Value is entered into the email input field.                                    |
| 4   | Enter valid password in the "Password" field.          | Value is entered into the password field (masked).                              |
| 5   | Click the "Login" button.                              | Form is submitted, user is authenticated and redirected to the My Account page. |

**Expected result:** User is successfully logged in and redirected to the Account page (`/account`).

---

#### AUTH-02: Unsuccessful login with invalid credentials

- **Priority:** P1
- **Type:** Negative / Functional
- **Automation Status:** Automated (`tests/login.spec.js`)
- **Preconditions:** User is on the Home page.

**Steps:**

| #   | Action                                                               | Expected result                                                                                             |
| :-- | :------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| 1   | Navigate to Home page.                                               | Home page is displayed.                                                                                     |
| 2   | Click on the "Sign in" link in the top navigation bar.               | User is navigated to the Login page.                                                                        |
| 3   | Enter an invalid or unregistered email in the "Email address" field. | Value is populated in the field.                                                                            |
| 4   | Enter an invalid password in the "Password" field.                   | Value is populated in the field.                                                                            |
| 5   | Click the "Login" button.                                            | Login fails; user remains on the Login page and an error message is displayed: "Invalid email or password". |

**Expected result:** An error message "Invalid email or password" is shown, and the user is not authenticated.

---

#### AUTH-03: Validation on empty email and password submission

- **Priority:** P2
- **Type:** Negative / Validation
- **Automation Status:** Manual (Candidate)
- **Preconditions:** User is on the Login page.

**Steps:**

| #   | Action                                             | Expected result                                                                                         |
| :-- | :------------------------------------------------- | :------------------------------------------------------------------------------------------------------ |
| 1   | Navigate to the Login page.                        | Login form is displayed with empty Email address and Password inputs.                                   |
| 2   | Leave "Email address" and "Password" fields empty. | Fields remain blank.                                                                                    |
| 3   | Click the "Login" button.                          | Form submission is prevented; validation error hints appear indicating email and password are required. |

**Expected result:** Validation messages are displayed informing the user that required fields cannot be empty.

---

#### AUTH-04: Validation on malformed email address format

- **Priority:** P2
- **Type:** Negative / Validation
- **Automation Status:** Manual (Candidate)
- **Preconditions:** User is on the Login page.

**Steps:**

| #   | Action                                                                                  | Expected result                                                   |
| :-- | :-------------------------------------------------------------------------------------- | :---------------------------------------------------------------- |
| 1   | Navigate to the Login page.                                                             | Login form is displayed.                                          |
| 2   | Enter an improperly formatted email (e.g. `user@invalid`) in the "Email address" field. | Text is entered in the email input.                               |
| 3   | Enter any password in the "Password" field.                                             | Text is entered in the password field.                            |
| 4   | Click the "Login" button.                                                               | Validation error is displayed indicating an invalid email format. |

**Expected result:** Browser or form validation prevents submission and displays an invalid email format warning.

---

#### AUTH-05: Password input masking and security display

- **Priority:** P3
- **Type:** Security / UI
- **Automation Status:** Manual
- **Preconditions:** User is on the Login page.

**Steps:**

| #   | Action                                     | Expected result                                                                           |
| :-- | :----------------------------------------- | :---------------------------------------------------------------------------------------- |
| 1   | Navigate to the Login page.                | Login form is displayed.                                                                  |
| 2   | Type characters into the "Password" field. | Characters are masked (displayed as dots or asterisks).                                   |
| 3   | Inspect the field type in the browser.     | Input element has type `password` protecting sensitive credentials from shoulder surfing. |

**Expected result:** The password field properly masks entered sensitive text.

---

### Suite: Product Search (SRCH)

#### SRCH-01: Search products with matching keyword

- **Priority:** P1
- **Type:** Positive / Functional
- **Automation Status:** Automated (`tests/search.spec.js`)
- **Preconditions:** Products exist in the catalog matching the search query (e.g. "hammer").

**Steps:**

| #   | Action                                                         | Expected result                                                                   |
| :-- | :------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| 1   | Navigate to Home page.                                         | Catalog of available products is rendered.                                        |
| 2   | Enter search term (e.g. "hammer") into the search input field. | Search field contains the entered keyword.                                        |
| 3   | Click the "Search" button.                                     | Search results are loaded and displayed.                                          |
| 4   | Verify product titles displayed in the results grid.           | Every returned product item title contains the search keyword (case-insensitive). |

**Expected result:** All displayed search result items contain the searched term in their titles.

---

#### SRCH-02: Search with non-matching query (no results)

- **Priority:** P2
- **Type:** Negative / Functional
- **Automation Status:** Manual (Candidate)
- **Preconditions:** User is on the Home page.

**Steps:**

| #   | Action                                                                                  | Expected result                                           |
| :-- | :-------------------------------------------------------------------------------------- | :-------------------------------------------------------- |
| 1   | Navigate to Home page.                                                                  | Home page catalog is displayed.                           |
| 2   | Enter a non-existent search term (e.g. "nonexistentproductxyz123") in the search field. | Search field contains the entered text.                   |
| 3   | Click the "Search" button.                                                              | Search is performed; no product items match the criteria. |

**Expected result:** Product list is empty or a descriptive "There are no products found." message is displayed.

---

#### SRCH-03: Search with empty query / reset search filter

- **Priority:** P3
- **Type:** Edge / Functional
- **Automation Status:** Manual
- **Preconditions:** Search results or Home page is displayed.

**Steps:**

| #   | Action                                                                       | Expected result                                   |
| :-- | :--------------------------------------------------------------------------- | :------------------------------------------------ |
| 1   | Navigate to Home page with search term already entered.                      | Filtered results are shown.                       |
| 2   | Clear the search input field or click the clear/reset button (if available). | Search field becomes empty.                       |
| 3   | Click the "Search" button or submit empty search.                            | Full product catalog is restored without filters. |

**Expected result:** Default product catalog is fully displayed.

---

#### SRCH-04: Search keyword case-insensitivity verification

- **Priority:** P2
- **Type:** Functional
- **Automation Status:** Manual (Candidate)
- **Preconditions:** Products exist matching term regardless of case (e.g. "HAMMER" vs "hammer").

**Steps:**

| #   | Action                                          | Expected result                                               |
| :-- | :---------------------------------------------- | :------------------------------------------------------------ |
| 1   | Navigate to Home page.                          | Home page is displayed.                                       |
| 2   | Search using uppercase keyword (e.g. "HAMMER"). | Search results list products containing "Hammer" or "hammer". |
| 3   | Search using lowercase keyword (e.g. "hammer"). | Same list of product results is returned.                     |

**Expected result:** Search results are consistent regardless of character casing.

---

### Suite: Product Details (PRD)

#### PRD-01: View product details page and verify title

- **Priority:** P1
- **Type:** Positive / Functional
- **Automation Status:** Automated (`tests/product.spec.js`)
- **Preconditions:** Product is visible on the Home page catalog.

**Steps:**

| #   | Action                                                                  | Expected result                                                             |
| :-- | :---------------------------------------------------------------------- | :-------------------------------------------------------------------------- |
| 1   | Navigate to Home page.                                                  | Catalog of products is displayed.                                           |
| 2   | Locate the desired product (e.g. "Hammer") and click on its card title. | User is redirected to the dedicated Product Details page (`/product/<id>`). |
| 3   | Verify the product title displayed on the details page.                 | Product title matches the clicked product name.                             |

**Expected result:** Product Details page loads correctly and displays the expected product title.

---

#### PRD-02: Verify product price and description details

- **Priority:** P2
- **Type:** Functional / UI
- **Automation Status:** Manual (Candidate)
- **Preconditions:** User is on the Product Details page.

**Steps:**

| #   | Action                                               | Expected result                                                                     |
| :-- | :--------------------------------------------------- | :---------------------------------------------------------------------------------- |
| 1   | Navigate to the Product Details page of any product. | Product page is displayed.                                                          |
| 2   | Inspect the price element.                           | Product price is formatted with currency symbol and decimal values (e.g. `$12.99`). |
| 3   | Inspect the product description block.               | Product description text is non-empty and readable.                                 |

**Expected result:** Product price and description information are visible, formatted, and non-empty.

---

#### PRD-03: Product out-of-stock badge and button status

- **Priority:** P3
- **Type:** Edge / Functional
- **Automation Status:** Manual
- **Preconditions:** Catalog contains a product marked out of stock.

**Steps:**

| #   | Action                                            | Expected result                                          |
| :-- | :------------------------------------------------ | :------------------------------------------------------- |
| 1   | Open the details page of an out-of-stock product. | Product Details page is displayed.                       |
| 2   | Check the stock availability badge.               | "Out of stock" indicator is shown.                       |
| 3   | Attempt to click the "Add to cart" button.        | Button is disabled or prevents adding unavailable items. |

**Expected result:** Out-of-stock items cannot be added to the cart, with clear visual indicator.

---

### Suite: Shopping Cart (CART)

#### CART-01: Add product to cart from product details page

- **Priority:** P1
- **Type:** Positive / Functional
- **Automation Status:** Automated (`tests/cart.spec.js`)
- **Preconditions:** Product is available and user is on the Product Details page.

**Steps:**

| #   | Action                                                       | Expected result                                                        |
| :-- | :----------------------------------------------------------- | :--------------------------------------------------------------------- |
| 1   | Navigate to Home page.                                       | Catalog is loaded.                                                     |
| 2   | Click on a product name (e.g. "Hammer") to open its details. | Product Details page opens.                                            |
| 3   | Click the "Add to cart" button.                              | Product is added to the cart; confirmation toast/message is displayed. |
| 4   | Verify the cart icon badge in the top navigation bar.        | Cart counter increments and displays a quantity greater than zero.     |

**Expected result:** The item is successfully added to the cart and the navigation cart counter increases.

---

#### CART-02: Add multiple quantities of product to cart

- **Priority:** P2
- **Type:** Functional
- **Automation Status:** Manual (Candidate)
- **Preconditions:** User is on the Product Details page.

**Steps:**

| #   | Action                                                             | Expected result                           |
| :-- | :----------------------------------------------------------------- | :---------------------------------------- |
| 1   | Navigate to a Product Details page.                                | Product Details page is displayed.        |
| 2   | Increase the quantity input to 3 (using '+' button or typing '3'). | Quantity value changes to 3.              |
| 3   | Click the "Add to cart" button.                                    | Product is added with selected quantity.  |
| 4   | Check the cart icon in the navigation bar.                         | Cart badge shows quantity increased by 3. |

**Expected result:** Multiple units of a product can be added to the cart simultaneously.

---

#### CART-03: View shopping cart and remove item

- **Priority:** P2
- **Type:** Functional
- **Automation Status:** Manual (Candidate)
- **Preconditions:** Shopping cart contains at least one item.

**Steps:**

| #   | Action                                                  | Expected result                                                     |
| :-- | :------------------------------------------------------ | :------------------------------------------------------------------ |
| 1   | Click the cart icon / "Cart" in the navigation bar.     | User is navigated to the Shopping Cart page.                        |
| 2   | Verify item list, unit price, quantity, and line total. | Added product details match selected values.                        |
| 3   | Click the remove/delete icon next to the product row.   | Product row is removed from the table; total recalculates to $0.00. |

**Expected result:** Product is removed from the cart, and the cart view updates accordingly.

---

#### CART-04: Cart item persistence across page reload

- **Priority:** P3
- **Type:** Functional / State
- **Automation Status:** Manual
- **Preconditions:** At least one item has been added to the shopping cart.

**Steps:**

| #   | Action                                  | Expected result                                                                    |
| :-- | :-------------------------------------- | :--------------------------------------------------------------------------------- |
| 1   | Add a product to the cart.              | Cart badge shows item count (e.g. 1).                                              |
| 2   | Reload the browser page (F5 / Refresh). | Page finishes reloading.                                                           |
| 3   | Check the cart badge counter.           | Cart badge retains previous count (state is preserved in local storage / session). |

**Expected result:** Cart items and count persist after browser page refresh.

---

## 3. Known Issues and Gaps

1. **Test Environment Dependency:**
   - Tests rely on a live public demo instance (`https://practicesoftwaretesting.com`). Network latency, rate limiting, or backend downtime can cause intermittent failures.
2. **Dynamic Catalog Changes:**
   - Default product names (e.g. "Hammer") and search results are subject to changes in the demo database. Environment variables (`PRODUCT_NAME`, `SEARCH_REQUEST`) must align with active catalog contents.
3. **Cart Badge Timing:**
   - The cart quantity badge updates asynchronously after adding an item to the cart. Test implementation currently uses polling (`expect.poll`) to avoid race conditions.
4. **Validation Coverage Gap:**
   - Current automated suites only cover positive login and generic invalid credential error. Form field validation (empty inputs, regex email checks) is not yet covered by automated tests.
5. **No End-to-End Checkout Flow:**
   - Checkout progression (Billing address, Payment method, Order confirmation) is currently unautomated.

---

## 4. What to Automate Next

1. **`AUTH-03` & `AUTH-04` (Login Form Validation):**
   - High value, low maintenance: automated checks for empty fields and malformed email errors.
2. **`SRCH-02` (Negative Search Scenario):**
   - Verifying empty state behavior or "No products found" message when searching for non-existent items.
3. **`CART-03` (Shopping Cart View & Removal):**
   - Navigating to the cart page, verifying items in the table, and removing an item to confirm total updates.
4. **Checkout Workflow (End-to-End):**
   - Multi-step checkout pipeline: Cart → Sign In → Address Information → Payment Method → Order Confirmation.
