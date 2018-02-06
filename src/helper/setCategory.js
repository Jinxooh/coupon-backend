import isEmpty from 'lodash/isEmpty';

// "001002003" => ['001','002','003']
const sortCategory = category => [category.slice(0, 3), category.slice(0, 6), category];
const renameCategory = (mainCategory, subCategory) => {
  let rename;
  switch (mainCategory) {
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
    case '네이처벨르/장인정신/재스':
      if (subCategory.indexOf('네이처벨르') !== -1) rename = '네이처벨르';
      if (subCategory.indexOf('장인정신') !== -1) rename = '장인정신';
      if (subCategory.indexOf('재스') !== -1) rename = '재스';
      break;
    case '해피바스외(배송상품)':
      if (subCategory.indexOf('미쟝센') !== -1) rename = '미쟝센';
      if (subCategory.indexOf('아이오페') !== -1) rename = '아이오페';
      if (subCategory.indexOf('이니스프리') !== -1) rename = '이니스프리';
      if (subCategory.indexOf('베네피트') !== -1) rename = '베네피트';
      if (subCategory.indexOf('랑방') !== -1) rename = '랑방';
      if (subCategory.indexOf('미샤') !== -1) rename = '미샤';
      if (subCategory.indexOf('온더바디') !== -1) rename = '온더바디';
      if (subCategory.indexOf('라네즈') !== -1) rename = '라네즈';
      if (subCategory.indexOf('마몽드') !== -1) rename = '마몽드';
      if (subCategory.indexOf('헤라') !== -1) rename = '헤라';
      if (subCategory.indexOf('갸스비') !== -1) rename = '갸스비';
      if (subCategory.indexOf('스킨푸드') !== -1) rename = '스킨푸드';
      if (subCategory.indexOf('메디힐') !== -1) rename = '메디힐';
      if (subCategory.indexOf('클린앤클리어') !== -1) rename = '클린앤클리어';
      if (subCategory.indexOf('해피바스') !== -1) rename = '해피바스';
      if (subCategory.indexOf('프리메라') !== -1) rename = '프리메라';
      break;
    case '도서문화상품권':
      rename = '북앤라이프';
      break;
    default:
      rename = mainCategory;
      break;
  }
  return rename;
};

const setCategory = async (mainCategory, subCategory, con, goodsno, insert = false) => {
  const renamedCategory = renameCategory(mainCategory, subCategory);
  let sortedCategory = null;
  const unSortedCategory = await con.query('SELECT catnm, category FROM gd_category WHERE length(category) > 8');

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
