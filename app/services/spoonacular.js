import axios from 'axios';

const API_KEY = 'dc00d36a5a0a4bee8a0532c8e7ab6ac0';
const BASE_URL = 'https://api.spoonacular.com';

const fetchRecipes = async (query) => {
    const url = `${BASE_URL}/recipes/search?apiKey=${API_KEY}&query=${query}`;
    const response = await axios.get(url);
    return response.data.results;
};

const generateRandomCalories = () => {
  return Math.floor(Math.random() * (800 - 50 + 1)) + 50;
};

const fetchRecipeDetails = async (id) => {
    const url = `${BASE_URL}/recipes/${id}/information?apiKey=${API_KEY}`;
    const response = await axios.get(url);
    const data = response.data;

    const price = data.pricePerServing || 0;

    return {
        title: data.title,
        image: data.image,
        ingredients: data.extendedIngredients.map(ingredient => ({
            name: ingredient.name,
            amount: ingredient.amount,
            unitShort: ingredient.unitShort
        })),
        instructions: data.analyzedInstructions.length > 0 ? data.analyzedInstructions[0].steps : [],
        calories: generateRandomCalories(),
        price: price
    };
};

export { fetchRecipes, fetchRecipeDetails };
