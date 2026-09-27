import { useState } from "react";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;
const useAddRecipe = () => {
  const [loading, setLoading] = useState(false);

  const addRecipe = async ({
    image,
    title,
    subtitle,
    category,
    content,
    status,
  }) => {
    setLoading(true);
    try {
      const formData = new FormData();

      // 1. Package text metadata as a stringified object under 'blog'
      const blogData = {
        title,
        subtitle,
        category,
        content,
        status,
      };
      formData.append("blog", JSON.stringify(blogData));

      // 2. Append image file if selected
      if (image instanceof File) {
        formData.append("recipeImage", image);
      }

      const res = await fetch(`${API_URL}/api/blog/addRecipe`, {
        method: "POST",
        credentials: "include",
        // Browser sets Content-Type to multipart/form-data with boundary automatically
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to create blog");
      }

      toast.success(data.message || "Recipe created successfully!");
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, addRecipe };
};

export default useAddRecipe;
