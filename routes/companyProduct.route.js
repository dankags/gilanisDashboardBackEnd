import express from "express"
import { createComProduct } from "../controllers/companyProduct.controller.js"


const router = express.Router()

router.post("/create", createComProduct);


export default router