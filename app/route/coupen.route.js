const express = require('express');
const router  = express.Router();

const couponController = require('../controller/coupen.controller.js');


router.post('/coupons', couponController.create);


router.get('/coupons', couponController.findAll);


router.get('/mrMed/coupons/:couponId', couponController.findOne);


router.put('/coupons/:couponId', couponController.update);


router.delete('/coupons/:couponId', couponController.delete);
   
module.exports = router;