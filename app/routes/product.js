import { Router } from "express";
import Product from "../services/product.js";

const router = Router();


// Browse Products
router.get("/products", async (req, res) => {
  const results = await Product.get();
  res.json(results);
});

// Get Product by id
router.get("/products/:id", async (req, res) => {
  const id = Number(req.params.id);
  const results = await Product.find(id);
  res.json(results);
});

// Create Product
router.post("/products", async (req, res) => {
  const results = await Product.store(req.body);
  res.json(results);
});

// Update Product
router.put("/products/:id", async (req, res) => {
  const id = Number(req.params.id);
  const results = await Product.update(id, req.body);
  res.json(results);
});

// Delete Product
router.delete("/products/:id", async (req, res) => {
  const id = Number(req.params.id);
  const results = await Product.delete(id);
  res.json(results);
});

export default router;
