// app/pages/Contact.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';

const services = ['Web Development', 'UI/UX Design', 'Consulting', 'Other']; // Move services array outside of the component

export default function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <AnimatePresence>
      <section id="contact" className="py-20 bg-base-100 min-h-screen flex items-center justify-center">
        <motion.div
          className="container mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0 }}
        >
          <motion.h2
            className="text-4xl font-bold mb-8 text-primary"
            variants={itemVariants}
          >
            Get in Touch
          </motion.h2>
          <motion.form
            className="grid grid-cols-1 gap-6 max-w-md mx-auto"
            variants={itemVariants}
          >
            <motion.input
              type="text"
              placeholder="First Name"
              className="input input-bordered w-full bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            />
         
            <motion.input type="text" placeholder="Last Name"
              className="input input-bordered w-full bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }} />

            {/* (Input fields repeated for email and textarea) */}
            {/* Email */}
            <motion.input type='email' className="textarea textarea-bordered col-span-2 bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Email" variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} />

            {/* Phone (Optional) */}
            <motion.input type="tel" placeholder="Your Phone (Optional)" className="input input-bordered w-full bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary" variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} />

           {/* Service */}
           <motion.select className="select select-bordered w-full bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary" variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <option disabled selected>Select a Service</option>
                        {services.map((service) => (
                            <option key={service}>{service}</option>
                        ))}
                    </motion.select>

            {/* Budget (Optional) */}
            <motion.input type="text" placeholder="Your Budget (Optional)" className="input input-bordered w-full bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary" variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} />

            {/* Message */}
            <motion.textarea className="textarea textarea-bordered col-span-2 bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your Message" variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} />

            <motion.button className="btn btn-primary col-span-2" variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Send
            </motion.button>
           
          </motion.form>
        </motion.div>
      </section>
    </AnimatePresence>
  );
}
