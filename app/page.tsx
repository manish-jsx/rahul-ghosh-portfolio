// // Main Layout (replace with actual code)
"use client" 
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Services from './components/Services';





export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      {/* Main content */}
      <Services/>
      <Portfolio/>
      <About/>
     <Contact />
      <Footer />
    </main>
  );
}

// App.tsx
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import PortfolioPage from './pages/Portfolio';
// import Home from './pages/index';
// import AboutPage from './pages/About';
// import ContactPage from './pages/Contact';
// import ProjectsPage from './pages/Projects';
// import ServicePage from './pages/Services';


// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/portfolio" element={<PortfolioPage />} />
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="/contact" element={<ContactPage />} />
//         <Route path="/projects" element={<ProjectsPage />} />
//         <Route path="/services" element={<ServicePage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
