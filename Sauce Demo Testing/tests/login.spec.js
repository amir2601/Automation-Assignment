import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/loginPage.js';

let loginPage;

test.describe.serial('Sauce Demo - Login', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
  });

  test('Login with locked_out_user', async ({ page }) => {
    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(loginPage.errorMessage).toBeVisible();
    expect(await loginPage.getErrorMessage()).toBe(
      'Epic sadface: Sorry, this user has been locked out.'
    );

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.loginButton).toBeVisible();
  });
});