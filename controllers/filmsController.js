import slugify from "slugify";
import connection from "../database/db.js";

function index(req, res, next) {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 2;
    const offset = (page - 1) * limit;
    const query = `
    select movies.*, cast(avg(reviews.vote) as float) as avarage_vote 
    from movies
    left join reviews
    on reviews.movie_id = movies.id
    group by movies.id
    limit ? offset ?
    `

    
    connection.query(query, [limit, offset], (err, results) => {
        if (err) return next(err);

        const queryTot = `
        select count(id) as total
        from movies
        `
        connection.query(queryTot, (err, resultsTot) => {
            if (err) return next(err);

            res.json({
                info: {
                    total: resultsTot[0].total,
                    cur_page: page,
                    total_page: Math.ceil(resultsTot[0].total / limit)
                },
                result: results,
            })
        })



    })
}

function show(req, res, next) {
    const slug = req.params.slug;

    const query = `
    select movies.*, avg(reviews.vote) as voto_medio
    from movies
    left join reviews
    on movies.id = reviews.movie_id
    where movies.slug = ?`

    connection.query(query, [slug], (err, results) => {
        if (err) return next(err);

        const movie = results[0];

        const queryReviews = `
        select *
        from reviews
        where movie_id = ?`

        connection.query(queryReviews, [movie.id], (err, reviewsResults) => {
            if (err) return next(err);
            res.json({
                ...movie,
                reviews: reviewsResults,
            })
        })
    })

}

function search(req, res, next){
    const filter = `%${req.query.filter}%`
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 2;
    const offset = (page - 1) * limit;

    const query = `
    select movies.*, cast(avg(reviews.vote) as float) as avarage_vote 
    from movies
    left join reviews
    on reviews.movie_id = movies.id
    where movies.title LIKE ?
    group by movies.id
    limit ? offset ?
    `

    
    connection.query(query, [filter, limit, offset], (err, results) => {
        if (err) return next(err);

        const queryTot = `
        select count(id) as total
        from movies
        where title like ?
        `
        connection.query(queryTot, [filter], (err, resultsTot) => {
            if (err) return next(err);

            res.json({
                info: {
                    total: resultsTot[0].total,
                    cur_page: page,
                    total_page: Math.ceil(resultsTot[0].total / limit)
                },
                result: results,
            })
        })
    })

}

function store(req, res, next){
    console.log(req.body, req.file);
    
    const dati = req.body;
    const slug = slugify(dati.title, {
        lower: true,
        strict: true,
    })
    
    const sql = `
    insert into movies (slug, title, director, abstract, image)
    value (?, ?, ?, ?, ?)`

    connection.query(sql, [slug, dati.title, dati.director, dati.abstract, req.file.filename], (err, results) => {
        if(err) return next(err);

        return res.status(201).json({
            message: "Film aggiunto con successo",
            id: results.insertId
        })
    })
    
}

export default {
    index,
    show,
    search,
    store,
}