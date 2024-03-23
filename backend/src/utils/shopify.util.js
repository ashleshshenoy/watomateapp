require('@shopify/shopify-api/adapters/node');
const { shopifyApi, LATEST_API_VERSION } = require('@shopify/shopify-api');
const { restResources } = require('@shopify/shopify-api/rest/admin/2022-10');


const shopify = shopifyApi({
    apiKey: process.env.SHOPIFY_CLIENT,
    apiSecretKey: process.env.SHOPIFY_SECRET,
    scopes: ['read_products','write_products','read_orders','write_orders','read_customers'],
    hostName: process.env.SHOPIFY_HOST,
    restResources
});

module.exports = shopify;