const db = require('../db/index');


async function read(id){
    try{
        const result = await db.query(`
        SELECT *
        FROM poll
        WHERE id = $1`, [id]);
        return result.rows;
    }catch(e){
        throw e;
    }
}

async function readAll(creator_id){
    try{
        const result = await db.query(`
        SELECT *
        FROM poll
        WHERE creator_id = $1`, [creator_id]);
        return result.rows;
    }catch(e){
        throw e;
    }
}

async function create(creator_id, process_id,message, type){
    try{
        const result = await db.query(`
            INSERT INTO poll(creator_id, process_id, message, type)
            VALUES ($1, $2,$3, $4);
        `,[ creator_id, process_id, message,type])
        return result;
    }catch(e){
        throw e;
    }
}

async function remove(id){
    try{
        const result = await db.query(`
        DELETE 
        FROM poll
        WHERE id = $1`, [id]);
        return result;
    }catch(e){
        throw e;
    }
}


module.exports = {
    read,
    readAll,
    create, 
    remove
}