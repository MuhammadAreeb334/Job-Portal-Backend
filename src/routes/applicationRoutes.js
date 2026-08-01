import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import { validate } from "../validations/authValidation.js";
import { applyForJobValidation } from "../validations/applicationValidation.js";
import { applyForJob } from "../controllers/applicationController.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("candidate"),
  applyForJobValidation,
  validate,
  applyForJob,
);

export default router;
