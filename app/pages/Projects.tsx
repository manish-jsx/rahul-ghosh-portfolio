// Main Layout (replace with actual code)
import Header from '../components/Header';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import ProjectCard  from '../components/ProjectCard';




export default function ProjectsPage() {
  return (
    <main>
      <Header />
      {/* Main content */}
      <ProjectCard project={undefined} variants={undefined} />
     <Contact />
      <Footer />
    </main>
  );
}