import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/loginPage.js';
import { InventoryPage } from '../pageObjects/inventoryPage.js';
import { CartPage } from '../pageObjects/cartPage.js';
import { CheckoutPage } from '../pageObjects/checkoutPage.js';

const LOGIN_URL = 'https://www.saucedemo.com/';
const ITEMS_TO_ADD = 3;

function pickRandomItems(allItemNames, count) {
  const shuffled = allItemNames.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

test.describe.serial('Sauce Demo - Purchase journey', () => {
  let loginPage;
  let inventoryPage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.navigateToLoginPage();
  });

  test('Full purchase journey with standard_user', async ({ page }) => {
    const customer = { firstName: 'MD Amir Hossin', lastName: 'Riad', postalCode: '1229' };

    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.pageTitle).toHaveText('Products');

    await inventoryPage.resetAppState();
    expect(await inventoryPage.getCartItemCount()).toBe('0');

    const availableItemNames = await inventoryPage.getInventoryItemNames();
    const itemsToBuy = pickRandomItems(availableItemNames, ITEMS_TO_ADD);
    expect(itemsToBuy).toHaveLength(ITEMS_TO_ADD);
    expect(new Set(itemsToBuy).size).toBe(ITEMS_TO_ADD);

    for (const itemName of itemsToBuy) {
      await inventoryPage.addItemToCart(itemName);
    }
    expect(await inventoryPage.getCartItemCount()).toBe(String(itemsToBuy.length));

    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/cart\.html/);
    await expect(cartPage.pageTitle).toHaveText('Your Cart');
    const cartItemNames = await cartPage.getCartItemNames();
    expect(cartItemNames.slice().sort()).toEqual(itemsToBuy.slice().sort());
    expect(await cartPage.getCartItemCount()).toBe(itemsToBuy.length);

    await cartPage.clickCheckout();
    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await expect(checkoutPage.pageTitle).toHaveText('Checkout: Your Information');
    await checkoutPage.fillCustomerInformation(
      customer.firstName,
      customer.lastName,
      customer.postalCode
    );
    await checkoutPage.clickContinue();

    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(checkoutPage.pageTitle).toHaveText('Checkout: Overview');
    const order = await checkoutPage.getOrderSummary();

    expect(order.itemNames.slice().sort()).toEqual(itemsToBuy.slice().sort());

    const expectedSubtotal = Number(
      order.itemPrices.reduce((sum, price) => sum + price, 0).toFixed(2)
    );
    expect(order.subtotal).toBeCloseTo(expectedSubtotal, 2);
    expect(order.total).toBeCloseTo(Number((order.subtotal + order.tax).toFixed(2)), 2);
    expect(await checkoutPage.getTotalPrice()).toBeCloseTo(order.total, 2);

    await checkoutPage.clickFinish();
    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(checkoutPage.pageTitle).toHaveText('Checkout: Complete!');
    expect(await checkoutPage.getCompleteHeaderText()).toBe('Thank you for your order!');

    await inventoryPage.resetAppState();
    expect(await inventoryPage.getCartItemCount()).toBe('0');

    await inventoryPage.logout();
    await expect(page).toHaveURL(LOGIN_URL);
  });

  test('Purchase journey with performance_glitch_user', async ({ page }) => {
    test.slow();

    await loginPage.login('performance_glitch_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.pageTitle).toHaveText('Products');

    await inventoryPage.resetAppState();
    expect(await inventoryPage.getCartItemCount()).toBe('0');

    await inventoryPage.sortProductsBy('za');
    const firstItemName = await inventoryPage.getFirstInventoryItemName();

    await inventoryPage.addFirstItemToCart();
    expect(await inventoryPage.getCartItemCount()).toBe('1');

    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/cart\.html/);
    await expect(cartPage.pageTitle).toHaveText('Your Cart');
    expect(await cartPage.getCartItemNames()).toEqual([firstItemName]);

    await cartPage.clickCheckout();
    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await expect(checkoutPage.pageTitle).toHaveText('Checkout: Your Information');
    await checkoutPage.fillCustomerInformation('MD Amir Hossin', 'Riad', '1229');
    await checkoutPage.clickContinue();

    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(checkoutPage.pageTitle).toHaveText('Checkout: Overview');
    const order = await checkoutPage.getOrderSummary();

    expect(order.itemNames).toEqual([firstItemName]);
    expect(order.subtotal).toBeCloseTo(order.itemPrices[0], 2);
    expect(order.total).toBeCloseTo(Number((order.subtotal + order.tax).toFixed(2)), 2);
    expect(await checkoutPage.getTotalPrice()).toBeCloseTo(order.total, 2);

    await checkoutPage.clickFinish();
    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(checkoutPage.pageTitle).toHaveText('Checkout: Complete!');
    expect(await checkoutPage.getCompleteHeaderText()).toBe('Thank you for your order!');

    await inventoryPage.resetAppState();
    expect(await inventoryPage.getCartItemCount()).toBe('0');

    await inventoryPage.logout();
    await expect(page).toHaveURL(LOGIN_URL);
  });
});