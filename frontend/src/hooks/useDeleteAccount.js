import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";
const API_URL = import.meta.env.VITE_API_URL;
const useDeleteAccount = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const deleteAccount = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/delete-account`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem("auth-user");
      setAuthUser(null)
      toast.success("Your Account deleted successfully!");
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { loading, deleteAccount };
};

export default useDeleteAccount;
