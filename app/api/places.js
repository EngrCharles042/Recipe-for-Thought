// export default async function handler(req, res) {
//     const { latitude, longitude } = req.query;
    
//     try {
//       const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&type=restaurant&key=AIzaSyAt2Y8iXPGXYeeL1RZRHFaaVZqLgvRwLIw`);
//       const data = await response.json();
//       res.status(200).json(data);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to fetch data' });
//     }
//   }
  