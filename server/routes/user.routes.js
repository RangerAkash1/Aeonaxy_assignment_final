import express from "express";
import { signup, login, sendTempMail, verifyEmail } from "../controller/user.controller.js";

const router = express.Router();

// user routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/verification-mail", sendTempMail);

export default router;
