import express from "express";
import userRouter from "./app/routes/user.js";
import productRouter from "./app/routes/product.js"


const app = express();
app.use(express.json());

app.use(userRouter);
app.use(productRouter)

export default app;
