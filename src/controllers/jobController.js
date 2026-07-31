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

export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);
    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: "Job not found." });
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this job.",
      });
    }
    const allowedFields = [
      "title",
      "description",
      "requirements",
      "salary",
      "location",
      "jobType",
      "experience",
      "skills",
      "deadline",
      "status",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        job[field] = req.body[field];
      }
    });
    await job.save();

    await job.populate("company", "name logo location industry");

    return res.status(200).json({
      success: true,
      message: "Job updated successfully.",
      job,
    });
  } catch (error) {
    console.error("Update Job Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);

    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: "Job not found." });
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this job.",
      });
    }
    await job.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully.",
    });
  } catch (error) {
    console.error("Update Job Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const {
      keyword,
      location,
      jobType,
      experience,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {
      status: "Open",
    };

    if (keyword) {
      query.$or = [
        {
          title: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          description: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          skills: {
            $regex: keyword,
            $options: "i",
          },
        },
      ];
    }
    if (location) {
      query.location = {
        $regex: location,
        $options: "i",
      };
    }
    if (jobType) {
      query.jobType = jobType;
    }
    if (experience) {
      query.experience = experience;
    }
    const currentPage = Number(page);
    const perPage = Number(limit);
    const skip = (currentPage - 1) * perPage;

    const totalJobs = await Job.countDocuments(query);

    const jobs = await Job.find(query)
      .populate("company", "name logo location industry")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage);

    return res.status(200).json({
      success: true,
      currentPage,
      totalPages: Math.ceil(totalJobs / perPage),
      totalJobs,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error("Get All Jobs Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findOne({
      _id: id,
      status: "Open",
    }).populate("company", "name logo website location industry description");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error("Get All Jobs Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
