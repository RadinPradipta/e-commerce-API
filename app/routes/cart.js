import { Router } from "express";
import Cart from "../services/cart.js";
import authenticateToken from "../middlewares/authentication.js";

const router = Router();

router.use(authenticateToken);

router.get("/cart", async (req, res) => {
  console.log(req.user);
  if (req.user.role_id === 2) {
    const results = await Cart.findByUser(req.user.id);
    res.json(results);
    return;
  }
  res.json({ error: "Not allowed" });
});

router.post("/cart", async (req, res) => {
  const results = await Cart.store(
    req.body.product_id,
    req.user.id,
    req.body.quantity
  );
  res.json(results);
});

router.delete("/cart", async (req, res) => {
  const user_id = req.user.id;
  const product_id = req.body.product_id;
  const results = await Cart.delete(product_id, user_id);
  res.json(results);
});

export default router;
