import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";
const API_URL = import.meta.env.VITE_API_URL;
const useGetAuthorRecipe = () => {
  const [loading, setLoading] = useState(false);
  const [authRecipes, setAuthRecipes] = useState([]);
  const { authUser } = useAuthContext();
  useEffect(() => {
    if (!authUser) return;
    const getAuthRecipes = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/blog/author-recipe`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setAuthRecipes(data);
        return true;
      } catch (error) {
        toast.error(error.message);
        return false;
      } finally {
        setLoading(false);
      }
    };
    getAuthRecipes();
  }, [authUser]);
  return { loading, authRecipes };
};

export default useGetAuthorRecipe;
