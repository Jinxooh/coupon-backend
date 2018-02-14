import express from 'express';
// db config
import api from '../helper/api';
import dataType from '../helper/dataType';
import logger from '../helper/logger';

const router = express.Router();

router.post('/', async (req, res, next) => {
  logger.info(`couponStatus : ' ${JSON.stringify(req.body)}`);
  const {
    tr_order_id,
  } = req.body;

  const response = await api.callAPI('coupon_status.asp', dataType.couponStatus(tr_order_id))
    .catch(next);
  const { StatusCode: code } = response.result;
  logger.info(`couponStatus result : ' ${JSON.stringify(response.result)}`);
  if (code === '0') {
    return res.status(200).json({ code });
  }
  return next(code);
});

export default router;
