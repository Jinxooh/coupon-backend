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
  if (insert) {
    sortedCategory.forEach(async (value) => {
      await con.query(`INSERT INTO gd_goods_link SET 
      goodsno='${goodsno}',
      category='${value}',
      sort=-unix_timestamp()-${goodsno}`);
    });
  } else {
    // category 길이를 측정후 길이가 같은 category 만 추출하여 update
    const checkLength = await con.query(`SELECT sno, category FROM gd_goods_link WHERE goodsno='${goodsno}'`);
    checkLength.forEach((value) => {
      sortedCategory.forEach((sortValue) => {
        if (value.category.length === sortValue.length) {
          con.query(`UPDATE gd_goods_link SET 
            category='${sortValue}'
            WHERE sno='${value.sno}'`);
        }
      });
    });
  }
};

export default setCategory;
