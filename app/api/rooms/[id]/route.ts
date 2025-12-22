import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const room = await prisma.room.findUnique({
      where: {
        id: id,
      },
      include: {
        hotel: {
          select: {
            id: true,
            name: true,
            stars: true,
            phone: true,
            email: true,
            checkInTime: true,
            checkOutTime: true,
            address: {
              select: {
                street: true,
                building: true,
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
            description: true,
            maxGuests: true,
          },
        },
        roomImages: {
          orderBy: [
            { isPrimary: 'desc' },
            { displayOrder: 'asc' },
          ],
        },
      },
    });

    if (!room) {
      return NextResponse.json(
        { error: 'Room not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(room);
  } catch (error) {
    console.error('Error fetching room:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
