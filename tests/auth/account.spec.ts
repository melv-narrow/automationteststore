import { test } from '../../fixtures/base.fixture';
import { expect } from '@playwright/test';

test('should be logged in', async ({ page, testLogger }) => {
    try {
        testLogger.info('Starting account verification test');
        
        // Go to account page
        await page.goto('/index.php?rt=account/account');
        
        // Verify we're logged in by checking for account dashboard elements
        await expect(page.locator('h1').getByText('My Account')).toBeVisible();
        await expect(page.getByRole('link', { name: '   Account Dashboard' })).toBeVisible();
        
        testLogger.info('Account verification test completed successfully');
    } catch (error) {
        testLogger.error('Account verification test failed', error);
        throw error;
    }
});
