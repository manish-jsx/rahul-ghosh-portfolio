"use client";
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ContentArea from './components/ContentArea';

export default function AdminPanel() {
  const [selectedRoute, setSelectedRoute] = useState('/api/projects'); // Set the initial route to projects

  return (
    <div className="flex h-screen"> 
      <Sidebar setSelectedRoute={setSelectedRoute} />  {/* Pass setSelectedRoute function to Sidebar */}
      <ContentArea selectedRoute={selectedRoute} />
    </div>
  );
}
