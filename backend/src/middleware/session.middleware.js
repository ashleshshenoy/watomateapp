function sessionStore(clientSessions) {   
    return function(req, res, next) {
        if(clientSessions[req.session.user]){
            req.client = clientSessions[req.session.user]
            next();
        }
        else{
            console.log("session failed")
            res.status(401).send({access : "session"})
        }
    }
}

module.exports = {
    sessionStore
}