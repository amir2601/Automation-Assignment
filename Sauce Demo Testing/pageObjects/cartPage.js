import { BasePage } from './basePage.js';

export class CartPage extends BasePage {
  constructor(page) {
    super(page);

    this.pageTitle = page.locator('[data-test="title"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.cartItemNames = page.locator('[data-test="inventory-item-name"]');
    this.cartItemQuantities = page.locator('[data-test="item-quantity"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async getCartItemNames() {
    return await this.getAllTextsFromElements(this.cartItemNames);
  }

  async getCartItemCount() {
    return await this.getElementCount(this.cartItems);
  }

  async clickCheckout() {
    await this.clickOnElement(this.checkoutButton);
  }

  async clickContinueShopping() {
    await this.clickOnElement(this.continueShoppingButton);
  }
}