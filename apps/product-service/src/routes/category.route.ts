import { Router } from "express";
import {
    createCategory, deleteCategory, getCategories, updateCategory,
} from "../controllers/category.controllers.js";
import {shouldBeAdmin} from "../middleware/authMiddleware";

const router: Router = Router();

router.post("/", shouldBeAdmin,createCategory);
router.put("/:id",shouldBeAdmin, updateCategory);
router.delete("/:id", deleteCategory);
router.get("/", getCategories);

export default router;