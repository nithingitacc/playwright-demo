import { Page } from '@playwright/test';

export class ProductsPage {
  constructor(private page: Page) {}

  async isLoggedIn() {
    return this.page.locator('.title').isVisible();
  }

  async addFirstProductToCart() {
    await this.page.click('button.btn_inventory');
  }

  async openCart() {
    await this.page.click('.shopping_cart_link');
  }
}
