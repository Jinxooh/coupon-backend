import express from 'express';
// db config
import api from '../helper/api';
import dataType from '../helper/dataType';

const router = express.Router();

router.post('/', async (req, res, next) => {
  console.log('check Phone, ', req.body);
  const {
    ctn,
  } = req.body;

  const response = await api.callAPI('Auth.asp', dataType.Auth(ctn)).catch(next);
  const { code } = response.result;

  if (code === '0') { // success
    return res.status(200).json({ code });
  }
  return next(code);
});

export default router;
