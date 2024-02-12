import express from "express";
import userRouter from "./app/routes/user.js";

const app = express();
app.use(express.json());

app.use(userRouter);

export default app;
