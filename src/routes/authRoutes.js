import express from "express";
import { register } from "../controllers/authController.js";
import { registerValidation, validate } from "../validations/authValidation.js";

const router = express.Router();

router.post("/register", registerValidation, validate, register);

export default router;
