import express from 'express';
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
    title,
    tr_order_id,
  } = req.body;
  // const { sender } = req.query;
  // console.log(sender);
  const response = await api.callAPI('Autsh.asp', dataType.Auth(ctn)).catch(next);
  const { code } = response.result;

  if (code === '0') { // success
    console.log('success');
    const rsp = await api.callAPI('request.asp', dataType.request(message, title, goods_id, ctn, tr_order_id))
      .catch(next);
    console.log('rsp', rsp);
    const { code, value } = rsp.result;
    console.log('code', code);
    if (code === '1000') {
      return res.status(200).json({ success: value });
    }
    return res.status(400).json({ failure: 'wrong' });
  }
  return next();
});

export default router;
