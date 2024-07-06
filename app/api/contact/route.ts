// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // 1. Validate Form Data (add your validation logic here)
    // 2. Store/Send Form Data (e.g., email, database, etc.)
    // ... your form handling logic ...

    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error handling contact form:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
