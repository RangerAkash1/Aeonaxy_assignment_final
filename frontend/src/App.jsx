import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ThankYou from "./pages/ThankYou";
import { Outlet, Navigate } from "react-router-dom";
import "./App.css";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import Navbar from "./pages/Navbar";

const PrivateRoutes = () => {
  let auth = localStorage.getItem("token");
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => {
  const [isLoggedin, setIsLoggedin] = React.useState(false);
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedin(true);
    }
  }, []);
  return (
    <div>
      <ToastContainer />
      <Router>
        <Routes>
          {/*  add navbar for all routes */}
          <Route
            element={
              <>
                <Navbar isLoggedin={isLoggedin} />
                <PrivateRoutes />
              </>
            }
          >
            <Route path="/Profile" element={<Profile />} />
            <Route path="/ThankYou" element={<ThankYou />} />
            <Route path="*" element={<Navigate to="/Profile" />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
