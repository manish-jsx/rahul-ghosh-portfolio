// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'app', 'data', 'contact-submissions.json');


// Helper Functions (Keep them outside of the main POST handler for better organization)

function extractFormData(formData: FormData) {
  return {
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string | null,
    service: formData.get('service') as string,
    budget: formData.get('budget') as string | null,
    message: formData.get('message') as string,
  };
}

function isValidFormData(firstName: string, lastName: string, email: string, service: string, message: string): boolean {
  return !!firstName && !!lastName && !!email && !!service && !!message; // Basic validation
}

function createEmailText(
  firstName: string,
  lastName: string,
  email: string,
  phone: string | null,
  service: string,
  budget: string | null,
  message: string
): string {
  return `
    Name: ${firstName} ${lastName}
    Email: ${email}
    Phone: ${phone || 'Not provided'}
    Service: ${service}
    Budget: ${budget || 'Not provided'}
    Message:
    ${message}
  `;
}



export async function POST(request: NextRequest) {
  try {
    // Parse the request body as JSON instead of formData
    const data = await request.json();
    console.log("Request data:", data);
    
    const { firstName, lastName, email, phone, service, budget, message } = data;

    if (!isValidFormData(firstName, lastName, email, service, message)) {
      return NextResponse.json({ error: 'Please fill out all required fields.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"${firstName} ${lastName}" <${email}>`, // Use the user's email
      to: process.env.RECIPIENT_EMAIL,
      subject: 'New Contact Form Submission',
      text: createEmailText(firstName, lastName, email, phone, service, budget, message),
    });

    await appendFormDataToJson(firstName, lastName, email, phone, service, budget, message);
    
    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });

  } catch (error: any) {
    console.error('Error handling contact form:', error.message);
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
  }
}


// Helper functions (unchanged)
// ...
async function appendFormDataToJson(firstName: string, lastName: string, email: string, phone: string | null, service: string, budget: string | null, message: string) {
    try {
      const existingData = JSON.parse(await fs.readFile(dataFilePath, 'utf-8')) || [];

      const newFormData = {
        firstName,
        lastName,
        email,
        phone,
        service,
        budget,
        message,
        timestamp: new Date().toISOString() // Add a timestamp
      };
  
      existingData.push(newFormData);
      await fs.writeFile(dataFilePath, JSON.stringify(existingData, null, 2));
    } catch (error) {
      console.error("Error appending form data to JSON:", error);
    }
  }






