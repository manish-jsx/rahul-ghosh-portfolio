// app/components/Footer.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
    FaTwitter, FaLinkedin, FaInstagram, FaGithub, FaMedium
} from 'react-icons/fa'; 

// Define the footer variants outside the component for better performance
const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

const socialLinks = [
  { icon: FaTwitter, url: 'https://twitter.com/your_handle' },
  { icon: FaLinkedin, url: 'https://linkedin.com/in/your_profile' },
  { icon: FaInstagram, url: 'https://instagram.com/your_handle' },
  { icon: FaGithub, url: 'https://github.com/your_handle' },
  { icon: FaMedium, url: 'https://medium.com/@your_handle' },
];


export default function Footer() {
    return (
        <motion.footer
            className="footer p-10 bg-base-200 text-base-content"
            variants={footerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                <div>
                    <h4 className="text-lg font-semibold mb-4">About</h4>
                    <ul className="space-y-2">
                        <li><Link href="/about">About Me</Link></li>
                        <li><Link href="/blog">Blog</Link></li>
                    </ul>
                </div>
                
                <div>
                    <h4 className="text-lg font-semibold mb-4">Services</h4>
                    <ul className="space-y-2">
                        <li><Link href="/services">Web Development</Link></li>
                        <li><Link href="/services">UI/UX Design</Link></li>
                        <li><Link href="/services">Consulting</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-semibold mb-4">Connect</h4>
                    <div className="flex space-x-4">
                        {socialLinks.map(({ icon: Icon, url }) => (
                            <motion.a
                                key={url}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                className="text-2xl"
                            >
                                <Icon />
                            </motion.a>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-lg font-semibold mb-4">Legal</h4>
                    <ul className="space-y-2">
                        <li><Link href="/terms">Terms of Service</Link></li>
                        <li><Link href="/privacy">Privacy Policy</Link></li>
                    </ul>
                </div>
            </div>

            <div className="mt-8 text-center">
                <p>&copy; {new Date().getFullYear()} Rahul Ghosh</p>
            </div>
        </motion.footer>
    );
}
