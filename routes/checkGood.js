import express from 'express';
// db config
import api from '../helper/api';
import dataType from '../helper/dataType';

const router = express.Router();

router.post('/', async (req, res, next) => {
  console.log('checkGood, ', req.body);
  const {
    goods_id,
  } = req.body;

  const response = await api.callAPI('check_good.asp', dataType.checkGood(goods_id))
    .catch(next);
  const { code } = response.result;
  console.log('code', code);
  if (code === '0') {
    return res.status(200).json({ success: response });
  }
  return res.status(400).json({ failure: response });
});

export default router;
