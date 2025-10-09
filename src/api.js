const BASE = "https://www.themealdb.com/api/json/v1/1";

export function searchMealsByIngredient(ingredient) {
  const url = `${BASE}/filter.php?i=${encodeURIComponent(ingredient)}`;
  return fetch(url)
    .then((r) => r.json())
    .then((j) => j.meals || []);
}