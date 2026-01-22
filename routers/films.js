import express from "express"
import filmsController from "../controllers/filmsController.js";
import checkIdExist from "../middlewares/checkIdExist.js";
import upload from "../middlewares/saveImg.js";

const router = express.Router();

router.get("/", filmsController.index)

router.get("/search", filmsController.search)

router.get("/:slug", checkIdExist, filmsController.show)

router.post("/", upload.single("image"), filmsController.store)

export default router