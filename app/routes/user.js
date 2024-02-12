import { Router } from "express";
import User from "../services/user.js";

const router = Router();

router.get("/user", async (req, res) => {
  const results = await User.get();
  res.json(results);
})

router.post("/user", async (req, res) => {
    const results = await User.store(req.body)
    res.json(results)
})

export default router;
