"use client";
import { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import { AnimatePresence, motion } from "framer-motion";
import { BeatLoader } from "react-spinners";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  liveDemoLink?: string;
  githubLink?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);  // Initialize with an empty array of type Project[]
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        const data: Project[] = await response.json();  // Assert data as Project[]
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
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
        ) : (
          // Projects loaded
          <AnimatePresence>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
            >
              {projects.map((project) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  variants={itemVariants}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </section>
  );
}
