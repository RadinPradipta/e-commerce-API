import { Router } from "express";
import userRouter from "./user_route.js";
import productRouter from "./product_route.js";
import cartRouter from "./cart_route.js";
import orderRouter from "./order_route.js";
import authRouter from "./auth_route.js";
import paymentRouter from "./payment_route.js";

const router = Router();

router.use(userRouter);
router.use(productRouter);
router.use(cartRouter);
router.use(orderRouter);
router.use(authRouter);
router.use(paymentRouter);

export default router;
