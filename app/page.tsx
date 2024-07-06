// // Main Layout (replace with actual code)
"use client" 
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Services from './components/Services';
import Blog from './components/Blog';





export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      {/* Main content */}
      <Services/>
      <Portfolio/>
      <Blog />
      <About/>
     <Contact />
      <Footer />
    </main>
  );
}



