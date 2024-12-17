# Playwright Quick Reference Guide

## Authentication
- **Global Auth**: Save state in `auth.setup.ts`
```ts
test('auth setup', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#user', 'username');
  await page.fill('#pass', 'password');
  await page.click('button[type=submit]');
  await page.context().storageState({ path: 'auth.json' });
});
```
- **Per-Worker**: Use unique accounts for parallel tests

## Best Practices
1. Test user-visible behavior
2. Keep tests isolated
3. Mock external dependencies
4. Use built-in assertions
```ts
await expect(page.getByText('Welcome')).toBeVisible();
```

## Fixtures
- **Built-in**: `page`, `context`, `browser`, `request`
- **Custom**:
```ts
test.extend({
  loggedIn: async ({ page }, use) => {
    await page.goto('/login');
    await page.fill('#user', 'test');
    await use(page);
  }
});
```

## Locators (in order of preference)
1. **Role**:
```ts
page.getByRole('button', { name: 'Submit' })
```
2. **Label**:
```ts
page.getByLabel('Password')
```
3. **Text**:
```ts
page.getByText('Welcome')
```
4. **TestId**:
```ts
page.getByTestId('submit-btn')
```

## Page Objects
```ts
class LoginPage {
  constructor(private page) {
    this.userInput = page.getByLabel('Username');
    this.passInput = page.getByLabel('Password');
    this.submitBtn = page.getByRole('button', { name: 'Login' });
  }

  async login(user, pass) {
    await this.userInput.fill(user);
    await this.passInput.fill(pass);
    await this.submitBtn.click();
  }
}
```

## Global Setup
```ts
// playwright.config.ts
export default {
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
};
```

## Logging
```ts
const browser = await chromium.launch({
  logger: {
    isEnabled: (name, severity) => true,
    log: (name, severity, msg) => console.log(msg)
  }
});
```

## TestInfo Usage
```ts
test('example', async ({ page }, testInfo) => {
  // Screenshot
  await page.screenshot({
    path: testInfo.outputPath('shot.png')
  });
  
  // Attach file
  await testInfo.attach('name', {
    path: 'file.txt',
    contentType: 'text/plain'
  });
});
```

## Key Tips
- Use `await expect()` for assertions
- Chain locators for precision
- Implement proper error handling
- Use test isolation
- Mock external services
- Keep tests focused and simple
