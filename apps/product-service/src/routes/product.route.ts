import { Router } from "express";

import {createProduct, deleteProduct, getProduct, getProducts, updateProduct} from "../controllers/product.controllers";
import {shouldBeAdmin} from "../middleware/authMiddleware";

const router: Router = Router();

router.post("/", shouldBeAdmin,createProduct);
router.get("/:id", getProduct);
router.put("/:id", shouldBeAdmin,updateProduct);
router.delete("/:id",shouldBeAdmin ,deleteProduct);
router.get("/", getProducts);

export default router;