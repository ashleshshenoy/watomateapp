const segmentModel = require('./../model/segment.model');

async function create(req, res){
    const body = req.body;
    const id = req.session.user;
    if(!body.name || !body.description ){
        return res.status(400).json({error : "Missing required parameters"});
    }
    try{
        const result = await segmentModel.create(body.name, body.description, id);
        return res.status(200).json(result);
    }catch(e){
        return res.status(400).json({error : e.message});
    }
}

async function read(req, res){
    const id = req.session.user;
    try{
        const result = await segmentModel.read(id);
        return res.status(200).json(result);
    }catch(e){
        return res.status(400).json({error : e.message});
    }
}

async function remove(req, res){
    const id = req.params.id;
    try{
        const result = await segmentModel.remove(id);
        return res.status(200).json(result);
    }catch(e){
        return res.status(400).json({error : e.message});
    }
}


module.exports = {
    create, 
    read, 
    remove
}