import React, { useState } from "react";
import { FiSearch, FiX, FiCheck, FiChevronDown } from "react-icons/fi";
import {
  MdOutlineDinnerDining,
  MdOutlineFastfood,
  MdCategory,
  MdLocalCafe,
} from "react-icons/md";
import { GiSandwich, GiCakeSlice, GiCoffeeCup } from "react-icons/gi";

const icons = {
  All: <MdCategory size={14} />,
  Breakfast: <GiCoffeeCup size={14} className="text-amber-400" />,
  Lunch: <GiSandwich size={14} className="text-sky-400" />,
  Dinner: <MdOutlineDinnerDining size={14} className="text-indigo-400" />,
  Dessert: <GiCakeSlice size={14} className="text-pink-400" />,
  Snack: <MdOutlineFastfood size={14} className="text-emerald-400" />,
  Drink: <MdLocalCafe size={14} className="text-cyan-400" />,
  Other: <MdCategory size={14} className="text-slate-400" />,
};

const categories = [
  "All",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Snack",
  "Drink",
  "Other",
];

const RecipeSearchBar = ({
  searchTerm = "",
  setSearchTerm,
  selectedCategory = "All",
  setSelectedCategory,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full flex items-center gap-2 my-2">
      {/* Search Input */}
      <div className="relative flex-1">
        <FiSearch
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search recipes..."
          className="w-full pl-9 pr-8 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            <FiX size={14} />
          </button>
        )}
      </div>

      {/* Dropdown */}
      <div className="relative shrink-0">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-200 text-sm cursor-pointer"
        >
          {icons[selectedCategory] || icons.All}
          <span className="font-medium text-xs sm:text-sm">
            {selectedCategory === "All" ? "All" : selectedCategory}
          </span>
          <FiChevronDown
            size={14}
            className={`text-slate-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute z-50 right-0 top-full mt-1.5 w-44 p-1.5 bg-slate-900 border border-slate-800 rounded-xl shadow-xl space-y-0.5">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition cursor-pointer ${
                      isSelected
                        ? "bg-amber-500/15 text-amber-400 font-semibold"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {icons[cat]}
                      <span>{cat}</span>
                    </div>
                    {isSelected && (
                      <FiCheck size={12} className="text-amber-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RecipeSearchBar;
