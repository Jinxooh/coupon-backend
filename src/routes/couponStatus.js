import express from 'express';
// db config
import api from '../helper/api';
import dataType from '../helper/dataType';

const router = express.Router();

router.post('/', async (req, res, next) => {
  // console.log('couponStatus, ', req.body);
  const {
    tr_order_id,
  } = req.body;

  const response = await api.callAPI('coupon_status.asp', dataType.couponStatus(tr_order_id))
    .catch(next);
  const { StatusCode: code } = response.result;
  // console.log('StatusCode', code);
  if (code === '0') {
    return res.status(200).json({ code });
  }
  return next(code);
});

export default router;
