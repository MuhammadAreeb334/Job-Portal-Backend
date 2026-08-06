import express from "express";
import {
  uploadAvatar,
  uploadResume,
  uploadCompanyLogo,
} from "../controllers/uploadController.js";

import { protect } from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

import {
  uploadAvatar as uploadAvatarMiddleware,
  uploadResume as uploadResumeMiddleware,
  uploadCompanyLogo as uploadCompanyLogoMiddleware,
} from "../middleware/upload.js";

const router = express.Router();

router.patch(
  "/avatar",
  protect,
  uploadAvatarMiddleware.single("avatar"),
  uploadAvatar,
);

router.patch(
  "/resume",
  protect,
  authorize("candidate"),
  uploadResumeMiddleware.single("resume"),
  uploadResume,
);

router.patch(
  "/company-logo",
  protect,
  authorize("recruiter"),
  uploadCompanyLogoMiddleware.single("logo"),
  uploadCompanyLogo,
);

export default router;
