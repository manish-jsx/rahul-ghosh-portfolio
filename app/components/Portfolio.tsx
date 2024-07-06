"use client";

import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { AnimatePresence, motion } from 'framer-motion';
import { BeatLoader } from 'react-spinners'; // For loading animation (install if not already installed)

// Sample project data (replace with your actual project data fetched from API or CMS)
// Sample Project Data (Replace with your actual data)
const projectsData: {
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  liveDemoLink?: string;
  githubLink?: string;
}[] = [
    {
      title: 'Portfolio Website',
      description: 'My personal portfolio built with Next.js, React, and Tailwind CSS.',
      imageUrl: 'https://www.gardendesign.com/pictures/images/900x705Max/dream-team-s-portland-garden_6/marigold-flowers-orange-pixabay_12708.jpg',
      techStack: ['Next.js', 'React', 'Tailwind CSS'],
      liveDemoLink: '#', // Replace with your live demo link
    },
    {
      title: 'E-commerce App',
      description: 'A full-stack e-commerce application using Node.js, Express, and MongoDB.',
      imageUrl: 'https://www.gardendesign.com/pictures/images/900x705Max/dream-team-s-portland-garden_6/marigold-flowers-orange-pixabay_12708.jpg',
      techStack: ['Node.js', 'Express', 'MongoDB', 'React'],
      githubLink: '#', // Replace with your GitHub link
    },
    {
      title: 'Weather Dashboard',
      description: 'A simple weather dashboard using the OpenWeatherMap API.',
      imageUrl: 'https://www.gardendesign.com/pictures/images/900x705Max/dream-team-s-portland-garden_6/marigold-flowers-orange-pixabay_12708.jpg',
      techStack: ['React', 'API'],
    },
    // ... add more project objects here
  ];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }, // Smooth stagger
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch projects from API or data source
    // Replace this with your actual fetch logic
    const fetchProjects = async () => {
      try {
        // Example fetch: const response = await fetch('/api/projects');
        // const data = await response.json();
        // setProjects(data);
        setProjects(projectsData); // Use sample data for now
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="portfolio" className="py-20 bg-base-100 min-h-screen">
      <motion.div
        className="container mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-4xl font-bold mb-12 text-primary"
          variants={itemVariants}
        >
          My Portfolio
        </motion.h2>
        {isLoading ? ( // Loading state
          <div className="flex justify-center items-center h-64">
            <BeatLoader color="#4f46e5" />
          </div>
        ) : ( // Projects loaded
          <AnimatePresence>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants}>
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} variants={itemVariants} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </section>
  );
}
