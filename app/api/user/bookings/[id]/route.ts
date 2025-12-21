import { NextResponse } from 'next/server';
import { getSession } from '@/app/lib/auth';
import { prisma } from '@/app/lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    // Find booking and verify ownership
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        bookingStatus: true,
      },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    if (booking.userId !== session.userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Check if booking can be cancelled
    if (booking.bookingStatus.name === 'Cancelled' || booking.bookingStatus.name === 'Completed') {
      return NextResponse.json(
        { error: 'Cannot cancel this booking' },
        { status: 400 }
      );
    }

    // Get cancelled status
    const cancelledStatus = await prisma.bookingStatus.findFirst({
      where: { name: 'Cancelled' },
    });

    if (!cancelledStatus) {
      return NextResponse.json(
        { error: 'Cancelled status not configured' },
        { status: 500 }
      );
    }

    // Update booking status to cancelled
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: {
        bookingStatusId: cancelledStatus.id,
      },
      include: {
        room: {
          include: {
            hotel: true,
            roomType: true,
          },
        },
        bookingStatus: true,
      },
    });

    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
