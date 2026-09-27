import React from "react";
import { FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
const LoginBtn = () => {
  const navigate = useNavigate()
  return (
    <button
      className="flex items-center rounded-full btn btn-primary  "
      onClick={() => navigate("/login")}
    >
      <FiLogIn className="mr-1 text-white" />
      <h3 className="font-bold text-white">Login</h3>
    </button>
  );
};

export default LoginBtn;
