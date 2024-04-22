import React from "react";
import AboutYou from "./Aboutyou";
import ProfileCreation from "./ProfileCreation";

import { useState } from "react";
import { API_URL } from "../constants";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const [next, setNext] = React.useState(0);
  const [location, setLocation] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [que, setQue] = useState("");

  const navigate = useNavigate();

  const handleNext = () => {
    setNext(next + 1);
  };
  const handlePrevious = () => {
    setNext(next - 1);
  };
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("location", location);
    formData.append("what_brings_you_here", que);

    if (avatar) {
      formData.append("profile_pic", avatar, avatar.name);
    }
    try {
      const response = await axiosInstance.put(
        `${API_URL}/api/profile/profile-update`,
        formData
      );
      toast.success("Profile updated successfully");
      navigate("/ThankYou");

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {next === 0 && (
        <ProfileCreation
          handleNext={handleNext}
          setLocation={setLocation}
          setAvatar={setAvatar}
          avatar={avatar}
          location={location}
        />
      )}
      {next === 1 && (
        <AboutYou
          que={que}
          setQue={setQue}
          handlePrevious={handlePrevious}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Profile;
