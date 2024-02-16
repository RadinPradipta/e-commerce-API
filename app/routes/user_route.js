import { Router } from "express";
import userController from "../controllers/user_controller.js";
import authenticateToken from "../middlewares/authentication.js";
import { Permission } from "../helpers/authorization_const.js";
import authorize from "../middlewares/authorization.js";
import validateRegister from "../middlewares/validators/validate_register.js";

const router = Router();

// get all users
router.get("/user", userController.browseUsers);

// register new user
router.post("/user", validateRegister, userController.register);

// read user by id
router.get(
  "/user/:id",
  authenticateToken,
  authorize(Permission.READ_USER),
  userController.readUser
);

// update user by id
router.put(
  "/user/:id",
  authenticateToken,
  authorize(Permission.EDIT_USER),
  userController.editUser
);

export default router;
