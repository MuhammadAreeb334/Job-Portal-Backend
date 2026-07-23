import mongoose from "mongoose";
import fileSchema from "./shared/fileSchema.js";

const applicationSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Candidate is required"],
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: [true, "Job is required"],
    },

    resume: {
      type: fileSchema,
      required: [true, "Resume is required"],
    },

    coverLetter: {
      type: String,
      trim: true,
      maxlength: [5000, "Cover letter cannot exceed 5000 characters"],
      default: "",
    },

    status: {
      type: String,
      enum: {
        values: ["Pending", "Reviewed", "Interview", "Accepted", "Rejected"],
        message: "{VALUE} is not a valid application status",
      },
      default: "Pending",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Prevent a candidate from applying to the same job twice
applicationSchema.index({ candidate: 1, job: 1 }, { unique: true });

applicationSchema.index({ job: 1, status: 1 });
applicationSchema.index({ candidate: 1 });
applicationSchema.index({ status: 1 });

const Application = mongoose.model("Application", applicationSchema);

export default Application;
