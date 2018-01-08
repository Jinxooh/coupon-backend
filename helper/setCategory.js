import isEmpty from 'lodash/isEmpty';

// "001002003" => ['001','002','003']
const sortCategory = category => [category.slice(0, 3), category.slice(0, 6), category];

const setCategory = async (categoryName, con, goodsno, insert = false) => {
  const unSortedCategory = await con.query(`SELECT category FROM gd_category WHERE catnm='${categoryName}'`);
  const { category } = unSortedCategory[0];
  let sortedCategory = null;
  if (isEmpty(unSortedCategory)) {
    sortedCategory = ['009']; // 기타 카테고리
  } else {
    sortedCategory = sortCategory(category);
  }
  sortedCategory.forEach(async (value) => {
    if (insert) {
      await con.query(`INSERT INTO gd_goods_link SET 
      goodsno='${goodsno}',
      category='${value}',
      sort=-unix_timestamp()-${goodsno}`);
    } else {
      await con.query(`UPDATE gd_goods_link SET 
      category='${value}'
      WHERE goodsno='${goodsno}'`);
    }
  });
};

export default setCategory;
