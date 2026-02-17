import { Given, When, Then } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { CheckoutPage } from '../pages/CheckoutPage';

let checkout: CheckoutPage;

Given('the checkout page is loaded', async ({ page }) => {
  checkout = new CheckoutPage(page);
  await checkout.navigate();
});

When('the customer submits a valid card payment', async ({ page }) => {
  await page.route('**/api/payment', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'success',
        transactionId: 'txn_55555'
      })
    });
  });

  await checkout.submitCardPayment();
});

Then('the payment confirmation is displayed', async () => {
  await expect(await checkout.confirmationVisible()).toBeVisible();
});

Then('the analytics event {string} is sent', async ({ page }, eventName: string) => {
  let analyticsCaptured = false;

  await page.route('**/analytics', async route => {
    const body = route.request().postData();
    if (body?.includes(eventName)) {
      analyticsCaptured = true;
    }
    await route.continue();
  });

  // Wait briefly to handle flakiness
  await page.waitForTimeout(1000);

  expect(analyticsCaptured).toBeTruthy();
});
