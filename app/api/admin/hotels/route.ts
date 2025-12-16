import { NextResponse, NextRequest } from 'next/server';
import { getSession } from '@/app/lib/auth';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  try {
    const session = await getSession();

    if (!session || (session.role !== 'ADMIN' && session.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const hotels = await prisma.hotel.findMany({
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
        _count: {
          select: {
            rooms: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(hotels);
  } catch (error) {
    console.error('Error fetching hotels:', error);
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

    const hotel = await prisma.hotel.create({
      data: {
        name: data.name,
        description: data.description,
        stars: data.stars,
        phone: data.phone,
        email: data.email,
        checkInTime: data.checkInTime,
        checkOutTime: data.checkOutTime,
        isActive: data.isActive ?? true,
        address: {
          create: {
            street: data.address.street,
            building: data.address.building,
            postalCode: data.address.postalCode,
            latitude: data.address.latitude,
            longitude: data.address.longitude,
            cityId: data.address.cityId,
          },
        },
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
    console.error('Error creating hotel:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
