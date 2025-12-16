import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  try {
    const countries = await prisma.country.findMany({
      include: {
        _count: {
          select: { cities: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json(countries);
  } catch (error) {
    console.error('Error fetching countries:', error);
    return NextResponse.json({ error: 'Failed to fetch countries' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, code } = body;

    const country = await prisma.country.create({
      data: {
        name,
        code: code.toUpperCase(),
      },
    });

    return NextResponse.json(country, { status: 201 });
  } catch (error) {
    console.error('Error creating country:', error);
    return NextResponse.json({ error: 'Failed to create country' }, { status: 500 });
  }
}
