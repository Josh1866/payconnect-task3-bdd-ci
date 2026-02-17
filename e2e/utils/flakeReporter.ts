
import type { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import fs from 'fs';

class FlakeReporter implements Reporter {
  onTestEnd(test: TestCase, result: TestResult) {
    if (result.status === 'flaky') {
      const logLine = `[FLAKY] ${test.title}\n`;
      fs.appendFileSync('flake-report.log', logLine);
    }
  }
}

export default FlakeReporter;
