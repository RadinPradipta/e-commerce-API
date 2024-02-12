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

router.get("/user/:id", async (req, res) => {
    const results = await User.find(Number(req.params.id))
    res.json(results)
})

router.put("/user/:id", async (req, res) => {
    const id = Number(req.params.id)
    const results = await User.update(id,req.body)
    res.json(results)
})

export default router;
