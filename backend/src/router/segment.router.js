const express   = require('express')
const router = express.Router();
const segmentController = require('./../controller/segment.controller');


router.get('/', segmentController.read)
router.post('/', segmentController.create)
router.delete('/:id', segmentController.remove)




module.exports = router;