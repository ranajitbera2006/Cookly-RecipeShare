import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;
const useGetRecipeDetails = (recipeId) => {
  const [loading, setLoading] = useState(false);
  const [blog, setRecipe] = useState(null);

  useEffect(() => {
    const getRecipeDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/blog/details/${recipeId}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setRecipe(data);
      } catch (error) {
        toast.error(error.message);
        return false;
      } finally {
        setLoading(false);
      }
    };
    getRecipeDetails();
  }, [recipeId]);
  return { loading, blog };
};

export default useGetRecipeDetails;
