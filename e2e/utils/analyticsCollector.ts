
import { Page } from '@playwright/test';

export class AnalyticsCollector {
  private events: any[] = [];

  constructor(private page: Page) {}

  async start() {
    await this.page.route('**/api/analytics', async route => {
      this.events.push({
        source: 'internal',
        body: route.request().postData(),
        timestamp: Date.now()
      });
      await route.continue();
    });

    await this.page.route('https://api.segment.io/v1/track', async route => {
      this.events.push({
        source: 'segment',
        body: route.request().postData(),
        timestamp: Date.now()
      });
      await route.continue();
    });
  }

  async waitForEvent(predicate: (event: any) => boolean, timeout = 5000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      const match = this.events.find(predicate);
      if (match) return match;
      await this.page.waitForTimeout(100);
    }
    throw new Error('Analytics event not received within timeout');
  }

  getAllEvents() {
    return this.events;
  }
}
