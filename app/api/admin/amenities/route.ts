import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  try {
    const amenities = await prisma.amenity.findMany({
      orderBy: { name: 'asc' },
    });

    return NextResponse.json(amenities);
  } catch (error) {
    console.error('Error fetching amenities:', error);
    return NextResponse.json({ error: 'Failed to fetch amenities' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, category, icon } = body;

    const amenity = await prisma.amenity.create({
      data: {
        name,
        description,
        category,
        icon,
      },
    });

    return NextResponse.json(amenity, { status: 201 });
  } catch (error) {
    console.error('Error creating amenity:', error);
    return NextResponse.json({ error: 'Failed to create amenity' }, { status: 500 });
  }
}
