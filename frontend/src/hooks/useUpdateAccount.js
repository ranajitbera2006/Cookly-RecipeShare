import React, { useState } from "react";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;
const useUpdateAccount = () => {
  const [loading, setLoading] = useState(false);
  const updateAccount = async ({ fullname }) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/update-account`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname }),
        credentials: "include",
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("Your account updated successfully!");
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { loading, updateAccount };
};

export default useUpdateAccount;
