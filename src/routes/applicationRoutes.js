import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import { validate } from "../validations/authValidation.js";
import {
  applyForJobValidation,
  updateApplicationStatusValidation,
} from "../validations/applicationValidation.js";
import {
  applyForJob,
  getApplicantsByJob,
  getMyApplications,
  updateApplicationStatus,
  withdrawApplication,
} from "../controllers/applicationController.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("candidate"),
  applyForJobValidation,
  validate,
  applyForJob,
);
router.get(
  "/my-applications",
  protect,
  authorize("candidate"),
  getMyApplications,
);
router.get("/job/:jobId", protect, authorize("recruiter"), getApplicantsByJob);
router.patch(
  "/:id/status",
  protect,
  authorize("recruiter"),
  updateApplicationStatusValidation,
  validate,
  updateApplicationStatus,
);

router.delete("/:id", protect, authorize("candidate"), withdrawApplication);

export default router;
