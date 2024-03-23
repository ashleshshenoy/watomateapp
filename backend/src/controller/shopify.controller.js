const shopify = require('../utils/shopify.util');
const schedule = require('node-schedule');
const { v4: uuidv4 } = require('uuid');
const shopifyModel =require('../model/shopify.model')


const usernameRegex = /\{\s*name\s*\}/g;
const phoneNoRegex = /\{\s*phone\s*\}/g;
const productRegex =/\{\s*product\s*\}/g;
const urlRegex =/\{\s*checkout_url\s*\}/g;

async function auth(req, res){

  try{
    await shopify.auth.begin({
      shop: shopify.utils.sanitizeShop(req.query.shop, true),
      callbackPath: '/shopify/auth/callback',
      isOnline: false,
      rawRequest: req,
      rawResponse: res,
    });
  }catch(e){
    return res.send({error : e})
  }

}

async function authCallback(req, res){
    const callback = await shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });
    req.session.shopify = callback.session;
    res.redirect("https://xrgrzjfd-3000.inc1.devtunnels.ms/shopify")
}

async function startProductPublishPoll(req,res){
  const campaignId = uuidv4();
  let message = req.body.message;
  let job = schedule.scheduleJob(campaignId, '0 0 * * * *', async function () {
      let currentDate = new Date();
      currentDate.setHours(currentDate.getHours() - 1);
      let isoDateTime = currentDate.toISOString();
      const products = await shopify.rest.Product.all({
        session: req.session.shopify,
        published_at_min: isoDateTime
      });
  
      if(!products.data[0]) return;
      const customers = await shopify.rest.Customer.all({
        session: req.session.shopify,
      });     
      
      const productName = products.data[0].title 
      customers.data.forEach((customer)=>{
        const phone = customer.phone;
        //user didnt provide a phone number 
        if(!phone) return;
        const customerName = customer.first_name +" " + customer.last_name;
        message = message.replace(usernameRegex, customerName);
        message = message.replace(productRegex, productName);
        message = message.replace(phoneNoRegex, phone);
        const chatId = phone.substring(1) + "@c.us";
        req.client.sendMessage(chatId,  message );
      })
    })
    try {
      const result = await shopifyModel.create(req.session.user , campaignId, message,req.body.type ) 
      res.status(200).send(result);
    }catch(e){
      res.status(404).json({error : e});
    }
  }
  

async function startCustomerCreatePoll(req,res){
    const campaignId = uuidv4();
    let message = req.body.message;
    let job = schedule.scheduleJob(campaignId, '0 0 * * * *', async function () {
      let currentDate = new Date();
      currentDate.setHours(currentDate.getHours() - 1);
      let isoDateTime = currentDate.toISOString();
  
      const customers = await shopify.rest.Customer.all({
        session: req.session.shopify,
        created_at_min: isoDateTime
      });     
      
      customers.data.forEach((customer)=>{
        const customerName = customer.first_name+" "+ customer.last_name;
        const phone = customer.phone;
        //user didnt provide a phone number 
        if(!phone) return;

        message = message.replace(usernameRegex, customerName);
        message = message.replace(phoneNoRegex, phone);
        console.log(message);
        const chatId = phone.substring(1) + "@c.us";
        req.client.sendMessage(chatId,  message );
      })
    })
    try {
      const result = await shopifyModel.create( req.session.user , campaignId, message, req.body.type) 
      res.status(200).send(result);
    }catch(e){
      console.log(e)
      res.status(404).json({error : e});
    }

  }
  






async function startAbandonedCheckoutPoll(req,res){
    const campaignId = uuidv4();
    let message = req.body.message
    let job = schedule.scheduleJob(campaignId, '0 0 * * * *', async function () {
      let currentDate = new Date();
      currentDate.setHours(currentDate.getHours() - 1);
      let isoDateTime = currentDate.toISOString();
      const checkouts = await shopify.rest.AbandonedCheckout.checkouts({
        session: req.session.shopify,
        created_at_min: isoDateTime
      });
    
        checkouts.checkouts.forEach((checkout)=>{
          console.log(checkout);
            console.log(checkout.customer)
            const phone = checkout.phone
            const sms_marketing_phone = checkout.sms_marketing_phone
            const customer_phone = checkout.customer && checkout.customer.phone
            contact = customer_phone || sms_marketing_phone || phone
            if(!contact) return;
            const url = checkout.abandoned_checkout_url;
            const customerName = checkout.customer && (checkout.customer.first_name + " " + checkout.customer.last_name)
            message = message.replace(usernameRegex, customerName);
            message = message.replace(phoneNoRegex, phone);
            message = message.replace(urlRegex, url);
            const chatId = phone.substring(1) + "@c.us";
            req.client.sendMessage(chatId,  message);
        })      

    })
    try {
      const result = await shopifyModel.create( req.session.user , campaignId, message,req.body.type) 
      res.status(200).send(result);
    }catch(e){
      res.status(404).json({error : e});
    }
  }
  


async function stopPoll(req,res){
    try{
      const poll = await shopifyModel.read(req.params.id)
      const campaignId = poll[0].process_id
      let current_job = schedule.scheduledJobs[campaignId]
      current_job.cancel()
      const result = await shopifyModel.remove(req.params.id);
      console.log(result)
      res.status(200).send(result)
    }
    catch(e){
      res.status(400).send({error : e})
    }
}


async function getPolls(req, res){
    try{
      const polls = await shopifyModel.readAll(req.session.user);
      res.status(200).send(polls);
    }catch(e){
      res.status(400).send({error : e});
    }
}




module.exports = {
    auth, 
    authCallback,
    startProductPublishPoll,
    startCustomerCreatePoll,
    startAbandonedCheckoutPoll,
    stopPoll,
    getPolls
}