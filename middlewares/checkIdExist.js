import connection from "../database/db.js";

export default function checkIdExist(req, res, next){
    const id = req.params.id;

    const query = `
    select * 
    from movies
    where id = ?`

    conn
}