"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      id="about"
      className="py-16 bg-base-200"
    >
      <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-extrabold text-primary mb-4">About Me</h2>
          <p className="text-lg text-base-content leading-relaxed mb-4">
            Rahul Ghosh is a seasoned <span className="font-bold text-primary">UI/UX designer</span> with a flair for creating intuitive and visually appealing digital experiences. With over a decade of experience in <span className="font-bold text-primary">digital marketing</span>, <span className="font-bold text-primary">social media strategy</span>, and <span className="font-bold text-primary">graphic design</span>, Rahul combines creativity with technical expertise to drive engagement and deliver impactful solutions. His passion for design and technology fuels his continuous pursuit of innovative ways to enhance user interactions and brand presence in the digital world.
          </p>
          <ul className="list-disc list-inside text-left text-base-content">
            <li className="mb-2"><span className="font-bold">UI/UX Designer:</span> Led the design of multiple high-traffic websites and mobile applications, focusing on user-centered design principles to enhance usability and user satisfaction.</li>
            <li className="mb-2"><span className="font-bold">Digital Marketing Specialist:</span> Developed and executed comprehensive digital marketing strategies that significantly increased brand awareness and customer engagement.</li>
            <li className="mb-2"><span className="font-bold">Social Media Marketing:</span> Strategized and managed social media campaigns across platforms, achieving substantial growth in followers and engagement.</li>
            <li className="mb-2"><span className="font-bold">Graphic Designer:</span> Created a wide range of digital and print materials, including logos, brochures, banners, social media graphics, and website elements.</li>
          </ul>
          <p className="text-lg text-base-content leading-relaxed mt-4">
            <span className="font-bold">Education:</span> Bachelor of Arts in Graphic Design, National Institute of Design, Ahmedabad; Diploma in Digital Marketing, Indian School of Business, Hyderabad.
          </p>
          <p className="text-lg text-base-content leading-relaxed mt-4">
            <span className="font-bold">Skills:</span> UI/UX Design, Digital Marketing, Social Media Marketing, Graphic Design. Tools: Sketch, Adobe XD, Figma, InVision, Google Analytics, SEMrush, HubSpot.
          </p>
          <p className="text-lg text-base-content leading-relaxed mt-4">
            <span className="font-bold">Contact:</span> Email: rahul.ghosh@example.com, LinkedIn: linkedin.com/in/rahulghosh, Portfolio: rahulghoshdesigns.com.
          </p>
        </div>
        <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
          <Image src='/images/profile.jpg' alt="Rahul Ghosh" fill className="object-cover" />
        </div>
      </div>
    </motion.section>
  );
}
