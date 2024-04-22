import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import fs from "fs";

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.json({ status: "error", message: "User not found" });
    }
    const profile = await Profile.findById(user.profile);

    const { location, what_brings_you_here } = req.body;
    // delete the old image
    if (req.file && profile.profile_pic) {
      fs.unlink(profile.profile_pic, (err) => {
        if (err) {
          console.error(err);
          
          return;
        }
      });
    }
    if(!req.file){
      console.log("No file uploaded");
    }

    if (req.file) {
      profile.profile_pic = req.file.path.replace(/\\/g, "/");
    }
    if (location) profile.location = location;
    if (what_brings_you_here)
      profile.what_brings_you_here = what_brings_you_here;

    // save image using multer
    await profile.save();
    user.password = undefined;

    res.json({
      status: "ok",
      message: "Profile updated successfully",
      profile: profile,
      user: user,
    });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: "Error updating profile" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.password = undefined;
    if (!user) {
      return res.json({ status: "error", message: "User not found" });
    }
    const profile = await Profile.findById(user.profile);
    // add host domain to the image path to access it in the frontend
    profile.profile_pic = `${req.protocol}://${req.headers.host}/${profile.profile_pic}`;
    res.json({ status: "ok", profile: profile, user: user });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: "Error getting profile" });
  }
};
