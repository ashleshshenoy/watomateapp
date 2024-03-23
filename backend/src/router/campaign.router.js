const express = require('express')
const router = express.Router()
const campaignController = require('./../controller/campaign.controller') 

router.get('/', campaignController.getAllCampaign)
router.post('/', campaignController.create)

module.exports = router;