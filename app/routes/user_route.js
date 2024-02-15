import { Router } from "express";
import userController from "../controllers/user_controller.js";
import authenticateToken from "../middlewares/authentication.js";
import { Permission } from "../helpers/authorization_const.js";
import authorize from "../middlewares/authorization.js";
import user from "../services/user_service.js";

const router = Router();

router.get("/user", userController.browseUsers);

router.post("/user", userController.register);

router.get(
  "/user/:id",
  authorize(Permission.READ_USER),
  userController.readUser
);

router.put(
  "/user/:id",
  authenticateToken,
  authorize(Permission.EDIT_USER),
  userController.editUser
);

export default router;
