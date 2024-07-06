// app/api/services/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface Service {
  id: number; // Assuming you have a unique ID for each service
  title: string;
  description: string;
  icon: string; // Icon class name (e.g., 'fas fa-code')
}

// Placeholder services data (replace with database or persistent storage)
let services: Service[] = [
  { id: 1, title: 'Web Development', description: 'Crafting beautiful, responsive, and performant websites...', icon: 'FaCode' },
  { id: 2, title: 'UI/UX Design', description: 'Creating intuitive and engaging user experiences...', icon: 'FaPenNib' },
  // ... add more services
];
let nextId = services.length > 0 ? Math.max(...services.map(service => service.id)) + 1 : 1; // Calculate the next available ID

export async function GET(request: NextRequest) {
  return NextResponse.json(services);
}

export async function POST(request: NextRequest) {
  try {
    const newService: Service = await request.json();
    // Validate the new service data
    if (!newService.title || !newService.description || !newService.icon) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    newService.id = nextId++;
    services.push(newService);
    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedService: Service = await request.json();

    // Validate the updated service data
    if (!updatedService.id || !updatedService.title || !updatedService.description || !updatedService.icon) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const index = services.findIndex(service => service.id === updatedService.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    services[index] = updatedService;
    return NextResponse.json(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idToDelete = parseInt(searchParams.get('id') || '', 10);

    if (isNaN(idToDelete)) {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    services = services.filter(service => service.id !== idToDelete);
    return NextResponse.json({ message: 'Service deleted' });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
