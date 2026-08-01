import { body, validationResult } from "express-validator";

export const applyForJobValidation = [
  body("jobId")
    .notEmpty()
    .withMessage("Job ID is required")
    .isMongoId()
    .withMessage("Invalid Job ID"),

  body("coverLetter")
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Cover letter cannot exceed 2000 characters"),
];

export const updateApplicationStatusValidation = [
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["Pending", "Reviewed", "Interview", "Accepted", "Rejected"])
    .withMessage("Invalid application status"),
];
