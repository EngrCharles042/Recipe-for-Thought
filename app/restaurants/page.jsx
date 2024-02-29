// 'use client';
// import React, { useState } from 'react';
// import { useRouter } from "next/navigation";


// const RestaurantsNearYou = () => {
//   const router = useRouter();
//   const [restaurants, setRestaurants] = useState([]);


//   const getRestaurantsNearby = async () => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(async (position) => {
//         const { latitude, longitude } = position.coords;
//         const response = await fetch(`/api/places?latitude=${latitude}&longitude=${longitude}`);
//         const data = await response.json();
//         setRestaurants(data.results);
//       }, (error) => {
//         console.error("Error getting user location:", error);
//       });
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <div className="text-4xl font-bold mb-8">Restaurants Near You</div>
//       <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded" onClick={getRestaurantsNearby}>
//         Find Restaurants Near Me
//       </button>
//       <div className="mt-4">
//         {restaurants.length > 0 && (
//           <ul>
//             {restaurants.map((restaurant) => (
//               <li key={restaurant.id}>{restaurant.name}</li>
//             ))}
//           </ul>
//         )}
//       </div>
//       <div className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
//         <button onClick={() => router.back()}>Back</button>
//       </div>
//     </div>
//   );
// };

// export default RestaurantsNearYou;

'use client';
import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { useRouter } from "next/navigation";

export default function GoogleMaps() {
    const [location, setLocation] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Get user's location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        }
    }, []);

    const mapRef = React.useRef(null);

    useEffect(() => {
        const initializeMap = async () => {
            const loader = new Loader({
                apiKey: 'AIzaSyAt2Y8iXPGXYeeL1RZRHFaaVZqLgvRwLIw',
                version: 'quarterly',
            });
            const google = await loader.load();

            const locationInMap = {
                lat: location.latitude,
                lng: location.longitude,
            };

            const map = new google.maps.Map(mapRef.current, {
                center: locationInMap,
                zoom: 15,
            });

            // Add marker to the map
            new google.maps.Marker({
                position: locationInMap,
                map: map,
            });
        };

        if (location) {
            initializeMap();
        }
    }, [location]);

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            {location ? (
                <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
            ) : (
                <div>Loading...</div>
            )}
        <button className="my-6 bg-blue-500 hover:bg-blue-700 text-white text-center px-40 py-4 rounded" onClick={() => router.back()}>Back</button>
        </div>
    );
}
