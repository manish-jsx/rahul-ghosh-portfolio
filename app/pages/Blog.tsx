// app/pages/blog.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BeatLoader } from "react-spinners";
import Link from "next/link";

interface BlogPost {
  title: string;
  summary: string;
  publishedDate: string;
  slug: string; // Assuming you have a unique slug for each blog post
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch("/api/blog"); // Fetch from your blog API
        const data = await response.json();
        setBlogPosts(data.slice(0, 3)); // Get the latest 3 posts
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <section id="blog" className="py-20 bg-base-100 min-h-screen">
      <div className="container mx-auto text-center">
        <motion.h2 className="text-4xl font-bold mb-8 text-primary" variants={itemVariants}>
          Latest Blog Posts
        </motion.h2>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <BeatLoader color="#4f46e5" />
          </div>
        ) : (
          <AnimatePresence>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants}>
              {blogPosts.map((post) => (
                <motion.div key={post.slug} className="card bg-base-100 shadow-xl" variants={itemVariants}>
                  <div className="card-body">
                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="card-title">{post.title}</h2>
                    </Link>
                    <p>{post.summary}</p>
                    <div className="card-actions justify-end">
                      <div className="badge badge-outline">{post.publishedDate}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
