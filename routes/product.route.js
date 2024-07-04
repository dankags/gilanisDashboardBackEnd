import express from "express"
import { createManyProducts, createProduct,  } from "../controllers/product.controller.js";

const router = express.Router()

router.post("/create",createProduct)
router.post("/createMany", createManyProducts)


export default router;