import { Router } from "express";
import Product from "../services/product.js";
import authorize from "../middlewares/authorization.js";
import { Permission } from "../helpers/authorization_const.js";

const router = Router();

// Browse Products
router.get("/products", async (req, res) => {
  const results = await Product.get();
  res.json(results);
});

// Search Products
router.get("/products/search", async (req, res) => {
  const results = await Product.searchProducts(req.query);
  res.json(results);
})

// Get Product by id
router.get(
  "/products/:id",
  authorize(Permission.READ_PRODUCT_PRODUCTS),
  async (req, res) => {
    const id = Number(req.params.id);
    const results = await Product.find(id);
    res.json(results);
  }
);

// Create Product
router.post(
  "/products",
  authorize(Permission.ADD_PRODUCT),
  async (req, res) => {
    const results = await Product.store(req.body);
    res.json(results);
  }
);

// Update Product
router.put(
  "/products/:id",
  authorize(Permission.EDIT_PRODUCT),
  async (req, res) => {
    const id = Number(req.params.id);
    const results = await Product.update(id, req.body);
    res.json(results);
  }
);

// Delete Product
router.delete(
  "/products/:id",
  authorize(Permission.DELETE_PRODUCT),
  async (req, res) => {
    const id = Number(req.params.id);
    const results = await Product.delete(id);
    res.json(results);
  }
);

export default router;
