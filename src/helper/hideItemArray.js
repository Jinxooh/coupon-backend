import isEmpty from 'lodash/isEmpty';

import mysql from '../helper/dbConnect';
import asyncForEach from '../helper/asyncForEach';

// 상품리스트중에 상품 코드가 존재하지 않는 부분(이제 안파는 상품)의
// DB gd_goods 의 open 값을 0으로 변경해줘야한다. 상품이 보이지 않게 변경하는 것
const hideItemArray = async (goodslist, next) => {
  await mysql.transaction(async (con) => {
    try {
      const updateHideItemArray = [];

      const selectResult = await con.query('SELECT goodscd FROM gd_goods');
      if (!isEmpty(selectResult)) {
        selectResult.forEach((goods) => {
          const { goodscd } = goods;
          let checked = false;

          goodslist.forEach((item) => {
            const { goods_id } = item;
            if (goods_id === goodscd) checked = true;
          });

          if (!checked) {
            updateHideItemArray.push(goodscd);
          }
        });

        await asyncForEach(updateHideItemArray, async (goodscd) => {
          await con.query(`UPDATE gd_goods SET 
              open=0
              WHERE goodscd='${goodscd}'`);
        });
      }
    } catch (error) {
      next(error);
    }
  });
};

export default hideItemArray;
