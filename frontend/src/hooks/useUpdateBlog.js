import { useState } from "react";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;
const useUpdateRecipe = () => {
  const [loading, setLoading] = useState(false);

  const editRecipe = async (
    recipeId,
    { title, subtitle, category, content, status, image },
  ) => {
    if (!recipeId) {
      toast.error("Recipe does not exist.");
      return false;
    }

    setLoading(true);
    try {
      const formData = new FormData();

      // If 'image' is an existing URL string (not a newly picked File), pass it in metadata
      const blogData = {
        title,
        subtitle,
        category,
        content,
        status,
        image: typeof image === "string" ? image : undefined,
      };
      formData.append("blog", JSON.stringify(blogData));

      // If 'image' is a new File object, append to recipeImage for ImageKit upload
      if (image instanceof File) {
        formData.append("recipeImage", image);
      }

      const res = await fetch(`${API_URL}/api/blog/update-recipe/${recipeId}`, {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to update blog.");
      }

      toast.success(data.message || "Recipe updated successfully!");
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, editRecipe };
};

export default useUpdateRecipe;
