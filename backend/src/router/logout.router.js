const express = require('express')
const router = express.Router();


router.get('/',  async function (req, res){
    req.client.logout();
    req.session = null
    res.status(200).send({message : "logout successful"})
})



module.exports = router;