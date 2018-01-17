// logs
import winston from 'winston';
import WinstonDate from 'winston-daily-rotate-file';
import fs from 'fs';

const logDir = 'log';
const tsFormat = () => (new Date()).toLocaleString();

if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);
export const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: tsFormat,
      level: 'info',
    }),
    new (WinstonDate)({
      level: 'info',
      filename: `${logDir}/-logs.log`,
      timestamp: tsFormat,
      datePattern: 'yyyy-MM-dd',
      prepend: true,
    }),
  ],
});
