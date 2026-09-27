import React, { useState, useEffect } from "react";
import useGetAuthorRecipe from "../../../hooks/useGetAuthorRecipe";
import { MdDelete } from "react-icons/md";
import {
  useDeleteRecipe,
  useUpdateStatus,
} from "../../../hooks/useActionOnStatus";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ListOfRecipes = () => {
  const { loading, authRecipes } = useGetAuthorRecipe();
  const [recipes, setRecipes] = useState([]);
  const { loadingUp, updateRecipeStatus } = useUpdateStatus();
  const { loadingDel, deleteRecipe } = useDeleteRecipe();
  const navigate = useNavigate();

  // Sync fetched recipes to local state for instant UI updates
  useEffect(() => {
    if (authRecipes) {
      setRecipes(authRecipes);
    }
  }, [authRecipes]);

  // Handle status toggle
  const handleStatusToggle = async (recipeId, currentStatus) => {
    const nextStatus = currentStatus === "published" ? "draft" : "published";
    const success = await updateRecipeStatus(recipeId, nextStatus);
    if (success) {
      setRecipes((prev) =>
        prev.map((b) =>
          b._id === recipeId ? { ...b, status: nextStatus } : b,
        ),
      );
    }
  };

  // Handle delete
  const handleDelete = (recipeId) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <span className="text-center font-medium text-sm">
            Are you sure you want to delete this blog?
          </span>
          <div className="flex space-x-2 justify-center pt-1">
            <button
              className="px-3 py-1 text-xs rounded-xl bg-red-600 text-white hover:bg-red-700 cursor-pointer"
              onClick={async () => {
                toast.dismiss(t.id);
                const success = await deleteRecipe(recipeId);
                if (success) {
                  setRecipes((prev) => prev.filter((b) => b._id !== recipeId));
                }
              }}
            >
              Delete
            </button>
            <button
              className="px-3 py-1 text-xs rounded-xl bg-gray-500 text-white hover:bg-gray-600 cursor-pointer"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 5000 },
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <>
      <h4 className="flex justify-center  text-3xl font-bold mt-4">
        Your Recipe List
      </h4>
      <div className="mx-4 sm:mx-8 my-6">
        {recipes.length === 0 ? (
          <div className="min-h-[50vh] flex items-center justify-center text-center">
            <p className="text-gray-400 text-lg">
              No recipes found. Add a recipe to get started.
            </p>
          </div>
        ) : (
          <>
            {/* 1. Mobile View (Card Layout) */}
            <div className="grid grid-cols-1 gap-4 md:hidden pt-8">
              {recipes.map((authRecipe, idx) => (
                <div
                  key={authRecipe._id || idx}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-base-100 shadow-sm space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-gray-500">
                      #{idx + 1}
                    </span>
                    {authRecipe.status === "published" ? (
                      <span className="badge badge-success text-white text-xs">
                        Published
                      </span>
                    ) : (
                      <span className="badge badge-error text-white text-xs">
                        Draft
                      </span>
                    )}
                  </div>

                  <h3 className="font-semibold text-base leading-snug">
                    {authRecipe.title}
                  </h3>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                    <button
                      disabled={loadingUp}
                      onClick={() =>
                        handleStatusToggle(authRecipe._id, authRecipe.status)
                      }
                      className={`text-white text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        authRecipe.status === "published"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {authRecipe.status === "published"
                        ? "Set to Draft"
                        : "Publish"}
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/admin/update-recipe/${authRecipe._id}`)
                      }
                      className="text-blue-500 hover:text-blue-700 p-2 rounded-lg  cursor-pointer"
                    >
                      <FaEdit className="text-xl" />
                    </button>

                    <button
                      disabled={loadingDel}
                      onClick={() => handleDelete(authRecipe._id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-lg  cursor-pointer"
                    >
                      <MdDelete className="text-xl" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 2. Desktop View (Table Layout) */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 bg-base-100 shadow-sm">
              <table className="table w-full">
                <thead>
                  <tr className="bg-base-200">
                    <th>Sl no.</th>
                    <th>Recipe Title</th>
                    <th>Status</th>
                    <th>Action</th>
                    <th className="text-red-600">Delete Recipe</th>
                  </tr>
                </thead>
                <tbody>
                  {recipes.map((authRecipe, idx) => (
                    <tr key={authRecipe._id || idx} className="hover">
                      <th>{idx + 1}</th>
                      <td className="font-medium">{authRecipe.title}</td>
                      <td>
                        {authRecipe.status === "published" ? (
                          <span className="text-green-500 font-semibold">
                            Published
                          </span>
                        ) : (
                          <span className="text-red-400 font-semibold">
                            Draft
                          </span>
                        )}
                      </td>
                      <td className="flex items-center gap-2">
                        <button
                          disabled={loadingUp}
                          onClick={() =>
                            handleStatusToggle(
                              authRecipe._id,
                              authRecipe.status,
                            )
                          }
                          className={`text-white px-3 py-1.5 rounded-xl text-sm transition-colors cursor-pointer ${
                            authRecipe.status === "published"
                              ? "bg-red-500 hover:bg-red-600"
                              : "bg-green-500 hover:bg-green-600"
                          }`}
                        >
                          {authRecipe.status === "published"
                            ? "Set to Draft"
                            : "Publish"}
                        </button>

                        <button
                          onClick={() =>
                            navigate(`/admin/update-recipe/${authRecipe._id}`)
                          }
                          className="text-blue-500 hover:text-blue-700 p-2 rounded-xl bg-background cursor-pointer"
                        >
                          <FaEdit className="text-xl" />
                        </button>
                      </td>
                      <td>
                        <button
                          disabled={loadingDel}
                          onClick={() => handleDelete(authRecipe._id)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-xl bg-background w-16 flex text-center justify-center cursor-pointer "
                        >
                          <MdDelete className="text-2xl" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ListOfRecipes;
