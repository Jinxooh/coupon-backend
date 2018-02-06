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
  const { code, reason } = response.result;
  // console.log('code', code);
  // if (code === '0') {
  return res.status(200).json({
    code,
    // reason, // php 에서 한글을 json으로 파싱을 못함...
  });
  // }
  // return res.status(400).json({
  //   code,
  //   reason,
  // });
});

export default router;
