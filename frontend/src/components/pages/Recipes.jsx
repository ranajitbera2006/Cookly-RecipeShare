import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import { CgProfile } from "react-icons/cg";
import { ImSpinner8 } from "react-icons/im";
import useGetRecipeDetails from "../../hooks/useGetRecipeDetails";
import useGetComments from "../../hooks/useGetComments";
import useAddComment from "../../hooks/useAddComment";
import toast from "react-hot-toast";

const Recipes = () => {
  const { id } = useParams();
  const { loading, blog } = useGetRecipeDetails(id);
  const { loadingInComments, comments, setComments } = useGetComments(id);
  const { loadingInAddComment, addComment } = useAddComment(id, setComments);
  const [comment, setComment] = useState("");

  const addUserComment = async (e) => {
    e.preventDefault();
    const success = await addComment({ comment });
    if (success) {
      toast.success("Your comment added successfully!");
      setComment("");
    }
  };

  return !loading && blog ? (
    <div className="  min-h-screen flex flex-col ">
      <Navbar />
      <main className="flex-1">
        <div className=" min-h-screen mb-19">
          <div className="text-center pt-7">
            <p className="font-sense text-xs text-center ">
              Published on {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            <h2 className="text-2xl sm:text-4xl">
              Let's Discuss on <br />
              <span className="font-semibold">{blog.title}</span>
            </h2>
            <h5>
              -By <span>{blog.author.fullname}</span>
            </h5>
          </div>
          <div className="flex justify-center px-6  sm:mx-72 mt-5 sm:mt-10">
            <img
              src={blog.image}
              alt={blog.title}
              className="aspect-video rounded-2xl"
            />
          </div>
          <div className=" mt-7 sm:mt-13 mx-5 sm:mx-20">
            {/* <h5 className="flex">Description:</h5> */}
            <div
              className="prose prose-invert max-w-none "
              dangerouslySetInnerHTML={{ __html: blog.content }}
            ></div>
          </div>
          <div className="text-center mt-7 sm:mt-13 mx-5 sm:mx-20">
            <p>{blog.category}</p>
          </div>
          {/* Comment View section */}
          <div className="space-y-4 mt-10 flex flex-col justify-center">
            <h4 className="text-center text-2xl sm:text-3xl text-blue-700">
              Comments ({comments.length})
            </h4>
            {[...comments].map((comment, idx) => (
              <div
                key={idx}
                className="items-center glass-stronger shadow-xl px-3 rounded-2xl py-3 mx-5 sm:mx-50 md:mx-70 lg:mx-100"
              >
                <div className="grid grid-cols-[auto_1fr] gap-3">
                  <div>
                    <CgProfile className="text-2xl" />
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <h5>{comment.user?.fullname}</h5>
                      <p>{comment.comment}</p>
                    </div>
                    <div className="tracking-tighter">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center flex justify-center mx-5 sm:mx-50 md:mx-70 lg:mx-100">
            <form
              onSubmit={addUserComment}
              className="felx flex-col w-full  space-y-2 glass-stronger py-5 px-4 rounded-xl shadow-2xl "
            >
              <h1 className="text-xl sm:text-3xl mb-3">Leave a Comment Here</h1>
              <textarea
                placeholder="Enter your comment here..."
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                className="border w-full min-h-30 md:min-h-40 resize-none rounded-md px-2 py-1 focus:outline-none"
                required
              ></textarea>
              <button type="submit" className=" btn btn-success ">
                {loadingInAddComment ? (
                  <span className="loading loading-spinner" />
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-screen">
      <ImSpinner8 className="text-6xl animate-spin" />
    </div>
  );
};

export default Recipes;
