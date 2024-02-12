import { Router } from "express";
import User from "../services/user.js";

const router = Router();

router.post("/login", async (req, res) => {
    const results = await User.login(req.body)
    res.json(results)
})

export default router