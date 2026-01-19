import connection from "../database/db.js";

export default function checkIdExist(req, res, next) {
    const id = req.params.id;

    const query = `
    select * 
    from movies
    where id = ?`

    connection.query(query, [id], (err, results) => {
        if (err) return next(err)

        if (results.length === 0) {
            res.status(404).json({
                error: "Not Found",
                message: `ID: ${id} not exist`
            })
        }

        req.movie = results[0];
        next();
    })
}