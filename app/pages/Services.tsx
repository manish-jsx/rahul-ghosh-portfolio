// Main Layout (replace with actual code)
import Header from '../components/Header';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import Portfolio from '../components/Portfolio';
import Services from '../components/Services';





export default function ServicePage() {
  return (
    <main>
      <Header />
      {/* Main content */}
      <Services/>
      <Portfolio/>
     <Contact />
      <Footer />
    </main>
  );
}