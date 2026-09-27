import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;
const useGetAllRecipes = (category = "All", search = "") => {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // AbortController cancels pending request if user types again quickly
    const controller = new AbortController();

    const fetchRecipes = async () => {
      setLoading(true);
      try {
        // Build query parameters
        const params = new URLSearchParams();
        if (category && category.toLowerCase() !== "all") {
          params.append("category", category);
        }
        if (search.trim()) {
          params.append("search", search.trim());
        }

        const queryString = params.toString() ? `?${params.toString()}` : "";

        const res = await fetch(
          `${API_URL}/api/blog/all-recipe${queryString}`,
          {
            method: "GET",
            credentials:"include",
            signal: controller.signal,
          },
        );

        const data = await res.json();

        if (!res.ok || data.error) {
          throw new Error(data.error || "Failed to fetch recipes");
        }

        setRecipes(Array.isArray(data) ? data : []);
      } catch (error) {
        // Ignore errors caused by aborted requests
        if (error.name !== "AbortError") {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    // 300ms debounce for typing in the search bar
    const timeoutId = setTimeout(() => {
      fetchRecipes();
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [category, search]);

  return { loading, recipes };
};

export default useGetAllRecipes;
