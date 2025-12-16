import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  try {
    const roomTypes = await prisma.roomType.findMany({
      include: {
        _count: {
          select: { rooms: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json(roomTypes);
  } catch (error) {
    console.error('Error fetching room types:', error);
    return NextResponse.json({ error: 'Failed to fetch room types' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, maxGuests } = body;

    const roomType = await prisma.roomType.create({
      data: {
        name,
        description,
        maxGuests: parseInt(maxGuests),
      },
    });

    return NextResponse.json(roomType, { status: 201 });
  } catch (error) {
    console.error('Error creating room type:', error);
    return NextResponse.json({ error: 'Failed to create room type' }, { status: 500 });
  }
}
