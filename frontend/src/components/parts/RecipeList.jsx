import React, { useState } from "react";
import RecipeCard from "./RecipeCard";
import RecipeSearchBar from "./RecipeSearchBer";
import useGetAllRecipes from "../../hooks/useGetAllRecipes";
import RecipeSkeleton from "../Skeleton/RecipeSkeleton";

const category = [
  "All",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Snack",
  "Drink",
  "Other",
];

const RecipeList = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const normalizedCategory =
    selectedCategory === "All" ? "all" : selectedCategory.toLowerCase();

  const { loading, recipes } = useGetAllRecipes(normalizedCategory, searchTerm);

  return (
    <div className="w-full">
      <RecipeSearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {loading ? (
        <RecipeSkeleton />
      ) : Array.isArray(recipes) && recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center items-stretch mt-8 w-full">
          {recipes.map((blog, idx) => (
            <div
              key={blog._id || idx}
              className="w-full max-w-sm flex justify-center"
            >
              <RecipeCard blog={blog} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 min-h-[50vh] flex items-center justify-center text-center">
          <p className="text-gray-400 text-lg">
            No recipes found. Try a different search or category.
          </p>
        </div>
      )}
    </div>
  );
};

export default RecipeList;
