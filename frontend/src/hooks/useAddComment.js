import { useState } from "react";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;
const useAddComment = (id, setComments) => {
  const [loadingInAddComment, setLoadingInAddComment] = useState(false);

  const addComment = async ({ comment }) => {
    if (!comment || comment.trim() == "") return;
    setLoadingInAddComment(true);
    try {
      const res = await fetch(`${API_URL}/api/comment/add-comment`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, comment }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setComments((currentComments) => [data.newComment, ...currentComments]);
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoadingInAddComment(false);
    }
  };
  return { loadingInAddComment, addComment };
};

export default useAddComment;
