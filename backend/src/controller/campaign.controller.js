const campaignModel = require('./../model/campaign.model');
const customeEntryModel = require('./../model/customer.model');
const { MessageMedia } = require('whatsapp-web.js');



async function getAllCampaign(req, res){
    try{
        const creator_id = req.session.user; 
        const result = await campaignModel.read(creator_id)
        res.status(200).send(result);
    }catch(e){
        return res.status(400).send({error : e.message}); 
    }
}

async function create(req, res){   
    const usernameRegex = /\{\s*name\s*\}/g;
    const phoneNoRegex = /\{\s*phone\s*\}/g;
    const body = req.body;
    if(!body.message || !body.segment_id){
        return res.status(400).send({error : "Missing required parameters"});
    }
    try{
        let customers = await customeEntryModel.read(body.segment_id);
        let response =[]
        let media = undefined;
        if(body.image_url)
            media = await MessageMedia.fromUrl(body.image_url);
        for (const customer of customers) {
            let message = body.message.replace(usernameRegex, customer.name);
            message = message.replace(phoneNoRegex, customer.phone);
            const chatId = customer.phone.substring(1) + "@c.us";
            if(body.image_url){
                req.client.sendMessage(chatId, media, { caption: message });
            }
            else{
                req.client.sendMessage(chatId, message);
            }
            response.push({ message, chatId });
        }
    
        console.log(response)
        const result = await campaignModel.create(body.message, "", body.segment_id)
        return res.status(200).send(result);
    }catch(e){
        console.log(e)
        res.status(400).send({error : e.message});
    }

}


module.exports ={
    getAllCampaign,
    create,
}