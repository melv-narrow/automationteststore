import { test } from '../../fixtures/base.fixture';
import { generateRegistrationData } from '../utils/test-data';

// Only run this test in setup project
test('should register a new user', async ({ page, registrationPage, testLogger }) => {
    try {
        const registrationData = generateRegistrationData();
        testLogger.info('Generated registration data', { 
            email: registrationData.email, 
            username: registrationData.loginName 
        });

        await page.goto('/index.php?rt=account/login');
        await registrationPage.expectRegistrationPageVisible();
        await registrationPage.fillRegistrationForm(registrationData);

        // After successful registration, user is logged in
        // Save the authentication state
        await page.context().storageState({
            path: './playwright/.auth/user.json'
        });

        testLogger.info('Registration test completed successfully');
    } catch (error) {
        testLogger.error('Registration test failed', error);
        throw error;
    }
});
