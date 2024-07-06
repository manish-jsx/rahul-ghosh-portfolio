// app/api/about/route.ts
import { NextRequest, NextResponse } from 'next/server';

const aboutData = {
  name: 'Rahul Ghosh',
  title: 'Full-Stack Web Developer & UI/UX Designer',
  bio: "I'm a passionate developer and designer who loves creating beautiful, user-friendly web experiences. With a strong foundation in frontend and backend technologies, I thrive on building innovative solutions that solve real-world problems.",
  skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Figma', 'Adobe XD'],
  // ... add more fields like experience, education, interests, etc.
};

export async function GET(request: NextRequest) {
  return NextResponse.json(aboutData);
}
