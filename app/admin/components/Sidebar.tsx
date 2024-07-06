// app/admin/components/Sidebar.tsx
"use client";

import Link from "next/link";

// Removed the `export` keyword from `apiRoutes`
const apiRoutes = [
  { path: "/api/about", label: "About" },
  { path: "/api/projects", label: "Projects" },
  { path: "/api/blog", label: "Blog Posts" },
  { path: "/api/contact", label: "Contact" },
  { path: "/api/services", label: "Services" },
]; 

export default function Sidebar({ setSelectedRoute }: any) {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-semibold mb-4">Admin Panel</h2>
      <ul>
        {apiRoutes.map((route) => (
          <li key={route.path} className="mb-2">
            <Link
              href="#"
              onClick={() => setSelectedRoute(route.path)} // Update selectedRoute on click
              className="hover:bg-gray-700 p-2 rounded"
            >
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
