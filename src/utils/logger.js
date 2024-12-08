import fs from 'fs';
import winston from 'winston';

// Check if the logs directory exists, if not, create it
if (!fs.existsSync("logs")) {
  fs.mkdirSync("logs");
}

// Create a new logger instance
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      return `${timestamp} [${level}]: ${message} ${
        Object.keys(meta).length ? JSON.stringify(meta) : ''
      }`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ filename: 'logs/app.log' }),
  ],
});

export default logger;