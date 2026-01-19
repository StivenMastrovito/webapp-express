import express from "express"
import filmsController from "../controllers/filmsController.js";

const router = express.Router();

router.get("/", filmsController.index)

router.get("/:id", filmsController.show)

export default router