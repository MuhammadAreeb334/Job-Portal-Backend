import Application from "../models/Application.js";
import Job from "../models/Job.js";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";
import { applicationSubmittedTemplate } from "../utils/emailTemplates.js";
import { applicationStatusTemplate } from "../utils/emailTemplates.js";

export const applyForJob = async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;

    const job = await Job.findOne({
      _id: jobId,
      status: "Open",
    }).populate("company", "name");

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
    if (!candidate.resume?.url) {
      return res.status(400).json({
        success: false,
        message: "Please upload your resume before applying.",
      });
    }

    const application = await Application.create({
      candidate: req.user._id,
      job: jobId,
      resume: candidate.resume,
      coverLetter,
      status: "Pending",
    });

    try {
      await sendEmail({
        to: candidate.email,
        subject: "Application Submitted",
        html: applicationSubmittedTemplate(
          candidate.name,
          job.title,
          job.company.name,
        ),
      });
    } catch (error) {
      console.error("Application Email Error:", error.message);
    }

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

export const withdrawApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    if (application.candidate.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to withdraw this application.",
      });
    }

    if (application.status === "Accepted") {
      return res.status(400).json({
        success: false,
        message: "Accepted applications cannot be withdrawn.",
      });
    }

    await application.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Application withdrawn successfully.",
    });
  } catch (error) {
    console.error("Withdraw Application Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      candidate: req.user._id,
    })
      .populate({
        path: "job",
        select:
          "title salary location jobType experience status company createdAt",
        populate: {
          path: "company",
          select: "name logo location industry",
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Get My Applications Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const getApplicantsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view applicants for this job.",
      });
    }

    const applications = await Application.find({
      job: jobId,
    })
      .populate("candidate", "name email avatar skills location bio resume")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Get Applicants Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    const job = await Job.findById(application.job).populate("company", "name");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this application.",
      });
    }

    application.status = status;

    await application.save();

    await application.populate({
      path: "candidate",
      select: "name email",
    });

    try {
      await sendEmail({
        to: application.candidate.email,
        subject: `Application Status Updated: ${status}`,
        html: applicationStatusTemplate(
          application.candidate.name,
          job.title,
          status,
        ),
      });
    } catch (error) {
      console.error("Status Email Error:", error.message);
    }

    return res.status(200).json({
      success: true,
      message: "Application status updated successfully.",
      application,
    });
  } catch (error) {
    console.error("Update Application Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
