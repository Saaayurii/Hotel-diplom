# Hotel Images Setup Guide

This guide explains the new hotel images functionality that has been added to the project.

## What's New

✅ **Dynamic Hotel Detail Pages** - Each hotel now has its own page at `/[locale]/hotels/[id]`
✅ **Hotel Image Gallery** - Hotels can have multiple images with captions
✅ **Admin Image Management** - Upload and manage hotel images from the admin panel
✅ **Seeded Images** - Database now includes sample images from the public folder

## Features Implemented

### 1. Database Schema
The `HotelImage` model already existed in your schema and includes:
- `url` - Path to the image (e.g., `/1.jpg`)
- `caption` - Optional description
- `isPrimary` - Mark one image as the main hotel image
- `displayOrder` - Control the order of images in the gallery

### 2. API Endpoints

#### Public Endpoints
- `GET /api/hotels` - List all hotels with their primary images
- `GET /api/hotels/[id]` - Get detailed hotel info with all images and rooms

#### Admin Endpoints
- `GET /api/admin/hotels/[id]/images` - Get all images for a hotel
- `POST /api/admin/hotels/[id]/images` - Add a new image
- `PATCH /api/admin/hotels/[id]/images?imageId=xxx` - Update image (caption, primary status)
- `DELETE /api/admin/hotels/[id]/images?imageId=xxx` - Delete an image

### 3. Frontend Pages

#### User Pages
- `/[locale]/hotels` - Hotel listing with images
- `/[locale]/hotels/[id]` - Hotel detail page with image gallery

#### Admin Pages
- `/admin/hotels` - Hotel management
- `/admin/hotels/[id]` - Hotel image management

## Setup Instructions

### Step 1: Reset the Database (Recommended)
If you want to start fresh with the new images:

```bash
npm run db:reset
# or
bun run db:reset
```

This will:
1. Drop all tables
2. Run migrations
3. Seed the database with sample data including images

### Step 2: Run Only the Seeder (Alternative)
If you just want to add the images to existing data:

```bash
npm run seed
# or
bun run seed
```

**Note**: This might fail if hotels already exist. In that case, use `db:reset`.

### Step 3: Verify Images
Make sure these images exist in your `public` folder:
- `/1.jpg`, `/2.jpg`, `/3.jpg`, `/4.jpg`, `/5.jpg`
- `/luxury-classic-modern-bedroom-suite-hotel.jpg`
- `/lamp-comfort-bed-pillow-fabric.jpg`
- `/beautiful-landscape-mother-nature.jpg`
- `/vertical-aerial-shot-sea-waves-hitting-cliff.jpg`
- `/hammocks-with-palm-trees.jpg`
- `/milaa-devuska-citaet-knigu-v-gamake-v-sadu.jpg`
- `/tip-razvlekatel-nyi-kompleks-popularnyi-kurort-s-basseinami-i-akvaparkami-v-turcii-kotoryi-posesaut-bolee-5-millionov-celovek-v-god-amara-dol-ce-vita-roskosnyi-otel-kurort-tekirova-kemer.jpg`

## Usage Guide

### For Administrators

1. **Navigate to Hotel Management**
   - Go to `/admin/hotels`
   - Click on the edit icon (pencil) next to any hotel

2. **Add Images**
   - Enter the image URL (e.g., `/hotel-photo.jpg`)
   - Add an optional caption
   - Click "Add Image"

3. **Manage Images**
   - Set any image as "Primary" (this will be the main image shown in lists)
   - Edit captions by typing in the caption field
   - Delete images using the trash icon

### For Developers

**Adding Images via Code:**

```typescript
await prisma.hotelImage.create({
  data: {
    hotelId: 'hotel-id-here',
    url: '/my-hotel-image.jpg',
    caption: 'Beautiful hotel exterior',
    isPrimary: true,
    displayOrder: 0,
  },
});
```

**Querying Hotels with Images:**

```typescript
const hotel = await prisma.hotel.findUnique({
  where: { id: hotelId },
  include: {
    hotelImages: {
      orderBy: [
        { isPrimary: 'desc' },
        { displayOrder: 'asc' },
      ],
    },
  },
});
```

## Image Requirements

- **Format**: JPG, PNG, WebP
- **Location**: Must be in the `public` folder
- **URL Format**: Start with `/` (e.g., `/hotel.jpg`)
- **Size**: Recommended at least 1200x800px for best quality
- **Primary Image**: Each hotel should have one primary image

## Troubleshooting

### Images Not Showing
1. Check that the image exists in the `public` folder
2. Verify the URL starts with `/`
3. Check browser console for 404 errors

### Database Errors
If you get errors about missing tables or columns:
```bash
npm run db:reset
```

### No Images After Seeding
Make sure you ran the updated seed file:
```bash
npm run db:seed
```

## Example Hotel Card Display

After setup, each hotel card will show:
- Primary hotel image (or placeholder if none)
- Hotel name and description
- Star rating
- Location
- Number of rooms
- Link to detailed page

## Next Steps

You can now:
- Upload real hotel photos to the `public` folder
- Add them via the admin panel at `/admin/hotels/[id]`
- View them on the hotel listing and detail pages
- Customize the image gallery component as needed

---

**Need Help?**
Check the console logs in the browser and server for any errors.
