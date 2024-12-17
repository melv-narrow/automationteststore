import { Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    
    // Locators
    private readonly loginRegisterLink;

    constructor(page: Page) {
        this.page = page;
        
        // Initialize locators
        this.loginRegisterLink = this.page.getByRole('link', { name: 'Login or register' });
    }

    // Actions
    async goto() {
        await this.page.goto('https://automationteststore.com/');
    }

    async clickLoginOrRegister() {
        await this.loginRegisterLink.click();
    }
}
