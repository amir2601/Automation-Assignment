import { BasePage } from './basePage.js';

export class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);

    this.pageTitle = page.locator('[data-test="title"]');

    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');

    this.overviewItems = page.locator('[data-test="inventory-item"]');
    this.overviewItemNames = page.locator('[data-test="inventory-item-name"]');
    this.overviewItemPrices = page.locator('[data-test="inventory-item-price"]');
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');

    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.completeText = page.locator('[data-test="complete-text"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');

    this.errorMessage = page.locator('[data-test="error"]');
  }

  async fillCustomerInformation(firstName, lastName, postalCode) {
    await this.enterDataInInputField(this.firstNameInput, firstName);
    await this.enterDataInInputField(this.lastNameInput, lastName);
    await this.enterDataInInputField(this.postalCodeInput, postalCode);
  }

  async clickContinue() {
    await this.clickOnElement(this.continueButton);
  }

  async getOverviewItemNames() {
    return await this.getAllTextsFromElements(this.overviewItemNames);
  }

  parsePrice(priceText) {
    return Number.parseFloat(priceText.replace(/[^0-9.]/g, ''));
  }

  async getOrderSummary() {
    const itemNames = await this.getOverviewItemNames();
    const priceTexts = await this.getAllTextsFromElements(this.overviewItemPrices);
    const subtotalText = await this.getTextFromElement(this.subtotalLabel);
    const taxText = await this.getTextFromElement(this.taxLabel);
    const totalText = await this.getTextFromElement(this.totalLabel);

    return {
      itemNames,
      itemPrices: priceTexts.map((price) => this.parsePrice(price)),
      subtotal: this.parsePrice(subtotalText),
      tax: this.parsePrice(taxText),
      total: this.parsePrice(totalText),
    };
  }

  async getTotalPrice() {
    return this.parsePrice(await this.getTextFromElement(this.totalLabel));
  }

  async clickFinish() {
    await this.clickOnElement(this.finishButton);
  }

  async getCompleteHeaderText() {
    return await this.getTextFromElement(this.completeHeader);
  }

  async getCompleteText() {
    return await this.getTextFromElement(this.completeText);
  }

  async getErrorMessage() {
    return await this.getTextFromElement(this.errorMessage);
  }
}