import express from 'express';
// db config
import urlencode from 'urlencode';
import api from '../helper/api';
import dataType from '../helper/dataType';
import logger from '../helper/logger';

const router = express.Router();

router.post('/', async (req, res, next) => {
  logger.info(`checkPhone : ' ${JSON.stringify(req.body)}`);
  const {
    ctn,
  } = req.body;

  const response = await api.callAPI('Auth.asp', dataType.Auth(ctn)).catch(next);
  const { code, reason } = response.result;
  logger.info(`checkPhone result : ' ${JSON.stringify(response.result)}`);
  if (code === '0') { // success
    return res.status(200).json({ code, reason: urlencode(reason, 'utf-8') });
  }
  return next(code);
});

export default router;
