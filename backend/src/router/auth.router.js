const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const {JWT} = require('google-auth-library');
const { isAuthenticated } = require('../middleware/auth');


async function verify(client_id, jwtToken) {
    const client = new OAuth2Client(client_id);
    const ticket = await client.verifyIdToken({
        idToken: jwtToken,
        audience: client_id,
    });
    const payload = ticket.getPayload();
    return payload;
}





router.post('/', async function (req, res){
    const payload = req.body;
    console.log("user authication")
    try{
        const result = await verify(process.env.CLIENT_ID, payload.credential);
        req.session.user = result.email;
        console.log("user signed in")
        res.status(200).json({message : "login successful"})
    }catch(e){
            return res.status(400).json({error : e})
    } 
})




module.exports = router;