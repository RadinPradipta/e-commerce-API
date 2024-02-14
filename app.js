import express from "express";
import userRouter from "./app/routes/user.js";
import productRouter from "./app/routes/product.js";
import cartRouter from "./app/routes/cart.js";
import orderRouter from "./app/routes/order.js";

const app = express();
app.use(express.json());

app.use(userRouter);
app.use(productRouter);
app.use(cartRouter);
app.use(orderRouter);

export default app;
