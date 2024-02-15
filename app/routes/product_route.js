import { Router } from "express";
import productController from "../controllers/product_controller.js";
import authenticateToken from "../middlewares/authentication.js";
import authorize from "../middlewares/authorization.js";
import { Permission } from "../helpers/authorization_const.js";

const router = Router();

// Browse Products
router.get("/products", productController.browseProducts);

// Search Products
router.get("/products/search", productController.searchProducts);

// Get Product by id
router.get("/products/:id", productController.readProduct);

// Create Product
router.post(
  "/products",
  authenticateToken,
  authorize(Permission.ADD_PRODUCT),
  productController.addProduct
);

// Update Product
router.put(
  "/products/:id",
  authenticateToken,
  authorize(Permission.EDIT_PRODUCT),
  productController.editProduct
);

// Delete Product
router.delete(
  "/products/:id",
  authenticateToken,
  authorize(Permission.DELETE_PRODUCT),
  productController.deleteProduct
);

export default router;
