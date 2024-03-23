const customerModel = require('./../model/customer.model');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');


async function create(req, res){
    const body = req.body;
    if(!body.name || !body.phone || !body.segment_id){
        return res.status(400).json({error : "Missing required parameters"});
    }
    try{
        const result = await customerModel.create(body.name, body.phone, body.segment_id);
        return res.status(200).json(result);
    }catch(e){
        return res.status(400).json({error : e.message});
    }
}

async function read(req, res){
    const id = req.params.segment_id;
    try{
        const result = await customerModel.read(id);
        return res.status(200).json(result);
    }catch(e){
        return res.status(400).json({error : e.message});
    }
}

async function remove(req, res){
    const id = req.params.id;
    try{
        const result = await customerModel.remove(id);
        return res.status(200).json(result);
    }catch(e){
        return res.status(400).json({error : e.message});
    }
}





function insertAllFromFile(req, res){
    // File is uploaded and available in req.file
    const segment_id = req.body.segment_id;
    if (!req.file || !segment_id) {
      return res.status(400).send('Missing file or required parameter');
    }

    
    // Read file contents
    const fileContent = req.file.buffer.toString('utf8');    
    const results = [];
    const readableStream = Readable.from([fileContent]);
    readableStream.pipe(csv())
    .on('data', (data) => {
      results.push(data);
    })
    .on('end', async () => {
        console.log(results);
        try{
            result = await customerModel.insertAll(results,segment_id );
            res.status(200).send(result);
        }catch(e){
            console.log(e);
            res.status(400).send({error : e});
        }

    });
      
  }

module.exports = {
    create, 
    read, 
    remove,
    insertAllFromFile
}