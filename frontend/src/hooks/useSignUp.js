import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";

const API_URL = import.meta.env.VITE_API_URL;

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

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
        credentials: "include",
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
      setAuthUser(data); 
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