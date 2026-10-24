# Sauce Demo UI Automation

Playwright test automation for https://www.saucedemo.com/

## Overview

This project implements end-to-end UI tests using Playwright and the Page Object Model (POM) pattern. It covers user authentication, dynamic item selection, cart management, and checkout verification.

## Setup

Install required packages and browser binaries:

```bash
npm install
npx playwright install
```

## Running Tests

Run all tests sequentially:
```bash
npm test
```

Run tests on Chromium:
```bash
npm run test:chromium
```

Run individual test files:
```bash
npm run test:login
npm run test:purchase
```

Run in headed mode:
```bash
npm run test:headed
```

## Test Reports

Generate and open Playwright report:
```bash
npm run report:html
```

Generate and open Allure report:
```bash
npm run allure
```
