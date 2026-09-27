import React, { useState } from "react";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;
const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  
  const signUp = async ({
    fullname,
    email,
    gender,
    password,
    confirmPassword,
  }) => {
    const success = handleSignUpError({
      fullname,
      email,
      gender,
      password,
      confirmPassword,
    });
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        credentials:"include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname,
          email,
          gender,
          password,
          confirmPassword,
        }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("auth-user", JSON.stringify(data));
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { loading, signUp };
};

export default useSignUp;

const handleSignUpError = ({
  fullname,
  email,
  gender,
  password,
  confirmPassword,
}) => {
  if (!fullname || !email || !gender || !password || !confirmPassword) {
    toast.error("Please fill all required feilds.");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords should match.");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password should contains atleast 6 characters.");
    return false;
  }
  return true;
};
