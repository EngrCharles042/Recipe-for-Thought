"use client";
import React, { useState } from "react";
import { fetchRecipes, fetchRecipeDetails } from "../services/spoonacular";
import RecipeDetailsPage from "../components/RecipeDetailsPage";
import { useRouter } from "next/navigation";

const RecipePage = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await fetchRecipes(query);
      setRecipes(results);
    } catch (error) {
      setError("An error occurred while fetching recipes.");
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeClick = async (recipeId) => {
    setLoading(true);
    try {
      const recipeDetails = await fetchRecipeDetails(recipeId);
      setSelectedRecipe(recipeDetails);
    } catch (error) {
      setError("An error occurred while fetching recipe details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Find a Recipe Here!</h1>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search for recipes..."
          className="p-2 border border-gray-300 text-black rounded-l-md focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {recipes.length === 0 && <p>No recipes found.</p>}
      <ul className="mt-8">
        {recipes.map((recipe) => (
          <li
            key={recipe.id}
            className="border-b border-gray-300 py-2 cursor-pointer"
            onClick={() => handleRecipeClick(recipe.id)}
          >
            {recipe.title}
          </li>
        ))}
      </ul>
      {selectedRecipe && <RecipeDetailsPage recipe={selectedRecipe} />}
      <div className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
        <button onClick={() => router.back()}>Back</button>
      </div>
    </div>
  );
};

export default RecipePage;
