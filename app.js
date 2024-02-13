import express from "express";
import userRouter from "./app/routes/user.js";
import productRouter from "./app/routes/product.js"
import loginRouter from "./app/routes/login.js"
import cartRouter from "./app/routes/cart.js"

const app = express();
app.use(express.json());

app.use(userRouter);
app.use(productRouter)
app.use(loginRouter)
app.use(cartRouter)

export default app;
