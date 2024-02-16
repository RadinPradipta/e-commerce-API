import { Router } from "express";
import authController from "../controllers/auth_controller.js";
import validateLogin from "../middlewares/validators/validate_login.js";

const router = Router();

// login
router.post("/login", validateLogin, authController.login);

export default router;
