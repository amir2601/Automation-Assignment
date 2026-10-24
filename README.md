# Automation Testing Assessment

Comprehensive end-to-end automation test suite featuring:
1. **UI Automation**: Playwright (JavaScript) with Page Object Model (POM) testing [Sauce Demo](https://www.saucedemo.com/).
2. **API Automation**: Postman Collection executable via Newman CLI testing [Reqres.in](https://reqres.in/).

---

## 📁 Project Structure

```plaintext
Automation-Assignment/
├── Api Automation/
│   └── api_automation.json          # Postman collection (v2.1)
├── Sauce Demo Testing/
│   ├── pageObjects/                 # Page Object Model (POM) classes
│   │   ├── basePage.js
│   │   ├── loginPage.js
│   │   ├── inventoryPage.js
│   │   ├── cartPage.js
│   │   └── checkoutPage.js
│   ├── tests/                       # Playwright test specs
│   │   ├── login.spec.js            # Q1: Locked out user verification
│   │   └── purchase.spec.js         # Q2 & Q3: standard_user & performance_glitch_user journeys
│   ├── package.json
│   ├── playwright.config.js         # Sequential run & reporter configuration
│   └── README.md
└── README.md                        # Main project documentation
```

---

## 🚀 1. UI Automation (Playwright)

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

### Setup Instructions
1. Navigate to the UI automation directory:
   ```bash
   cd "Sauce Demo Testing"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browser binaries:
   ```bash
   npx playwright install
   ```

### Execution Steps
- **Run all UI tests sequentially:**
  ```bash
  npm test
  ```
- **Run on Chromium only:**
  ```bash
  npm run test:chromium
  ```
- **Run specific test files:**
  ```bash
  # Run locked out user login test (Q1)
  npm run test:login

  # Run full purchase journeys (Q2 & Q3)
  npm run test:purchase
  ```
- **Run tests in headed mode (visible browser):**
  ```bash
  npm run test:headed
  ```

### Test Reports
- **Playwright HTML Report:**
  ```bash
  npm run report:html
  ```
- **Allure Report:**
  ```bash
  npm run allure
  ```

---

## ⚡ 2. API Automation (Postman & Newman)

Base URL: `https://reqres.in/api`

### Execution via Newman (Command Line)
You can run the collection directly from the command line using Newman:

1. From the project root, run:
   ```bash
   npx newman run "Api Automation/api_automation.json"
   ```
   *(Or install Newman globally: `npm install -g newman` and run `newman run "Api Automation/api_automation.json"`)*

### Execution via Postman GUI
1. Open the Postman Desktop application.
2. Click **Import** and select `Api Automation/api_automation.json`.
3. Open the **API Automation** collection and click **Run collection**.

---

## 📋 Test Scenarios Covered

### UI Automation
- **Q1 [Mark 10]**: Login with `locked_out_user` and assert the error message:
  `Epic sadface: Sorry, this user has been locked out.`.
- **Q2 [Mark 20]**: Login with `standard_user`, reset App State, dynamically add 3 items to cart, proceed to checkout, verify product names and total price calculation, complete order, reset App State, and log out.
- **Q3 [Mark 10]**: Login with `performance_glitch_user`, reset App State, sort products (Z to A), add first product, complete checkout journey with price & item verification, reset App State, and log out.

### API Automation
- **Q3 [Mark 10]**: `POST /login` with registered credentials and capture `authToken` into collection variable.
- **Q4 [Mark 10]**: `GET /users/{{userId}}` to retrieve user details and assert name and email match; captures user info into variables.
- **Q5 [Mark 10]**: `PUT /users/{{userId}}` to update profile, verifying both the `updatedAt` timestamp and that updated fields (`name`, `job`) match the payload.
- **Q6 [Mark 10]**: `PATCH /users/{{userId}}` to update a single field (`job`), verifying the field updated, `updatedAt` is generated, and other fields (e.g. `name`) were not modified.
- **Q8 [Mark 20]**: Execute multiple bad request scenarios using stored data and assert 4xx status codes:
  1. `POST /login` without password using stored user email (`400 Bad Request`).
  2. `POST /register` without password using stored user email (`400 Bad Request`).
  3. `GET /users/{{invalidUserId}}` using dynamically derived non-existent ID from stored ID (`404 Not Found`).
