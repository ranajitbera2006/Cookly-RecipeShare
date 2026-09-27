export const RECIPE_CATEGORIES = [
  "breakfast",
  "lunch",
  "dinner",
  "dessert",
  "snack",
  "drink",
  "other",
];

export const RECIPE_CATEGORY_LABELS = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  dessert: "Dessert",
  snack: "Snack",
  drink: "Drink",
  other: "Other",
};

export const normalizeCategory = (value) => {
  if (typeof value !== "string") return "";
  const normalized = value.trim().toLowerCase();
  return RECIPE_CATEGORIES.includes(normalized) ? normalized : "";
};
