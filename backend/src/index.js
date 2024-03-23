const express = require("express");
const app = express();
var cors = require('cors')
app.use(cors({ 
    origin: ['https://master.d2lfwp4c45elp5.amplifyapp.com','https://www.wato-mate.in', "https://wato-mate.in"], 
    methods: ['GET', 'POST', 'DELETE'], 
    credentials: true,
}))
const path = require('path')
require('dotenv').config({path: path.join(__dirname, '..','.env')})
const db = require('./db/index')
const fs = require("fs");
const { Client, LocalAuth } = require('whatsapp-web.js');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
    cors:{  
        origin: ['https://master.d2lfwp4c45elp5.amplifyapp.com','https://www.wato-mate.in', "https://wato-mate.in"], 
        methods: ['GET', 'POST'],
        credentials: true,
    }
}); 
const segmentRouter = require("./router/segment.router");
const customerRouter = require("./router/customer.router");
const campaignRouter = require("./router/campaign.router");
const gptRouter = require("./router/gpt.router");
const authRouter = require("./router/auth.router");
const  logoutRouter = require("./router/logout.router")
const shopifyRouter = require("./router/shopify.router")
const { isAuthenticated } = require("./middleware/auth");
const { sessionStore} = require("./middleware/session.middleware");
const { isShopifyAuthorised } = require("./middleware/shopify.middleware");
const clientSessions = {}


//fix : secure cookie in prod
app.set('trust proxy', 1) // trust first proxy
sharedSession = require("cookie-session")({
    name: 'session',
    secure: true,
    sameSite:"none",
    keys: [process.env.COOKIE_KEY],
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
}),
 

app.use(sharedSession);
app.use(express.json());
app.get('/healthcheck', (req, res) => res.send('Hello World!'))
app.use('/auth', authRouter)
app.use('/gpt',isAuthenticated, sessionStore(clientSessions), gptRouter);
app.use('/campaign',isAuthenticated,sessionStore(clientSessions), campaignRouter);
app.use('/segment',isAuthenticated,sessionStore(clientSessions),segmentRouter);
app.use('/customerentry',isAuthenticated,sessionStore(clientSessions),customerRouter)
app.use('/shopify',isAuthenticated,sessionStore(clientSessions), shopifyRouter)
app.use('/logout', sessionStore(clientSessions), logoutRouter)

const createSession = (id, socket)=>{
    console.log("creating session")
    const client = new Client({
        puppeteer:{
            args:[
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ],
            headless: true,
        },
        authStrategy : new LocalAuth({
            clientId : id ,
        })
    })
    
    client.on('qr', (qr) => {
        console.log(qr)
        socket.emit("code", qr);
    });
    

    client.on("ready", ()=>{
        console.log("client ready")
        clientSessions[socket.request.session.user] = client;
        socket.emit("ready", "client is ready")
    })

    client.on("authenticated", ()=>{
        console.log("client authenticated")
    })  
    
    client.initialize();
}


const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(sharedSession));
io.on('connection', (socket) => {
    socket.on("disconnect", ()=>{   
        console.log("user disconnected");
    })
  

    socket.on("connected", (data)=>{
        console.log("connected to server " , data);
        socket.emit("hello", "Hello from server");
    })

    socket.on("session", ()=>{
        if(socket.request.session && socket.request.session.user){
            let id = socket.request.session.user;
            email = id.replace(/[.@-]/g, '');
            createSession(email, socket);
        }
    })
});
  


async function startServer(){
    await db.query("DELETE FROM poll")
    server.listen(process.env.PORT, () => {
        console.log('listening on *:5000');
    });
}
startServer()