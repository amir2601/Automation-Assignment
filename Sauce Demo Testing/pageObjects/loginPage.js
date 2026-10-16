import { BasePage } from './basePage.js';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async navigateToLoginPage() {
    await this.navigateToUrl('/');
  }

  async login(username, password) {
    await this.enterDataInInputField(this.usernameInput, username);
    await this.enterDataInInputField(this.passwordInput, password);
    await this.clickOnElement(this.loginButton);
  }

  async getErrorMessage() {
    return await this.getTextFromElement(this.errorMessage);
  }

  async isErrorMessageVisible() {
    return await this.isElementVisible(this.errorMessage);
  }
}