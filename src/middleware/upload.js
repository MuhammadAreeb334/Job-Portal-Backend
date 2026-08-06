import multer from "multer";

const storage = multer.memoryStorage();

const imageFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    return cb(null, true);
  }

  cb(new Error("Only image files are allowed."), false);
};

const pdfFileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    return cb(null, true);
  }

  cb(new Error("Only PDF files are allowed."), false);
};

export const uploadAvatar = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export const uploadResume = multer({
  storage,
  fileFilter: pdfFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export const uploadCompanyLogo = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
