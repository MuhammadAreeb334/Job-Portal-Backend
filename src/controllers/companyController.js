import Company from "../models/Company.js";
import User from "../models/User.js";

export const createCompany = async (req, res) => {
  try {
    const { name, website, location, industry, description, employees } =
      req.body;

    if (req.user.company) {
      return res.status(409).json({
        success: false,
        message: "You have already created a company.",
      });
    }

    const company = await Company.create({
      name,
      website,
      location,
      industry,
      description,
      employees,
    });
    req.user.company = company._id;
    await req.user.save();

    return res.status(201).json({
      success: true,
      message: "Company created successfully.",
      company,
    });
  } catch (error) {
    console.error("Create Company Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const getMyCompany = async (req, res) => {
  try {
    if (!req.user.company) {
      return res.status(404).json({
        success: false,
        message: "No company found. Please create a company first.",
      });
    }

    const company = await Company.findById(req.user.company);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    return res.status(200).json({ success: true, company });
  } catch (error) {
    console.error("Get My Company Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    if (!req.user.company) {
      return res.status(404).json({
        success: false,
        message: "No company found. Please create a company first.",
      });
    }

    const company = await Company.findById(req.user.company);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    const { name, website, location, industry, description, employees } =
      req.body;
    if (name !== undefined) company.name = name;
    if (website !== undefined) company.website = website;
    if (location !== undefined) company.location = location;
    if (industry !== undefined) company.industry = industry;
    if (description !== undefined) company.description = description;
    if (employees !== undefined) company.employees = employees;

    await company.save();

    return res.status(200).json({
      success: true,
      message: "Company updated successfully.",
      company,
    });
  } catch (error) {
    console.error("Update Company Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    if (!req.user.company) {
      return res.status(404).json({
        success: false,
        message: "No company found.",
      });
    }

    const company = await Company.findById(req.user.company);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    await company.deleteOne();
    req.user.company = null;
    await req.user.save();

    return res.status(200).json({
      success: true,
      message: "Company deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Company Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
