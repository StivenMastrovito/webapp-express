import connection from "../database/db.js";

export default function checkIdExist(req, res, next) {
    const slug = req.params.slug;

    const query = `
    select * 
    from movies
    where slug = ?`

    connection.query(query, [slug], (err, results) => {
        if (err) return next(err)

        if (results.length === 0) {
            res.status(404).json({
                error: "Not Found",
                message: `slug: ${id} not exist`
            })
        }

        req.movie = results[0];
        next();
    })
}