// app/components/LoadingSpinner.tsx
'use client';

import { useState, useEffect } from 'react';
import { RotatingLines } from 'react-loader-spinner'; // Example spinner, choose your favorite

const LoadingSpinner = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading delay (optional)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Hide spinner after 1 second

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <div className="spinner-container">
      {loading && ( // Conditionally render the spinner
        <RotatingLines
          strokeColor="#4fa94d"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      )}
    </div>
  );
};

export default LoadingSpinner;
