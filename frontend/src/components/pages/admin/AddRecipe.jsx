import React, { useEffect, useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import {
  MdOutlineDinnerDining,
  MdOutlineFastfood,
  MdCategory,
  MdLocalCafe,
} from "react-icons/md";
import { GiSandwich, GiCakeSlice, GiCoffeeCup } from "react-icons/gi";
import Quill from "quill";
import useAddRecipe from "../../../hooks/useAddRecipe";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const categoryOptions = [
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Dinner" },
  { value: "dessert", label: "Dessert" },
  { value: "snack", label: "Snack" },
  { value: "drink", label: "Drink" },
  { value: "other", label: "Other" },
];

const categoryIcons = {
  breakfast: <GiCoffeeCup size={14} className="text-amber-400" />,
  lunch: <GiSandwich size={14} className="text-sky-400" />,
  dinner: <MdOutlineDinnerDining size={14} className="text-indigo-400" />,
  dessert: <GiCakeSlice size={14} className="text-pink-400" />,
  snack: <MdOutlineFastfood size={14} className="text-emerald-400" />,
  drink: <MdLocalCafe size={14} className="text-cyan-400" />,
  other: <MdCategory size={14} className="text-slate-400" />,
};

const AddRecipe = () => {
  const [activeAction, setActiveAction] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("");
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const { loading, addRecipe } = useAddRecipe();
  const navigate = useNavigate();
  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write your story here...",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["blockquote", "code-block"],
            ["link", "image"],
            ["clean"],
          ],
        },
      });
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        return toast.error("Image size must be less than 5MB");
      }
      setImage(file);
    }
  };

  const handleSelectedCategory = (selectedCategory) => {
    setCategory(selectedCategory);
    setOpenMenu(false);
  };

  const handleSubmit = async (status) => {
    const content = quillRef.current ? quillRef.current.root.innerHTML : "";
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!category) {
      toast.error("Category is required");
      return;
    }
    if (!content.trim() || content === "<p><br></p>") {
      toast.error("Content is required");
      return;
    }
    setActiveAction(status);
    await addRecipe({
      image,
      title,
      subtitle,
      category,
      content,
      status,
    });
    setActiveAction(null);
    navigate("/admin/listRecipe");
  };

  return (
    <>
      <h4 className="flex justify-center  text-3xl font-bold mt-4">
        Create Your Recipe
      </h4>
      <div className="p-5">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Image */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Thumbnail Image
            </label>
            <div className="border-2 border-dashed border-gray-700 hover:border-blue-500 transition-colors h-36 w-full max-w-sm rounded-2xl flex items-center justify-center bg-base-100/50 cursor-pointer overflow-hidden">
              <label
                htmlFor="recipeImage"
                className="w-full h-full flex flex-col items-center justify-center cursor-pointer p-2 text-center"
              >
                <input
                  type="file"
                  name="recipeImage"
                  id="recipeImage"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                {!image ? (
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <FaCloudUploadAlt className="text-4xl text-blue-500" />
                    <span className="text-xs">Click to upload thumbnail</span>
                  </div>
                ) : (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover rounded-xl"
                  />
                )}
              </label>
            </div>
          </div>

          {/*Title */}
          <div>
            <textarea
              name="title"
              rows={2}
              id="title"
              className="mb-3 resize-none border rounded-2xl sm:w-3xl w-60 p-2 items-center outline-0 "
              placeholder="Enter the blog title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></textarea>
          </div>

          {/*Subtitle */}
          <div>
            <textarea
              name="title"
              id="title"
              rows={2}
              className="mb-3 resize-none border rounded-2xl sm:w-3xl w-60 p-2 items-center outline-0 "
              placeholder="Enter the blog subtitle..."
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            ></textarea>
          </div>

          {/* Category */}
          <div className="mb-3">
            <div className="border w-full max-w-md flex justify-between rounded-xl relative items-center px-2">
              <span className="text-gray-500 text-sm">
                Category :{" "}
                <span className="text-white capitalize">
                  {categoryOptions.find((item) => item.value === category)
                    ?.label || "Not selected"}
                </span>
              </span>

              <button
                type="button"
                className="btn btn-sm m-1"
                onClick={() => setOpenMenu((prev) => !prev)}
              >
                {category ? category.toUpperCase() : "Select"} ⬇️
              </button>
              {openMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpenMenu(false)}
                  />
                  <div className="absolute z-50 right-0 top-full mt-1.5 w-44 p-1.5 bg-slate-900 border border-slate-800 rounded-xl shadow-xl space-y-0.5">
                    {categoryOptions.map((item) => (
                      <div key={item.value}>
                        <button
                          type="button"
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition cursor-pointer ${
                            category === item.value
                              ? "bg-amber-500/15 text-amber-400 font-semibold"
                              : "text-slate-300 hover:bg-slate-800 hover:text-white"
                          }`}
                          onClick={() => handleSelectedCategory(item.value)}
                        >
                          <div className="flex items-center gap-2">
                            {categoryIcons[item.value]}
                            <span>{item.label}</span>
                          </div>
                          {category === item.value && (
                            <FiCheck size={12} className="text-amber-400" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Editor content */}
          <div className="mb-4 w-full max-w-4xl [&_.ql-editor]:min-h-70 [&_.ql-editor]:max-h-137.5 [&_.ql-editor]:overflow-y-auto [&_.ql-toolbar]:rounded-t-2xl [&_.ql-container]:rounded-b-2xl">
            <div ref={editorRef} />
          </div>
          {/* status */}
          <div className="flex space-x-3">
            <button
              className="btn btn-warning"
              onClick={() => handleSubmit("draft")}
            >
              {loading && activeAction === "draft" ? (
                <span className="loading loading-spinner" />
              ) : (
                "Save Draft"
              )}
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                handleSubmit("published");
              }}
            >
              {loading && activeAction === "published" ? (
                <span className="loading loading-spinner" />
              ) : (
                "Publish Post"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddRecipe;
