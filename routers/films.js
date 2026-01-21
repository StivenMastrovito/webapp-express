import express from "express"
import filmsController from "../controllers/filmsController.js";
import checkIdExist from "../middlewares/checkIdExist.js";

const router = express.Router();

router.get("/", filmsController.index)

router.get("/search", filmsController.search)


router.get("/:id", checkIdExist, filmsController.show)

export default router