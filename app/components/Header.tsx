"use client"; // For client components in Next 13
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-base-100 shadow-md sticky top-0 z-50">
      {/* Removed the <header> tag, replaced with <div> */}
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="text-2xl font-bold">Rahul Ghosh</div> 
        <nav>
          <button className="btn btn-ghost lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>

          <ul className={`menu menu-horizontal p-0 lg:flex ${isMenuOpen ? 'block' : 'hidden'}`}>
            <li><a href="#about">About</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
      {/* Removed the closing </header> tag */}
    </div>  
  );
}
