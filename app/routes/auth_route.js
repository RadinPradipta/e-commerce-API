import { Router } from "express";
import authController from "../controllers/auth_controller.js";

const router = Router();

router.post("/login", authController.login);

export default router;
