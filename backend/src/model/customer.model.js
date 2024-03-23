const db = require('./../db/index');


async function create(name , phone, segment_id){

    try{
        const segment = await db.query("SELECT * FROM segment WHERE id=$1", [segment_id]);
        if(!segment.rows.length >0){
            throw new Error("No valid segment exits for given id.");
        }
        const result = await db.query(
            'INSERT INTO customerentry(name, phone, segment_id) VALUES($1,$2,$3)',
            [name, phone, segment_id]
        )
        return result;
    }catch(e){
        throw e;
    }
}


async function read(segment_id){
    try{
        const result = await db.query("SELECT * FROM customerentry WHERE segment_id= $1",[segment_id])
        return result.rows;
    }catch(e){
        throw e;
    }
}


async function remove(id){
    try{
        const result = await db.query("SELECT * FROM customerentry WHERE id=$1", [id]);
        if(!result.rows.length > 0){
            throw new Error("No valid customerentry exists with given id")
        }
        await db.query("DELETE FROM customerentry WHERE id=$1",[id]);
        return {message : "successfully removed customerentry"};
    }
    catch(e){
        throw e;
    }
}



// { name: 'John Doe', phone: '123-456-7890' },
// { name: 'Jane Smith', phone: '987-654-3210' },
// { name: 'Alice Johnson', phone: '555-123-4567' },
// { name: 'Bob Brown', phone: '999-888-7777' },
// {}

async function insertAll(records, segment_id){
    try{
        let q = "INSERT INTO customerentry(name, phone, segment_id) VALUES"
        if(records.length < 1) throw new Error("invalid records");
        for(const record of records){
            
            if (!record.name || !record.phone || record.name.trim() == '' || record.phone.trim() == ''){
                throw new Error("invalid record")
            }
            q+=(`('${record.name}','${record.phone}', ${segment_id}),`)
        }
        q = q.slice(0, -1) + ";"
        console.log(q) 
        const result = await db.query(q);
        return result;
    }
    catch(e){
        throw e ;
    }
}

module.exports = {
    create,
    read,
    remove,
    insertAll
}