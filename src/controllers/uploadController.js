import User from "../models/User.js";
import Company from "../models/Company.js";

import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import deleteFromCloudinary from "../utils/deleteFromCloudinary.js";

export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    const user = await User.findById(req.user._id);
    if (user.avatar?.public_id) {
      await deleteFromCloudinary(user.avatar.public_id);
    }
    const result = await uploadToCloudinary(
      req.file.buffer,
      "job-portal/avatars",
    );

    user.avatar = {
      url: result.secure_url,
      public_id: result.public_id,
    };

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Avatar uploaded successfully.",
      avatar: user.avatar,
    });
  } catch (error) {
    console.error("Upload Avatar Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a resume.",
      });
    }
    const user = await User.findById(req.user._id);

    if (user.resume?.public_id) {
      await deleteFromCloudinary(user.resume.public_id, "raw");
    }

    const result = await uploadToCloudinary(
      req.file.buffer,
      "job-portal/resumes",
      "raw",
      req.file.originalname,
    );

    user.resume = {
      url: result.secure_url,
      public_id: result.public_id,
    };

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Resume uploaded successfully.",
      resume: user.resume,
    });
  } catch (error) {
    console.error("Upload Resume Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const uploadCompanyLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a logo.",
      });
    }
    const user = await User.findById(req.user._id);

    if (!user.company) {
      return res.status(400).json({
        success: false,
        message: "You have not created a company yet.",
      });
    }

    const company = await Company.findById(user.company);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    if (company.logo?.public_id) {
      await deleteFromCloudinary(company.logo.public_id);
    }

    const result = await uploadToCloudinary(
      req.file.buffer,
      "job-portal/company-logos",
    );

    company.logo = {
      url: result.secure_url,
      public_id: result.public_id,
    };
    await company.save();

    return res.status(200).json({
      success: true,
      message: "Company logo uploaded successfully.",
      logo: company.logo,
    });
  } catch (error) {
    console.error("Upload Company Logo Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
