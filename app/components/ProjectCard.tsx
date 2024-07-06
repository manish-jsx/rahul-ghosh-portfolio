// app/components/ProjectCard.tsx
'use client'
import { motion } from 'framer-motion';
import Image from 'next/image'; 

interface Project {
  title: string;
  description: string;
  imageUrl: string; 
  techStack: string[];
  liveDemoLink?: string; 
  githubLink?: string; 
}

const ProjectCard = ({ project, variants }: { project: Project; variants: any }) => {
  // Fallback image if project.imageUrl is undefined or invalid
  const fallbackImageSrc = '/path/to/default-image.jpg'; 
  const imageSrc = project.imageUrl || fallbackImageSrc; // Use imageUrl

  return (
    <motion.div
      className="card bg-base-100 shadow-xl"
      variants={variants}
    >
      <figure>
        <Image 
          src={imageSrc}
          alt={project.title}
          width={400} 
          height={300}
          className="rounded-t-lg" 
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{project.title}</h2>
        <p>{project.description}</p>
        <div className="card-actions justify-end">
          {/* Optional: Links to live demo and GitHub repo */}
          {project.liveDemoLink && (
            <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Live Demo
            </a>
          )}
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn">
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

