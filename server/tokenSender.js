import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

// i want to use personal email to send the mail

const transporter = nodemailer.createTransport({
    service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "rangerakash6789@gmail.com",
    pass: "vmqw rwvg jwlz ulzp",
  },
});

export const sendVerificationMail = async (email, req) => {
  try {
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const VerificationLink = `${req.protocol}://${req.headers.host}/api/verify-email/${token}`;

    const info = await transporter.sendMail({
      from: "sahilledetemp@gmail.com",
      to: email,
      subject: "Email Verification",
      html: `<p>Click on the link to verify your email: <a href=${VerificationLink}>Verify Email</a></p>`,
      
    });


    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.log(err);
  }
};
