import multer from 'multer';
import ApiError from '../utilis/ApiError.js';

const storages = multer.memoryStorage();

const fileFilters = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new ApiError(400, "Only image files are allowed"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storages,
  fileFilter: fileFilters,
  limits: {
    fileSize: 2 * 1024 * 1024
  },

});

export default upload; 