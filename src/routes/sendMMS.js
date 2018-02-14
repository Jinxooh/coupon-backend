import express from 'express';
import urlencode from 'urlencode';
// db config
import api from '../helper/api';
import dataType from '../helper/dataType';
import logger from '../helper/logger';

const router = express.Router();

router.post('/', async (req, res, next) => {
  logger.info('sendMMS body, ', req.body);
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
    // check korean 영어만 단독으로 euc-kr 인코딩해서 KT에 보내면 인코딩된 채로 나옴, 혼합일경우 상관없음
    let convertedMessage = null;
    if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(message)) {
      convertedMessage = urlencode(message, 'euc-kr'); // euc-kr로 인코딩
    } else {
      convertedMessage = message === '' ? urlencode('더 쿠폰넷 쿠폰입니다.', 'euc-kr') : message;
    }
    const convertedTitle = urlencode('더 쿠폰넷 쿠폰입니다.', 'euc-kr');
    const rsp = await api.callAPI('request.asp', dataType.request(convertedMessage, convertedTitle, goods_id, convertCtn, tr_order_id))
      .catch(next);
    logger.info('sendMMS result, ', rsp.result);
    const { code: mmsCode } = rsp.result;
    if (mmsCode === '1000') { // mms 성공시 1000
      return res.status(200).json({
        code: mmsCode,
      });
    }
    return next(code);
  }
  return next(code);
});

export default router;
