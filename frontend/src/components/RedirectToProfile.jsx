// src/components/RedirectToProfile.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectToProfile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate(`/myprofile/${userId}`);
    } else {
      navigate("/login"); // or wherever you want
    }
  }, [navigate]);

  return null;
};

export default RedirectToProfile;