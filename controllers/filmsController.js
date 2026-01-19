import connection from "../database/db.js";

function index(req, res, next){
    const query = `
    select *
    from movies
    `
    connection.query(query, (err, results) => {
        if (err) return next(err);

        res.json(results)
    })
}

function show(req, res, next){
    const id = req.params.id;

    const query = `
    select movies.*, avg(reviews.vote) as voto_medio
    from movies
    inner join reviews
    on movies.id = reviews.movie_id
    where movies.id = ?`

    connection.query(query, [id], (err, results) => {
        if(err) return next(err);

        const movie = results[0];

        const queryReviews = `
        select *
        from reviews
        where movie_id = ?`

        connection.query(queryReviews, [id], (err, reviewsResults) => {
            if(err) return next(err);
            res.json({
                ...movie,
                reviews: reviewsResults,
            })
        })
    })
    
}

export default {
    index, 
    show
}