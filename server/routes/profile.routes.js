import express from "express";
import { updateProfile, getProfile } from "../controller/profile.controller.js";
import multer from "multer";
// it is saving as "uploads\images2.jpg" in the database but we need to save it as "uploads/images2.jpg"
// so we will use path module to change the backslashes to forward slashes

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null,  file.originalname);
  },
});


const upload = multer({ storage: storage });

const router = express.Router();

// user routes
router.put("/profile-update", upload.single("profile_pic"), updateProfile);
router.get("/my-profile", getProfile);

export default router;
