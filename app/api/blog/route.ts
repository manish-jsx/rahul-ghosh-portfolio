// app/api/blog/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Define your BlogPost interface or type
interface BlogPost {
  title: string;
  summary: string;
  publishedDate: string;
  slug: string;
  // ... other properties
}

// Placeholder blog data (replace with actual fetching logic)
const blogPosts: BlogPost[] = [
  {
    title: "My First Blog Post",
    summary: "This is a summary of my first blog post...",
    publishedDate: "2023-12-15",
    slug: "my-first-blog-post",
  },
  {
    title: "Another Interesting Blog Post",
    summary: "In this post, I explore...",
    publishedDate: "2023-12-10",
    slug: "another-interesting-blog-post",
  },
  {
    title: "The Third Blog Post",
    summary: "This is the third blog post in the series...",
    publishedDate: "2023-12-05",
    slug: "the-third-blog-post",
  },
];

// Function to fetch blog posts (replace with your actual logic)
async function getBlogPosts(): Promise<BlogPost[]> {
  // ... your logic to fetch blog posts from a database, file, or API
  return blogPosts; // Returning the placeholder data for now
}

export async function GET(request: NextRequest) {
  try {
    const posts = await getBlogPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}
