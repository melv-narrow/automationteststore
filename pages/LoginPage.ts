import { Page, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    
    // Locators
    private readonly continueButton;
    private readonly accountLoginText;

    constructor(page: Page) {
        this.page = page;
        
        // Initialize locators
        this.continueButton = this.page.getByRole('button', { name: ' Continue' });
        this.accountLoginText = this.page.getByText('Account Login', { exact: true });
    }

    // Assertions
    async expectLoginPageVisible() {
        await expect(this.accountLoginText).toBeVisible();
    }

    // Actions
    async clickContinueToRegister() {
        await this.continueButton.click();
    }
}
