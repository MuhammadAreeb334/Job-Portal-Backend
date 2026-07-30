import { body } from "express-validator";
import {
  JOB_TYPES,
  JOB_STATUSES,
  EXPERIENCE_LEVELS,
} from "../constants/jobConstants.js";

export const createJobValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Job title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Job title must be between 3 and 100 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Job description is required")
    .isLength({ min: 20, max: 5000 })
    .withMessage("Description must be between 20 and 5000 characters"),

  body("requirements")
    .isArray({ min: 1 })
    .withMessage("At least one requirement is required"),

  body("requirements.*")
    .trim()
    .notEmpty()
    .withMessage("Requirement cannot be empty"),

  body("salary")
    .isNumeric()
    .withMessage("Salary must be a number")
    .isFloat({ min: 0 })
    .withMessage("Salary cannot be negative"),

  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required")
    .isLength({ max: 100 })
    .withMessage("Location cannot exceed 100 characters"),

  body("jobType")
    .notEmpty()
    .withMessage("Job type is required")
    .isIn(JOB_TYPES)
    .withMessage("Invalid job type"),

  body("experience")
    .notEmpty()
    .withMessage("Experience level is required")
    .isIn(EXPERIENCE_LEVELS)
    .withMessage("Invalid experience level"),

  body("skills")
    .isArray({ min: 1 })
    .withMessage("At least one skill is required"),

  body("skills.*").trim().notEmpty().withMessage("Skill cannot be empty"),

  body("deadline")
    .notEmpty()
    .withMessage("Application deadline is required")
    .isISO8601()
    .withMessage("Invalid deadline date")
    .toDate(),

  body("status")
    .optional()
    .isIn(JOB_STATUSES)
    .withMessage("Invalid job status"),
];

export const updateJobValidation = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Job title must be between 3 and 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ min: 20, max: 5000 })
    .withMessage("Description must be between 20 and 5000 characters"),

  body("requirements")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Requirements must be a non-empty array"),

  body("requirements.*")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Requirement cannot be empty"),

  body("salary")
    .optional()
    .isNumeric()
    .withMessage("Salary must be a number")
    .isFloat({ min: 0 })
    .withMessage("Salary cannot be negative"),

  body("location")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Location cannot exceed 100 characters"),

  body("jobType").optional().isIn(JOB_TYPES).withMessage("Invalid job type"),

  body("experience")
    .optional()
    .isIn(EXPERIENCE_LEVELS)
    .withMessage("Invalid experience level"),

  body("skills")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Skills must be a non-empty array"),

  body("skills.*")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Skill cannot be empty"),

  body("deadline")
    .optional()
    .isISO8601()
    .withMessage("Invalid deadline date")
    .toDate(),

  body("status")
    .optional()
    .isIn(JOB_STATUSES)
    .withMessage("Invalid job status"),
];
