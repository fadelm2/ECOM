import { Router } from "express";

import {createProduct, deleteProduct, getProduct, getProducts, updateProduct} from "../controllers/product.controllers";

const router: Router = Router();

router.post("/", createProduct);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/", getProducts);

export default router;