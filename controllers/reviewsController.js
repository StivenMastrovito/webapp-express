import connection from "../database/db.js";

function store(req, res, next) {
    const dati = req.body;

    const query = `
    INSERT INTO reviews
    (movie_id, name, vote, text )
    VALUES
    (?, ?, ?, ?)
    `
    connection.query(query, [dati.movie_id, dati.name, dati.vote, dati.text], (err, results) => {
        if(err) return next(err);

        res.status(200).json(dati);
    })
}

export default {
    store,
}