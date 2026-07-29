import { body } from "express-validator";

export const createCompanyValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Company name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Company name must be between 2 and 100 characters"),

  body("website")
    .optional()
    .trim()
    .isURL()
    .withMessage("Please enter a valid website URL"),

  body("location")
    .trim()
    .notEmpty()
    .withMessage("Company location is required")
    .isLength({ max: 100 })
    .withMessage("Location cannot exceed 100 characters"),

  body("industry")
    .notEmpty()
    .withMessage("Industry is required")
    .isIn([
      "Software",
      "Finance",
      "Healthcare",
      "Education",
      "E-Commerce",
      "Manufacturing",
      "Marketing",
      "Consulting",
      "Other",
    ])
    .withMessage("Invalid industry"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Company description is required")
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),

  body("employees")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Employees must be a positive number"),
];

export const updateCompanyValidation = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Company name must be between 2 and 100 characters"),

  body("website")
    .optional()
    .trim()
    .isURL()
    .withMessage("Please enter a valid website URL"),

  body("location")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Location cannot exceed 100 characters"),

  body("industry")
    .optional()
    .isIn([
      "Software",
      "Finance",
      "Healthcare",
      "Education",
      "E-Commerce",
      "Manufacturing",
      "Marketing",
      "Consulting",
      "Other",
    ])
    .withMessage("Invalid industry"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),

  body("employees")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Employees must be a positive number"),
];
