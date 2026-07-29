import express from "express";
import { validate } from "../validations/authValidation.js";
import { protect } from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import {
  createCompanyValidation,
  updateCompanyValidation,
} from "../validations/companyValidation.js";
import {
  createCompany,
  getMyCompany,
  updateCompany,
  deleteCompany,
} from "../controllers/companyController.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("recruiter"),
  createCompanyValidation,
  validate,
  createCompany,
);

router.get("/my-company", protect, authorize("recruiter"), getMyCompany);

router.put(
  "/my-company",
  protect,
  authorize("recruiter"),
  updateCompanyValidation,
  validate,
  updateCompany,
);

router.delete("/my-company", protect, authorize("recruiter"), deleteCompany);

export default router;
