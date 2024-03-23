async function isShopifyAuthorised(req, res, next) {
    if(req.session.shopify){
        next();
    }
    else{
        return res.status(401).send({access :"shopify-login"});
    }
}

module.exports = {
    isShopifyAuthorised
}