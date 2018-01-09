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
    callback,
  } = req.body;
  // const { sender } = req.query;
  // console.log(sender);
  const response = await api.callAPI('Auth.asp', dataType.Auth(ctn)).catch(next);
  const { result } = response;
  const { code } = result;

  if (code === '0') { // success
    console.log('success');
    const rsp = await api.callAPI('reqeust.asp', dataType.request(message, title, callback, goods_id, ctn))
      .catch(next);
    console.log('rsp', rsp);
  } else {
    return next();
  }
});

export default router;
