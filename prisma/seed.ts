import 'dotenv/config';
import { PrismaClient } from '../app/generated/prisma/index.js';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { hash } from 'bcryptjs';

// For Prisma 7 with pg adapter
const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Create Countries
  console.log('📍 Creating countries...');
  const russia = await prisma.country.upsert({
    where: { code: 'RU' },
    update: {},
    create: {
      name: 'Russia',
      code: 'RU',
    },
  });

  const usa = await prisma.country.upsert({
    where: { code: 'US' },
    update: {},
    create: {
      name: 'United States',
      code: 'US',
    },
  });

  const france = await prisma.country.upsert({
    where: { code: 'FR' },
    update: {},
    create: {
      name: 'France',
      code: 'FR',
    },
  });

  // 2. Create Cities
  console.log('🏙️ Creating cities...');
  const moscow = await prisma.city.create({
    data: {
      name: 'Moscow',
      countryId: russia.id,
    },
  });

  const stPetersburg = await prisma.city.create({
    data: {
      name: 'Saint Petersburg',
      countryId: russia.id,
    },
  });

  const newYork = await prisma.city.create({
    data: {
      name: 'New York',
      countryId: usa.id,
    },
  });

  const paris = await prisma.city.create({
    data: {
      name: 'Paris',
      countryId: france.id,
    },
  });

  // 3. Create Hotels with Addresses
  console.log('🏨 Creating hotels...');
  const moscowHotel = await prisma.hotel.create({
    data: {
      name: 'Moscow Grand Hotel',
      description: 'Luxury hotel in the heart of Moscow with stunning views of the Kremlin',
      stars: 5,
      phone: '+7 495 123-45-67',
      email: 'info@moscowgrand.ru',
      checkInTime: '14:00',
      checkOutTime: '12:00',
      isActive: true,
      address: {
        create: {
          street: 'Tverskaya Street',
          building: '12',
          postalCode: '125009',
          cityId: moscow.id,
          latitude: 55.7558,
          longitude: 37.6173,
        },
      },
    },
  });

  const spbHotel = await prisma.hotel.create({
    data: {
      name: 'Neva Palace Hotel',
      description: 'Elegant hotel overlooking the Neva River',
      stars: 4,
      phone: '+7 812 987-65-43',
      email: 'reception@nevapalace.ru',
      checkInTime: '15:00',
      checkOutTime: '11:00',
      isActive: true,
      address: {
        create: {
          street: 'Nevsky Prospekt',
          building: '57',
          postalCode: '191025',
          cityId: stPetersburg.id,
          latitude: 59.9343,
          longitude: 30.3351,
        },
      },
    },
  });

  const nyHotel = await prisma.hotel.create({
    data: {
      name: 'Manhattan Plaza Hotel',
      description: 'Modern hotel in Times Square area',
      stars: 4,
      phone: '+1 212 555-0123',
      email: 'info@manhattanplaza.com',
      checkInTime: '15:00',
      checkOutTime: '11:00',
      isActive: true,
      address: {
        create: {
          street: 'Broadway',
          building: '1500',
          postalCode: '10036',
          cityId: newYork.id,
          latitude: 40.7589,
          longitude: -73.9851,
        },
      },
    },
  });

  const parisHotel = await prisma.hotel.create({
    data: {
      name: 'Champs-Élysées Boutique',
      description: 'Charming boutique hotel near the Eiffel Tower',
      stars: 5,
      phone: '+33 1 45 67 89 00',
      email: 'contact@champsboutique.fr',
      checkInTime: '14:00',
      checkOutTime: '12:00',
      isActive: true,
      address: {
        create: {
          street: 'Avenue des Champs-Élysées',
          building: '88',
          postalCode: '75008',
          cityId: paris.id,
          latitude: 48.8738,
          longitude: 2.2950,
        },
      },
    },
  });

  // 11. Create Hotel Images
  console.log('🖼️ Creating hotel images...');

  // Moscow Hotel Images
  await prisma.hotelImage.createMany({
    data: [
      {
        hotelId: moscowHotel.id,
        url: '/luxury-classic-modern-bedroom-suite-hotel.jpg',
        caption: 'Luxury Suite',
        isPrimary: true,
        displayOrder: 0,
      },
      {
        hotelId: moscowHotel.id,
        url: '/lamp-comfort-bed-pillow-fabric.jpg',
        caption: 'Comfortable Room',
        isPrimary: false,
        displayOrder: 1,
      },
      {
        hotelId: moscowHotel.id,
        url: '/1.jpg',
        caption: 'Hotel Exterior',
        isPrimary: false,
        displayOrder: 2,
      },
    ],
  });

  // SPB Hotel Images
  await prisma.hotelImage.createMany({
    data: [
      {
        hotelId: spbHotel.id,
        url: '/2.jpg',
        caption: 'Hotel View',
        isPrimary: true,
        displayOrder: 0,
      },
      {
        hotelId: spbHotel.id,
        url: '/beautiful-landscape-mother-nature.jpg',
        caption: 'Beautiful Landscape',
        isPrimary: false,
        displayOrder: 1,
      },
      {
        hotelId: spbHotel.id,
        url: '/vertical-aerial-shot-sea-waves-hitting-cliff.jpg',
        caption: 'Sea View',
        isPrimary: false,
        displayOrder: 2,
      },
    ],
  });

  // NY Hotel Images
  await prisma.hotelImage.createMany({
    data: [
      {
        hotelId: nyHotel.id,
        url: '/3.jpg',
        caption: 'Modern Luxury',
        isPrimary: true,
        displayOrder: 0,
      },
      {
        hotelId: nyHotel.id,
        url: '/4.jpg',
        caption: 'City Views',
        isPrimary: false,
        displayOrder: 1,
      },
      {
        hotelId: nyHotel.id,
        url: '/5.jpg',
        caption: 'Premium Amenities',
        isPrimary: false,
        displayOrder: 2,
      },
    ],
  });

  // Paris Hotel Images
  await prisma.hotelImage.createMany({
    data: [
      {
        hotelId: parisHotel.id,
        url: '/tip-razvlekatel-nyi-kompleks-popularnyi-kurort-s-basseinami-i-akvaparkami-v-turcii-kotoryi-posesaut-bolee-5-millionov-celovek-v-god-amara-dol-ce-vita-roskosnyi-otel-kurort-tekirova-kemer.jpg',
        caption: 'Resort Complex',
        isPrimary: true,
        displayOrder: 0,
      },
      {
        hotelId: parisHotel.id,
        url: '/hammocks-with-palm-trees.jpg',
        caption: 'Relaxation Area',
        isPrimary: false,
        displayOrder: 1,
      },
      {
        hotelId: parisHotel.id,
        url: '/milaa-devuska-citaet-knigu-v-gamake-v-sadu.jpg',
        caption: 'Garden Hammock',
        isPrimary: false,
        displayOrder: 2,
      },
    ],
  });

  // 4. Create Room Types
  console.log('🛏️ Creating room types...');
  const standard = await prisma.roomType.create({
    data: {
      name: 'Standard',
      description: 'Comfortable standard room with basic amenities',
      maxGuests: 2,
    },
  });

  const deluxe = await prisma.roomType.create({
    data: {
      name: 'Deluxe',
      description: 'Spacious room with premium amenities',
      maxGuests: 3,
    },
  });

  const suite = await prisma.roomType.create({
    data: {
      name: 'Suite',
      description: 'Luxurious suite with separate living area',
      maxGuests: 4,
    },
  });

  const family = await prisma.roomType.create({
    data: {
      name: 'Family Room',
      description: 'Large room perfect for families',
      maxGuests: 5,
    },
  });

  // 5. Create Rooms
  console.log('🚪 Creating rooms...');
  const rooms = [
    // Moscow Hotel
    { hotelId: moscowHotel.id, number: '101', roomTypeId: standard.id, floor: 1, size: 25, price: '150' },
    { hotelId: moscowHotel.id, number: '102', roomTypeId: standard.id, floor: 1, size: 25, price: '150' },
    { hotelId: moscowHotel.id, number: '201', roomTypeId: deluxe.id, floor: 2, size: 35, price: '250' },
    { hotelId: moscowHotel.id, number: '301', roomTypeId: suite.id, floor: 3, size: 50, price: '450' },
    { hotelId: moscowHotel.id, number: '401', roomTypeId: family.id, floor: 4, size: 45, price: '350' },

    // SPB Hotel
    { hotelId: spbHotel.id, number: '101', roomTypeId: standard.id, floor: 1, size: 22, price: '120' },
    { hotelId: spbHotel.id, number: '201', roomTypeId: deluxe.id, floor: 2, size: 32, price: '200' },
    { hotelId: spbHotel.id, number: '301', roomTypeId: suite.id, floor: 3, size: 48, price: '380' },

    // NY Hotel
    { hotelId: nyHotel.id, number: '1001', roomTypeId: standard.id, floor: 10, size: 28, price: '250' },
    { hotelId: nyHotel.id, number: '1501', roomTypeId: deluxe.id, floor: 15, size: 38, price: '400' },
    { hotelId: nyHotel.id, number: '2001', roomTypeId: suite.id, floor: 20, size: 55, price: '750' },

    // Paris Hotel
    { hotelId: parisHotel.id, number: '101', roomTypeId: deluxe.id, floor: 1, size: 30, price: '280' },
    { hotelId: parisHotel.id, number: '201', roomTypeId: suite.id, floor: 2, size: 52, price: '550' },
    { hotelId: parisHotel.id, number: '301', roomTypeId: suite.id, floor: 3, size: 60, price: '650' },
  ];

  for (const room of rooms) {
    await prisma.room.create({
      data: {
        number: room.number,
        hotelId: room.hotelId,
        roomTypeId: room.roomTypeId,
        floor: room.floor,
        size: room.size,
        pricePerNight: room.price,
        isAvailable: true,
        description: 'Well-appointed room with modern amenities',
      },
    });
  }

  // 6. Create Users
  console.log('👤 Creating users...');
  const adminPassword = await hash('admin123', 12);
  const userPassword = await hash('user123', 12);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@timeout.com',
      passwordHash: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      phone: '+7 900 123-45-67',
      role: 'ADMIN',
      isActive: true,
    },
  });

  const manager = await prisma.user.create({
    data: {
      email: 'manager@timeout.com',
      passwordHash: userPassword,
      firstName: 'Manager',
      lastName: 'Smith',
      phone: '+7 900 234-56-78',
      role: 'MANAGER',
      isActive: true,
    },
  });

  const customer1 = await prisma.user.create({
    data: {
      email: 'ivan@example.com',
      passwordHash: userPassword,
      firstName: 'Ivan',
      lastName: 'Petrov',
      phone: '+7 900 345-67-89',
      dateOfBirth: new Date('1990-05-15'),
      role: 'CUSTOMER',
      isActive: true,
    },
  });

  const customer2 = await prisma.user.create({
    data: {
      email: 'maria@example.com',
      passwordHash: userPassword,
      firstName: 'Maria',
      lastName: 'Ivanova',
      phone: '+7 900 456-78-90',
      dateOfBirth: new Date('1985-08-22'),
      role: 'CUSTOMER',
      isActive: true,
    },
  });

  // 7. Create Booking Statuses
  console.log('📋 Creating booking statuses...');
  const pending = await prisma.bookingStatus.create({
    data: {
      name: 'Pending',
      description: 'Booking is awaiting confirmation',
      color: '#F59E0B',
    },
  });

  const confirmed = await prisma.bookingStatus.create({
    data: {
      name: 'Confirmed',
      description: 'Booking has been confirmed',
      color: '#10B981',
    },
  });

  const cancelled = await prisma.bookingStatus.create({
    data: {
      name: 'Cancelled',
      description: 'Booking has been cancelled',
      color: '#EF4444',
    },
  });

  const completed = await prisma.bookingStatus.create({
    data: {
      name: 'Completed',
      description: 'Stay has been completed',
      color: '#6366F1',
    },
  });

  const rejected = await prisma.bookingStatus.create({
    data: {
      name: 'Rejected',
      description: 'Booking was rejected',
      color: '#EF4444',
    },
  });

  // 8. Create Payment Methods
  console.log('💳 Creating payment methods...');
  await prisma.paymentMethod.createMany({
    data: [
      { name: 'Credit Card', description: 'Visa, MasterCard, American Express', isActive: true },
      { name: 'Debit Card', description: 'Bank debit cards', isActive: true },
      { name: 'PayPal', description: 'PayPal online payment', isActive: true },
      { name: 'Bank Transfer', description: 'Direct bank transfer', isActive: true },
      { name: 'Cash', description: 'Cash payment at hotel', isActive: true },
    ],
  });

  // 9. Create Amenities
  console.log('✨ Creating amenities...');
  await prisma.amenity.createMany({
    data: [
      { name: 'Free WiFi', description: 'High-speed internet', icon: 'wifi', category: 'INTERNET' },
      { name: 'Air Conditioning', description: 'Climate control', icon: 'thermometer', category: 'GENERAL' },
      { name: 'TV', description: 'Flat screen TV', icon: 'tv', category: 'ENTERTAINMENT' },
      { name: 'Mini Bar', description: 'In-room mini bar', icon: 'wine', category: 'FOOD_DRINK' },
      { name: 'Safe', description: 'In-room safe', icon: 'lock', category: 'GENERAL' },
      { name: 'Hair Dryer', description: 'Bathroom hair dryer', icon: 'wind', category: 'BATHROOM' },
      { name: 'Bathrobe', description: 'Comfortable bathrobe', icon: 'user', category: 'BEDROOM' },
      { name: 'Room Service', description: '24/7 room service', icon: 'bell', category: 'SERVICES' },
      { name: 'Gym', description: 'Fitness center', icon: 'dumbbell', category: 'SERVICES' },
      { name: 'Swimming Pool', description: 'Indoor/outdoor pool', icon: 'waves', category: 'SERVICES' },
      { name: 'Spa', description: 'Spa and wellness center', icon: 'spa', category: 'SERVICES' },
      { name: 'Restaurant', description: 'On-site restaurant', icon: 'utensils', category: 'FOOD_DRINK' },
      { name: 'Bar', description: 'Hotel bar', icon: 'glass', category: 'FOOD_DRINK' },
      { name: 'Parking', description: 'Free parking', icon: 'car', category: 'SERVICES' },
      { name: 'Airport Shuttle', description: 'Airport transfer service', icon: 'plane', category: 'SERVICES' },
    ],
  });

  // 10. Create Discounts
  console.log('🎫 Creating discounts...');
  await prisma.discount.createMany({
    data: [
      {
        code: 'WELCOME10',
        description: 'Welcome discount for new customers',
        type: 'PERCENTAGE',
        value: '10',
        validFrom: new Date('2025-01-01'),
        validUntil: new Date('2025-12-31'),
        isActive: true,
        maxUses: 100,
        usedCount: 0,
      },
      {
        code: 'SUMMER2025',
        description: 'Summer season special offer',
        type: 'PERCENTAGE',
        value: '15',
        validFrom: new Date('2025-06-01'),
        validUntil: new Date('2025-08-31'),
        isActive: true,
        maxUses: 200,
        usedCount: 0,
      },
      {
        code: 'EARLY50',
        description: 'Early booking discount',
        type: 'FIXED_AMOUNT',
        value: '50',
        validFrom: new Date('2025-01-01'),
        validUntil: new Date('2025-12-31'),
        isActive: true,
        maxUses: null,
        usedCount: 0,
      },
    ],
  });

  console.log('✅ Database seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log('  - Countries: 3');
  console.log('  - Cities: 4');
  console.log('  - Hotels: 4');
  console.log('  - Hotel Images: 12 (3 per hotel)');
  console.log('  - Room Types: 4');
  console.log('  - Rooms: 14');
  console.log('  - Users: 4 (1 admin, 1 manager, 2 customers)');
  console.log('  - Booking Statuses: 5 (Pending, Confirmed, Cancelled, Completed, Rejected)');
  console.log('  - Payment Methods: 5');
  console.log('  - Amenities: 15');
  console.log('  - Discounts: 3');
  console.log('\n🔐 Login credentials:');
  console.log('  Admin: admin@timeout.com / admin123');
  console.log('  Manager: manager@timeout.com / user123');
  console.log('  Customer: ivan@example.com / user123');
  console.log('  Customer: maria@example.com / user123');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
