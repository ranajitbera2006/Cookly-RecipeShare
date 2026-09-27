import test from "node:test";
import assert from "node:assert/strict";
import {
  normalizeCategory,
  RECIPE_CATEGORIES,
  RECIPE_CATEGORY_LABELS,
} from "./recipeCategories.js";

test("recipe categories match the supported recipe backend values", () => {
  assert.deepEqual(RECIPE_CATEGORIES, [
    "breakfast",
    "lunch",
    "dinner",
    "dessert",
    "snack",
    "drink",
    "other",
  ]);
  assert.equal(normalizeCategory("Breakfast"), "breakfast");
  assert.equal(normalizeCategory("  drink  "), "drink");
  assert.equal(normalizeCategory("technology"), "");
  assert.equal(RECIPE_CATEGORY_LABELS.breakfast, "Breakfast");
});
