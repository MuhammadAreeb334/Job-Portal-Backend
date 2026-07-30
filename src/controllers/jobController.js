import Company from "../models/Company.js";
import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      skills,
      deadline,
    } = req.body;

    if (!req.user.company) {
      return res.status(400).json({
        success: false,
        message: "Please create a company before posting jobs.",
      });
    }

    const company = await Company.findById(req.user.company);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    if (!company.isApproved) {
      return res.status(403).json({
        success: false,
        message: "Your company is awaiting admin approval.",
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      skills,
      company: company._id,
      postedBy: req.user._id,
      deadline,
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully.",
      job,
    });
  } catch (error) {
    console.error("Create Job Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id })
      .populate("company", "name logo location industry")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error("Get My Jobs Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
