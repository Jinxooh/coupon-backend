import express from 'express';
// db config
import urlencode from 'urlencode';
import api from '../helper/api';
import dataType from '../helper/dataType';
import logger from '../helper/logger';

const router = express.Router();

router.post('/', async (req, res, next) => {
  logger.info(`resend : ' ${JSON.stringify(req.body)}`);
  const {
    tr_order_id,
  } = req.body;

  const response = await api.callAPI('Resend.asp', dataType.resend('Y', tr_order_id))
    .catch(next);
  const { code, reason } = response.result;
  logger.info(`resend response.result : ' ${JSON.stringify(response.result)}`);
  if (code === '0') {
    return res.status(200).json({ code, reason });
  }
  return res.status(200).json({ code, reason: urlencode(reason, 'utf-8') });
});

export default router;
