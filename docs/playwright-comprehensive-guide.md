# Comprehensive Playwright Testing Guide

## Table of Contents
1. [Authentication](#authentication)
2. [Best Practices](#best-practices)
3. [Fixtures](#fixtures)
4. [Global Setup and Teardown](#global-setup-and-teardown)
5. [Locators](#locators)
6. [Logging](#logging)
7. [Page Object Models](#page-object-models)
8. [Test Information](#test-information)

## Authentication

### Key Concepts
- Tests run in isolated browser contexts
- Authentication state can be saved and reused
- Multiple authentication strategies available

### Authentication Strategies
1. **Global Authentication (Recommended for tests without server-side state)**
   ```typescript
   // auth.setup.ts
   import { test as setup } from '@playwright/test';
   
   setup('authenticate', async ({ page }) => {
     await page.goto('https://example.com/login');
     await page.fill('[name=username]', 'user');
     await page.fill('[name=password]', 'pass');
     await page.click('button[type=submit]');
     await page.context().storageState({ path: './auth.json' });
   });
   ```

2. **Per-Worker Authentication (For tests modifying server-side state)**
   - One account per parallel worker
   - Suitable for tests that modify shared state

## Best Practices

### Core Principles
1. **Test User-Visible Behavior**
   - Focus on end-user interactions
   - Avoid testing implementation details

2. **Test Isolation**
   - Each test should be independent
   - Use fresh browser context per test
   - Clean up test data after each test

3. **Avoid Testing Third-Party Dependencies**
   - Mock external services
   - Use network interception for APIs

### Code Organization
```typescript
// Good Practice
test('user can submit form', async ({ page }) => {
  await page.getByLabel('Username').fill('user');
  await page.getByLabel('Password').fill('pass');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Welcome')).toBeVisible();
});
```

## Fixtures

### Built-in Fixtures
- `page`: Isolated page for each test
- `context`: Browser context
- `browser`: Shared browser instance
- `request`: API testing context

### Custom Fixtures
```typescript
// fixtures.ts
import { test as base } from '@playwright/test';

export const test = base.extend({
  loggedInPage: async ({ page }, use) => {
    await page.goto('/login');
    await page.fill('#username', 'user');
    await page.fill('#password', 'pass');
    await page.click('#submit');
    await use(page);
  }
});
```

## Global Setup and Teardown

### Project Dependencies (Recommended)
```typescript
// playwright.config.ts
export default defineConfig({
  projects: [
    {
      name: 'setup',
      testMatch: /global\.setup\.ts/
    },
    {
      name: 'tests',
      dependencies: ['setup']
    }
  ]
});
```

## Locators

### Recommended Locators
1. **Role-based (Preferred)**
   ```typescript
   page.getByRole('button', { name: 'Submit' })
   ```

2. **Text-based**
   ```typescript
   page.getByText('Welcome back!')
   ```

3. **Label-based**
   ```typescript
   page.getByLabel('Password')
   ```

4. **Test ID-based**
   ```typescript
   page.getByTestId('submit-button')
   ```

### Best Practices
- Prefer user-facing attributes
- Avoid CSS selectors and XPath
- Use chaining for precision
- Implement auto-waiting

## Logging

### Configuration
```typescript
const browser = await chromium.launch({
  logger: {
    isEnabled: (name, severity) => name === 'api',
    log: (name, severity, message, args) => console.log(`${name} ${message}`)
  }
});
```

### Severity Levels
- verbose
- info
- warning
- error

## Page Object Models

### Implementation
```typescript
export class LoginPage {
  constructor(private page: Page) {}

  readonly usernameInput = this.page.getByLabel('Username');
  readonly passwordInput = this.page.getByLabel('Password');
  readonly submitButton = this.page.getByRole('button', { name: 'Login' });

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

### Usage
```typescript
test('user can login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('user', 'pass');
});
```

## Test Information

### TestInfo Object
- Access test metadata
- Attach files and screenshots
- Control test timeouts
- Handle test status

### Example Usage
```typescript
test('example test', async ({ page }, testInfo) => {
  // Attach screenshot
  const screenshot = await page.screenshot();
  await testInfo.attach('screenshot', {
    body: screenshot,
    contentType: 'image/png'
  });

  // Use output path
  await page.screenshot({
    path: testInfo.outputPath('screenshot.png')
  });
});
```

## Additional Resources
- [Playwright Official Documentation](https://playwright.dev/docs/intro)
- [API Reference](https://playwright.dev/docs/api/class-playwright)
- [Test Examples](https://github.com/microsoft/playwright/tree/main/examples)
