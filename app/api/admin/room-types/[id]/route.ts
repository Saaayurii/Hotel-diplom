import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, description, maxGuests } = body;

    const roomType = await prisma.roomType.update({
      where: { id },
      data: {
        name,
        description,
        maxGuests: parseInt(maxGuests),
      },
    });

    return NextResponse.json(roomType);
  } catch (error) {
    console.error('Error updating room type:', error);
    return NextResponse.json({ error: 'Failed to update room type' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.roomType.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting room type:', error);
    return NextResponse.json({ error: 'Failed to delete room type' }, { status: 500 });
  }
}
