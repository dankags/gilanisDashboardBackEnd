import express from "express"
import { getDataByYear, getFiveBestSaling } from "../controllers/productMonthly.controller.js";

const router = express.Router()

router.get("/bestSalingProducts", getFiveBestSaling);
router.get("/yearly/:productId", getDataByYear);

export default router