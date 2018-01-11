import isEmpty from 'lodash/isEmpty';

// "001002003" => ['001','002','003']
const sortCategory = category => [category.slice(0, 3), category.slice(0, 6), category];
const renameCategory = (categoryName) => {
  let rename;
  switch (categoryName) {
    case '예스이십사':
      rename = '예스24';
      break;
    case '아이템베이':
      rename = 'IB기프트';
      break;
    case '아이벨류':
      rename = 'ivalue';
      break;
    case '달하루':
      rename = '달하루한복';
      break;
    default:
      rename = categoryName;
      break;
  }
  return rename;
};

const setCategory = async (categoryName, con, goodsno, insert = false) => {
  const renamedCategory = renameCategory(categoryName);
  let sortedCategory = null;
  const unSortedCategory = await con.query('SELECT catnm, category FROM gd_category');

  unSortedCategory.forEach((value) => {
    if (renamedCategory.toUpperCase().indexOf(value.catnm.toUpperCase()) !== -1) {
      sortedCategory = sortCategory(value.category);
    }
  });

  if (isEmpty(sortedCategory)) {  // 분류가 안되는 품목
    sortedCategory = sortCategory('009009009'); // 기타 카테고리
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
