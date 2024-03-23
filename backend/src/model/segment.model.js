const db = require('./../db/index');


async function create(name , description , creator_id){

    try{
        const result = await db.query(
            'insert into segment(name, description, creator_id) values($1,$2,$3)',
            [name, description, creator_id]
        )
        return result;
    }catch(e){
        throw e;
    }
}


async function read(creator_id){
    try{
        const result = await db.query("select * from segment where creator_id = $1",[creator_id])
        return result.rows;
    }catch(e){
        throw e;
    }
}


async function remove(id){
    try{
        const result = await db.query("select * from segment where id = $1", [id]);
        if(!result.rows.length > 0){
            throw new Error("No valid segment exits for given id.");
        }
        await db.query("delete from segment where id=$1",[id]);
        return {message : "successfully removed segment"};
    }
    catch(e){
        throw e;
    }
}


module.exports = {
    create,
    read,
    remove,
}