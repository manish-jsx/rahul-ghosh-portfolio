// app/pages/Contact.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from "react"; // Added useState hook for form data and submission status


const services = ['Web Development', 'UI/UX Design', 'Consulting', 'Other']; // Move services array outside of the component

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "", // Optional field, so it can be empty
    service: services[0], // Default to the first service
    budget: "", // Optional field
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Added loading state

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true); // Show loading state

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          service: services[0], // Reset to the first service
          budget: "",
          message: "",
        });
        setFormSubmitted(true);
        setFormError(null);
      } else {
        const errorData = await response.json();
        setFormError(errorData.error || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false); // Hide loading state
    }
  };

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
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-md mx-auto"
        variants={itemVariants}
        onSubmit={handleSubmit}
      >
        <motion.input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="input input-bordered w-full bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        />
         <motion.input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="input input-bordered w-full bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        />
        <motion.input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          placeholder="Email" 
          className="textarea textarea-bordered col-span-2 bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary" 
          variants={itemVariants} 
          whileHover={{ scale: 1.02 }} 
          whileTap={{ scale: 0.98 }} 
        />
        <motion.input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Your Phone (Optional)" className="input input-bordered w-full bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary" variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} />

         <motion.select 
           name="service" 
           value={formData.service}
           onChange={handleChange} 
           className="select select-bordered w-full bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary" 
           variants={itemVariants} 
           whileHover={{ scale: 1.02 }} 
           whileTap={{ scale: 0.98 }} 
         >
             <option disabled>Select a Service</option>
             {services.map((service) => (
               <option key={service}>{service}</option>
             ))}
         </motion.select>
         <motion.input type="text" name="budget" value={formData.budget} onChange={handleChange} placeholder="Your Budget (Optional)" className="input input-bordered w-full bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary" variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} />
           <motion.textarea name="message" value={formData.message} onChange={handleChange} className="textarea textarea-bordered col-span-2 bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your Message" variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} />
           <motion.button
             type="submit"
             className="btn btn-primary col-span-2"
             variants={itemVariants}
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             disabled={isSubmitting} // Disable button during submission
           >
             {isSubmitting ? 'Sending...' : 'Send'}
           </motion.button>
           {formError && (
             <div className="col-span-2 text-error">
               <p>{formError}</p>
             </div>
           )}
           {formSubmitted && (
             <div className="col-span-2 text-success">
               <p>Message sent successfully!</p>
             </div>
           )}
        </motion.form>
        {/* ... */}
        </motion.div>
      </section>
    </AnimatePresence>
  );
}
