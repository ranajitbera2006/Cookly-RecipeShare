import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
const AdminBtn = () => {
  const navigate = useNavigate()
  const {authUser} =useAuthContext()
  return (
    <button
      className="flex items-center bg-blue-950 py-2 px-3 rounded-full btn hover:bg-blue-900 border-none"
      onClick={() => navigate("/admin")}
    >
      <FaUserCircle className="sm:mr-1 text-white" />
      <h3 className="hidden sm:inline font-medium  text-white">
        {authUser.fullname}
      </h3>
    </button>
  );
};

export default AdminBtn;
