import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test('Add a product to cart', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  await products.addFirstProductToCart();
  await products.openCart();

  await expect(page.locator('.inventory_item_name')).toBeVisible();
});