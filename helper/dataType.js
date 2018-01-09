const MDCODE = process.env.MD_CODE;
const tr_id_prefix = 'STD_COUPON_';
const CALLBACK = '01022267466'; // 대표번호

const salelist2 = {
  MDCODE,
};

const Auth = (ctn) => {
  return {
    MDCODE,
    ctn,
  };
};

const request = (MSG, TITLE, goods_id, phone_no, tr_order_id) => {
  const tr_id = tr_id_prefix + tr_order_id;
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
    // user_id, // gd_member m_id
    // pay_id,
    // auto_refund_flag,
    // voucher_flag,
    enc_flag: 'N',
  };
};

const Resend = (sms_flag, tr_order_id) => {
  const tr_id = tr_id_prefix + tr_order_id;
  return {
    MDCODE,
    tr_id,
    sms_flag,
  };
};

const couponStatus = (tr_order_id) => {
  const tr_id = tr_id_prefix + tr_order_id;
  return {
    MDCODE,
    tr_id,
  };
};

const couponCancel = (tr_order_id) => {
  const tr_id = tr_id_prefix + tr_order_id;
  return {
    MDCODE,
    tr_id,
  };
};

const checkGood = (goods_id) => {
  return {
    MDCODE,
    goods_id,
  };
};

const regPayInfo = (pay_id, total_amount, pay_method, pay_amount, pg_auth_num, pay_date, pay_time, pay_cancel_url, merchant_id) => {
  return {
    MDCODE,
    pay_id,
    total_amount,
    pay_method,
    pay_amount,
    pg_auth_num,
    pay_date,
    pay_time,
    pay_cancel_url,
    merchant_id,
  };
};

const regPayCancelInfo = (pay_id, total_amount, pay_method, pay_amount, pg_cancel_num, cancel_date, cancel_time, cancel_user_id, cancel_comment, merchant_id) => {
  return {
    MDCODE,
    pay_id,
    total_amount,
    pay_method,
    pay_amount,
    pg_cancel_num,
    cancel_date,
    cancel_time,
    cancel_user_id,
    cancel_comment,
  };
};

export default {
  salelist2, // 목록 받기
  Auth, // phone 인증
  request, // MMS 전송
  Resend, // MMS 재전송
  couponStatus, // 상품권 상태확인
  couponCancel, // 상품권 취소
  checkGood, // 상품 상태조회
  regPayInfo, // 결제 정보 전달 API
  regPayCancelInfo, // 결제 취소 정보 전달 API
};
