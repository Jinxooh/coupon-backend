import express from 'express';
import isEmpty from 'lodash/isEmpty';
import unescape from 'lodash/unescape';
// db config
import mysql from '../helper/dbConnect';
import api from '../helper/api';
import dataType from '../helper/dataType';
import setCategory from '../helper/setCategory';
import logger from '../helper/logger';
import asyncForEach from '../helper/asyncForEach';
import hideItemArray from '../helper/hideItemArray';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const endPoint = 'salelist2.asp';
  const response = await api.callAPI(endPoint, dataType.salelist2).catch(next);
  const { result, value } = response;
  let { code, goodsnum } = result;

  logger.info(`goodsnum : ' ${goodsnum}`);
  // return;
  code = parseInt(code, 10);
  goodsnum = parseInt(code, 10);

  if (code !== 0) return next(code);

  const { goodslist } = value;

  await asyncForEach(goodslist, async (goods) => {
    const {
      goods_id,
      goods_com_name,
      category1,
      category2,
      affiliate,
      desc,
      goods_nm,
      goods_img,
      real_price,
      period_end,
      // goods_desc_img_web,
      // goods_desc_img_mobile,
      // goods_brand_image,
      // web_content,
      // mms_content,
      // search_text,
      // sale_price,
      // sale_vat,
      // real_vat,
      // limit_date,
      // end_date,
    } = goods;

    let convertedDesc = desc.replace(/(\"|\')/g, '`'); // 데이터가 ", ' 가 같이 넘어와 DB INSERT 문제 발생하여 문자 변경
    convertedDesc = convertedDesc.replace(/(\n)/g, '<br />'); // 데이터가 줄바꿈이 \n 으로 넘어와 html에 적용안되는 문제 발생하여 문자 변경
    const convertedImage = goods_img.replace(/(_250)/g, '');

    await mysql.transaction(async (con) => {
      try {
        const selectResult = await con.query(`SELECT goodsno FROM gd_goods WHERE goodscd='${goods_id}'`);
        if (isEmpty(selectResult)) {
          const insertResult = await con.query(`INSERT INTO gd_goods SET 
          goodsnm='${goods_nm}', 
          img_i='${convertedImage}', 
          img_s='${convertedImage}', 
          img_m='${convertedImage}', 
          img_l='${convertedImage}', 
          goodscd='${goods_id}',
          goods_price='${real_price}', 
          maker='${goods_com_name}',
          longdesc='${convertedDesc}',
          ex1='${category1}',
          ex2='${category2}',
          ex3='${affiliate}',
          ex4='${period_end}',
          open=1`);
          if (!isEmpty(insertResult)) {
            const unescapedName = unescape(goods_com_name);
            await setCategory(unescapedName, goods_nm, con, insertResult.insertId, true);

            await con.query(`INSERT INTO gd_goods_option SET 
              goodsno='${insertResult.insertId}',
              price='${real_price}',
              link='1',
              optno='1'`);
          }
        } else {
          const updateResult = await con.query(`UPDATE gd_goods SET 
          goodsnm='${goods_nm}', 
          img_i='${convertedImage}', 
          img_s='${convertedImage}', 
          img_m='${convertedImage}', 
          img_l='${convertedImage}', 
          goods_price='${real_price}', 
          maker='${goods_com_name}',
          open=1
          WHERE goodscd='${goods_id}'`);

          if (!isEmpty(updateResult)) {
            const { goodsno } = selectResult[0];
            const unescapedName = unescape(goods_com_name);
            await setCategory(unescapedName, goods_nm, con, goodsno);

            await con.query(`UPDATE gd_goods_option SET 
            price='${real_price}'
            WHERE goodsno='${goodsno}'`);
          }
        }
      } catch (error) {
        next(error);
      }
    }).catch(next);
  });

  await hideItemArray(goodslist, next);

  return res.status(200).json({ success: true });
});

export default router;
