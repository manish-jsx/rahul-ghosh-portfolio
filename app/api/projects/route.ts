// app/api/projects/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Sample project data (replace with your database or file-based storage)
const projects: {
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  liveDemoLink?: string;
  githubLink?: string;
}[] = [
  // ... (your project data objects - same as in the Portfolio component) ...
];

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(projects); 
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
