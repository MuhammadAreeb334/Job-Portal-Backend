import Application from "../models/Application.js";
import Job from "../models/Job.js";
import User from "../models/User.js";

export const applyForJob = async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;

    const job = await Job.findOne({ _id: jobId, status: "Open" });
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found or is no longer accepting applications.",
      });
    }

    const existingApplication = await Application.findOne({
      candidate: req.user._id,
      job: jobId,
    });
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job.",
      });
    }

    const candidate = await User.findById(req.user._id);
    // if (!candidate.resume?.url) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Please upload your resume before applying.",
    //   });
    // }

    const application = await Application.create({
      candidate: req.user._id,
      job: jobId,
      resume: candidate.resume,
      coverLetter,
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully.",
      application,
    });
  } catch (error) {
    console.error("Apply For Job Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
