import { NextResponse, NextRequest } from 'next/server';
import { getSession } from '@/app/lib/auth';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  try {
    const session = await getSession();

    if (!session || (session.role !== 'ADMIN' && session.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const rooms = await prisma.room.findMany({
      include: {
        hotel: {
          select: {
            name: true,
          },
        },
        roomType: {
          select: {
            name: true,
            maxGuests: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session || (session.role !== 'ADMIN' && session.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const room = await prisma.room.create({
      data: {
        number: data.number,
        hotelId: data.hotelId,
        roomTypeId: data.roomTypeId,
        floor: data.floor,
        size: data.size,
        pricePerNight: data.pricePerNight,
        isAvailable: data.isAvailable ?? true,
        description: data.description,
      },
      include: {
        hotel: {
          select: {
            name: true,
          },
        },
        roomType: {
          select: {
            name: true,
            maxGuests: true,
          },
        },
      },
    });

    return NextResponse.json(room);
  } catch (error) {
    console.error('Error creating room:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
