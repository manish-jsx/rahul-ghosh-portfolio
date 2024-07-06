// app/pages/Services.tsx
"use client";

import { motion } from 'framer-motion';
import { FaCode, FaPenNib, FaShareAlt, FaSearch, FaMobileAlt, FaTools } from 'react-icons/fa'; // Import all necessary icons

const servicesData = [
  {
    title: 'Web Development',
    description: 'Crafting beautiful, responsive, and performant websites tailored to your needs. From modern frontend technologies (like React and Next.js) to robust backend solutions (like Node.js and Python), I bring your digital vision to life.',
    icon: <FaCode />, // Use the imported component here
  },
  {
    title: 'UI/UX Design',
    description: 'Creating intuitive and engaging user experiences through user-centered design principles. I focus on building interfaces that are easy to navigate, aesthetically pleasing, and optimized for conversions.',
    icon: <FaPenNib />,
  },
  {
    title: 'Social Media Marketing',
    description: 'Developing and executing comprehensive social media strategies to grow your online presence. I craft engaging content, manage your channels, and analyze data to optimize your campaigns for maximum reach and engagement.',
    icon: <FaShareAlt />,
  },
  {
    title: 'SEO Optimization',
    description: 'Improving your website\'s visibility in search engine results to attract more organic traffic. I perform keyword research, on-page optimization, and technical audits to boost your rankings and drive targeted traffic to your site.',
    icon: <FaSearch />,
  },
  {
    title: 'Mobile App Development',
    description: 'Building high-quality native or cross-platform mobile applications for iOS and Android. I follow industry best practices to deliver user-friendly, reliable, and scalable mobile solutions.',
    icon: <FaMobileAlt />,
  },
  {
    title: 'Website Maintenance & Support',
    description: 'Providing ongoing website maintenance and support services to ensure your website remains up-to-date, secure, and running smoothly. I offer regular updates, backups, performance optimizations, and troubleshooting assistance.',
    icon: <FaTools />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

export default function Services() {
  return (
    <motion.section
      id="services"
      className="py-20 bg-base-100 min-h-screen flex items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto text-center">
        <motion.h2 className="text-4xl font-bold mb-8 text-primary" variants={itemVariants}>
          My Services
        </motion.h2>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants}>
          {servicesData.map((service, index) => (
            <motion.div key={index} className="card bg-base-100 shadow-xl" variants={itemVariants}>
              <figure className="px-10 pt-10">
                <i className={`fa ${service.icon} fa-4x text-primary mb-4`}></i> 
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl">{service.title}</h2>
                <p>{service.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
