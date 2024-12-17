import { FullConfig } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

async function globalTeardown(config: FullConfig) {
    try {
        // Clean up storage state file
        const storageStatePath = path.join(process.cwd(), 'storageState.json');
        if (fs.existsSync(storageStatePath)) {
            fs.unlinkSync(storageStatePath);
        }

        // Clean up test artifacts if needed
        const testResultsPath = path.join(process.cwd(), 'test-results');
        if (fs.existsSync(testResultsPath)) {
            fs.rmSync(testResultsPath, { recursive: true, force: true });
        }
    } catch (error) {
        console.error('Global teardown failed:', error);
        throw error;
    }
}

export default globalTeardown;
