import express from "express";
import connection from "./database/db.js";
import errorHandler from "./middlewares/errorHandler.js";
import moviesRouter from "./routers/films.js";
import notFound from "./middlewares/notFound.js";


const app = express();
const port = process.env.PORT;

app.use(express.static("public"));
app.use(express.json());

app.use("/api/movies", moviesRouter)

app.use(errorHandler)
app.use(notFound);

app.listen(port, (err) => {
    if(err) throw err;
    console.log("Server is listening on port", port);  
})
