"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Contact from "./Contact";
import ProjectCard from "../components/ProjectCard";
import { projectsData } from "../components/Portfolio"; // Import your project data
import { itemVariants } from "../components/Portfolio"; 
import { motion, AnimatePresence } from "framer-motion";


export default function Projects() {
  return (
    <main>
      <Header />

      {/* Main content */}
      <AnimatePresence>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0 }}
        >
          {projectsData.map((project) => ( // Map over projectsData
            <ProjectCard
              key={project.title}
              project={project} // Pass the project object
              variants={itemVariants}
            />
          ))}
        </motion.div>
      </AnimatePresence>
      <Contact />
      <Footer />
    </main>
  );
}
