import express from 'express';
import isEmpty from 'lodash/isEmpty';
// db config
import connection from '../helper/dbConnect';
import api from '../helper/api';
import dataType from '../helper/dataType';

const router = express.Router();

router.get('/', async (req, res) => {
  console.log('saleList');
  const endPoint = 'salelist2.asp';
  const response = await api.callAPI(endPoint, dataType.salelist2);

  const { result, value } = response;
  let { code, goodsnum } = result;

  console.log(goodsnum);
  code = parseInt(code, 10);
  goodsnum = parseInt(code, 10);

  if (code !== 0) {
    console.log(code);
    return res.status(400);
  }
  const { goodslist } = value;
  goodslist.forEach((goods) => {
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

    // connection.query(`SELECT goodsno FROM gd_goods WHERE goodscd='1000123'
    connection.query(`SELECT goodsno FROM gd_goods WHERE goodscd='${goods_id}'
    `, (err, selectResult) => {
        if (err) console.log(err);
        if (isEmpty(selectResult)) {
          // open <- 상품 진열 하기
          connection.query(`INSERT INTO gd_goods SET 
          goodsnm='${goods_nm}', 
          img_i='${goods_img}', 
          img_s='${goods_img}', 
          img_m='${goods_img}', 
          img_l='${goods_img}', 
          goodscd='${goods_id}',
          goods_price='${real_price}', 
          maker='${goods_com_name}',
          open=1
          `, (error, insertResult) => {
            if (error) console.log('insert gd_goods err: ', error);
            connection.query(`INSERT INTO gd_goods_link SET 
            goodsno='${insertResult.insertId}',
            category='001',
            sort=-unix_timestamp()-${insertResult.insertId}
            `, (error, subInsertResult) => {
              if (error) console.log('insert gd_goods_link err: ', error);
              console.log(subInsertResult);
            });

            connection.query(`INSERT INTO gd_goods_option SET 
            goodsno='${insertResult.insertId}',
            price='${real_price}',
            link='1',
            optno='1'
            `, (error, subInsertResult) => {
              if (error) console.log('insert gd_goods_option err: ', error);
              console.log(subInsertResult);
            });

            return res.status(200);
          });
        } else {
          connection.query(`UPDATE gd_goods SET 
          goodsnm='omg', 
          img_i='${goods_img}', 
          img_s='${goods_img}', 
          img_m='${goods_img}', 
          img_l='${goods_img}', 
          goods_price='${real_price}', 
          maker='${goods_com_name}'
          WHERE goodscd='${goods_id}'
          `, (error, updateResult) => {
            if (error) console.log('update gd_goods err: ', error);
            console.log('update, ', updateResult);
            const { goodsno } = selectResult[0];
            connection.query(`UPDATE gd_goods_link SET 
            category='002'
            WHERE goodsno='${goodsno}'
            `, (error, subUpdateResult) => {
              if (error) console.log('update gd_goods_link err: ', error);
              console.log(subUpdateResult);
            });

            connection.query(`UPDATE gd_goods_option SET 
            price='${real_price}'
            WHERE goodsno='${goodsno}'
            `, (error, subUpdateResult) => {
              if (error) console.log('update gd_goods_link err: ', error);
              console.log(subUpdateResult);
            });

            return res.status(200);
          });
        }
      });
  });

  console.log('DONE');
});

export default router;
