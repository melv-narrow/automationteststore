import { test as base } from '@playwright/test';
import { logger } from '../../utils/logger';

// Export the logger
export { logger };

// Extend the base test to include logging
export const test = base.extend({
    testLogger: async ({}, use, testInfo) => {
        // Log test start
        logger.info(`Starting test: ${testInfo.title}`, {
            testFile: testInfo.file,
            project: testInfo.project.name
        });

        // Provide the logger to the test
        await use(logger);

        // Log test end
        logger.info(`Finished test: ${testInfo.title}`, {
            duration: testInfo.duration,
            status: testInfo.status,
            error: testInfo.error?.message
        });
    }
});

export { expect } from '@playwright/test';
