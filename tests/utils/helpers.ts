import { Page } from '@playwright/test';

/**
 * Generate a random email address
 */
export function generateRandomEmail(): string {
    const timestamp = new Date().getTime();
    return `test.user.${timestamp}@example.com`;
}

/**
 * Generate a random username
 */
export function generateRandomUsername(): string {
    const timestamp = new Date().getTime();
    return `testuser${timestamp}`;
}

/**
 * Wait for navigation and network idle
 */
export async function waitForPageLoad(page: Page): Promise<void> {
    await Promise.all([
        page.waitForLoadState('networkidle'),
        page.waitForLoadState('domcontentloaded')
    ]);
}
