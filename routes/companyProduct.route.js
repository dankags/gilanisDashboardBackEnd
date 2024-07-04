import express from "express"
import { createComProduct, createManyCompanyProducts } from "../controllers/companyProduct.controller.js"


const router = express.Router()

router.post("/create", createComProduct);
router.post("/createMany", createManyCompanyProducts);


export default router