import { BasePage } from './basePage.js';

export class InventoryPage extends BasePage {
  constructor(page) {
    super(page);

    this.pageTitle = page.locator('[data-test="title"]');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.closeMenuButton = page.locator('#react-burger-cross-btn');
    this.resetAppStateLink = page.locator('[data-test="reset-sidebar-link"]');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');

    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.inventoryItemNames = page.locator('[data-test="inventory-item-name"]');
    this.inventoryItemPrices = page.locator('[data-test="inventory-item-price"]');
  }

  async isMenuOpen() {
    return await this.page.evaluate(() => {
      const menuWrap = document.querySelector('.bm-menu-wrap');
      if (!menuWrap) {
        return false;
      }
      return menuWrap.getAttribute('aria-hidden') === 'false';
    });
  }

  async waitForMenuToOpen() {
    await this.page.waitForFunction(
      () => {
        const menuWrap = document.querySelector('.bm-menu-wrap');
        if (!menuWrap || menuWrap.getAttribute('aria-hidden') !== 'false') {
          return false;
        }
        const firstItem = menuWrap.querySelector('.bm-item');
        return !!firstItem && firstItem.getBoundingClientRect().width > 0;
      },
      undefined,
      { timeout: 10 * 1000 }
    );
  }

  async waitForMenuToClose() {
    await this.page.waitForFunction(
      () => {
        const menuWrap = document.querySelector('.bm-menu-wrap');
        return !menuWrap || menuWrap.getAttribute('aria-hidden') === 'true';
      },
      undefined,
      { timeout: 10 * 1000 }
    );
  }

  async openMenu() {
    if (await this.isMenuOpen()) {
      return;
    }

    for (let attempt = 0; attempt < 3; attempt++) {
      await this.clickOnElement(this.menuButton);
      try {
        await this.waitForMenuToOpen();
        return;
      } catch {}
    }

    throw new Error('Unable to open the Sauce Demo hamburger menu.');
  }

  async closeMenu() {
    if (!(await this.isMenuOpen())) {
      return;
    }
    await this.clickOnElement(this.closeMenuButton);
    await this.waitForMenuToClose();
  }

  async resetAppState() {
    await this.openMenu();
    await this.clickOnElement(this.resetAppStateLink);
    await this.closeMenu();
  }

  async logout() {
    await this.openMenu();
    await this.clickOnElement(this.logoutLink);
    await this.waitForUrl('https://www.saucedemo.com/');
  }

  async sortProductsBy(sortOption) {
    await this.selectOptionFromDropdown(this.sortDropdown, sortOption);
  }

  async getInventoryItemNames() {
    return await this.getAllTextsFromElements(this.inventoryItemNames);
  }

  async getFirstInventoryItemName() {
    return await this.getTextFromElement(this.inventoryItemNames.first());
  }

  async addItemToCart(itemName) {
    const item = this.inventoryItems.filter({ hasText: itemName }).first();
    await this.clickOnElement(item.getByRole('button', { name: 'Add to cart' }));
  }

  async addFirstItemToCart() {
    const firstItem = this.inventoryItems.first();
    await this.clickOnElement(firstItem.getByRole('button', { name: 'Add to cart' }));
  }

  async removeItemFromCart(itemName) {
    const item = this.inventoryItems.filter({ hasText: itemName }).first();
    await this.clickOnElement(item.getByRole('button', { name: 'Remove' }));
  }

  async getCartItemCount() {
    if (!(await this.isElementVisible(this.cartBadge))) {
      return '0';
    }
    return await this.getTextFromElement(this.cartBadge);
  }

  async goToCart() {
    await this.clickOnElement(this.cartLink);
  }
}