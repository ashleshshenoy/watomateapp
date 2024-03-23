const express = require('express');
const router = express.Router();
const shopifyController = require('../controller/shopify.controller');
const { isShopifyAuthorised } = require("../middleware/shopify.middleware");


router.get('/auth', shopifyController.auth);
router.get('/auth/callback', shopifyController.authCallback)
router.get('/polls',isShopifyAuthorised, shopifyController.getPolls)

//fix : add secure auth
router.post('/customer-create-poll',isShopifyAuthorised, shopifyController.startCustomerCreatePoll)
router.post('/publish-product-poll', isShopifyAuthorised,shopifyController.startProductPublishPoll)
router.post('/abandoned-checkouts-poll', isShopifyAuthorised,shopifyController.startAbandonedCheckoutPoll)


router.delete('/stop-poll/:id', isShopifyAuthorised, shopifyController.stopPoll)
module.exports = router;