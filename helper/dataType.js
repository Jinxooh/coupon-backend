const MDCODE = 'M000201916';
const tr_id = 'M0002_standard';

const salelist2 = {
  MDCODE,
};

const Auth = (ctn) => {
  return {
    MDCODE,
    ctn,
  };
};

const request = (MSG, TITLE, CALLBACK, goods_id, phone_no) => {
  return {
    // Mandatory
    MDCODE,
    MSG,
    TITLE,
    CALLBACK,
    goods_id,
    phone_no,
    tr_id,
    // // Optional
    // gubun,
    // sms_flag,
    // template_id,
    // banner_id,
    // user_id,
    // pay_id,
    // auto_refund_flag,
    // voucher_flag,
    // enc_flag,
  };
};

export default {
  salelist2,
  Auth,
  request,
};
