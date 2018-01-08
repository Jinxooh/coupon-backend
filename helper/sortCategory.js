const sortCategory = (mainCategory, subCategory) => {
  let category = '';
  if (mainCategory) {
    switch (mainCategory) {
      case '':
        category = '001';
        break;
      default:
        console.log('no exist category');
        break;
    }
  }

  if (subCategory) {
    switch (subCategory) {
      case '':
        category += '002';
        break;
      default:
        console.log('no exist category');
        break;
    }
  }

  return category;
};

export default sortCategory;
