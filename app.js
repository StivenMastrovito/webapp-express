import express from "express";
import connection from "./database/db.js";
import errorHandler from "./middlewares/errorHandler.js";
import moviesRouter from "./routers/films.js";
import reviewsRouter from "./routers/reviews.js";
import notFound from "./middlewares/notFound.js";
import cors from "cors";


const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: "http://localhost:5173"
}))

app.use(express.static("public"));
app.use(express.json());

app.use("/api/movies", moviesRouter)
app.use("/api/reviews", reviewsRouter)


app.use(errorHandler)
app.use(notFound);

app.listen(port, (err) => {
    if(err) throw err;
    console.log("Server is listening on port", port);  
})
