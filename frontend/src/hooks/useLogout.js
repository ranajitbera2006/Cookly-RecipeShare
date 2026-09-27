import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";
const API_URL = import.meta.env.VITE_API_URL;
const useLogout = () => {
  const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const logOut = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem("auth-user");
      setAuthUser(null);
      toast.success("Logout succussfully!");
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { loading, logOut };
};

export default useLogout;
