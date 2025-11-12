import { Router } from "express";
import {
    createCategory,
} from "../controllers/category.controllers.js";

const router: Router = Router();

router.post("/", createCategory);

export default router;