import express from 'express';
// db config
import urlencode from 'urlencode';
import api from '../helper/api';
import dataType from '../helper/dataType';
import logger from '../helper/logger';

const router = express.Router();

router.post('/', async (req, res, next) => {
  logger.info(`couponCancel : ' ${JSON.stringify(req.body)}`);
  const {
    tr_order_id,
  } = req.body;

  const response = await api.callAPI('coupon_cancel.asp', dataType.couponCancel(tr_order_id))
    .catch(next);
  const { StatusCode, StatusText } = response.result;
  logger.info(`couponCancel result : ' ${JSON.stringify(response.result)}`);
  if (StatusCode === '0') {
    return res.status(200).json({
      code: StatusCode,
      reason: urlencode(StatusText, 'utf-8'),
    });
  }
  return res.status(200).json({
    code: StatusCode,
    reason: urlencode(StatusText, 'utf-8'),
  });
});

export default router;
