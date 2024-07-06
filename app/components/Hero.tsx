"use client";

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="hero min-h-screen bg-gradient-to-r from-primary to-secondary text-white"
    >
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Elevating Brands Through Design</h1>
          <p className="py-6">
            {/* AI-generated intro for Rahul Ghosh */}
          </p>
          <button className="btn btn-accent">Explore My Work</button>
        </div>
      </div>
    </motion.section>
  );
}
