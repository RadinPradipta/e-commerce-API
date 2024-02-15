import { Router } from "express";
import authenticateToken from "../middlewares/authentication.js";
import Order from "../services/order.js";
import encryption from "../middlewares/encryption.js";
import { decrypt } from "../helpers/encryption.js";
import dotenv from "dotenv";
import authorize from "../middlewares/authorization.js";
import { Permission } from "../helpers/authorization_const.js";

dotenv.config();

const router = Router();

router.use(authenticateToken);

//get all orders
router.get("/orders", authorize(Permission.BROWSE_ORDERS), async (req, res) => {
  const results = await Order.get();
  res.json(results);
})

// get all order by user
router.get("/order", authorize(Permission.READ_ORDER), async (req, res) => {
  const user_id = req.user.id;
  const results = await Order.findByUser(user_id);
  res.json(results);
});

// checkout
router.post("/order", authorize(Permission.ADD_ORDER), async (req, res) => {
  const user_id = req.user.id;
  console.log(user_id);
  const product_ids = req.body.product_ids;
  const results = await Order.checkout(product_ids, user_id);
  results.status === 200
    ? res.json(results)
    : res.status(results.status).json({
        error: results.error,
      });
});

// pay
router.post(
  "/order/pay",
  authorize(Permission.EDIT_ORDER),
  encryption,
  async (req, res) => {
    const decryptedBody = decrypt(req.body, process.env.CRYPTO_SECRET_KEY);
    console.log(decryptedBody);
    const order_id = decryptedBody.order_id;
    const results = await Order.pay(order_id, decryptedBody);
    res.json(results);
  }
);

export default router;
