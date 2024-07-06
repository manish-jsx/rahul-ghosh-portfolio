import React, {useState, useEffect} from 'react'

const ContentArea = () => {

   const [apiData, setApiData] = useState(null);

   const fetchApiData = async (apiRoute) => {
     try {
       const response = await fetch(apiRoute);
       const data = await response.json();
       setApiData(data);
     } catch (error) {
       console.error('Error fetching data:', error);
     }
   };

   useEffect(() => {
       fetchApiData('/api/projects'); // Fetch initial data
   }, []);

   const handleApiRouteClick = (apiRoute) => {
     fetchApiData(apiRoute);
   };

   return (
       <main className="flex-1 p-8">
         <h1 className="text-3xl font-bold mb-4">Content Area</h1>
         {/* Render apiData here */}
         <pre>{JSON.stringify(apiData, null, 2)}</pre>
       </main>
   )
}

export default ContentArea
