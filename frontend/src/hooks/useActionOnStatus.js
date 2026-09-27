import React, { useState } from "react";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;
export const useUpdateStatus = () => {
  const [loadingUp, setLoadingup] = useState(false);

  const updateRecipeStatus = async (recipeId, status) => {
    setLoadingup(true);
    try {
      const res = await fetch(`${API_URL}/api/blog/update-recipe/${recipeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
        credentials: "include",
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoadingup(false);
    }
  };
  return { loadingUp, updateRecipeStatus };
};

export const useDeleteRecipe = () => {
  const [loadingdel, setLoadingdel] = useState(false);
  const deleteRecipe = async (recipeId) => {
    setLoadingdel(true);
    try {
      const res = await fetch(`${API_URL}/api/blog/delete-recipe/${recipeId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("Recipe deleted successfully!");
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoadingdel(false);
    }
  };
  return { loadingdel, deleteRecipe };
};
