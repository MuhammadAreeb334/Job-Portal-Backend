import express from "express";
import {
  createJob,
  getMyJobs,
  // updateJob,
  // deleteJob,
  // getAllJobs,
  // getJobById,
} from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

import {
  createJobValidation,
  // updateJobValidation,
} from "../validations/jobValidation.js";

import { validate } from "../validations/authValidation.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("recruiter"),
  createJobValidation,
  validate,
  createJob,
);
router.get("/my-jobs", protect, authorize("recruiter"), getMyJobs);

// Future Routes


// router.put(
//   "/:id",
//   protect,
//   authorize("recruiter"),
//   updateJobValidation,
//   validate,
//   updateJob
// );

// router.delete("/:id", protect, authorize("recruiter"), deleteJob);

// Candidate Routes

// router.get("/", getAllJobs);

// router.get("/:id", getJobById);

export default router;
