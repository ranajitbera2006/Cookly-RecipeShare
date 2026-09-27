import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;
const useGetComments = (recipeId) => {
  const [loadingInComments, setLoading] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!recipeId) return;

    const getUserComments = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_URL}/api/comment/get-comment/${recipeId}`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setComments(data);
        return true;
      } catch (error) {
        toast.error(error.message);
        return false;
      } finally {
        setLoading(false);
      }
    };
    getUserComments();
  }, [recipeId]);
  return { loadingInComments, comments, setComments };
};

export default useGetComments;
