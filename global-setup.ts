import { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
    // Authentication state will be created by registration test
    // and stored in ./playwright/.auth/user.json
}

export default globalSetup;
