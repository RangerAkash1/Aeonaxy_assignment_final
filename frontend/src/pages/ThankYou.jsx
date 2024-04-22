// import React from "react";
// import axios from "axios";
// import { API_URL } from "../constants";
// import { toast } from "react-toastify";
// import "./ThankYou.css";

// const ThankYou = () => {
//   const handleResend = async () => {
//     try {
//       toast.loading("loading...");
//       await axios
//         .post(`${API_URL}/api/verification-mail`, {
//           email: JSON.parse(localStorage.getItem("user")).email,
//         })
//         .then((res) => {
//           toast.dismiss();
//           toast.success("Verification mail sent successfully");
//         });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="thank-you-container">
//       <h1 className="thank-you-heading">Please Verify Your Mail</h1>
//       <p className="thank-you-message">
//         Check your mail for the verification link
//       </p>

//       <button className="resend-button" onClick={handleResend}>
//         Resend Verification Mail
//       </button>
//     </div>
//   );
// };

// export default ThankYou;

import React from "react";
import axios from "axios";
import { API_URL } from "../constants";
import { toast } from "react-toastify";
import "./ThankYou.css"; // Import the CSS file

const ThankYou = () => {
  const handleResend = async () => {
    try {
      toast.loading("loading...");
      await axios
        .post(`${API_URL}/api/verification-mail`, {
          email: JSON.parse(localStorage.getItem("user")).email,
        })
        .then((res) => {
          toast.dismiss();
          toast.success("Verification mail sent successfully");
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="thank-you-container">
      <h1 className="thank-you-heading">Please Verify Your Mail</h1>
      <div className="flex justify-center items-center mb-4">
        <p>
          Please verify your email address. We've sent a confirmation email to:
        </p>
      </div>
      <p className="text-lg font-semibold mb-4">
        {JSON.parse(localStorage.getItem("user")).email}
      </p>
      <p className="mb-4">
        Click the confirmation link in that email to begin using Dribbble.
      </p>
      <p className="mb-4">
        Didn't receive the email? Check your Spam folder, it may have been
        caught by a filter. If you still don't see it, you can resend the
        confirmation email.
      </p>
      <button className="resend-button" onClick={handleResend}>
        Resend Verification Mail
      </button>
    </div>
  );
};

export default ThankYou;
