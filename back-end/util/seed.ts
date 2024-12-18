import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database for user 1...');

    // User ID for seeding
    const userId = 1;

    // Create Boards for user 1
    const boards = await Promise.all([
        prisma.board.create({
            data: {
                name: 'Travel Board',
                userId: userId,
            },
        }),
        prisma.board.create({
            data: {
                name: 'Food Board',
                userId: userId,
            },
        }),
    ]);

    console.log(`${boards.length} boards created for user 1.`);

    // Create Pins for user 1
    const pins = await Promise.all([
        prisma.pin.create({
            data: {
                title: 'Beautiful Beach',
                imageUrl: 'https://placehold.co/600x400',
                description: 'A serene beach with golden sands.',
                boards: {
                    connect: { id: boards[0].id },
                },
                categories: {
                    connect: [{ id: 1 }, { id: 2 }],
                },
            },
        }),
        prisma.pin.create({
            data: {
                title: 'Mountain Adventure',
                imageUrl: 'https://placehold.co/600x400',
                description: 'Exploring the rugged mountain trails.',
                boards: {
                    connect: { id: boards[0].id },
                },
                categories: {
                    connect: [{ id: 3 }],
                },
            },
        }),
        prisma.pin.create({
            data: {
                title: 'City Lights',
                imageUrl: 'https://placehold.co/600x400',
                description: 'The dazzling city skyline at night.',
                boards: {
                    connect: { id: boards[0].id },
                },
                categories: {
                    connect: [{ id: 4 }],
                },
            },
        }),
        prisma.pin.create({
            data: {
                title: 'Gourmet Dish',
                imageUrl: 'https://placehold.co/600x400',
                description: 'A delicious and beautifully presented meal.',
                boards: {
                    connect: { id: boards[1].id },
                },
                categories: {
                    connect: [{ id: 5 }, { id: 6 }],
                },
            },
        }),
        prisma.pin.create({
            data: {
                title: 'Exotic Dessert',
                imageUrl: 'https://placehold.co/600x400',
                description: 'A sweet treat from faraway lands.',
                boards: {
                    connect: { id: boards[1].id },
                },
                categories: {
                    connect: [{ id: 7 }],
                },
            },
        }),
        prisma.pin.create({
            data: {
                title: 'Farm-to-Table Feast',
                imageUrl: 'https://placehold.co/600x400',
                description: 'Fresh and organic dining experience.',
                boards: {
                    connect: { id: boards[1].id },
                },
                categories: {
                    connect: [{ id: 8 }],
                },
            },
        }),
        prisma.pin.create({
            data: {
                title: 'Beautiful Beach (Shared)',
                imageUrl: 'https://placehold.co/600x400',
                description: 'A serene beach with golden sands.',
                boards: {
                    connect: [{ id: boards[0].id }, { id: boards[1].id }],
                },
                categories: {
                    connect: [{ id: 2 }, { id: 9 }],
                },
            },
        }),
        prisma.pin.create({
            data: {
                title: 'Cultural Market',
                imageUrl: 'https://placehold.co/600x400',
                description: 'Exploring vibrant local markets.',
                boards: {
                    connect: { id: boards[0].id },
                },
                categories: {
                    connect: [{ id: 3 }, { id: 7 }],
                },
            },
        }),
        prisma.pin.create({
            data: {
                title: 'Gourmet Dish (Shared)',
                imageUrl: 'https://placehold.co/600x400',
                description: 'A delicious and beautifully presented meal.',
                boards: {
                    connect: [{ id: boards[0].id }, { id: boards[1].id }],
                },
                categories: {
                    connect: [{ id: 5 }, { id: 8 }],
                },
            },
        }),
    ]);

    console.log(`${pins.length} pins created and linked to boards for user 1.`);

    console.log('Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
