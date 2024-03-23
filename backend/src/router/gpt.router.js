const express = require('express');
const router = express.Router();
const gptController = require('./../controller/gpt.controller')

router.post('/text', gptController.customize)
router.post('/image', gptController.generateImage)


module.exports = router;