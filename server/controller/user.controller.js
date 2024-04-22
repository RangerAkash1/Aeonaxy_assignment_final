import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import { sendVerificationMail } from "../tokenSender.js";

export const signup = async (req, res) => {
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: newPassword,
    });
    user.password = undefined;

    const token = jwt.sign(
      {
        name: user.username,
        email: user.email,
        _id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET
    );  

    await sendVerificationMail(user.email, req);

    res.json({
      user: user,
      message: "User created successfully",
      status: "ok",
      token: token,
    });
  } catch (err) {
    console.error(err);
    res.json({ status: "error", message: "Duplicate email" });
  }
};

export const login = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return { status: "error", error: "Invalid login" };
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        _id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET
    );

    return res.json({ status: "ok", token: token, user: user });
  } else {
    return res.json({ status: "error", user: false });
  }
};



export const verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.json({ status: "error", message: "User not found" });
    }

    user.isVerified = true;
    await user.save();

    res.json({ status: "ok", message: "Email verified successfully" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: "Error verifying email" });
  }
};

export const sendTempMail = async (req, res) => {
  try {
    const email = req.body.email;
    await sendVerificationMail(email, req);
    res.json({ status: "ok", message: "Verification email sent" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: "Error sending email" });
  }
}
