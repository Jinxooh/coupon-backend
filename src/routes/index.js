import express from 'express';

import saleList from './saleList';
import sendMMS from './sendMMS';
import resend from './resend';
import couponCancel from './couponCancel';
import couponStatus from './couponStatus';
import checkGood from './checkGood';
import checkPhone from './checkPhone';
import test from './test';

const router = express.Router();

router.use('/saleList', saleList);
router.use('/sendMMS', sendMMS);
router.use('/resend', resend);
router.use('/couponCancel', couponCancel);
router.use('/couponStatus', couponStatus);
router.use('/checkGood', checkGood);
router.use('/checkPhone', checkPhone);
router.use('/test', test);

export default router;
