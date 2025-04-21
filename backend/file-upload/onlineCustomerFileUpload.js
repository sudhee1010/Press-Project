import multer from "multer";
import path from "path";

// Set up storage location and filename format
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// file type filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf/;
  const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error("Only images and PDFs are allowed"));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
