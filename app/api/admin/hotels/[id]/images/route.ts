import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

// Get all images for a hotel
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const images = await prisma.hotelImage.findMany({
      where: {
        hotelId: params.id,
      },
      orderBy: [
        { isPrimary: 'desc' },
        { displayOrder: 'asc' },
      ],
    });

    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching hotel images:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Add new image to hotel
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { url, caption, isPrimary, displayOrder } = body;

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // If this is marked as primary, unset other primary images
    if (isPrimary) {
      await prisma.hotelImage.updateMany({
        where: {
          hotelId: params.id,
          isPrimary: true,
        },
        data: {
          isPrimary: false,
        },
      });
    }

    const image = await prisma.hotelImage.create({
      data: {
        hotelId: params.id,
        url,
        caption: caption || null,
        isPrimary: isPrimary || false,
        displayOrder: displayOrder || 0,
      },
    });

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error('Error creating hotel image:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Delete an image
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const imageId = searchParams.get('imageId');

    if (!imageId) {
      return NextResponse.json(
        { error: 'Image ID is required' },
        { status: 400 }
      );
    }

    await prisma.hotelImage.delete({
      where: {
        id: imageId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting hotel image:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Update image
export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const imageId = searchParams.get('imageId');

    if (!imageId) {
      return NextResponse.json(
        { error: 'Image ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { caption, isPrimary, displayOrder } = body;

    // Get the image to find the hotelId
    const image = await prisma.hotelImage.findUnique({
      where: { id: imageId },
    });

    if (!image) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }

    // If this is marked as primary, unset other primary images
    if (isPrimary) {
      await prisma.hotelImage.updateMany({
        where: {
          hotelId: image.hotelId,
          isPrimary: true,
          id: { not: imageId },
        },
        data: {
          isPrimary: false,
        },
      });
    }

    const updatedImage = await prisma.hotelImage.update({
      where: {
        id: imageId,
      },
      data: {
        caption: caption !== undefined ? caption : undefined,
        isPrimary: isPrimary !== undefined ? isPrimary : undefined,
        displayOrder: displayOrder !== undefined ? displayOrder : undefined,
      },
    });

    return NextResponse.json(updatedImage);
  } catch (error) {
    console.error('Error updating hotel image:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
