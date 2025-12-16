import { NextResponse, NextRequest } from 'next/server';
import { getSession } from '@/app/lib/auth';
import { prisma } from '@/app/lib/prisma';

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

    await prisma.discount.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Discount deleted successfully' });
  } catch (error) {
    console.error('Error deleting discount:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
