import express from 'express';
// db config
import api from '../helper/api';
import dataType from '../helper/dataType';

const router = express.Router();

router.post('/', async (req, res, next) => {
  console.log('resend, ', req.body);
  const {
    tr_order_id,
  } = req.body;

  const response = await api.callAPI('Resend.asp', dataType.Resend('Y', tr_order_id))
    .catch(next);
  const { code } = response.result;
  console.log('code', code);
  if (code === '0') {
    return res.status(200).json({ success: response });
  }
  return res.status(400).json({ failure: response });
});

export default router;
