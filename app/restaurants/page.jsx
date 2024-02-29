'use client';
import React, { useState } from 'react';
import { useRouter } from "next/navigation";


const RestaurantsNearYou = () => {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState([]);

  const getRestaurantsNearby = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const response = await fetch(`/app/api/places?latitude=${latitude}&longitude=${longitude}`);
        const data = await response.json();
        setRestaurants(data.results);
      }, (error) => {
        console.error("Error getting user location:", error);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-4xl font-bold mb-8">Restaurants Near You</div>
      <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded" onClick={getRestaurantsNearby}>
        Find Restaurants Near Me
      </button>
      <div className="mt-4">
        {restaurants.length > 0 && (
          <ul>
            {restaurants.map((restaurant) => (
              <li key={restaurant.id}>{restaurant.name}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
        <button onClick={() => router.back()}>Back</button>
      </div>
    </div>
  );
};

export default RestaurantsNearYou;

