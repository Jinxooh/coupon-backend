import express from 'express';
import isEmpty from 'lodash/isEmpty';
import unescape from 'lodash/unescape';
// db config
import mysql from '../helper/dbConnect';
import api from '../helper/api';
import dataType from '../helper/dataType';
import setCategory from '../helper/setCategory';

const router = express.Router();

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

router.get('/', async (req, res, next) => {
  console.log('saleList');
  const endPoint = 'salelist2.asp';
  const response = await api.callAPI(endPoint, dataType.salelist2).catch(next);
  // console.log('response, ', response);
  const { result, value } = response;
  let { code, goodsnum } = result;

  console.log('goodsnum : ', goodsnum);
  // return;
  code = parseInt(code, 10);
  goodsnum = parseInt(code, 10);

  if (code !== 0) return next(code);

  const { goodslist } = value;
  asyncForEach(goodslist, async (goods) => {
    const { 
      goods_id,
      goods_com_name,
      category1,
      category2,
      affiliate,
      desc,
      goods_nm,
      goods_img,
      goods_desc_img_web,
      goods_desc_img_mobile,
      goods_brand_image,
      web_content,
      mms_content,
      search_text,
      sale_price,
      sale_vat,
      real_price,
      real_vat,
      period_end,
      limit_date,
      end_date,
    } = goods;

    mysql.transaction(async (con) => {
      try {
        const selectResult = await con.query(`SELECT goodsno FROM gd_goods WHERE goodscd='${goods_id}'`);
        if (isEmpty(selectResult)) {
          const insertResult = await con.query(`INSERT INTO gd_goods SET 
          goodsnm='${goods_nm}', 
          img_i='${goods_img}', 
          img_s='${goods_img}', 
          img_m='${goods_img}', 
          img_l='${goods_img}', 
          goodscd='${goods_id}',
          goods_price='${real_price}', 
          maker='${goods_com_name}',
          ex1='${category1}',
          ex2='${category2}',
          open=1`);
          if (!isEmpty(insertResult)) {
            const unescapedName = unescape(goods_com_name);
            setCategory(unescapedName, con, insertResult.insertId, true);

            con.query(`INSERT INTO gd_goods_option SET 
              goodsno='${insertResult.insertId}',
              price='${real_price}',
              link='1',
              optno='1'`);
          }
        } else {
          const updateResult = await con.query(`UPDATE gd_goods SET 
            goodsnm='${goods_nm}', 
            img_i='${goods_img}', 
            img_s='${goods_img}', 
            img_m='${goods_img}', 
            img_l='${goods_img}', 
            goods_price='${real_price}', 
            maker='${goods_com_name}'
            WHERE goodscd='${goods_id}'`);

          if (!isEmpty(updateResult)) {
            const { goodsno } = selectResult[0];
            const unescapedName = unescape(goods_com_name);
            setCategory(unescapedName, con, goodsno);

            con.query(`UPDATE gd_goods_option SET 
            price='${real_price}'
            WHERE goodsno='${goodsno}'`);
          }
        }
      } catch (error) {
        next(error);
      }
    }).catch(next);
  });
  return res.status(200).json({ success: 'good' });
});

export default router;
