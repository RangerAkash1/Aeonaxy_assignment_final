import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    prof_completed: { type: Boolean, default: false },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
  },
  { collection: "user-data" }
);

User.set("timestamps", true);

// make profile model when user is created
User.pre("save", async function (next) {
  const profileModel = mongoose.model("Profile");
  const profile = await profileModel.create({
    profile_pic: "",
    location: "",
    what_brings_you_here: "",
  });
  this.profile = profile._id;
  next();
});

const model = mongoose.model("User", User);
export { model };
export default model;
