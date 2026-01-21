import express from "express"
import reviewController from "../controllers/reviewsController.js";
import checkIdExist from "../middlewares/checkIdExist.js";

const router = express.Router();

router.post("/", reviewController.store)

export default router