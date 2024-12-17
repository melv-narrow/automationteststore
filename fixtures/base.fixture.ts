import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { logger } from '../utils/logger';

// Declare the types of your fixtures
type MyFixtures = {
    homePage: HomePage;
    loginPage: LoginPage;
    registrationPage: RegistrationPage;
    testLogger: typeof logger;
};

// Extend the base test with your fixtures
export const test = base.extend<MyFixtures>({
    // Define the homePage fixture
    homePage: async ({ page }, use) => {
        logger.debug('Creating HomePage instance');
        const homePage = new HomePage(page);
        await use(homePage);
    },

    // Define the loginPage fixture
    loginPage: async ({ page }, use) => {
        logger.debug('Creating LoginPage instance');
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    // Define the registrationPage fixture
    registrationPage: async ({ page }, use) => {
        logger.debug('Creating RegistrationPage instance');
        const registrationPage = new RegistrationPage(page);
        await use(registrationPage);
    },

    testLogger: async ({}, use) => {
        await use(logger);
    }
});

// Export expect for convenience
export { expect } from '@playwright/test';
