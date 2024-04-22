import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import backgroundImage from "../images/img3.jpg";

import { toast } from "react-toastify";
function App() {
  const [username, setUsername] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const registerUser = async (event) => {
    toast.loading("Loading...");
    try {
      const response = await axios.post(API_URL + "/api/signup", {
        name,
        username,
        email,
        password,
      });
      if (response.data.user) {
        toast.dismiss();
        toast.success("Registered Successfully");
        navigate("/login");
      }
    } catch (error) {
      alert("Please check your details");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box sign-in-form">
        <div className="formCenter">
          <h1>Register</h1>
          <div className="formFields">
            <div className="input-field">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="formFieldInput"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-field">
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                id="username"
                className="formFieldInput"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="formFieldInput"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="formFieldInput"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <br />
            <button onClick={registerUser}>Register</button>
            <Link to="/login"> Login</Link>
          </div>
        </div>
      </div>
      <div className="illustration-wrapper" style={{ flex: 1 }}>
        <div className="text-container">
          <h2>PicCrate</h2>
          <p>Discover the world's top</p>
          <p>Designers & Creatives.</p>
        </div>
        <img
          src={backgroundImage}
          alt="Register"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
}

export default App;
