# Automation Assignment

This repository contains my automated testing suite for both UI and API test scenarios.

## Project Structure

```
Automation-Assignment/
├── Api Automation/
│   └── api_automation.json
├── Sauce Demo Testing/
│   ├── pageObjects/
│   │   ├── basePage.js
│   │   ├── loginPage.js
│   │   ├── inventoryPage.js
│   │   ├── cartPage.js
│   │   └── checkoutPage.js
│   ├── tests/
│   │   ├── login.spec.js
│   │   └── purchase.spec.js
│   ├── package.json
│   ├── playwright.config.js
│   └── README.md
└── README.md
```

## UI Automation (Playwright)

Target site: https://www.saucedemo.com/

The UI tests are built using Playwright with JavaScript following the Page Object Model (POM) pattern. Tests are set up to run sequentially to avoid state conflicts.

### Setup

Open terminal in the Sauce Demo Testing folder:

```bash
cd "Sauce Demo Testing"
npm install
npx playwright install
```

### Running the Tests

Run all tests:
```bash
npm test
```

Run tests on Chromium:
```bash
npm run test:chromium
```

Run specific test files:
```bash
npm run test:login
npm run test:purchase
```

Run in headed mode (with browser window visible):
```bash
npm run test:headed
```

### Viewing Reports

Playwright HTML report:
```bash
npm run report:html
```

Allure report:
```bash
npm run allure
```

## API Automation (Reqres.in)

Base URL: https://reqres.in/api

The API collection is built in Postman and can be executed either directly in Postman or via Newman in the command line.

### Running with Newman

From the repository root folder, run:

```bash
npx newman run "Api Automation/api_automation.json"
```

### Running with Postman

1. Open Postman.
2. Click Import and choose `Api Automation/api_automation.json`.
3. Run the collection using Postman Collection Runner.

## Test Scenarios Overview

### UI Tests

1. Locked out user: Logs in with locked_out_user and validates the error message.
2. Standard user checkout flow: Logs in with standard_user, resets app state, randomly selects 3 items, verifies items and total price on checkout overview, completes the order, resets app state again, and logs out.
3. Performance glitch user flow: Logs in with performance_glitch_user, resets app state, sorts products Z to A, adds the first product, finishes checkout with verification, resets app state, and logs out.

### API Tests

1. Login and capture token: Submits valid login credentials and saves authToken into collection variables.
2. Get user details: Retrieves user information by user ID and asserts name and email match.
3. Update user profile (PUT): Updates user profile and validates both the updatedAt timestamp and the updated name and job fields.
4. Patch user field (PATCH): Modifies the job field and verifies only that field was updated while other profile fields remained untouched.
5. Bad requests using stored data:
   - Login without password using stored user email (asserts 400 Bad Request).
   - Registration without password using stored user email (asserts 400 Bad Request).
   - Get user with non-existent ID derived from stored user ID (asserts 404 Not Found).
