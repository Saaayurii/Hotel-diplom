import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, description, category, icon } = body;

    const amenity = await prisma.amenity.update({
      where: { id },
      data: {
        name,
        description,
        category,
        icon,
      },
    });

    return NextResponse.json(amenity);
  } catch (error) {
    console.error('Error updating amenity:', error);
    return NextResponse.json({ error: 'Failed to update amenity' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.amenity.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting amenity:', error);
    return NextResponse.json({ error: 'Failed to delete amenity' }, { status: 500 });
  }
}
