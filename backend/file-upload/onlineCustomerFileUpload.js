// import multer from "multer";
// import path from "path";

// // Set up storage location and filename format
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // make sure this folder exists
//   },
//   filename: function (req, file, cb) {
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   },
// });

// // file type filter
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|pdf/;
//   const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   if (isValid) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only images and PDFs are allowed"));
//   }
// };

// const upload = multer({ storage, fileFilter });

// export default upload;



// import multer from "multer";
// import path from "path";
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "upload/")                     //for uploading image
//     },
//     filename: function (req, file, cb) {
//         const unique = path.extname(file.originalname)
//         cb(null, Date.now() + "-" + unique)            // for creating filename 
//     }
// })
// const upload = multer({
//     storage: storage,
//     fileFilter: function (req, file, cb) {
//         if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png" || file.mimetype == "image/pdf") {
//             cb(null, true)
//         } else {
//             console.log("only these files can upload -jpeg,jpg,png,pdf")
//             cb(null, false)
//         }
//     },
//     limits: {
//         filesize: 1024 * 1024 * 1
//     }
// })

// export default upload




import multer from "multer";
import path from "path";
import fs from "fs";

// Create upload directory if it doesn't exist
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
