import { Router } from "express";
import authenticateToken from "../middlewares/authentication.js";
import authorize from "../middlewares/authorization.js";
import { Permission } from "../helpers/authorization_const.js";
import cartController from "../controllers/cart_controller.js";

const router = Router();

router.get(
  "/cart",
  authenticateToken,
  authorize(Permission.READ_CART),
  cartController.readCart
);

router.post(
  "/cart",
  authenticateToken,
  authorize(Permission.ADD_CART),
  cartController.addToCart
);

router.delete(
  "/cart",
  authorize(Permission.DELETE_CART),
  cartController.deleteCart
);

export default router;
