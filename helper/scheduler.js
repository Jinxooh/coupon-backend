import schedule from 'node-schedule';
import fetch from 'node-fetch';
import logger from './logger';

// const job = schedule.scheduleJob('30 1-23/12 * * * *', () => {
const job = schedule.scheduleJob('0 0 7 ? * MON-FRI *', () => {
  logger.info('scheduler on');
  fetch(`${process.env.BACKEND_SERVER}saleList`, { method: 'GET' }).catch((error) => { logger.error(error); });
});
