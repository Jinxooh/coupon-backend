import express from 'express';
// db config
import mysql from '../helper/dbConnect';

const router = express.Router();

router.get('/', async (req, res, next) => {
  console.log('test yah, ', req.body);
  await mysql.transaction(async (con) => {
    const selectResult = await con.query(`SELECT goodsno FROM gd_goods`);
    console.log('selectResult: ', selectResult);
  });
  console.log('DONE');
  res.status(200).json({ success: true });
});

router.post('/1', async (req, res, next) => {
  console.log('post test ok', req.body);
  res.status(200).json({ success: true });
});

export default router;
