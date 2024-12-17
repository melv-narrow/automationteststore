import { test as base } from './base.fixture';
import { Page, BrowserContext } from '@playwright/test';
import { logger } from '../utils/logger';

// Auth-specific fixtures
type AuthFixtures = {
    loggedInState: string;
    authenticatedPage: Page;
};

export const test = base.extend<AuthFixtures>({
    loggedInState: async ({}, use) => {
        await use('./auth.json');
    },

    // Provide an authenticated page
    authenticatedPage: async ({ browser, loggedInState }, use) => {
        logger.info('Setting up authenticated page');
        let context: BrowserContext | undefined;
        let page: Page | undefined;
        
        try {
            // Create new context with auth state
            context = await browser.newContext({ storageState: loggedInState });
            page = await context.newPage();

            logger.debug('Loading stored authentication state');
            await page.context().addCookies([
                // Add your authentication cookies here
            ]);

            logger.debug('Verifying authentication state');
            await page.goto('/account');
            const isLoggedIn = await page.isVisible('#customer_menu_top');
            
            if (!isLoggedIn) {
                logger.warn('Authentication state verification failed');
                throw new Error('Failed to verify authentication state');
            }

            logger.info('Authentication setup completed successfully');
            await use(page);
        } catch (error) {
            logger.error('Authentication setup failed', error);
            throw error;
        } finally {
            // Clean up resources
            if (page) await page.close();
            if (context) await context.close();
        }
    },
});

export { expect } from '@playwright/test';
