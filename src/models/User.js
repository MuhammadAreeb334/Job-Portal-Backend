import mongoose from "mongoose";
import fileSchema from "./shared/fileSchema.js";


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be atleast 3 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    
    role: {
      type: String,
      enum: {
        values: ["candidate", "recruiter", "admin"],
        message: "{VALUE} is not a valid role",
      },
      default: "candidate",
    },
    
    avatar: {
      type: fileSchema,
      default: () => ({}),
    },

    resume: {
      type: fileSchema,
      default: () => ({}),
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    
    bio: {
      type: String,
      trim: true,
      maxlength: [500, "Bio cannot exceed 500 characters"],
      default: "",
    },
    
    location: {
      type: String,
      trim: true,
      default: "",
    },
    
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
