import express from 'express';

import saleList from './saleList';
import sendMMS from './sendMMS';
import resend from './resend';
import couponCancel from './couponCancel';
import couponStatus from './couponStatus';
import checkGood from './checkGood';


const router = express.Router();

router.use('/saleList', saleList);
router.use('/sendMMS', sendMMS);
router.use('/resend', resend);
router.use('/couponCancel', couponCancel);
router.use('/couponStatus', couponStatus);
router.use('/checkGood', checkGood);

export default router;
