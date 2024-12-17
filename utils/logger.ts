import * as fs from 'fs';
import * as path from 'path';

class Logger {
    private static instance: Logger;
    private logStream: fs.WriteStream;
    private debugMode: boolean;

    private constructor() {
        this.debugMode = process.env.DEBUG === 'true';
        const logsDir = path.join(process.cwd(), 'logs');
        
        // Create logs directory if it doesn't exist
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir);
        }

        // Create new log file for each day
        const today = new Date().toISOString().split('T')[0];
        const logFile = path.join(logsDir, `test-${today}.log`);
        this.logStream = fs.createWriteStream(logFile, { flags: 'a' });
    }

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    private formatMessage(level: string, message: string, data?: any): string {
        const timestamp = new Date().toISOString();
        const dataStr = data ? ` | ${JSON.stringify(data)}` : '';
        return `[${timestamp}] ${level}: ${message}${dataStr}\n`;
    }

    public info(message: string, data?: any) {
        const logMessage = this.formatMessage('INFO', message, data);
        this.logStream.write(logMessage);
        console.log(logMessage.trim());
    }

    public error(message: string, error?: Error | any) {
        const errorData = error instanceof Error ? 
            { message: error.message, stack: error.stack } : 
            error;
        const logMessage = this.formatMessage('ERROR', message, errorData);
        this.logStream.write(logMessage);
        console.error(logMessage.trim());
    }

    public debug(message: string, data?: any) {
        if (this.debugMode) {
            const logMessage = this.formatMessage('DEBUG', message, data);
            this.logStream.write(logMessage);
            console.debug(logMessage.trim());
        }
    }

    public warn(message: string, data?: any) {
        const logMessage = this.formatMessage('WARN', message, data);
        this.logStream.write(logMessage);
        console.warn(logMessage.trim());
    }

    public close() {
        this.logStream.end();
    }
}

export const logger = Logger.getInstance();
