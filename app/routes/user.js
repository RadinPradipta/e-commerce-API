import { Router } from "express";
import User from "../services/user.js";
import authenticateToken from "../middlewares/authentication.js";
import { Permission } from "../helpers/authorization_const.js";
import authorize from "../middlewares/authorization.js";

const router = Router();

router.get(
  "/user",
  [authenticateToken, authorize(Permission.BROWSE_USERS)],
  async (req, res) => {
    const results = await User.get();
    res.json({ results: results });
  }
);

router.post("/user", async (req, res) => {
  const results = await User.store(req.body);
  res.json(results);
});

router.post("/user/login", async (req, res) => {
  const results = await User.login(req.body);
  res.json(results);
});

router.get("/user/:id", authorize(Permission.READ_USER),async (req, res) => {
  const results = await User.find(Number(req.params.id));
  res.json(results);
});

router.put(
  "/user/:id",
  [authenticateToken, authorize(Permission.EDIT_USER)],
  async (req, res) => {
    const id = Number(req.params.id);
    const results = await User.update(id, req.body);
    res.json(results);
  }
);

export default router;
