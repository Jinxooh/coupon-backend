import express from 'express';
// db config
import api from '../helper/api';
import dataType from '../helper/dataType';

const router = express.Router();

router.post('/', async (req, res, next) => {
  console.log('couponCancel, ', req.body);
  const {
    tr_order_id,
  } = req.body;

  const response = await api.callAPI('coupon_cancel.asp', dataType.couponCancel(tr_order_id))
    .catch(next);
  const { StatusCode } = response.result;
  console.log('StatusCode', StatusCode);
  console.log('response', response);
  if (StatusCode === '0') {
    return res.status(200).json({
      code: StatusCode,
    });
  }
  return next(StatusCode);
});

export default router;
