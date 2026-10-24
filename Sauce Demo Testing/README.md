# Sauce Demo - Playwright UI Automation

Automated end-to-end testing suite for [Sauce Demo](https://www.saucedemo.com/) using Playwright and Page Object Model (POM) pattern.

## 🛠️ Features
- **Page Object Model (POM)**: Dedicated page classes for Login, Inventory, Cart, and Checkout pages.
- **Dynamic Product Selection**: Randomized item selection logic for purchase journeys.
- **Sequential Execution**: Configured with `fullyParallel: false` and `workers: 1` as per assessment requirements.
- **Multi-Reporting**: Integrated Playwright HTML and Allure reporting.

## 📦 Setup & Installation
```bash
# Install dependencies
npm install

# Install browsers
npx playwright install
```

## 🧪 Running Tests
```bash
# Run all tests sequentially
npm test

# Run tests on Chromium only
npm run test:chromium

# Run specific specs
npm run test:login
npm run test:purchase

# Headed mode
npm run test:headed
```

## 📊 Viewing Reports
```bash
# Playwright HTML Report
npm run report:html

# Allure Report
npm run allure
```
