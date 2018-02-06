import express from 'express';
// db config
import api from '../helper/api';
import dataType from '../helper/dataType';

const router = express.Router();

router.post('/', async (req, res, next) => {
  console.log('couponStatus, ', req.body);
  const {
    tr_order_id,
  } = req.body;

  const response = await api.callAPI('coupon_status.asp', dataType.couponStatus(tr_order_id))
    .catch(next);
  const { StatusCode } = response.result;
  console.log('StatusCode', StatusCode);
  if (StatusCode === '0') {
    return res.status(200).json({ success: response });
  }
  return res.status(400).json({ failure: response });
});

export default router;
