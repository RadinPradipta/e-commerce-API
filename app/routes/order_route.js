import { Router } from "express";
import authenticateToken from "../middlewares/authentication.js";
import orderController from "../controllers/order_controller.js";
import authorize from "../middlewares/authorization.js";
import { Permission } from "../helpers/authorization_const.js";

const router = Router();

// router.use(authenticateToken);

//get all orders
router.get(
  "/orders",
  authenticateToken,
  authorize(Permission.BROWSE_ORDERS),
  orderController.browseOrders
);

// get all order by user
router.get(
  "/order",
  authenticateToken,
  authorize(Permission.READ_ORDER),
  orderController.browseOrderByUser
);

// checkout
router.post(
  "/order",
  authenticateToken,
  authorize(Permission.ADD_ORDER),
  orderController.checkout
);

export default router;
