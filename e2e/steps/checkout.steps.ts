
import { Given, When, Then } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { CheckoutPage } from '../pages/CheckoutPage';
import { AnalyticsCollector } from '../utils/analyticsCollector';

let checkout: CheckoutPage;
let collector: AnalyticsCollector;

Given('analytics tracking is enabled', async ({ page }) => {
  collector = new AnalyticsCollector(page);
  await collector.start();
});

Given('the checkout page is loaded', async ({ page }) => {
  checkout = new CheckoutPage(page);
  await checkout.navigate();
});

When('the customer submits a valid card payment', async ({ page }) => {
  await page.route('**/api/payment', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ status: 'success', transactionId: 'txn_final_001' })
    });
  });

  await checkout.submitCardPayment();
});

Then('the analytics event {string} is eventually sent', async (_ctx, eventName: string) => {
  const event = await collector.waitForEvent(
    e => e.body?.includes(eventName),
    5000
  );
  expect(event).toBeTruthy();
});
