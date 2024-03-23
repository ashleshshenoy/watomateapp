const express   = require('express')
const router = express.Router();
const customerController = require('./../controller/customer.controller');
const multer = require('multer');
const upload = multer();

router.get('/:segment_id', customerController.read)
router.post('/', customerController.create)
router.delete('/:id', customerController.remove)
router.post('/file',upload.single('file'),customerController.insertAllFromFile);
  

module.exports = router;