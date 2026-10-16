export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigateToUrl(url) {
    await this.page.goto(url);
  }

  async clickOnElement(locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  async enterDataInInputField(locator, data) {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(data);
  }

  async getTextFromElement(locator) {
    await locator.waitFor({ state: 'visible' });
    return (await locator.innerText()).trim();
  }

  async selectOptionFromDropdown(locator, option) {
    await locator.waitFor({ state: 'visible' });
    await locator.selectOption(option);
  }

  async getElementCount(locator) {
    return await locator.count();
  }

  async getAllTextsFromElements(locator) {
    await locator.first().waitFor({ state: 'visible' });
    const texts = await locator.allInnerTexts();
    return texts.map((text) => text.trim());
  }

  async isElementVisible(locator) {
    return await locator.isVisible();
  }

  async waitForElementState(locator, state) {
    await locator.waitFor({ state });
  }

  async waitForUrl(url) {
    await this.page.waitForURL(url);
  }
}