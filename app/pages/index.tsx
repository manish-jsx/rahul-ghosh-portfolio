// Main Layout (replace with actual code)
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import Portfolio from '../components/Portfolio';





export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      {/* Main content */}
      <Portfolio/>
     <Contact />
      <Footer />
    </main>
  );
}