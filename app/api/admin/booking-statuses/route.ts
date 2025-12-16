import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  try {
    const bookingStatuses = await prisma.bookingStatus.findMany({
      include: {
        _count: {
          select: { bookings: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json(bookingStatuses);
  } catch (error) {
    console.error('Error fetching booking statuses:', error);
    return NextResponse.json({ error: 'Failed to fetch booking statuses' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, color } = body;

    const bookingStatus = await prisma.bookingStatus.create({
      data: {
        name,
        description,
        color,
      },
    });

    return NextResponse.json(bookingStatus, { status: 201 });
  } catch (error) {
    console.error('Error creating booking status:', error);
    return NextResponse.json({ error: 'Failed to create booking status' }, { status: 500 });
  }
}
