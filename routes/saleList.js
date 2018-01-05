import express from 'express';
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
    `, (error, result, fields) => {
      if (error) console.log(error);
      connection.query(`INSERT INTO gd_goods_link SET 
      goodsno='${result.insertId}',
      category='001'
      `, (error, result, fields) => {
        if (error) console.log(error);
        console.log(result);
      });

      connection.query(`INSERT INTO gd_goods_option SET 
      goodsno='${result.insertId}',
      price='${real_price}',
      link='1',
      optno='1'
      `, (error, result, fields) => {
        if (error) console.log(error);
        console.log(result);
      });
    });
  });

  console.log('DONE');
});

export default router;
