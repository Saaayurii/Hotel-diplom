import { NextResponse } from 'next/server';
import { getSession } from '@/app/lib/auth';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  try {
    const session = await getSession();

    if (!session || (session.role !== 'ADMIN' && session.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [
      totalHotels,
      totalRooms,
      totalBookings,
      totalUsers,
      activeBookings,
      payments,
    ] = await Promise.all([
      prisma.hotel.count(),
      prisma.room.count(),
      prisma.booking.count(),
      prisma.user.count(),
      prisma.booking.count({
        where: {
          bookingStatus: {
            name: { in: ['CONFIRMED', 'CHECKED_IN'] },
          },
        },
      }),
      prisma.payment.aggregate({
        where: { status: 'COMPLETED' },
        _sum: { amount: true },
      }),
    ]);

    return NextResponse.json({
      totalHotels,
      totalRooms,
      totalBookings,
      totalUsers,
      activeBookings,
      totalRevenue: Number(payments._sum.amount) || 0,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
