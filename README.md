
# PayConnect - Task 3 FINAL (BDD + Robust Analytics + Retry + Flake Detection)

## Includes:
- Playwright-BDD (proper Gherkin binding)
- Page Object Model
- Payment API mocking
- Robust AnalyticsCollector (out-of-order safe)
- Environment-aware retry strategy
- Flake detection reporter
- GitHub Actions CI with artifact upload

## Retry Strategy
- Local: 1 retry
- CI: 2 retries
- Flaky tests logged automatically

## Run Locally
npm install
npx playwright install
npx playwright test
