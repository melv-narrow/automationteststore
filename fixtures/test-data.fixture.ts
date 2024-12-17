import { test as base } from './base.fixture';
import type { RegistrationData } from '../pages/RegistrationPage';
import { generateRandomEmail, generateRandomUsername } from '../tests/utils/helpers';
import { testUsers } from '../tests/utils/test-data';

type TestDataFixtures = {
    getUniqueRegistrationData: () => RegistrationData;
};

// Extend the base test with the new fixtures
export const test = base.extend<TestDataFixtures>({
    getUniqueRegistrationData: [async ({}, use) => {
        // Create the function that generates unique registration data
        const getData = () => ({
            ...testUsers.defaultUser,
            email: generateRandomEmail(),
            loginName: generateRandomUsername()
        });
        
        // Pass the function to the test
        await use(getData);
    }, { auto: true }] // Make this fixture automatically available
});

export { expect } from '@playwright/test';
