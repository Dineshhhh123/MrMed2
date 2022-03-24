const express = require('express');
const router  = express.Router();




const coupenController = require('../controllers/coupen.controller');

router.post('/coupen', coupenController.create);
router.get('/coupen', coupenController.findAll);
router.get('/coupen/:coupenId', coupenController.findOne);
router.put('/coupen/:coupenId', coupenController.update);
router.delete('/coupen/:coupenId', coupenController.delete);
module.exports = router;