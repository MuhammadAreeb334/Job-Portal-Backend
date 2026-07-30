import mongoose from "mongoose";
import {
  JOB_TYPES,
  EXPERIENCE_LEVELS,
  JOB_STATUSES,
} from "../constants/jobConstants.js";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      minlength: [3, "Job title must be at least 3 characters"],
      maxlength: [100, "Job title cannot exceed 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Job description is required"],
      trim: true,
      maxlength: [5000, "Description cannot exceed 5000 characters"],
    },

    requirements: [
      {
        type: String,
        trim: true,
      },
    ],

    salary: {
      type: Number,
      required: [true, "Salary is required"],
      min: [0, "Salary cannot be negative"],
    },

    location: {
      type: String,
      required: [true, "Job location is required"],
      trim: true,
    },

    jobType: {
      type: String,
      enum: {
        values: JOB_TYPES,
        message: "{VALUE} is not a valid job type",
      },
      required: [true, "Job type is required"],
    },

    experience: {
      type: String,
      enum: {
        values: EXPERIENCE_LEVELS,
        message: "{VALUE} is not a valid experience level",
      },
      required: [true, "Experience is required"],
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Company is required"],
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Recruiter is required"],
    },

    deadline: {
      type: Date,
    },

    status: {
      type: String,
      enum: {
        values: JOB_STATUSES,
        message: "{VALUE} is not a valid status",
      },
      default: "Open",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

jobSchema.index({ company: 1 });
jobSchema.index({ postedBy: 1 });
jobSchema.index({ status: 1 });
jobSchema.index({ jobType: 1 });
jobSchema.index({ location: 1 });

const Job = mongoose.model("Job", jobSchema);

export default Job;
