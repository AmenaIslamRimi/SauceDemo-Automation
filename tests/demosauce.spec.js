// @ts-check
import { test, expect } from '@playwright/test';
import { assert } from 'console';

// test('has title', async ({ page }) => {
//   await page.goto('https://www.saucedemo.com/');
//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Swag Labs/);
//   // wait for 5 seconds
//   await page.waitForTimeout(5000);
// });

test('login test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.waitForTimeout(2000);
  // Login with valid username and password
  await page.fill('input[id="user-name"]', 'standard_user');
  await page.waitForTimeout(2000);
  await page.fill('input[id="password"]', 'secret_sauce');
  await page.waitForTimeout(2000);
  // Click the login button
  await page.click('input[id="login-button"]');
  // Verify that we have logged in by checking the URL
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  // wait for 5 seconds
  await page.waitForTimeout(3000);
  // click a product 
  await page.click('text=Sauce Labs Backpack');
  await page.waitForTimeout(3000);
  // add the product to cart 
  await page.click('button[id="add-to-cart"]');
  await page.waitForTimeout(3000);
  // assert is added to cart by showing remove button
  const removeButton = await page.$('button[id="remove"]');
  assert(removeButton !== null, 'Product was not added to cart');
  // go to cart to verify product name
  await page.click('a[class="shopping_cart_link"]');
  await page.waitForTimeout(3000);
  const productName = await page.textContent('div[class="inventory_item_name"]');
  expect(productName).toBe('Sauce Labs Backpack');
  // log out 
  await page.click('button[id="react-burger-menu-btn"]');
  await page.waitForTimeout(2000);
  await page.click('a[id="logout_sidebar_link"]');
  await page.waitForTimeout(3000);
});
