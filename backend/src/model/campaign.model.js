
const db = require('./../db/index');

async function read(creator_id){
    try{
        const result = await db.query(`SELECT c.*, s.name
        FROM campaign c
        JOIN segment s ON c.segment_id = s.id
        WHERE s.creator_id = $1`, [creator_id]);
        return result.rows;
    }catch(e){
        throw e;
    }
}

async function create(message, image_url, segment_id){
    try{
        const result = await db.query(`
            INSERT INTO campaign(message, image_url, segment_id)
            VALUES ($1, $2, $3);
        `,[ message,  image_url, segment_id])
        return result;
    }catch(e){
        throw e;
    }
}




module.exports = {
    read,
    create, 
}

