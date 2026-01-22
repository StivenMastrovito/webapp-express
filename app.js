import express from "express";
import connection from "./database/db.js";
import errorHandler from "./middlewares/errorHandler.js";
import moviesRouter from "./routers/films.js";
import reviewsRouter from "./routers/reviews.js";
import notFound from "./middlewares/notFound.js";
import cors from "cors";
import {GoogleGenAI}  from "@google/genai";

const app = express();
const port = process.env.PORT;


app.use(cors({
    origin: "http://localhost:5173"
}))

app.use(express.static("public"));
app.use(express.json());

// const ai = new GoogleGenAI({});

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-3-flash-preview",
//     contents: "puoi scrivere in italiano?",
//     config: {
//       systemInstruction: "",
//     },
//   });
//   console.log(response.text);
// }


// main();



app.use("/api/movies", moviesRouter)
app.use("/api/reviews", reviewsRouter)


app.use(errorHandler)
app.use(notFound);

app.listen(port, (err) => {
    if (err) throw err;
    console.log("Server is listening on port", port);
})
