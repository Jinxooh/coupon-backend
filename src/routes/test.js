import express from 'express';
// db config
import mysql from '../helper/dbConnect';
import api from '../helper/api';
import dataType from '../helper/dataType';
import hideItemArray from '../helper/hideItemArray';

const router = express.Router();

router.get('/', async (req, res, next) => {
  console.log('test yah, ', req.body);
  // await mysql.transaction(async (con) => {
  //   console.log('hello');
  // });
  const endPoint = 'salelist2.asp';
  const response = await api.callAPI(endPoint, dataType.salelist2).catch(next);
  const { goodslist } = response.value;

  goodslist.forEach((goods) => {
    console.log(goods);
    const { goods_id } = goods;
    if (goods_id.indexOf('G00000240540') !== -1) {
      console.log(goods_id);
    }
  });
  // await hideItemArray(goodslist, next);
  console.log('DONE');
  res.status(200).json({ success: true });
});

router.post('/1', async (req, res, next) => {
  console.log('post test ok', req.body);
  res.status(200).json({ success: true });
});

export default router;
