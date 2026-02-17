
import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/checkout.html');
  }

  async submitCardPayment() {
    await this.page.getByTestId('payment-method-card').click();
    await this.page.getByTestId('submit-payment').click();
  }
}
