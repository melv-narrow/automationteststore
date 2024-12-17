import { Reporter, TestCase, TestResult, FullResult } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

class CustomReporter implements Reporter {
    private logFile: fs.WriteStream;

    constructor() {
        // Create logs directory if it doesn't exist
        const logsDir = path.join(process.cwd(), 'logs');
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir);
        }

        // Create log file with timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const logPath = path.join(logsDir, `test-run-${timestamp}.log`);
        this.logFile = fs.createWriteStream(logPath, { flags: 'a' });
    }

    onBegin(config: any, suite: any) {
        this.log('Test run started', {
            timestamp: new Date().toISOString(),
            workers: config.workers,
            testFiles: suite.allTests().length
        });
    }

    onTestBegin(test: TestCase) {
        this.log('Test started', {
            timestamp: new Date().toISOString(),
            title: test.title,
            location: test.location
        });
    }

    onTestEnd(test: TestCase, result: TestResult) {
        this.log('Test finished', {
            timestamp: new Date().toISOString(),
            title: test.title,
            status: result.status,
            duration: result.duration,
            error: result.error?.message,
            retry: result.retry
        });
    }

    onEnd(result: FullResult) {
        this.log('Test run finished', {
            timestamp: new Date().toISOString(),
            status: result.status,
            duration: result.duration
        });
        this.logFile.end();
    }

    onStepBegin(test: TestCase, result: TestResult, step: any) {
        this.log('Step started', {
            timestamp: new Date().toISOString(),
            title: step.title,
            category: step.category
        });
    }

    onStepEnd(test: TestCase, result: TestResult, step: any) {
        this.log('Step finished', {
            timestamp: new Date().toISOString(),
            title: step.title,
            category: step.category,
            duration: step.duration
        });
    }

    private log(event: string, data: any) {
        const logEntry = {
            event,
            ...data
        };
        this.logFile.write(`${JSON.stringify(logEntry)}\n`);
    }
}

export default CustomReporter;
