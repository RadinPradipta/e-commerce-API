import { Router } from "express";
import Cart from "../services/cart.js";
import authenticateToken from "../middlewares/authentication.js";
import authorize from "../middlewares/authorization.js";
import { Permission } from "../helpers/authorization_const.js";

const router = Router();

router.use(authenticateToken);

router.get("/cart", authorize(Permission.READ_CART), async (req, res) => {
  console.log(req.user);
  const results = await Cart.findByUser(req.user.id);
  res.json(results);
  return;
});

router.post("/cart", authorize(Permission.ADD_CART), async (req, res) => {
  const results = await Cart.store(
    req.body.product_id,
    req.user.id,
    req.body.quantity
  );
  res.json(results);
});

router.delete("/cart", authorize(Permission.DELETE_CART), async (req, res) => {
  const user_id = req.user.id;
  const product_id = req.body.product_id;
  const results = await Cart.delete(product_id, user_id);
  res.json(results);
});

export default router;
