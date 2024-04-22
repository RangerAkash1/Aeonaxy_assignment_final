import React from "react";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handlePicCreteClick = () => {
    // Navigate to profile page
    history.push("/profile");
  };
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "lightblue",
        padding: "4px",
        alignItems: "center", // Center items vertically
      }}
    >
      <h1
        style={{
          marginLeft: "10px",
          fontSize: "1rem",
          fontFamily: "fantasy",
          cursor: "pointer",
        }}
        onClick={handlePicCreteClick}
      >
        PicCrete
      </h1>
      {[
        "Inspiration",
        "Find Work",
        "Go Pro",
        "Learn Design",
        "Hire Designers",
      ].map((word, index) => (
        <h1
          key={index}
          style={{
            fontSize: "1rem",
            marginLeft: "15px", // Add spacing between words
            cursor: "pointer",
          }}
        >
          {word}
        </h1>
      ))}
      <button
        style={{
          fontSize: "1rem",
          marginLeft: "auto", // Add spacing between words
        }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};
export default Navbar;
