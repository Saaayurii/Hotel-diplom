import { NextResponse, NextRequest } from 'next/server';
import { getSession } from '@/app/lib/auth';
import { prisma } from '@/app/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    const { id } = await params;

    if (!session || (session.role !== 'ADMIN' && session.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const hotel = await prisma.hotel.findUnique({
      where: { id },
      include: {
        address: {
          include: {
            city: {
              include: {
                country: true,
              },
            },
          },
        },
        hotelAmenities: {
          include: {
            amenity: true,
          },
        },
        hotelImages: true,
        _count: {
          select: {
            rooms: true,
            reviews: true,
          },
        },
      },
    });

    if (!hotel) {
      return NextResponse.json({ error: 'Hotel not found' }, { status: 404 });
    }

    return NextResponse.json(hotel);
  } catch (error) {
    console.error('Error fetching hotel:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    const { id } = await params;

    if (!session || (session.role !== 'ADMIN' && session.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const hotel = await prisma.hotel.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        stars: data.stars,
        phone: data.phone,
        email: data.email,
        checkInTime: data.checkInTime,
        checkOutTime: data.checkOutTime,
        isActive: data.isActive,
      },
      include: {
        address: {
          include: {
            city: {
              include: {
                country: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(hotel);
  } catch (error) {
    console.error('Error updating hotel:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    const { id } = await params;

    if (!session || (session.role !== 'ADMIN' && session.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.hotel.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    console.error('Error deleting hotel:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
