import { NextResponse, NextRequest } from 'next/server';
import { getSession } from '@/app/lib/auth';
import { prisma } from '@/app/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    const { id } = await params;

    if (!session || (session.role !== 'ADMIN' && session.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const review = await prisma.review.update({
      where: { id },
      data: { isApproved: true },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error('Error approving review:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
