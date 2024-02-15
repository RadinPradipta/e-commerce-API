import { Router } from "express";
import authenticateToken from "../middlewares/authentication.js";
import authorize from "../middlewares/authorization.js";
import { Permission } from "../helpers/authorization_const.js";
import encryption from "../middlewares/encryption.js";
import paymentController from "../controllers/payment_controller.js";

const router = Router();

// pay
router.post(
  "/pay",
  authenticateToken,
  authorize(Permission.EDIT_ORDER),
  encryption,
  paymentController.pay
);

export default router;
