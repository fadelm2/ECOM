import { Router } from "express";
import {
    createCategory, getCategory, getCategorys, updateCategory,
} from "../controllers/category.controllers.js";
import {deleteProduct} from "../controllers/product.controllers";

const router: Router = Router();

router.post("/", createCategory);
router.get("/:id", getCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteProduct);
router.get("/", getCategorys);

export default router;