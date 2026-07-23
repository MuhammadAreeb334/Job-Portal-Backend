import mongoose from "mongoose";
import fileSchema from "./shared/fileSchema.js";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      minlength: [2, "Company name must be at least 2 characters"],
      maxlength: [100, "Company name cannot exceed 100 characters"],
    },

    logo: {
      type: fileSchema,
      default: () => ({}),
    },

    website: {
      type: String,
      trim: true,
      default: "",
    },

    location: {
      type: String,
      required: [true, "Company location is required"],
      trim: true,
    },

    industry: {
      type: String,
      enum: {
        values: [
          "Software",
          "Finance",
          "Healthcare",
          "Education",
          "E-Commerce",
          "Manufacturing",
          "Marketing",
          "Consulting",
          "Other",
        ],
        message: "{VALUE} is not a valid industry",
      },
      required: [true, "Industry is required"],
    },

    description: {
      type: String,
      required: [true, "Company description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },

    employees: {
      type: Number,
      default: 0,
      min: [0, "Employees cannot be negative"],
    },
    
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

companySchema.index({ name: 1 });

const Company = mongoose.model("Company", companySchema);

export default Company;
