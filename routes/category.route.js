import express from "express";
import { addCategory, categoryProducts, companyProductCat, deleteCategory } from "../controllers/category.controller.js";

const router = express.Router();

router.post("/add", addCategory)
router.delete("/delete", deleteCategory)
router.get("/products/:name", categoryProducts)
router.get("/companyProducts/:companyId",companyProductCat)

export default router;
