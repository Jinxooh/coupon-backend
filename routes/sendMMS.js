import express from 'express';
// db config
import api from '../helper/api';
import dataType from '../helper/dataType';

const router = express.Router();

router.get('/', async (req, res) => {
  console.log('auth');
  const ctn = '01022267466'; // temp
  // const response = await api.callAPI('Auth.asp', dataType.Auth(ctn));
  // const { result } = response;
  // const { code } = result;

  // if (code === '0') { // success
  console.log('success');
  const message = 'hello';
  const title = 'what ';
  const callback = 'hochul';
  const goods_id = 'G00000018382';
  const rsp = await api.callAPI('reqeust.asp', dataType.request(message, title, callback, goods_id, ctn));
  console.log(rsp);
  // } else {
  //   throw console.log('phone number is wrong err code : ', code);
  // }
});

export default router;
