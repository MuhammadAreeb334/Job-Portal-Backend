import express from "express";
import {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  changePassword,
} from "../controllers/authController.js";
import {
  changePasswordValidation,
  loginValidation,
  registerValidation,
  updateProfileValidation,
  validate,
} from "../validations/authValidation.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerValidation, validate, register);
router.post("/login", loginValidation, validate, login);
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);
router.put(
  "/profile",
  protect,
  updateProfileValidation,
  validate,
  updateProfile,
);
router.put(
  "/change-password",
  protect,
  changePasswordValidation,
  validate,
  changePassword,
);

export default router;
