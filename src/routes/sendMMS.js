import express from 'express';
import urlencode from 'urlencode';
// db config
import api from '../helper/api';
import dataType from '../helper/dataType';

const router = express.Router();

router.post('/', async (req, res, next) => {
  console.log('auth, ', req.body);
  const {
    goods_id,
    ctn,
    message,
    tr_order_id,
  } = req.body;
  const convertCtn = ctn.replace(/(-)/g, '');
  const response = await api.callAPI('Auth.asp', dataType.Auth(convertCtn)).catch(next);
  const { code } = response.result;

  if (code === '0') { // success
    console.log('success');
    const convertedMessage = urlencode(message === '' ? '더 쿠폰넷 쿠폰입니다.' : message, 'euc-kr');
    const convertedTitle = urlencode('더 쿠폰넷 쿠폰입니다.', 'euc-kr');
    const rsp = await api.callAPI('request.asp', dataType.request(convertedMessage, convertedTitle, goods_id, convertCtn, tr_order_id))
      .catch(next);
    console.log('rsp', rsp);
    const { code } = rsp.result;
    console.log('code', code);
    if (code === '1000') {
      return res.status(200).json({
        code,
      });
    }
    return next(code);
  }
  return next(code);
});

export default router;
