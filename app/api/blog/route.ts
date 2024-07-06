// app/api/blog/route.ts
import { NextRequest, NextResponse } from 'next/server';

// ... (Fetch blog posts from your database or file system) ...

export async function GET(request: NextRequest) {
  try {
    const posts = await getBlogPosts(); // Your data fetching logic
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}
