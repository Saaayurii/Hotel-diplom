import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  try {
    const rooms = await prisma.room.findMany({
      where: {
        isAvailable: true,
        hotel: {
          isActive: true,
        },
      },
      include: {
        hotel: {
          select: {
            id: true,
            name: true,
            address: {
              select: {
                city: {
                  select: {
                    name: true,
                    country: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        roomType: {
          select: {
            id: true,
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
