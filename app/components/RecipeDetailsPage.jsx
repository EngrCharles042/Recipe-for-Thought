import React, { useState } from 'react';

const RecipeDetailsPage = ({ recipe }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [conversionRate, setConversionRate] = useState(null);

    const calculateCostInUSD = () => {
        // Assume the conversion rate is 0.0025 for demonstration purposes
        const convertedPrice = recipe.price * 0.0025;
        return convertedPrice.toFixed(2);
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
            <img src={recipe.image} alt={recipe.title} className="mb-4" />
            <h2 className="text-2xl font-bold mb-2">Ingredients:</h2>
            <ul className="list-disc pl-6 mb-4">
                {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.amount} {ingredient.unitShort} {ingredient.name}</li>
                ))}
            </ul>
            <h2 className="text-2xl font-bold mb-2">Instructions:</h2>
            {recipe.instructions && recipe.instructions.map((instruction, index) => (
                <p key={index}>{instruction.step}</p>
            ))}
            <p className="text-lg">
                <strong>Calories:</strong> {recipe.calories}
            </p>
            <p className="text-lg">
                <strong>Price:</strong> {recipe.price} NGN
                <button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded" onClick={togglePopup}>
                    Convert to USD
                </button>
            </p>
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
                    <div className="bg-white p-4 rounded">
                        <p className="text-lg text-black">
                            The price in USD is approximately: {calculateCostInUSD()} USD
                        </p>
                        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded" onClick={togglePopup}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipeDetailsPage;
