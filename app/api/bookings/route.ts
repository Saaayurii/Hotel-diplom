import { NextResponse } from 'next/server';
import { getSession } from '@/app/lib/auth';
import { prisma } from '@/app/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { roomId, checkInDate, checkOutDate, numberOfGuests, specialRequests } = body;

    // Validate required fields
    if (!roomId || !checkInDate || !checkOutDate || !numberOfGuests) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate dates
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const now = new Date();

    if (checkIn < now) {
      return NextResponse.json(
        { error: 'Check-in date cannot be in the past' },
        { status: 400 }
      );
    }

    if (checkOut <= checkIn) {
      return NextResponse.json(
        { error: 'Check-out date must be after check-in date' },
        { status: 400 }
      );
    }

    // Check if room exists and is available
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: {
        roomType: true,
      },
    });

    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    if (!room.isAvailable) {
      return NextResponse.json({ error: 'Room is not available' }, { status: 400 });
    }

    // Check if room is already booked for these dates
    const existingBooking = await prisma.booking.findFirst({
      where: {
        roomId,
        OR: [
          {
            AND: [
              { checkInDate: { lte: checkIn } },
              { checkOutDate: { gt: checkIn } },
            ],
          },
          {
            AND: [
              { checkInDate: { lt: checkOut } },
              { checkOutDate: { gte: checkOut } },
            ],
          },
          {
            AND: [
              { checkInDate: { gte: checkIn } },
              { checkOutDate: { lte: checkOut } },
            ],
          },
        ],
        bookingStatus: {
          name: {
            notIn: ['Cancelled', 'Rejected'],
          },
        },
      },
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: 'Room is already booked for these dates' },
        { status: 400 }
      );
    }

    // Validate number of guests
    if (numberOfGuests > room.roomType.maxGuests) {
      return NextResponse.json(
        { error: `Room can accommodate maximum ${room.roomType.maxGuests} guests` },
        { status: 400 }
      );
    }

    // Calculate total price
    const nights = Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = Number(room.pricePerNight) * nights;

    // Get default booking status (Pending)
    const bookingStatus = await prisma.bookingStatus.findFirst({
      where: { name: 'Pending' },
    });

    if (!bookingStatus) {
      return NextResponse.json(
        { error: 'Booking status not configured' },
        { status: 500 }
      );
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId: session.userId,
        roomId,
        bookingStatusId: bookingStatus.id,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        numberOfGuests,
        specialRequests,
        totalPrice,
        finalPrice: totalPrice, // Without discount for now
      },
      include: {
        room: {
          include: {
            hotel: {
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
            },
            roomType: true,
          },
        },
        bookingStatus: true,
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
