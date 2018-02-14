import express from 'express';
// db config
import urlencode from 'urlencode';
import api from '../helper/api';
import dataType from '../helper/dataType';
import logger from '../helper/logger';

const router = express.Router();

router.post('/', async (req, res, next) => {
  logger.info(`checkGood : ' ${JSON.stringify(req.body)}`);
  const {
    goods_id,
  } = req.body;

  const response = await api.callAPI('check_good.asp', dataType.checkGood(goods_id))
    .catch(next);
  const { code, reason } = response.result;
  logger.info(`checkGood result : ' ${JSON.stringify(response.result)}`);
  return res.status(200).json({
    code,
    reason: urlencode(reason, 'utf-8'),
  });
});

export default router;
