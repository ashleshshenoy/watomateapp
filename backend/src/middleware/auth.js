function isAuthenticated(req, res, next) {
    console.log(req.session.shopify)
    console.log(req.session)
    if(req.session.user){
        next();
    }else{
        res.status(401).send({access : ""})
    }
}

module.exports = {
    isAuthenticated
}