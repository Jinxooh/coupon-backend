import schedule from 'node-schedule';
import fetch from 'node-fetch';
import logger from './logger';

const BACKEND_SERVER = process.env.NODE_ENV === 'development' ? process.env.TEST_BACKEND_SERVER : process.env.BACKEND_SERVER;

const start = () => {
  logger.info('scheduler init');
  schedule.scheduleJob('0 0 7 * * 0-5', () => { // am 7 , mon-fri
    logger.info('scheduler on');
    fetch(`${BACKEND_SERVER}saleList`, { method: 'GET' }).catch((error) => { logger.error(error); });
  });
}

export default {
  start,
};
