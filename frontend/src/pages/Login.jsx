import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();
    toast.loading("loading...");
    await axios
      .post(API_URL + "/api/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          navigate("/Profile");
          toast.dismiss();
          toast.success("Login successful");
        } else {
          toast.dismiss();
          toast.error("Login failed");
        }
      })
      .catch((error) => {
        alert("error");
      });
  }

  return (
    <div
      className="login-page-wrapper"
      style={{ display: "flex", height: "100vh" }}
    >
      <div
        className="login-box sign-in-form"
        style={{
          flex: 1,
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: "url('https://source.unsplash.com/GwNsgnSAfQM')", // Add this line

          backgroundSize: "cover", // And this line
          border: "2px solid #000", // Add this line
        }}
      >
        <div className="login-container">
          <div className="formCenter">
            <p className="form-title">Welcome</p>
            <p>Login to the Dashboard</p>

            <div className="formFields" onSubmit={loginUser}>
              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="formFieldInput"
                  placeholder="Enter your email"
                  name="email"
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
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <br />
              <button type="button" onClick={loginUser}>
                LOGIN
              </button>
              <Link to="/register"> Register</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="illustration-wrapper" style={{ flex: 1 }}>
        <img
          src=" https://source.unsplash.com/l6yLVM-FJxc"
          alt="Login"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
}

export default App;
